import s from './insights.module.css'
import calendar from '../../assets/calendarTodayBlack24Dp.svg'
import bedRoomIcon from '../../assets/iconsIcoBedroomColored.svg'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import forward from '../../assets/iconsIcoForward.svg'
import iconStatusSuccess from "../../assets/iconsIcoCardStatusSucess.svg";
import st from '../house/house.module.css'
import stl from '../livingRoom/livingRoom.module.css'
import lightIcon from '../../assets/lightIcon.svg'
import plugIcon from '../../assets/iconsIcoPlug.svg'
import airconIcon from '../../assets/iconsIcoHvac.svg'
import temperatureIcon from "../../assets/iconsIcoTemperature.svg";
import humidityIcon from "../../assets/iconsIcoHumidity.svg";
import CreateIcon from "@material-ui/icons/Create";
import {useState} from "react";
import arrowDrop from '../../assets/arrowDropDown24Px.svg'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {GeneralTemplate} from '../HOCs/generalTemplate';
import {Menu, Dropdown, Button} from 'antd';
import 'antd/dist/antd.css';
import {CalendarModal} from "../calendarModel/calendarModel";

export const d = new Date();

type InsightsType = { cost: number, name?: string, icon: any, area: string }


const monthsFull = (["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])


const Calendar = (props : {setActiveModel: (arg: boolean) => void, month:number, year: number}) => {
    return <div className={s.calendar}>

        <div onClick={() => props.setActiveModel(true)}>
            <img src={calendar}/>
        </div>
        <h2 className={s.calendarDate}>{monthsFull[props.month-1]} {props.year}</h2>
    </div>
}

export const Insights = () => {

    const [activeFilter, setActiveFilter] = useState(0)
    const [hidden, setHidden] = useState(true)
    const [year, setYear] = useState(2021)
    const [month, setMonth] = useState<number>(d.getMonth())
    const [activeModel, setActiveModel] = useState<boolean>(false)


    const filters = (["Highest Consumption", "Lowest Consumption", "Most Efficient"])

    const hiddenHandler = (e: any) => {
        if (e.target !== e.currentTarget) return;
        else {
            setHidden(true)
            console.log(hidden)
        }
    }

    const activeFilterHandler = (i: number) => {
        setActiveFilter(i)
        setHidden(true)
    }



    const Content = (equipment: InsightsType, space: InsightsType, filter: string) => <div className={s.insightContent}>
        <div className={[s.filterList, hidden && s.hidden].join(" ")}>
            <ul>
                <li onClick={() => activeFilterHandler(0)}>Highest Consumption</li>
                <li onClick={() => activeFilterHandler(1)}>Lowest Consumption</li>
                <li onClick={() => activeFilterHandler(2)}>Most Efficient</li>
            </ul>
        </div>
        <div className={s.insightTitle}>
            <div>
                <small onClick={hiddenHandler}>Energy</small>
                <h2 onClick={hiddenHandler} className={s.insightDate}>{filter}</h2>
            </div>
            <MoreVertIcon onClick={() => setHidden(false)}/>
        </div>
        <div onClick={() => setHidden(true)} className={s.insightContainer}>
            <div className={s.criterion}>
                <span>By Equipment</span>
                <div><img src={equipment.icon} alt={"aircon"}/></div>
                <div className={s.cost}><span className={s.amount}>{equipment.cost}</span><span
                    className={s.currency}>MUR</span></div>
                <small>{equipment.name}<p>{equipment.area}</p></small>
            </div>
            <div className={s.borderLine}/>
            <div className={s.criterion}>
                <span>By Space</span>
                <div><img src={space.icon} alt={"bedRoomIcon"}/></div>
                <div className={s.cost}><span className={s.amount}>{space.cost}</span><span
                    className={s.currency}>MUR</span></div>
                <small>{space.area}</small>
            </div>
        </div>
    </div>

    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return Content({cost: 845, icon: airconIcon, name: "Aircon", area: "Living Room"}, {
                    cost: 945,
                    icon: bedRoomIcon,
                    area: "Master Bedroom"
                }, filters[0])
            case 1:
                return Content({cost: 845, icon: airconIcon, name: "Aircon", area: "Living Room"}, {
                    cost: 945,
                    icon: bedRoomIcon,
                    area: "Master Bedroom"
                }, filters[1])
            case 2:
                return Content({cost: 45, icon: plugIcon, name: "Plug", area: "Bedroom 1"}, {
                    cost: 145,
                    icon: bedRoomIcon,
                    area: "Bedroom 1"
                }, filters[2])
        }
    }

    return <div>
        <CalendarModal type={"months"} activeModel={activeModel} setActiveModel={setActiveModel} month={month} setMonth={setMonth} setYear={setYear} year={year}/>
        <GeneralTemplate>
            <Calendar setActiveModel={setActiveModel} month={month} year={year} />
            <div onClick={hiddenHandler} className={s.insight}>
                <div onClick={hiddenHandler} className={s.sideImage}/>
                {getStepContent(activeFilter)}
            </div>
            <div className={s.insight}>
                <div className={s.sideImageAnalytics}/>
                <div className={s.analyticsContent}>
                    <div className={s.analysisHeader}>
                        <h2 className={s.insightDate}>Analysis</h2>
                        <div>
                            <img src={forward}/>
                        </div>
                    </div>
                    <div className={s.analysisContent}><span>Aircon Living Room is using 15% more energy than other aircons in the house</span>
                    </div>
                </div>
            </div>
            <div className={[s.energyDistributionCost, "container"].join(" ")}>
                <div className={s.energyDisCostHeader}>
                    <div className={st.successIcon}>
                        <img src={iconStatusSuccess}/>
                    </div>
                    <div>
                        <h2 className={s.insightDate}>Energy Distribution Cost</h2>
                    </div>
                    <div>i</div>
                </div>
                <div>
                    <div className={s.distributedTotally}>
                        <div>
                            <span className={s.disTitle}>Total (MUR)</span>
                            <span className={s.disAmount}>1,254</span>
                        </div>
                    </div>
                </div>
                <div className={s.distributions}>
                    <div className={[s.distributionContainer].join(" ")}>
                        <div className={s.lights}/>
                        <div className={[s.disContent, s.line].join(" ")}>
                            <div className={s.disIcon}>
                                <img src={lightIcon}/>
                            </div>
                            <span>All Plugs</span>
                            <div className={s.distributionCost}>
                                <div>200<span>mur</span></div>
                                <small>30 kWh</small>
                            </div>
                        </div>
                    </div>
                    <div className={[s.distributionContainer].join(" ")}>
                        <div className={s.plugs}/>
                        <div className={[s.disContent, s.line].join(" ")}>
                            <div className={s.disIcon}>
                                <img src={plugIcon}/>
                            </div>
                            <span>All Plugs</span>
                            <div className={s.distributionCost}>
                                <div>200<span>mur</span></div>
                                <small>30 kWh</small>
                            </div>
                        </div>
                    </div>
                    <div className={[s.distributionContainer].join(" ")}>
                        <div className={s.aircons}/>
                        <div className={[s.disContent].join(" ")}>
                            <div className={s.disIcon}>
                                <img src={airconIcon}/>
                            </div>
                            <span>All Plugs</span>
                            <div className={s.distributionCost}>
                                <div>200<span>mur</span></div>
                                <small>30 kWh</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.insight}>
                <div className={s.sideImageHighComfInd}/>
                <div className={s.insightContent}>
                    <div className={s.insightTitle}>
                        <div>
                            <h2 className={s.insightDate}>Highest Comfort Index</h2>
                        </div>
                        <MoreVertIcon/>
                    </div>
                    <div className={s.insightContainer}>
                        <div className={s.criterion}>
                            <span>By Equipment</span>
                            <div><img src={bedRoomIcon} alt={"bed room icon"}/></div>
                            <div className={s.score}>7.5<span className={s.maxScore}>/10</span></div>
                            <small>Master Bedroom</small>
                        </div>
                        <div className={s.borderLine}/>
                        <div className={[stl.indicators, s.indicators].join(" ")}>
                            <div><img src={temperatureIcon} alt={"temperatureIcon"}/><span>25°C</span></div>
                            <div><img src={humidityIcon} alt={"humidityIcon"}/><span>29%</span></div>
                            <div><img src={lightIcon} alt={"lightIcon"}/><span>250<span
                                className={stl.unitOfMes}>lux</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.behindMenu}/>
        </GeneralTemplate>
    </div>
}
