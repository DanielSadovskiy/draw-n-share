import { SocketContext } from 'context/socketContext';
import { ToolContext } from 'context/toolContext';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'
import { debounce } from 'utils/debounce';
import styles from './styles.module.css'

export const Board = () => {
    const socket = useContext(SocketContext)
    const canvasRef = React.useRef(null);
    const contextRef = React.useRef(null);
    const { color, width } = useContext(ToolContext)


    useEffect(() => {
        socket.on('canvas-data', (data: any) => {
            const image = new Image();
            var canvas = document.querySelector('#board') as any;
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
        const canvas = document.querySelector('#board') as any;
        contextRef.current = canvas.getContext('2d')
        const ctx = contextRef.current as any
        // const ctx = canvas.getContext('2d');
        // ctx!.fillStyle = "#eee";
        // ctx?.fillRect(0, 0, canvas.width, canvas.height);
        
        if(canvas) {
            // const currentCanvas = canvas.toDataURL('image/png')
            // let ctx = canvas.getContext('2d');
            // console.log(ctx)
            // const image = new Image();
            // image.onload = () => {
            //     ctx?.drawImage(image,0,0)
            // }
            // image.src = currentCanvas
           
            const sketch = document.querySelector('#sketch') as Element;
            const sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));
           

            const mouse = {x: 0, y: 0};
            const last_mouse = {x: 0, y: 0};

            canvas.addEventListener('mousemove', function(e:any) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - canvas.offsetLeft;
                mouse.y = e.pageY - canvas.offsetTop;
            }, false);

            ctx!.lineWidth = width;
            ctx!.lineJoin = 'round';
            ctx!.lineCap = 'round';
            ctx!.strokeStyle = color;

            canvas.addEventListener('mousedown', function() {
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
    },[] )

    useEffect(() => {
        const ctx =  contextRef.current as any;
        ctx.lineWidth = width
        ctx.strokeStyle = color
        contextRef.current = ctx
    },[color, width] )

    return (
        <div id="sketch" className={styles.sketch}>
            <canvas className={styles.board} id="board" ref={canvasRef}></canvas>
        </div>
    )
}