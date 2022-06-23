import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
 import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
const App=()=> {
  return (
    
      <Router>
        <div className="container">
      <Navbar />
      <br />
      <Routes> 
      <Route path="/" element={<ExerciseList/>}  exact />
      <Route path="/edit/:id" element={<EditExercise/>} />
      <Route path="/create" element={<CreateExercise/>} />
      <Route path="/user" element={<CreateUser/>} />
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
