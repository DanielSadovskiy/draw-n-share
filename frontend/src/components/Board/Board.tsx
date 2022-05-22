import React, { useEffect } from 'react';
import io from 'socket.io-client'
import styles from './styles.module.css'

export const Board = () => {

    const socket = io('ws://localhost:9000')

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

            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function(e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);


            /* Drawing on Paint App */
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
                ctx!.beginPath();
                ctx!.moveTo(last_mouse.x, last_mouse.y);
                ctx!.lineTo(mouse.x, mouse.y);
                ctx!.closePath();
                ctx!.stroke();
                socket.emit('canvas-data', "hello")
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