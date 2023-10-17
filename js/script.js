document.addEventListener("DOMContentLoaded", function() {
  let jsonData; // Variable to store JSON data

  fetch("faction.json") // Replace "faction.json" with the path to your JSON file
      .then(response => response.json())
      .then(data => {
          jsonData = data; // Store JSON data in the jsonData variable
          updateCards();
      })
      .catch(error => {
          console.error("Error loading JSON file: ", error);
      });

  // Function to generate cards
  function generateCard(item) {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
          <div class="card-header">
              <h2>${item.Factions}</h2> 
          </div>
          <div class="card-body">
              <img src="${item.image}" alt="${item.Factions}">
          </div>
          <div class="card-footer">
              <p>${item.Personnage}</p>
          </div>
      `;

      return card;
  }

  // Function to update cards based on selected checkboxes
  function updateCards() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const selectedRaces = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.name);

      const filteredData = jsonData.filter(item => selectedRaces.includes(item.races));
      displayFilteredCards(filteredData);
  }

  // Function to display filtered cards
  function displayFilteredCards(filteredData) {
      const cardContainer = document.querySelector('.factions');
      cardContainer.innerHTML = '';

      filteredData.forEach(item => {
          const card = generateCard(item);
          cardContainer.appendChild(card);
      });
  }

  // Add an event listener to checkboxes to call the updateCards function
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateCards);
  });

  // Add an event listener to the "Random" button
  const randomButton = document.getElementById('random-button');
  randomButton.addEventListener('click', function() {
      const filteredCards = Array.from(document.querySelectorAll('.card'));
      if (filteredCards.length > 0) {
          // Generate a random index to select a card
          const randomIndex = Math.floor(Math.random() * filteredCards.length);
          const selectedCard = filteredCards[randomIndex];

          // Display the selected card in the modal
          const modal = document.getElementById("myModal");
          const randomfactionName = document.getElementById("random-faction-name");
          const randomfactionImage = document.getElementById("random-faction-image");
          const randomfactionLeader = document.getElementById("random-faction-leader");

          // Extract data from the selected card and display it in the modal
          const factionName = selectedCard.querySelector('.card-header h2').textContent;
          const factionImage = selectedCard.querySelector('.card-body img').src;
          const factionLeader = selectedCard.querySelector('.card-footer p').textContent;

          randomfactionName.textContent = factionName;
          randomfactionImage.src = factionImage;
          randomfactionLeader.textContent = factionLeader;

          // Show the modal
          modal.style.display = "block";
      }
  });

  // Close the modal when the "x" is clicked
  const closeModalButton = document.querySelector(".close");
  closeModalButton.addEventListener('click', function() {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
  });
});
