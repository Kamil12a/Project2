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
let PlayerOneReady=false;
let  PlayerTwoReady=false
const lane=document.querySelector('.lane')
const action=document.querySelector(".action")
const recomendation=document.querySelector(".recomendation")
const action2=document.querySelector(".action2")
const recomendation2=document.querySelector(".recomendation2")
const score1=document.querySelector(".score1")
const score2=document.querySelector(".score2")
const submit=document.querySelector(".submit")
const submit2=document.querySelector(".submit2")
let Numbers=[Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 100),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000)]
let randomNumbers=[]
let MomentInGame=2
let MomentInGame2=3
let MathResult=[]
let ResultMoment=0
function showScore(){
    action.style.display="block"
    recomendation.style.display="block"
    score1.style.display="block"
    score2.style.display="block"
    recomendation2.style.display="block"
    action2.style.display="block"
    buttonPlayerNumberOne.style.display="none"
    buttonPlayerNumberTwo.style.display="none"
    submit.style.display="block"
    submit2.style.display="block" 
    action.innerText=randomNumbers[0].toString()+"+"+randomNumbers[1].toString()
    action2.innerText=randomNumbers[0].toString()+"+"+randomNumbers[1].toString()
}

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
    firebse.auth().signOut()
})
const logOutUser=()=>{
    firebse.auth().signOut()
    
    
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
        .catch((reason)=>{
            alert(reason.message)
            logOutUser()
        })
}
buttonPlayerNumberOne=document.querySelector(".buttonPlayerOne")
buttonPlayerNumberOne.addEventListener('click',e=>{
    buttonPlayerNumberOne.innerText=`Zajęte przez ${firebase.auth().currentUser.uid}`
    PlayerOneReady=true
})
buttonPlayerNumberTwo=document.querySelector(".buttonPlayerTwo")
buttonPlayerNumberTwo.addEventListener('click',e=>{
    buttonPlayerNumberTwo.innerText=`Zajęte przez ${firebase.auth().currentUser.uid}`
    PlayerTwoReady=true
})


setInterval(function(){
    if(PlayerOneReady===true&&PlayerTwoReady===true){
        showScore()
        PlayerOneReady=false
        getRandom()
        MathResult.push(randomNumbers[0]+randomNumbers[1],randomNumbers[2]+randomNumbers[3],randomNumbers[4]+randomNumbers[5],randomNumbers[6]+randomNumbers[7],randomNumbers[8]+randomNumbers[9])
    }
},15)
submit.addEventListener('click',e=>{
    if(firebase.auth().currentUser.uid.toString()===buttonPlayerNumberOne.innerText.slice(13)){
        if(score1.value===MathResult[ResultMoment].toString()){
            action.innerText=randomNumbers[MomentInGame].toString()+"+"+randomNumbers[MomentInGame2].toString()
            action2.innerText=randomNumbers[MomentInGame].toString()+"+"+randomNumbers[MomentInGame2].toString()
            MomentInGame=MomentInGame+2
            MomentInGame2=MomentInGame2+2
            ResultMoment++
        }
       
    }
    
  
    
})
submit2.addEventListener('click',e=>{
    if(firebase.auth().currentUser.uid.toString()===buttonPlayerNumberTwo.innerText.slice(13)){
        if(score2.value===MathResult[ResultMoment.toString()]){
            action.innerText=randomNumbers[MomentInGame].toString()+"+"+randomNumbers[MomentInGame2].toString()
            action2.innerText=randomNumbers[MomentInGame].toString()+"+"+randomNumbers[MomentInGame2].toString()
            MomentInGame=MomentInGame+2
            MomentInGame2=MomentInGame2+2
            ResultMoment++
        }
       
    }
})
let Numb=[]
for(i=0;i<11;i++){
    Numb.push("number"+i.toString())
}
//*dodawanie losowych liczb dla obu gracz
Numbers.forEach(function(item,index) {
    firebase.firestore().collection('Numbers').doc(Numb[index]).set({
        numbers:item

    }).then(function(){
        
            console.log("Document successfully written!");
        }).catch(function(){
        
            console.log("Document unsuccessfully written!");
        })
});

function getRandom(){firebase.firestore().collection("Numbers").get().then((snapshot)=>
{
    snapshot.docs.forEach(doc=>{
        randomNumbers.push(parseInt(Object.values(doc.data())))
       
    })
})}