let cookie = document.querySelector("#cookie");
let counter = 0;
let cookieCounter = document.querySelector(".cookie-counter");
let cursorPrice = document.querySelector('.store__price');
let autoCookieTempo=1200
let cursorPricechange= 10
let pricebuy = 1
let farmActive = 0;
const div = document.createElement("div");
div.classList.add("buildings__list", "buildings__list--cursors");
const img = document.createElement('div');
img.classList.add("store__icon", "store__icon--cursor");



function createCursorBuildingList() {
    
    document.querySelector(".buildings").appendChild(div)
    div.appendChild(img);
  }





cursorPrice.addEventListener("click", () => {
    if(counter>cursorPricechange){

    
    counter=counter-cursorPricechange;
    cookieCounter.textContent = counter;
    cursorPricechange=cursorPricechange*2
    cursorPrice.textContent=cursorPricechange
    pricebuy=0
    console.log(counter)
    farmActive++;

setInterval(function(){
    counter++;
    cookieCounter.textContent = counter;
    autoCookieTempo=autoCookieTempo/1.0001;
        }, autoCookieTempo);
        
    }
    else{
        return;
    }
    if(farmActive===1){
        createCursorBuildingList()
    }
});






function render() {
  if (counter >= 10 && pricebuy===1) {
    const storeList = document.querySelector(".store__list");
    const firstStoreListItem = storeList.children[0];
    firstStoreListItem.classList.remove('unavailable')
    const icon = firstStoreListItem.children[0]
    icon.classList.replace(
      "store__icon--cursor-unavailable",
      "store__icon--cursor"
    );
    console.log(firstStoreListItem);
    const price = firstStoreListItem.children[2];
    cursorPrice.textContent = '10'
      }
}
cookie.addEventListener("click", () => {
  counter++;
  cookieCounter.textContent = counter;
  render();
});
