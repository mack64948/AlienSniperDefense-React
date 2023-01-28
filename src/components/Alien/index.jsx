import { useRef } from "react";

export const Alien = ({imgSrc,xPos,yPos}) => {
   let element = useRef();
   
   element.style.left = xPos + "px";
   element.style.top = yPos + "px";

   return (
   <div className="alien" style={{position: "absolute"}} ref={element}>
        <img src={imgSrc}/>
    </div>);

}