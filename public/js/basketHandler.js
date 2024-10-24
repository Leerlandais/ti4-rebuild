const basketSize = document.getElementById("basketSize") ? document.getElementById("basketSize") : null;
// if grid exists, this must be the checkout page : act accordingly
if(document.getElementById("checkout_grid")) {
        const basket = prepareUnifiedBasket();
        createCheckoutBasket(basket);
}

function drawBasket() {
    let basketLength = localStorage.getItem("BASKET") ? JSON.parse(localStorage.getItem("BASKET")).length : 0;
    showTest ? logThis("Setting checkout button length to : "+basketLength) || 0 : null;
    basketSize.textContent = basketLength;
    if ( basketLength === 0) {
        disableCheckout();
    }else if(basketLength > 49) {
        forceCheckout();
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
}

// If basket limit is reached, force user to checkout
function forceCheckout() {
    alert("You have reached maximum basket size. You will now be redirected to the checkout");
    location.replace("?route=checkout");
}

// Preparation of unified basket (Chair, Chair, Bed, Chair => Chair * 3, Bed)
function prepareUnifiedBasket() {
    showTest ? logThis("Creating compressed basket for checkout", true) : null;
    let origBasket = JSON.parse(localStorage.getItem("BASKET") || "[]");
    showTest ? logThis("Original Basket: " + JSON.stringify(origBasket)): null;
    // If user has gotten to this page by fiddling with URL, send him home
    if(origBasket.length === 0) {
   //     window.location.replace("?route=home");
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
return(uniqueBasket);
    }
}

function increaseBasket(data){
    showTest ? logThis("Increasing Item Count "+ data) : null;
    const basket = prepareUnifiedBasket();
    let j = 0;
    for (let i = 0; i < basket.length; i++) {
        if (parseInt(basket[i].id) === data) {
            showTest ? logThis("Found matching item : "+ basket[i].item +". Increasing amount to "+(basket[i].occurs + 1)) : null;
            basket[i].occurs = basket[i].occurs + 1;
            j = i;
        }
    }
    addItemToStorage(`${basket[j].id},${basket[j].cat},${basket[j].item},${basket[j].price},${basket[j].saved},${basket[j].amount}`);
}

function decreaseBasket(data){
    showTest ? logThis("Decreasing Item Count "+ data) : null;
    const basket = prepareUnifiedBasket();
    let j = 0;
    for (let i = 0; i < basket.length; i++) {
        if (parseInt(basket[i].id) === data) {
            showTest ? logThis("Found matching item : "+ basket[i].item +". Decreasing amount to "+(basket[i].occurs - 1)) : null;
            basket[i].occurs = basket[i].occurs - 1;
            j = i;
        }
    }
    deleteOneItemFromStorage(`${basket[j].id}`);
}

function deleteFromBasket(id) {

    showTest ? logThis("Deleting this from basket : "+id, true) : null;
    let origBasket = JSON.parse(localStorage.getItem("BASKET") || "[]");
    const delResponse = confirm("Are you sure you want to delete this item?");
        if(delResponse === null) {
            return;
        }
    // filter basket keeping only items whose id don't match removed item
    let newBasket = origBasket.filter(data => parseInt(data.id) !== id);

    // erase and re-write the Basket
    localStorage.removeItem("BASKET");
    localStorage.setItem('BASKET', JSON.stringify(newBasket));

    // recreate the checkout
    const basket = prepareUnifiedBasket();
    createCheckoutBasket(basket);

}

basketSize ? drawBasket() : null;