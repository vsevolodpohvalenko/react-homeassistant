import iconChange from '../../assets/icoChange.svg'
import {AuthTemplate} from "../HOCs/authTemplate";
import s from './profile.module.css'
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import buttonPrimary from '../../assets/buttonPrimaryCopy.svg'

export const Profile = () => {
    const data = useSelector((state: AppStateType) => state.Auth.userData)

    const pending = useSelector((state: AppStateType) => state.Auth.pending)

    const history = useHistory()

    return <AuthTemplate title={"My Profile"} path={'/'}>
        <h2 className={s.title}>Personal Details</h2>
        <div className={s.dataContainer}>
            <div>
                <h3>Name</h3>
                <p>{data?.name}</p>
            </div>
            <div>
                <h3>Surname</h3>
                <p>{data?.surname}</p>
            </div>
            <div className={s.changeable}>
                <div>
                    <h3>Email Address</h3>
                    <p>{data?.email_address}</p>
                </div>
                <div className={s.changeIconContainer}><img src={iconChange}  alt={"Change Icon"}/></div>
            </div>
            <div className={s.changeable}>
                <div>
                    <h3>Phone Number</h3>
                    <p className={[pending && s.pending].join(" ")}>{data?.phone_number}</p>
                </div>
                <div onClick={() => history.push('/change-details')} className={s.changeIconContainer}>
                    <img src={iconChange} alt={"Change Icon"}/>
                </div>
            </div>
        </div>
        <div className={[s.verify, !pending && s.hidden].join(" ")}>
            <h3>Please verify Mobile Number </h3> <div onClick={() => history.push("/verification-code")}><img alt={"buttonToVerify"} src={buttonPrimary}/></div>
        </div>
    </AuthTemplate>
}
