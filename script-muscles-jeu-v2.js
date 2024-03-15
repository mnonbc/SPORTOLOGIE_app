gameData = {

	board : null,
	boardWidth : 352,
	boardHeight : 237,
	context : null,

	//Sarah
	sarahWidth : 150,
	sarahHeight : 150,
	sarahImgWidth : 500,
	sarahContractedHeight : 120,
	sarahX : 10,
	sarahImg : null,
	sarahJumpImg : null,

	sarah : {},

	//obstacles

	obstacleWidth : 60,
	obstacleImgWidth : 149,
	obstacleImgHeight : 286,
	obstableNonCollisionZone : 0.5,
	obstacleX : 800,

	//physics
	velocityX : -1.8, //obstacle moving
	velocityY : 0,
	jumpAcceleration : 5,
	gravity : .08,

	gameOver : false,
	score : 0,
	anim : ['img/muscles-anim1.png','img/muscles-anim2.png','img/muscles-anim3.png','img/muscles-anim4.png'],
	animIdx : 0,
	animSpeed : 1/8,
	obstacles : ['img/muscles-obstacle1.png','img/muscles-obstacle2.png','img/muscles-obstacle3.png'],
	obstaclesArray : [],
	scheduledPlacements : [],
}

window.onload = function() {
	gameData.sarahSizeRatio = gameData.sarahWidth/gameData.sarahImgWidth,
	gameData.sarahJumpCollisionHeight = 270*gameData.sarahSizeRatio,
	gameData.sarahY = gameData.boardHeight - gameData.sarahHeight,
	gameData.animWidth = [400*gameData.sarahSizeRatio, 250*gameData.sarahSizeRatio, 380*gameData.sarahSizeRatio, 280*gameData.sarahSizeRatio],
	gameData.obstacleSizeRatio = gameData.obstacleWidth/gameData.obstacleImgWidth,
	gameData.obstacleY = gameData.boardHeight - gameData.obstacleImgHeight * gameData.obstacleSizeRatio,
	gameData.obstacleHeight = gameData.obstacleImgHeight * gameData.obstacleSizeRatio;
	gameData.obstaclesHeight = [227*gameData.obstacleSizeRatio, 253*gameData.obstacleSizeRatio, 286*gameData.obstacleSizeRatio],
	gameData.ressort = document.getElementById('ressort2'),
	gameData.imageRessort = document.querySelector('.ressort-img2'),
	// Obtention de la hauteur actuelle du ressort
	gameData.currentRessortHeight = gameData.ressort.clientHeight,

	// Définition des états pour l'animation du ressort
	gameData.expandedRessortHeight = gameData.currentRessortHeight * 1.4, // Augmenter la hauteur
	gameData.contractedRessortHeight = gameData.currentRessortHeight * 0.3, // Diminuer la hauteur

	gameData.board = document.getElementById("board");
	gameData.board.height = gameData.boardHeight;
	gameData.board.width = gameData.boardWidth;

	gameData.context = gameData.board.getContext("2d"); //used for drawing on the board

	// preload images
	for (i = 0; i < gameData.anim.length; i++) {
		imgName = gameData.anim[i];
		gameData.anim[i] = new Image();
		gameData.anim[i].src = imgName;
	}
	gameData.sarahImg = new Image();

	gameData.sarahImg = gameData.anim[gameData.animIdx];
	gameData.sarahImg.onload = function(){
		gameData.context.drawImage(gameData.sarahImg, gameData.sarah.x, gameData.sarah.y, gameData.sarah.width, gameData.sarah.height);
	}
	gameData.sarahJumpImg = new Image();
	gameData.sarahJumpImg.src = "img/muscles-saut.png";

	for (i = 0; i < gameData.obstacles.length; i++) {
		imgName = gameData.obstacles[i];
		gameData.obstacles[i] = new Image();
		gameData.obstacles[i].src = imgName;
	}

	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);
	document.addEventListener('touchstart', mouseDown, {passive:false});
	document.addEventListener('touchmove', mouseMove, {passive:false});
	document.addEventListener('touchend', mouseUp, {passive:false});
	document.addEventListener('touchend', mouseUp, {passive:false});
	document.addEventListener('mousedown', mouseDown);
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);

	start();
}

