import { useEffect, useState } from "react";
import { apiCall, getParsedItem } from "../api/utils";
import { useNavigate } from "react-router-dom";

const MyMileageUsagePage = () => {

    const navi = useNavigate();
    const [mileageList, setMileageList] = useState([]);

    useEffect(() => {
        const dong = getParsedItem("dong");
        const ho = getParsedItem("ho");


        if (!dong || !ho) {
            alert(`동과 호수 정보가 누락되었습니다. 설정을 확인해 주세요.`)
            navi(`/`);
            return;
        }


        if (dong && ho) {
            const params = { dong: dong, ho: ho };

            apiCall('/mileage/getlist', 'GET', params)
                .then(response => {
                    console.log(response.data);
                    if (response.data != null) {
                        setMileageList(response.data);
                    } else {
                        // setMoney(0);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // setMoney(0);
        }

    }, []);


    if (mileageList.length === 0) {
        return <div>
            사용 내역이 없습니다.
        </div>
    } else {
        return <div>
            <div className="mileage-history-list">
                {mileageList.map((item) => (
                    <div key={item.mileageId} className="mileage-card">
                        <div className="mileage-header">
                            <h2 className="mileage-name">{item.name}</h2>
                            <span className={`mileage-type ${item.type === '+' ? 'positive' : 'negative'}`}>
                                {item.type === '+' ? '적립' : '사용'}
                            </span>
                        </div>
                        <div className="mileage-details">
                            <p className="mileage-amount">변경 금액: {item.amount}원</p>
                            <p className="mileage-description">설명: {item.description}</p>
                            <p className="mileage-timestamp">
                                {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>;
    }

};

export default MyMileageUsagePage;