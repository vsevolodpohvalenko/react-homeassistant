import {useState} from "react";
import {Button, Dropdown, Menu} from "antd";
import s from "../insights/insights.module.css";
import CreateIcon from "@material-ui/icons/Create";
import arrowDrop from "../../assets/arrowDropDown24Px.svg";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {d} from "../insights/insights";
import st from './calendarModel.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {calendarActions} from "../../store/reducers/CalendarReducer";

export const months = (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"])
export const weekDays = (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])

export const CalendarModal = (props: { dayNumber?: number, setDayNumber?: (arg: any) => void, weekDay?: number, setWeekDay?: (arg: number) => void, type: string, setActiveModel: (arg: boolean) => void, activeModel: boolean, setMonth: (arg: number) => void, setYear: (arg: number) => void, month: number, year: number }) => {

    const days = function (month: number, year: number) {
        return new Date(year, month, 0).getDate();
    };
    const dispatch = useDispatch()
    const firstDay = useSelector((state: AppStateType) => state.Calendar.week[0])
    const lastDay = useSelector((state: AppStateType) => state.Calendar.week[state.Calendar.week.length - 1])
    const calendarDay = useSelector((state: AppStateType) => state.Calendar.day)
    const calendarWeek = useSelector((state: AppStateType) => state.Calendar.week)
    const calendarMonth = useSelector((state: AppStateType) => state.Calendar.month)
    const second = useSelector((state: AppStateType) => state.Calendar.second)
    const calendarYear = useSelector((state: AppStateType) => state.Calendar.year)
    const AmountOfDays = days(calendarMonth, props.year)
    const [select, setSelect] = useState<boolean>(false)
    const [activeStep, setActiveStep] = useState<number>(1)


    const getWeekDay = (day: string) => new Date(calendarYear + "-" + calendarMonth + `-${day}`).getDay();

    const monthDays: (string | number)[] = []

    for (let i = 0; i < getWeekDay("01"); i++) {
        monthDays.push("")
    }
    for (let i = 1; i <= AmountOfDays; i++) {
        monthDays.push(i)
    }
    const selectHandler = () => {
        setSelect(false)
        props.setActiveModel(false)
    }

    const changeMonth = (id: number) => {
        dispatch(calendarActions.setMonth(id))
        setSelect(true)
    }

    const changeYear = (id: number) => {
        dispatch(calendarActions.setYear(d.getFullYear() - id))
        setSelect(true)
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={() => changeYear(2)}>2019</Menu.Item>
            <Menu.Item onClick={() => changeYear(1)}>2020</Menu.Item>
            <Menu.Item onClick={() => changeYear(0)}>2021</Menu.Item>
        </Menu>
    );

    const MonthChangeHandler = (action: string) => {
        if (action === 'plus' && calendarMonth < 12) {
            dispatch(calendarActions.setMonth(calendarMonth + 1))
        } else if (action === 'minus' && calendarMonth > 1) {
            dispatch(calendarActions.setMonth(calendarMonth - 1))
        } else if (calendarMonth === 1) {
            dispatch(calendarActions.setMonth(12))
            dispatch(calendarActions.setYear(calendarYear - 1))
        } else {
            dispatch(calendarActions.setMonth(1))
            dispatch(calendarActions.setYear(calendarYear + 1))
        }
    }

    const arrows = (action: string) => {
        setSelect(true)
        if (props.type !== "days") {
            MonthChangeHandler(action)
        } else {
            if (action === "plus"){
                if (calendarDay < AmountOfDays) {
                    dispatch(calendarActions.setDay(calendarDay + 1))
                }
                else {
                    dispatch(calendarActions.setDay(1))
                    MonthChangeHandler(action)
                }
            } else if (action === "minus"){
                if ( calendarDay > 1) {
                    dispatch(calendarActions.setDay(calendarDay - 1))
                } else {
                    dispatch(calendarActions.setDay(days(calendarMonth-1, props.year)))
                    MonthChangeHandler(action)
                }
            }
        }
    }

    const nextHandler = () => {
        if (activeStep === 1) {
            setActiveStep(2)
        } else {
            props.setActiveModel(false)
            setActiveStep(1)
        }
    }

    const setWeek = (e: number) => {
        const arr = []
        for (let i = e; i < e + 10; i++) {
            arr.push(i)
        }
        dispatch(calendarActions.setWeek(arr))
    }

    const secondHandler = (i: number, type: string) => {
        const newSecond = {...second}
        switch (type) {
            case "day":
                newSecond.secondDay = i
                dispatch(calendarActions.setSecond(newSecond))
                break
            case "month":
                newSecond.secondMonth = i
                dispatch(calendarActions.setSecond(newSecond))
                break
        }
    }

    const Calendars = (type: string) => {
        switch (type) {
            case "days":
                return <div>
                    <div className={st.weekDays}>{weekDays.map((e, i) => <div>{e[0]}</div>)}</div>
                    { activeStep === 1 ? <div className={st.monthDays}>{monthDays.map((e) => <div
                        className={[e === calendarDay && st.activeDay].join(" ")}
                        onClick={() => dispatch(calendarActions.setDay(e))}>{e}</div>)}</div> : <div className={st.monthDays}>{monthDays.map((e) => <div
                        className={[e === calendarDay && st.activeDayStepTwo, e === second.secondDay && st.activeDay].join(" ")}
                        onClick={() => secondHandler(e as number,"day")}>{e}</div>)}</div>
                    }
                </div>
            case "weeks":
                return <div>
                    <div className={st.weekDays}>{weekDays.map((e, i) => <div>{e[0]}</div>)}</div>
                    { activeStep === 1 && <div className={st.monthDays}>{monthDays.map((e) => <div
                        className={[(Number(e) - firstDay) < 8 && firstDay !== 0 && (Number(e) - firstDay) >= 0 && s.active, Number(e) === firstDay && s.firstActive, firstDay + 7 === Number(e) && s.lastActive].join(" ")}
                        onClick={() => setWeek(e as number)}>{e}</div>)}</div>}
                </div>
            case "months":
            case"years":
                return <div className={s.months}>
                    {activeStep === 1 ? months.map((e: string, i) => <div onClick={() => changeMonth(i+1)} className={[s.month, calendarMonth === i + 1 && s.active].join(" ")}>{e}</div>) : months.map((e: string, i) => <div onClick={() => secondHandler(i as number,"month")} className={[s.month, calendarMonth === i + 1 && s.postActive, i === second.secondMonth && s.active].join(" ")}>{e}</div>)}
                </div>
        }
    }


    // const Buttons = (type: string) => {
    //     switch (type) {
    //         case "days":
    //             return <div className={s.modalButtons}>
    //                 <button onClick={() => props.setActiveModel(false)}>Cancel</button>
    //                 <button disabled={!firstDay} onClick={nextHandler}>{activeStep === 1 ? "Next" : "Select"}</button>
    //             </div>
    //         case "weeks":
    //             return <div className={s.modalButtons}>
    //                 <button onClick={() => props.setActiveModel(false)}>Cancel</button>
    //                 <button disabled={!firstDay} onClick={nextHandler}>Next</button>
    //             </div>
    //         case "months":
    //         case"years":
    //             return <div className={s.modalButtons}>
    //                 <button onClick={() => props.setActiveModel(false)}>Cancel</button>
    //                 <button disabled={!firstDay} onClick={nextHandler}>Next</button>
    //             </div>
    //     }
    // }
    return <div>
        <div className={[s.modalBackground, !props.activeModel && s.hidden].join(" ")}/>
        <div className={[s.modalCalendar, !props.activeModel && s.hidden].join(" ")}>
            <div
                className={[s.modelHeader, activeStep === 2 && s.secondBackground, props.type === "months" && "whiteColor", props.type === "days" && st.headerDays].join(" ")}>
                <div className={s.selectMonth}>Select Month</div>
                <div className={s.currentData}>
                    <h2 className={[props.type === "months" && "h2WithoutMargin", props.type !== "days" && "whiteColor"].join(" ")}>{(props.type === "days" || props.type === "weeks") && weekDays[getWeekDay(calendarDay < 10 ? `0${calendarDay}` : calendarDay) as number].slice(0, 3) + ", " + months[calendarMonth - 1] + " " + calendarDay}{(props.type === "months" || props.type === "years") && months[calendarMonth - 1]} {(props.type === "months" || props.type === "years") && calendarYear}</h2>
                    <div>
                        <CreateIcon/>
                    </div>
                </div>
            </div>
            <div className={s.triggers}>
                <span>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                        <Button className={s.antButton}>{calendarYear}<img src={arrowDrop} alt={"arrow"}/></Button>
                    </Dropdown>
                </span>
                <div>
                </div>
                <div className={s.arrows}>
                    <div><KeyboardArrowLeftIcon onClick={() => arrows("minus")} className={s.arrowLeft}/>
                        <KeyboardArrowRightIcon onClick={() => arrows("plus")}/></div>
                </div>
            </div>
            {/*{props.type === "weeks" && activeStep === 1 && <div className={st.monthDays}>{monthDays.map((e) => <div className={[(Number(e) - firstDay) < 8 && firstDay !==0 && (Number(e) - firstDay) >= 0 && s.active, Number(e) === firstDay && s.firstActive, firstDay + 7 === Number(e) && s.lastActive ].join(" ")} onClick={() => setFirstDay(e as number)}>{e}</div>)}</div>}*/}
            {/*{props.type === "days" && activeStep === 1 && <div className={st.monthDays}>{monthDays.map((e) => <div className={[ Number(e) === day && s.active].join(" ")} onClick={() => props.setDayNumber(e)}>{e}</div>)}</div>}*/}
            {/*{props.type === "weeks" && activeStep === 2 && <div className={st.monthDays}>{monthDays.map((e) => <div className={[(Number(e) - lastDay) < 8 && lastDay!== 0 && (Number(e) - lastDay) >= 0 && s.activeSecond, Number(e) === firstDay && s.firstActive, firstDay + 7 === Number(e) && s.lastActive, (Number(e) - firstDay) < 8 && (Number(e) - firstDay) >= 0 && s.postActive, Number(e) === lastDay && s.firstActive, lastDay + 7 === Number(e) && s.lastActive].join(" ")} onClick={() => setSecondDay(e as number)}>{e}</div>)}</div>}*/}
            {/*{ props.type === "months" && <div className={s.months}>{months.map((e: string, i) => <div onClick={() => changeMonth(i+1)} className={[s.month, props.month === i+1 && s.active].join(" ")}>{e}</div>)}</div>}*/}
            {Calendars(props.type)}
            <div className={s.modalButtons}>
                <button onClick={() => props.setActiveModel(false)}>Cancel</button>
                <button disabled={!firstDay} onClick={nextHandler}>{activeStep === 1 ? "Next" : "Select"}</button>
            </div>
        </div>
    </div>
}
