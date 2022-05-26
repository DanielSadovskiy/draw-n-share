import { Board } from 'components/Board/Board'
import { CurrentUserContext } from 'context/currentUserContext'
import { SocketContext } from 'context/socketContext'
import { ToolContext } from 'context/toolContext'
import { UsersContext } from 'context/usersContext'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from  './styles.module.css'

export const Container = () => {

    const { users } = useContext(UsersContext)
    const { color, setColor, width, setWidth} = useContext(ToolContext)
    const navigate = useNavigate()
    const myUser = JSON.parse(localStorage.getItem('user')!)
    const socket = useContext(SocketContext)
    const {setUser} = useContext(CurrentUserContext)
    const [img, setImg] = useState<string>();

    const changeTool = (tool: string ) => {


    }

    const saveImage = () =>{
        const canvas = document.querySelector('#board') as HTMLCanvasElement
        const imageFile = document.getElementById("img-file");
        imageFile?.setAttribute('download', 'image.png');
        imageFile?.setAttribute('href', canvas.toDataURL());
    }

    const toggleDrawPossibility = (name: string) => {
        socket.emit('toggle', { name }, (response: any) => {
            if (response.error) {
                console.log(response.error)
                alert(response.error)
            }
           
        })
    }

    useEffect(() => {
        socket.on("toggle", (response:any) => {
            localStorage.setItem('user', JSON.stringify(response.user))
        })
        socket.on("notification", (response:any) => {
            toast(response.description)
        })
    })

    const onImageChange = (e:any) => {
        setImg(URL.createObjectURL(e.target.files[0]));
        const canvas = document.querySelector('#board') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const img = new Image()
        // @ts-ignore
        img.src = URL.createObjectURL(e.target.files[0])
        img.onload = () => {
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      };

    const Logout = () => {
        socket.emit('logout', (response: any) => {
            console.log(response)
            if (response.error) {
                console.log(response.error)
                alert(response.error)
            } 
        })
        toast("You are logged out")
        localStorage.removeItem('user')
        setUser(null)
    }




    return (
        <div className={styles.container}>
            <div className={styles.boardContainer}>
                <div className={styles.board}>
                    <Board/>
                </div>
                <div className={styles.toolBar}>
                    <input type="color" value={color} onChange={({target: {value}}) => setColor(value)}/>
                    {/* <button onClick={openImage}>
                        open image
                    </button> */}
                    {/* <button onClick={openImage}> */}
                        <input type="file" onChange={onImageChange} />
                    {/* </button> */}
                    {/* <button onClick={changeTool('brush')}>
                        open image
                    </button>
                    <button onClick={changeTool('line')}>
                        open image      
                    </button>
                    <button onClick={changeTool('rect')}>
                        open image
                    </button> */}
                    <input type="range" min="1" max="100" step="1" value={width} onChange={({target:{value}}) => setWidth(value)}/>
                    <button onClick={() => saveImage()}>
                        <a href="#" id="img-file" download="image.png">DOWNLOAD</a>
                    </button>
                    <button onClick={Logout}>
                       Logout
                    </button>
                    </div>
            </div>
            <div className={styles.usersContainer}>
                <ul>
                    {users.map((user: any) => (
                        <li key={user.id}>{user.name} {myUser.id === user.id ? "(you)": ""}
                            {myUser.isAdmin && myUser.id !== user.id ? 
                            <button onClick={() => toggleDrawPossibility(user.name)}>
                                {user.isAbleToDraw ? "Forbid" : "Allow"}
                            </button> :""}
                        </li>))}
                </ul>
            </div>
        </div>
    )

}