import st from "../house/house.module.css";
import s from './livingRoom.module.css'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CreateIcon from "@material-ui/icons/Create";
import houseIcon from "../../assets/iconsIcoHouseColor.svg";
import energyIcon from "../../assets/iconsIcoEnergyColored.svg";
import livingRoomIcon from '../../assets/iconsIcoLivingroomColored.svg'
import {useState} from "react";
import {useHistory} from "react-router-dom";
import cardSuccess from '../../assets/iconsIcoCardStatusSucess.svg'
import temperatureIcon from '../../assets/iconsIcoTemperature.svg'
import humidityIcon from "../../assets/iconsIcoHumidity.svg"
import lightIcon from "../../assets/lightIcon.svg"
import {DoorData, EnergyData} from "../house/house";
import iconStatusSuccess from "../../assets/iconsIcoCardStatusSucess.svg";
import forward from "../../assets/iconsIcoForward.svg";
import openClose from "../../assets/iconsIcoOpenclose.svg";
import airconIcon from '../../assets/iconsIcoHvac.svg'
import plugIcon from '../../assets/iconsIcoPlug.svg'


export const equipments = ([
    {
        icon: lightIcon,
        title: "Main Light",
        cost: "Cost MUR 55/h",
        link: '/statistic'
    },
    {
        icon: lightIcon,
        title: "Ambient Light",
        cost: "Cost MUR 55/h",
        link: '/statistic'
    },
    {
        icon: airconIcon,
        title: "Air Conditioner",
        cost: "Cost MUR 55/h",
        link: '/statistic'
    },
    {
        icon: plugIcon,
        title: "Plug. TV",
        cost: "Cost MUR 55/h",
        link: '/statistic'
    }

])



export const ComfortBlock = (props: { score: number, temperature: number, humidity: number, lux: number, tip: string }) =>
    <div className={[s.comfort, "container"].join(" ")}>
        <div className={s.confIndexHeader}>
            <img src={cardSuccess}/>
            <span className={s.comfyTitle}>Comfort Index</span>
            <span>i</span>
        </div>
        <div className={s.comfortContent}>
            <div className={s.comfy}><span className={s.comfyBig}>
                                   {props.score}
                                </span>
                <span className={s.comfySmall}>
                                    /10
                                </span></div>
            <div className={s.indicators}>
                <div><img src={temperatureIcon} alt={"temperatureIcon"}/><span>{props.temperature}°C</span></div>
                <div><img src={humidityIcon} alt={"humidityIcon"}/><span>{props.humidity}%</span></div>
                <div><img src={lightIcon} alt={"lightIcon"}/><span>{props.lux} lux</span></div>
            </div>
        </div>
        <div className={s.tipsContainer}>
            <div className={s.image}/>
            <div className={s.tipContent}>
                <h3>Quick Tips</h3>
                <span>Save 50 MUR by closing curtains which will decrease room temperature, thus using less aircon.</span>
            </div>
        </div>
    </div>

export const QuickForecast = (props: { message: string }) => <div className={[s.quickForecast, "container"].join(" ")}>
    <div className={s.sideGround}/>
    <div className={s.quickForecastContent}>
        <h2 className={"h2WithoutMargin"}>Quick Forecast</h2>
        <span>{props.message}</span>
    </div>
</div>

export const SingleDoor = (props: { name: string, status: string, since: string }) => <div
    className={[st.doorContainer, "whiteBackGround"].join(" ")}>
    <div className={st.energyCostHeader}>
        <div className={st.successIcon}><img src={iconStatusSuccess}/></div>
        <div>
            <h2 className={"h2WithoutMargin"}>{props.name}</h2>
        </div>
        <div className={st.forward_container}><img className={st.forward} src={forward}/></div>
    </div>

    <div className={[st.doorData, s.doorData].join(" ")}>
        <div className={[st.doorsIcon, s.singleDoorStatusIcon].join(" ")}>
            <img src={openClose}/>
        </div>
        <div>
            <div className={[st.cost, s.doorStatus].join(" ")}>
                {props.status}
            </div>
            <small>{props.since}</small>
        </div>
    </div>
</div>

const LivingRoomEquipment = (props: {onClick: any, icon: any, title: string, cost: string }) => {
    return <div className={s.equipmentBlock}>
        <div className={s.equipmentHeader}>
            <img src={props.icon}/>
            <div>
                <div className={s.switch}/>
            </div>
            <div onClick={props.onClick} className={s.forwardContainer}>
                <img alt={"forward"} src={forward}/>
            </div>
        </div>
        <div className={s.equipmentContent}>
            <span className={s.equipmentTitle}>{props.title}</span>
            <small>{props.cost}</small>
        </div>
    </div>
}

export const Equipments = (props: { activeNumber: number, equipments: { link: string, cost: string, title: string, icon: any }[] }) => {

    const history = useHistory()

    return <div>
        <div className={s.equipmentsTitle}><h3>Equipments</h3><small>5 Active</small></div>
        <div className={s.equipmentsBlocks}>
            {props.equipments.map((e) => <LivingRoomEquipment onClick={() => history.push(e.link)} cost={e.cost} title={e.title} icon={e.icon}/>)}
        </div>
    </div>
}

export const LivingRoom = () => {
    const history = useHistory()
    const [activeStep, setActiveStep] = useState<number>(0)

    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <ComfortBlock score={7.5} humidity={29} temperature={25} lux={250}
                                  tip={"Save 50 MUR by closing curtains which will decrease room temperature, thus using less aircon. "}/>
                    <div className={s.livingDoor}>
                        <SingleDoor name={"Door to Terrace"} status={"CLOSED"} since={"Since 4 hrs now"}/>
                    </div>
                </div>
            case 1:
                return <div>
                    <div className={s.energyCost}><EnergyData cost={854}/></div>
                    <QuickForecast
                        message={"Based on followed trends, you will pay 2,756 MUR, an extra of 813 MUR compared to last month."}/>
                    <Equipments equipments={equipments} activeNumber={5}/>
                </div>
        }
    }

    return <div className={st.houseContainer}>
        <div className={[st.houseHeaderContainer, s.livingRoomContainer].join(" ")}>
            <div className={[st.houseHeader].join(" ")}><ArrowBackIcon onClick={() => history.push('/')}/><h2
                className={"h2WithoutMargin"}>Living Room</h2>
                <div className={st.create}><CreateIcon/></div>
            </div>
            <div className={[st.houseToggle, s.livingRoomToggle].join(" ")}>
                <div onClick={() => setActiveStep(0)} className={[activeStep === 0 && st.active].join(" ")}>
                    <img src={livingRoomIcon}/>
                </div>
                <div className={[activeStep === 1 && st.active].join(" ")} onClick={() => setActiveStep(1)}>
                    <img src={energyIcon}/>
                </div>
            </div>
        </div>
        <div className={s.livingRoomContent}>
            {getStepContent(activeStep)}
        </div>
    </div>
}
