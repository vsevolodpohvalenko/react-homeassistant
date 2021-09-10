import st from "../house/house.module.css";
import s from "./bedRoom.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CreateIcon from "@material-ui/icons/Create";
import bedRoomIcon from '../../assets/iconsIcoBedroomColored.svg'
import energyIcon from "../../assets/iconsIcoEnergyColored.svg";
import cardSuccess from "../../assets/iconsIcoCardStatusSucess.svg";
import temperatureIcon from "../../assets/iconsIcoTemperature.svg";
import humidityIcon from "../../assets/iconsIcoHumidity.svg";
import lightIcon from "../../assets/lightIcon.svg";
import {EnergyData} from "../house/house";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {ComfortBlock, equipments, Equipments, QuickForecast, SingleDoor} from "../livingRoom/livingRoom";

export const BedRoom = () => {
    const history = useHistory()
    const [activeStep, setActiveStep] = useState<number>(0)

    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <ComfortBlock score={7.5} humidity={29} temperature={25} lux={250} tip={"Save 50 MUR by closing curtains which will decrease room temperature, thus using less aircon. "}/>
                    <SingleDoor name={"Door"} since={"Since 4 hrs now"} status={"CLOSED"}/>
                </div>
            case 1:
                return <div>
                    <EnergyData cost={854}/>
                    <QuickForecast message={"Based on followed trends, you will pay 2,756 MUR, an extra of 813 MUR compared to last month."}/>
                    <Equipments equipments={equipments} activeNumber={5}/>
                </div>
        }
    }

    return <div className={st.houseContainer}>
        <div className={[st.houseHeaderContainer, s.bedRoomContainer].join(" ")}>
            <div className={[st.houseHeader, "whiteColor"].join(" ")}><ArrowBackIcon onClick={() => history.push('/')}/><h2 className={"h2WithoutMargin"}>Bed Room</h2>
                <div className={st.create}><CreateIcon/></div>
            </div>
            <div className={[st.houseToggle, s.bedRoomToggle].join(" ")}>
                <div onClick={() => setActiveStep(0)} className={[activeStep === 0 && st.active].join(" ")}>
                    <img src={bedRoomIcon}/>
                </div>
                <div className={[activeStep === 1 && st.active].join(" ")} onClick={() => setActiveStep(1)}>
                    <img src={energyIcon}/>
                </div>
            </div>
        </div>
        <div className={s.bedRoomContent}>
            {getStepContent(activeStep)}
        </div>
    </div>
}
