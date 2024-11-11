import { useState } from "react";
import { formatNumber } from "../api/utils";


const AutomaticPayment = () => {
    const [cardNumber, setCardNumber] = useState(['', '', '', '']);
    const [cvc, setCvc] = useState('');

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
        <div className="automaticPayment">
            <p>자동 결제 등록하기</p>
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

export default AutomaticPayment;