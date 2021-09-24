import {instance} from "./api_config";

const hassUrl = 'https://iconekt-api.idin.tech/'


// export const login_flow = () => {
//     debugger
//     return instance.post('api/login/', {
//         "client_id": hassUrl,
//         "handler": ["homeassistant", null],
//         "redirect_uri": ${hassUrl}/?auth_callback=1
//     })
// }

export const login = (password: string, username: string) => {
    debugger
    return instance.post(`api/login/`, {
        "client_id": "https://iconekt-api.idin.tech/",
        "password": password,
        "username": "user",
        "nationalID": JSON.parse(localStorage.getItem("userData") as string).nationalIdNumber,
    })
}

export const getToken = (form_data: FormData) => {
    debugger
    return instance.post('auth/token', form_data)
}

export const logout = () => {
    localStorage.removeItem("conf")
    const form_data = new FormData()
    // @ts-ignore
    form_data.append("token", String(JSON.parse(localStorage.getItem('hassToken')).refresh_token))
    return instance.post('api/token', form_data)
}

export const signUp = (name: string, username: string, password: string) => {
    return instance.post('api/register/', {
        ha: {"client_id": "https://iconekt-api.idin.tech/",
            "language": "en",
            "name": name,
            "password": password,
            "username": "user"},
        nationalIdNumber: JSON.parse(localStorage.getItem("userData") as string).nationalIdNumber
    })
}

export const verifyCode = (code: string, nationalID: string) => {
    return instance.post('api/code/', {code: code, nationalID: JSON.parse(localStorage.getItem("userData") as string).nationalIdNumber})
}

export const addProfile = (props : {name: string, surname: string, phone_number: string, email_address: string, country: string, address: string, nationalIdNumber: string}) => {
    return instance.post('auth/api/profile/', props)
}
export const getEntity = () => {
    return instance.get('api/config/config_entries/entry')
}

export const addEntity = (flow: string) => {
    return instance.get(`api/config/config_entries/flow/${flow}`)
}
// export const coreConfig = () => {
//     return instance.get('http://ec2-18-156-84-146.eu-central-1.compute.amazonaws.com/api/onboarding/core_config')
// }

export const addUser = () => {
    return instance.get('/api/user')
}

export const getUserData = (id:string) => {
    return instance.post('api/get-data', {nationalIdNumber: id})
}