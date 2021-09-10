import 'antd/dist/antd.css';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useRef, useState} from "react";
import './register.css'
import s from './register.module.css'
import {Input} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {addEntity, addProfile, getEntity, getToken, signUp, verifyCode} from "../../api/rest/auth_api";
import {verify} from "crypto";
import {actions} from "../../store/reducers/AuthReducer";
// import {getToken, signUp} from "../../api/rest/auth_api";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const countries = [
    {code: "AD", label: "Andorra", phone: "376"},
    {code: "AE", label: "United Arab Emirates", phone: "971"},
    {code: "AF", label: "Afghanistan", phone: "93"},
    {code: "AG", label: "Antigua and Barbuda", phone: "1-268"},
    {code: "AI", label: "Anguilla", phone: "1-264"},
    {code: "AL", label: "Albania", phone: "355"},
    {code: "AM", label: "Armenia", phone: "374"},
    {code: "AO", label: "Angola", phone: "244"},
    {code: "AQ", label: "Antarctica", phone: "672"},
    {code: "AR", label: "Argentina", phone: "54"},
    {code: "AS", label: "American Samoa", phone: "1-684"},
    {code: "AT", label: "Austria", phone: "43"},
    {code: "AU", label: "Australia", phone: "61", suggested: true},
    {code: "AW", label: "Aruba", phone: "297"},
    {code: "AX", label: "Alland Islands", phone: "358"},
    {code: "AZ", label: "Azerbaijan", phone: "994"},
    {code: "BA", label: "Bosnia and Herzegovina", phone: "387"},
    {code: "BB", label: "Barbados", phone: "1-246"},
    {code: "BD", label: "Bangladesh", phone: "880"},
    {code: "BE", label: "Belgium", phone: "32"},
    {code: "BF", label: "Burkina Faso", phone: "226"},
    {code: "BG", label: "Bulgaria", phone: "359"},
    {code: "BH", label: "Bahrain", phone: "973"},
    {code: "BI", label: "Burundi", phone: "257"},
    {code: "BJ", label: "Benin", phone: "229"},
    {code: "BL", label: "Saint Barthelemy", phone: "590"},
    {code: "BM", label: "Bermuda", phone: "1-441"},
    {code: "BN", label: "Brunei Darussalam", phone: "673"},
    {code: "BO", label: "Bolivia", phone: "591"},
    {code: "BR", label: "Brazil", phone: "55"},
    {code: "BS", label: "Bahamas", phone: "1-242"},
    {code: "BT", label: "Bhutan", phone: "975"},
    {code: "BV", label: "Bouvet Island", phone: "47"},
    {code: "BW", label: "Botswana", phone: "267"},
    {code: "BY", label: "Belarus", phone: "375"},
    {code: "BZ", label: "Belize", phone: "501"},
    {code: "CA", label: "Canada", phone: "1", suggested: true},
    {code: "CC", label: "Cocos (Keeling) Islands", phone: "61"},
    {code: "CD", label: "Congo, Republic of the", phone: "242"},
    {code: "CF", label: "Central African Republic", phone: "236"},
    {code: "CG", label: "Congo, Democratic Republic of the", phone: "243"},
    {code: "CH", label: "Switzerland", phone: "41"},
    {code: "CI", label: "Cote d'Ivoire", phone: "225"},
    {code: "CK", label: "Cook Islands", phone: "682"},
    {code: "CL", label: "Chile", phone: "56"},
    {code: "CM", label: "Cameroon", phone: "237"},
    {code: "CN", label: "China", phone: "86"},
    {code: "CO", label: "Colombia", phone: "57"},
    {code: "CR", label: "Costa Rica", phone: "506"},
    {code: "CU", label: "Cuba", phone: "53"},
    {code: "CV", label: "Cape Verde", phone: "238"},
    {code: "CW", label: "Curacao", phone: "599"},
    {code: "CX", label: "Christmas Island", phone: "61"},
    {code: "CY", label: "Cyprus", phone: "357"},
    {code: "CZ", label: "Czech Republic", phone: "420"},
    {code: "DE", label: "Germany", phone: "49", suggested: true},
    {code: "DJ", label: "Djibouti", phone: "253"},
    {code: "DK", label: "Denmark", phone: "45"},
    {code: "DM", label: "Dominica", phone: "1-767"},
    {code: "DO", label: "Dominican Republic", phone: "1-809"},
    {code: "DZ", label: "Algeria", phone: "213"},
    {code: "EC", label: "Ecuador", phone: "593"},
    {code: "EE", label: "Estonia", phone: "372"},
    {code: "EG", label: "Egypt", phone: "20"},
    {code: "EH", label: "Western Sahara", phone: "212"},
    {code: "ER", label: "Eritrea", phone: "291"},
    {code: "ES", label: "Spain", phone: "34"},
    {code: "ET", label: "Ethiopia", phone: "251"},
    {code: "FI", label: "Finland", phone: "358"},
    {code: "FJ", label: "Fiji", phone: "679"},
    {code: "FK", label: "Falkland Islands (Malvinas)", phone: "500"},
    {code: "FM", label: "Micronesia, Federated States of", phone: "691"},
    {code: "FO", label: "Faroe Islands", phone: "298"},
    {code: "FR", label: "France", phone: "33", suggested: true},
    {code: "GA", label: "Gabon", phone: "241"},
    {code: "GB", label: "United Kingdom", phone: "44"},
    {code: "GD", label: "Grenada", phone: "1-473"},
    {code: "GE", label: "Georgia", phone: "995"},
    {code: "GF", label: "French Guiana", phone: "594"},
    {code: "GG", label: "Guernsey", phone: "44"},
    {code: "GH", label: "Ghana", phone: "233"},
    {code: "GI", label: "Gibraltar", phone: "350"},
    {code: "GL", label: "Greenland", phone: "299"},
    {code: "GM", label: "Gambia", phone: "220"},
    {code: "GN", label: "Guinea", phone: "224"},
    {code: "GP", label: "Guadeloupe", phone: "590"},
    {code: "GQ", label: "Equatorial Guinea", phone: "240"},
    {code: "GR", label: "Greece", phone: "30"},
    {
        code: "GS",
        label: "South Georgia and the South Sandwich Islands",
        phone: "500"
    },
    {code: "GT", label: "Guatemala", phone: "502"},
    {code: "GU", label: "Guam", phone: "1-671"},
    {code: "GW", label: "Guinea-Bissau", phone: "245"},
    {code: "GY", label: "Guyana", phone: "592"},
    {code: "HK", label: "Hong Kong", phone: "852"},
    {code: "HM", label: "Heard Island and McDonald Islands", phone: "672"},
    {code: "HN", label: "Honduras", phone: "504"},
    {code: "HR", label: "Croatia", phone: "385"},
    {code: "HT", label: "Haiti", phone: "509"},
    {code: "HU", label: "Hungary", phone: "36"},
    {code: "ID", label: "Indonesia", phone: "62"},
    {code: "IE", label: "Ireland", phone: "353"},
    {code: "IL", label: "Israel", phone: "972"},
    {code: "IM", label: "Isle of Man", phone: "44"},
    {code: "IN", label: "India", phone: "91"},
    {code: "IO", label: "British Indian Ocean Territory", phone: "246"},
    {code: "IQ", label: "Iraq", phone: "964"},
    {code: "IR", label: "Iran, Islamic Republic of", phone: "98"},
    {code: "IS", label: "Iceland", phone: "354"},
    {code: "IT", label: "Italy", phone: "39"},
    {code: "JE", label: "Jersey", phone: "44"},
    {code: "JM", label: "Jamaica", phone: "1-876"},
    {code: "JO", label: "Jordan", phone: "962"},
    {code: "JP", label: "Japan", phone: "81", suggested: true},
    {code: "KE", label: "Kenya", phone: "254"},
    {code: "KG", label: "Kyrgyzstan", phone: "996"},
    {code: "KH", label: "Cambodia", phone: "855"},
    {code: "KI", label: "Kiribati", phone: "686"},
    {code: "KM", label: "Comoros", phone: "269"},
    {code: "KN", label: "Saint Kitts and Nevis", phone: "1-869"},
    {code: "KP", label: "Korea, Democratic People's Republic of", phone: "850"},
    {code: "KR", label: "Korea, Republic of", phone: "82"},
    {code: "KW", label: "Kuwait", phone: "965"},
    {code: "KY", label: "Cayman Islands", phone: "1-345"},
    {code: "KZ", label: "Kazakhstan", phone: "7"},
    {code: "LA", label: "Lao People's Democratic Republic", phone: "856"},
    {code: "LB", label: "Lebanon", phone: "961"},
    {code: "LC", label: "Saint Lucia", phone: "1-758"},
    {code: "LI", label: "Liechtenstein", phone: "423"},
    {code: "LK", label: "Sri Lanka", phone: "94"},
    {code: "LR", label: "Liberia", phone: "231"},
    {code: "LS", label: "Lesotho", phone: "266"},
    {code: "LT", label: "Lithuania", phone: "370"},
    {code: "LU", label: "Luxembourg", phone: "352"},
    {code: "LV", label: "Latvia", phone: "371"},
    {code: "LY", label: "Libya", phone: "218"},
    {code: "MA", label: "Morocco", phone: "212"},
    {code: "MC", label: "Monaco", phone: "377"},
    {code: "MD", label: "Moldova, Republic of", phone: "373"},
    {code: "ME", label: "Montenegro", phone: "382"},
    {code: "MF", label: "Saint Martin (French part)", phone: "590"},
    {code: "MG", label: "Madagascar", phone: "261"},
    {code: "MH", label: "Marshall Islands", phone: "692"},
    {code: "MK", label: "Macedonia, the Former Yugoslav Republic of", phone: "389"},
    {code: "ML", label: "Mali", phone: "223"},
    {code: "MM", label: "Myanmar", phone: "95"},
    {code: "MN", label: "Mongolia", phone: "976"},
    {code: "MO", label: "Macao", phone: "853"},
    {code: "MP", label: "Northern Mariana Islands", phone: "1-670"},
    {code: "MQ", label: "Martinique", phone: "596"},
    {code: "MR", label: "Mauritania", phone: "222"},
    {code: "MS", label: "Montserrat", phone: "1-664"},
    {code: "MT", label: "Malta", phone: "356"},
    {code: "MU", label: "Mauritius", phone: "230"},
    {code: "MV", label: "Maldives", phone: "960"},
    {code: "MW", label: "Malawi", phone: "265"},
    {code: "MX", label: "Mexico", phone: "52"},
    {code: "MY", label: "Malaysia", phone: "60"},
    {code: "MZ", label: "Mozambique", phone: "258"},
    {code: "NA", label: "Namibia", phone: "264"},
    {code: "NC", label: "New Caledonia", phone: "687"},
    {code: "NE", label: "Niger", phone: "227"},
    {code: "NF", label: "Norfolk Island", phone: "672"},
    {code: "NG", label: "Nigeria", phone: "234"},
    {code: "NI", label: "Nicaragua", phone: "505"},
    {code: "NL", label: "Netherlands", phone: "31"},
    {code: "NO", label: "Norway", phone: "47"},
    {code: "NP", label: "Nepal", phone: "977"},
    {code: "NR", label: "Nauru", phone: "674"},
    {code: "NU", label: "Niue", phone: "683"},
    {code: "NZ", label: "New Zealand", phone: "64"},
    {code: "OM", label: "Oman", phone: "968"},
    {code: "PA", label: "Panama", phone: "507"},
    {code: "PE", label: "Peru", phone: "51"},
    {code: "PF", label: "French Polynesia", phone: "689"},
    {code: "PG", label: "Papua New Guinea", phone: "675"},
    {code: "PH", label: "Philippines", phone: "63"},
    {code: "PK", label: "Pakistan", phone: "92"},
    {code: "PL", label: "Poland", phone: "48"},
    {code: "PM", label: "Saint Pierre and Miquelon", phone: "508"},
    {code: "PN", label: "Pitcairn", phone: "870"},
    {code: "PR", label: "Puerto Rico", phone: "1"},
    {code: "PS", label: "Palestine, State of", phone: "970"},
    {code: "PT", label: "Portugal", phone: "351"},
    {code: "PW", label: "Palau", phone: "680"},
    {code: "PY", label: "Paraguay", phone: "595"},
    {code: "QA", label: "Qatar", phone: "974"},
    {code: "RE", label: "Reunion", phone: "262"},
    {code: "RO", label: "Romania", phone: "40"},
    {code: "RS", label: "Serbia", phone: "381"},
    {code: "RU", label: "Russian Federation", phone: "7"},
    {code: "RW", label: "Rwanda", phone: "250"},
    {code: "SA", label: "Saudi Arabia", phone: "966"},
    {code: "SB", label: "Solomon Islands", phone: "677"},
    {code: "SC", label: "Seychelles", phone: "248"},
    {code: "SD", label: "Sudan", phone: "249"},
    {code: "SE", label: "Sweden", phone: "46"},
    {code: "SG", label: "Singapore", phone: "65"},
    {code: "SH", label: "Saint Helena", phone: "290"},
    {code: "SI", label: "Slovenia", phone: "386"},
    {code: "SJ", label: "Svalbard and Jan Mayen", phone: "47"},
    {code: "SK", label: "Slovakia", phone: "421"},
    {code: "SL", label: "Sierra Leone", phone: "232"},
    {code: "SM", label: "San Marino", phone: "378"},
    {code: "SN", label: "Senegal", phone: "221"},
    {code: "SO", label: "Somalia", phone: "252"},
    {code: "SR", label: "Suriname", phone: "597"},
    {code: "SS", label: "South Sudan", phone: "211"},
    {code: "ST", label: "Sao Tome and Principe", phone: "239"},
    {code: "SV", label: "El Salvador", phone: "503"},
    {code: "SX", label: "Sint Maarten (Dutch part)", phone: "1-721"},
    {code: "SY", label: "Syrian Arab Republic", phone: "963"},
    {code: "SZ", label: "Swaziland", phone: "268"},
    {code: "TC", label: "Turks and Caicos Islands", phone: "1-649"},
    {code: "TD", label: "Chad", phone: "235"},
    {code: "TF", label: "French Southern Territories", phone: "262"},
    {code: "TG", label: "Togo", phone: "228"},
    {code: "TH", label: "Thailand", phone: "66"},
    {code: "TJ", label: "Tajikistan", phone: "992"},
    {code: "TK", label: "Tokelau", phone: "690"},
    {code: "TL", label: "Timor-Leste", phone: "670"},
    {code: "TM", label: "Turkmenistan", phone: "993"},
    {code: "TN", label: "Tunisia", phone: "216"},
    {code: "TO", label: "Tonga", phone: "676"},
    {code: "TR", label: "Turkey", phone: "90"},
    {code: "TT", label: "Trinidad and Tobago", phone: "1-868"},
    {code: "TV", label: "Tuvalu", phone: "688"},
    {code: "TW", label: "Taiwan, Province of China", phone: "886"},
    {code: "TZ", label: "United Republic of Tanzania", phone: "255"},
    {code: "UA", label: "Ukraine", phone: "380"},
    {code: "UG", label: "Uganda", phone: "256"},
    {code: "US", label: "United States", phone: "1", suggested: true},
    {code: "UY", label: "Uruguay", phone: "598"},
    {code: "UZ", label: "Uzbekistan", phone: "998"},
    {code: "VA", label: "Holy See (Vatican City State)", phone: "379"},
    {code: "VC", label: "Saint Vincent and the Grenadines", phone: "1-784"},
    {code: "VE", label: "Venezuela", phone: "58"},
    {code: "VG", label: "British Virgin Islands", phone: "1-284"},
    {code: "VI", label: "US Virgin Islands", phone: "1-340"},
    {code: "VN", label: "Vietnam", phone: "84"},
    {code: "VU", label: "Vanuatu", phone: "678"},
    {code: "WF", label: "Wallis and Futuna", phone: "681"},
    {code: "WS", label: "Samoa", phone: "685"},
    {code: "XK", label: "Kosovo", phone: "383"},
    {code: "YE", label: "Yemen", phone: "967"},
    {code: "YT", label: "Mayotte", phone: "262"},
    {code: "ZA", label: "South Africa", phone: "27"},
    {code: "ZM", label: "Zambia", phone: "260"},
    {code: "ZW", label: "Zimbabwe", phone: "263"}
];


