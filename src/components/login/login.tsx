import s from './login.module.css'
import finger from '../../assets/finger_g.png'
import React, {useState} from "react";
import {login} from "../../api/rest/auth_api";
import iconektIcon from '../../assets/iconektLogoForDarkBkg.svg'
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom"

const Login = () => {
    const history = useHistory()
    const [password, setPassword] = useState<Array<number>>([])


    const loginHandle = async () => {

        const res2 = await login(password.join(""), JSON.parse(localStorage.getItem("userData") as string)[0])
        console.log(res2)
        localStorage.setItem('hassToken', JSON.stringify(res2.data))
        history.push("/")
    }

    const ChangeHandler = (e:any, num:number) => {
        const x = document.getElementById(`login${num+1}`)
        x?.focus()
        let newPassword = [...password]
        newPassword[num-1] = e.target.value
        num < 5 && setPassword(newPassword)


    }

    return <div className={s.loading_container}>
        <div className={s.logo_container}><span className={s.logo}><img alt={"iconektIcon"} src={iconektIcon}/></span></div>
        <div className={s.login_container}>
        <div className={s.pin}>
            <input id={`login${1}`}  type={"password"} maxLength={1} onChange={(e:any) => ChangeHandler(e,1)} />
            <input id={`login${2}`}  type={"password"} maxLength={1} onChange={(e:any) => ChangeHandler(e,2)} />
            <input id={`login${3}`}  type={"password"} maxLength={1} onChange={(e:any) => ChangeHandler(e,3)} />
            <input id={`login${4}`}  type={"password"} maxLength={1} onChange={(e:any) => ChangeHandler(e,4)} />
        </div>
        <div className={s.button_container}>
            <div><button onClick={loginHandle} className={s.button}>Login</button></div>
            <small>Forgot mPin</small>
        </div>
        <p>Or login with Biometrics</p>
        <div className={s.finger}><img src={finger} alt={'finger print'}/></div>
        <div className={s.suggest}>
            <Link className={s.registerLink} to={"/register"}><small>Don't have an account?</small>&nbsp;<p className={s.uc}>Register</p></Link>
        </div>
    </div>
    </div>
}

export default Login
