import s from './house.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import houseIcon from '../../assets/iconsIcoHouseColor.svg'
import energyIcon from '../../assets/iconsIcoEnergyColored.svg'
import securityIcon from '../../assets/iconsIcoSecurity.svg'
import securityLevel from '../../assets/icoSecurtiyLevelOrange.svg'
import openClose from '../../assets/iconsIcoOpenclose.svg'
import forward from "../../assets/iconsIcoForward.svg";
import riseIcon from "../../assets/iconsIcoChangeRise.svg"
import iconStatusCaution from '../../assets/iconsIcoCardStatusCaution.svg'
import iconStatusSuccess from '../../assets/iconsIcoCardStatusSucess.svg'
import {useHistory} from "react-router-dom";
import {useState} from "react";
import billLeft from '../../assets/group3_2021-08-23/group3@3x.jpg'

const doors = ([
        {
            area: "Living Room",
            type: "Front Door",
            status: "CLOSED",
            since: "4 hours"
        },
        {
            area: "Living Room",
            type: "Window 1",
            status: "OPEN",
            since: "4 hours"
        },
        {
            area: "Window 2",
            type: "Front Door",
            status: "CLOSED",
            since: "3 hours"
        },
        {
            area: "Master Bedroom ",
            type: "Window 2",
            status: "CLOSED",
            since: "3 hours"
        },

    ]
)

export const DoorData = (props : {area:string, type: string, status: string, since: string}) => <div className={s.doorContainer}>
    <div className={s.energyCostHeader}>
        <div className={s.successIcon}><img src={iconStatusSuccess}/></div>
        <div>
            <h2>{props.area}</h2>
        </div>
        <div className={s.forward_container}><img className={s.forward} src={forward}/></div>
    </div>

    <div className={s.doorData}>
        <div className={[s.doorsIcon, s.doorStatusIcon].join(" ")}>
            <img src={openClose}/>
        </div>
        <div><small>{props.type}</small>
            <div className={[s.cost, s.doorStatus].join(" ")}>
                {props.status}
            </div>
            <small>{props.since}</small>
        </div>
    </div>
</div>

export const EnergyData = (props: {cost: number}) => <div className={[s.energyCost, "whiteBackGround"].join(" ")}>
    <div className={s.energyCostHeader}>
        <div className={s.successIcon}><img src={iconStatusSuccess}/></div>
        <div>
            <h2 className={"h2WithoutMargin"}>Total Energy Cost</h2>
            <small className={s.period}>Period Mar. 1 to Mar. 8, 2021</small>
        </div>
        <div className={s.forward_container}><img className={s.forward} src={forward}/></div>
    </div>

    <div className={s.energyCostContainer}>
        <div className={s.energyIcon}><img src={energyIcon}/></div>
        <div><span className={s.cost}>{props.cost}</span><span className={s.currency}>MUR</span></div>
    </div>
    <div className={s.energyCostWarning}>
        <div>
            <div><img src={riseIcon}/></div>
            <p>Increased by 156 MUR compared to
                same time period of previous month.</p>
        </div>
    </div>
</div>

