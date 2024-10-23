import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginPostAsync, logout } from '../../slice/loginSlice'

const useCustomLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.loginSlice)

    const loadLoginData = () => {
        const token = localStorage.getItem("token")
        const uno = localStorage.getItem("uno")
        const role = localStorage.getItem("role")
        const dong = localStorage.getItem("dong")
        const ho = localStorage.getItem("ho")
        return { token, uno, role, dong, ho }
    }

    const isLogin = loadLoginData().token != null

    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam))

        if (action.type === 'loginPostAsync/fulfilled') {
            const { accessToken, uno, roleNames, dong, ho } = action.payload
            console.log(action.payload)
            localStorage.setItem("token", accessToken)
            localStorage.setItem("uno", uno)
            localStorage.setItem("role", roleNames)
            localStorage.setItem("dong", dong)
            localStorage.setItem("ho", ho)
            alert("Login Complete")
            moveToPath('/')
        } else {
            alert('Check your PhoneNumber or Password')
            moveToPath('/login')
        }

        return action.payload
    }
    const doLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        dispatch(logout())
    }

    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace: true }) // replace:true >> 페이지 이동기록 덮어쓰기(뒤로가기 불가)
    }


    return { navigate, dispatch, loginState, isLogin, doLogin, doLogout, moveToPath, loadLoginData }
}

export default useCustomLogin