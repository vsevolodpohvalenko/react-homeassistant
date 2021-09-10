import s from './notifications.module.css'
import bookmark from '../../assets/iconsIcoCardStatusNot.svg'
import forward from "../../assets/iconsIcoForward.svg";
import {useState} from "react";
import recomLogo from '../../assets/iconektLogoColorCopy.svg'


const blocks = ([
        {
            title: "Water Pump Inefficient",
            date: "08 March 2021",
            issueNum: 27,
            time: "1 min",
            text: "Both tank is full, yet the water pump is active, suggesting there could be a leakage." +
                "\nThe water pump power consumption is Mur 50 kwh",
            recomText: "Check plumbings for leakage."
        },
        {
            title: "Air Conditioning Inefficient",
            date: "08 March 2021",
            issueNum: 26,
            time: "5 mins",
            text: 'Aircon is active in Master Bedroom. Both window and door are open. \n\nThere could be a pottential loss of MUR 6/min',
            recomText: "Close door and window."
        },


    ]
)

export const Notifications = () => {

    const [extended, setExtended] = useState<Array<boolean>>([false, false])


    const Extend = (i: number) => {
        let newExtended = [...extended]
        newExtended[i] = !newExtended[i]
        setExtended(newExtended)
    }

    const Block = (props : {title: string, issueNum: number, date: string, time: string, text: string, i: number, recomText: string}) => <div><div className={[s.notificationBlock, !extended[props.i] && s.collapsed].join(" ")}>
        <div className={s.bookmark}>
            <img src={bookmark}/>
        </div>
        <div className={s.message}>
            <h2>{props.title}</h2>
            <div>
                <span>Issue {props.issueNum}</span>
                <span className={s.dot}> • </span>
                <span>{props.date}</span>
                <span className={s.dot}> • </span>
                <span>{props.time} ago</span>
                { extended[props.i] && <p className={s.notificationText}>{props.text}</p> }
            </div>
        </div>
        <div className={s.forward_container}>
            <img className={[extended[props.i] && s.animate].join(" ")} onClick={() => Extend(props.i)} alt={"forward"} src={forward}/>
        </div>
    </div>
        { extended[props.i] && <div className={s.recommendations}>
            <div className={s.recomText}><img src={recomLogo}/>
            <div className={s.recomMessage}><h2>Recomendations</h2>
                <p>{props.recomText}</p></div></div>
            <div className={s.recomButtonContainer}><button>More Details</button></div>
        </div> }
    </div>
    return <div className={s.notificationBlocks}>
        {blocks.map((e,i) => <Block title={e.title} i={i} key={e.title} text={e.text} recomText={e.recomText} date={e.date} issueNum={e.issueNum} time={e.time}/>)}
        <div className={s.pillow}/>
    </div>
}
