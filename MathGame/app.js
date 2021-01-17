const CloseFormSignUp=document.querySelector(".modal__button-close")
const Modal=document.querySelector(".modal")
const SignUp=document.querySelector(".SignUp")
const LogIn=document.querySelector(".LogIn")
const SubmitForm= document.querySelector(".modal__button-submit")
const CenterInfo=document.querySelector(".CenterInfo")
const Modalform=document.querySelector(".modal__form")
const mainPlayerPlaces=document.querySelector("main")
const List_Log_Sign=document.querySelector(".List-Log-Sign")
const LogOutButton=document.querySelector(".LogOut")
const lane=document.querySelector('.lane')
const action=document.querySelector(".action")
const recomendation=document.querySelector(".recomendation")
const action2=document.querySelector(".action2")
const recomendation2=document.querySelector(".recomendation2")
const submit=document.querySelector(".submit")
const submit2=document.querySelector(".submit2")
const score=document.querySelector(".score1")
const score2=document.querySelector(".score2")
const restart=document.querySelector(".end")
const user1=document.querySelector(".ScoreUser1")
const user2=document.querySelector(".ScoreUser2")
const body=document.querySelector("body")
let UserScore1=0
let UserScore2=0

let RestartPoint=false;
let NumbGenerator=[Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000)]
let intervalFirebaseOne
let intervalFirebaseTwo
let Moment=0;
let MomentInGame=0;
let MomentInGame2=1;
let randomNumb=[]
let SolutionNumb=[]
SignUp.addEventListener("click",e=>{
    CenterInfo.style.display="none"
    Modal.style.display="flex"
    SubmitForm.value="Stwórz konto"
})
LogIn.addEventListener("click",e=>{
    Modal.style.display="flex"
    SubmitForm.value="Zaloguj się"
    CenterInfo.style.display="none"

})

CloseFormSignUp.addEventListener('click',e=>{
    Modal.style.display="none"
    CenterInfo.style.display="flex"
})
Modalform.addEventListener('submit',e=>{ 
    Modal.style.display="none"
    e.preventDefault()
    
    if(SubmitForm.value==="Stwórz konto"){
        signUpUser()
    }
  
    else{
        LogInUser()
    }
   
})
LogOutButton.addEventListener('click',e=>{
    SignUp.style.display="inline-block"
    LogIn.style.display="inline-block"
    mainPlayerPlaces.style.display="none"
    List_Log_Sign.style.display="block"
    LogOutButton.style.display="none"
    firebase.auth().signOut()
    LogOutFromFirebase()
    dissapearGame()
    setTimeout(function(){
        location.reload()
    },200)
    
    
})
const logOutUser=()=>{
    firebase.auth().signOut() 
}
function signUpUser() {
    email=document.querySelector("#email")
    password=document.querySelector("#password")
	firebase
		.auth()
		.createUserWithEmailAndPassword(email.value, password.value)
		.then(() => {
			logOutUser();
		})
		.catch((reason) => {
			alert(reason.message);
		});
};

