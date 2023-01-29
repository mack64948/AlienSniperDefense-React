import {useState,useRef,useEffect} from "react"
import "./index.scss"

import { SelfUpdatingAlien } from "../SelfUpdatingAlien";
import { alienImages } from "../../data";
import { checkForCollision, runAnimation, runExplosionAnimation } from "../../utils/helper_functions";

/**
 * You can use useEffect to adjust position - make position a dependency
 * Both the ref and the document.getElementById method work well
 */

function GameBoard({props}){
    const crosshairDiv = useRef();
    const gameBoard = useRef();

    const [position,setPosition] = useState({x: 0, y: 0})
    const [hits,setHits] = useState(0);
    const [alienConfigs,setAlienConfigs] = useState([]);



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

        /*
    useEffect(() => {
        let boardRect = gameBoard.current.getBoundingClientRect()
        let width = boardRect.width;
        let height = boardRect.height;
     
        let crosshairRect = crosshairDiv.current.getBoundingClientRect()

        

        let intervalID = setInterval(() => {

         
        }, 100);
       

        /**
         * Clear the interval for the game loop to prevent memory leaks
         */
        /*
        return () => { clearInterval(intervalID) };
    },[]); */

  

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


    useEffect(() => {
        setAlienConfigs(createAlienConfigurations(5));
    }, [])

    const createAlienConfigurations = (numberOfAliens) => {


         console.log("Creating aliens...");
        let configs = [];
        let gameBoardRect = gameBoard.current.getBoundingClientRect();

       for(let i = 0; i < numberOfAliens; i++){
        console.log("Creating alien " + (i+1));
        let randomX = Math.floor(Math.random()*gameBoardRect.width) + 50;
        let randomY = Math.floor(Math.random()*gameBoardRect.width) + 50;

        configs.push({
            x:randomX,
            y:randomY,
            dy:10,
            dx:-6, 
            gameScreenWidth: gameBoardRect.width,
            gameScreenHeight: gameBoardRect.height, 
            imgSrc: alienImages[Math.floor(Math.random()*alienImages.length)]});
        
       }

       return configs;
    }

   
    // let aliens = [
    //     <SelfUpdatingAlien imgSrc={alienImages["pink"]} config={{x: 100,y: 200,dx: 5,dy: -5}}
    //                 gameScreenHeight={500}
    //                 gameScreenWidth={600}
    //             ></SelfUpdatingAlien>,
    // ];

    

    

    let aliens =[
        <SelfUpdatingAlien imgSrc={alienImages["pink"]} 
                    config={{x: 100,y: 200,dx: 5,dy: -5}}
                            gameScreenHeight={500}
                            gameScreenWidth={500}></SelfUpdatingAlien>,
        <SelfUpdatingAlien imgSrc={alienImages["blue"]} 
                        config={{x: 50,y: 150,dx: 10,dy: -15}}
                            gameScreenHeight={500}
                            gameScreenWidth={500}></SelfUpdatingAlien>,
        <SelfUpdatingAlien imgSrc={alienImages["pink"]} 
                            config={{x: 300,y: 100,dx: 8,dy: -25}}
                                gameScreenHeight={500}
                                gameScreenWidth={500}></SelfUpdatingAlien>,
        ]
    

    

    let hasFired = useRef(false);

    useEffect(() => {
        hasFired.current = false;
    },[])
    
   
    return (<div ref={gameBoard} className="game-board" onMouseMove={updateCrosshairPosition}>

        <h1 className="scoreboard">Total Hits: {hits}</h1>

        {aliens}
        {/* {alienConfigs.map((config) => {
            console.log(config);
            return <SelfUpdatingAlien
                imgSrc={config.imgSrc}
                config={{
                    x: config.x,
                    y: config.y,
                    dx: config.dx,
                    dy: config.dy
                }}
                gameScreenHeight={config.gameScreenHeight}
                gameScreenWidth={config.gameScreenWidth}
            ></SelfUpdatingAlien>
        })} */}

        <div onClick={() => {
            if(hasFired.current){
                console.log("Can't fire now")
                setTimeout(() => {
                    hasFired.current = false
                },500)
                return;
            }

          
            hasFired.current = true;
            playSound();

          
             let alienDivs = document.getElementsByClassName("alien");
            
             for(let i = 0; i < alienDivs.length; i++){
                let div = alienDivs[i];
             
                let alien_rect = div.getBoundingClientRect();
                let crosshairRect = crosshairDiv.current.getBoundingClientRect()
        
                checkForCollision(crosshairRect,alien_rect,() => {
                   setHits(hits+1);       
                 
                    let originalImage = div.querySelector("img");
                
                    runExplosionAnimation(originalImage,alienImages["pink"],() => {
                        div.parentElement.removeChild(div);
                        
                    });
                    
                }, () => { 
                  
                    console.log("No Collision Occurred")});
                    
             
            }

           
           

        }} id="the-crosshair" style={{position: "absolute"}} ref={crosshairDiv}></div>

    </div>);
}

export default GameBoard;