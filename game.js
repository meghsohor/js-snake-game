// Module import
import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './game_modules/snake.js';
import { update as updateFood, draw as drawFood } from './game_modules/food.js';
import { outsideGrid } from './game_modules/grid.js';


let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.querySelector('#game-board');

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart')) {
            return window.location.reload();
        } else {
            return
        }
    }


    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}