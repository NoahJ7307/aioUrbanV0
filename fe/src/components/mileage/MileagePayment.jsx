import { NavLink, Routes, Route } from 'react-router-dom';
import ManualPayment from './ManualPayment';
import AutomaticPayment from './AutomaticPayment';
import '../../css/mileageManagement/mileagePayment.css'
import { useState } from 'react';
import { formatNumber } from '../api/utils';



const MileagePayment = () => {



    const [click, setClick] = useState(true);


    return (
        <div className="mileageContainer">
            <div className='mileageDescriptionContainer'>
            <h2>마일리지</h2>
            <p className='mileageDescription' >마일리지는 <span className='redpoint'>가족 단위</span>로 함께 사용할 수 있으며,<br />
                다양한 서비스에 활용이 가능합니다.<br />
                시설 이용이나 마켓 구매, 주차권 결제 등 다양한 곳에서 사용하실 수 있어 생활 속 편리함을 제공합니다.<br /><br />

                결제 방식은 사용자가 직접 결제하는 <span className='thickpoint'>수동 결제</span>와 일정 조건에 따라 자동으로 결제되는 <span className='thickpoint'>자동 결제</span> 시스템이 있습니다.<br />
                <span className='redpoint'>자동 결제</span>를 설정하시면 더욱 편리하게 마일리지를 이용하실 수 있습니다.<br /><br />

                각자의 사용 방식에 맞는 결제 옵션을 선택하여 마일리지를 효율적으로 활용해 보세요!</p>

            </div>
                <div className='balace'>
                현재 잔액 : <span className='redpoint'>db 요청 금액</span> 원
                </div>
            <nav className='mileageLink'>
                <NavLink to="manual"
                    onClick={() => setClick(true)}>
                    <span className='linkname'>수동 결제</span>
                    <img className='mileageIcon' src={click ? '/images/cursorIcon2.png' : '/images/cursorIcon.png'} alt="결제 아이콘" />
                </NavLink>
                <NavLink to="auto"
                    onClick={() => setClick(false)}>
                    <span className='linkname'>자동 결제</span>
                    <img className='mileageIcon' src={click ? '/images/cursorIcon.png' : '/images/cursorIcon2.png'} alt="결제 아이콘" />
                </NavLink>
            </nav>

            <Routes>
                <Route path="manual" element={<ManualPayment />} />
                <Route path="auto" element={<AutomaticPayment />} />
            </Routes>
        </div>
    )

};

export default MileagePayment;