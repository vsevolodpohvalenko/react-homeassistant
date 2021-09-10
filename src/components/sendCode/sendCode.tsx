import s from "../register/register.module.css";
import {useState} from "react";

export const SendCode = (props: {next: () => void}) => {

    const [invalid, setInvalid] = useState(false)
    const [right, setRight] = useState(false)
    const [code, setCode] = useState<Array<number> | any>([])




    const handleNextValid = () => {

        if (code.join("") === '111111') {
            setRight(true)
            setInvalid(false)


        } else {
            setInvalid(true)
            setRight(false)
        }
    }

    const handleCode = (e: any, i: number) => {
        invalid && setInvalid(false)
        const newCode = code
        newCode[i] = e.target.value
        setCode(newCode)
        console.log(code)
        if (code.join("").length === 6) {
            handleNextValid()
        }
    }

    return <div>
            <div className={s.code_container}>
                <div><h3>Account Verification</h3></div>
                <p className={s.hint}>
                    A 6-digit verification code sent to your mail and SMS
                </p>
                <div className={s.code}>
                    {[...Array(6)].map((e, i) => <input size={1}
                                                        className={[invalid && s.invalid, (right && (i !== 5)) && s.right].join(" ")}
                                                        onChange={(e: any) => handleCode(e, i)}
                                                        type={"password"}/>)}
                </div>
                {invalid && <small className={s.validation}>Verification code does not match</small>}
                <div className={s.links}><small>Didn't receive code?</small>&nbsp;<span>RESEND CODE</span></div>
            </div>
            <div className={[s.options, s.codeOptions].join(" ")}>
                <div className={[s.optButtons].join(" ")}>
                    <button>CANCEL</button>
                    <button disabled={invalid} onClick={props.next} className={s.next}>NEXT</button>
                </div>
            </div>
        </div>
        ;
}
