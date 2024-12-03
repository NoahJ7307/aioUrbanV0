import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const rotateIn = keyframes`
    from {
        transform: perspective(1000px) rotateY(90deg);
        opacity: 0;
    }
    to {
        transform: perspective(1000px) rotateY(0);
        opacity: 1;
    }
`;

const glowAnimation = keyframes`
    0% {
        box-shadow: 0 0 5px rgba(255,255,255,0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(255,255,255,0.5), inset 0 0 15px rgba(255,255,255,0.3);
    }
    100% {
        box-shadow: 0 0 5px rgba(255,255,255,0.3);
    }
`;

const rotateAnimation = keyframes`
    0% {
        transform: rotateX(0deg) rotateY(0deg);
    }
    50% {
        transform: rotateX(10deg) rotateY(10deg);
    }
    100% {
        transform: rotateX(0deg) rotateY(0deg);
    }
`;

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

const shine = keyframes`
    0% {
        background-position: -100% 100%;
    }
    100% {
        background-position: 100% -100%;
    }
`;

const Masthead = styled.header`
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
        to bottom,
        rgba(0, 40, 70, 0.8) 0%,
        rgba(0, 80, 120, 0.8) 100%
    );

    @media (max-width: 480px) {
        min-height: calc(100vh - 60px);
    }
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1563013544-824ae1b704d3');
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
            rgba(0, 40, 70, 0.8),
            rgba(0, 80, 120, 0.8)
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
    justify-content: center;
    color: white;

    @media (max-width: 1024px) {
        padding: 0 1.5rem;
        max-width: 900px;
    }

    @media (max-width: 768px) {
        padding: 0 1rem;
        height: calc(100vh - 40px);
    }

    @media (max-width: 480px) {
        padding: 0 0.8rem;
        height: calc(100vh - 60px);
    }
`;

const Title = styled.h1`
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${rotateIn} 1s forwards` : 'none'};
    line-height: 1.3;

    @media (max-width: 1024px) {
        font-size: 3rem;
    }

    @media (max-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 0.8rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
        margin-bottom: 0.6rem;
        line-height: 1.2;
    }
`;

const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards 0.3s` : 'none'};
    line-height: 1.6;

    @media (max-width: 1024px) {
        font-size: 1.1rem;
        margin-bottom: 1.8rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1.5rem;
        br {
            display: none;
        }
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin-bottom: 1.2rem;
        line-height: 1.4;
    }
`;

const PaymentCards = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin: 2rem 0;
    perspective: 1000px;

    @media (max-width: 1024px) {
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    @media (max-width: 480px) {
        gap: 0.8rem;
    }
`;

const Card = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${rotateIn} 0.5s forwards ${props.delay}` : 'none'};
    overflow: hidden;  // 추가

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: 0.5s;
    }

    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);

        &::before {
            left: 100%;
        }
    }

    span {
        position: relative;
        z-index: 1;

        &:first-child {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
        }

        &:last-child {
            font-size: 1.1rem;
            font-weight: 500;
            color: white;
        }
    }

    @media (max-width: 768px) {
        padding: 1.5rem 1rem;

        span:first-child {
            font-size: 2rem;
        }

        span:last-child {
            font-size: 1rem;
        }
    }
`;
const Button = styled.button`
    display: inline-block;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards 0.6s` : 'none'};
    cursor: pointer;
    backdrop-filter: blur(10px);
    margin: 2rem auto 0;
    width: 80%;
    max-width: 400px;
    position: relative;
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: 500;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: 0.5s;
    }

    &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);

        &::before {
            left: 100%;
        }
    }

    @media (max-width: 768px) {
        padding: 0.8rem 1.6rem;
        font-size: 1rem;
        max-width: 300px;
    }

    @media (max-width: 480px) {
        padding: 0.7rem 1.4rem;
        font-size: 0.9rem;
        max-width: 250px;
    }
`;
const FifthLayout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

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

    const handleScroll = () => {
        const paymentSection = document.getElementById('payment');
        if (paymentSection) {
            paymentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const paymentMethods = [
        { icon: '💳', title: '카드결제' },
        { icon: '📱', title: '모바일결제' },
        { icon: '🏦', title: '계좌이체' },
        { icon: '💰', title: '마일리지' }
    ];

    const handleCardClick = (url) => {
        navigate(url);
    };

    const handleMileageCharge = () => {
        navigate('/mileage', {
            state: {
                from: 'payment',
                timestamp: new Date().getTime()
            }
        });
    };

    return (
        <Masthead id="payment" ref={sectionRef}>
            <BackgroundImage />
            <ContentWrapper>
                <Title isVisible={isVisible}>
                    스마트한 결제 시스템<br />
                    간편한 통합 관리
                </Title>
                <Description isVisible={isVisible}>
                    안전하고 편리한 결제 시스템으로<br />
                    모든 관리비를 한 번에 해결하세요
                </Description>
                <PaymentCards>
                    {paymentMethods.map((method, index) => (
                        <Card
                            key={index}
                            delay={`${index * 0.2}s`}
                            isVisible={isVisible}
                            onClick={() => handleCardClick(method.url)}
                        >
                            <span>{method.icon}</span>
                            <span>{method.title}</span>
                        </Card>
                    ))}
                </PaymentCards>
                <Button onClick={handleMileageCharge} isVisible={isVisible}>
                    마일리지충전하기
                </Button>
            </ContentWrapper>
        </Masthead>
    );
};

export default FifthLayout;