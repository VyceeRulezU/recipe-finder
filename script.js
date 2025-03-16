document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar");
    const searchButton = document.querySelector(".search-button");
    const recipeContainer = document.querySelector(".recipe-card-wrapper");

    // Function to perform search and redirect to search.html
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        } else {
            alert("Please enter an ingredient or recipe to search.");
        }
    }

    // Event listeners for search functionality
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        performSearch();
    });

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });

    // Function to fetch and display random meals
    function fetchRandomMeals(count = 8) {
        if (!recipeContainer) return; // Prevent errors if not on home page
        recipeContainer.innerHTML = ""; // Clear previous content

        for (let i = 0; i < count; i++) {
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        const meal = data.meals[0];
                        createRecipeCard(meal, i);
                    }
                })
                .catch(error => console.error("Error fetching random meals:", error));
        }
    }

    // Function to create and display a recipe card
    function createRecipeCard(meal, index) {
        const mealCard = document.createElement("div");
        mealCard.classList.add("card");

        // Assign dynamic background images (is1 - is8)
        const imageClass = `is${(index % 8) + 1}`;

        mealCard.innerHTML = `
            <div class="img-container ${imageClass}" style="background: url(${meal.strMealThumb}) center / cover no-repeat;"></div>
            <p>${meal.strMeal}</p>
            <div class="card-footer">
                <p>Explore Recipe</p>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        `;

        // Click event to redirect to recipe details
        mealCard.addEventListener("click", function () {
            window.location.href = `recipe.html?id=${meal.idMeal}`;
        });

        recipeContainer.appendChild(mealCard);
    }

    // Fetch random meals on page load (only if the container exists)
    if (recipeContainer) {
        fetchRandomMeals();
    }
});
