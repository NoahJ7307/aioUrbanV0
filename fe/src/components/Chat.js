// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:4000");

// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [chat, setChat] = useState([]);

//     useEffect(() => {
//         // 서버에서 온 메시지를 받을 때마다 채팅 업데이트
//         socket.on('receiveMessage', (newMessage) => {
//             setChat((prevChat) => [...prevChat, newMessage]);
//         });

//         // 컴포넌트 언마운트 시 소켓 연결 해제
//         return () => socket.disconnect();
//     }, []);

//     const sendMessage = () => {
//         if (message.trim()) {
//             const messageData = {
//                 author: "User",
//                 content: message,
//                 timestamp: new Date().toLocaleTimeString(),
//             };
//             socket.emit('sendMessage', messageData); // 서버로 메시지 전송
//             setChat((prevChat) => [...prevChat, messageData]); // 로컬에서도 바로 업데이트
//             setMessage(""); // 입력 필드 초기화
//         }
//     };

//     return (
//         <div style={{ maxWidth: '400px', margin: '0 auto' }}>
//             <h2>Real-Time Chat</h2>
//             <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//                 {chat.map((msg, index) => (
//                     <div key={index}>
//                         <strong>{msg.author}:</strong> {msg.content} <span style={{ fontSize: '0.8em', color: '#888' }}>{msg.timestamp}</span>
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                 placeholder="Type your message..."
//                 style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//             />
//             <button onClick={sendMessage} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
//                 Send
//             </button>
//         </div>
//     );
// };

// export default Chat;
