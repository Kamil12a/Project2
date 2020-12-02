const pikachu = document.querySelector(".pikachu")
const body = document.querySelector("body")
let move=0;
setInterval(function(){
    window_width=window.innerWidth;
    limit=window.innerWidth/2;
},1)



window.addEventListener('keydown', event => {
    if(event.code==='ArrowLeft'&&move-80>-limit){
        
        move=move-8;
        pikachu.style.transform="translateX("+move.toString()+"px)"
        move=move-8;
        move_flow()
        
    }
    if(event.code==='ArrowRight'&&move+80<limit){
        
        move=move+8;
        pikachu.style.transform="translateX("+move.toString()+"px)"
        move=move+8;
        move_flow()
    }
    
})

function move_flow(){
   
    setTimeout(function(){
        pikachu.style.transform="translateX("+move.toString()+"px)"
        
    },100)
    
}
let fallingDownNumber=0;
function addFood(img){
    foodPosition=Math.floor(Math.random()*window.innerWidth);
    
    var foodImage= document.createElement('img')
    foodImage.src="lighting.png"
    foodImage.style.width="200px"
    foodImage.style.position="absolute"
    foodImage.style.top="0"
    foodImage.style.right= foodPosition.toString()+"px";
    var body = document.querySelector('body');
    body.appendChild(foodImage);
    setInterval(function(){
        foodImage.style.transform="translateY("+fallingDownNumber.toString()+"px)"
        fallingDownNumber++;
    },6)
        
}
setInterval(function(){
    var foodImage1 = document.createElement('img') //Tutaj ma sie losowac foodIMage1 foodIMage2 ....
    addFood(foodImage1);
},500)