function getSteps() {
    return ['Personal Details', 'Residential Details'];
}

function countryToFlag(isoCode: any) {
    return typeof String.fromCodePoint !== "undefined"
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char: string) =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
            )
        : isoCode;
}

export const FocusHandler = (action: string, id:string) => {
    const label = document.querySelector(`#${id}`)
    if (action === "focus") {
        label?.classList.add(s.color)}
    else {
        label?.classList.remove(s.color)
    }
}

export const VerificationCode = (props: {valid: boolean, code: Array<number>, handleNext: () => void, handleCode: any}) => {
    const cfv = useSelector((state:AppStateType) => state.Auth.cfv)
    const VerifyCode = async () => {
        const res = await verifyCode(String(props.code.join("")), JSON.stringify(localStorage.getItem("userData") as string)[2])
        res.data === "OK" && props.handleNext()

    }
    const StatusHandler = () => {
        if (String(props.code.join("")).trim().length === 6){
            if (props.code.join("") == cfv){
                return "valid"
            } else {return "invalid"}
        } else {return "entering"}

    }
    const [last, setLast] = useState(false)
    return <div>
        <div className={s.code_container}>
            <div><h3>Account Verification</h3></div>
            <p className={s.hint}>
                A 6-digit verification code sent to your mail and SMS
            </p>
            <div className={s.code}>
                {[...Array(6)].map((e, i) => <input id={`verification${i}`} maxLength={1} size={1}
                                                    className={[StatusHandler() === "invalid" && s.invalid, StatusHandler() === "valid" && s.isNotEmptyLast].join(" ")}
                                                    onChange={(e: any) => props.handleCode(e, i)}
                                                    type={"password"}/>)}
            </div>
            {!props.valid && <small className={s.validation}>Verification code does not match</small>}
            <div className={s.links}><small>Didn't receive code?</small>&nbsp;<span>RESEND CODE</span></div>
        </div>
        <div className={[s.adaptiveButtons].join(" ")}>
            <button>CANCEL</button>
            <button disabled={last} onClick={() => VerifyCode()} className={[s.next, props.code.join("") != cfv && s.disabled].join(" ")}>NEXT</button>
        </div>
    </div>;
}

