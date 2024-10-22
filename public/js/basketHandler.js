

function addedItemAdjuster(item) {
    // adjust the remaining amount display
    const remDisplay = document.getElementById(`amt${item['id']}`);
    const cartBtn = document.getElementById(`ITEM${item['id']}`);
    let remAmount = parseInt(remDisplay.textContent);
    remAmount--;
    showTest ? logThis("Adjusting remaining amount for :"+ item.item+ " : "+ remAmount+ " remaining"): null;
    remDisplay.textContent = remAmount;
    // disable button is maximum amount bought
    if (remAmount < 1) {
        cartBtn.disabled = true;
        cartBtn.textContent = "Sold Out!";
        cartBtn.style.opacity = 0.5;
        showTest ? logThis("Article "+item['id']+" marked out of stock", true) : null;
    }
}