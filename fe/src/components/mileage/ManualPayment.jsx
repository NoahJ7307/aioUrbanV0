import { useRef, useState } from "react";
import { formatNumber } from "../api/utils";



const ManualPayment = () => {
    const [selectPrice, setSelectPrice] = useState(0);
    const cardNumberRef = [useRef(), useRef(), useRef(), useRef()];
    const cvcRef = useRef();
    // const [cardNumber, setCardNumber] = useState(['', '', '', '']);
    // const [cvc, setCvc] = useState('');


    const changePayment = (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectPrice(value);
    }
    console.log('selectPrice', selectPrice);

    const changeCard = (e, index) => {
        const {value} = e.target;

        if (!/^\d*$/.test(value)) {
            e.target.value = value.replace(/\D/g, ''); // 숫자 외 문자를 제거
            alert('숫자로 알맞게 입력하세요.');
            return;
        }
        if(value.length === 4 ){
            if(index === cardNumberRef.length - 1 ){
                cvcRef.current.focus();
            }else{
                cardNumberRef[index+1].current.focus();
            }
        }
    }
    console.log('cardNumberRef 상태:', cardNumberRef.map((ref) => ref.current?.value || ''));
    console.log('cvcRef',cvcRef.current);
    const changeCvc = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 3) {
            // 숫자만 입력되도록 제한하고 최대 3자리로 제한
            cvcRef.current = value;
        } else {
            alert('숫자로 알맞게 입력하세요.');
        }

    };

    return (
        <div className="manualPayment">
            
            <p>
                1. 결제 금액 선택하기
            </p>
            <div className="paymentRadio">
                <input type="radio" name="payment" id="10000" value={10000}
                    onChange={changePayment}
                    hidden />
                <input type="radio" name="payment" id="30000" value={30000}
                    onChange={changePayment}
                    hidden />
                <input type="radio" name="payment" id="50000" value={50000}
                    onChange={changePayment}
                    hidden />
                <label htmlFor="10000">{formatNumber(10000)}원</label>
                <label htmlFor="30000">{formatNumber(30000)}원</label>
                <label htmlFor="50000">{formatNumber(50000)}원</label>
            </div>

            <p>
                2. 결제 수단 입력하기
            </p>
            <div className="paymentGrid">
                <span> 카드 번호</span>
                <label htmlFor="cvc">CVC</label>
                <div class="cardInput">
                    {cardNumberRef.map((num, index) => (
                        <input
                            key={index}
                            type="text"
                            ref={num}
                            onChange={(e) => changeCard(e, index)}
                            maxLength="4"

                        />
                    ))}
                </div>
                <div className="cvcInput">
                    <input
                        id="cvc"
                        type="password"
                        ref={cvcRef}
                        onChange={changeCvc}
                        maxLength="3"
                    />
                </div>
            </div>



        </div>
    )
}

export default ManualPayment;