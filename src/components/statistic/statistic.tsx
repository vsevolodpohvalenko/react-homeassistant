import Chart from "react-apexcharts";
import s from './statistic.module.css'
import {ApexOptions} from "apexcharts";
import ReactApexChart from "react-apexcharts";
import './statistic.css'
import {AuthTemplate} from "../HOCs/authTemplate";
import iconLivingRoom from '../../assets/iconsIcoLivingroomColored.svg'
import iconBedRoom from '../../assets/iconsIcoBedroomColored.svg'
import {useState} from "react";
import {d} from "../insights/insights";
import {CalendarModal, months} from "../calendarModel/calendarModel";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {statisticActions} from "../../store/reducers/statisticReducer";

const mockData = ["", "", "", "", "", "", "", ""]


export const Statistic = () => {

    const firstDay = useSelector((state: AppStateType) => state.Calendar.week[0])
    const lastDay = useSelector((state: AppStateType) => state.Calendar.week[state.Calendar.week.length - 1])
    const calendarDay = useSelector((state: AppStateType) => state.Calendar.day)
    const calendarWeek = useSelector((state: AppStateType) => state.Calendar.week)
    const calendarYear = useSelector((state: AppStateType) => state.Calendar.year)
    const calendarMonth = useSelector((state: AppStateType) => state.Calendar.month)

    // @ts-ignore
    const Areas: [{ area: string, icon: any, cost: string, kwh: string, dataKWH: Array<number>, id: number, data: Array<number>, checked: boolean }] = useSelector((state: AppStateType) => state.Statistic.airconDistribution)

    let [data, setData] = useState<any>([{name: "", data: mockData}, {name: "", data: mockData}, {
        name: "",
        data: mockData
    }])
    const [period, setPeriod] = useState(0)
    const [toggle, setToggle] = useState(0)
    const [year, setYear] = useState(2021)
    const [weekDay, setWeekDay] = useState(d.getDay())
    const [month, setMonth] = useState<number>(d.getMonth() + 1)
    const [activeModel, setActiveModel] = useState<boolean>(false)
    const [dayNumber, setDayNumber] = useState(d.getDate())

    let cats: Array<any> = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

    switch (period) {
        case 0:
            cats = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
            break
        case 1:
            cats = calendarWeek
            break
        case 2:
            cats = [1, 5, 10, 15, 20, 25, 30]
            break
        case 3:
            cats = [...months.slice(calendarMonth - 1), ...months.slice(0, 8 - months.slice(calendarMonth).length)]
    }

    const series = data
    const options: ApexOptions = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "straight",
            width: 1.5,
        },
        colors: ['rgb(234, 0, 104)', 'rgb(0, 185, 234)', 'rgb(52, 217, 164)'],
        grid: {
            column: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            row: {
                opacity: 0
            }
        },
        xaxis: {
            categories: cats,
            labels: {
                style: {
                    colors: 'rgb(154, 161, 169)',
                },
            }
        },
        yaxis: {
            min: 0,
            max: toggle === 0 ? 100 : 1,
            tickAmount: 4,
            labels: {
                style: {
                    colors: 'rgb(154, 161, 169)',
                },
            }
        }
    }



    const dispatch = useDispatch()

    // @ts-ignore
    const ChangeHandler = (e: MouseEvent<HTMLInputElement>, roomData: any, id: number) => {
        const newData = [...data]
        const newAirconData = [...Areas]
        if (e.target.checked) {
            newAirconData[id].checked = true
            // @ts-ignore
            newData[id] = roomData
            dispatch(statisticActions.setChecked(newAirconData))
        } else {
            newAirconData[id].checked = false
            // @ts-ignore
            newData[id] = {name: " ", data: mockData}
            dispatch(statisticActions.setChecked(newAirconData))
        }
        setData(newData)
    }

    const periods = ["D", "W", "M", "Y"]
    const changeToggle = (id: number) => {
        for (let i in data) {
            setToggle(id)
            if (data[i].data !== mockData) {
                data[i] = {
                    name: Areas[Number(i)].area,
                    data: toggle === 1 ? Areas[Number(i)].data : Areas[Number(i)].dataKWH
                }
            }
        }
    }


    const StatisticItem = (props: { color: string, checked: boolean, dataKWH: Array<number>, icon: any, area: string, id: number, data: Array<number>, cost: string, kwh: string }) =>
        <div className={s.room}>
            <div className={props.color}/>
            <div><img src={props.icon} alt={"icon"}/></div>
            <div className={s.title}>{props.area}</div>
            <div className={s.cost}>
                <h3>{toggle === 0 ? props.cost : props.dataKWH[props.dataKWH.length - 1] + " kWh"}</h3></div>
            <div>
                <label className="switch">
                    <input checked={props.checked} onClick={(e) => ChangeHandler(e, {
                        name: props.area,
                        data: toggle === 0 ? props.data : props.dataKWH
                    }, props.id)} type="checkbox"/>
                    <span className="slider round"/>
                </label>
            </div>
        </div>
    return <AuthTemplate title={"Aircon Distribution Cost"} compare path={"/"} onCompare={() => setActiveModel(true)}>
        <CalendarModal dayNumber={dayNumber} setDayNumber={setDayNumber} weekDay={weekDay} setWeekDay={setWeekDay}
                       type={["days", "weeks", "months", "years"][period]} activeModel={activeModel}
                       setActiveModel={setActiveModel} month={month}
                       setMonth={setMonth} setYear={setYear} year={year}/>
        <div className={s.period}>{periods.map((e, i) => <div className={[period === i && s.active].join(" ")}
                                                              onClick={() => setPeriod(i)}>{e}</div>)}</div>
        <div className={s.chartPanel}>
            <div className={s.toggle}>
                <div onClick={() => changeToggle(0)} className={[toggle === 0 ? s.active : s.disabled].join(" ")}>MUR
                </div>
                <div className={[toggle === 1 ? s.active : s.disabled].join(" ")} onClick={() => changeToggle(1)}>kWh
                </div>
            </div>
            <div className={s.chartDate}>
                <div>
                    <div className={s.dateLine}/>
                </div>
                {calendarDay} {months[calendarMonth - 1]} {calendarYear}
            </div>
        </div>
        <div>
        </div>
        <ReactApexChart options={options} height={window.screen.height * 0.4} series={series} type="line"/>

        <div>
            {Areas.map((e) => <StatisticItem checked={e.checked} id={e.id} data={e.data} color={'#ffffff'} area={e.area}
                                             dataKWH={e.dataKWH} icon={e.icon} cost={e.cost} kwh={e.kwh}/>)}
        </div>
    </AuthTemplate>
}
