import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const moveAlongPath = keyframes`
    0% {
        offset-distance: 0%;
        opacity: 1;
    }
    70% {
        opacity: 1;
    }
    100% {
        offset-distance: 100%;
        opacity: 0;
    }
`;
const pulseBuilding = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }
`;

const Masthead = styled.header`
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 40, 0.7) 0%,
        rgba(60, 0, 80, 0.7) 100%
    );
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            45deg,
            rgba(0, 0, 50, 0.7),
            rgba(60, 0, 80, 0.7)
        );
    }
`;

const ContentWrapper = styled.div`
    position: relative;
    padding: 0 2rem;
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding-top: 15vh;
`;

const TextContainer = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const AnimationContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40vh;
    margin-top: 1rem;
`;

const CenterBuilding = styled.div`
    position: absolute;
    left: 38%;
    transform: translateX(-50%);
    font-size: 10rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    backdrop-filter: blur(10px);
    animation: ${pulseBuilding} 3s infinite ease-in-out;
    z-index: 2;
`;
const MovingPerson = styled.div`
    position: absolute;
    font-size: 3rem;
    offset-path: ${props => props.path};
    animation: ${moveAlongPath} 4s infinite linear;
    animation-delay: ${props => props.delay}s;
    transform: rotate(0deg);  // 이 부분 추가
    offset-rotate: 0deg;      // 이 부분 추가
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards` : 'none'};
    line-height: 1.3;
    text-align: center;
    z-index: 3;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards 0.3s` : 'none'};
    line-height: 1.6;
    text-align: center;
    z-index: 3;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: ;
    margin-bottom: 5vh;
    z-index: 3;
`;

const Button = styled.button`
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards 0.9s` : 'none'};
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const ThirdLayout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const getPeople = () => {
        const centerX = windowSize.width / 3;
        const centerY = 150;

        return [
            {
                icon: '👨‍💻',  // 직장인/전문가
                path: `path("M 0,${centerY - 100} Q ${centerX - 200},${centerY - 50} ${centerX},${centerY}")`,
                delay: 0
            },
            {
                icon: '👨‍👩‍👦',  // 젊은 가족
                path: `path("M ${windowSize.width},${centerY - 100} Q ${centerX + 200},${centerY - 50} ${centerX},${centerY}")`,
                delay: 0.8
            },
            {
                icon: '👩‍🍳',  // 요리하는 주부
                path: `path("M 0,0 Q ${centerX - 100},${centerY - 100} ${centerX},${centerY}")`,
                delay: 1.6
            },
            {
                icon: '👨‍👩‍👧‍👦',  // 4인 가족
                path: `path("M ${windowSize.width},0 Q ${centerX + 100},${centerY - 100} ${centerX},${centerY}")`,
                delay: 2.4
            },
            {
                icon: '👨‍👨‍👧',  // 다양한 가족 형태
                path: `path("M 0,${centerY + 100} Q ${centerX - 150},${centerY + 50} ${centerX},${centerY}")`,
                delay: 3.2
            },
            {
                icon: '👩‍👦‍👦',  // 한부모 가정
                path: `path("M ${windowSize.width},${centerY + 100} Q ${centerX + 150},${centerY + 50} ${centerX},${centerY}")`,
                delay: 4
            }
        ];
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Masthead id="communities" ref={sectionRef}>
            <BackgroundImage />
            <ContentWrapper>
                <TextContainer>
                    <Title isVisible={isVisible}>
                        소통하는 우리 아파트<br />
                        함께 만드는 커뮤니티
                    </Title>
                    <Description isVisible={isVisible}>
                        실시간 소통과 정보 공유로<br />
                        더 가까워지는 이웃과의 관계
                    </Description>
                </TextContainer>
                <AnimationContainer>
                    <CenterBuilding>🏢</CenterBuilding>
                    {getPeople().map((person, index) => (
                        <MovingPerson
                            key={index}
                            path={person.path}
                            delay={person.delay}
                        >
                            {person.icon}
                        </MovingPerson>
                    ))}
                </AnimationContainer>
                <ButtonContainer>
                    <Button
                        isVisible={isVisible}
                        onClick={() => handleNavigate('/communities/board/list')}
                    >
                        게시판
                    </Button>
                    <Button
                        isVisible={isVisible}
                        onClick={() => handleNavigate('/communities/announce/list')}
                    >
                        공지사항
                    </Button>
                    <Button
                        isVisible={isVisible}
                        onClick={() => handleNavigate('/communities/market/list')}
                    >
                        장터
                    </Button>
                    <Button
                        isVisible={isVisible}
                        onClick={() => handleNavigate('/communities/info/jobs')}
                    >
                        생활정보
                    </Button>
                </ButtonContainer>
            </ContentWrapper>
        </Masthead>
    );
};

export default ThirdLayout;