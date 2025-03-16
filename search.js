document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar");
    const searchButton = document.querySelector(".search-button");

    // Function to get query parameter from URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to fetch and display search results
    function fetchSearchResults(query) {
        if (!query) return;

        searchInput.value = query; // Set input field with query

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => console.error("Error fetching search results:", error));
    }

    // Function to display search results using existing card styling
    function displayResults(data) {
        const resultsContainer = document.querySelector(".recipe-card-wrapper");
        resultsContainer.innerHTML = ""; // Clear previous results

        if (data.meals) {
            data.meals.forEach((meal, index) => {
                const mealCard = document.createElement("div");
                mealCard.classList.add("card");

                // Assign dynamic background images
                const imageClass = `is${(index % 8) + 1}`; // Cycle through is1 - is8 classes

                mealCard.innerHTML = `
                    <div class="img-container ${imageClass}" style="background: url(${meal.strMealThumb}) center / cover no-repeat;"></div>
                    <p>${meal.strMeal}</p>
                    <div class="card-footer">
                        <p>Explore Recipe</p>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                `;

                // Add click event listener to redirect to recipe.html with meal ID
                mealCard.addEventListener("click", function () {
                    window.location.href = `recipe.html?id=${meal.idMeal}`;
                });

                resultsContainer.appendChild(mealCard);
            });
        } else {
            resultsContainer.innerHTML = `<p>No results found for "${searchInput.value}".</p>`;
        }
    }

    // Execute search if query is present in URL
    const query = getQueryParam("query");
    fetchSearchResults(query);

    // Function to handle search redirection
    function handleSearch() {
        const newQuery = searchInput.value.trim();
        if (newQuery) {
            window.location.href = `search.html?query=${encodeURIComponent(newQuery)}`;
        }
    }

    // Event listener for search button
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        handleSearch();
    });

    // Event listener for Enter key in search input
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });
});
