import iconLivingRoom from "../../assets/iconsIcoLivingroomColored.svg";
import iconBedRoom from "../../assets/iconsIcoBedroomColored.svg";

const SET_CHECKED = 'SET_CHECKED'


const initialState = ({
    airconDistribution: [{
        icon: iconLivingRoom,
        area: 'Living Room',
        cost: '24 MUR',
        kwh: "1.5 kWh",
        id: 0,
        data: [10, 13, 12, 19, 21, 12, 23, 13],
        dataKWH: [0.11, 0.13, 0.43, 0.86, 0.23, 0.45, 0.34, 0.32],
        checked: false
    },
        {
            icon: iconBedRoom,
            area: 'Master Bedroom',
            cost: '30 MUR',
            kwh: "1.2 kWh",
            id: 1,
            data: [3, 12, 21, 12, 22, 14, 12, 16],
            dataKWH: [0.71, 0.48, 0.48, 0.56, 0.56, 0.44, 0.94, 0.64],
            checked: false
        },
        {
            icon: iconLivingRoom,
            area: 'Bedroom 1',
            cost: '13 MUR',
            kwh: "1.9 kWh",
            id: 2,
            data: [10, 12, 16, 19, 23, 12, 26, 12],
            dataKWH: [0.31, 0.87, 0.44, 0.98, 0.34, 0.64, 0.44, 0.23],
            checked: false
        }]

})

export const StatisticReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CHECKED:
            return {...state, airconDistribution: action.payload}
        default:
            return state
    }
}

export const statisticActions : {[key:string] : (arg:any) => any} = {
       setChecked: (payload) => ({type: SET_CHECKED, payload})
}
