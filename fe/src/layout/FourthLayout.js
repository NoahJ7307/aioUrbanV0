import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
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

const car1Animation = keyframes`
    0% { transform: translateX(-100px); }
    15% { transform: translateX(50px); }
    60% { transform: translateX(50px); }
    75% { transform: translateX(70px); }
    90% { transform: translateX(80px) translateY(40px); }
    100% { transform: translateX(90px) translateY(65px); }
`;

const car2Animation = keyframes`
    0% { transform: translateX(300px); }
    15% { transform: translateX(135px); }
    30% { transform: translateX(135px) translateY(-25px); }
    45% { transform: translateX(0) translateY(-30px); }
    60% { transform: translateX(-70px) translateY(-30px); }
    75% { transform: translateX(-75px) translateY(-55px); }
    100% { transform: translateX(-80px) translateY(-80px); }
`;

const Masthead = styled.header`
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
        to bottom,
        rgba(20, 30, 48, 0.8) 0%,
        rgba(36, 59, 85, 0.8) 100%
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
    background: url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a');
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
            rgba(20, 30, 48, 0.8),
            rgba(36, 59, 85, 0.8)
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
    animation: ${props => props.isVisible ? css`${slideIn} 1s forwards` : 'none'};
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
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin-bottom: 1.2rem;
        line-height: 1.4;
    }
`;

const ParkingLotContainer = styled.div`
    position: relative;
    width: 400px;
    height: 300px;
    margin: 2rem auto;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(5px);
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards 0.6s` : 'none'};

    @media (max-width: 1024px) {
        width: 350px;
        height: 262.5px;
        margin: 1.8rem auto;
    }

    @media (max-width: 768px) {
        width: 300px;
        height: 225px;
        margin: 1.5rem auto;
        padding: 15px;
    }

    @media (max-width: 480px) {
        width: 280px;
        height: 210px;
        margin: 1.2rem auto;
        padding: 12px;
    }
`;

const ParkingSpace = styled.div`
    width: 100px;
    height: 60px;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    position: absolute;
    ${props => props.position === 'top' ? 'top: 40px;' : 'bottom: 40px;'}
    ${props => props.position === 'top' ? 'left: 50px;' : 'left: 250px;'};

    @media (max-width: 1024px) {
        width: 87.5px;
        height: 52.5px;
        ${props => props.position === 'top' ? 'top: 35px;' : 'bottom: 35px;'}
        ${props => props.position === 'top' ? 'left: 43.75px;' : 'left: 218.75px;'}
    }

    @media (max-width: 768px) {
        width: 75px;
        height: 45px;
        ${props => props.position === 'top' ? 'top: 30px;' : 'bottom: 30px;'}
        ${props => props.position === 'top' ? 'left: 37.5px;' : 'left: 187.5px;'}
    }

    @media (max-width: 480px) {
        width: 70px;
        height: 42px;
        ${props => props.position === 'top' ? 'top: 28px;' : 'bottom: 28px;'}
        ${props => props.position === 'top' ? 'left: 35px;' : 'left: 175px;'}
    }

    &::after {
        content: 'P';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.5rem;

        @media (max-width: 768px) {
            font-size: 1.2rem;
        }

        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }
`;

const Car = styled.div`
    position: absolute;
    font-size: 2rem;
    animation: ${props => props.isVisible ? css`
        ${props => props.isFirst ? car1Animation : car2Animation} 8s infinite
    ` : 'none'};
    transition: all 0.3s ease;
    z-index: ${props => props.isFirst ? 1 : 2};
    opacity: ${props => props.isVisible ? 1 : 0};

    @media (max-width: 1024px) {
        font-size: 1.75rem;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.25rem;
    }
`;

const Road = styled.div`
    position: absolute;
    width: 300px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    left: 50px;
    top: 120px;
    border-radius: 5px;

    @media (max-width: 1024px) {
        width: 262.5px;
        height: 70px;
        left: 43.75px;
        top: 105px;
    }

    @media (max-width: 768px) {
        width: 225px;
        height: 60px;
        left: 37.5px;
        top: 90px;
    }

    @media (max-width: 480px) {
        width: 210px;
        height: 56px;
        left: 35px;
        top: 84px;
    }
`;

const Button = styled.button`
    display: inline-block;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    opacity: 0;
    animation: ${props => props.isVisible ? css`${fadeInUp} 1s forwards 0.9s` : 'none'};
    cursor: pointer;
    backdrop-filter: blur(10px);
    font-size: 1rem;

    @media (max-width: 1024px) {
        padding: 0.9rem 1.8rem;
        font-size: 0.95rem;
    }

    @media (max-width: 768px) {
        padding: 0.8rem 1.6rem;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        padding: 0.7rem 1.4rem;
        font-size: 0.85rem;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
`;

const ManageButton = styled(Button)`
    background: rgba(0, 150, 255, 0.3);
    margin-left: 1rem;

    @media (max-width: 768px) {
        margin-left: 0.8rem;
    }

    @media (max-width: 480px) {
        margin-left: 0.6rem;
    }

    &:hover {
        background: rgba(0, 150, 255, 0.5);
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
        gap: 0.8rem;
        margin-top: 1.5rem;
    }

    @media (max-width: 480px) {
        gap: 0.6rem;
        margin-top: 1.2rem;
    }
`;


const FourthLayout = () => {
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
        const parkingSection = document.getElementById('parking');
        if (parkingSection) {
            parkingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleParkingManage = () => {
        navigate('/parking');
    };

    return (
        <Masthead id="parking" ref={sectionRef}>
            <BackgroundImage />
            <ContentWrapper>
                <Title isVisible={isVisible}>
                    스마트 주차 관리<br />
                    실시간 주차 현황
                </Title>
                <Description isVisible={isVisible}>
                    AI 기반 주차 관제 시스템으로<br />
                    더 편리한 주차 환경을 제공합니다
                </Description>
                <ParkingLotContainer isVisible={isVisible}>
                    <Road />
                    <ParkingSpace position="top" />
                    <ParkingSpace position="bottom" />
                    <Car isFirst={true} isVisible={isVisible} style={{ left: '170px', top: '130px' }}>🚗</Car>
                    <Car isFirst={false} isVisible={isVisible} style={{ left: '170px', top: '130px' }}>🚙</Car>
                </ParkingLotContainer>
                <ButtonGroup>
                    <Button onClick={handleScroll} isVisible={isVisible}>자세히 보기</Button>
                    <ManageButton onClick={handleParkingManage} isVisible={isVisible}>
                        주차 관리 시스템
                    </ManageButton>
                </ButtonGroup>
            </ContentWrapper>
        </Masthead>
    );
};

export default FourthLayout;