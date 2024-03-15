const questions = [
  {
    question: "1/ Pour aller à l’école ou voir des amis, combien de jours dans la semaine te déplaces-tu à vélo, à trottinette (non-électrique), en skate ou en roller\u00A0?",
    options: ["Jamais", "1 fois par semaine", "Entre 2 et 4 fois par semaine", "Plus de 4 fois par semaine"],
    customValues: [0, 1, 3, 5] // Valeurs personnalisées correspondant à chaque option
  },
  {
    question: "2/ En moyenne, par jour, combien de temps te prennent tes trajets à pied, à vélo, en trottinette (non-électrique), en skate ou en roller\u00A0?",
    options: ["Moins de 5 min par jour", "Entre 5 et 15 min par jour", "Entre 15 et 25 min par jour", "Plus de 25 min par jour"],
    customValues: [4, 10, 20, 30]
  },
  {
    question: "3/ Quand tu es à l’école, tu as cours d’EPS en moyenne\u00A0:",
    options: ["Je n’ai pas de cours d’EPS car je suis dispensé", "2h par semaine", "3h par semaine", "4h par semaine ou plus"],
    customValues: [0, 120, 180, 240]
  },
  {
    question: "4/ Quand je suis à l’école, pendant les récréations et la pause déjeuner, il t’arrive de jouer à des jeux de ballon, au ping-pong ou de danser\u00A0:",
    options: ["Jamais", "1 jour par semaine", "Entre 2 et 4 jours par semaine", "5 jour ou plus par semaine"],
    customValues: [0, 1, 3, 5]
  },
  {
    question: "5/ Quand tu joues à des jeux de ballon, au ping-pong ou quand tu danses, combien de temps en moyenne cela te prend par jour\u00A0?",
    options: ["Je ne joue pas", "Entre 5 et 30min par jour", "Entre 30 et 50min par jour", "1h par jour ou plus"],
    customValues: [0, 15, 40, 60]
  },
  {
    question: "6/ Combien de jours dans la semaine pratiques-tu un ou plusieurs sports en club\u00A0?",
    options: ["Je n’en pratique pas", "1 jour par semaine", "Entre 2 et 3 jour par semaine", "4 jour ou plus par semaine"],
    customValues: [0, 1, 3, 5]
  },
  {
    question: "7/ Au total par semaine, le temps cumulé de cette ou ces activités sportives s’élève à\u00A0:",
    options: ["30min par semaine ou moins", "Entre 1h et 3h par semaine", "Entre 3h et 6h par semaine", "7h ou plus"],
    customValues: [30, 180, 300, 420]
  },
  {
    question: "8/ Pendant ton temps de loisir, combien de temps par semaine pratiques-tu une activité physique d’intensité modérée ou élevée (danse, vélo, piscine, VTT, course à pied, …)\u00A0?",
    options: ["Je n’en fais pas", "Entre 30min et 2h par semaine", "Entre 2h et 5h par semaine", "6h par semaine ou plus"],
    customValues: [0, 60, 240, 360]
  },
  {
    question: "9/ Pendant la semaine, en moyenne par jour, combien de temps passes-tu devant les écrans\u00A0? ",
    options: ["Plus de 3h par jour", "3h par jour", "2h par jour", "Moins d’1h par jour"],
    customValues: [4, 3, 2, 1]
  },
  {
    question: "10/ Pendant le week-end, en moyenne par jour, combien de temps passes-tu devant les écrans\u00A0?",
    options: ["Plus de 3h par jour", "3h par jour", "2h par jour", "Moins d’1h par jour"],
    customValues: [4, 3, 2, 1]
  }
  // Ajoutez d'autres questions ici
];


let currentQuestion = 0;
let answers = [];

