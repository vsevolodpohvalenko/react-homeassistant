import s from './sideBar.module.css'
import logo from '../../assets/iconektLogoForDarkBkg.svg'
import forward from "../../assets/iconsIcoForward.svg";
import {useHistory} from "react-router-dom";
import profileIcon from '../../assets/sidebar_icons/icoDrawerMyProfile.svg'
import billIcon from '../../assets/sidebar_icons/icoDrawerBills.svg'
import preferencesIcon from '../../assets/sidebar_icons/icoDrawerPreferences.svg'
import termsIcon from '../../assets/sidebar_icons/articleBlack24Dp.svg'
import logoutIcon from '../../assets/sidebar_icons/icoDrawerLogout.svg'
import signUpIcon from '../../assets/add-user.svg'
import {logout} from "../../api/rest/auth_api";
import axios from "axios";

export const SideBar = (props: {open: boolean, setOpen: (open:boolean) => void}) => {

    const history = useHistory()

    const onOpen = (event:any) => {
        if(event.target === event.currentTarget){
            event.stopPropagation()
            props.setOpen(false)
        }
    }

    const LogOut = async () => {
        let res = logout()
        console.log(res)
        history.push("/login")

    }

    const blocks = ([
        {
            icon: profileIcon,
            title: 'My Profile',
            url: '/my-profile'
        },
        {
            icon: billIcon,
            title: 'Bills History',
            url: '#'
        },
        {
            icon: preferencesIcon,
            title: 'Preferences',
        },
        {
            icon: termsIcon,
            title: 'Terms and Conditions',
            url: '/terms-and-conditions'
        },
        {
            icon: logoutIcon,
            title: 'Logout',
            url: '/',
            action: LogOut
        },
        {
            icon: signUpIcon,
            title: 'Register',
            url: '/register'
        },


    ])

    return <div onClick={onOpen} className={[s.side, props.open && s.active].join(" ")}><div className={[s.sideBarContainer].join(" ")}>
        <div className={s.logo}><img src={logo} alt={"logo"}/></div>
        <div>
            {blocks.map((e) => <div key={e.title} onClick={() =>  e.action ? e.action() : history.push(String(e.url))} className={s.sideBarBlock}><div className={s.iconContainer}><img src={e.icon}/></div><h3>{e.title}</h3><div className={s.forward_container}><img alt={"forward"} src={forward}/></div></div>)}
        </div>
    </div></div>
}
