const basketSize = document.getElementById("basketSize") ? document.getElementById("basketSize") : null;
// if grid exists, this must be the checkout page : act accordingly
document.getElementById("checkout_grid") ? prepareUnifiedBasket() : null

function drawBasket() {
    let basketLength = localStorage.getItem("BASKET") ? JSON.parse(localStorage.getItem("BASKET")).length : 0;
    showTest ? logThis("Setting checkout button length to : "+basketLength) || 0 : null;
    basketSize.textContent = basketLength;
    if (basketSize.textContent === "50" || basketLength === 0) {
        disableCheckout();
    }else {
        document.getElementById("checkoutButton").classList.remove("isDisabled");
    }
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
    document.getElementById("checkoutButton").classList.add("isDisabled");
    console.log("Disabled Checkout");
}

// Preparation of unified basket (Chair, Chair, Bed, Chair => Chair * 3, Bed)
function prepareUnifiedBasket() {

    let origBasket = JSON.parse(localStorage.getItem("BASKET") || "[]");
    showTest ? logThis("Original Basket: " + JSON.stringify(origBasket)): null;
    // If user has gotten to this page by fiddling with URL, send him home
    if(origBasket.length === 0) {
        window.location.replace("?route=home");
    }else{
        // Calculate occurrences of each item
        const occurrences = origBasket.reduce((item, currentItem) => {
            const key = JSON.stringify(currentItem);
            item[key] = (item[key] || 0) + 1;
            return item;
        }, {});

        // Create uniqueBasket by mapping keys and add occurs value
        const uniqueBasket = Object.keys(occurrences).map(key => {
            const item = JSON.parse(key);
            return {
                ...item,
                occurs: occurrences[key]
            };
        });

        showTest ? logThis("Compressed Basket: "+ JSON.stringify(uniqueBasket)): null;
    }

}

basketSize ? drawBasket() : null;