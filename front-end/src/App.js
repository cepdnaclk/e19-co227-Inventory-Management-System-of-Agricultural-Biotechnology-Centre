
import './App.css';
import Home from './pages/home';
import StudentHome from './pages/studentHome';
import AdminHome from './pages/adminHome';
import SignUp from './pages/signup/userSignup';
import Login from './pages/signin/login';
import AdminRegForm from './pages/profileDetailForms/adminProfDetail';
import StudentRegForm from './pages/profileDetailForms/studentProfDetails';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import StudentProfile from './pages/studentProfile';
import AdminProfile from './pages/adminProfile';
import StudentProfileSetings from './pages/studentProfileSetings';
import AddNewAdmin from './pages/addNewAdmin';
import ChemStore from './pages/chemicalStore';
import AddChemical from './pages/addNewChemical';
import FAOLab from './pages/FaoLab';
import Molecular from './pages/molecularLab';

 

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/studentHome" element={<StudentHome />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminReg" element={<AdminRegForm />} />
      <Route path="/studentReg" element={<StudentRegForm />} />
      <Route path="/studentProfile" element={<StudentProfile />} />
      <Route path="/adminProfile" element={<AdminProfile />} />
      <Route path="/studentProfileSetings" element={<StudentProfileSetings />} />
      <Route path="/addNewAdmin" element={<AddNewAdmin />} />
      <Route path="/store" element={<ChemStore />} />
      <Route path="/store/addChemical" element={<AddChemical />} />
      <Route path="/labs/faolaboratory" element={<FAOLab />} />
      <Route path="/labs/molecularbiologylaboratory" element={<Molecular />} />



      {/* <Route path="/Student" element={<Student />} />
      <Route path="/Login" element={<Login />} /> */}
    </Routes> 
    </Router>
    </div>
  );
}

export default App;
