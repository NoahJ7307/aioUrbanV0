import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/_modules/main.css'
const MainComponent = () => {
  // 카드 정보 배열
  const cards = [
    { title: "시설 예약", link: "/facilities", description: "공용 시설 예약", image: "/images/city.jpg" },
    { title: "소통", link: "/communities", description: "입주민 간 소통 공간", image: "/images/cafe.jpg" },
    { title: "주차 관리", link: "/parking", description: "주차 공간 확인 및 관리", image: "/images/parking.jpg" },
  ];

  // 현재 활성화된 카드의 인덱스
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="mainComponent">
    <div className="card-wrapper">
      {cards.map((card, index) => (
        <div
          key={index}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          className={`card ${activeIndex === index ? "active" : ""}`}
        >
          <img
            src={card.image}
            alt={`${card.title} 이미지`}
          />
          <div className="mainHoverBox">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
            <Link to={card.link}>
              <button className="go-button">Go</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
    // <div className="min-h-screen p-6 flex items-center justify-center bg-gray-100">
    //   <div className="flex w-full max-w-4xl space-x-4 h-96">
    //     {cards.map((card, index) => (
    //       <div
    //         key={index}
    //         onMouseEnter={() => setActiveIndex(index)}
    //         onMouseLeave={() => setActiveIndex(null)}
    //         className={`relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer ${
    //           activeIndex === index ? "flex-[3]" : "flex-1"
    //         } h-full`}
    //       >
    //         <img
    //           src={card.image}
    //           alt={`${card.title} 이미지`}
    //           className="w-full h-full object-cover transition-transform duration-300"
    //           style={{ transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)' }}
    //         />
    //         {/* 오버레이 내용 */}
    //         <div
    //           className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-4 transition-opacity duration-300 
    //            mainHoverBox ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
    //         >
    //           <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
    //           <p className="text-gray-200 mb-4">{card.description}</p>
    //           <Link to={card.link} className="mt-4">
    //             <button className="px-6 py-2 bg-white text-black font-bold rounded-full">Go</button>
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default MainComponent;
