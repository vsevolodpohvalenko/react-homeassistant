import s from "./forgetPin.module.css";
import {Input} from "@material-ui/core";
import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {SendCode} from "../sendCode/sendCode";
import {CreatePin} from "../pin/createPin";
import {ConfirmPin} from "../pin/confirmPin";

function getSteps() {
    return ['Personal Details', 'Residential Details'];
}

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

const ForgetPin = () => {
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = getSteps();
    const classes = useStyles();
    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <div className={s.x}>
                    <div>
                        <h3>Use your National ID Number </h3>
                    </div>
                    <div className={s.inputBlock}>
                        <label className={[nationIdNumber.length > 1 && s.active].join(" ")}>National ID
                            Number</label>
                        <Input
                            className={[s.cInput, nationIdNumber.length > 0 && s.isNotEmpty, nationIdNumber.length > 0 && s.active].join(" ")}
                            onChange={(e) => setNationIDNumber(e.target.value)} value={nationIdNumber}
                            placeholder={"National ID Number"}/>
                    </div>
                    <div className={s.button_container}><button onClick={() => handleNext()} disabled={!nationIdNumber} className={s.next}>Next</button></div>
                </div>
            case 1:
                return <SendCode next={handleNext}/>
            case 2:
                return <CreatePin next={handleNext}/>
            case 3:
                return <ConfirmPin next={handleNext} pin={['1','1','1','1']}/>
            default:
                return 'Unknown stepIndex';
        }
    }

    const [nationIdNumber, setNationIDNumber] = useState("")

    return <div className={s.container}>
        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
    </div>
}

export default ForgetPin
