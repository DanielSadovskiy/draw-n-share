import { CurrentUserContext } from 'context/currentUserContext';
import { MainContext } from 'context/roomContext';
import { SocketContext } from 'context/socketContext';
import { UsersContext } from 'context/usersContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles.module.css'


export const Login = () => {
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom, password, setPassword } = useContext(MainContext)
    const navigate = useNavigate()
    const { setUsers } = useContext(UsersContext)
    const {setUser} = useContext(CurrentUserContext)

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
                localStorage.setItem('user', JSON.stringify(response.user))
                setUser(response.user)
                navigate('/room')
                toast("You are logged in")
            }
           
        })
    }

    return (
        <div className={styles.loginForm}>
           <form>
                 <div className={styles.formBox}>
                    <input type="text" name="name" value={name} onChange={({target: {value}}) => setName(value)} required/>
                    <label>
                        Name:
                    </label>
                </div>
                <div className={styles.formBox}>
                    <input type="text" name="room" value={room} onChange={({target: {value}}) => setRoom(value)} required/>
                    <label>
                        Room:
                    </label>
                </div>
                <div className={styles.formBox}>
                    <input type="text" name="password" value={password} onChange={({target: {value}}) => setPassword(value)}/>
                    <label>
                        Password (not required):
                    </label>
                </div>
                    <button type="submit" value="Join" onClick={handleLogin}>Submit</button>
                </form>
        </div>
    )
}