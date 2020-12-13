const pikachu = document.querySelector(".pikachu")
const body = document.querySelector("body")
let move=0;
const pokeball=document.querySelector(".pokeball")
const lighting=document.querySelector(".lighting")
const bomb = document.querySelector(".bomb")
const mew = document.querySelector(".mew")
const berry = document.querySelector(".berry")
const foodarray=[bomb,pokeball,lighting,berry,mew]
const lose = document.querySelector(".LoseInformation")
const timer = document.querySelector(".time")
const volumechanger = document.querySelector("#volumechanger")
const allContent= document.querySelector('.all')
const startB= document.querySelector(".startbutton")
const start= document.querySelector(".start")
const pauseInfo=document.querySelector(".pauseInfo")
const pokemonsong=new Audio("pokemonsong.mp3")
let time=0;
audioL = new Audio("audio1.mp4")
audioB = new Audio("audio2.mp4")
audioP = new Audio("audio3.mp4")
audioM = new Audio("audio4.mp4")
audioBerry = new Audio("audio4.mp4")
sound=[audioL,audioP,audioM,audioBerry]
audioL.volume=0.1
audioP.volume=0.1
audioM.volume=0.1
audioBerry.volume=0.1
const fallingNumbers = {
    bomb: 0,
    lighting:0,
    pokeball:0,
    mew:0,
    berry:0,
}
let BombFallingNumber = 0;
let LightingFallingNumber = 0;
let PokeballFallingNumber = 0;
let MewFallingNumber = 0;
let BerryFallingNumber = 0;
let limit=window.innerWidth/2;
let heightLimit = window.innerHeight*0.67;
let objectToFall=['lighting',"bomb","pokeball","mew","berry"]
let Points=0
const HtmlPoints=document.querySelector(".points")

let left = false;
let right = false;
let gameOver = false;
permissionRight=true;
permissionLeft=true;
const VisableOfButton=document.querySelector(".OneMoreTime")
const buttonPlay=document.querySelector(".buttonPlay")






function removeObjects(){
    for( const i in foodarray){
        foodarray[i].id="none"
        foodarray[i].style=""
    }
    objectToFall=['lighting',"bomb","pokeball","mew","berry"]
    fallingNumbers['lighting']=0
    fallingNumbers['bomb']=0
    fallingNumbers['pokeball']=0
    fallingNumbers['mew']=0
    fallingNumbers['berry']=0
    Points=0
    time=0
    timer.innerText="0"
    HtmlPoints.innerText= Points.toString()
}
startB.addEventListener('click',e=>{
    allContent.style.display="block"
    start.style.display="none"
    timeCounter()
    game()
    addingfood()
    PlaySong()
})

function PlaySong(){
    pokemonsong.play()
    pokemonsong.volume=0.2
}

volume=["unmute","mute"]
volNumb=1
volumechanger.addEventListener('click',e=>{
    volumechanger.classList=volume[volNumb%2]
    volNumb++ 
})
function timeCounter(){ TimeCounter =setInterval(function(){
    time++
    timer.innerText= "Time: "+time.toString();
},1000)}


