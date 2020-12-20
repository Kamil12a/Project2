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
const form=document.querySelector('form')
const pointsInformation=document.querySelector(".pointsInformation")
let time=0;
let gameover=0
audioL = new Audio("audio1.mp4")
audioB = new Audio("audio2.mp4")
audioP = new Audio("audio3.mp4")
audioM = new Audio("audio4.mp4")
audioBerry = new Audio("audio4.mp4")
sound=[audioL,audioP,audioM,audioBerry]
audioL.volume=0.3
audioP.volume=0.3
audioM.volume=0.3
audioBerry.volume=0.3
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
const showrank = document.querySelector(".ranking")
const showplaces = document.querySelector(".rank")
function showRecord(){
    showrank.style.display="flex"
    showplaces.style.display="flex"
}
function showform(){
    form.style.display="block"
}
function hideform(){
    form.style.display="none"
}

function hideRecord(){
    showrank.style.display="none"
    showplaces.style.display="none"
}
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
    
    time=0
    timer.innerText="Time: 0"
    HtmlPoints.innerText= " "
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
    Points=0
    hideRecord()
    hideform()
    pointsInformation.style.display="none"
    gameover=0

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
    if(event.code==='Space'&&Spaceplay===false&&gameover===0){
        clearInterval(Game)
        clearInterval(Addingfood)
        clearInterval(TimeCounter)
        pauseInfo.innerText="Kliknij s aby grac"
        Spaceplay=true
        Splay=false     
    }
    if(event.code==='KeyS'&& Splay===false&&gameover===0){
        game();
        addingfood()
        timeCounter()
        pauseInfo.innerText="Kliknij spacje aby zapauzowac"
        Splay=true
        Spaceplay=false
        hideform()
        hideRecord()
        buttonPlay.style.display="none"
         lose.style.display="none"
       
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
    let direction = left && right ? 0 : right ? 1 : !right&&!left ? 0 : left ? -1 : 1 ; 
    if(Spaceplay===true){
        direction=0
    }
    if(Spaceplay===false){
        direction=left && right ? 0 : right ? 1 : !right&&!left ? 0 : left ? -1 : 1 
    }

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
    Points=Points+1000000;
    HtmlPoints.innerText= Points.toString()
    pointsInformation.innerText="Super! Masz "+Points.toString()+" punktów"
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
        VisableOfButton.style.display="block"
        gameOver=true
        audioB.volume=0.2
        audioB.play()
        pokemonsong.pause();  
        showRecord()
        showform()
        pointsInformation.style.display="block"
        gameover=1
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
    }
    if(lighting.id==="active"){
        updateElement(lighting, 'lighting');
}
    if(pokeball.id==="active"){
        updateElement(pokeball, 'pokeball');
    }
    if(mew.id==="active"){
        updateElement(mew, 'mew');
    }
    if(berry.id==="active"){
        updateElement(berry, 'berry');
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
let rankObject = {};
const username=document.querySelector('.username')
form.addEventListener('submit',e=>{
    firebase.firestore().collection('ranking').add({
        username:username.value,
        points:Points.toString()
        
    })
    setTimeout(function(){
        firebase.firestore().collection('ranking').onSnapshot((ranking) => render(ranking));
        setTimeout(function(){
            renderPlaces()
            hideform()
        },500)
    },500)
    
    
    
})

firebase.firestore().collection('ranking').onSnapshot((ranking) => render(ranking));

function render(ranking) {
	

	
    ranking.forEach((ranking) => {
        const username = ranking.data().username;
        const points = ranking.data().points;
        rankObject[username]=points
    }

)}
const Rank1=document.querySelector(".Rank1")
const Rank2=document.querySelector(".Rank2")
const Rank3=document.querySelector(".Rank3")
function renderPlaces(){
    let firstPlace=0
    let secoundPlace=0
    let thirdPlace=0
    // let secoundPlace=rankObject[Object.keys(rankObject)[0]]
    // let thirdPlace=rankObject[Object.keys(rankObject)[0]]
    let firstName=""
    let secoundName=""
    let thirdName=""
    
    
        for(key2=0;key2<Object.keys(rankObject).length;key2++){
            for(key=0;key<Object.keys(rankObject).length;key++){
                let keyfirst=parseInt(rankObject[Object.keys(rankObject)[key]])
                if(firstPlace<keyfirst){
                    firstPlace=keyfirst
                    firstName=Object.keys(rankObject)[key]
                }
                if(secoundPlace<keyfirst&&keyfirst!=firstPlace){
                    secoundPlace=keyfirst
                    secoundName=Object.keys(rankObject)[key]
                }
                if(thirdPlace<keyfirst&&keyfirst!=firstPlace&&keyfirst!=secoundPlace){
                    thirdPlace=keyfirst
                    thirdName=Object.keys(rankObject)[key]
                }
               
            }
                
        }
        
        Rank1.innerText="1. "+firstName+":"+firstPlace
        Rank2.innerText="2. "+secoundName+":"+secoundPlace
        Rank3.innerText="3. "+thirdName+":"+thirdPlace
   
}
setTimeout(function(){
    renderPlaces()
},1000)

