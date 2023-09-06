import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from './components/Routes/ProtectedRoute.js';
import PublicRoute from './components/Routes/PublicRoute.js';
import Donar from './pages/Dashboard/Donar.js';
import Hospitals from './pages/Dashboard/Hospitals.js';
import OrganistaionPage from './pages/Dashboard/OrganistaionPage.js';
import Consumer from './pages/Dashboard/Consumer.js';
import Analytics from './pages/Dashboard/Analytics.js';
import AdminHome from './pages/Admin/AdminHome.js';
import DonarList from './pages/Admin/DonarList.js';
import HospitalList from './pages/Admin/HospitalList.js';
import OrgList from './pages/Admin/OrgList.js';
function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>

        <Route path = '/' element = {
          <ProtectedRoute>
             <HomePage/>
          </ProtectedRoute>
       
        }/>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />

                <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />
         <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/orgnaisation"
          element={
            <ProtectedRoute>
              <OrganistaionPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer/>
            </ProtectedRoute>
          }
        />
        



        </Routes>

  
     
    </div>
  );
}

export default App;
