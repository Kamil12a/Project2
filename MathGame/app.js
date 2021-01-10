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
NumbGenerator=[Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000),Math.floor(Math.random() *1000)]
let intervalFirebaseOne
let intervalFirebaseTwo
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
    firebase.auth().signOut()
    ReturnFirebase()
    
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
function firebaseOneReady() {intervalFirebaseOne=setInterval(function(){ firebase.firestore().collection('buttonOne').doc("SYgf9TX9P139xVWMeoyu").set({
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


function firebaseTwoReady() {intervalFirebaseTwo=setInterval(function(){
    firebase.firestore().collection('buttonTwo').doc("l07Kdsa5jGr5RZtGgdST").set({
        ready:true
    }).then(function(){
        generateNumbers()
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
firebase.firestore().collection("buttonOne").doc("SYgf9TX9P139xVWMeoyu")
.onSnapshot(function(doc) {
    if( doc.data().ready){
    firebase.firestore().collection('buttonOne').doc("7b3elcchZeK7hWo3Q2UW").onSnapshot(function(doc){
        buttonPlayerNumberOne.innerText=doc.data().User
    }) 
    }
});
//

function ReturnFirebase(){
    buttonPlayerNumberOne.innerText="Kliknij aby wejść na pozycję"
    buttonPlayerNumberTwo.innerText="Kliknij aby wejść na pozycję"
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
function generateNumbers(){
    for(i=0;i<10;i++){
        firebase.firestore().collection("Numbers").doc("number"+i.toString()).set({
            numbers:NumbGenerator[i]
        })
    }
   
}
