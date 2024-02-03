import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    onAuthStateChanged, 
} from 'firebase/auth'
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyD02pu__kLmnZHiUerAAffL_VU8-OTTaf0",
    authDomain: "bookify-6397d.firebaseapp.com",
    projectId: "bookify-6397d",
    storageBucket: "bookify-6397d.appspot.com",
    messagingSenderId: "36303469296",
    appId: "1:36303469296:web:3e5c37cf417b32802e6035"
  };

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

export const useFirebase = ()=> useContext(FirebaseContext);

export const FirebaseProvider = (props)=>{
    const [user,setUser]= useState(null)
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,user =>{
            if(user){
                setUser(user);
            }else{
                setUser(null)
            }
        })
    },[])
    const signUpUserWithEmailAndPassword =(email,password)=>
        createUserWithEmailAndPassword(firebaseAuth,email,password)

    const signInUserWithEmailAndPassword =(email,password)=>
        signInWithEmailAndPassword(firebaseAuth,email,password)

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = ()=> signInWithPopup(firebaseAuth,googleProvider)
    
    const isLoggedIn = user ? true:false;
    return (
        <FirebaseContext.Provider value={{
            signUpUserWithEmailAndPassword, 
            signInUserWithEmailAndPassword,
            signInWithGoogle,isLoggedIn,
            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}