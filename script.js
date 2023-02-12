// SNAKE PROJET JAVASCRIPT Marie BENEDUCI & Julien SANCHEZ

/* 
		Définition des différentes variables
*/
var titre=document.getElementById("titre");
var titre1=document.getElementById("titre1");
var titre2=document.getElementById("titre2");
var titre3=document.getElementById("titre3");
var Bravo1=document.getElementById("myModal1");
var Bravo2=document.getElementById("myModal2");
var Bravo3=document.getElementById("myModal3");
var Perdu1=document.getElementById("myModal4");
var Perdu2=document.getElementById("myModal5");
var Perdu3=document.getElementById("myModal6");
var span = document.getElementsByClassName("close")[0];
var logo=document.getElementById("logo");
var score=document.getElementById("score"); // Récupération de la div score
var dessin=document.getElementById("dessin"); // Récupération de la div "canva"
var Mounia=document.getElementById("mounia"); // Récupération de la div "canva"
var Patronne=document.getElementById("patronne"); // Récupération de la div "canva"
var ctx=dessin.getContext("2d"); // Afin de dessiner sur le canva nous devons passer par un contexte ici "2d"
var niveau1= document.getElementById("1"); // Récupération des boutons"
var niveau2 = document.getElementById("2");
var niveau3 = document.getElementById("3");
var currentlvl = document.getElementById("currentlvl"); // Récupérattion du niveau en cour



dessin.style.display ="none";
score.style.display ="none";
Mounia.style.display = "none";
Patronne.style.display = "none";
titre1.style.display = "none";
titre2.style.display = "none";
titre3.style.display = "none";



var lvl1 = document.createElement("audio");
lvl1.src = "songs/lvl1.mp3";


var lvl2 = document.createElement("audio");
lvl2.src = "songs/lvl2.mp3";

var lvl3 = document.createElement("audio");
lvl3.src = "songs/lvl3.mp3";

var deathsound = document.createElement("audio");
deathsound.src = "songs/gameover.mp3";

var Farine = new Image()
Farine.src  = 'img/farine.png';

var Eau = new Image()
Eau.src  = 'img/eau.png';

var Sel = new Image()
Sel.src  = 'img/sel.png';

var Levure = new Image()
Levure.src  = 'img/levure.png';

var Four = new Image()
Four.src  = 'img/four.png';

var Oeuf = new Image()
Oeuf.src  = 'img/oeuf.png';

var Lait = new Image()
Lait.src  = 'img/lait.png';

var PepiteChoco = new Image()
PepiteChoco.src  = 'img/pepiteChoco.png';

var Sucre = new Image()
Sucre.src  = 'img/sucre.png';

var Beurre = new Image()
Beurre.src  = 'img/beurre.png';

var Biscuit = new Image()
Biscuit.src  = 'img/biscuit.png';

var Framboises = new Image()
Framboises.src  = 'img/framboises.png';

var Fraises = new Image()
Fraises.src  = 'img/fraises.png';

var Casis = new Image()
Casis.src  = 'img/casis.png';

var Gelatine = new Image()
Gelatine.src  = 'img/gelatine.png';

var Citron = new Image()
Citron.src  = 'img/citron.png';

var FromageBlanc = new Image()
FromageBlanc.src  = 'img/fromageBlanc.png';

var Creme = new Image()
Creme.src  = 'img/creme.png';

var Sirop = new Image()
Sirop.src  = 'img/sirop.png';

var Frigo = new Image()
Frigo.src  = 'img/frigo.png';

var array1Level1 = [Farine, Eau, Sel, Levure, Four];
var array1Level2 = [Farine, Oeuf, Eau, Lait, PepiteChoco, Sucre, Sel, Beurre, Four];
var array1Level3 = [Biscuit, Framboises, Fraises, Casis, Gelatine, Citron, FromageBlanc, Creme, Sucre, Sirop, Frigo];


var breadRecepe = new Image()
breadRecepe.src  = 'img/pate.png';


