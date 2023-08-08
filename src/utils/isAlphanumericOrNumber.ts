// Function to check if the key is alphanumeric or a number
function isAlphanumericOrNumber(event) {
    console.log(event)
    if (event.shiftKey && event.keyCode >= 48 && event.keyCode <= 57) {
        console.log("shift key");
        return false;
    }
    const charCode = event.which || event.keyCode; // Get the char code from the event object
    const charStr = String.fromCharCode(charCode); // Convert the char code to a string
    // Check if the charStr is alphanumeric or a number or a space or backspace using a regular expression
    //229 is for mobile keyboard
    if ((!event.shiftKey && event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 32 || (event.keyCode >= 65 && event.keyCode <= 90
        || event.keyCode === 16 || (event.keyCode >= 96 && event.keyCode <= 105)
    ) || event.keyCode === 229) {
        return true;
    } else {
        return false;
    }

}

export default isAlphanumericOrNumber;