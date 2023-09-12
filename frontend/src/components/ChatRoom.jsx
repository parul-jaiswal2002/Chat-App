import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment'
import {io} from 'socket.io-client'
import './ChatRoom.css'

const ChatRoom = () => {

    const [data, setData] = useState({})
    const [msg, setMsg] = useState('')
    const [msgArr, setMsgArr] = useState([])
    const location = useLocation();
    const msgBoxRef = useRef()

    ///state for storing socket
    const [socket, setSocket] = useState('')


    useEffect(() => {
        const socket = io("http://localhost:8000");
        //only here we can access this socket then for onSubmit function to access this socket we well create a state in which we will store that socket and access anywhere in this component
        setSocket(socket)

        socket.on("connect", () => {
            // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });

        // socket.emit("joinRoom", data.room)
        //here in the above line we are sending data.room where we are setting setData after that line that will give the room as null
        //so will use location.state.room instead of data.room
        socket.emit("joinRoom", location.state.room)


        // socket.on("getLatestMessage", newMessage => {
        //     // console.log(newMessage)
        //     setMsgArr([...msgArr, newMessage])
        // })

        //we can't use this above function in this same useEffect function
    }, [])

    useEffect(() => {
        if(socket){
            socket.on("getLatestMessage", newMessage => {
                // console.log(newMessage)
                setMsgArr([...msgArr, newMessage])
                msgBoxRef.current.scrollIntoView({behavior : 'smooth'})
                setMsg('')
            })
        }

    },[socket, msgArr])



    useEffect(() => {
       setData(location.state)
    },[location])

    const handleChange = (e) => {
       setMsg(e.target.value)
    }

    const onSubmit = ()  => {
        if(msg){
            const newMsg = {time : new Date(), msg, name:data.name}
            // setMsgArr([...msgArr, newMsg])
            socket.emit('newMessage', {newMsg, room:data.room})

        }
        // setMsg('')
    }

    const handleEnter = e => e.keyCode == 13 ? onSubmit() : ''

  return (
    <div className="container py-4  shadow bg-white text-dark border rounded wholeScreen">
        <div className='heading mb-4 px-3 text-center text-capitalize'>
            <h1 className='text-warning'>{data?.room} Chat Room</h1>
        </div>
        <div className=' p-3 mb-4 bg-light border rounded chat-box'>

            {msgArr.map((msg) => {
                return  data.name === msg.name
                ?
                <div key={msg.time} className='row justify-content-end pl-5'>
                    <div className='d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto'>
                        <div>
                            <strong className='m-1'>{msg.name}</strong>
                            <small className='text-muted'><Moment fromNow>{msg.time}</Moment></small>
                        </div>
                        <h4 className='m-1'>{msg.msg}</h4>
                    </div>
                </div>

                : 

                <div key={msg.time} className='row justify-content-start'>
                    <div className='d-flex flex-column align-items-end m-2 shadow p-2 border rounded w-auto'>
                        <div>
                            <strong className='m-1'>{msg.name}</strong>
                            <small className='text-muted'><Moment fromNow>{msg.time}</Moment></small>
                        </div>
                        <h4 className='m-1'>{msg.msg}</h4>
                    </div>
                </div>
            
            })}
            

          {/* for scrolling */}
          <div ref={msgBoxRef}></div>
            
        </div>

        <div className='form-group d-flex'>
            <input type="text" onKeyDown={handleEnter} onChange={handleChange} value={msg} className='form-control bg-light' name='message' placeholder='Type your message'/>
            <button type='button' className='btn btn-success mx-2' onClick={onSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default ChatRoom