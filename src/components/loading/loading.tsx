import React from "react";
import s from './loading.module.css'
import iconektLogo from '../../assets/iconektLogoForDarkBkg.svg'

const Loading = () => {
    return <div className={s.loading_container}>
        <div className={s.loading}>
            <img src={iconektLogo}/>
           <div className={s.progress}><div className={s.loadingLine}/></div>
        </div>
    </div>
}

export default Loading
