import s from "../register/register.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {actions} from "../../store/reducers/AuthReducer";
import {AuthTemplate} from "../HOCs/authTemplate";

export const VerificationCode = () => {
    const valid = useSelector((state: AppStateType) => state.Auth.codeIsValid)
    const code = useSelector((state: AppStateType) => state.Auth.code)
    const dispatch = useDispatch()

    function handleNextValid() {

    }

    const handleCode = (e: any, i: number) => {
        if (e.target.value.length === 1 && i<6){
            document.getElementById(`verifyPhone${i+1}`)?.focus()
        }
        {
            Number(e.target.value) !== 0 && e.target.classList.add(s.activeX)
        }
        {
            Number(e.target.value) === 0 && e.target.classList.remove(s.activeX)
        }
        !valid && dispatch(actions.validate(true))
        const newCode = code
        newCode[i] = e.target.value
        dispatch(actions.setCode(newCode))
        console.log(code)
        if (code.join("").length === 6) {
            handleNextValid()
        }
    }

    function handleNext() {

    }

    return <AuthTemplate title={"Register"} path={'/'}>
        <div className={s.verificationCodeContainer}>
        <div className={s.code_container}>
            <div><h3>Account Verification</h3></div>
            <p className={s.hint}>
                A 6-digit verification code sent to your mail and SMS
            </p>
            <div className={s.code}>
                {[...Array(6)].map((e, i) => <input id={`verifyPhone${i}`} maxLength={1} size={1}
                                                    className={[!valid && s.invalid].join(" ")}
                                                    onChange={(e: any) => handleCode(e, i)}
                                                    type={"password"}/>)}
            </div>
            {!valid && <small className={s.validation}>Verification code does not match</small>}
            <div className={s.links}><small>Didn't receive code?</small>&nbsp;<span>RESEND CODE</span></div>
        </div>
        <div className={[s.adaptiveButtons].join(" ")}>
            <button>CANCEL</button>
            <button disabled={!valid} onClick={() => handleNext()} className={s.next}>NEXT</button>
        </div>
        </div>
    </AuthTemplate>;
}
