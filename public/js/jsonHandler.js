function getProductJson(){
    showTest ? logThis("Fetching JSON data", true, "JSON") : null;
    fetch("js/products.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            showTest ? logThis("Received this :"+JSON.stringify(datas)) : null;
            return datas;
        })
        .catch(error => console.error('Error fetching datas:', error));
}

getProductJson();