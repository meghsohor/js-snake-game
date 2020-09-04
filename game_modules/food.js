import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';


// The X and Y must be greater than 1 as in grid based layout 0 means outside the box
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }


}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition = null;
    
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}