const House = () => {

    const SecurityData = () => <div className={s.security}>
        <div className={s.securityHeader}>
            <div>
                <img src={iconStatusCaution}/>
            </div>
            <h2>Security Level</h2>
        </div>
        <div className={s.securityBody}>
            <div className={s.securityIcon}>
                <img src={securityLevel}/>
            </div>
            <div>
                <div className={s.doorsTitle}><span>Doors Opened</span></div>
                <div className={s.doors}>
                    <div className={s.doorsIcon}>
                        <img src={openClose}/>
                    </div>
                    <div>
                        <span className={s.openedDoors}>3</span><span
                        className={s.totalDoors}>/6</span>
                    </div>
                </div>
            </div>
        </div>
    </div>


    const [activeStep, setActiveStep] = useState<number>(0)

    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <div className={s.overview}>
                        <h2>Overview</h2>
                        <SecurityData/>
                        <EnergyData cost={1263}/>
                    </div>
                </div>
            case 1:
                return <div>
                    <EnergyData cost={126}/>
                    <div className={s.bill}>
                        <div className={s.billImageContainer}><img src={billLeft}/></div>
                        <div className={s.billContent}><h2>My Bill Forecast</h2>
                            <div><p>Your bill from March 1 to 31 2021 is estimated to be,12,756 MUR ,an extra of 2,813
                                MUR
                                compared to last month.</p></div>
                        </div>
                    </div>
                    <div className={s.equipments}><h3>Equipments</h3><small>5 Active</small></div>
                    <div className={s.equipmentBlock}>
                        <div className={s.equipmentHeader}>
                            <div className={s.successIcon}><img src={iconStatusSuccess}/></div>
                            <div>
                                <h2>Living Room</h2>
                            </div>
                            <div className={s.forward_container}><img className={s.forward} src={forward}/></div>
                        </div>
                        <div className={s.equipmentContent}>
                            <div className={s.contentItem}>
                                <div>Light</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Plug</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Aircon</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                        </div>
                    </div>
                    <div className={s.equipmentBlock}>
                        <div className={s.equipmentHeader}>
                            <div className={s.successIcon}><img src={iconStatusSuccess}/></div>
                            <div>
                                <h2>Master Bedroom</h2>
                            </div>
                            <div className={s.forward_container}><img className={s.forward} src={forward}/></div>
                        </div>
                        <div className={s.equipmentContent}>
                            <div className={s.contentItem}>
                                <div>Light</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Plug</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Aircon</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                        </div>
                    </div>
                    <div className={s.equipmentBlock}>
                        <div className={s.equipmentHeader}>
                            <div className={s.successIcon}><img src={iconStatusSuccess}/></div>
                            <div>
                                <h2>Kitchen</h2>
                            </div>
                            <div className={s.forward_container}><img className={s.forward} src={forward}/></div>
                        </div>
                        <div className={s.equipmentContent}>
                            <div className={s.contentItem}>
                                <div>Light</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Plug</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Aircon</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                        </div>
                    </div>
                    <div className={s.equipmentBlock}>
                        <div className={s.equipmentHeader}>
                            <div className={s.successIcon}><img src={iconStatusSuccess}/></div>
                            <div>
                                <h2>Patio</h2>
                            </div>
                            <div className={s.forward_container}><img className={s.forward} src={forward}/></div>
                        </div>
                        <div className={s.equipmentContent}>
                            <div className={s.contentItem}>
                                <div>Light</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>
                            <div className={s.equipmentBorder}/>
                            <div className={s.contentItem}>
                                <div>Plug</div>
                                <div>3</div>
                                <small>1 Active</small>
                            </div>

                        </div>
                    </div>
                </div>
            case 2:
                return <div>
                    <SecurityData/>
                    {doors.map((e) => <DoorData area={e.area} type={e.type} status={e.status} since={e.since}/>)}
                </div>
        }
    }

    const history = useHistory()

    return <div className={s.houseContainer}>
        <div className={s.houseHeaderContainer}>
            <div className={s.houseHeader}><ArrowBackIcon onClick={() => history.push('/')}/><h2>House</h2>
                <div className={s.create}><CreateIcon/></div>
            </div>
            <div className={s.houseToggle}>
                <div onClick={() => setActiveStep(0)} className={[activeStep === 0 && s.active].join(" ")}>
                    <img src={houseIcon}/>
                </div>
                <div className={[activeStep === 1 && s.active].join(" ")} onClick={() => setActiveStep(1)}>
                    <img src={energyIcon}/>
                </div>
                <div className={[activeStep === 2 && s.active].join(" ")} onClick={() => setActiveStep(2)}>
                    <img src={securityIcon}/>
                </div>
            </div>
        </div>
        {getStepContent(activeStep)}
    </div>

}

export default House
