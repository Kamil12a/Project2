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
    ReturnFirebase()
    
    
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
let TwoReady=false;
let OneReady=false;

buttonPlayerNumberOne=document.querySelector(".buttonPlayerOne")
buttonPlayerNumberOne.addEventListener('click',e=>{
    if(TwoReady===false){
        OneReady=true;
       firebaseOneReady()
    }
   
     

})
buttonPlayerNumberTwo=document.querySelector(".buttonPlayerTwo")
buttonPlayerNumberTwo.addEventListener('click',e=>{  
    if(OneReady===false){
        TwoReady=false;
        firebaseTwoReady()
    }
    
    })












//funkcja buttonaone
function firebaseOneReady() {intervalFirebaseOne=SetInterval(function(){ firebase.firestore().collection('buttonOne').doc("SYgf9TX9P139xVWMeoyu").set({
    ready:true
}).then(function(){
   
    firebase.firestore().collection('buttonOne').doc("7b3elcchZeK7hWo3Q2UW").set({
        User:firebase.auth().currentUser.uid
    }).then(function(){
        
                    console.log("Document successfully written!");
                }).catch(function(){
                
                    console.log("Document unsuccessfully written!");
                })
}).catch(function(){

 console.log("Document unsuccessfully written!");
},15)
})}


function firebaseTwoReady() {intervalFirebaseTwo=SetInterval(function(){
    firebase.firestore().collection('buttonTwo').doc("l07Kdsa5jGr5RZtGgdST").set({
        ready:true
    }).then(function(){
    
        firebase.firestore().collection('buttonTwo').doc("SrH9QOTxol9TvQegvCoj").set({
            User:firebase.auth().currentUser.uid
        }).then(function(){
            
                        console.log("Document successfully written!");
                    }).catch(function(){
                    
                        console.log("Document unsuccessfully written!");
                    })
    }).catch(function(){
    
     console.log("Document unsuccessfully written!");
    })
},15)}




//pobieranie buttontwo
firebase.firestore().collection("buttonTwo").doc("l07Kdsa5jGr5RZtGgdST")
    .onSnapshot(function(doc) {
       if( doc.data().ready){
        firebase.firestore().collection('buttonTwo').doc("SrH9QOTxol9TvQegvCoj").onSnapshot(function(doc){
            buttonPlayerNumberTwo.innerText=doc.data().User
        }) 
       }
    });
//
let intervalFirebaseOne
let intervalFirebaseTwo
function ReturnFirebase(){
    clearInterval(intervalFirebaseOne)
    clearInterval(intervalFirebaseTwo)

firebase.firestore().collection('buttonTwo').doc("l07Kdsa5jGr5RZtGgdST").set({
    ready:false
}).then(function(){

    firebase.firestore().collection('buttonTwo').doc("SrH9QOTxol9TvQegvCoj").set({
        User:""
    }).then(function(){
        
                    console.log("Document successfully written!");
                }).catch(function(){
                
                    console.log("Document unsuccessfully written!");
                })
}).catch(function(){

 console.log("Document unsuccessfully written!");
})

firebase.firestore().collection('buttonOne').doc("SYgf9TX9P139xVWMeoyu").set({
    ready:false
}).then(function(){
   
    firebase.firestore().collection('buttonOne').doc("7b3elcchZeK7hWo3Q2UW").set({
        User:" "
    }).then(function(){
        
                    console.log("Document successfully written!");
                }).catch(function(){
                
                    console.log("Document unsuccessfully written!");
                })
}).catch(function(){

 console.log("Document unsuccessfully written!");
})}
//

ReturnFirebase()