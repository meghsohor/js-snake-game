import { getInputDirection } from './input.js';

const INITIAL_SNAKE_SPEED = 5;
export let SNAKE_SPEED = INITIAL_SNAKE_SPEED; // Speed of snake's movement
const LevelUp = 10; // Increase the speed of snake after eating food 10 times each
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
    if ((snakeBody.length % LevelUp == 0) && (snakeBody.length / LevelUp > 0)) {
        //SNAKE_SPEED = 5 + (snakeBody.length / LevelUp);
        SNAKE_SPEED = INITIAL_SNAKE_SPEED + 3;
    }

    addSegments();

    const inputDirection = getInputDirection();

    // Moving the Snake body one step ahead. Last piece of the body will not be added
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    // Repositioning the Snake head in the new direction in front of the body
    snakeBody[0].x += inputDirection.x; 
    snakeBody[0].y += inputDirection.y;

}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index == 0) {
            return false;
        }
        return equalPositions(segment, position);
    });
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newSegments = 0;
}