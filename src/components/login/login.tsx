import s from './login.module.css'
import finger from '../../assets/finger_g.png'
import React, {useState} from "react";
import {login, login_flow} from "../../api/rest/auth_api";
import iconektIcon from '../../assets/iconektLogoForDarkBkg.svg'

const Login = () => {
    const [num1, setNum1] = useState<number | undefined>()
    const [num2, setNum2] = useState<number | undefined>()
    const [num3, setNum3] = useState<number | undefined>()
    const [num4, setNum4] = useState<number | undefined>()

    const loginHandle = async () => {
        const res = await login_flow()
        const password = `${num1}${num2}${num3}${num4}`
        const res2 = await login(password, JSON.parse(localStorage.getItem("userData") as string)[0])
        console.log(res2)
        localStorage.setItem('hassKey', JSON.stringify(res2))
    }

    const CustomInput = (props: { id:string, value: number | undefined, onChange: (e: any) => void }) => {
        return <input id={props.id} type={"password"} value={props.value} onChange={props.onChange} size={1} />
    }

    const ChangeHandler = (e:any, setNumber: (arg:number) => void, num:number) => {
        const x = document.getElementById(`login${num+1}`)
        debugger
        x?.focus()
        console.log(`login${num+1}`)
        num < 4 && setNumber(e.target.value)

    }

    return <div className={s.loading_container}>
        <div className={s.logo_container}><span className={s.logo}><img alt={"iconektIcon"} src={iconektIcon}/></span></div>
        <div className={s.login_container}>
        <div className={s.pin}>
            <input id={`login${1}`}  type={"password"} maxLength={1} value={num1} onChange={(e:any) => ChangeHandler(e, setNum1, 1)} />
            <input id={`login${2}`}  type={"password"} maxLength={1} value={num2} onChange={(e:any) => ChangeHandler(e, setNum2, 2)} />
            <input id={`login${3}`}  type={"password"} maxLength={1} value={num3} onChange={(e:any) => ChangeHandler(e, setNum3, 3)} />
            <input id={`login${4}`}  type={"password"} maxLength={1} value={num4} onChange={(e:any) => ChangeHandler(e, setNum4, 4)} />
        </div>
        <div className={s.button_container}>
            <div><button onClick={loginHandle} className={s.button}>Login</button></div>
            <small>Forgot mPin</small>
        </div>
        <p>Or login with Biometrics</p>
        <div className={s.finger}><img src={finger} alt={'finger print'}/></div>
        <div className={s.suggest}>
            <small>Don't have an account?</small>&nbsp;<p className={s.uc}>Register</p>
        </div>
    </div>
    </div>
}

export default Login