function start() {
	gameData.gameOver = false;
	gameData.score = 0;
	gameData.obstaclesArray = [];
	gameData.animIdx = 0;
	gameData.velocityY = 0;
	gameData.sarah = {
		x : gameData.sarahX,
		y : gameData.sarahY,
		width : gameData.sarahWidth,
		height : gameData.sarahHeight,
		contracted : false
	}

	// Relancer le jeu
	requestAnimationFrame(update);

	gameData.imageRessort.style.transform = "scaleY(1)"; // Retour à la taille initiale après un autre délai
	setTimeout(place1stObstacle, 2000); //1000milliseconds = 1sec
}
function update(){
	if (gameData.gameOver) {
		messageText = document.getElementById('messageText');
		messageText.innerHTML = `Dommage, c'est perdu !<br>Votre score est de <strong>${Math.floor(gameData.score)}.</strong>`;
		messageBox = document.getElementById('messageBox');
		messageBox.style.display = 'block';
		return;
	}

	gameData.context.clearRect(0,0, gameData.board.width, gameData.board.height);
	sarahBoundingBox = {}
	//sarah
	if (gameData.sarah.contracted && gameData.sarah.height > gameData.sarahContractedHeight) {
		gameData.sarah.height -= 0.4;
	}
	else if (gameData.sarah.height < gameData.sarahHeight) {
		gameData.sarah.height += 0.5;
	}
	if (gameData.sarah.y + gameData.velocityY < gameData.sarahY) { // if jumping
		if (gameData.velocityY < 0)
			gameData.velocityY += gameData.gravity;
		else
			gameData.velocityY += gameData.gravity*0.25;
		gameData.sarah.y = gameData.sarah.y + gameData.velocityY; //apply gravity to current sarah.y
		gameData.sarahImg = gameData.sarahJumpImg;
		sarahBoundingBox = {x:gameData.sarah.x, y:gameData.sarah.y, width:gameData.sarah.width, height: gameData.sarahJumpCollisionHeight};
	}
	else {
		gameData.sarah.y = gameData.sarahY;
		gameData.velocityY = 0;
		gameData.sarahImg = gameData.anim[Math.floor(gameData.animIdx)];
		imgWidth = gameData.animWidth[Math.floor(gameData.animIdx)];
		sarahBoundingBox = {x:gameData.sarah.x+gameData.sarah.width/2-imgWidth/2, y:gameData.sarah.y + (gameData.sarahHeight - gameData.sarah.height), width:imgWidth, height: gameData.sarah.height};
	}
	gameData.context.drawImage(gameData.sarahImg, gameData.sarah.x, gameData.sarah.y + (gameData.sarahHeight - gameData.sarah.height), gameData.sarah.width, gameData.sarah.height);
	gameData.animIdx = (gameData.animIdx+gameData.animSpeed) % gameData.anim.length;

	//obstacles movement and collision
	for (let i = 0; i < gameData.obstaclesArray.length; i++){
		let obstacle = gameData.obstaclesArray[i];
		obstacle.x += gameData.velocityX;
		gameData.context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

		if (detectCollision(sarahBoundingBox, obstacle)) {
			gameData.gameOver = true;
			// cancel all next placements
			for (p = 0; p < gameData.scheduledPlacements.length; p++) {
				clearTimeout(gameData.scheduledPlacements[p]);
			}
		}
	}

	//score
	gameData.context.fillStyle = "black";
	gameData.context.font = "20px lora";
	gameData.score += gameData.animSpeed/2;
	gameData.context.fillText(Math.floor(gameData.score),150,20);

	requestAnimationFrame(update);
}

function keyDown(e) {
	if (e.repeat) return;
	gameData.contraction_starttime = new Date()
	if (gameData.gameOver)
		recommencer();
	if (gameData.velocityY != 0)
		return;
	gameData.sarah.contracted = true;

	// durée maximale de l'animation de compression tant que le bouton est appuyé
	gameData.imageRessort.style.transition = 'transform 1.5s ease-in-out';
	// Application des états d'animation en alternance
	gameData.imageRessort.style.transform = `scaleY(${gameData.contractedRessortHeight / gameData.currentRessortHeight})`;
}

function keyUp(e) {
	if (gameData.gameOver)
		return;
	if (gameData.velocityY != 0)
		return;
	contraction_duration = new Date() - gameData.contraction_starttime;
	if (contraction_duration > 1000) e.preventDefault();
	force = Math.min(1, contraction_duration / 1000 / 1.5); // duration get max force

	sarahJump(force)
}

