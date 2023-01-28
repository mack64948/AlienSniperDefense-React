// class AlienEnemy{

//     constructor(imgSrc, startX, startY, xSpeed, ySpeed){
//         this.config = {
//             x: startX, 
//             y: startY, 
//             dx: xSpeed, 
//             dy: ySpeed
//         }
//         this.imgSrc = imgSrc;
//         this.element = <Alien imgSrc={imgSrc} 
//             xPos={this.config.x} 
//             yPos={this.config.y}></Alien>;
        
//     }

//     render(){
//         this.element = <Alien imgSrc={this.imgSrc} 
//             xPos={this.config.x} 
//             yPos={this.config.y}></Alien>;
//     }

//     updatePosition(){

//         this.config.x += this.config.dx;
//         this.config.y += this.config.dy;

//         if(this.config.x + alien1_rect.width >= xMax || this.config.x <= 0){
//             this.config.dx = -this.config.dx;
//         }

//         if(this.config.y + alien1_rect.height >= yMax || this.config.y <= 0){
//             this.config.dy = -this.config.dy;
//         }


//         this.element.style.left = (this.config.x) + "px";
//         this.element.current.style.top = (this.config.y) + "px";
//     }
// }
