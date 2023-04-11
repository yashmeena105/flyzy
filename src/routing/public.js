import LandingPage from 'Pages/LandingPage/LandingPage';
import AppChatsPublic from 'Pages/LeadDetails/Chats/AppChatsPublic';
import ViewItineraryPublic from 'Pages/LeadDetails/LeadItineraries/ViewItineraryPublic';
import Login from 'Pages/Login/Login';
import Register from 'Pages/Register/Register';
import { Route, Routes } from 'react-router-dom';


const PublicRoutes = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<LandingPage />} />
            <Route path="/proposal/:_id" element={<ViewItineraryPublic />} />
            <Route path="/appchatroom/:room_id" element={<AppChatsPublic />} />
        </Routes>
    )
}

export default PublicRoutes;