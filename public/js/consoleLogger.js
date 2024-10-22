// Assigns stored value to showTest or creates entry if needed
let showTest = JSON.parse(localStorage.getItem("TESTS"));
if (showTest === undefined || showTest === null) {
    localStorage.setItem("TESTS", JSON.stringify(false));
    showTest = false;
}else{
    showTest = JSON.parse(localStorage.getItem("TESTS"));
}

const currentLogSetting = document.getElementById("currentLogSetting");
currentLogSetting.textContent = showTest;

function toggleLogs(){
    showTest = !showTest;
    localStorage.setItem("TESTS", JSON.stringify(showTest));
    currentLogSetting.textContent = showTest;
    showTest ? logThis("Logging Activated", true) : null;

}

// Outputs a console.log/console.warn with message and optional expected result
function logThis(msg, type = false, res = "") {
    res.length > 0 ? console.log("Expected result :", res) : null;
    type ? console.warn(msg) : console.log(msg);
}
