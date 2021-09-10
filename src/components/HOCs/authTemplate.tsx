import s from "./authTemplate.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {SideBar} from "../sideBar/sideBar";
import {useHistory} from "react-router-dom";
import compareButton from '../../assets/compareArrows24Px.svg'

export const AuthTemplate = (props: any) => {

    const history = useHistory()

    const handleBack = () => {
        history.push(props.path)
    }
    // dcsdcd
    return <div>
        <div className={s.header}>
            <div className={[s.headerContentTriple ].join(" ")}>
                <div className={s.muiIcon}><ArrowBackIcon onClick={props.clickHandler || handleBack} className={s.arrowIcon}/></div>
                <h3>{props.title}</h3>
                <div><img onClick={props.onCompare} className={[!props.compare && s.hidden].join(" ")} src={compareButton}/></div>
            </div>
        </div>
        <div className={[s.content].join(" ")}>
            {props.children}
        </div>

    </div>
}
