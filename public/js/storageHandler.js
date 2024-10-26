

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

function deleteOneItemFromStorage(data) {
    let currentBasket = JSON.parse(localStorage.getItem("BASKET"));
    const remItem = currentBasket.findIndex(item => item.id === data);
    currentBasket.splice(remItem, 1);
    localStorage.setItem("BASKET", JSON.stringify(currentBasket));
    const basket = prepareUnifiedBasket()
    createCheckoutBasket(basket);
}

function createNewStorage() {
    if(confirm("Are you sure you want to reset the Storage?")) {
        localStorage.clear();
        location.replace("?route=home");

    }
}


function completeCheckoutOperation() {
    const finalBasket = prepareUnifiedBasket();
    const soldDatas = JSON.parse(localStorage.getItem("SOLD"));

    finalBasket.forEach((item) => {
        for (let i = 0; i < soldDatas.length; i++) {
            if (parseInt(soldDatas[i].id) === parseInt(item.id)) {
                soldDatas[i].sold = soldDatas[i].sold + item.occurs;
                showTest ? logThis("Adjusting sold amount for item: " + soldDatas[i].id + " New value : " + (soldDatas[i].sold + item.occurs)) : null;
            }
        }
    });

    localStorage.setItem("SOLD", JSON.stringify(soldDatas));
    showTest ? logThis("Removing basket on sale completion : ", true) : null;
    localStorage.removeItem("BASKET");
}

