import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Task from './Task.js'

const Tasks = () => {

  const [tasks,setTasks]= useState([]);
  // const [tasks,settasks]= useState();

  const sendRequest = async()=>{
    const res = await axios.get("http://localhost:5000/api/task").catch(err=>console.log(err));
    const data = await res.data;
    console.log("data is",data)
    return data;
  }
  useEffect(()=>{

    sendRequest().then((data)=>setTasks(data.user))

  },[])

  console.log(tasks);
  
  return (
    <div>

      {tasks && tasks.map((task,index)=>(          
        <Task 
        key={index}
        id={task._id}
        title={task.title} 
        description={task.description}
        userName={task.user.name}/>
      ))}

    </div>
  )
}

export default Tasks