
const GET_WEATHER = "GET_WEATHER"

const initialState = {
    weather: {}
}

export const WeatherReducer = (state = initialState, actions:any) => {
    switch (actions.type) {
        case GET_WEATHER:
            return {...state, weather: actions.payload}
        default:
            return state
    }
}


export const actions: {[key: string] : (...args: any) => any} = {
    getWeatherAction: (payload: any) => ({type: GET_WEATHER, payload})
}

