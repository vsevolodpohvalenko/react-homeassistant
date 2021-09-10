import s from "../register/register.module.css";
import {useState} from "react";

export const CreatePin = (props: {next: () => void}) => {
    const [pin, setPin] = useState<Array<number> | any>([])

    const [nextAllowed, setNextAllowed] = useState(true)

    const handlePin = (e: any, i: number) => {
        {
            Number(e.target.value) !== 0 && e.target.classList.add(s.activeX)
        }
        {
            Number(e.target.value) === 0 && e.target.classList.remove(s.activeX)
        }
        console.log(Number(e.target.value))
        const newPin = pin
        newPin[i] = e.target.value
        setPin(newPin)
        setNextAllowed(pin.join("").length < 4)
        console.log(pin.join("").length < 4, 'length')
        console.log(pin.join("").length, "pin.join(\"\").length")
    }

    return <div className={s.code_container}>
        <div><h3>Create 4-digit mPin</h3></div>
        <div className={s.pin}>
            {[...Array(4)].map((e, i) => <input type="password" size={1} key={`pin${i}`}
                                                onChange={(e) => handlePin(e, i)}
                                                className={[s.pinInput].join(" ")}/>)}
        </div>
        <div className={s.pinButtons}>
            <button>Cancel</button>
            <button onClick={props.next} disabled={nextAllowed} className={s.next}>Next</button>
        </div>
    </div>
}
