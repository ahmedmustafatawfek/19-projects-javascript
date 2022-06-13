const   search =document.querySelector("#search"),
        submit = document.querySelector("#submit"),
        random = document.querySelector("#random"),
        mealsEl = document.querySelector("#meals"),
        resultHeading = document.querySelector("#result-heading"),
        single_mealEl = document.querySelector("#single-meal");


// search meal and fetch from api
searchMeal =(e)=>{
    e.preventDefault();

    // clear single meal
    single_mealEl.innerHTML = '';

    // get search term
    const term = search.value;
   
    // check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            resultHeading.innerHTML = 
            `<h2>Search results for: '${term.toUpperCase()}'</h2>`;

            if(data.meals === null){
                resultHeading.innerHTML = 
                `<p>There are no search results. Try again!</p>`;

            }else{
              mealsEl.innerHTML = data.meals.map(meal=>`
                  <div class="meal">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                      <div class="meal-info" data-mealId="${meal.idMeal}">
                          <h3>${meal.strMeal}</h3>
                      </div>
                  </div>
              `).join('');
            }
        })
        // clear search text
            search.value = '';
    }else{
        alert('Please enter a search term')
    }
}

// fetch meal by ID finction
getMealById=(mealID)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res=>res.json())
    .then(data=>{
        const meal = data.meals[0];

        addMealToDOM(meal)
    })
}

// random meal button by fetch
getRandomMeal =()=>{
    // clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>{
        const meal = data.meals[0]

        addMealToDOM(meal)
    })
}


// add meal to DOM
addMealToDOM=(meal)=>{
     const ingredients= []

     for(let i=1; i<=20; i++){
         if(meal[`strIngredient${i}`]){
             ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
         }else{
             break;
         }
     }

     single_mealEl.innerHTML = `
        <div class="single-meal">
          <h1>${meal.strMeal}</h1>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
          </div>
          <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
          </div>
        </div>
     `;
}


// event Listener
submit.addEventListener('submit' , searchMeal)

mealsEl.addEventListener('click' , e=>{
   
//    select the meal by path.find()
    const mealInfo = e.path.find(item =>{
        let Item =item.classList.contains('meal-info')
        if(Item){
            return Item
        }else{return false}
    })

   if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealId')
        getMealById(mealID)
   }
})

random.addEventListener('click' , getRandomMeal)
