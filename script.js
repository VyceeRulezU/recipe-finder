document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar");
    const searchButton = document.querySelector(".search-button");

    function performSearch() {
        const query = searchInput.value.trim(); // Get input value & trim spaces
        if (query) {
            window.location.href = `search.html?query=${encodeURIComponent(query)}`; // Redirect with query
        } else {
            alert("Please enter an ingredient or recipe to search.");
        }
    }

    // Search when button is clicked
    searchButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission default behavior
        performSearch();
    });

    // Search when Enter key is pressed
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form behavior
            performSearch();
        }
    });
});
