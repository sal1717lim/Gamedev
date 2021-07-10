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
var score=0;
var scoreText;
var game = new Phaser.Game(config);
console.log(game)
var etatpassage=[]
var map=[
         [1,1,1,6,1,1,6,1,1,1,1,6,1,1,1],
         [2,7,2,5,2,7,5,2,2,7,2,5,2,7,2],
         [1,1,1,3,1,1,3,1,1,1,1,3,1,1,1],
         [2,7,2,5,7,2,5,2,7,2,2,5,2,2,2],
         [1,1,1,3,1,1,3,1,1,1,1,3,1,1,1],
         [1,1,1,3,1,1,3,1,1,1,1,6,1,1,1],
         [2,7,2,5,2,7,5,2,2,2,2,5,2,7,7],
         [1,1,1,3,1,1,3,1,1,1,1,3,1,1,1],
         [2,7,2,5,7,2,5,2,2,7,2,5,7,2,2],
         [1,1,1,3,1,1,3,1,1,1,1,3,1,1,1],
         
        ]
var trotoire;
var routeH;

var croisement4;
var cursor;
var passage;
var car={
    objet:null,
    positionX:64+6*128,
    positionY: 20+64,
    directiony:0,
    directionx:-100-Math.floor(Math.random() * 200),
    valeur:null
};
var player={
    objet:null,
    vitesse:100,
    superspeed:250,
    energie:100
}
var ambulance={
    objet:null,
    positionX:44+6*64,
    positionY:32+9*64,
    directiony:-100-Math.floor(Math.random() * 200),
    directionx:0,
    valeur:null
}
var police={
    objet:null,
    positionX:44+11*64,
    positionY:32+5*64,
    directiony:-100-Math.floor(Math.random() * 200),
    directionx:0,
    valeur:null
}
var taxi={
    objet:null,
    positionX:44+12*64,
    positionY:44+6*64,
    directiony:0,
    directionx:-100-Math.floor(Math.random() * 200),
    valeur:null
}
var viper={
    objet:null,
    positionX:44+12*64,
    positionY:20+8*64,
    directiony:0,
    directionx:-100-Math.floor(Math.random() * 200),
    valeur:null
}
var truck={
    objet:null,
    positionX:64+6*128,
    positionY: 20+64*3,
    directiony:0,
    directionx:-100+-Math.floor(Math.random() * 300),
    valeur:null
}
var audi={
    objet:null,
    positionX:44+3*64,
    positionY:32+5*64,
    directiony:-100-Math.floor(Math.random() * 200),
    directionx:0,
    valeur:null
}
var gameover=false;
var intersection=[]
var feu=[];
function preload ()
{   this.load.spritesheet("feu","assets\\feu.png",{ frameWidth:27, frameHeight: 64})
    this.load.image('trotoire', 'assets\\trotoire.jpg'); 
    this.load.image('routeH', 'assets\\routeH.jpg'); 
    this.load.image('routeV', 'assets\\routeV.jpg'); 
    this.load.image('virageGH', 'assets\\virageGH.jpg'); 
    this.load.image('virageDH', 'assets\\virageDH.jpg'); 
    this.load.image('virageGB', 'assets\\virageGB.jpg'); 
    this.load.image('virageDB', 'assets\\virageDB.jpg'); 
    this.load.image("car","assets\\car.png")
    this.load.image("passageV",'assets\\passageV.jpg')
    this.load.image("passageH",'assets\\passageH.jpg')
    this.load.image("viper","assets\\viper.png")
    this.load.image("truck","assets\\truck.png")
    this.load.image("taxi","assets\\taxi.png")
    this.load.image("audi","assets\\Audi.png")
    this.load.image("croisement4","assets\\croisement4.jpg")
    this.load.image("croisement3bas","assets\\croisement3bas.jpg")
    this.load.spritesheet("ambulance","assets\\ambulance.png",{ frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet("police","assets\\police.png",{ frameWidth:16, frameHeight: 35 });
    this.load.spritesheet("player","assets\\spritesheet.png",{ frameWidth:52, frameHeight: 48 });
    this.load.audio('klaxon', 'assets/klaxon.mp3');
}
function create ()

{   
    this.sound.add('klaxon');
    this.physics.world.setBoundsCollision(true, true, true, true);
    {/*CREATION DES SPRITE ET DES TILES*/



    
    trotoire=this.physics.add.staticGroup();
    
    routeH=this.physics.add.staticGroup();

    croisement4=this.physics.add.staticGroup();
    passage=this.physics.add.staticGroup();
     {//dessin de la map

        console.log("creation de la map")
        for (var i=0;i<10;i++){
            for (var j=0;j<14;j++){
                
                switch(map[i][j]){
                    case 1:trotoire.create(32+j*64,32+ i*64, 'trotoire'); break
                    case 2:routeH.create(32+j*64,32+ i*64, 'routeH'); break
                    case 3:routeH.create(32+j*64,32+ i*64, 'routeV'); break              
                    case 5:croisement4.create(32+j*64,32+ i*64, 'croisement4'); 
                        intersection.push([])
                        feu.push({
                                  i:i+1,
                                  j:j+1,
                                  objet:null
                                 }
                            
                            )                  
                        break
                    case 6:passage.create(32+j*64,32+ i*64, 'passageV');
                            etatpassage.push(true) ;break
                    case 7:passage.create(32+j*64,32+ i*64, 'passageH');etatpassage.push(true) ; break 

                }
                
               
            }
        }
        for(k in feu){
            feu[k].objet=this.physics.add.sprite((feu[k].j)*64, (feu[k].i)*64, 'feu')
          
        }
        car.objet= this.physics.add.sprite(car.positionX, car.positionY, 'car');
        car.objet.body.allowRotation = true;
        
        audi.objet= this.physics.add.sprite(audi.positionX, audi.positionY, 'audi');
        audi.objet.body.allowRotation = true;
        audi.objet.setVelocity(audi.directionx,audi.directiony)
        viper.objet= this.physics.add.sprite(viper.positionX, viper.positionY, 'viper');
        viper.objet.body.allowRotation = true;
        viper.objet.setVelocity(viper.directionx,viper.directiony)
        truck.objet=this.physics.add.sprite(truck.positionX,truck.positionY,"truck")
        truck.objet.allowRotation=true
        truck.objet.angle=0
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
            key: 'feurouge',
            frames: [ { key: 'feu', frame: 3 } ],
            frameRate: 20
                          });
        this.anims.create({
           key: 'feuvert',
           frames: [ { key: 'feu', frame: 0 } ],
           frameRate: 20
         });
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
        
         
       
  
       
        console.log("fin du dessin de la map")
       

        }
    
    
    
    }
    {/* verification du recouvrement des voiture*/
       
        this.physics.add.overlap(car.objet, ambulance.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(car.objet, taxi.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(car.objet, police.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(car.objet, truck.objet, function(){
            this.physics.pause();
        }, null, this);  
       
        this.physics.add.overlap(ambulance.objet,taxi.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(ambulance.objet,police.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(ambulance.objet,truck.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(taxi.objet,police.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(taxi.objet,truck.objet, function(){
            this.physics.pause();
        }, null, this);  
        this.physics.add.overlap(police.objet,truck.objet, function(){
            this.physics.pause();
        }, null, this); 
        this.physics.add.overlap(audi.objet,truck.objet, function(){
            this.physics.pause();
        }, null, this);   
        this.physics.add.overlap(audi.objet,police.objet, function(){
            this.physics.pause();
        }, null, this);   
        this.physics.add.overlap(audi.objet,ambulance.objet, function(){
            this.physics.pause();
        }, null, this);   
        this.physics.add.overlap(audi.objet,car.objet, function(){
            this.physics.pause();
        }, null, this);   
          
        this.physics.add.overlap(audi.objet,taxi.objet, function(){
            this.physics.pause();
        }, null, this);   

        


    }
    {/*creation du joueur*/
        player.objet=this.physics.add.sprite(32,32,"player")
        player.flipX=true;
        this.anims.create({
            //on lui donne comme nom (key)
        key: 'player',
        frames: this.anims.generateFrameNumbers('player', { start: 15, end: 29 }),
        frameRate: 15,
        repeat: -1
});
this.anims.create({
    //on lui donne comme nom (key)
key: 'left',
frames: this.anims.generateFrameNumbers('player', { start: 61, end: 74 }),
frameRate: 15,
repeat: -1
});
this.anims.create({
    //on lui donne comme nom (key)
key: 'right',
frames: this.anims.generateFrameNumbers('player', { start:45, end: 59 }),
frameRate: 15,
repeat: -1
});
cursor = this.input.keyboard.createCursorKeys();
player.objet.anims.play('player', true);
this.physics.add.collider(player.objet, routeH);
  this.anims.create({
        //on lui donne comme nom (key)
    key: 'courir',
    frames: this.anims.generateFrameNumbers('player', { start:31, end: 44 }),
    frameRate: 15,
    repeat: -1
    });
    this.anims.create({
        //on lui donne comme nom (key)
    key: 'death',
    frames: this.anims.generateFrameNumbers('player', { start:0, end: 14 }),
    frameRate: 15,
    repeat: 0
    });
    player.objet.setCollideWorldBounds(true);
    player.objet.body.setSize(20,38,true)
    {
        this.physics.add.collider(player.objet, car.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
        this.physics.add.collider(player.objet, ambulance.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
        this.physics.add.collider(player.objet, truck.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
        this.physics.add.collider(player.objet, taxi.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
        this.physics.add.collider(player.objet, viper.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
        this.physics.add.collider(player.objet, police.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
        this.physics.add.collider(player.objet, audi.objet,  function(){
            player.objet.anims.play("death",true)
            this.physics.pause();
            gameover=true
        },null ,this);
    }
    }
scoreText = this.add.text(780, 16, 'score: 0', { fontSize: '20px', fill: '#0000EE' });   
  
}

function passageP(){
    for (element in passage.children.entries){
        if(Phaser.Geom.Rectangle.Overlaps(player.objet.getBounds(),passage.children.entries[element].getBounds() ))
        {
            if(etatpassage[element]){
                passage.children.entries[element].setTint(0x7CFC00)
                etatpassage[element]=false;
                score=score+5
                scoreText.setText('Score: ' + score); 
            }
        }
    }
}
function intersectionF(sprite,croisement,world){
 
    for (element in croisement.children.entries){
        if(Phaser.Geom.Rectangle.Overlaps(sprite.objet.getBounds(),croisement.children.entries[element].getBounds() ))
        {
            if(intersection[element].length!=0){
                
                if(!intersection[element].includes(sprite)){
                    feu[element].objet.anims.play('feurouge');
                   // world.sound.play('klaxon'); le klaxon est en commentaire car il fesait trop de bruit 
                    sprite.objet.setVelocity(0,0)
                    intersection[element].push(sprite)
                  
                }
            }else{
               
                intersection[element].push(sprite)
                sprite.valeur=element
                
                //sprite.objet.setVelocity(sprite.objet.directionx,sprite.objet.directiony)
            }
        }
        
    }

}
function libererintersectoin(sprite,route,world){
   
    if(sprite.valeur!=null)
    for (element in route.children.entries){
        if(Phaser.Geom.Rectangle.Overlaps(sprite.objet.getBounds(),route.children.entries[element].getBounds() ))
        { var liberer=false
            for(croisement in croisement4.children.entries){
                if(Phaser.Geom.Rectangle.Overlaps(sprite.objet.getBounds(),croisement4.children.entries[croisement].getBounds() )){
                    liberer=true
                    break
                }
            }
            
            if((intersection[sprite.valeur].length!=0) & !liberer){

        
            if(intersection[sprite.valeur].includes(sprite)){
               
               intersection[sprite.valeur]=intersection[sprite.valeur].filter(function(value, index, arr){ 
                return value !=sprite;
            });
               if(intersection[sprite.valeur].length!=0){
                
                   feu[sprite.valeur].objet.anims.play('feuvert');
                var x=intersection[sprite.valeur].shift()
                x.objet.setVelocity(x.directionx,x.directiony)
            }

            }
        }
        }
        
    }
}
function update ()
{  passageP()
  if(!gameover)  {
    {
    if (cursor.left.isDown)
    { 
        if(player.objet.x>0){
            if(cursor.space.isDown){
                player.objet.setVelocityX(-player.superspeed);  
                player.objet.anims.play('courir', true);               
                player.objet.scaleX=-1
            }else{
                player.objet.setVelocityX(-player.vitesse);         
                player.objet.anims.play('right', true);       
                player.objet.scaleX=-1
                
            }

        }else{
            player.objet.x=0
        }
      
             }
    else if (cursor.right.isDown)
    {if(cursor.space.isDown){
        player.objet.setVelocityX(player.superspeed);   
        player.objet.anims.play('courir', true);           
        player.objet.scaleX=1 
    }else{
        player.objet.setVelocityX(player.vitesse);                
        player.objet.anims.play('right', true);
        player.objet.scaleX=1
    }
    }else  if (cursor.down.isDown){
        if(cursor.space.isDown){
            player.objet.setVelocityY(player.superspeed);   
            player.objet.anims.play('courir', true);            
            player.objet.scaleX=1 
        }else{
            player.objet.setVelocityY(player.vitesse);                
            player.objet.anims.play('right', true);
            player.objet.scaleX=1}


    }else if (cursor.up.isDown){
        if(cursor.space.isDown){
            player.objet.setVelocityY(-player.superspeed);   
            player.objet.anims.play('courir', true);             
            player.objet.scaleX=1 
        }else{
            player.objet.setVelocityY(-player.vitesse);                
            player.objet.anims.play('right', true);
            player.objet.scaleX=1}
        }


    
    
    else{
        player.objet.setVelocity(0,0);           
        player.objet.scaleX=1
        player.objet.anims.play('player', true); 
       // player.objet.scaleX=1
    }
}
    ambulance.objet.anims.play('ambulance', true);
    police.objet.anims.play('police', true);
    car.objet.body.onWorldBounds=true
{//world bounds
   
    if(car.objet.body.checkWorldBounds() ){

car.directionx=-car.directionx
car.objet.setVelocity(car.directionx,car.directiony)
car.objet.angle=180
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
                if(audi.objet.body.checkWorldBounds()){
                   
                    audi.directiony=-audi.directiony
                    audi.objet.setVelocity(audi.directionx,audi.directiony)
                    audi.objet.angle+=180
                    }
                    if(viper.objet.body.checkWorldBounds()){
                        
                        viper.directionx=-viper.directionx
                        viper.objet.setVelocity(viper.directionx,viper.directiony)
                        viper.objet.angle+=180
                        }
   
}
 {
    intersectionF(car,croisement4,this)
    libererintersectoin(car,routeH,this)
    intersectionF(audi,croisement4,this)
    libererintersectoin(audi,routeH,this)
    intersectionF(taxi,croisement4,this)
    intersectionF(police,croisement4,this)
    libererintersectoin(taxi,routeH,this)
    libererintersectoin(police,routeH,this)
    intersectionF(ambulance,croisement4,this)
    intersectionF(truck,croisement4,this)
    libererintersectoin(ambulance,routeH,this)
    libererintersectoin(truck,routeH,this)
    intersectionF(viper,croisement4,this)
    libererintersectoin(viper,routeH,this)
 }
}
}
