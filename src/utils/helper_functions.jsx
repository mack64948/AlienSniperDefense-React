import { explosionTextures } from "../data";


export function runAnimation(imgElement,baseImgPath,textures, finishCallback){
   
    let textureIndex = 0;

    let animationIntervalID = setInterval(() => {
      
        imgElement.src = textures[textureIndex];
        console.log(imgElement);
        
        if(textureIndex === textures.length){
            imgElement.src = baseImgPath;
            clearInterval(animationIntervalID);
            finishCallback();
          
        } else {
            textureIndex++;
        }
    },100);
}

export function runExplosionAnimation(imgElement,basePathImg,finishCallback){
    runAnimation(imgElement,basePathImg,explosionTextures,finishCallback);
}

export function checkForCollision(rect1,rect2,collisionCallback,noCollisionCallback){
    if (rect1.x + rect1.width/2 > rect2.x 
        && rect1.x + rect1.width/2 < rect2.x + rect2.width 
        && rect1.y + rect1.height/2 > rect2.y 
        && rect1.y + rect1.height/2 < rect2.y + rect2.height) {
        
            
            collisionCallback();
       
 } else {
    noCollisionCallback();
  
 }
}