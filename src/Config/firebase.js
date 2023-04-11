import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import DEV_CONFIG from './dev.stage';
import PROD_CONFIG from './prod.stage';
import LOCAL_CONFIG from './local.stage';
import { getStage } from "utils/misc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogIn } from "redux/actions/LoginAction";


const stage = getStage();

const CONFIG = stage === 'prod' ? PROD_CONFIG : stage == 'dev' ? DEV_CONFIG : LOCAL_CONFIG;

const app = initializeApp(CONFIG.firebaseConfig);

const ga = getAuth(app);
const firestore = getFirestore(app);

onAuthStateChanged(ga, async (user) => {

    if (user) {
        <dummy />
        // ...
    } else {
        // User is signed out
        // ...
    }
});
export const auth = ga;
export const db = firestore;

const messaging = getMessaging(app);

export const getNotifToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: CONFIG.fcmKey }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            localStorage.setItem("notificationToken", currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server

            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });