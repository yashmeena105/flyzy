import { Route, Routes } from 'react-router-dom';
import Dashboard from "Pages/Dashboard";
import Payments from "Pages/Payments";
import MasterData from 'Pages/Master';
import StayDetails from 'Pages/Master/StayDetails';
import TransportDetails from 'Pages/Master/TransportDetails';
import ItineraryDetails from 'Pages/Master/ItineraryDetails';
import LeadDetails from 'Pages/LeadDetails';
import ImageGallery from 'Pages/Master/ImageGallery';
import AllLeads from 'Pages/AllLeads';
import ActivityDetails from 'Pages/Master/ActivityDetails';
import VisaDetails from 'Pages/Master/VisaDetails';
import Marketplace from 'Pages/Marketplace/MarketplaceHome'
import ViewItineraryPublic from 'Pages/LeadDetails/LeadItineraries/ViewItineraryPublic';
import Queries from 'Pages/Queries';
import Profile from 'Pages/Settings/Profile';
import Company from 'Pages/Settings/Company';
import Customers from 'Pages/Settings/Customers';
import People from 'Pages/Settings/People';
import Setup from 'Pages/Setup/Setup';
const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/leads" element={<AllLeads />} />
        <Route path="/queries/" element={<Queries />} />
        <Route path="/queries/:query_id" element={<Queries />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/media" element={<ImageGallery />} />
        <Route path="/master" element={<MasterData />} />
        <Route path="/settings/me" element={<Profile />} />
        <Route path="/settings/company" element={<Company />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/people" element={<People />} />
        <Route path="*" element={<Dashboard />} />

        {/* Master Routes */}
        <Route path="/stay/:url_id" element={<StayDetails />} />
        <Route path="/transport/:url_id" element={<TransportDetails />} />
        <Route path="/activity/:url_id" element={<ActivityDetails />} />
        <Route path="/visa/:url_id" element={<VisaDetails />} />
        <Route path="/itinerary/:itinerary_id" element={<ItineraryDetails />} />
        <Route path="/leads/:id/:key" element={<LeadDetails />} />
        <Route path="/proposal/:_id" element={<ViewItineraryPublic />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
