// script.js
document.addEventListener("DOMContentLoaded", function() {
    let jsonData; // Variable pour stocker les données JSON
  
    fetch("faction.json") // Remplacez "faction.json" par le chemin vers votre fichier JSON
      .then(response => response.json())
      .then(data => {
        jsonData = data; // Stocke les données JSON dans la variable jsonData
        // Vous pouvez maintenant utiliser les données JSON pour générer les cartes
        updateCards();
      })
      .catch(error => {
        console.error("Erreur lors du chargement du fichier JSON : ", error);
      });
  
    // Fonction pour générer les cartes
    function generateCard(item) {
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <h2>${item.Factions}</h2>
        <img src="${item.image}" alt="${item.Factions}">
        <p>Personnage: ${item.Personnage}</p>
      `;
  
      return card;
    }
  
    // Fonction pour mettre à jour les cartes en fonction des cases cochées
    function updateCards() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const selectedRaces = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);
  
      const cardContainer = document.querySelector('.factions');
      cardContainer.innerHTML = '';
  
      // Filtrer et afficher les cartes en fonction des cases cochées
      jsonData.forEach(item => {
        if (selectedRaces.includes(item.races)) {
          const card = generateCard(item);
          cardContainer.appendChild(card);
        }
      });
    }
  
    // Ajoutez un gestionnaire d'événements aux cases à cocher pour appeler la fonction updateCards
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateCards);
    });
  });
  