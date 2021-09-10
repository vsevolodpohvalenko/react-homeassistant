import {SideBar} from "../sideBar/sideBar";
import MenuIcon from "@material-ui/icons/Menu";
import {useState} from "react";
import {Menu} from "../menu/menu";
import s from "./authTemplate.module.css";

export const GeneralTemplate = (props:any) => {
    const [open, setOpen] = useState<boolean>(false)

    const openSideBar = () => {
        setOpen(!open)
    }

    return <div className={"dasdad"}>
        <SideBar open={open} setOpen={setOpen} />
        <div className={s.header}>
            <div className={s.headerContentTriple}>
                <div className={s.muiIcon}><MenuIcon onClick={openSideBar} className={s.arrowIcon}/></div>
            <h3>{(window.location.pathname.length > 2 && window.location.pathname.slice(1)[0].toUpperCase() + window.location.pathname.slice(2)) || `${JSON.parse(localStorage.getItem("userData") as string)[0] || "Christopher"}'s Home`}</h3>
            <div/>
            </div>
        </div>
        <div className={[s.content].join(" ")}>
            {props.children}
        </div>
        <Menu/>
    </div>
}

