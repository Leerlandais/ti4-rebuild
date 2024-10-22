// Assigns stored value to showTest or creates entry if needed
let showTest = JSON.parse(localStorage.getItem("TESTS"));
if (showTest === undefined || showTest === null) {
    localStorage.setItem("TESTS", JSON.stringify(false));
    showTest = false;
}else{
    showTest = JSON.parse(localStorage.getItem("TESTS"));
}

// Outputs a console.log/console.warn with message and optional expected result
function logThis(msg, type = false, res = "") {
    type ? console.warn(msg) : console.log(msg);
    res.length > 0 ? console.log("Expected result :", res) : null;
}

const currentLogSetting = document.getElementById("currentLogSetting");
function toggleLogs(){
    showTest = !showTest;
    currentLogSetting.textContent = showTest;

}