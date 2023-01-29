import { useRef,useEffect,useState, forwardRef } from "react";
import "./index.scss"

export const SelfUpdatingAlien = ({imgSrc,config,gameScreenWidth,gameScreenHeight}) => {

    let [alienConfig,setAlienConfig] = useState(config);

    let element = useRef(null);
   

    useEffect(() => {
        let rect = element.current.getBoundingClientRect();
      

    alienConfig.x += alienConfig.dx;
    alienConfig.y += alienConfig.dy;

   

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

export const SelfUpdatingAlienWithRef = forwardRef((props, ref) => (
    <SelfUpdatingAlien ref={ref}
        imgSrc={props.imgSrc} 
        config={props.config} 
        gameScreenWidth={props.gameScreenWidth} 
        gameScreenHeight={props.gameScreenHeight}>
      {props.children}
    </SelfUpdatingAlien>
  ));