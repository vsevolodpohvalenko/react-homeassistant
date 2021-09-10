import s from "./termsAndConditions.module.css"
import {AuthTemplate} from "../HOCs/authTemplate";


export const TermsAndConditions = () => {
    return <AuthTemplate path={"/"} title={"Terms and Conditions"}>
        <p className={s.terms}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat ante nec feugiat fermentum.
            Vestibulum lacus eros, ultricies non interdum nec, semper et massa. Nunc a elit pretium, dictum elit in,
            consequat mi. Nam aliquet bibendum egestas. Mauris a nunc diam. Sed scelerisque dui congue rhoncus lacinia.
            Duis vulputate interdum mauris, in mollis nulla commodo eget. Cras at semper purus, vel condimentum eros.
            Etiam rutrum scelerisque dignissim. Nullam lacinia velit diam, at tincidunt diam fermentum vitae. Cras
            consectetur suscipit ex, ut sagittis lacus tincidunt et. Donec volutpat nisi in velit molestie, eget semper
            urna aliquam. Ut felis neque, lacinia eget ultrices quis, congue feugiat neque. Donec lacinia at velit a
            elementum. Cras placerat, dolor vitae pellentesque tristique, lacus ex tincidunt massa, nec mattis odio
            tellus id felis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat ante nec feugiat fermentum.
            Vestibulum lacus eros, ultricies non interdum nec, semper et massa. Nunc a elit pretium, dictum elit in,
            consequat mi. Nam aliquet bibendum egestas. Mauris a nunc diam. Sed scelerisque dui congue rhoncus lacinia.
            Duis vulputate interdum mauris, in mollis nulla commodo eget. Cras at semper purus, vel condimentum eros.
            Etiam rutrum scelerisque dignissim. Nullam lacinia velit diam, at tincidunt diam fermentum vitae.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat ante nec feugiat fermentum.
            Vestibulum lacus eros, ultricies non interdum nec, semper et massa. Nunc a elit pretium, dictum elit in,
            consequat mi. Nam aliquet bibendum egestas. Mauris a nunc diam. Sed scelerisque dui congue rhoncus lacinia.
            Duis vulputate interdum mauris, in mollis nulla commodo eget. Cras at
        </p>
    </AuthTemplate>
}
