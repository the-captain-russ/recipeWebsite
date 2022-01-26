const recipeFactory = (recipeName, recipeSteps, ingredientsObj) => {;
    return {
    _recipeName : recipeName,
    _recipeSteps : recipeSteps,
    _ingredientsObj : ingredientsObj,
    get recipeName() {
        return this._recipeName;
    },
    get recipeSteps() {
        return this._recipeSteps;
    },
    get ingredientsObj() {
        return this._ingredientsObj;
    }
    };
}

const ingredientsToObject = ingredients => {
    let iArr = ingredients.split('!');
    
    let iObj = {};
    for (let i = 0; i < iArr.length; i += 3) {
        iObj[iArr[i+2]] = {
        'quantity' : iArr[i],
        'unit of measure' : iArr[i+1] 
        };
    }
    return iObj;
}

const recipeName = document.getElementById('name-upload');
const recipePicture = document.getElementById('picture-upload');
let recipleArray = [];
let ingredientObj = {};
let stepsArray = [];
let recipes = [];

const submitIngredient = () => {
    const qty = document.getElementById('ingredients-qty-upload');
    const uom = document.getElementById('ingredients-uom-upload');
    const item = document.getElementById('ingredients-item-upload');
    document.getElementById('ingredients-list').innerHTML += `<li>${qty.value} ${uom.value}: ${item.value}</li>`;
    ingredientObj[item.value] = {
        'quantity': qty.value,
        'unit of measure': uom.value
    };
    qty.value = "";
    uom.value = "";
    item.value = "";
    qty.focus();
}

const submitStep = () => {
    const step = document.getElementById('steps-upload');
    document.getElementById('steps-list').innerHTML += `<li>${step.value}</li>`;
    stepsArray.push(step.value);
    step.value="";
    step.focus();
}

const buildRecipe = () => {
    console.log(`Name: ${recipeName.name}, Ingredients: ${ingredientObj}, Steps: ${stepsArray}`);
    recipes.push(recipeFactory(recipeName, stepsArray, ingredientObj));
    stepsArray = [];
    ingredientObj = {};
    document.getElementById('steps-list').innerHTML = "";
    document.getElementById('ingredients-list').innerHTML = "";
}

let stroganoff = recipeFactory(
    'Stroganoff', (
        'Saute chopped onion & garlic in a little butter. Add meat, cook till completely brown. Add sliced mushrooms & cook with meat. Add soup (undiluted), then sour cream. Heat till hot; sprinkle with parsley. Serve over noodles'
    ), ingredientsToObject(
        "1! lb! ground meat! 1! small! onion! 1! clove! garlic! 1! lb! mushrooms! 1! can! cream of chicken soup! 1! lb! sour cream! 3! c! cooked noodles! 1/2! c! snipped parsley"
    )
);

const buildRecipeList = () => {
    for (recipe in recipes) {
        let paragraph = document.getElementById("recipe-body");
        let orderedList = ``;
        let unorderedList = ``;
        for (item in recipe._recipeSteps) {
            orderedList += `<li>${recipe.recipeSteps[item]}</li>`;
        };
        for (item in recipe._ingredientsObj) {
            unorderedList += `<li>${recipe.ingredientsObj[item]['quantity']} ${recipe.ingredientsObj[item]['unit of measure']}: ${item}<input type="checkbox" class="ingredient-check-box"></li>`
        }

    paragraph.innerHTML = (
        `<img class=\"recipe-image\" src=\"./images/recipes/${recipe.recipeName.toLowerCase()}.jpeg\" alt=\"${recipe.recipeName} Dish after Cooking\">
        <h2>${recipe.recipeName}<h2>
        <img class=\"recipe-image\" src=\"./images/recipes/${recipe.recipeName.toLowerCase()}_front.jpg\" alt=\"${recipe.recipeName} Recipe Card Front\">
        <img class=\"recipe-image\" src=\"./images/recipes/${recipe._recipeName.toLowerCase()}_back.jpg\" alt=\"${recipe.recipeName} Recipe Card Back\">
        <h3>Recipe Ingredients</h3>
        <ul id="recipe-ingredients">${unorderedList}</ul>
        <h3>Recipe Steps</h3>
        <ol>${orderedList}</ol>`
        );
    }
}

//buildRecipeList(stroganoff);