const SET_DAY = 'SET_DAY'
const SET_WEEK = 'SET_WEEK'
const SET_MONTH = 'SET_MONTH'
const SET_YEAR = 'SET_YEAR'
const SET_SECOND = 'SET_SECOND'


const initialState = (
    {
        day: 30,
        week: [1, 2, 3, 4, 5, 6, 7, 8],
        month: 8,
        year: 2021,

        second: {
            secondDay: 0,
            secondWeek: [9, 10, 11, 12, 13, 14, 15, 16],
            secondMonth: '',
            secondYear: 2021
        }
    }
)

export const CalendarReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DAY:
            return {...state, day: action.payload}
        case SET_WEEK:
            return {...state, week: action.payload}
        case SET_SECOND:
            return {...state, second: action.payload}
        case SET_MONTH:
            return {...state, month: action.payload}
        case SET_YEAR:
            return {...state, year: action.payload}
        default:
            return state
    }
}

export const calendarActions: { [key: string]: (arg: any) => any } = {
    setDay: (payload) => ({type: SET_DAY, payload}),
    setWeek: (payload) => ({type: SET_WEEK, payload}),
    setSecond: (payload) => ({type: SET_SECOND, payload}),
    setMonth: (payload) => ({type: SET_MONTH, payload}),
    setYear: (payload) => ({type: SET_YEAR, payload}),
}
