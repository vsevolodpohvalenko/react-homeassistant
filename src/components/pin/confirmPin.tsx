import s from "../register/register.module.css";
import {useState} from "react";

export const ConfirmPin = (props: {next: () => void, pin: Array<string>}) => {
    const [confirmPin, setConfirmPin] = useState<Array<number> | any>([])
    const [same, setSame] = useState(false)

    const handleConfirmPin = (e: any, i: number) => {
        Number(e.target.value) !== 0 ? e.target.classList.add(s.activeX) : e.target.classList.remove(s.activeX)
        const newPin = confirmPin
        newPin[i] = e.target.value
        setConfirmPin(newPin)
        console.log(confirmPin, props.pin)
        if (confirmPin.join() === props.pin.join()){
            setSame(true)
        }
    }

    return <div className={s.code_container}>
        <div><h3>Confirm 4-digit mPin</h3></div>
        <div className={s.pin}>
            {[...Array(4)].map((e, i) => <input type="password" size={1} key={`confirmPin${i}`}
                                                onChange={(e) => handleConfirmPin(e, i)}
                                                className={[s.pinInput].join(" ")}/>)}
        </div>
        <div className={s.pinButtons}>
            <button>Cancel</button>
            <button onClick={props.next} disabled={!same} className={s.next}>Next</button>
        </div>
    </div>
}
