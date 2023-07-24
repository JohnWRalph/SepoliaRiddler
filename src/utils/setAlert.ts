import { alertLink, alertMessage, alertState } from "../store/alert";

function setAlert(state,message,link=""){
    alertState.set(state);
    alertMessage.set(message);
    alertLink.set(link);

    setTimeout(() => {
        alertState.set("");
        alertMessage.set("");
        alertLink.set("");
    },6000);
}

export {setAlert}
