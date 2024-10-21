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

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class UrbanSecurityConfig {
    private final UrbanUserDetailsService urbanUserDetailsService; // 주입된 UrbanUserDetailsService

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("Security Config...");

        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(configurationSource());
        });

        http.sessionManagement(sessionConfig ->
                sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(AbstractHttpConfigurer::disable);

        // 권한 설정 및 인증
        //--------------------------------------------------------------
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/user/login").permitAll()  // 인증 없이 접근 허용
                        .requestMatchers("/api/user/**").hasRole("ADMIN") // 접근 권한 설정
                        .anyRequest().authenticated()  // 그 외의 요청은 인증 필요
                )
                .addFilterAt(customAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class) // JWT 인증
                .addFilterAfter(new JWTCheckFilter(),
                        UsernamePasswordAuthenticationFilter.class);  // 비밀번호 인증
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
        filter.setFilterProcessesUrl("/api/user/login"); // 로그인 경로 설정
        filter.setAuthenticationSuccessHandler(new APILoginSuccessHandler());
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return authentication -> {
            UserDetails user = urbanUserDetailsService.loadUserByUsername(authentication.getName());  // 필드 사용
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
        // 인증 정보 허용(쿠키, 세션 ID, Authorization 헤더...)
        configuration.setAllowCredentials(true);
        // 출처 패턴 : 전부 허용
        configuration.setAllowedOriginPatterns(List.of("*"));
        // CORS 요청 시 허용 출처
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        // CORS 요청 시 허용 메서드
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        // CORS 요청 시 허용 헤더
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 암호 알고리즘
    }
}

//------------------------------------------------------------------------------------------
//public class UrbanSecurityConfig {
//    // @Configuration 아래 @Bean 을 만들면 스프링에서 객체를 관리함
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        // p302
//        http.cors(httpSecurityCorsConfigurer -> {
//            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
//        });
//        http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.csrf(i->i.disable());
//
//        // p312 post 방식으로 parameter 를 통해 로그인 처리
//        http.formLogin(config -> {
//            config.loginPage("/api/member/login");
//            config.successHandler(new APILoginSuccessHandler());
//            config.failureHandler(new APILoginFailHandler());
//        });
//
//        // p329 Filter
//        http.addFilterBefore(new JWTCheckFilter(),
//                UsernamePasswordAuthenticationFilter.class);// JWT Check
//
//        // p340
//        http.exceptionHandling(i -> {
//            i.accessDeniedHandler(new UrbanAccessDeniedHandler());
//        });
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    // p303
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(); // 암호 알고리즘 (중요함!!)
//    }
//}
//