function LogInUser(){
   
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value,password.value)
        .then(()=>{
            mainPlayerPlaces.style.display="flex"
            LogOutButton.style.display="block"
            SignUp.style.display="none"
            LogIn.style.display="none"
            lane.style.display="block"
        })
}
function showGame(){
    action.style.display="block"
    action2.style.display="block"
    recomendation.style.display="block"
    recomendation2.style.display="block"
    submit.style.display="block"
    submit2.style.display="block"
    score.style.display="block"
    score2.style.display="block"
    user1.style.display="flex"
    user2.style.display="flex"
}
function dissapearGame(){
    action.style.display="none"
    action2.style.display="none"
    recomendation.style.display="none"
    recomendation2.style.display="none"
    submit.style.display="none"
    submit2.style.display="none"
    score.style.display="none"
    score2.style.display="none"
}
let TwoReady=false;
let OneReady=false;
function generateNumbers(){
    
    for(i=0;i<10;i++){
        firebase.firestore().collection("Numbers").doc("number"+i.toString()).set({
            numbers:NumbGenerator[i]
        })
    }
}
generateNumbers()
window.onunload = function () {
    LogOutFromFirebase()
    dissapearGame()
}
window.onbeforeunload= function (){
    LogOutFromFirebase()
    dissapearGame()
}
let timer=0
function Inactivity(){setInterval(function(){
    timer++
    if(timer===60){
        SignUp.style.display="inline-block"
    LogIn.style.display="inline-block"
    mainPlayerPlaces.style.display="none"
    List_Log_Sign.style.display="block"
    LogOutButton.style.display="none"
    firebase.auth().signOut()
    LogOutFromFirebase()
    dissapearGame()
    location.reload()
    }
},1000)}
Inactivity()
body.addEventListener("mousemove",e=>{
    timer=0;
})
buttonPlayerNumberOne=document.querySelector(".buttonPlayerOne")
buttonPlayerNumberOne.addEventListener('click',e=>{
    if(TwoReady===false){
        OneReady=true;
        functioReadyOne()
    }
})
buttonPlayerNumberTwo=document.querySelector(".buttonPlayerTwo")
buttonPlayerNumberTwo.addEventListener('click',e=>{  
    if(OneReady===false){
        TwoReady=false;
        functioReadyTwo()
    }
    })
    submit.addEventListener('click',e=>{
        if(SolutionNumb[Moment]===parseInt(score.value)){
            firebase.firestore().collection("Solution").doc("WpjQLkptOOTXMaY0xhyW").set({
                Result:true
                
              }).then(function() {
                  UserScore1++
                firebase.firestore().collection("Player1").doc("52QdZcCOBIXoeYWN2KPX").set({
                    Points:UserScore1
                    
                  })
                  setTimeout(function(){
                    firebase.firestore().collection("Solution").doc("WpjQLkptOOTXMaY0xhyW").set({
                        Result:false
                        
                      })
                  },400)
             
              });
    
        }
    })
    restart.addEventListener("click",e=>{
        if(RestartPoint===false){     
                firebase.firestore().collection("Player1").doc("JTQjGciVyaITP1MkBtEb").set({
                    Points:0              
                  })
                  firebase.firestore().collection("Player2").doc("52QdZcCOBIXoeYWN2KPX").set({
                    Points:0      
                  })
                  UserScore1=0
                UserScore2=0
            RestartPoint=true;
            firebase.firestore().collection("RestartPoints").doc("NrT353oIeQA9P1M1duLL").get().then(function(doc){
                Pointsrestart=doc.data().Point+1
                
                }).then(() => {
                    firebase.firestore().collection("RestartPoints").doc("NrT353oIeQA9P1M1duLL").set({
                        Point:Pointsrestart
                })
            })  }
    })
    submit2.addEventListener('click',e=>{
        if(SolutionNumb[Moment]===parseInt(score2.value)){
            firebase.firestore().collection("Solution").doc("WpjQLkptOOTXMaY0xhyW").set({
                Result:true
                
              }).then(function() {
            }).then(function() {
                UserScore2++
              firebase.firestore().collection("Player2").doc("JTQjGciVyaITP1MkBtEb").set({
                  Points:UserScore2
                })
                setTimeout(function(){
                    firebase.firestore().collection("Solution").doc("WpjQLkptOOTXMaY0xhyW").set({
                        Result:false
                        
                      })
                  },400)
              });
        }
    })
 function   LogOutFromFirebase(){
     if(OneReady===true){
        firebase.firestore().collection("buttonOne").doc("SYgf9TX9P139xVWMeoyu").set({
            ready:false
        })
        firebase.firestore().collection("buttonOne").doc("7b3elcchZeK7hWo3Q2UW").set({
            User:"Zajmij Miejsce"
        })
        OneReady=false
     }
     if(TwoReady===true){
        
            firebase.firestore().collection("buttonTwo").doc("l07Kdsa5jGr5RZtGgdST").set({
                ready:false
            })
            firebase.firestore().collection("buttonTwo").doc("SrH9QOTxol9TvQegvCoj").set({
                User:"Zajmij miejsce"
            })
            TwoReady=false
     }
 }

function functioReadyTwo(){
    TwoReady=true
    firebase.firestore().collection("buttonTwo").doc("l07Kdsa5jGr5RZtGgdST").set({
        ready:true
    })
    firebase.firestore().collection("buttonTwo").doc("SrH9QOTxol9TvQegvCoj").set({
        User:firebase.auth().currentUser.email
    })
}
function functioReadyOne(){
    OneReady=true
    firebase.firestore().collection("buttonOne").doc("SYgf9TX9P139xVWMeoyu").set({
        ready:true
    })
    firebase.firestore().collection("buttonOne").doc("7b3elcchZeK7hWo3Q2UW").set({
        User:firebase.auth().currentUser.email
    })
}
function addNumb(){
 
    for(i=0;i<10;i++){
        firebase.firestore().collection("Numbers").doc("number"+i.toString()).get().then(function(doc){
            randomNumb.push(doc.data().numbers)
        })  
        }
        setTimeout(function(){
            for(i=0;i<10;i=i+2){
                SolutionNumb.push(parseInt(randomNumb[i])+parseInt(randomNumb[i+1]))
            }     
        },500)
}

