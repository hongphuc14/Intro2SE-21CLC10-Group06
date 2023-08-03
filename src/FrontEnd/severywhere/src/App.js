import './App.css';
import Navbar from './Components/Header/HeaderGuest';
import Signup from './pages/Signup/Signup';
import FooterA from './Components/Footer/Footer';
function App() {
  return (
    <div>
      <Navbar/>
      <Signup />
      <FooterA />
    </div>
  );
}

export default App;
