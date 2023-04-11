import Sidebar from "Components/Sidebar.jsx";
import { auth } from "Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Setup from "Pages/Setup/Setup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LogIn } from "redux/actions/LoginAction";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import "./styles.scss"
const Routes = () => {

    // const dispatch = useDispatch()
    const { authuser } = useSelector((state) => state.auth)

    // onAuthStateChanged(auth, (user) => {

    //     if (user) {
    //         console.log("user state changed", user)
    //         dispatch(LogIn({ ...authuser, user }));
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/firebase.User
    //         const uid = user?.uid;
    //         localStorage.setItem("uid", uid)
    //         console.log({ ...authuser, user });
    //         // ...
    //     } else {
    //         // User is signed out
    //         // ...
    //     }
    // });


    let claims = authuser?.customClaims;

    return (
        <>
            <BrowserRouter>
                {authuser?.uid ? (claims?.role == null || claims?.companyId == null) ? <Setup /> : <div className="god">  <Sidebar /><PrivateRoutes /></div> : <><PublicRoutes /></>}
                {/* {authuser?._tokenResponse?.idToken ? <div className="god">  <Sidebar /><PrivateRoutes /></div> : <><PublicRoutes /></>} */}
            </BrowserRouter>
        </>
    )
}

export default Routes;