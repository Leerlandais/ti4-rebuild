const basketSize = document.getElementById("basketSize") ? document.getElementById("basketSize") : null;
// if grid exists, this must be the checkout page : act accordingly
document.getElementById("checkout_grid") ? prepareUnifiedBasket() : null

function drawBasket() {
    showTest ? logThis("Setting checkout button length to : "+JSON.parse(localStorage.getItem("BASKET")).length) : null;
    basketSize.textContent = localStorage.getItem("BASKET") ? JSON.parse(localStorage.getItem("BASKET")).length : "0";
    if (basketSize.textContent === "50") disableCheckout();
}

function addedItemAdjuster(item) {
    // adjust the remaining amount display
    const remDisplay = document.getElementById(`amt${item['id']}`);
    const cartBtn = document.getElementById(`ITEM${item['id']}`);
    let remAmount = parseInt(remDisplay.textContent);
        remAmount--;
    showTest ? logThis("Adjusting remaining amount for :"+ item.item+ " : "+ remAmount+ " remaining"): null;
    remDisplay.textContent = remAmount.toString();

    // disable button if maximum amount bought
    if (remAmount < 1) {
        cartBtn.disabled = true;
        cartBtn.textContent = "Sold Out!";
        cartBtn.style.opacity = "0.5";
        showTest ? logThis("Article "+item['id']+" marked out of stock", true) : null;
    }

    drawBasket();

}

// I'll apply this later to limit basket size
function disableCheckout() {
    console.log("Disabled Checkout");
}

// Preparation of unified basket (Chair, Chair, Bed, Chair => Chair * 3, Bed)
function prepareUnifiedBasket() {
    let origBasket = localStorage.getItem("BASKET");
    showTest ? logThis("Original Basket: " + origBasket): null;
    // If user has gotten to this page by fiddling with URL, send him home
    if(origBasket === null || origBasket === undefined) {
        window.location.replace("?route=home");
    }
}

basketSize ? drawBasket() : null;