const ReservationTable = ({ data, type }) => {
    if (!data || data.length === 0) {
        return <p>현재 {type === "golf" ? "골프" : type === "study" ? "독서실" : "프로그램"} 예약 내역이 없습니다.</p>;
    }

    return (
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">예약 번호</th>
                    <th className="border px-4 py-2">예약 일자</th>
                    <th className="border px-4 py-2">상태</th>
                    <th className="border px-4 py-2">상세 정보</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className="border px-4 py-2 text-center">{item.id}</td>
                        <td className="border px-4 py-2 text-center">{item.date}</td>
                        <td className="border px-4 py-2 text-center">{item.status}</td>
                        <td className="border px-4 py-2 text-center">
                            <button className="text-blue-500 hover:underline">상세 보기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReservationTable;
