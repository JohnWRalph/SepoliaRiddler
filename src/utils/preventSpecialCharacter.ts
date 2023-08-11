import isAlphanumericOrNumber from "./isAlphanumericOrNumber";
import { setAlert } from "./setAlert";

function preventSpecialChar(event: KeyboardEvent) {
    if (event.key === "Tab"){
        return;
    }
    if (!isAlphanumericOrNumber(event)) {
        console.log("debug")
        event.preventDefault();
        setAlert(
            "warning",
            "Please limit answers to alphanumeric characters and spaces."
        );
        // Prevent the default behavior for non-alphanumeric and non-number keys
    } else {
        return; 
    }
}

export default preventSpecialChar;