function mouseDown(e) {
	if (gameData.gameOver || gameData.velocityY != 0) {
		return;
	}
	gameData.sarah.contracted = true;
	gameData.drag_start = e.clientY || (e.targetTouches && e.targetTouches[0].pageY);
}

function mouseMove(e) {
	if (gameData.gameOver || gameData.velocityY != 0) {
		return;
	}
	gameData.drag_last = e.clientY || (e.targetTouches && e.targetTouches[0].pageY);
	if (gameData.drag_start && gameData.drag_last > gameData.drag_start) {
		force = Math.min(gameData.imageRessort.height, gameData.drag_last - gameData.drag_start)/gameData.currentRessortHeight;
		gameData.imageRessort.style.transition = 'none';
		gameData.imageRessort.style.transform = `scaleY(${1-force * 0.9})`;
	}
}

function mouseUp(e) {
	if (gameData.gameOver || gameData.velocityY != 0) {
		return;
	}
	if (gameData.drag_start && gameData.drag_last > gameData.drag_start) {
		force = Math.min(gameData.imageRessort.height, gameData.drag_last - gameData.drag_start)/gameData.currentRessortHeight;
		gameData.drag_start = null;
		sarahJump(force);
	}
	else {
		gameData.drag_start = null;
		gameData.drag_last = 0;
		sarahJump(0.1);
	}
}

function sarahJump(force) { // force entre 0 et 1)
	gameData.drag_start = null;
	gameData.sarah.contracted = false;
	if (gameData.sarah.y == gameData.sarahY) {
		// durée maximale de l'animation de décompression au relachement du bouton
		gameData.imageRessort.style.transition = 'transform .5s ease-in-out'
		// Application des états d'animation en alternance
		gameData.imageRessort.style.transform = `scaleY(${(1 + force * 0.5)})`;

		setTimeout(() => {
			gameData.imageRessort.style.transform = "scaleY(1)"; // Retour à la taille initiale après un autre délai
		}, 600);

		//jump
		gameData.velocityY = -gameData.jumpAcceleration * force;
	}
}

function place1stObstacle() {
	placeObstacle(.5);
}

function placeObstacle(placeObstacleChance = 0) {
	if (gameData.gameOver)
		return;
	//place obstacle
	let obstacle = {
		img : null,
		x : gameData.obstacleX,
		y : gameData.obstacleY,
		width : gameData.obstacleWidth,
		height : gameData.obstacleHeight,
		collisionHeight: null
	}

	if (placeObstacleChance == 0)
		placeObstacleChance = Math.random(); //0 - 0.99999...

	// console.log("placeObstacle", obstaclesArray.length, placeObstacleChance)

    if (placeObstacleChance > 0.90) { //10% you get obstacle3
      obstacle.img = gameData.obstacles[2];
      obstacle.collisionHeight = gameData.obstaclesHeight[3];
      gameData.obstaclesArray.push(obstacle);
    }
    else if (placeObstacleChance > 0.60) { //40% you get obstacle2
      obstacle.img = gameData.obstacles[1];
      obstacle.collisionHeight = gameData.obstaclesHeight[1];
      gameData.obstaclesArray.push(obstacle);
    }
    else { //you get obstacle1
      obstacle.img = gameData.obstacles[0];
      obstacle.collisionHeight = gameData.obstaclesHeight[0];
      gameData.obstaclesArray.push(obstacle);
    }

    if (gameData.obstaclesArray.length > 7) {
      gameData.obstaclesArray.shift(); //remove the first element from the array so that the arraw doesn't constantly grow
    }
	gameData.scheduledPlacements.push(setTimeout(placeObstacle, 5000)); //1000milliseconds = 1sec
}

function detectCollision(s, o) {
	// show bounding box
	// gameData.context.strokeRect(s.x, s.y,  s.width,  s.height);
	// gameData.context.strokeRect(o.x + gameData.obstableNonCollisionZone * o.width, o.y + o.height - o.collisionHeight,  o.width - gameData.obstableNonCollisionZone * o.width,  o.height);
	return s.x + s.width > o.x + gameData.obstableNonCollisionZone * o.width && s.x < o.x + o.width &&
           s.y + s.height > o.y + o.height - o.collisionHeight && s.y < o.y + o.height;
}

function recommencer() {

	// Masquer le message de fin
	messageBox = document.getElementById('messageBox');
	messageBox.style.display = 'none';

	// Effacer le canevas
	gameData.context.clearRect(0, 0, gameData.board.width, gameData.board.height);

	start();
}
