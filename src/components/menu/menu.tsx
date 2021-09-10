import s from './menu.module.css'
import notificationIcon from '../../assets/menu_icons/notifications24Px.svg'
import deviceIcon from '../../assets/menu_icons/tuneBlack24Dp1.svg'
import insightsIcon from '../../assets/menu_icons/insightIcon.svg'
import activeMenuIcon from '../../assets/menu_icons/home24Px1.svg'
import menuIcon from '../../assets/menu_icons/fab1Standard.svg'
import homeIcon from '../../assets/home-inactive.svg'
import activeInsightIcon from '../../assets/menu_icons/insightIconActive.svg'
import activeNotigicationIcon from '../../assets/notification-icon-active.svg'
import {useHistory} from "react-router-dom";

const items = [
    {
        icon: homeIcon,
        activeIcon: activeMenuIcon,
        title: "Home",
        route: '/'
    },
    {
        icon: insightsIcon,
        title: "Insights",
        route: '/insights',
        activeIcon: activeInsightIcon,
    },
    {
        icon: menuIcon,
        title: "",
        className: s.addButton,
        route: '/menu'
    },
    {
        icon: deviceIcon,
        title: "Device",
        route: '/device'
    },
    {
        icon: notificationIcon,
        activeIcon: activeNotigicationIcon,
        title: "Notification",
        route: '/notifications',
        classNameActive: s.notificationActive
    }
]

export const Menu = () => {

    const history = useHistory()

    return <div className={s.menuContainer}>
        {items.map((i) => <div onClick={() => history.push(i.route)} key={i.title} className={[s.mItems].join(" ")}>
            <div className={s.imageContainer}>
                <img
                    className={[i.className && i.className, window.location.pathname === i.route && i.classNameActive].join(" ")}
                    alt={"menuItem"}
                    src={(window.location.pathname === i.route && i.activeIcon) ? i.activeIcon : i.icon}/>
            </div>
            <span className={s.title}>{i.title}</span>
        </div>)}
    </div>
}
