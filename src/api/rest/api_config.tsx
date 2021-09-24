import axios from "axios";

// const url = 'http://ec2-35-158-83-182.eu-central-1.compute.amazonaws.com/'
const url = 'https://django-auth-service.herokuapp.com/'
// const url = 'http://localhost:8000/'
const token = localStorage.getItem('hassToken')

export const instance = axios.create({baseURL: url})
export const config = {
    headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
