

function createSoldItems(datas) {
         const storageArray = [];
   datas.forEach(data => {
         const item = {id: data.id, amount: data.amount, sold: Math.floor(Math.random() * 40) + 1};
         storageArray.push(item);
      localStorage.setItem("SOLD", JSON.stringify(storageArray));
   });
      showTest ? logThis("Sold Inventory Created : "+localStorage.getItem("SOLD")) : null;
}

function addItemToStorage(data) {
   data = data.split(",")
    const item = {
        "id": data[0],
        "cat": data[1],
        "item": data[2],
        "price": data[3],
        "saved": data[4],
        "amount": data[5],
    };
    // add item to existing basket or create new one if needed
    showTest ? logThis("Adding "+item["item"]+" to the basket", true) : null;
    let currentBasket = JSON.parse(localStorage.getItem("BASKET")) || [];
    showTest ? logThis("Original Basket size is "+currentBasket.length) : null;
    currentBasket.push(item);
    localStorage.setItem("BASKET", JSON.stringify(currentBasket));
    showTest ? logThis("New Basket size is "+JSON.parse(localStorage.getItem("BASKET")).length) : null;
    if (document.getElementById(`amt${item['id']}`)) {
        addedItemAdjuster(item)
    }else {
        const basket = prepareUnifiedBasket()
        createCheckoutBasket(basket);
    }

}

function createNewStorage() {
    if(confirm("Are you sure you want to reset the Storage?")) {
        localStorage.clear();
        location.replace("?route=home");

    }
}