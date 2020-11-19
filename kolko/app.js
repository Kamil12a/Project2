const field = document.querySelector('article')
console.log(field);
let tour=0;
var oval =[];
var cross=[];
arrayChangecross=[];
arrayChangeoval=[];
let ii=0;
let iii=0;
arrayChangeNumboval=[];
arrayChangeNumbcross=[];
let win65=0;
let win66=0;
let win67=0;
array=[];
crossside='KRZYZYK';
ovalside='oval'
let WinPoint1=1;
let WinPoint2=1;
let Point1=0;
let Point2=0;
const Ppoint1=document.querySelector("#PPoint")
const Ppoint2=document.querySelector("#PPoint2")
let drawPoint=0;
Ppoint1.innerText=Point1.toString()
Ppoint2.innerText=Point2.toString()



function sortNumbers(a, b) {
    return a - b;
  }
 
function winnerChecker(arrayChange,arrayChangeNumb,side,Ppoint) {
    
    let Point=1;
    b=arrayChange.length-1
    let a=arrayChange[b];
    arrayChangeNumb.push(a[0]*a[1].charCodeAt())   
    arrayChangeNumb.sort(sortNumbers)
    j=0;
    win65=0;
    win67=0;
    win66=0;
    let d = 130;
    let p=65;
    let h=195;
    let win130=0;
    let win68=0;
    let win195=0;
    let s =65;
    let r =67;
    let wincross=0;
    let wincross2=0;
    
    
    
            
        
        
        for(let j=0 ; j<arrayChangeNumb.length+1;j++){
            
            
            if(arrayChangeNumb[j]%65===0){   
                win65++;}
            if(arrayChangeNumb[j]%66===0){
                win66++;
            }
            if(arrayChangeNumb[j]%67===0){
                win67++;
            }
            if(arrayChangeNumb[j]===d){
                win130++
                d=d+2
            }
            if(arrayChangeNumb[j]===p){
                win68++
                p=p+1;
            }
            if(arrayChangeNumb[j]===h){
                win195++
                h=h+3;
            }
            if(arrayChangeNumb[j]===s){
                wincross++;
                if(s===132){
                    s=201;
                }
                if(s===65){
                    s=132;
                }
               
                }
            if(arrayChangeNumb[j]===r){
                wincross2++;
                if(r===132){
                    r=195;
                }
                if(r===67){
                    r=132;
                }
            
                }
            }
        
            
            
        if(win65>2||win66>2|| win67>2||win130>2||win68>2 ||win195>2||wincross>2||wincross2>2){
            console.log('WYGRAŁ'+" "+side)
            
            arrayChange=[];
            arrayChangeNumb=[];
            if(side===ovalside){
                Point1= Point1+Point
                Ppoint1.innerText=Point1.toString()
            }
            if(side===crossside){
                Point2= Point2+Point
                Ppoint2.innerText=Point2.toString()
            }
        }
    
        
    }  




field.addEventListener('click', event => {


    if(tour%2===0&&event.target.id==='emptyId'){
        event.target.setAttribute('id','addoval')
        
        oval.push(event.target.classList[0]);
        tour++;
        arrayChangeoval= oval.map((x)=>x);
        drawPoint++;
        winnerChecker(arrayChangeoval,arrayChangeNumboval,ovalside,Ppoint1);
        if(Point1===WinPoint1||drawPoint===9){
            drawPoint=0;
            arrayChangeoval=[];
            arrayChangeNumboval=[];
            arrayChangecross=[];
            arrayChangeNumbcross=[];
            WinPoint1++;
            
            setTimeout(function(){
                article.style.display="none"
                const interval=setInterval(function(){
                    article.style.display="grid"
                    transp=transp+0.05
                    article.style.opacity=transp;
                    if(transp>1){
                        clearInterval(interval);
                    }
                },100)
                setTimeout(function(){
                    transp=0;
                },3000)
            },200)
            setTimeout(function(){
                for(let f=0;f<9;f++){
                    child=article.children[f];
                    child.setAttribute('id','emptyId')
                    article.style.display="grid"
                    
                }
            },100)
                
            
    }

    }
    if(tour%2===1&&event.target.id==='emptyId'){
        event.target.setAttribute('id','addcross')
        cross.push(event.target.classList[0]);
        tour++;
        arrayChangecross= cross.map((x)=>x);
        drawPoint++;
        winnerChecker(arrayChangecross,arrayChangeNumbcross,crossside,Ppoint2);
        console.log(drawPoint)
        if(Point2===WinPoint2||drawPoint===9){
            drawPoint=0;
            arrayChangeoval=[];
            arrayChangeNumboval=[];
            arrayChangecross=[];
            arrayChangeNumbcross=[];
            WinPoint2++;
            setTimeout(function(){
                article.style.display="none"
                const interval=setInterval(function(){
                    article.style.display="grid"
                    transp=transp+0.05
                    article.style.opacity=transp;
                    if(transp>1){
                        clearInterval(interval);
                    }
                },100)
                setTimeout(function(){
                    transp=0;
                },3000)
            },200)
           
            
            setTimeout(function(){
                for(let f=0;f<9;f++){
                    child=article.children[f];
                    child.setAttribute('id','emptyId')
                    
                    
                }
            },100)
            
            
            
        }
        
       
    }
})
const start = document.querySelector("#startButton");
const main = document.querySelector("main")
const divstart = document.querySelector('#start-play')
const iconchoose=document.querySelector("#pokemon")
start.addEventListener('click',event =>{
    
    divstart.style.display="none"
    iconchoose.style.display="block"
   
    
})


const pokemon=document.querySelector('.pokemon')
let choosen=0;
let TopTransform =5
const footer=document.querySelector('footer')
const pokemonCounter1=document.querySelector(".pokemonCounter1")
const pokemonCounter2=document.querySelector(".pokemonCounter2")

pokemon.addEventListener('click',event =>{
    if (choosen===0){
        playerFirst=event.target;
        pokemonCounter1.setAttribute('src',event.target.src.toString())
         setTimeout(function(){
    
        article.style.display="grid"
        header.style.display="none"
        footer.style.display="flex"
    
    
},3000)
        
    }
    if(choosen===1){
        PlayerSecound=event.target;
        iconchoose.style.display="none"
        main.style.display="flex"
        header.style.display="block"
        pokemonCounter2.setAttribute('src',event.target.src.toString())
    }
    
    choosen++;
    Player1.append(playerFirst);
    Player2.append(PlayerSecound);
    TwoPoke.style.display="block"
    setInterval(function(){

        
        header.style.marginTop =TopTransform.toString()+"px";
        TopTransform=TopTransform+2;
    },10)
    setTimeout(function(){
        
        article.style.display="grid"
        header.style.display="none"
        footer.style.display="flex"
        
        
    
    
    },3000)
    
    
})
let transp=0;
const TwoPoke = document.querySelector(".Poke")
const Player1=document.querySelector("#pokemonPlayer1")
const Player2=document.querySelector("#pokemonPlayer2")
const article = document.querySelector("article");
const header = document.querySelector(".header")



