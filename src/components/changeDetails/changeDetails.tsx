import s from './changeDetails.module.css'
import st from '../register/register.module.css'
import {AuthTemplate} from "../HOCs/authTemplate";
import {ChangeEvent, useState} from "react";
import {FocusHandler} from "../register/register";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {actions} from "../../store/reducers/AuthReducer";

export const ChangeDetails = () => {

    const [phone, setPhone] = useState("")
    const [activeSlide, setActiveSlide] = useState(0)

    function handlePin(e: ChangeEvent<HTMLInputElement>, i: number) {
        if (e.target.value.length === 1 && i<4){
            document.getElementById(`phonePin${i+1}`)?.focus()
        }
    }

    const history = useHistory()

    const clickHandler = () => {
        if (activeSlide > 0) {
            setActiveSlide(activeSlide-1)
        } else {
            history.push('/')
        }
    }

    const dispatch = useDispatch()

    const saveNewNumber = () => {
        debugger
        dispatch(actions.verifyPhone(phone))
        actions.verifyPhone(phone)
        setActiveSlide(activeSlide+1)
    }

    const Slider = (activeSlide: number) => {
        switch (activeSlide) {
            case 0:
                return <div className={s.changeDetailsContainer}>
                    <h3>Change your Phone Number</h3>
                    <div className={[st.inputBlock, s.inputBlock].join(" ")}>
                        <label id={"surname"} className={[phone.length > 1 && st.active, st.color].join(" ")}>Phone
                            Number</label>
                        <input onFocus={() => FocusHandler("focus", "surname")} onBlur={() => FocusHandler("blur", "surname")}
                               className={[st.cInput, phone.length > 0 && st.isNotEmpty, phone.length > 0 && st.active].join(" ")}
                               onChange={(e) => setPhone(e.target.value)} value={phone}
                               placeholder={"Phone Number"}/>
                    </div>
                    <div onClick={saveNewNumber} className={[s.customButton, phone.length >= 9 && s.active].join(" ")}>
                        <button>SAVE NEW NUMBER</button>
                    </div>
                </div>;
            case 1:
                return <div className={st.code_container}>
                    <div className={s.changeDetailsContainer} ><h3>Please insert your mPin to validate.</h3></div>
                    <div className={st.pin}>
                        {[...Array(4)].map((e, i) => <input id={`phonePin${i}`} maxLength={1} type="password" size={1} key={`pin${i}`}
                                                            onChange={(e) => handlePin(e, i)}
                                                            className={[st.pinInput, s.pitInput].join(" ")}/>)}
                    </div>
                    <div className={st.adaptiveButtons}>
                        <button>Cancel</button>
                        <button onClick={() => {
                            if(activeSlide <1){
                                setActiveSlide(activeSlide+1)
                            } else{
                                history.push('/my-profile')
                            }
                        }} disabled={false} className={st.next}>Next</button>
                    </div>
                </div>
        }
    }

    return <AuthTemplate clickHandler={clickHandler} title={"Change Details"} path={"/"}>
        {Slider(activeSlide)}
    </AuthTemplate>
}
