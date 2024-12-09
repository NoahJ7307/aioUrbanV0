import React, { useState } from 'react'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/public/public.css'
import { useNavigate } from 'react-router-dom'

const initState = {
    phone: '',
    pw: '',
}
const LoginComponent = () => {
    const navigate = useNavigate()
    const [loginParam, setLoginParam] = useState(initState)
    const { doLogin } = useCustomLogin()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({ ...loginParam })

        // // 로그인 시 전화번호만 입력 가능하도록 (추후 주석 해제)
        // const value = e.target.value

        // if (!value.startsWith('010')) {
        //     setLoginParam({
        //         ...loginParam,
        //         phone: '010', // 강제로 '010'으로 고정
        //     })
        //     return
        // }

        // const onlyNum = value.slice(3).replace(/\D/g, '') // 숫자만 남김 ("/\D/g" : 숫자가 아닌 문자를 찾는 정규식)
        // setLoginParam({
        //     ...loginParam,
        //     phone: '010' + onlyNum.slice(0, 8), // 010 이후 8자리까지 제한
        // })
    }

    const handleClick = () => {
        doLogin(loginParam)
        setLoginParam(initState)
    }

    const handleClickFindPw = () => {
        navigate('findPw')
    }
    const handleClickSignUp = () => {
        navigate('/join')
    }


    return (
        <div>
            <div className='formContainer'>
                <div className='formGroup'
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (!loginParam.phone) {
                                // 전화번호가 비어있을 경우 전화번호 입력 필드로 포커스
                                document.getElementsByName("phone")[0].focus();
                            } else if (!loginParam.pw) {
                                // 비밀번호가 비어있을 경우 비밀번호 입력 필드로 포커스
                                document.getElementsByName("pw")[0].focus();
                            } else {
                                // 전화번호와 비밀번호가 모두 입력된 경우 로그인
                                handleClick();
                            }
                        }
                    }}
                >
                    <div className="formGroup">
                        <label className="formLabel">전화번호</label>
                        <input
                            className="inputBox"
                            name="phone"
                            placeholder="전화번호 입력"
                            type="text"
                            value={loginParam.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">비밀번호</label>
                        <input
                            className="inputBox"
                            name="pw"
                            type="password"
                            placeholder="비밀번호 입력"
                            value={loginParam.pw}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="buttonGroup">
                        <button
                            type="button"
                            className="formButton add"
                            style={{ marginRight: "15px", flex: "1" }}
                            onClick={handleClick}
                        >
                            로그인
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '115px' }}>
                    <button
                        style={{ marginTop: '1px', fontSize: '14px' }}
                        onClick={handleClickFindPw}>비밀번호 찾기 &nbsp; ❙</button>
                    <button
                        style={{ marginTop: '1px', fontSize: '14px' }}
                        onClick={handleClickSignUp}> &nbsp; 회원가입 </button>
                </div>
            </div>

        </div>
    )
}

export default LoginComponent