import {useState,useRef,useEffect} from "react"
import "./index.scss"
import imgAlien1 from "../../assets/images/shipYellow_manned.png";
import explosion0 from "../../assets/images/explosion/explosion00.png"
import explosion1 from "../../assets/images/explosion/explosion01.png"
import explosion2 from "../../assets/images/explosion/explosion02.png"
import explosion3 from "../../assets/images/explosion/explosion03.png"
import explosion4 from "../../assets/images/explosion/explosion04.png"
import explosion5 from "../../assets/images/explosion/explosion05.png"
import explosion6 from "../../assets/images/explosion/explosion06.png"
import explosion7 from "../../assets/images/explosion/explosion07.png"

/**
 * You can use useEffect to adjust position - make position a dependency
 * Both the ref and the document.getElementById method work well
 */
function GameBoard({props}){
    const crosshairDiv = useRef();
    const gameBoard = useRef();
    const alien1 = useRef();
    let alien1_config = useRef();

    const [position,setPosition] = useState({x: 0, y: 0})
    const [hits,setHits] = useState(0);



    useEffect(()=>{
     
        let rect = crosshairDiv.current.getBoundingClientRect();
        let width = (rect.width)
        let height = (rect.height)

        

        crosshairDiv.current.style.left = (position.x - width/2) + "px";
        crosshairDiv.current.style.top = (position.y - height/2) + "px";

     
    },[position]);

    useEffect(() => {

        alien1_config = {
            x: 100, y: 100,
            dx: 10, dy: -10
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

        return () => { clearInterval(intervalID) };
    },[]);

    const playSound = () => {
        let audio = new Audio('../../assets/audio/laser2.ogg');
        console.log(audio);
        audio.play();
    }


    return (<div ref={gameBoard} className="game-board" onMouseMove={
        (e) => {

            let cRect = crosshairDiv.current.getBoundingClientRect();
            let cWidth = (cRect.width)
            let cHeight = (cRect.height)

            // var rect = e.target.getBoundingClientRect();
            // var x = e.clientX - rect.left; //x position within the element.
            // var y = e.clientY - rect.top;  //y position within the element
            let gameBoardRect = gameBoard.current.getBoundingClientRect();
        
            let x = e.clientX - gameBoardRect.x;
            let y = e.clientY - gameBoardRect.y;

            if(x < gameBoardRect.width - cWidth/2 && x > cWidth/2 && y < gameBoardRect.height - cHeight/2 && y > cHeight/2){
                setPosition({x: x, y: y});
            }
           
          
           
           
        }
    }>

        <h1 className="scoreboard">{hits}</h1>
        <div className="alien1" style={{position: "absolute"}} ref={alien1}>
            <img src={imgAlien1}/>
        </div>

        <div onClick={() => {
             playSound();

             let alien1_rect = alien1.current.getBoundingClientRect();
             let crosshairRect = crosshairDiv.current.getBoundingClientRect()
     
            
             if (crosshairRect.x + crosshairRect.width/2 > alien1_rect.x && crosshairRect.x + crosshairRect.width/2 < alien1_rect.x + alien1_rect.width && crosshairRect.y + crosshairRect.height/2 > alien1_rect.y && crosshairRect.y + crosshairRect.height/2 < alien1_rect.y + alien1_rect.height) {
                    console.log("It's a hit!")   
                    setHits(hits+1);       
                    
                    let alienImg = alien1.current.querySelector("img");
                    console.log(alienImg);

                   
                    let textures = [
                        explosion0,explosion1,explosion2,
                        explosion3,explosion4,explosion5,
                        explosion6,explosion7
                    ]
                    let textureIndex = 0;
                    let animationIntervalID = setInterval(() => {
                      
                        alienImg.src = textures[textureIndex];
                        console.log(alienImg);
                        
                        if(textureIndex === textures.length){
                            alienImg.src = imgAlien1;
                            clearInterval(animationIntervalID);
                          
                        } else {
                            textureIndex++;
                        }
                    },100);
             } else {
                console.log("No hit")
                console.log("Crosshair Rect: " + crosshairRect.x);
                console.log("Alien1 Config X: " + alien1_config.x);
                console.log("Alien1 Config Y: " + alien1_config.y);

               
             }

        }} id="the-crosshair" style={{position: "absolute"}} ref={crosshairDiv}></div>

    </div>);
}

export default GameBoard;