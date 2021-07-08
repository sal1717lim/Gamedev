var config = {
    type: Phaser.AUTO,
    width: 896,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var map=[
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         [2,2,2,2,2,2,5,2,2,2,2,5,2,2,2],
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         [2,2,2,2,2,2,5,2,2,2,2,5,2,2,2],
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         [2,2,2,2,2,2,5,2,2,2,2,5,2,2,2],
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         [1,1,1,1,1,1,3,1,1,1,1,3,1,1,1],
         
        ]
var trotoire;
var routeH;

var croisement4;
var croisement3bas;
var car={
    objet:null,
    positionX:64+6*128,
    positionY: 20+64,
    directiony:0,
    directionx:-100-Math.floor(Math.random() * 200),
    valeur:null
};
var car2={
    objet:null,
    positionX:20+6*64,
    positionY:32,
    directiony:100+Math.floor(Math.random() * 300),
    directionx:0,
    valeur:null
};
var ambulance={
    objet:null,
    positionX:44+6*64,
    positionY:32+9*64,
    directiony:-10+-Math.floor(Math.random() * 300),
    directionx:0,
    valeur:null
}
var police={
    objet:null,
    positionX:44+11*64,
    positionY:32+9*64,
    directiony:-100+-Math.floor(Math.random() * 300),
    directionx:0,
    valeur:null
}
var taxi={
    objet:null,
    positionX:44+11*64,
    positionY:44+6*64,
    directiony:0,
    directionx:-100+-Math.floor(Math.random() * 300),
    valeur:null
}
var truck={
    objet:null,
    positionX:64+5*128,
    positionY: 20+64*3,
    directiony:0,
    directionx:-10+-Math.floor(Math.random() * 300),
    valeur:null
}
function preload ()
{   
    this.load.image('trotoire', 'assets\\trotoire.jpg'); 
    this.load.image('routeH', 'assets\\routeH.jpg'); 
    this.load.image('routeV', 'assets\\routeV.jpg'); 
    this.load.image('virageGH', 'assets\\virageGH.jpg'); 
    this.load.image('virageDH', 'assets\\virageDH.jpg'); 
    this.load.image('virageGB', 'assets\\virageGB.jpg'); 
    this.load.image('virageDB', 'assets\\virageDB.jpg'); 
    this.load.image("car","assets\\car.png")
    this.load.image("truck","assets\\truck.png")
    this.load.image("taxi","assets\\taxi.png")
    this.load.image("croisement4","assets\\croisement4.jpg")
    this.load.image("croisement3bas","assets\\croisement3bas.jpg")
    this.load.spritesheet("ambulance","assets\\ambulance.png",{ frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet("police","assets\\police.png",{ frameWidth:16, frameHeight: 35 });
}
function create ()
{   trotoire=this.physics.add.staticGroup();
    
    routeH=this.physics.add.staticGroup();

    croisement4=this.physics.add.staticGroup();
   
     {//dessin de la map

        console.log("creation de la map")
        for (var i=0;i<10;i++){
            for (var j=0;j<15;j++){
                
                switch(map[i][j]){
                    case 1:trotoire.create(32+j*64,32+ i*64, 'trotoire'); break
                    case 2:routeH.create(32+j*64,32+ i*64, 'routeH'); break
                    case 3:routeH.create(32+j*64,32+ i*64, 'routeV'); break              
                    case 5:croisement4.create(32+j*64,32+ i*64, 'croisement4'); break

                }
                
               
            }
        }
        car.objet= this.physics.add.sprite(car.positionX, car.positionY, 'car');
        car.objet.body.allowRotation = true;
        car2.objet= this.physics.add.sprite(car2.positionX, car2.positionY, 'car');
        car2.objet.body.allowRotation = true;
        truck.objet=this.physics.add.sprite(truck.positionX,truck.positionY,"truck")
        truck.objet.allowRotation=true
        truck.objet.angle=-90
        truck.objet.setVelocity(truck.directionx,truck.directiony)
        taxi.objet=this.physics.add.sprite(taxi.positionX,taxi.positionY,"taxi")
        taxi.objet.allowRotation=true
        
        taxi.objet.setVelocity(taxi.directionx,taxi.directiony)
        police.objet=this.physics.add.sprite(police.positionX,police.positionY,"police")
        police.objet.allowRotation=true
        police.objet.setVelocity(police.directionx,police.directiony)
        ambulance.objet=this.physics.add.sprite(ambulance.positionX,ambulance.positionY,"ambulance")
        ambulance.objet.body.allowRotation = true;
        ambulance.objet.setVelocity(ambulance.directionx,ambulance.directiony)

        this.anims.create({
			//on lui donne comme nom (key)
                key: 'ambulance',
                frames: this.anims.generateFrameNumbers('ambulance', { start: 0, end: 2 }),
                frameRate: 5,
                 repeat: -1
                              });
            this.anims.create({
                                //on lui donne comme nom (key)
             key: 'police',
              frames: this.anims.generateFrameNumbers('police', { start: 0, end: 2 }),
             frameRate: 5,
           repeat: -1
             });
        window.alert("cliquer sur ok pour commencer le jeu")
        
        car.objet.setVelocity(car.directionx,car.directiony)
         
        car2.objet.setVelocity(car2.directionx,car2.directiony)
        car2.objet.angle=90
       
        console.log("fin du dessin de la map")
       

        }
    
    
}
function update ()
{  ambulance.objet.anims.play('ambulance', true);
    police.objet.anims.play('police', true);
    
    if(car.objet.body.checkWorldBounds()){
car.directionx=-car.directionx
car.objet.setVelocity(car.directionx,car.directiony)
car.objet.angle=180
}
if(car2.objet.body.checkWorldBounds()){
    car2.directiony=-car2.directiony
    car2.objet.setVelocity(car2.directionx,car2.directiony)
    car2.objet.angle=90
    }
if(ambulance.objet.body.checkWorldBounds()){
    ambulance.directiony=-ambulance.directiony
    ambulance.objet.setVelocity(ambulance.directionx,ambulance.directiony)
    ambulance.objet.angle+=180
    }
    if(police.objet.body.checkWorldBounds()){
        police.directiony=-police.directiony
        police.objet.setVelocity(police.directionx,police.directiony)
        police.objet.angle+=180
        }
    
        if(truck.objet.body.checkWorldBounds()){
            truck.directionx=-truck.directionx
            truck.objet.setVelocity(truck.directionx,truck.directiony)
            truck.objet.angle+=180
            }
            if(taxi.objet.body.checkWorldBounds()){
                taxi.directionx=-taxi.directionx
                taxi.objet.setVelocity(taxi.directionx,taxi.directiony)
                taxi.objet.angle+=180
                }
   
}
