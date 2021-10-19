const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')

startScreen.addEventListener('click', initializeGame)

let player = { speed: 5, score: 0 }

// ===========================================================================

// problem Statement #1
// Increase the speed of the player by 1 after every 5 seconds, starting speed should always be 5.

// Our task is to increase the speed of vehicle by 1 after every 5 seconds. so By using a web API called setInterval(() => {}) and setTimeout(() => {}) it is possible to implement the problem statement #1

// and most importantly it does it only when our tab is active, if we are roaming over other tabs the game freezes along with the speed and score of our vehicle.

// ==========================================================================

document.addEventListener('visibilitychange', function (event) {
  if (document.hidden) {
    player.speed == player.speed
    player.score == player.score
  } else {
    console.log('visible')
  }
})

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function keyDown(e) {
  e.preventDefault()
  keys[e.key] = true
}

function keyUp(e) {
  e.preventDefault()
  keys[e.key] = false
}

// focus on this piece of code

function isCollide(a, b) {
  aRect = a.getBoundingClientRect()
  bRect = b.getBoundingClientRect()

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  )
}

// ==========================================================================
// Problem Statement #2: Handle the score of the player

// ==========================================================================

function incScore(a, b) {
  let aRect = a.getBoundingClientRect() // myCar
  let bRect = b.getBoundingClientRect() // enemyCar

  if (aRect.bottom <= bRect.top) {
    if (bRect.top - aRect.bottom < player.speed) {
      return (player.score += 10)
    }
  }
}

// ============================================================================

// The below code snippet is a bonus code which helps us in finding the highest score of a particualr player by storing some data in key : value pairs.
// ============================================================================

function highestScore(player) {
  let maxScore = localStorage.getItem('max')
  if (player.score > maxScore) {
    maxScore = player.score
    localStorage.setItem('max', maxScore)
  }
  return maxScore
}

// =================================================================

function moveLines() {
  let lines = document.querySelectorAll('.lines')
  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750
    }
    item.y += player.speed
    item.style.top = item.y + 'px'
  })
}

function endGame() {
  player.start = false
  startScreen.classList.remove('hide')

  // =========================================================================

  const max = highestScore(player)

  if (player.score < max) {
    startScreen.innerHTML = `Game over <br> Your final socre is ${player.score} <br> Your Highest Score is ${max} <br> press here to restart the game. `
  } else {
    startScreen.innerHTML = `Game over <br> $$$$  Congratulations! This is your new Highest Score: ${max}  $$$$<br> Winner winner Chicken Dinner!!! <br> press here to restart the game. `
  }

  // Actual code
  // startScreen.innerHTML =
  //   'Game over <br> Your final socre is ' +
  //   player.score +
  //   ' <br> press here to restart the game.'
  // =========================================================================
}

function moveEnemy(myCar) {
  let enemyCarList = document.querySelectorAll('.enemyCar')

  enemyCarList.forEach(function (enemyCar) {
    if (isCollide(myCar, enemyCar)) {
      endGame()
    }

    // ===========================
    incScore(myCar, enemyCar)
    // ===========================

    if (enemyCar.y >= 750) {
      enemyCar.y = -300
      // horizontal measure of the enemy car is set here using math module.
      enemyCar.style.left = Math.floor(Math.random() * 350) + 'px'
      // enemyCar.style.left = 20 + 'px'
    }

    enemyCar.y += player.speed

    enemyCar.style.top = enemyCar.y + 'px'
  })
}

function runGame() {
  let car = document.querySelector('.myCar')
  let road = gameArea.getBoundingClientRect()

  if (player.start) {
    moveLines()
    moveEnemy(car)

    if (keys.ArrowUp && player.y > road.top + 150) {
      player.y -= player.speed
    }
    if (keys.ArrowDown && player.y < road.bottom - 85) {
      player.y += player.speed
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed
    }

    car.style.top = player.y + 'px'
    car.style.left = player.x + 'px'

    window.requestAnimationFrame(runGame)

    // player.score++
    score.innerText = 'Score: ' + player.score + '\nSpeed: ' + player.speed
  }
}

function initializeGame() {
  startScreen.classList.add('hide')
  gameArea.innerHTML = ''
  // =========================================================================

  // Every thing related to Problem Statement #1 works fine now. All of this is possible because of handleSpeed() function. The function is sitting in the bottom of this file.

  // $$$$$$  Target - 1  achieved! $$$$$

  // ========================================================================

  player.speed = 5
  player.start = true
  player.score = 0
  window.requestAnimationFrame(runGame)

  // =====================
  handleSpeed(player)
  // =====================

  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement('div')
    roadLine.setAttribute('class', 'lines')
    roadLine.y = x * 150
    roadLine.style.top = roadLine.y + 'px'
    gameArea.appendChild(roadLine)
  }

  let car = document.createElement('div')
  car.setAttribute('class', 'myCar')
  gameArea.appendChild(car)

  console.log(car)

  player.x = car.offsetLeft
  player.y = car.offsetTop

  console.log(player)

  for (x = 0; x < 3; x++) {
    let enemyCar = document.createElement('div')
    enemyCar.setAttribute('class', 'enemyCar')
    enemyCar.y = (x + 1) * 350 * -1
    enemyCar.style.top = enemyCar.y + 'px'
    enemyCar.style.left = Math.floor(Math.random() * 350) + 'px'
    gameArea.appendChild(enemyCar)
  }
}

// ========================================================================

function handleSpeed(player) {
  setInterval(() => {
    if (player.speed > 5) {
      player.speed += 1
    } else {
      return player
    }
  }, 5000)

  if (player.speed === 5) {
    setTimeout(() => {
      player.speed += 1
    }, 5000)
  }
}

// ========================================================================
