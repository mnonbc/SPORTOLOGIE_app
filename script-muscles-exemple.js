const ressort = document.getElementById('ressort');
const imageRessort = document.querySelector('.ressort-img');
const imageSarah = document.querySelector('.sarah-img');
// Obtention de la hauteur actuelle du ressort
const currentRessortHeight = ressort.clientHeight;

// Définition des états pour l'animation du ressort
const expandedRessortHeight = currentRessortHeight * 1.4; // Augmenter la hauteur
const contractedRessortHeight = currentRessortHeight * 0.3; // Diminuer la hauteur
let animContract = ['img/sarah-ressorts1.png','img/sarah-ressorts2.png','img/sarah-ressorts3.png'];
let animContractInterpol = [150/1745,297/1745,0];
let animContractImgs = [];
let animExpand = ['img/sarah-ressorts4.png','img/sarah-ressorts5.png','img/sarah-ressorts6.png','img/sarah-ressorts6.png','img/sarah-ressorts6.png','img/sarah-ressorts3.png'];
let animExpandInterpol = [.1,.1,.1];
let animExpandImgs = [];

$(function(){ //début
	
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);
	document.addEventListener('touchstart', mouseDown, {passive:false});
	document.addEventListener('touchmove', mouseMove, {passive:false});
	document.addEventListener('touchend', mouseUp, {passive:false});
	document.addEventListener('mousedown', mouseDown);
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);
	
	for (i = 0; i < animContract.length; i++) {
		animContractImgs[i] = new Image();
		animContractImgs[i].src = animContract[i];
	}

	for (i = 0; i < animExpand.length; i++) {
		animExpandImgs[i] = new Image();
		animExpandImgs[i].src = animExpand[i];
	}


});

var contraction_starttime;
var drag_start, drag_last;
var keyloop = null;
function keyDown(e) {
	if (e.repeat) return;
	if (!contraction_starttime)
		contraction_starttime = new Date();

	keyloop = setInterval(()=>{
		contraction_duration = new Date() - contraction_starttime;
		force = Math.min(1, contraction_duration / 1000 / 2); // 2 seconds to get max force
		sarahContract(force);
	}, 30);
}


function mouseDown(e) {
	drag_start = e.clientY || e.targetTouches[0].pageY;
}

function mouseMove(e) {
	drag_last = e.clientY || e.targetTouches[0].pageY;
	if (drag_start && drag_last > drag_start) {
		force = Math.min(imageRessort.height, drag_last - drag_start)/currentRessortHeight;
		sarahContract(force);
	}
}

function sarahContract(force) {
	imgIdx = Math.ceil(force*animContract.length-1);
	if (imgIdx == animContract.length - 1)
		interpol = animContractInterpol[imgIdx];
	else
		interpol = (force*animContract.length)%1*animContractInterpol[imgIdx];
	imageSarah.src = animContract[imgIdx];
	imageSarah.style.transition = 'none';
	imageSarah.style.transform = `scaleY(${1-interpol})`;	
	imageRessort.style.transition = 'none';
	imageRessort.style.transform = `scaleY(${1-force * 0.9})`;	
}

function keyUp(e) {
	clearInterval(keyloop);
	contraction_duration = new Date() - contraction_starttime;
	if (contraction_duration > 1000) e.preventDefault();
	force = Math.min(1, contraction_duration / 1000 / 2); // 2 seconds to get max force
	contraction_starttime = null;
	sarahJump(force)
}

function mouseUp(e) {
	if (drag_start && drag_last > drag_start) {
		force = Math.min(imageRessort.height, drag_last - drag_start)/currentRessortHeight;
		drag_start = null;
		sarahJump(force);
	}
	else {
		drag_start = null;
		drag_last = 0;
	}
}

function sarahJump(force) { // force entre 0 et 1)
	duration=1500;
	sduration='.75s';
	for (i=0; i< animExpand.length;i++) {
		img = animExpand[i];
		setTimeout((img)=>{imageSarah.src = img;}, duration / animExpand.length * i, img);
	}
	imageSarah.style.transition = 'none'
	imageSarah.style.transform = `scaleY(1)`;
	imageSarah.style.transition = 'transform ' + sduration + ' ease-in-out'
	imageSarah.style.transform = `translateY(${0-force*150}px)`;	
	imageRessort.style.transition = 'transform ' + sduration + ' ease-in-out'
	imageRessort.style.transform = `scaleY(${(1 + force * 0.5)})`;

	setTimeout(() => {
		imageRessort.style.transform = "scaleY(1)"; // Retour à la taille initiale après un autre délai
		imageSarah.style.transform = `translateY(0px)`;
	}, duration/2);
	setTimeout(() => {
		imageSarah.src = animContract[1];
			setTimeout(() => {
				imageSarah.src = animContract[0];
			}, 200);
	}, duration);

}

