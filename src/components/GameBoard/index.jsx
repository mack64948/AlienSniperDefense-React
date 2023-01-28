import {useState,useRef,useEffect} from "react"
import "./index.scss"
import { Alien } from "../Alien";

import { alienImages } from "../../data";
import { checkForCollision, runExplosionAnimation } from "../../utils/helper_functions";

/**
 * You can use useEffect to adjust position - make position a dependency
 * Both the ref and the document.getElementById method work well
 */

function GameBoard({props}){
    const crosshairDiv = useRef();
    const gameBoard = useRef();
    const alien1 = useRef();
    const enemies = useRef();
    let alien1_config = useRef();

    const [position,setPosition] = useState({x: 0, y: 0})
    const [hits,setHits] = useState(0);



    /**
     * Update the crosshair element as its position changes 
     */
    useEffect(()=>{
     
        let rect = crosshairDiv.current.getBoundingClientRect();
        let width = (rect.width)
        let height = (rect.height)

        crosshairDiv.current.style.left = (position.x - width/2) + "px";
        crosshairDiv.current.style.top = (position.y - height/2) + "px";
     
    },[position]);

    /*
        Main Game Loop
    */
    useEffect(() => {

        alien1_config = {
            x: 100, y: 100,
            dx: 10, dy: -10,
            health: 10
        };

        let alien1_rect = alien1.current.getBoundingClientRect();
        let boardRect = gameBoard.current.getBoundingClientRect()
        let crosshairRect = crosshairDiv.current.getBoundingClientRect()

        let xMax = boardRect.width;
        let xMin = 0;

        let yMax = boardRect.height;
        let yMin = 0;

        let intervalID = setInterval(() => {

            alien1_config.x += alien1_config.dx;
            alien1_config.y += alien1_config.dy;

            if(alien1_config.x + alien1_rect.width >= xMax || alien1_config.x <= 0){
                alien1_config.dx = -alien1_config.dx;
            }

            if(alien1_config.y + alien1_rect.height >= yMax || alien1_config.y <= 0){
                alien1_config.dy = -alien1_config.dy;
            }

        
            alien1.current.style.left = (alien1_config.x) + "px";
            alien1.current.style.top = (alien1_config.y) + "px";
           
        }, 100);

        /**
         * Clear the interval for the game loop to prevent memory leaks
         */
        return () => { clearInterval(intervalID) };
    },[]);

    const playSound = () => {
        let audio = new Audio('../../assets/audio/laser2.ogg');
        console.log(audio);
        audio.play();
    }

    const updateCrosshairPosition = (e) => {

        let cRect = crosshairDiv.current.getBoundingClientRect();
        let cWidth = (cRect.width)
        let cHeight = (cRect.height)

        let gameBoardRect = gameBoard.current.getBoundingClientRect();
    
        let x = e.clientX - gameBoardRect.x;
        let y = e.clientY - gameBoardRect.y;

        if(x < gameBoardRect.width - cWidth/2 && x > cWidth/2 && y < gameBoardRect.height - cHeight/2 && y > cHeight/2){
            setPosition({x: x, y: y});
        }
       
    }


    return (<div ref={gameBoard} className="game-board" onMouseMove={updateCrosshairPosition}>

        <h1 className="scoreboard">{hits}</h1>
        <div className="alien1" style={{position: "absolute"}} ref={alien1}>
            <img src={alienImages["pink"]}/>
        </div>

        <div onClick={() => {
             playSound();

             let alien1_rect = alien1.current.getBoundingClientRect();
             let crosshairRect = crosshairDiv.current.getBoundingClientRect()
     
             checkForCollision(crosshairRect,alien1_rect,() => {
                setHits(hits+1);       
                    
                let alienImg = alien1.current.querySelector("img");
                console.log(alienImg);

               runExplosionAnimation(alienImg,alienImages["pink"]);
             });
        

        }} id="the-crosshair" style={{position: "absolute"}} ref={crosshairDiv}></div>

    </div>);
}

export default GameBoard;