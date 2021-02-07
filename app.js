
const container = document.getElementById('foods');
const searchButton = document.getElementById('searchBtn');
const wrongName = document.getElementById('wrong');

searchButton.addEventListener('click', function () {
    const keyword = document.getElementById('keyword').value;
    container.innerHTML = '';
    if (keyword === '') {
        wrongName.style.display = 'block';
    } else {
        getFood(keyword);
        wrongName.style.display = 'none';
    }
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mainFoodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const mainFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"> Ingredients</h5>
    <ul class="list-unstyled mb-0">
        <li>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li>${food.strMeasure4}, ${food.strIngredient4}</li>
    </ul>

`;
};

function getFood(mealId) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            warning.style.display = 'block';
        }
    };
}
