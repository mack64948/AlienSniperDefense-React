// import {Alien} from "../components/Alien"
// import { createRef } from "react";
// export class AlienEnemy{

//     constructor(imgSrc, startX, startY, xSpeed, ySpeed, 
//         gameScreenWidth,gameScreenHeight){

//         this.config = {
//             x: startX, 
//             y: startY, 
//             dx: xSpeed, 
//             dy: ySpeed
//         }
//         this.imgSrc = imgSrc;
//         this.elementRef = createRef();
//         let elementRef = this.elementRef;

//         this.element = <Alien imgSrc={imgSrc} 
//             xPos={this.config.x} 
//             yPos={this.config.y}
//             ref={elementRef.current}
            
//             ></Alien>;

//         this.gameScreenHeight = gameScreenHeight;
//         this.gameScreenWidth = gameScreenWidth;

//         this.render = this.render.bind(this);
//         this.updatePosition = this.updatePosition.bind(this);
//     }

//     render(){
//         this.element = <Alien imgSrc={this.imgSrc} 
//             xPos={this.config.x} 
//             yPos={this.config.y}></Alien>;

//         return this.element;
//     }

//     updatePosition(){

//         console.log(this.element);

    
//         this.config.x += this.config.dx;
//         this.config.y += this.config.dy;

//         console.log(this.elementRef)
//         let rect = this.elementRef.current.getBoundingClientRect();

//         if(this.config.x + rect.width >= this.gameScreenWidth || this.config.x <= 0){
//             this.config.dx = -this.config.dx;
//         }

//         if(this.config.y + rect.height >= this.gameScreenHeight || this.config.y <= 0){
//             this.config.dy = -this.config.dy;
//         }


//         this.element.style.left = (this.config.x) + "px";
//         this.element.current.style.top = (this.config.y) + "px";
//     }
// }
