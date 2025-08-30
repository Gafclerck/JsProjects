const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const pixel = 20
let snake = [
    {x: 6*pixel ,y: 0},
    {x: 5*pixel ,y: 0},
    {x: 4*pixel ,y: 0},
    {x: 3*pixel ,y: 0}
]
let direction = "RIGHT"
let food = randomFood()
let score = 0

// Dessine la grille une seule fois par frame
function dessinerGrille() {
    ctx.strokeStyle = "#2f3557"
    ctx.lineWidth = 1
    for (let i = pixel; i < canvas.width; i += pixel) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
    }
}

// Générer nourriture qui n’est pas sur le serpent
function randomFood() {
    let pos
    do {
        pos = {
            x: Math.floor(Math.random() * (canvas.width / pixel)) * pixel,
            y: Math.floor(Math.random() * (canvas.height / pixel)) * pixel
        }
    } while (snake.some(part => part.x === pos.x && part.y === pos.y))
    return pos
}

// Mettre à jour la logique
function update() {
    // calculer nouvelle tête selon la direction
    let head = { ...snake[0] }
    if (direction === "RIGHT") head.x += pixel
    if (direction === "LEFT")  head.x -= pixel
    if (direction === "UP")    head.y -= pixel
    if (direction === "DOWN")  head.y += pixel

    // murs (wrap)
    if (head.x >= canvas.width) head.x = 0
    if (head.x < 0) head.x = canvas.width - pixel
    if (head.y >= canvas.height) head.y = 0
    if (head.y < 0) head.y = canvas.height - pixel

    // collision avec soi-même
    if (snake.some(part => part.x === head.x && part.y === head.y)) {
        alert("Game Over! Score : " + score)
        document.location.reload()
    }

    // ajout tête
    snake.unshift(head)

    // manger ?
    if (head.x === food.x && head.y === food.y) {
        score++
        document.querySelector(".score").innerText = "Score : " + score
        food = randomFood()
    } else {
        snake.pop() // pas mangé → enlever la queue
    }
}

// Dessiner tout
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dessinerGrille()

    // snake
    ctx.fillStyle = "#34d399"
    snake.forEach(part => ctx.fillRect(part.x, part.y, pixel, pixel))

    // food
    ctx.fillStyle = "#ff8800"
    ctx.fillRect(food.x, food.y, pixel, pixel)
}

// Boucle du jeu
function loop() {
    update()
    draw()
}
setInterval(loop, 150) // vitesse (150 ms/frame)

// Touches
window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT"
    if (e.key === "ArrowLeft"  && direction !== "RIGHT") direction = "LEFT"
    if (e.key === "ArrowUp"    && direction !== "DOWN") direction = "UP"
    if (e.key === "ArrowDown"  && direction !== "UP") direction = "DOWN"
})
