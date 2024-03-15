//DEBUT anim antoine saut------------------------------------------------

$(document).ready(function() {
  var boutonSaut = $('#changerImageBtn');
  var sarahImageContainer = $('#sarahImageContainer');
  var images = ['img/antoine-avant-saut.png', 'img/antoine-saut.png', 'img/antoine-saut2.png', 'img/antoine-saut3.png', 'img/antoine-saut4.png', 'img/antoine-saut5.png'];
  var originalImage = 'img/antoine-fin-saut.png';

  var currentIndex = 0;
  var isAnimationInProgress = false;

  boutonSaut.on('click', function() {
    // Si l'animation est en cours, ne rien faire
    if (isAnimationInProgress) {
      return;
    }

    // Désactiver le clic sur le bouton pendant l'animation
    isAnimationInProgress = true;

    // Fonction récursive pour changer l'image
    function changeImageRecursive() {
      sarahImageContainer.find('img').attr('src', images[currentIndex]);

      // Incrémentez l'index ou revenez à l'image originale si nécessaire
      currentIndex = (currentIndex + 1) % images.length;

      // Si toutes les images ont été affichées, réinitialisez l'image à l'originale
      if (currentIndex === 0) {
        setTimeout(function() {
          sarahImageContainer.find('img').attr('src', originalImage);
          // Réactivez le clic sur le bouton
          isAnimationInProgress = false;
        }, 200); // Changez cette valeur selon vos besoins
      } else {
        // Appelez récursivement la fonction après un court délai
        setTimeout(changeImageRecursive, 200); // Changez cette valeur selon vos besoins
      }
    }

    // Démarrez la première itération de la fonction récursive
    changeImageRecursive();
  });
});


//MESSAGE choix outil -----------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Attendez que le document soit chargé avant d'ajouter des gestionnaires d'événements

  // Récupérez l'élément de l'image "mesure doigts" par son ID
  var mesureDoigtsImage = document.querySelector(".objets-mesure img[src='img/mesure-doigts.png']");
  var mesureDoubleDecimetreImage = document.querySelector(".objets-mesure img[src='img/mesure-double-decimetre.png']");
  var mesureMetreImage = document.querySelector(".objets-mesure img[src='img/mesure-metre.png']");

  // Ajoutez un gestionnaire d'événements au clic sur l'image
  mesureDoigtsImage.addEventListener("click", function () {
    const messageText = document.getElementById('messageText');
    messageText.textContent = 'Les doigts mesurent 2cm entre les deux traces de main d\'Antoine.';
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'block';
  });

  mesureDoubleDecimetreImage.addEventListener("click", function () {
    const messageText = document.getElementById('messageText');
    messageText.textContent = 'Le double décimètre mesure 34cm entre les deux traces de main d\'Antoine.';
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'block';
  });

  mesureMetreImage.addEventListener("click", function () {
    const messageText = document.getElementById('messageText');
    messageText.textContent = 'Le mètre gradué en mm mesure 33,55cm entre les deux traces de main d\'Antoine.';
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'block';
  });
});
