package com.allinone.proja3.proja3.config;

import com.allinone.proja3.proja3.security.*;
import com.allinone.proja3.proja3.util.JWTCheckFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class UrbanSecurityConfig {
    private final UrbanUserDetailsService urbanUserDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("Security Config");

        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(configurationSource());
        });

        http.sessionManagement(sessionConfig ->
                sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(AbstractHttpConfigurer::disable);

        // 권한 설정 및 인증
        //--------------------------------------------------------------
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/user/login").permitAll()
                .requestMatchers("/api/main/join").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/ws/chat").permitAll()
                .requestMatchers("/api/user/**").hasAnyRole("ADMIN", "ROOT")
                .requestMatchers("/api/communities/info/jobs/search/**").permitAll()
                .requestMatchers("/api/parking/**").hasAnyRole("USER", "ADMIN", "ROOT")
                .requestMatchers("/api/superAdmin/**").hasRole("ROOT")
                .requestMatchers("/api/communities/**").permitAll()
                .requestMatchers("/api/communities/info/coordinates").authenticated()
                .anyRequest().authenticated()  // Require authentication for all other requests
        );

        http.addFilterAt(customAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class) // Custom Username/Password authentication filter
                .addFilterAfter(new JWTCheckFilter(),
                        UsernamePasswordAuthenticationFilter.class); // JWT check filter

        //--------------------------------------------------------------

        http.exceptionHandling(exceptionHandling -> {
            exceptionHandling.accessDeniedHandler(new UrbanAccessDeniedHandler())  // 권한 부족 사용자 처리
                    .authenticationEntryPoint(new UrbanAuthenticationEntryPoint()); // 인증되지 않은 사용자 처리
        });

        return http.build();
    }

    // 커스텀 Authentication Filter 설정
    //--------------------------------------------------------------
    @Bean
    public UrbanUsernamePasswordAuthenticationFilter customAuthenticationFilter() throws Exception {
        UrbanUsernamePasswordAuthenticationFilter filter = new UrbanUsernamePasswordAuthenticationFilter();
        filter.setAuthenticationManager(authenticationManager());
        filter.setFilterProcessesUrl("/api/user/login");
        filter.setAuthenticationSuccessHandler(new APILoginSuccessHandler());
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return authentication -> {
            UserDetails user = urbanUserDetailsService.loadUserByUsername(authentication.getName());
            if (user == null || !passwordEncoder().matches(authentication.getCredentials().toString(), user.getPassword())) {
                throw new BadCredentialsException("Invalid credentials");
            }
            return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        };
    }
    //--------------------------------------------------------------

    @Bean
    public CorsConfigurationSource configurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
