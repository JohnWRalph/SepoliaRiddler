import isAlphanumericOrNumber from "./isAlphanumericOrNumber";
import { setAlert } from "./setAlert";

function preventSpecialChar(event: KeyboardEvent) {
    if (!isAlphanumericOrNumber(event)) {
        event.preventDefault();
        setAlert(
            "warning",
            "Please limit answers to alphanumeric characters and spaces."
        );
        // Prevent the default behavior for non-alphanumeric and non-number keys
    } else {
        // Your action for alphanumeric and number keys goes here
        // For example, you can perform some action on valid keypresses
        console.log("Valid keypress: " + event.key);
    }
}

export default preventSpecialChar;