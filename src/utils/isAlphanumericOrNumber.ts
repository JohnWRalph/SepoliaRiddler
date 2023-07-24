  // Function to check if the key is alphanumeric or a number
  function isAlphanumericOrNumber(event) {
    // console.log(event.keyCode)
    if (event.shiftKey && event.keyCode >= 48 && event.keyCode <= 57) return false;
    console.log(event)
    const charCode = event.which || event.keyCode; // Get the char code from the event object
    const charStr = String.fromCharCode(charCode); // Convert the char code to a string
    
    // Check if the charStr is alphanumeric or a number or a space or backspace using a regular expression
    if ((!event.shiftKey &&event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 32 || (event.keyCode >= 65 && event.keyCode <=90
        || event.keyCode === 16 || (event.keyCode >= 96 && event.keyCode <= 105)
        )) {
        return true;
    } else {
        return false;
    }


    // const alphanumericRegex = /^[0-9a-zA-Z\s\b/]*$/i;
    // console.log("test",alphanumericRegex.test(charStr || event.shiftKey))
    // const alphanumericRegex = /^[0-9a-zA-Z\s]*$/;
    

    // const alphanumericRegex = /^[0-9a-zA-Z]*$/;
    // console.log(alphanumericRegex.test(charStr))
    // return alphanumericRegex.test(charStr);
   

}

export default isAlphanumericOrNumber;