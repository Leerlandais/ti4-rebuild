let soldItems = JSON.parse(localStorage.getItem("SOLD"));
if (soldItems === undefined || soldItems === null) {
   getProductJson("storageSold");
 }

function createSoldItems(datas) {
         const storageArray = [];
   datas.forEach(data => {
         const item = {id: data.id, amount: data.amount, sold: Math.floor(Math.random() * 40) + 1};
         storageArray.push(item);
      localStorage.setItem("SOLD", JSON.stringify(storageArray));
   });
      showTest ? logThis("Sold Inventory Created : "+localStorage.getItem("SOLD")) : null;
}