const recipeFactory = (recipeName, recipeStepsIn, ingredientsObj) => {
    let recipeSteps = recipeStepsIn.split('.');
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


let stroganoff = recipeFactory(
    'Stroganoff', (
        'Saute chopped onion & garlic in a little butter. Add meat, cook till completely brown. Add sliced mushrooms & cook with meat. Add soup (undiluted), then sour cream. Heat till hot; sprinkle with parsley. Serve over noodles'
    ), ingredientsToObject(
        "1! lb! ground meat! 1! small! onion! 1! clove! garlic! 1! lb! mushrooms! 1! can! cream of chicken soup! 1! lb! sour cream! 3! c! cooked noodles! 1/2! c! snipped parsley"
    )
);

const buildRecipeList = recipe => {
    let paragraph = document.getElementById("recipe-body");
    let orderedList = ``;
    let unorderedList = ``;
    for (item in recipe._recipeSteps) {
        orderedList += `<li>${recipe.recipeSteps[item]}</li>`;
    };
    for (item in recipe._ingredientsObj) {
        unorderedList += `<li>${recipe.ingredientsObj[item]['quantity']} ${recipe.ingredientsObj[item]['unit of measure']}: ${item}<input type="checkbox" class="ingredient-check-box"></li>`
    };

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

buildRecipeList(stroganoff);