const Register = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [nationIdNumber, setNationIDNumber] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [invalid, setInvalid] = useState(false)
    const [code, setCode] = useState<Array<number> | any>([])
    const [right, setRight] = useState(false)
    const [pin, setPin] = useState<Array<number> | any>([])
    const [confirmPin, setConfirmPin] = useState<Array<number> | any>([])
    const [nextAllowed, setNextAllowed] = useState(true)
    const [same, setSame] = useState(false)
    const steps = getSteps();
    const codeIsValid = useSelector((state: AppStateType) => state.Auth.codeIsValid)

    const register = async (values: { password: string, username: string, name: string }) => {
        const res = await signUp(values.name, values.username, values.password)
        const form_data = new FormData()
        form_data.append('client_id', 'http://localhost:3000/')
        form_data.append('code', res.data.auth_code)
        form_data.append('grant_type', 'authorization_code')
        localStorage.setItem('hassToken', JSON.stringify(res.data))
        const entities = await getEntity()
        const addedEntity = await addEntity(entities.data.entry_id)
    }

    const handleNext = async (last?: boolean, send?: boolean) => {
        debugger

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (last) {

            await register({password: pin.join(""), name: name, username: `${name} ${surname}`})
            // localStorage.setItem("hassToken", JSON.stringify(reg.data))
        } else if (send){
            localStorage.setItem("userData", JSON.stringify([name, surname, nationIdNumber, email, phone, address, code, pin]));
            const r = await addProfile({name, surname, phone_number: phone, email_address: email, country: "Ukraine", address, nationalIdNumber: nationIdNumber})
            debugger
            dispatch(actions.setCFV(r.data.code))
        }
    };


    const handleNextValid = () => {
        if (code.join("") === '111111') {
            setRight(true)
            setInvalid(false)
        } else {
            setInvalid(true)
            setRight(false)
        }
    }



    const handleCode = (e: any, i: number) => {
        if (e.target.value.length === 1 && i<6){
            document.getElementById(`verification${i+1}`)?.focus()
        }
        Number(e.target.value) !== 0 && e.target.classList.add(s.activeX)
        Number(e.target.value) === 0 && e.target.classList.remove(s.activeX)
        invalid && setInvalid(false)
        const newCode = code
        newCode[i] = e.target.value
        setCode(newCode)
        console.log(code)
        if (code.join("").length === 6) {
            handleNextValid()
        }
        console.log(code.join(""))
    }
    const handlePin = (e: any, i: number) => {

        if (e.target.value.length === 1 && i<4){
            document.getElementById(`pin${i+1}`)?.focus()
        }

        {
            Number(e.target.value) !== 0 && e.target.classList.add(s.activeX)
        }
        {
            Number(e.target.value) === 0 && e.target.classList.remove(s.activeX)
        }
        console.log(Number(e.target.value))
        const newPin = pin
        newPin[i] = e.target.value
        setPin(newPin)
        setNextAllowed(pin.join("").length < 4)
        console.log(pin.join("").length < 4, 'length')
        console.log(pin.join("").length, "pin.join(\"\").length")
    }

    const handleConfirmPin = (e: any, i: number) => {

        if (e.target.value.length === 1 && i<4){
            document.getElementById(`confPin${i+1}`)?.focus()
        }
        Number(e.target.value) !== 0 && e.target.classList.add(s.activeX)
        Number(e.target.value) === 0 && e.target.classList.remove(s.activeX)
        const newPin = confirmPin
        newPin[i] = e.target.value
        setConfirmPin(newPin)
        console.log(confirmPin.join(""), pin.join(""), confirmPin.join("")===pin.join(""))
        if (confirmPin.join() !== pin.join()) {
            document.getElementById("nextButton")?.setAttribute('disabled', 'disabled');
        } else {
            document.getElementById("nextButton")?.removeAttribute('disabled');
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    // const ChangeFocus = (refType: string, id: number) => {
    //     console.log(refType, id)
    // }
    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <div className={s.formContainer}>
                    <form>
                        <div className={[s.inputBlock].join(" ")}>
                            <label id={"name"} className={[name.length > 1 && s.active, s.color].join(" ")}>Name</label>
                            <input
                                onFocus={() => FocusHandler("focus","name")}
                                onBlur={() => FocusHandler("blur", "name")}
                                className={[s.cInput, name.length > 0 && s.isNotEmpty, name.length > 0 && s.active].join(" ")}
                                onChange={(e) => setName(e.target.value)} value={name}
                                placeholder={"Name"}/>
                        </div>
                        <div className={s.inputBlock}>
                            <label id={"surname"} className={[surname.length > 1 && s.active, s.color].join(" ")}>Surname</label>
                            <input onFocus={() => FocusHandler("focus","surname")} onBlur={() => FocusHandler("blur", "surname")}
                                className={[s.cInput, surname.length > 0 && s.isNotEmpty, surname.length > 0 && s.active].join(" ")}
                                onChange={(e) => setSurname(e.target.value)} value={surname}
                                placeholder={"Surname"}/>
                        </div>
                        <div className={s.inputBlock}>
                            <label id={"nationalIdNumber"} className={[nationIdNumber.length > 1 && s.active, s.color].join(" ")}>National ID
                                Number</label>
                            <input
                                onFocus={() => FocusHandler("focus","nationalIdNumber")}
                                onBlur={() => FocusHandler("blur", "nationalIdNumber")}
                                className={[s.cInput, nationIdNumber.length > 0 && s.isNotEmpty, nationIdNumber.length > 0 && s.active].join(" ")}
                                onChange={(e) => setNationIDNumber(e.target.value)} value={nationIdNumber}
                                placeholder={"National ID Number"}/>
                        </div>
                        <div className={s.inputBlock}>
                            <label id={"email"} className={[email.length > 1 && s.active, s.color].join(" ")}>Email Address</label>
                            <input
                                onFocus={() => FocusHandler("focus","email")}
                                onBlur={() => FocusHandler("blur", "email")}
                                className={[s.cInput, email.length > 0 && s.isNotEmpty, email.length > 0 && s.active].join(" ")}
                                onChange={(e) => setEmail(e.target.value)} value={email}
                                placeholder={"Email Address"}/>
                        </div>
                        <div className={s.inputBlock}>
                            <label id={"phone"} className={[phone.length > 1 && s.active, s.color].join(" ")}>Phone Number</label>
                            <input
                                onFocus={() => FocusHandler("focus","phone")}
                                onBlur={() => FocusHandler("blur", "phone")}
                                className={[s.cInput, phone.length > 0 && s.isNotEmpty, phone.length > 0 && s.active].join(" ")}
                                onChange={(e) => setPhone(e.target.value)} value={phone}
                                placeholder={"Phone Number"}/>
                        </div>
                    </form>
                </div>;
            case 1:
                return <div className={s.formContainer}>
                    <form>
                        <section>
                            <Autocomplete
                                defaultValue={countries[0]}
                                className={[s.inputBlock, s.registerSelect].join(" ")}
                                options={countries}
                                getOptionLabel={option => option.label}
                                renderOption={option => (
                                    <span>
                                        {countryToFlag(option.code)}
                                        {option.label}
                                    </span>
                                )}
                                renderInput={params => (
                                    <TextField className={s.isNotEmpty}
                                               {...params}
                                               variant="outlined"
                                    />
                                )}
                            />
                        </section>
                        <div className={s.inputBlock}>
                            <label id={"address"} className={[address.length > 1 && s.active, s.color].join(" ")}>Address</label>
                            <input
                                onFocus={() => FocusHandler("focus","address")}
                                onBlur={() => FocusHandler("blur", "address")}
                                className={[s.cInput, address.length > 0 && s.isNotEmpty, address.length > 0 && s.active].join(" ")}
                                onChange={(e) => setAddress(e.target.value)} value={address}
                                placeholder={"Address"}/>
                        </div>
                    </form>
                    <div className={s.second_step}>
                        <button className={s.next} onClick={() => handleNext(false, true)}>
                            Next
                        </button>
                    </div>
                </div>;
            case 2:
                return <div>
                    <div className={s.terms_container}>
                        <h3>Terms and Conditions</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi dignissimos
                            explicabo id
                            illum maiores modi nemo non nostrum optio provident quis, reiciendis sapiente tenetur
                            veniam?
                            Aperiam autem incidunt ipsa laudantium sed. Aliquid consequatur cum cumque et eum eveniet
                            excepturi fugiat hic inventore iusto laudantium magni, neque nihil non nulla officia
                            possimus
                            quaerat quidem quod quos reprehenderit rerum tempore ut voluptates voluptatibus! Accusantium
                            adipisci atque, aut cupiditate, dolor dolores earum eos est illo illum itaque laboriosam
                            nulla,
                            perferendis placeat quibusdam quod ratione reprehenderit rerum saepe similique tempore velit
                            veniam. Aliquid beatae corporis dignissimos id necessitatibus. A accusamus accusantium
                            aliquid
                            aspernatur atque autem commodi consequatur cupiditate delectus deleniti distinctio dolore
                            dolorem doloremque ea eos eum explicabo facilis fuga fugiat fugit inventore laborum
                            laudantium
                            minus nam neque pariatur perspiciatis praesentium quibusdam sint, temporibus totam ut, vitae
                            voluptate. Atque consectetur, cum cumque debitis exercitationem explicabo facilis id in,
                            ipsa
                            ipsam laudantium molestiae optio provident sequi, sint tempore veritatis. Dolor harum
                            molestias
                            neque nesciunt perspiciatis porro, sed voluptatum? Alias aliquam blanditiis consectetur
                            doloremque ea eos eum excepturi explicabo facilis illo incidunt itaque iure laudantium,
                            libero
                            modi molestiae mollitia natus non obcaecati perferendis placeat, quidem reiciendis rem saepe
                            similique tempora ullam voluptates? Deleniti ex facere facilis ipsam labore necessitatibus
                            nihil
                            officia quaerat quam, recusandae saepe ut! Ab, aliquam aut consectetur distinctio dolor
                            dolore
                            doloribus ea error eveniet excepturi facere harum hic itaque laudantium magnam magni
                            molestiae
                            molestias necessitatibus neque non nostrum numquam odit optio reiciendis rem sed sequi
                            temporibus unde vero voluptatem? Aspernatur corporis cum deleniti dolores ducimus error
                            harum
                            illum impedit iusto maxime nisi nostrum numquam officia perferendis quos, saepe ullam vel
                            voluptatem! A accusamus, aperiam, at autem fugit illo impedit inventore odio quidem quis
                            sint
                            sit soluta voluptatum. A cum delectus dolorem eaque soluta temporibus tenetur voluptas. Aut
                            consequuntur eaque ipsam mollitia placeat!
                        </p>
                    </div>
                    <div className={s.options}>
                        <div className={s.optCheck}><input className={s.special} type={"checkbox"}/><span>Agree to Terms & Conditions</span>
                        </div>
                        <div className={s.optButtons}>
                            <button>CANCEL</button>
                            <button onClick={() => handleNext()} className={s.next}>NEXT</button>
                        </div>
                    </div>
                </div>;
            case 3:
                return <VerificationCode valid={codeIsValid} code={code} handleCode={handleCode} handleNext={handleNext}/>
            case 4:
                return <div className={s.code_container}>
                    <div><h3>Create 4-digit mPin</h3></div>
                    <div className={s.pin}>
                        {[...Array(4)].map((e, i) => <input id={`pin${i}`} maxLength={1} type="password" size={1} key={`pin${i}`}
                                                            onChange={(e) => handlePin(e, i)}
                                                            className={[s.pinInput].join(" ")}/>)}
                    </div>
                    <div className={s.adaptiveButtons}>
                        <button>Cancel</button>
                        <button onClick={() => handleNext()} disabled={nextAllowed} className={s.next}>Next</button>
                    </div>
                </div>
            case 5:
                return <div className={s.code_container}>
                    <div><h3>Confirm 4-digit mPin</h3></div>
                    <div className={s.pin}>
                        {[...Array(4)].map((e, i) => <input id={`confPin${i}`} maxLength={1} type="password" size={1}
                                                            key={`confirmPin${i}`}
                                                            onChange={(e) => handleConfirmPin(e, i)}
                                                            className={[s.pinInput].join(" ")}/>)}
                    </div>
                    <div className={s.adaptiveButtons}>
                        <button>Cancel</button>
                        <button id={"nextButton"} onClick={() => handleNext(true, false)} className={[s.next].join(" ")}>Next</button>
                    </div>
                </div>
            default:
                return <Redirect to={"#"}/>;
        }
    }

    return (
        <div>
            <div className={s.header}><ArrowBackIcon onClick={handleBack} className={s.arrowIcon}/><h3>Register</h3>
            </div>
            <div className={[classes.root, s.register].join(" ")}>
                {activeStep < 2 && <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>}
                <div>
                    {(
                        <div>
                            <div><Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            </div>
                            {activeStep < 1 && <div className={s.step_next}>
                                <button className={s.next} onClick={() => handleNext()}>
                                    Next
                                </button>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register