//potem sie zajmij
function drawNumbAgain(){
NumbGenerator=[Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000)] 
generateNumbers()
Moment=0
MomentInGame=0
MomentInGame2=1
restart.style.display="block"
}
function downloadFromFirebase(){
    setTimeout(function(){
        for(i=0;i<10;i++){
            firebase.firestore().collection("Numbers").doc("number"+i.toString()).get().then(function(doc){
                randomNumb.push(doc.data().numbers)
            })  
        }
        setTimeout(function(){
            for(i=0;i<10;i=i+2){
                SolutionNumb.push(parseInt(randomNumb[i])+parseInt(randomNumb[i+1]))       
            }
        },1000)
    },1000)   
}

let GameStartRandom=false
gameInterval=setInterval(function(){
    if(buttonPlayerNumberOne.innerText!="Zajmij miejsce"&&buttonPlayerNumberTwo.innerText!="Zajmij miejsce"){
       addNumb()
       showGame()
       clearInterval(gameInterval)
       console.log('yes')
    }
    
},15)
Game=setInterval(function(){
    action.innerText=randomNumb[MomentInGame]+"+"+randomNumb[MomentInGame2]+"="
    action2.innerText=randomNumb[MomentInGame]+"+"+randomNumb[MomentInGame2]+"="
    
    if(Moment===5){
        randomNumb=[]
        SolutionNumb=[]
        RestartPoint=false
        drawNumbAgain()
        downloadFromFirebase()
        dissapearGame()
        firebase.firestore().collection("Player1").doc("JTQjGciVyaITP1MkBtEb").set({
            Points:0
            
          })
          firebase.firestore().collection("Player2").doc("52QdZcCOBIXoeYWN2KPX").set({
            Points:0
            
          })
    }
       
    user1.innerText=UserScore1.toString()
    user2.innerText=UserScore2.toString()
},15)
firebase.firestore().collection("Player1").doc("52QdZcCOBIXoeYWN2KPX"
).onSnapshot(function(doc) {
    UserScore1=doc.data().Points
});
firebase.firestore().collection("Player2").doc("JTQjGciVyaITP1MkBtEb"
).onSnapshot(function(doc) {
    UserScore2=doc.data().Points
});
firebase.firestore().collection("buttonOne").doc("SYgf9TX9P139xVWMeoyu")
.onSnapshot(function(doc) {
    if(doc.data().ready===true){
     firebase.firestore().collection("buttonOne").doc("7b3elcchZeK7hWo3Q2UW").onSnapshot(function(doc) {
            buttonPlayerNumberOne.innerText=doc.data().User
        });
        }
    });
firebase.firestore().collection("buttonTwo").doc("l07Kdsa5jGr5RZtGgdST")
.onSnapshot(function(doc) {
    if(doc.data().ready===true){
     firebase.firestore().collection("buttonTwo").doc("SrH9QOTxol9TvQegvCoj").onSnapshot(function(doc) {
            buttonPlayerNumberTwo.innerText=doc.data().User
        });
    }
});
firebase.firestore().collection("Solution").doc("WpjQLkptOOTXMaY0xhyW"
).onSnapshot(function(doc) {
    if(doc.data().Result===true){
        console.log("yes")
        Moment++;
        MomentInGame=MomentInGame+2
        MomentInGame2=MomentInGame2+2
        score.value=""
        score2.value=""
    }
});



firebase.firestore().collection("RestartPoints").doc("NrT353oIeQA9P1M1duLL").onSnapshot(function(doc) {
    if(doc.data().Point===2){
        showGame()
        restart.style.display="none"
        Pointsrestart=0
        firebase.firestore().collection("RestartPoints").doc("NrT353oIeQA9P1M1duLL").set({
            Point:0
    })
    }
});

firebase.firestore().collection("Player1").doc("52QdZcCOBIXoeYWN2KPX").set({
    Points:0   
  })
  firebase.firestore().collection("Player2").doc("JTQjGciVyaITP1MkBtEb").set({
    Points:0 
  })