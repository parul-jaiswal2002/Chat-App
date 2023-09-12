import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MainForm = () => {

    const [data, setData] = useState({name:'', room: ''})
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        //console.log(e.target.name, e.target.value)
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const validation = () => {
        if(!data.name){
            setError("Please provide a name")
            return false
        }
        if(!data.room){
            setError("Please select a room")
            return false
        }
        setError('')
        return true;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const isvalid = validation();
        if(isvalid){
            console.log('validated')
           navigate(`/chat/${data.room}` ,{state : data})
        }
    }

  return (
     <div className='container-fluid d-flex align-items-center justify-content-center' style={{height:'100vh'}}>
        <div className="px-3 py-4 bg-white shadow border rounded raw text-dark ">
         <form onSubmit={submitHandler}>
            <div className="form-group mb-4">
               <h1 className='text-warning'>Welcome to ChatApp</h1>
            </div>
            <div className="form-group mb-4">
                <input type="text" className='bg-light form-control' name='name' placeholder='Type Your Name' onChange={handleChange}/>

            </div>

            <div className="form-group mb-4">
                <select className="form-select bg-light" name="room" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Coding">Coding</option>
                    <option value="Social-Media">Social Media</option>
                </select>
            </div>

            <button type='submit' className='btn btn-warning mb-2 w-100'>Submit</button>
         </form>

         {error && <small className='text-danger'>{error}</small>}
     </div>
     </div>
     
  )
}

export default MainForm