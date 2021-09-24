import s from './IdProviderModel.module.css'
import st from '../register/register.module.css'
import stl from '../insights/insights.module.css'
import {FocusHandler} from "../register/register";
import {useState} from "react";
import {getUserData} from "../../api/rest/auth_api";

export const IdProviderModal = (props: { setIdModalIsActive: (arg: boolean) => void }) => {

    const [id, setId] = useState("")

    const IdHandler = async () => {
        if (id.length !== 0){
            const res = await getUserData(id)
        if (res.status === 200) {
            localStorage.setItem("userData", JSON.stringify(res.data[0]))
            props.setIdModalIsActive(false)
        }}
    }

    return <div className={[s.modalContainer].join(" ")}>
        <div className={s.header}>
            <div className={s.title}>First login</div>
            <div className={s.description}>We need the National Id Number for the first login</div>
        </div>
        <div>
            <div className={[st.inputBlock, s.inputBlock].join(" ")}>
                <label id={"name"}
                       className={[id.length > 1 && st.active, isNaN(Number(id)) && s.NaNLabel, st.color, s.label].join(" ")}>Number
                    Id Number</label>
                <input
                    onFocus={() => FocusHandler("focus", "name")}
                    onBlur={() => FocusHandler("blur", "name")}
                    className={[st.cInput, id.length > 0 && st.isNotEmpty, id.length > 0 && st.active, isNaN(Number(id)) && s.NaN].join(" ")}
                    onChange={(e) => setId(e.target.value)} value={id}
                    placeholder={"National ID Number"}/>
            </div>
            <div className={stl.modalButtons}>
                <button onClick={() => props.setIdModalIsActive(false)}>Cancel</button>
                <button onClick={IdHandler}>Confirm</button>
            </div>
        </div>
    </div>
}