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
let ready=false
// 

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
    if(ready===false){
        ready=true
        firebase.firestore().collection('buttonOne').doc("SYgf9TX9P139xVWMeoyu").set({
            ready:true
     
         }).then(function(){
             
                 console.log("Document successfully written!");
             }).catch(function(){
             
                 console.log("Document unsuccessfully written!");
             })
        buttonPlayerNumberOne.innerText=`Zajęte przez Ciebie`
    }
     

}


)
buttonPlayerNumberTwo=document.querySelector(".buttonPlayerTwo")
buttonPlayerNumberTwo.addEventListener('click',e=>{  

    if(ready===false){
        ready=true
        firebase.firestore().collection('buttonTwo').doc("l07Kdsa5jGr5RZtGgdST").set({
            ready:true
     
         }).then(function(){
             
                 console.log("Document successfully written!");
             }).catch(function(){
             
                 console.log("Document unsuccessfully written!");
             })
        buttonPlayerNumberTwo.innerText=`Zajęte przez Ciebie`
    }
})



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
// let Numb=[]
// for(i=0;i<11;i++){
//     Numb.push("number"+i.toString())
// }
// //*dodawanie losowych liczb dla obu gracz
// Numbers.forEach(function(item,index) {
//     firebase.firestore().collection('Numbers').doc(Numb[index]).set({
//         numbers:item

//     }).then(function(){
        
//             console.log("Document successfully written!");
//         }).catch(function(){
        
//             console.log("Document unsuccessfully written!");
//         })
// });

// function pushrandom(){firebase.firestore().collection("Numbers").get().then((snapshot)=>
// {
//     snapshot.docs.forEach(doc=>{
//         randomNumbers.push(parseInt(Object.values(doc.data())))
       
//     })
// })}



// firebase.firestore().collection('Players').doc("eDB53s61TsXkF3wiT92o").set({
//         Player2:ready
 
//      }).then(function(){
         
//              console.log("Document successfully written!");
//          }).catch(function(){
         
//              console.log("Document unsuccessfully written!");
//          })



firebase.firestore().collection('buttonTwo').doc("l07Kdsa5jGr5RZtGgdST").set({
    ready:false

 }).then(function(){
     
         console.log("Document successfully written!");
     }).catch(function(){
     
         console.log("Document unsuccessfully written!");
     })
firebase.firestore().collection('buttonOne').doc("SYgf9TX9P139xVWMeoyu").set({
ready:false

}).then(function(){
    
        console.log("Document successfully written!");
    }).catch(function(){
    
        console.log("Document unsuccessfully written!");
    })





firebase.firestore().collection("buttonTwo").doc("l07Kdsa5jGr5RZtGgdST")
.onSnapshot(function(doc) {
    if( doc.data().ready){
        buttonPlayerNumberTwo.innerText=`Zajęte`
    }
});