window.addEventListener('resize', () => { limit = window.innerWidth/2,heightLimit=window.innerHeight*0.67})
buttonPlay.addEventListener('click',event=>{
    buttonPlay.style.display="none"
    lose.style.display="none"
    timeCounter()
    game()
    addingfood()
    PlaySong()

})
let Spaceplay=false
let Splay=true
const handleKeyDown=event => {
    if(event.code==='ArrowLeft'&&permissionLeft&&Spaceplay===false){
        left = true;
    }
    if(event.code==='ArrowRight'&&permissionRight&&Spaceplay===false){
        right = true
    }
    if(event.code==='Space'){
        clearInterval(Game)
        clearInterval(Addingfood)
        clearInterval(TimeCounter)
    }
    if(event.code==='Space'&&Spaceplay===false){
        clearInterval(Game)
        clearInterval(Addingfood)
        clearInterval(TimeCounter)
        pauseInfo.innerText="Kliknij s aby grac"
        Spaceplay=true
        Splay=false        
    }
    if(event.code==='KeyS'&& Splay===false){
        game();
        addingfood()
        timeCounter()
        pauseInfo.innerText="Kliknij spacje aby zapauzowac"
        Splay=true
        Spaceplay=false
       
    }
}
function positionChecker(){
    if(pikachu.getBoundingClientRect().x>window.innerWidth-200){
        right=false
        permissionRight=false;
        permissionLeft=true;
    }

        
    
    if(pikachu.getBoundingClientRect().x<window.innerWidth*0.005){
        left=false
        permissionLeft=false;
        permissionRight=true;
    }
    
    
}
var lastUpdateTime = Date.now();
const update = () => {
    const now = Date.now();
    const dTime = now - lastUpdateTime;
    // console.log(dTime)
    const direction = left && right ? 0 : right ? 1 : !right&&!left ? 0 : left ? -1 : 1 ; 
    
    move = move + direction * dTime*window.innerWidth/1900 ;
    pikachu.style.transform="translateX("+move.toString()+"px)"

    lastUpdateTime = now;
    
    requestAnimationFrame(update);
}

update();
window.addEventListener('keyup',event=>{
    if(event.code==='ArrowLeft'){
        left = false;
        permissionRight=true

    }
    if(event.code==='ArrowRight'){
        right = false
        permissionLeft=true
        
    }
})


movePikachu=window.addEventListener('keydown', handleKeyDown )



randomObjectToFall =() => {
    return objectToFall[Math.abs(Math.round(Math.random() * objectToFall.length - 1))];
}
randomRightPosition =() =>{
    width=window.innerWidth-200
    return  ((Math.random() * width)  +100).toString()+"px"
}

function addFood(){
    let randomObject=randomObjectToFall()
    objectToFall=objectToFall.filter(a=>a!=randomObject)
    foodImage=document.querySelector("."+randomObject.toString())
    foodImage.style.right=randomRightPosition()
    foodImage.setAttribute("id","active")
    foodImage.style.display="block"
}
function addPoints(){
    Points=Points+10;
    HtmlPoints.innerText= Points.toString()
}


function addingfood(){ Addingfood=setInterval(function(){
    addFood()
},1200)}

function checker(object){
    if(Math.abs(pikachu.getBoundingClientRect().x-object.getBoundingClientRect().x)<125&&object.className!="bomb"){
        
        
        addPoints();
        console.log(object.style.transform)
       
        object.setAttribute("id","none")
        object.style.transform="translateY(0px)"
        object.style.display="none"
        objectToFall.push(object.className)
        fallingNumbers[object.className.toString()]=0
        console.log("now")
        
        if(object===lighting){
            sound[Math.floor(Math.random()*3)].play();
        }
        
         
        
        
    }
    
    else if(Math.abs(pikachu.getBoundingClientRect().x-object.getBoundingClientRect().x)<125&&object.className==="bomb"||Math.abs(pikachu.getBoundingClientRect().x-object.getBoundingClientRect().x)>125&&object.className!="bomb"&&parseInt(object.style.transform.slice(11,14))>window.innerHeight*0.78){
        lose.innerText="PRZEGRALES"
        clearInterval(Game)
        clearInterval(Addingfood)
        clearInterval(TimeCounter)
        removeObjects()
          buttonPlay.style.display="block"
         lose.style.display="block"
        // window.removeEventListener("keydown",handleKeyDown)
        VisableOfButton.style.display="block"
        gameOver=true
        audioB.volume=0.2
        audioB.play()
        pokemonsong.pause();
      
    }
    
}

