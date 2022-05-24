import { MainContext } from 'context/roomContext';
import { SocketContext } from 'context/socketContext';
import { UsersContext } from 'context/usersContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'


export const Login = () => {
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom, password, setPassword } = useContext(MainContext)
    const navigate = useNavigate()
    const { setUsers } = useContext(UsersContext)

    useEffect(() => {
        socket.on("users", (users:any) => {
           setUsers(users)
        })
    })

    const handleLogin = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        socket.emit('login', { name, room, password }, (response: any) => {
            if (response.error) {
                console.log(response.error)
                alert(response.error)
            } else {
                navigate('/room')
                localStorage.setItem('user', JSON.stringify(response.user))
            }
           
        })
    }

    return (
        <div>
           <form>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={({target: {value}}) => setName(value)} required/>
                </label>
                <label>
                    Room:
                    <input type="text" name="room" value={room} onChange={({target: {value}}) => setRoom(value)} required/>
                </label>
                <label>
                    Password (not required):
                    <input type="password" name="password" value={password} onChange={({target: {value}}) => setPassword(value)}/>
                </label>
                <input type="submit" value="Join" onClick={handleLogin}/>
                </form>
        </div>
    )
}