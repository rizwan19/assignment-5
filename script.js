const getMeal = (meal) => {
    document.getElementById('detail-area').innerHTML = '';
    const food = document.getElementById('food-card');
    food.innerHTML = ``;
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+meal)
    .then(response => response.json())
    .then(data => {
        data.meals.forEach(meal => {
            //console.log(meal);
            const tag = `
                <div class="card" style="width: 15rem;">
                    <img onclick="getDetail(${meal.idMeal})" src="${meal.strMealThumb}" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
            `;
            food.innerHTML = food.innerHTML + tag;
        });
    })
    .catch((error) => {
        const errorMessage = `<h3>Sorry! Not found.</h3>`;
        food.innerHTML = errorMessage;
    });
}

// search button implementation
document.getElementById('submitBtn').addEventListener('click', ()=>{
    const textInput = document.getElementById('text-input').value;
    if(textInput != '')
        getMeal(textInput);
});

// text input onsubmit implementation
document.getElementById('text-input').addEventListener('keyup', (event) => {
    if(event.keyCode == 13)
    {
        const textInput = document.getElementById('text-input').value;
        if(textInput != '')
            getMeal(textInput);
    }
});

// meal detail implementation
const ul = document.getElementById('ingredient-list');
const getDetail = (idMeal) => {
    const detailArea = document.getElementById('detail-area');
    detailArea.innerHTML = '';
    ul.innerHTML = ''
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+idMeal)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        // Array ingredients contain the measurements and elements of the recipe
        const ingredients = [meal.strMeasure1+" "+meal.strIngredient1, meal.strMeasure2+" "+meal.strIngredient2, meal.strMeasure3+" "+meal.strIngredient3, meal.strMeasure4+" "+meal.strIngredient4, meal.strMeasure5+" "+meal.strIngredient5, meal.strMeasure6+" "+meal.strIngredient6, meal.strMeasure7+" "+meal.strIngredient7, meal.strMeasure8+" "+meal.strIngredient8, meal.strMeasure9+" "+meal.strIngredient9, meal.strMeasure10+" "+meal.strIngredient10, meal.strMeasure11+" "+meal.strIngredient11, meal.strMeasure12+" "+meal.strIngredient12, meal.strMeasure13+" "+meal.strIngredient13, meal.strMeasure14+" "+meal.strIngredient14, meal.strMeasure15+" "+meal.strIngredient15, meal.strMeasure16+" "+meal.strIngredient16, meal.strMeasure17+" "+meal.strIngredient17, meal.strMeasure18+" "+meal.strIngredient18, meal.strMeasure19+" "+meal.strIngredient19, meal.strMeasure20+" "+meal.strIngredient20];

        let properIngredientList = []; // It excludes the null values of the ingredients
        ingredients.map(ingredient => {
            if(ingredient!=null && ingredient!="" && ingredient!="  " && ingredient!=" null" && ingredient!=" ")
            {
                properIngredientList.push(ingredient);
            }   
        })

        // meal detail contains the detail information of the meals
        const mealDetail = `
            <img src="${meal.strMealThumb}"/>
            <h5>${meal.strMeal}</h5>
            <h6>Ingredients</h6>
        `
        detailArea.innerHTML = mealDetail;
        //console.log(ul);
        properIngredientList.forEach(properIngredient => {
            li = document.createElement('li');
            li.innerText = properIngredient;
            ul.appendChild(li);
        })
        detailArea.appendChild(ul);
        goToTop(); // this method takes the window to the top
    })
};

// goes to top of the page
const goToTop = () => {
    window.scrollTo(0, 0);
}