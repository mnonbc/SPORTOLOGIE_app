
const jaugeRemplissage = document.querySelector('.jauge-remplissage');
let remplissage = 0;
const capaciteJauge = 500; // Capacité totale de la jauge en mL



// Tableau contenant les quantités d'eau pour chaque élément
const quantitesEau = {
  'Eau': 250,
  'Jus d\'orange': 110,
  'Coca Cola': 110,
  'Pomme': 130,
  'Compote': 73,
  'Yaourt': 109,
  'Lait': 180,
  'Chocolat au Lait': 165,
  'Pain + Chocolat': 15,
  'Petit Beurre': 2
};

// Fonction pour calculer la quantité totale d'eau des éléments choisis et ajuster la jauge
function remplirJauge() {
  let quantiteTotaleEau = 0;
  let countElements = 0;

  // Parcourir les éléments choisis et ajouter leur quantité d'eau respective
  document.querySelectorAll('.categories div p').forEach((element) => {
    const elementChoisi = element.textContent.trim();
    if (quantitesEau[elementChoisi]) {
      quantiteTotaleEau += quantitesEau[elementChoisi];
      countElements++;
    }
  });

  // Vérifier s'il y a des éléments sélectionnés pour éviter la division par zéro
  if (countElements > 0) {
    remplissage = (quantiteTotaleEau / (countElements * capaciteJauge)) * 100;
  } else {
    remplissage = 0;
  }

  // Calculer le pourcentage de la jauge remplie en fonction de la quantité totale d'eau
  remplissage = (quantiteTotaleEau / capaciteJauge) * 100;
  if (remplissage > 100) {
    remplissage = 100; // Limiter le remplissage à 100% même si la quantité d'eau dépasse la capacité de la jauge
  }

  jaugeRemplissage.style.width = remplissage + '%';

  const pourcentageAffichage = document.querySelector('.pourcentage-remplissage');
  const pourcentageTexte = `${Math.round(remplissage)}%`;
  pourcentageAffichage.textContent = pourcentageTexte;
 console.log('Pourcentage de la jauge :', pourcentageAffichage);


 if (remplissage === 100) {
   const messageText = document.getElementById('messageText');
   messageText.textContent = 'Félicitations ! Vous avez constitué un goûter équilibré.';
   const messageBox = document.getElementById('messageBox');
   messageBox.style.display = 'block';// Affichage de la boîte de message
   // Réinitialiser le jeu ou effectuer d'autres actions après avoir gagné
 }
}


const boissons = ['Eau', 'Jus d\'orange', 'Coca Cola'];
const fruits = ['Pomme', 'Compote'];
const produitsLaitiers = ['Yaourt', 'Lait', 'Chocolat au Lait'];
const produitsCerealiers = ['Pain + Chocolat', 'Petit Beurre'];

const detailsTexteParElement = {
  'Eau': 'L’eau est une boisson saine et rafraîchissante.',
  'Jus d\'orange': 'Le jus d\'orange est une source de vitamine C.',
  'Pomme': 'La pomme est un fruit croquant et plein de saveurs.',
  'Coca Cola': 'Attention, le Coca Cola contient autant d\'eau que le jus d\'orange mais est bien plus sucré.',
};

// Fonction pour gérer la sélection d'éléments
function choisirElement(categorie, elementIndex) {
  let elementChoisi = '';

  switch (categorie) {
    case 'boisson':
      elementChoisi = boissons[elementIndex];
      break;
    case 'fruit':
      elementChoisi = fruits[elementIndex];
      break;
    case 'laitier':
      elementChoisi = produitsLaitiers[elementIndex];
      break;
    case 'cerealier':
      elementChoisi = produitsCerealiers[elementIndex];
      break;
    default:
      break;
  }
/*
  const clignotant = document.getElementById('clignotant');
  const detailsText = document.querySelector('.details-text');
  const fondIcone = document.querySelector('.fond-icone');
  const iconeTexte = document.getElementById('icone-texte');

  console.log(fondIcone);

  if (elementChoisi === 'Coca Cola') {
    console.log('Coca Cola sélectionné');
    fondIcone.classList.add('opacity-visible');
    fondIcone.classList.remove('opacity-hidden');
    iconeTexte.textContent = '?!';
  } else {
    console.log('Autre élément sélectionné');
    fondIcone.classList.remove('opacity-visible');
    fondIcone.classList.add('opacity-hidden');
    iconeTexte.textContent = '?';
  }


  detailsText.textContent = detailsTexteParElement[elementChoisi];
*/


  const categorieDiv = document.querySelector(`.${categorie}`);
  categorieDiv.innerHTML = `<p>${elementChoisi}</p>`;
  remplirJauge();
}



function afficherDetails() {
  const detailsContainer = document.getElementById('details-container');
  if (detailsContainer.style.display === 'none') {
    detailsContainer.style.display = 'block';
  } else {
    detailsContainer.style.display = 'none';
  }
}




function recommencer() {
  // Réinitialiser les sélections d'éléments
  document.querySelectorAll('.categories div p').forEach((element) => {
    element.textContent = ''; // Efface le contenu des éléments sélectionnés
  });

  // Réinitialiser la jauge
  remplissage = 0;
  jaugeRemplissage.style.width = remplissage + '%';

  // Réinitialiser le pourcentage
  const pourcentageAffichage = document.querySelector('.pourcentage-remplissage');
  pourcentageAffichage.textContent = '0%';

  // Cacher le message de félicitations
  const messageBox = document.getElementById('messageBox');
  messageBox.style.display = 'none';

  // Réinitialiser d'autres variables ou compteurs si nécessaire

  // Réinitialiser les détails et l'icône
  const detailsText = document.querySelector('.details-text');
  detailsText.textContent = '';

  const fondIcone = document.querySelector('.fond-icone');
  fondIcone.classList.remove('opacity-visible');
  fondIcone.classList.add('opacity-hidden');

  const iconeTexte = document.getElementById('icone-texte');
  iconeTexte.textContent = '?';
}
