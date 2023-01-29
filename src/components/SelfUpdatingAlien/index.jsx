import { useRef,useEffect,useState } from "react";

export const SelfUpdatingAlien = ({imgSrc,config,gameScreenWidth,gameScreenHeight}) => {

    let [alienConfig,setAlienConfig] = useState(config);

    let element = useRef(null);
   

    useEffect(() => {
        let rect = element.current.getBoundingClientRect();
        console.log("Rect: " + rect);

    alienConfig.x += alienConfig.dx;
    alienConfig.y += alienConfig.dy;

    console.log("alienConfig.x: " + alienConfig.x);
    console.log("alienConfig.y: " + alienConfig.y);

        if(alienConfig.x + rect.width >= gameScreenWidth || alienConfig.x <= 0){
            alienConfig.dx = -alienConfig.dx;
        }

        if(alienConfig.y + rect.height >= gameScreenHeight || alienConfig.y <= 0){
            alienConfig.dy = -alienConfig.dy;
        }

        
        
    element.current.style.left = alienConfig.x + "px";
    element.current.style.top = alienConfig.y + "px";

    setTimeout(() => {
        setAlienConfig({...alienConfig})
    },150)

   
    }, [alienConfig])

  


   return (
   <div className="alien" style={{position: "absolute"}} ref={element}>
        <img src={imgSrc} alt={"alien"}/>
    </div>);

}