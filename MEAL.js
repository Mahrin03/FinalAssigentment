var allArrayData = [];

// Search button click
document.getElementById("searchBtn").addEventListener("click", connect);


function connect() {

    var search = document.getElementById("searchInput").value.trim();

    if (search === "") {
        document.getElementById("status").innerHTML = 
        "<h3>Please enter a meal name</h3>";
        return;
    }

    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    document.getElementById("status").innerHTML = "Loading...";

    fetch(url)
        .then(res => res.json())
        .then(data => display(data))
        .catch(error => {
            document.getElementById("status").innerHTML =
            "<h3>Something went wrong!</h3>";
        });
}



function display(data) {

    allArrayData = data.meals;

    var results = document.getElementById("results");
    var showAllWrap = document.getElementById("showAllWrap");
    var showAllBtn = document.getElementById("showAllBtn");
    var status = document.getElementById("status");


    // clear previous content
    results.innerHTML = "";
    showAllWrap.hidden = true;
    status.innerHTML = "";


    if (allArrayData == null) {

        results.innerHTML = "<h3>No meals found!</h3>";
        return;
    }


    var limit = Math.min(5, allArrayData.length);


    for (var i = 0; i < limit; i++) {

        createMealCard(allArrayData[i], results);

    }


    // show button if more than 5 results
    if (allArrayData.length > 5) {

        showAllWrap.hidden = false;

        showAllBtn.onclick = showAll;
    }

}



// Create meal card
function createMealCard(meal, container) {

    var newDiv = document.createElement("div");

    newDiv.classList.add("innerStyle");


    newDiv.innerHTML = `

        <h3>${meal.strMeal}</h3>

        <img src="${meal.strMealThumb}" width="250">

        <p>
        <b>Meal ID:</b> ${meal.idMeal}
        </p>

        <p>
        <b>Category:</b> ${meal.strCategory}
        </p>

        <p>
        <b>Area:</b> ${meal.strArea}
        </p>

        <p>
        <b>Instructions:</b><br>
        ${meal.strInstructions}
        </p>

    `;


    container.appendChild(newDiv);

}



// Show remaining meals
function showAll() {

    var results = document.getElementById("results");
    var showAllWrap = document.getElementById("showAllWrap");


    for (var i = 5; i < allArrayData.length; i++) {

        createMealCard(allArrayData[i], results);

    }


    // hide button after clicking
    showAllWrap.hidden = true;

}