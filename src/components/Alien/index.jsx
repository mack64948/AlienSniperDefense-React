import { useRef,useEffect,createRef,forwardRef,useState } from "react";


// const AlienRoughDraft = ({imgSrc,xPos,yPos}) => {
//     const myRef = createRef();
//     //     let [alienConfig,setAlienConfig] = useState(config);

//     //     let rect = element.current.getBoundingClientRect();

//     //     alienConfig.x += this.alienConfig.dx;
//     //     alienConfig.y += this.alienConfig.dy;

//     //     if(alienConfig.x + rect.width >= this.gameScreenWidth || alienConfig.x <= 0){
//     //         alienConfig.dx = -alienConfig.dx;
//     //     }

//     //     if(alienConfig.y + rect.height >= this.gameScreenHeight || alienConfig.y <= 0){
//     //         alienConfig.dy = -alienConfig.dy;
//     //     }

        
        
//     //  element.style.left = alienConfig.x + "px";
//     // element.style.top = alienConfig.y + "px";

//     // setAlienConfig(Object.assign({},alienConfig))

//     useEffect(() => {
//         myRef.current.style.left = xPos + "px";
//         myRef.current.style.top = yPos + "px";
//     }, [])

  


//    return (
//    <div className="alien" style={{position: "absolute"}} ref={myRef}>
//         <img src={imgSrc} alt={"alien"}/>
//     </div>);

// }

// export const Alien = forwardRef((props, ref) => (
//     <AlienRoughDraft ref={ref}>
//       {props.children}
//     </AlienRoughDraft>
//   ));