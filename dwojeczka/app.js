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

//nie zatrzymuje poprawnie blyskawic, problem z setIntervalem
function falling(object,moveY){
    Interval=setInterval(function(){
        object.style.transform="translateY("+moveY.toString()+"px)"
        moveY=moveY+10;
        if(moveY>500){
            clearInterval(Interval)
        }
        
    },200)
    
    
}
function move_flow(){
   
    setTimeout(function(){
        pikachu.style.transform="translateX("+move.toString()+"px)"
        
    },100)
    
}
//tutaj zaczyna sie problem, 
//blyskawice ida
let numberOfFood=0
let fallingDownNumber=0;
function addFood(){
    foodPosition=Math.floor(Math.random()*window.innerWidth);
    
    var foodImage= document.createElement('img')
    foodImage.src="lighting.png"
    foodImage.setAttribute("id","foodfalling"+numberOfFood.toString())
    
    foodImage.style.width="200px"
    foodImage.style.position="absolute"
    setTimeout(function(){
        document.getElementById("foodfalling"+numberOfFood.toString()).style.top="0";
        numberOfFood++;
    },1)
    
    // document.getElementById("foodfalling0").style.top="0"
    foodImage.style.right= foodPosition.toString()+"px";
    var body = document.querySelector('body');
    body.appendChild(foodImage);
    
    falling(document.getElementById("foodfalling"+numberOfFood.toString()),0)
    
        
}
setInterval(function(){
    addFood();
    console.log(numberOfFood)
},5000)
