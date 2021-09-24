import s from "./home.module.css";
import rain from '../../assets/rain.svg'
import forward from '../../assets/iconsIcoForward.svg'
import livingRoom from '../../assets/iconsIcoLivingroomColored.svg'
import masterBedroom from '../../assets/iconsIcoBedroomColored.svg'
import home from '../../assets/iconsIcoHouseColor.svg'
import drop from '../../assets/drop.jpg'
import energy from '../../assets/iconsIcoEnergyColored.svg'
import rise from '../../assets/iconsIcoChangeRise.svg'
import {useEffect, useState} from "react";
import {actions} from "../../store/reducers/WeatherReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {GeneralTemplate} from "../HOCs/generalTemplate";
import temperatureIcon from '../../assets/iconsIcoTemperature.svg'
import humidityIcon from "../../assets/iconsIcoHumidity.svg"
import lightIcon from "../../assets/lightIcon.svg"
import axios from "axios";
import {Redirect, useHistory} from "react-router-dom";
const port = JSON.parse(localStorage.getItem("userData") as string)?.url || 0
export const ws = new WebSocket(`wss://iconekt-api.idin.tech:${port}/api/websocket`);
const today = new Date();

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const Home = () => {

    const history = useHistory()
    const [house, setHouse] = useState(false)
    const [expandedLivingRoom, setExpandedLivingRoom] = useState(false)
    const [expandedBedRoom, setExpandedBedRoom] = useState(false)
    const [expandedMasterBedRoom, setExpandedMasterBed] = useState(false)

    if (localStorage.getItem("conf")){
        axios.post("https://django-auth-service.herokuapp.com/api/core-config", {port: JSON.parse(localStorage.getItem("userData") as string)?.url, access_token : JSON.parse(localStorage.getItem("hassToken") as string)?.access_token})
    }

    const RoomBlock = (props: { trigger: any, name: string, icon: any, setter: (value: boolean) => void, path: string }) =>
        <div className={s.house_container}>
            <div className={s.house_up}>
                <div className={s.room_icon}>
                    <img onClick={() => history.push(props.path)} className={s.home_image} alt={"home"}
                         src={props.icon}/>
                </div>
                <div onClick={() => history.push(props.path)} className={s.house_title}>
                    <div className={s.title}>
                        <h2>{props.name}</h2>
                    </div>
                </div>
                <div onClick={() => props.setter(!props.trigger)} className={s.forward_container}>
                    <img alt={"forward"} src={forward}/>
                </div>
            </div>
            {props.trigger && <div className={s.line}/>}
            {props.trigger && <div className={s.indicators}>
                <div className={s.indicatorItem}>
                    <div className={s.indicatorIcon}>
                        <img src={temperatureIcon}/>
                    </div>
                    <div>
                        <small>Ambient Temp.</small>
                        <div className={s.indicatorContent}>
                            <span>25°C</span>
                            <img className={s.rise} src={rise}/>
                        </div>
                    </div>
                </div>
                <div className={s.indicatorItem}>
                    <div className={s.indicatorIcon}>
                        <img src={humidityIcon}/>
                    </div>
                    <div>
                        <small>Moisture</small>
                        <div className={s.indicatorContent}>
                            <span>29</span>
                            <span>%</span>
                            <img className={s.rise} src={rise}/>
                        </div>
                    </div>
                </div>
                <div className={s.indicatorItem}>
                    <div className={s.indicatorIcon}>
                        <img src={lightIcon}/>
                    </div>
                    <div>
                        <small>Light Level</small>
                        <div className={s.indicatorContent}>
                            <span>25</span>
                            <span>lux</span>
                            <img className={s.rise} src={rise}/>
                        </div>
                    </div>
                </div>
            </div>
            }
            {expandedLivingRoom &&
            <div className={[s.indicatorsUpdated].join(" ")}><small>Updated 5 mins ago</small></div>}
        </div>

    const dispatch = useDispatch()
    const weather = useSelector((state: AppStateType) => state.Weather.weather)

    useEffect(() => {
        if (localStorage.getItem("hassToken")) {
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    access_token: JSON.parse(localStorage.getItem("hassToken") as string).access_token,
                    type: "auth"
                }))
                ws.send(JSON.stringify({
                    event_type: "state_changed",
                    id: 2,
                    type: "subscribe_events"
                }))
                ws.send(JSON.stringify({
                    id: 3,
                    type: "get_states"
                }))

                !localStorage.getItem("longLivedToken") && ws.send(JSON.stringify({
                    id: 11,
                    type: "auth/long_lived_access_token",
                    client_name: "New token1",
                    lifespan: 365
                }))

                ws.send(JSON.stringify({
                    "id": 19,
                    "type": "get_config"
                }))

                if (!localStorage.getItem("conf")) {ws.send(JSON.stringify({
                    currency: "UAH",
                    elevation: 25,
                    id: 24,
                    latitude: 46.58906908309185,
                    location_name: "Home",
                    longitude: 32.44262695312501,
                    time_zone: "Europe/Kiev",
                    type: "config/core/update",
                    unit_system: "metric",
                }))
                    localStorage.setItem("conf", JSON.stringify(true))
                }
                ws.send(JSON.stringify({
                    "id": 30,
                    "type": "config_entries/flow/progress"
                }))
            }
        }

        ws.addEventListener('message', (e) => {
            const data = JSON.parse(e.data)
            console.log(data)
            if (data.id === 11) {
                if (data.result) {
                    localStorage.setItem("longLivedToken", data.result)
                }
            } else if (data.id === 3) {
                const weather = data.result.filter((e: any) => e.entity_id === "weather.home")[0]
                console.log(weather)
                dispatch(actions.getWeatherAction(weather))
            }
        })
    }, [])

    const WeatherTitle = (weatherTitle: string) => {
        if (weatherTitle.includes("cloudy")) {
            const firstPart = weatherTitle.replace('cloudy', " ")
            return firstPart[0].toUpperCase() + firstPart.slice(1) + ' Cloudy'
        } else {
            return weatherTitle[0].toUpperCase() + weatherTitle.slice(1)
        }
    }


    return !localStorage.getItem("hassToken") ? <Redirect to={"/register"}/> : <GeneralTemplate>
        <div className={s.container}>

            <div className={[s.homeContainer].join(" ")}>
                <div className={s.greetings}>
                    <h1>Hello { JSON.parse(localStorage.getItem("userData") as string)?.name || "Christopher"}!</h1><small>{String(today.getDate()).padStart(2, '0')} {monthNames[(today.getMonth())]} {today.getFullYear()}</small>
                </div>
                <div className={s.data_container}>
                    <div className={s.temperature}>{weather?.attributes ? String(weather?.attributes.temperature).slice(0, 2) : 27}°C</div>
                    <div className={s.weather}><img alt={"weather_icon"} src={rain}/></div>
                    <h3 className={s.weather_text}>{WeatherTitle(weather?.state || "Rainy")}</h3>
                    <small className={s.location}>Rose Hill, Mauritius, Planes Wilhelm's</small>
                </div>
                {house ? <div className={s.house_container}>
                        <div className={s.house_up}>
                            <img onClick={() => history.push('/house')} className={s.home_image} alt={"home"} src={home}/>
                            <div onClick={() => history.push('/house')} className={s.house_title}>
                                <div className={s.title}>
                                    <h2>House</h2>
                                </div>
                            </div>
                            <div className={s.forward_container}>
                                <img onClick={() => setHouse(!house)} alt={"forward"} src={forward}/>
                            </div>
                        </div>
                        <div className={s.line}/>
                        <div className={s.house}>
                            <div className={s.cost_container}>
                                <div>
                                    <img className={[s.home_image, s.cost_image].join(" ")} alt={"energy"} src={energy}/>
                                </div>
                                <div>
                                    <div className={s.cost}>
                                        <div className={s.cost_title}>
                                            <small>Energy Cost (MUR)</small>
                                        </div>
                                        <span>1,254</span>
                                        <img className={s.rise} alt={rise} src={rise}/>
                                    </div>
                                </div>
                            </div>
                            <div className={s.cost_container}>
                                <div className={s.cost_image_container}>
                                    <img className={[s.home_image, s.cost_image].join(" ")} alt={"drop"} src={drop}/>
                                </div>
                                <div>
                                    <div className={s.cost}>
                                        <div className={s.cost_title}>
                                            <small>
                                                Water cost (MUR)
                                            </small>
                                        </div>
                                        <span>
                                        132
                                    </span>
                                        <img className={s.rise} alt={rise} src={rise}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.period}><small>Cost as form Mar 1 to Mar 8 2021</small></div>
                    </div> :
                    <div className={s.room_block}>
                        <div onClick={() => history.push('/house')} className={s.room_icon}><img alt={"livingRoom"}
                                                                                                 src={home}/></div>
                        <div onClick={() => history.push('/house')} className={s.title}><h2>House</h2></div>
                        <div className={s.forward_container}><img onClick={() => setHouse(!house)} alt={"forward"}
                                                                  src={forward}/></div>
                    </div>}
                <RoomBlock path={'/living-room'} trigger={expandedLivingRoom} setter={setExpandedLivingRoom}
                           name={"Living Room"} icon={livingRoom}/>
                <RoomBlock path={'/bed-room'} trigger={expandedBedRoom} setter={setExpandedBedRoom}
                           name={"Master Bedroom"} icon={masterBedroom}/>
                <RoomBlock path={'/bed-room'} trigger={expandedMasterBedRoom} setter={setExpandedMasterBed}
                           name={"Bedroom 1"} icon={masterBedroom}/>
            </div>
            <div className={s.helper}/>
        </div>
    </GeneralTemplate>
}

export default Home
