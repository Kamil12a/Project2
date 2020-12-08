const pikachu = document.querySelector(".pikachu")
const body = document.querySelector("body")
let move=0;
const pokeball=document.querySelector(".pokeball")
const lighting=document.querySelector(".lighting")
const bomb = document.querySelector(".bomb")
const mew = document.querySelector(".mew")
const berry = document.querySelector(".berry")
let BombFallingNumber = 0;
let LightingFallingNumber = 0;
let PokeballFallingNumber = 0;
let MewFallingNumber = 0;
let BerryFallingNumber = 0;
let limit=window.innerWidth/2;
let heightLimit = window.innerHeight*0.67;
window.addEventListener('resize', () => { limit = window.innerWidth/2,heightLimit=window.innerHeight*0.67})
let objectToFall=['lighting',"bomb","pokeball","mew","berry"]
let Points=0
const HtmlPoints=document.querySelector(".points")

window.addEventListener('keydown', event => {
    if(event.code==='ArrowLeft'&&move-80>-limit){
        move=move-13;
        pikachu.style.transform="translateX("+move.toString()+"px)"
        move=move-13; 
    }
    if(event.code==='ArrowRight'&&move+80<limit){
        move=move+13;
        pikachu.style.transform="translateX("+move.toString()+"px)"
        move=move+13;
    }
    
})


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

setInterval(function(){
    addFood()
},1500)
function checker(object){
    if(Math.abs(pikachu.getBoundingClientRect().x-object.getBoundingClientRect().x)<100){
        
        
        addPoints();
        
    }
}
setInterval(function(){
    
        if(bomb.id==="active"){
            
            bomb.style.transform="translateY("+ BombFallingNumber.toString()+"px"
            BombFallingNumber=BombFallingNumber+4;
            if(BombFallingNumber>heightLimit){
                checker(bomb);
                bomb.setAttribute("id","none")
                BombFallingNumber=0;
                bomb.style.transform="translateY(0px)"
                bomb.style.display="none"
                objectToFall.push("bomb")
                
            }
    }
    if(lighting.id==="active"){
        
        lighting.style.transform="translateY("+ LightingFallingNumber.toString()+"px"
        LightingFallingNumber=LightingFallingNumber+4;
        if(LightingFallingNumber>heightLimit){
            checker(lighting)
            lighting.setAttribute("id","none")
            LightingFallingNumber=0;
            lighting.style.transform="translateY(0px)"
            lighting.style.display="none"
            objectToFall.push("lighting")
            
        }
}
    if(pokeball.id==="active"){
        
        pokeball.style.transform="translateY("+ PokeballFallingNumber.toString()+"px"
        PokeballFallingNumber=PokeballFallingNumber+4;
        if(PokeballFallingNumber>heightLimit){
            checker(pokeball)
            pokeball.setAttribute("id","none")
            PokeballFallingNumber=0;
            pokeball.style.transform="translateY(0px)"
            pokeball.style.display="none"
            objectToFall.push("pokeball")
            
        }
    }
    if(mew.id==="active"){
        
        mew.style.transform="translateY("+ MewFallingNumber.toString()+"px"
        MewFallingNumber=MewFallingNumber+4;
        if(MewFallingNumber>heightLimit){
            checker(mew)
            mew.setAttribute("id","none")
            MewFallingNumber=0;
            mew.style.transform="translateY(0px)"
            mew.style.display="none"
            objectToFall.push("mew")
        }
}
    if(berry.id==="active"){
        
        berry.style.transform="translateY("+ BerryFallingNumber.toString()+"px"
        BerryFallingNumber=BerryFallingNumber+4;
        if(BerryFallingNumber>heightLimit){
            checker(berry)
            berry.setAttribute("id","none")
            BerryFallingNumber=0;
            berry.style.transform="translateY(0px)"
            berry.style.display="none"
            objectToFall.push("berry")
            
        }
    }
    
   
   
},15)