function afficherQuestion() {
  const questionText = document.getElementById('question-text');
  const form = document.getElementById('question-form');
  const validerBtn = document.getElementById('valider');

  questionText.textContent = questions[currentQuestion].question;
  form.innerHTML = '';

  questions[currentQuestion].options.forEach((option, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = `option_${index}`;
    input.name = 'question';
    input.value = option;
    input.classList.add('option-input');

    const label = document.createElement('label');
    label.setAttribute('for', `option_${index}`);
    label.textContent = option;

    const wrapper = document.createElement('div');
    wrapper.classList.add('option-wrapper');
    wrapper.appendChild(input);
    wrapper.appendChild(label);

    form.appendChild(wrapper);

    input.addEventListener('change', () => {
      clearOptionStyles();
      if (input.checked) {
        label.style.backgroundColor = '#CCACDA';
        label.style.border = '2px solid #CCACDA';
      } else {
        label.style.backgroundColor = '#FFF';
        label.style.border = '2px solid #FFF';
      }
      answers[currentQuestion] = questions[currentQuestion].customValues[index]; // Met à jour la réponse avec la valeur personnalisée correspondante
    });

  });

  validerBtn.style.display = 'block';

  if (currentQuestion === questions.length - 1) {
    validerBtn.textContent = 'Voir Résultat';
  } else {
    validerBtn.textContent = 'Valider';
  }
}

function clearOptionStyles() {
  const labels = document.querySelectorAll('.option-wrapper label');
  labels.forEach((label) => {
    label.style.backgroundColor = '#FFF'; // Fond noir par défaut
  });
}



function suivant() {
  const options = document.querySelectorAll('input[type="radio"]:checked');
  if (options.length > 0) {
    answers.push(options[0].value);
  } else {
    answers.push(null);
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    afficherQuestion();
  } else {
    afficherResultat();
  }
}

function afficherResultat() {
  const questionContainer = document.getElementById('question-container');
  const resultat = document.getElementById('resultat');
  const resultatContainer = document.querySelector('.resultat-container');
  const retourBtn = document.getElementById('retour-btn');

  document.getElementById('retour-btn').addEventListener('click', function() {
      window.location.href = 'sport.html';
  });

  questionContainer.style.display = 'none';
  resultat.style.display = 'block';
  retourBtn.style.display = 'flex';


  let score = 0;
  let score2 = 0;

  // Calcul du score en fonction des réponses aux questions
  score += answers[0] * answers[1]; // Question 1 * Question 2
  score += answers[2]; // Question 3
  score += answers[3] * answers[4]; // Question 4 * Question 5
  score += answers[6]; // Question 7
  score += answers[7]; // Question 8

  score2 += answers[8];
  score2 += answers[9];

  console.log("Valeurs des réponses:", answers);
  console.log("Score final:", score);

  let resultHTML = '<h1>Résultat Final :</h1>';

  resultHTML += `<h2>Activité physique :<br><b>environ ${score}min par semaine.</b></h2>`;
  resultHTML += `<h2>Temps devant les écrans :<br><b>environ ${score2}h par semaine.</b></h2>`;

  // Détermination de la réponse en fonction du score
  if (score < 420) {
    resultHTML +=  "<p>Il semble que tu ne bouges pas assez&nbsp;! Il faut essayer de bouger davantage. Profites des différentes occasions (à l’école, lors de tes déplacements…) pour essayer de bouger&nbsp;! 60 minutes par jour sont recommandées, fractionnées par tranches de 10 minutes.</p>";
  } else if (score >= 420 && score <= 600) {
    resultHTML +="<p>Tu pratiques des activités physiques régulières et ceci va avoir plusieurs bienfaits pour ta santé&nbsp;! N’hésite pas à en faire plus, si tu en as envie, car toute activité supplémentaire est bénéfique pour ta santé.</p>";
  } else if (score > 600) {
    resultHTML += "<p>Super, tu es très actif&nbsp;!! Continue ainsi&nbsp;! Tu pratiques des activités physiques régulières et ceci va avoir plusieurs les bienfaits pour ta santé&nbsp;! N’hésite pas à en faire plus, si tu en as envie, car toute activité supplémentaire est bénéfique pour ta santé.</p>";
  } else {
    resultHTML += "<p>Erreur dans les réponses.</p>";
  }

  if (score2 <= 2) {
    resultHTML += "<p>C’est très bien&nbsp;! Continue ainsi&nbsp;! Toutes les minutes encore en moins passées devant tes écrans seront bénéfiques pour ta santé&nbsp;!</p>";
  } else if (score2 > 2){
    resultHTML += "<p> Attention, tu passes trop de temps devant les écrans&nbsp;! Il faut réduire un maximum ton temps passé devant les écrans car ils sont néfastes pour ta santé&nbsp;!</p>";
  } else {
    resultHTML += "<p>Erreur dans les réponses.</p>";
  }

  resultatContainer.innerHTML = resultHTML;
  resultatContainer.style.display = 'block';

}


afficherQuestion();
