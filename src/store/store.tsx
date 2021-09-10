import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {WeatherReducer} from "./reducers/WeatherReducer";
import thunkMiddleware from 'redux-thunk'
import {AuthReducer} from "./reducers/AuthReducer";
import {StatisticReducer} from "./reducers/statisticReducer";
import {CalendarReducer} from "./reducers/CalendarReducer";

let rootReducers = combineReducers({
    Weather: WeatherReducer,
    Auth: AuthReducer,
    Statistic: StatisticReducer,
    Calendar: CalendarReducer
})

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesTypes<T>>
type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
export default store
