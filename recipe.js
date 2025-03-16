document.addEventListener("DOMContentLoaded", function () {
    const recipeContainer = document.querySelector(".recipe-container");
    const recipeDetails = document.querySelector(".recipe-detials");

    // Function to get query parameter from URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Fetch recipe details from API
    function fetchRecipeDetails(recipeId) {
        if (!recipeId) return;

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displayRecipe(data.meals[0]);
                } else {
                    recipeDetails.innerHTML = `<p>Recipe not found.</p>`;
                }
            })
            .catch(error => console.error("Error fetching recipe details:", error));
    }

    // Display recipe details
    function displayRecipe(meal) {
        if (!meal) return;

        // Set meal image
        recipeContainer.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
        `;

        // Get ingredients list
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients += `<li>${measure} ${ingredient}</li>`;
            }
        }

        // Populate recipe details
        recipeDetails.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <h3>Ingredients:</h3>
            <ul>${ingredients}</ul>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        `;
    }

    // Get recipe ID from URL and fetch details
    const recipeId = getQueryParam("id");
    fetchRecipeDetails(recipeId);
});
