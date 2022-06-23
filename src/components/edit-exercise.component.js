import { useState,useEffect, useRef } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom"; 

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

const EditExercise =()=>{

  const{ id }  = useParams();
  

    const[username, setUserName] = useState();
    const[description, setDescription] = useState('');
    const[duration, setDuration] = useState(0);
    const[date, setDate] = useState( new Date());
    const[users,setUsers]= useState([]);
    // const[i,setI]= useState(0);

    useEffect(()=>{

        axios.get('http://localhost:5000/exercises/'+ id)
      .then(response => {
       
          setUserName(response.data.username);
          setDescription(response.data.description);
          setDuration(response.data.duration);
          setDate(new Date(response.data.date));
         
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:5000/users/')
      .then(response =>{
        if(response.data.length >0){
          response.data.map(user => {
           return  setUsers((arr)=>[...arr,user.username]);       
          })
        //   setUserName(response.data[0].username);
        }
      })
    
        
    },[id]);


    const userInput = useRef(null);

    const onChangeUsername=(e)=>{
        setUserName(e.target.value);
    };

    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    };
    const onChangeDuration=(e)=>{
        setDuration(e.target.value);
    };
    const onChangeDate=(date)=>{
        setDate(date);
    };

    const onSubmit=(e)=>{
        e.preventDefault();
        const exercise={
            username,
            description,
            duration,
            date
        }

        console.log(exercise);
        axios.post("http://localhost:5000/exercises/update/"+ id,exercise)
        .then((res) => console.log(res.data));
         window.location='/';
    };


    return(
        <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select    ref={userInput}
                required
                className="form-control"
                value={username}
                onChange={onChangeUsername}>
                {
                 users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={description}
                onChange={onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={duration}
                onChange={onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={date}
                onChange={onChangeDate}
              />
            </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
    
}
export default  EditExercise;