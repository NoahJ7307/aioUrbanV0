import { useState } from "react";
import { formatNumber } from "../api/utils";



const ManualPayment = () => {
    const [selectPrice, setSelectPrice] = useState(0);
    const [cardNumber, setCardNumber] = useState(['', '', '', '']);
    const [cvc, setCvc] = useState('');


    const changePayment = (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectPrice(value);
    }
    console.log('selectPrice', selectPrice);

    const changeCard = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 4) {
            // 숫자만 입력되도록 제한하고 최대 4자리로 제한
            setCardNumber((pre) => {
                const newCard = [...pre];
                newCard[index] = value;
                return newCard;
            });
        } else {
            alert('숫자로 알맞게 입력하세요.');
        }

    }
    console.log('cardNumber', cardNumber);

    const changeCvc = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 3) {
            // 숫자만 입력되도록 제한하고 최대 3자리로 제한
            setCvc(value);
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
                    {cardNumber.map((num, index) => (
                        <input
                            key={index}
                            type="text"
                            value={num}
                            onChange={(e) => changeCard(e, index)}
                            maxLength="4"

                        />
                    ))}
                </div>
                <div className="cvcInput">
                    <input
                        id="cvc"
                        type="password"
                        value={cvc}
                        onChange={changeCvc}
                        maxLength="3"
                    />
                </div>
            </div>



        </div>
    )
}

export default ManualPayment;