const updateElement = (element, elementName) => {
    const number = fallingNumbers[elementName]
    element.style.transform="translateY("+ number.toString()+"px"
            fallingNumbers[elementName] = number+4;
            if(number>heightLimit){
                checker(element);
            }
            if(number>window.innerHeight*0.8){
                element.setAttribute("id","none")
                fallingNumbers[elementName]=0;
                element.style.transform="translateY(0px)"
                element.style.display="none"
                objectToFall.push(elementName)
            }
}
var game
var addingfood
var timeCounter
function game(){ Game=
    setInterval(function(){
    
        if(bomb.id==="active"){

            updateElement(bomb, 'bomb');
            
            // bomb.style.transform="translateY("+ BombFallingNumber.toString()+"px"
            // BombFallingNumber=BombFallingNumber+4;
            // if(BombFallingNumber>heightLimit){
            //     checker(bomb);
            //     bomb.setAttribute("id","none")
            //     BombFallingNumber=0;
            //     bomb.style.transform="translateY(0px)"
            //     bomb.style.display="none"
            //     objectToFall.push("bomb")
                
            // }
    }
    if(lighting.id==="active"){
        updateElement(lighting, 'lighting');
        // lighting.style.transform="translateY("+ LightingFallingNumber.toString()+"px"
        // LightingFallingNumber=LightingFallingNumber+4;
        // if(LightingFallingNumber>heightLimit){
        //     checker(lighting)
        //     lighting.setAttribute("id","none")
        //     LightingFallingNumber=0;
        //     lighting.style.transform="translateY(0px)"
        //     lighting.style.display="none"
        //     objectToFall.push("lighting")
            
        // }
}
    if(pokeball.id==="active"){
        updateElement(pokeball, 'pokeball');
    //     pokeball.style.transform="translateY("+ PokeballFallingNumber.toString()+"px"
    //     PokeballFallingNumber=PokeballFallingNumber+4;
    //     if(PokeballFallingNumber>heightLimit){
    //         checker(pokeball)
    //         pokeball.setAttribute("id","none")
    //         PokeballFallingNumber=0;
    //         pokeball.style.transform="translateY(0px)"
    //         pokeball.style.display="none"
    //         objectToFall.push("pokeball")
            
    //     }
    }
    if(mew.id==="active"){
        updateElement(mew, 'mew');
//         mew.style.transform="translateY("+ MewFallingNumber.toString()+"px"
//         MewFallingNumber=MewFallingNumber+4;
//         if(MewFallingNumber>heightLimit){
//             checker(mew)
//             mew.setAttribute("id","none")
//             MewFallingNumber=0;
//             mew.style.transform="translateY(0px)"
//             mew.style.display="none"
//             objectToFall.push("mew")
//         }
}
    if(berry.id==="active"){
        updateElement(berry, 'berry');
        // berry.style.transform="translateY("+ BerryFallingNumber.toString()+"px"
        // BerryFallingNumber=BerryFallingNumber+4;
        // if(BerryFallingNumber>heightLimit){
        //     checker(berry)
        //     berry.setAttribute("id","none")
        //     BerryFallingNumber=0;
        //     berry.style.transform="translateY(0px)"
        //     berry.style.display="none"
        //     objectToFall.push("berry")
            
        // }
    }
    positionChecker()
    
   
},15)
}



//1 sposob
// var intervals = []

// for(let i = 0; i < 10; i += 1) {
//     const intervalId = setInterval(() => console.log(i), 1000);
//     intervals.push(intervalId)
// }

// function clearAll() {
//     intervals.forEach(i => clearInterval(i));
// }

//2 sposob  
// var fruitIntervals = {}

// for (let i = 0; i < 10; i += 1) {
//     const intervalId = setInterval(() => console.log(i), 1000);
//     fruitIntervals[`fruit-${i}`] = intervalId;
// }

// function clearFruit(fruitId) {
//     clearInterval(fruitIntervals[fruitId]);
//     delete fruitIntervals[fruitId];
// }
