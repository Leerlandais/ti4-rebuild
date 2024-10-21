// function to check the current setup and launch the necessary
function isDomLoaded () {
    document.addEventListener("DOMContentLoaded", (event) => {
        console.log("DOM fully loaded, running Initialiser");
        runInitialChecks();
    });
}

function runInitialChecks() {
    // Does the localStorage Tests exist
    localStorage.getItem('TESTS') ? setTestLevel() : createTestLevel();
}

// if test level already exists, adjust the project setting accordingly
function setTestLevel() {
    console.log("setTestLevel()");
}
// otherwise, create the setting - default => false
function createTestLevel() {
    console.log("createTestLevel()");
}



// launch the original check function
isDomLoaded();