var Bowl = new Image()
Bowl.src  = 'img/bowl.png';

var Charlotte = new Image()
Charlotte.src  = 'img/charlotte.png';

var Brioche = new Image()
Brioche.src  = 'img/brioche.png';

var Perso1LVL1 = new Image()
Perso1LVL1.src  = 'img/pierre.png';

var Perso2LVL1 = new Image()
Perso2LVL1.src  = 'img/quentin.png';

var Perso3LVL1 = new Image()
Perso3LVL1.src  = 'img/frank.png';

var Perso1LVL2 = new Image()
Perso1LVL2.src  = 'img/patron.png';

var Perso1LVL3 = new Image()
Perso1LVL3.src  = 'img/jeremie.png';

var bodySnake = new Image()
bodySnake.src  = 'img/baguette.png';

var wall = new Image()
wall.src  = 'img/wall.png';




 
function playSnake(niveauNumber){
	
	$.get("niveau"+niveauNumber+".json", function(data){
		
		var NB_COLONNES = data["dimensions"][1];
		var NB_LIGNES = data["dimensions"][0];
		var COTE=20; // dimensions en pixels des carrés qui servent de trame pour le jeu

		

		/* 
			Lorsque le bouton play va etre actionné le jeu va pouvoir commencer et on affiche le dessin et le score
		*/
		logo.style.display = "none";
		titre.style.display = "none";
		dessin.style.display ="block";
		score.style.display ="block";
		Mounia.style.display = "block";
		Patronne.style.display = "block";
		niveau1.style.display = "none";
		niveau2.style.display = "none";
		niveau3.style.display = "none";
		currentlvl.innerHTML= "Niveau actuel : niveau " + niveauNumber;

		if(currentlvl.innerHTML === "Niveau actuel : niveau 1"){
			titre1.style.display = "block";
		}

		if(currentlvl.innerHTML === "Niveau actuel : niveau 2"){
			titre2.style.display = "block";
		}

		if(currentlvl.innerHTML === "Niveau actuel : niveau 3"){
			titre3.style.display = "block";
		}


		/* 
			Dimensionnement du "canva" en pixel 
		*/

		dessin.width=NB_COLONNES*COTE;
		dessin.height=NB_LIGNES*COTE;

		
	 


		/* 
			Initialisation du serpent
		*/
		let snake = [] ;

		for (i=0;i<data["snake"].length;i++){
			snake[i]=data["snake"][i];
		}

		var longueurDecrementableInitiale = snake.length-1; // on récupère la longueur decrémentable du serpent initial afin de la retirer pour le calcul du score initial
		

		/* 
			Initialisation des murs
		*/

		let mur = [] ;

		for (i=0;i<data["walls"].length;i++){
			mur[i]=data["walls"][i];
		}
		
		
		
		/* 
			Position de la pomme avant le démarrage du jeu 
		*/
		var apple=0;
		


		/*
			Variable de déplacement du serpent (initialisé en x=1 afin de déclencher le déplacement )
		*/
		var snakeDirectionX=1;  // le snake va commencer par partir par la droite si X = 1 
		var snakeDirectionY=0; // le snake va commencer par partir par le bas si Y = 1


		/* 

		Fonction de mise à jour du dessin
		Cette fonction va s'occuper de dessiner sur le canva le dessin correspondant à l'état actuel du jeu :

		*/

		function majDessin(){
			ctx.clearRect(0,0,dessin.width,dessin.height); // on efface l'ensemble du canva
			
			if(currentlvl.innerHTML === "Niveau actuel : niveau 1"){
				ctx.drawImage(Perso1LVL1,snake[0][0]*COTE,snake[0][1]*COTE,COTE,COTE); // graphisme de la tete du serpent
				ctx.drawImage(Perso2LVL1,snake[1][0]*COTE,snake[1][1]*COTE,COTE,COTE); // graphisme de la tete du serpent
				ctx.drawImage(Perso3LVL1,snake[2][0]*COTE,snake[2][1]*COTE,COTE,COTE); // graphisme de la tete du serpent
			}

			if(currentlvl.innerHTML === "Niveau actuel : niveau 2"){
				ctx.drawImage(Perso1LVL2,snake[0][0]*COTE,snake[0][1]*COTE,COTE,COTE); // graphisme de la tete du serpent
			}

			if(currentlvl.innerHTML === "Niveau actuel : niveau 3"){
				ctx.drawImage(Perso1LVL3,snake[0][0]*COTE,snake[0][1]*COTE,COTE,COTE); // graphisme de la tete du serpent
			}

			if(currentlvl.innerHTML === "Niveau actuel : niveau 1"){
				var i = 3;
			}else{
				var i = 1
			}
			

			for( i,l=snake.length;i<l;i++){
				// gestion du niveau 1
				if(currentlvl.innerHTML === "Niveau actuel : niveau 1"){
					if(score.innerHTML === "Score : 5" || score.innerHTML === "Score : 6"){
						ctx.drawImage(bodySnake,snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);  // graphisme du reste de son corps
					}
	
					else{
						ctx.drawImage(breadRecepe,snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);  // graphisme du reste de son corps
					}	
				}

				// gestion du niveau 2
				if(currentlvl.innerHTML === "Niveau actuel : niveau 2"){
					if(score.innerHTML === "Score : 15" || score.innerHTML === "Score : 16"){
						ctx.drawImage(Brioche,snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);  // graphisme du reste de son corps
					}
	
					else{
						ctx.drawImage(breadRecepe,snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);  // graphisme du reste de son corps
					}	
				}

				// gestion du niveau 2
				if(currentlvl.innerHTML === "Niveau actuel : niveau 3"){
					if(score.innerHTML === "Score : 19" || score.innerHTML === "Score : 20"){
						ctx.drawImage(Charlotte,snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);  // graphisme du reste de son corps
					}
	
					else{
						ctx.drawImage(Bowl,snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);  // graphisme du reste de son corps
					}	
				}
				
			}
			
			
			// gestion du niveau 1
			if(currentlvl.innerHTML === "Niveau actuel : niveau 1"){
				if(score.innerHTML === "Score : " + 0 || score.innerHTML === "Score : "+ 1){
					var foodImg = array1Level1[0];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 2"){
					var foodImg = array1Level1[1];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 3"){
					var foodImg = array1Level1[2];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 4"){
					var foodImg = array1Level1[3];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 5"){
					var foodImg = array1Level1[4];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
			}

			// gestion du niveau 2
			if(currentlvl.innerHTML === "Niveau actuel : niveau 2"){
				if(score.innerHTML === "Score : " + 0 || score.innerHTML === "Score : "+ 1){
					var foodImg = array1Level2[0];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : " + 2 || score.innerHTML === "Score : "+ 3 || score.innerHTML === "Score : "+ 4 || score.innerHTML === "Score : "+ 5 || score.innerHTML === "Score : "+ 6 || score.innerHTML === "Score : "+ 7){
					var foodImg = array1Level2[1];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 8"){
					var foodImg = array1Level2[2];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 9"){
					var foodImg = array1Level2[3];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : 10"){
					var foodImg = array1Level2[4];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : 11"){
					var foodImg = array1Level2[5];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : 12"){
					var foodImg = array1Level2[6];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : 13" || score.innerHTML === "Score : 14"){
					var foodImg = array1Level2[7];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : 15"){
					var foodImg = array1Level2[8];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
			}

			// gestion du niveau 3
			if(currentlvl.innerHTML === "Niveau actuel : niveau 3"){
				if(score.innerHTML === "Score : " + 0 || score.innerHTML === "Score : "+ 1 || score.innerHTML === "Score : "+ 2){
					var foodImg = array1Level3[0];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}
	
				else if(score.innerHTML === "Score : "+ 3 || score.innerHTML === "Score : "+ 4 || score.innerHTML === "Score : "+ 5){
					var foodImg = array1Level3[1];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 6 || score.innerHTML === "Score : "+ 7 || score.innerHTML === "Score : "+ 8){
					var foodImg = array1Level3[2];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 9 || score.innerHTML === "Score : "+ 10 || score.innerHTML === "Score : "+ 11){
					var foodImg = array1Level3[3];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 12 || score.innerHTML === "Score : "+ 13){
					var foodImg = array1Level3[4];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 14){
					var foodImg = array1Level3[5];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 15){
					var foodImg = array1Level3[6];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 16){
					var foodImg = array1Level3[7];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 17){
					var foodImg = array1Level3[8];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 18){
					var foodImg = array1Level3[9];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

				else if(score.innerHTML === "Score : "+ 19){
					var foodImg = array1Level3[10];
					ctx.drawImage(foodImg,apple[0]*COTE,apple[1]*COTE,COTE,COTE);
				}

	
			}

			
			
			
			
			
			ctx.fillStyle="black";

			for(var i=0; i<mur.length;i++){
				// ctx.fillRect(mur[i][0]*COTE,mur[i][1]*COTE,COTE,COTE) 
				ctx.drawImage(wall,mur[i][0]*COTE,mur[i][1]*COTE,COTE,COTE);
			}
			
		}
		/*  
			Fonction de mise à jour du score
		*/

		function majScore(s){
			score.innerHTML="Score : " + s;
		}

		/*
			Fonction de gestion de fin de partie
		*/
		function finPartie(){
			clearInterval(timerJeu); // le timer qui apelle la fonction à fréquence = delay est arrété
			lvl1.pause();
			lvl2.pause();
			lvl3.pause();
			deathsound.play();
			// alert("Perdu !"); // affichage du message de fin
			if(currentlvl.innerHTML === "Niveau actuel : niveau 1"){
				Perdu1.style.display = "block";
			}
			if(currentlvl.innerHTML === "Niveau actuel : niveau 2"){
				Perdu2.style.display = "block";
			}
			if(currentlvl.innerHTML === "Niveau actuel : niveau 3"){
				Perdu3.style.display = "block";
			}
			setTimeout(function(){
				location.reload();
			 }, 5000);
		}
		/*
		Fonction de la boucle du jeu
		*/

		function boucleJeu(){
			if(bougeSnake()){ // si le serpent bouge alors le jeu continue grace au dessin
				majDessin();
				if(currentlvl.innerHTML === "Niveau actuel : niveau 1" && score.innerHTML === "Score : 6"){
					majDessin();
					clearInterval(timerJeu); // le timer qui apelle la fonction à fréquence = delay est arrété
					lvl1.pause();
					// deathsound.play();
					// alert("Bravo Tu as réussis à faire des baguettes!");
					Bravo1.style.display = "block";
					setTimeout(function(){
						location.reload();
					 }, 5000);
									}
				if(currentlvl.innerHTML === "Niveau actuel : niveau 2" && score.innerHTML === "Score : 16"){
					majDessin();
					clearInterval(timerJeu); // le timer qui apelle la fonction à fréquence = delay est arrété
					lvl2.pause();
					// deathsound.play();
					// alert("Bravo Tu as réussis à faire des brioche au chocolat!");
					Bravo2.style.display = "block";
					setTimeout(function(){
						location.reload();
					 }, 5000);

				}
				if(currentlvl.innerHTML === "Niveau actuel : niveau 3" && score.innerHTML === "Score : 20"){
					majDessin();
					clearInterval(timerJeu); // le timer qui apelle la fonction à fréquence = delay est arrété
					lvl2.pause();
					// deathsound.play();
					// alert("Bravo Tu as réussis à faire des Charlotte aux fruits rouges!");
					Bravo3.style.display = "block";
					setTimeout(function(){
						location.reload();
					 }, 5000);

				}
			}
			
			else{
				finPartie(); // sinn la partie se stop
			}
		}

		/* 
			Fonction de déplacement avec les fleches du clavier 
			Les variables snakeDirectionX et snakeDirectionY vont être modifié suivant la touche appuyé.
		*/

		document.addEventListener('keydown', (e)=>{
			switch(e.keyCode){
				case 37: //Gauche
					if(snakeDirectionX==0){
						snakeDirectionX=-1;
						snakeDirectionY=0
					}
				break;	
				case 38: //Haut
					if(snakeDirectionY==0){
						snakeDirectionX=0;
						snakeDirectionY=-1
					}
				break;	
				case 39: //Droite
					if(snakeDirectionX==0){
						snakeDirectionX=1;
						snakeDirectionY=0
					}
				break;
				case 40: //Bas
					if(snakeDirectionY==0){
						snakeDirectionX=0;
						snakeDirectionY=1;
					}
				break;
			}
		})

		/* Fonction qui place la pomme initiale au coordonnées définis puis les suivant au hasard */

		function placeapple(){
			
			if (apple == 0){
				apple = [data["food"][0][0],data["food"][0][1]];
			}
			else{
				apple=[1+Math.floor((NB_COLONNES-2)*Math.random()),1+Math.floor((NB_LIGNES-2)*Math.random())];
				
				for(var i=0,l=mur.length-1;i<l;i++){  // gestion d'erreur en cas da pomme qui spawn sur un mur 
					if((apple[0]==mur[i][0]) && (apple[1]==mur[i][1])){
						placeapple();
					}
				}

				for(var i=0,l=snake.length-1;i<l;i++){  // gestion d'erreur en cas de pomme qui spawn sur sur le snake 
					if((apple[0]==snake[i][0]) && (apple[1]==snake[i][1])){
						placeapple();
					}
				}
			}
			
		}

		

		/*
			
			Fonction de la gestion de la position du serpent

		*/

		function bougeSnake(){
			var tete=[snake[0][0]+snakeDirectionX,snake[0][1]+snakeDirectionY];  // calcul de la position de la nouvelle tete

			if(tete[0]==-1||tete[0]==NB_COLONNES||tete[1]==-1||tete[1]==NB_LIGNES) return false; // verification si le serpent touche un bord

			for(var i=0,l=snake.length-1;i<l;i++){ // à l'aide de la boucle nous allons verifier si le serpent s'est mordu
				if((tete[0]==snake[i][0])&&(tete[1]==snake[i][1])) return false;
			}

			for(var i=0,l=mur.length-1;i<l;i++){ // à l'aide de la boucle nous allons verifier si le seerpent a touché un mur central
				if((tete[0]==mur[i][0])&&(tete[1]==mur[i][1])) return false;
			}

			if((tete[0]==apple[0])&&(tete[1]==apple[1])){ // si la position de la tete = pomme alors ce dernier est mangé 
				placeapple(); // on place une nouvelle pomme
				majScore(snake.length-longueurDecrementableInitiale); // on met à jour le score en pensant bien à enlever du score la taille initiale du serpent (déclaré plus haut)
			}else{
				snake.pop(); // sinon le serpent ne s'allaonge pas 
			}

			snake.unshift(tete); // la nouvelle position de tête est ajouté au début du tableau snake
			return true;
		}

		/* Initialisation du jeu

			Une premiere pomme est placé et un un timer est utilisé pour appeler la fonction {{{boucleJeu}}} avec l'intervalle défini par la variable delay 

		*/

		placeapple();
		var timerJeu=setInterval(boucleJeu,data["delay"]);
		
		if(niveauNumber==1){
			lvl1.play();
			lvl1.volume = 0.25;
			lvl1.loop=true;
		}
		if(niveauNumber==2){
			lvl2.play();
			lvl2.volume = 0.25;
			lvl2.loop=true;
		}
		 
		if(niveauNumber==3){
			lvl3.play();
			lvl3.volume = 0.25;
			lvl3.loop=true;
		}

	});

	window.onclick = function(event) {
		if (event.target == modal) {
		  modal.style.display = "none";
		}
	  }

	span.onclick = function() {
		modal.style.display = "none";
	  }

}



