import React, { Suspense } from "react";
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import Register from "./components/register/register";
import {AuthTemplate} from "./components/HOCs/authTemplate";
import ForgetPin from "./components/forgetPin/forgetPin";
// import Home from "./components/home/home";
import {Provider} from "react-redux";
import store from "./store/store";
import {GeneralTemplate} from "./components/HOCs/generalTemplate";
import {Insights} from "./components/insights/insights";
import {Device} from "./components/device/device";
import {Notifications} from "./components/notifications/notifications";
// import Login from "./components/login/login";
import House from "./components/house/house";
import Loading from "./components/loading/loading";
import LineChartExample from "./components/graphs/testGraph";
import {LivingRoom} from "./components/livingRoom/livingRoom";
import {BedRoom} from "./components/badRoom/bedRoom";
import {Profile} from "./components/profile/profile";
import {TermsAndConditions} from "./components/termsAndConditions/termsAndConditions";
import {ChangeDetails} from "./components/changeDetails/changeDetails";
import {VerificationCode} from "./components/verificationCode/verificationCode";
import {Statistic} from "./components/statistic/statistic";
import {TestBar} from "./components/statistic/testBar";
const Register = React.lazy(() => import('./components/register/register'))
const Login = React.lazy(() => import('./components/login/login'))
const Home = React.lazy(() => import('./components/home/home'))

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <Switch>
                        <Route exact path={'/register'} render={() => <Suspense fallback={<Loading />}><Register/></Suspense>}/>
                        <Route exact path={'/login'} render={() => <Suspense fallback={<Loading />}><Login/></Suspense>}/>
                        <Route exact path={'/loading'} component={Loading}/>
                        <Route exact path={'/'} render={() => <Suspense fallback={<Loading />}><Home/></Suspense>}/>
                        <Route exact path={'/insights'} render={() => <Insights/>}/>
                        <Route exact path={'/device'} render={() => <GeneralTemplate><Device/></GeneralTemplate>}/>
                        <Route exact path={'/notifications'} render={() => <GeneralTemplate><Notifications/></GeneralTemplate>}/>
                        <Route exact path={'/house'} render={() => <House/>}/>
                        <Route exact path={'/living-room'} render={() => <LivingRoom/>}/>
                        <Route exact path={'/bed-room'} render={() => <BedRoom/>}/>
                        <Route exact path={'/my-profile'} render={() => <Profile/>}/>
                        <Route exact path={'/change-details'} render={() => <ChangeDetails/>}/>
                        <Route exact path={'/terms-and-conditions'} render={() => <TermsAndConditions/>}/>
                        <Route exact path={'/verification-code'} render={() => <VerificationCode/>}/>
                        <Route exact path={'/statistic'} render={() => <Statistic/>}/>
                        <Route exact path={'/statistic2'} render={() => <TestBar/>}/>
                        <Route exact path={'/forgot_pin'}
                               render={() => <AuthTemplate title={"Forget mPin"}><ForgetPin/></AuthTemplate>}/>
                    </Switch>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
