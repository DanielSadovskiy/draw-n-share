import { Board } from 'components/Board/Board'
import React from 'react'
import styles from  './styles.module.css'

export const Container = () => {

    const changeTool = (tool: string ) => {


    }

    // function drawRubberbandShape(loc){
    //     ctx.strokeStyle = strokeColor;
    //     ctx.fillStyle = fillColor;
    //     if(currentTool === "brush"){
    //         // Create paint brush
    //         DrawBrush();
    //     } else if(currentTool === "line"){
    //         // Draw Line
    //         ctx.beginPath();
    //         ctx.moveTo(mousedown.x, mousedown.y);
    //         ctx.lineTo(loc.x, loc.y);
    //         ctx.stroke();
    //     } else if(currentTool === "rectangle"){
    //         // Creates rectangles
    //         ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
    //     } else if(currentTool === "circle"){
    //         // Create circles
    //         let radius = shapeBoundingBox.width;
    //         ctx.beginPath();
    //         ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2);
    //         ctx.stroke();
    //     } else if(currentTool === "ellipse"){
    //         // Create ellipses
    //         // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    //         let radiusX = shapeBoundingBox.width / 2;
    //         let radiusY = shapeBoundingBox.height / 2;
    //         ctx.beginPath();
    //         ctx.ellipse(mousedown.x, mousedown.y, radiusX, radiusY, Math.PI / 4, 0, Math.PI * 2);
    //         ctx.stroke();
    //     } else if(currentTool === "polygon"){
    //         // Create polygons
    //         getPolygon();
    //         ctx.stroke();
    //     }
    // }


    function saveImage(){
        const canvas = document.querySelector('#board') as HTMLCanvasElement
        // Get a reference to the link element 
        const imageFile = document.getElementById("img-file");
        console.log(canvas);
        console.log(imageFile);
        // Set that you want to download the image when link is clicked
        imageFile?.setAttribute('download', 'image.png');
        // Reference the image in canvas for download
        imageFile?.setAttribute('href', canvas.toDataURL());
    }


    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <Board/>
            </div>
            <div className={styles.toolBar}>
                <input type="color" />
                {/* <button onClick={openImage}>
                    open image
                </button> */}
                <button onClick={() => saveImage()}>
                    open image
                </button>
                {/* <button onClick={changeTool('brush')}>
                    open image
                </button>
                <button onClick={changeTool('line')}>
                    open image      
                </button>
                <button onClick={changeTool('rect')}>
                    open image
                </button> */}
                <button>
                    <a href="#" id="img-file" download="image.png">download image</a>
                </button>
            </div>
        </div>
    )

}