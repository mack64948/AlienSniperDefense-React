import {useState,useRef,useEffect} from "react"
import "./index.scss"

/**
 * You can use useEffect to adjust position - make position a dependency
 * Both the ref and the document.getElementById method work well
 */
function GameBoard({props}){
    const crosshairDiv = useRef();
    const gameBoard = useRef();
    const [position,setPosition] = useState({x: 0, y: 0})

    useEffect(()=>{
        console.log("Updating position...");
     
        let rect = crosshairDiv.current.getBoundingClientRect();
        let width = (rect.width)
        let height = (rect.height)

        console.log("width: " + width);
        console.log("height" + height);

        crosshairDiv.current.style.left = (position.x - width/2) + "px";
        crosshairDiv.current.style.top = (position.y - height/2) + "px";

     
    },[position]);
    return (<div ref={gameBoard} className="game-board" onMouseMove={
        (e) => {

            let cRect = crosshairDiv.current.getBoundingClientRect();
            let cWidth = (cRect.width)
            let cHeight = (cRect.height)

            // var rect = e.target.getBoundingClientRect();
            // var x = e.clientX - rect.left; //x position within the element.
            // var y = e.clientY - rect.top;  //y position within the element
            let gameBoardRect = gameBoard.current.getBoundingClientRect()
            let x = e.clientX - gameBoardRect.x;
            let y = e.clientY - gameBoardRect.y;

            if(x < gameBoardRect.width - cWidth/2 && x > cWidth/2 && y < gameBoardRect.height - cHeight/2 && y > cHeight/2){
                setPosition({x: x, y: y});
            }
           
          
           
           
        }
    }>

        <div id="the-crosshair" style={{position: "absolute"}} ref={crosshairDiv} className="crosshair"></div>

    </div>);
}

export default GameBoard;