var config = {
    type: Phaser.AUTO,
    width: 896,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
         [1,1,1,1,1,1,1],
         [1,4,2,2,2,2,2],
         [1,3,1,1,1,1,1],
         [1,3,1,1,1,1,1],
         [1,3,1,1,1,1,1],
        ]
var trotoire;
var routeH;

function preload ()
{   
    this.load.image('trotoire', 'assets\\trotoire.jpg'); 
    this.load.image('routeH', 'assets\\routeH.jpg'); 
    this.load.image('routeV', 'assets\\routeV.jpg'); 
    this.load.image('virageGH', 'assets\\virageGH.jpg'); 
    trotoire=this.physics.add.staticGroup();
    routeH=this.physics.add.staticGroup();
}

function create ()
{  
     {//dessin de la map

        console.log("creation de la map")
        for (var i=0;i<6;i++){
            for (var j=0;j<8;j++){
                console.log("j=",j)
                switch(map[i][j]){
                    case 1:trotoire.create(64+j*128,64+ i*128, 'trotoire'); break
                    case 2:trotoire.create(64+j*128,64+ i*128, 'routeH'); break
                    case 3:trotoire.create(64+j*128,64+ i*128, 'routeV'); break
                    case 4:trotoire.create(64+j*128,64+ i*128, 'virageGH'); break
                }
                
               
            }
        }
        console.log("fin du dessin de la map")


        }
    
    
}

function update ()
{
}
