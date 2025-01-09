import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Users from "./pages/Users";

function App() {
  return (
    <>
        <div className="">
            <Router>
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/form' element={<Form />}></Route>
                    <Route path='/users' element={<Users />}></Route>
                </Routes>
            </Router>
        </div>
    </>
  );
}

export default App;
