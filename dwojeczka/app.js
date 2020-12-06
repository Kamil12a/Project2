const pikachu = document.querySelector(".pikachu")
const body = document.querySelector("body")
let move=0;
window_width=window.innerWidth;
limit=window.innerWidth/2;


window.addEventListener('resize', () => { limit = window.innerWidth/2})

window.addEventListener('keydown', event => {
    if(event.code==='ArrowLeft'&&move-80>-limit){
        
        move=move-13;
        pikachu.style.transform="translateX("+move.toString()+"px)"
        move=move-13;
        move_flow()
        
    }
    if(event.code==='ArrowRight'&&move+80<limit){
        
        move=move+13;
        pikachu.style.transform="translateX("+move.toString()+"px)"
        move=move+13;
        move_flow()
    }
    
})
let i=0;
var Stoper=[]
function falling(object,moveY){
    Interval=setInterval(function(){
        object.style.transform="translateY("+moveY.toString()+"px)"
        moveY=moveY+10;
        
    },50)
    Stoper.push(Interval)
    
    setTimeout(function(){
        clearInterval(Stoper[i]) 
        
        i++;
    },3000)
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
    
    foodImage.style.width="300px"
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

lightingPositionY=[];
lightingPositionX=[];
setInterval(function(){
    addFood();
    
    
    lightingPositionX.push(document.getElementById("foodfalling"+(numberOfFood).toString()).style.right)
    lightingPositionY.push(document.getElementById("foodfalling"+(numberOfFood).toString()))
    
    

    
    
},3000)
let points=0

PointsChanger=document.querySelector("#points")

setInterval(function(){
    let pikachuPosition=pikachu.style.transform;
    console.log(lightingPositionY[numberOfFood-1].style.transform.substring(11,14))
    // console.log(Math.abs(parseInt(lightingPositionX[numberOfFood-1])+parseInt(pikachuPosition.substring(11,16))-parseInt(limit)+120))
    if(Math.abs(parseInt(lightingPositionX[numberOfFood-1])+parseInt(pikachuPosition.substring(11,16))-parseInt(limit)+120)<75&&lightingPositionY[numberOfFood-1].style.transform.substring(11,14)>540){
        let opacity=1
        points=points+100
        document.getElementById("foodfalling"+(numberOfFood-1).toString()).src="check.png"
        document.getElementById("foodfalling"+(numberOfFood-1).toString()).style.width="150px"
        PointsChanger.innerText=points.toString();
        setTimeout(function(){

            document.getElementById("foodfalling"+(numberOfFood-2).toString()).style.display="none"
        },200)
       
        
       
    }
    else{
        console.log("PRZEGRALES")
    }   
},15)