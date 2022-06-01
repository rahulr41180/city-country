
import './App.css';

import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { AddCountry } from "./pages/AddCountry";
import { UpdateCountry } from "./Tasks/Update";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        }></Route>
        <Route path="/addCountry" element={
          <>
            <Navbar />
            
            <AddCountry />
          </>
        }></Route>
        <Route path="/update/:id" element={
          <>
            <Navbar />
            
            <UpdateCountry />
          </>
        }></Route>
      </Routes>
    </>
  );
}

export default App;
