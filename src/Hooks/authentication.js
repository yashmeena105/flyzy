import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"


export const signUpWithEmailAndPassword = async (email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user };
    }
    catch (err) {
        console.log('error', err.message);
        if (err.message.includes("email-already")) {
            return { success: false, error: "Email Already Exists. Please Login", code: "EMAIL_EXISTS" }
        }
    }
}

export const signUpWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        return user;
    }
    catch (err) {
        console.log('error', err)
    }
}

export const signUpWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const user = await signInWithPopup(auth, provider);
        return user;
    }
    catch (err) {
        console.log('error', err)
    }
}

export const signInWithEmail = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user }
    }
    catch (err) {
        console.log('error', err.toString())
        return { success: false, error: err.message }
    }
}

export const signInWithGoogle = async () => {

}

export const signInWithFacebook = async () => {
    try {

    }
    catch (err) {
        console.log('error', err)
    }
}

export const logout = async () => {

    await auth.signOut();
}


