const VERIFY_PHONE = 'VERIFY_PHONE'
const VERIFIED_PHONE = 'VERIFIED_PHONE'
const VALIDATE = 'VALIDATE'
const SET_CODE = 'SET_CODE'
const GET_USERDATA = 'GET_USERDATA'
const SET_CFV = 'SET_CFV'


const initialState = {
    pending: false,
    phone: "",
    codeIsValid: true,
    code: [],
    cfv: "",
    userData: JSON.parse(localStorage.getItem("userData") as string)
}

export const AuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case VERIFY_PHONE:
            debugger
            return {...state, pending: true, phone: action.payload}
        case VERIFIED_PHONE:
            return {...state, pending: false}
        case VALIDATE:
            return {...state, codeIsValid: true}
        case SET_CODE:
            return {...state, code: action.payload}
        case SET_CFV:
            return {...state, cfv: action.payload}
        default:
            return state
    }
}

export const actions : {[key:string] : (arg:any) => any} = {
    verifyPhone : (payload) => ({type: VERIFY_PHONE, payload}),
    verifiedPhone : () => ({type: VERIFIED_PHONE}),
    validate: () => ({type: VALIDATE}),
    setCode: (payload) => ({type: SET_CODE, payload}),
    setCFV: (payload) => ({type: SET_CFV, payload})
}
