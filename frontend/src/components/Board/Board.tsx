import { SocketContext } from 'context/socketContext';
import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client'
import { debounce } from 'utils/debounce';
import styles from './styles.module.css'

export const Board = () => {
    const socket = useContext(SocketContext)
    useEffect(() => {
    socket.on('canvas-data', (data: any) => {
        const image = new Image();
        const canvas = document.querySelector('#board') as HTMLCanvasElement
        if(canvas) {
            const ctx = canvas.getContext('2d');
            image.onload = () => {
                ctx?.drawImage(image,0,0)
            }
            image.src = data

        }
        
    })
})

    const drawOnCanvas = () => {            
        const canvas = document.querySelector('#board') as HTMLCanvasElement;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            const sketch = document.querySelector('#sketch') as Element;
            const sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

            const mouse = {x: 0, y: 0};
            const last_mouse = {x: 0, y: 0};

            canvas.addEventListener('mousemove', function(e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);

            ctx!.lineWidth = 5;
            ctx!.lineJoin = 'round';
            ctx!.lineCap = 'round';
            ctx!.strokeStyle = 'blue';

            canvas.addEventListener('mousedown', function(e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function() {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false);

            const onPaint = function() {
                const user = localStorage.getItem('user')
                let userObj: any = null;
                if(user) userObj = JSON.parse(user)
                if(userObj.isAbleToDraw) {
                    ctx!.beginPath();
                    ctx!.moveTo(last_mouse.x, last_mouse.y);
                    ctx!.lineTo(mouse.x, mouse.y);
                    ctx!.closePath();
                    ctx!.stroke();
                    const debouncedPaint = debounce(() => {
                        const base64Image = canvas.toDataURL('image/png')
                        socket.emit('canvas-data', {data : base64Image, room: userObj?.room})
                    }, 1000)
                    debouncedPaint()
                }
            };
        }
    }

    useEffect(() => {
        drawOnCanvas()
    },[])

    return (
        <div id="sketch" className={styles.sketch}>
            <canvas className={styles.board} id="board"></canvas>
        </div>
    )
}