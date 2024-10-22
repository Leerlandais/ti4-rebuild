function getProductJson(direction){
    showTest ? logThis("Fetching JSON data", true, "JSON") : null;
    fetch("js/products.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            showTest ? logThis("Received this :"+JSON.stringify(datas)) : null;
            handleJsonData(datas, direction);
        })
        .catch(error => console.error('Error fetching datas:', error));
}

function handleJsonData(datas, direction) {
    switch (direction) {
        case "categoryBuild" :
            buildCategoryGrid(datas);
    }
}

getProductJson("categoryBuild");
