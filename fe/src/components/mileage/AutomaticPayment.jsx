import { useRef } from "react";
import { formatNumber } from "../api/utils";


const AutomaticPayment = () => {
    const cardNumberRef = [useRef(), useRef(), useRef(), useRef()];
    const cvcRef = useRef();

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
        <div className="automaticPayment">
            <p>자동 결제 등록하기</p>
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

export default AutomaticPayment;