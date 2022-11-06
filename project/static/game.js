/**
 * u2 - Rene Bukovina
 */
var size = 10 //px
var gameWidth = 160 * size //tiles
var gameHeight = 80 * size // tiles
var roadSize = 6 * size //tiles
let currentUser

function addRegisterLogin() {
    const register = document.createElement('BUTTON')
    register.innerText = 'Register'
    register.onclick = () => {
        showRegistePopup()
    }
    document.body.appendChild(register)
}
addRegisterLogin()

function showRegistePopup() {
    const form = document.createElement('div')
    form.id = 'form'
    form.style.padding = '20px'
    form.style.position = 'absolute'
    form.style.maxWidth = '50%'
    form.style.top = '50%'
    form.style.left = '50%'
    form.style.transform = 'translate(-50%,-50%)'
    form.style.background = '#eee'

    const title = document.createElement('h4')
    title.innerText = 'Register'

    const emailLabel = document.createElement('p')
    emailLabel.innerText = 'E-mail'
    const email = document.createElement('input')
    email.id = 'email-input'

    const loginLabel = document.createElement('p')
    loginLabel.innerText = 'Login'
    const login = document.createElement('input')
    login.id = 'login-input'

    const passwordLabel = document.createElement('p')
    passwordLabel.innerText = 'Password'
    const password = document.createElement('input')
    password.id = 'password-input'
    password.type = 'password'

    const repeatPasswordLabel = document.createElement('p')
    repeatPasswordLabel.innerText = 'Repeat Password'
    const repeatPassword = document.createElement('input')
    repeatPassword.id = 'repeat-password-input'
    repeatPassword.type = 'password'

    const submit = document.createElement('button')
    submit.innerText = 'Submit'
    submit.style.display = 'block'
    submit.style.marginTop = '20px'
    submit.onclick = async () => {
        const mail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        if (!email.value.match(mail)) {
            alert('Enter a valid email')
            return
        }

        if (password.value != repeatPassword.value) {
            alert('Passwords do not match')
            return
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                login: login.value,
                password: password.value,
                repeatPassword: repeatPassword.value,
            }),
        })

        alert(await response.text())
    }

    const loginBtn = document.createElement('button')
    loginBtn.innerText = 'loginBtn'
    loginBtn.style.marginTop = '20px'
    loginBtn.onclick = () => switchToLogin()

    const playAsGuest = document.createElement('button')
    playAsGuest.innerText = 'playAsGuest'
    playAsGuest.style.marginTop = '20px'
    playAsGuest.onclick = () => {
        currentUser = {
            name: 'Guest ' + Math.floor(1000 + Math.random() * 9000),
        }
    }

    form.appendChild(title)
    form.appendChild(emailLabel)
    form.appendChild(email)
    form.appendChild(loginLabel)
    form.appendChild(login)
    form.appendChild(passwordLabel)
    form.appendChild(password)
    form.appendChild(repeatPasswordLabel)
    form.appendChild(repeatPassword)
    form.appendChild(submit)
    form.appendChild(loginBtn)
    form.appendChild(playAsGuest)

    document.body.appendChild(form)
}

function switchToLogin() {
    const form = document.getElementById('form')
    form.innerHTML = ''

    const title = document.createElement('h4')
    title.innerText = 'Login'

    const loginLabel = document.createElement('p')
    loginLabel.innerText = 'Login'
    const login = document.createElement('input')
    login.id = 'login-input'

    const passwordLabel = document.createElement('p')
    passwordLabel.innerText = 'Password'
    const password = document.createElement('input')
    password.id = 'password-input'
    password.type = 'password'

    const submit = document.createElement('button')
    submit.innerText = 'Submit'
    submit.style.display = 'block'
    submit.style.marginTop = '20px'
    submit.onclick = async () => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login.value,
                password: password.value,
            }),
        })

        const data = await response.json()
    }

    const register = document.createElement('button')
    register.innerText = 'Register'
    register.style.marginTop = '20px'
    register.onclick = () => {
        document.body.removeChild(form)
        showRegistePopup()
    }

    const playAsGuest = document.createElement('button')
    playAsGuest.innerText = 'playAsGuest'
    playAsGuest.style.marginTop = '20px'
    playAsGuest.onclick = () => {
        currentUser = {
            name: 'Guest ' + Math.floor(1000 + Math.random() * 9000),
        }
    }

    form.appendChild(title)

    form.appendChild(loginLabel)
    form.appendChild(login)
    form.appendChild(passwordLabel)
    form.appendChild(password)
    form.appendChild(submit)
    form.appendChild(register)
    form.appendChild(playAsGuest)

    document.body.appendChild(form)
}

function grid() {
    var gameContainer = document.getElementById('game-container')
    gameContainer.innerHTML = ''
    var gameTable = document.getElementById('game-table')
    if (gameTable === null) {
        gameTable = document.createElement('CANVAS')
        gameTable.id = 'game-table'
        gameTable.width = gameWidth
        gameTable.height = gameHeight
        gameTable.style.background = 'green'
        gameContainer.appendChild(gameTable)
    }
}

function drawWithStyle(points, style) {
    const pe = document.getElementById('game-table')
    const ctx = pe.getContext('2d')
    for (var i = 0; i < points.length; i++) {
        if (typeof points[i] !== 'undefined') {
            if (pe !== null) {
                ctx.fillStyle = style
                ctx.fillRect(points[i][0] * size, points[i][1], size, size)
            }
        } else console.log('points[' + i + '] is undefined')
    }
}

var prevTx = -1
var prevTy = -1
function drawPlayer(tx, ty) {
    var playerPoints = [
        [tx, ty + 1],
        [tx + 1, ty + 1],
        [tx + 2, ty + 1],
        [tx + 3, ty + 1],
        [tx + 4, ty + 1],
    ]
    var wheels = [
        [tx, ty + 1 - size],
        [tx + 3, ty + 1 - size],
        [tx, ty + 1 + size],
        [tx + 3, ty + 1 + size],
    ]
    /**
     * u2 - Rene Bukovina
     */

    var prevPlayerPoints = [
        [prevTx, prevTy],
        [prevTx + 3, prevTy],
        [prevTx, prevTy + 1],
        [prevTx + 1, prevTy + 1],
        [prevTx + 2, prevTy + 1],
        [prevTx + 3, prevTy + 1],
        [prevTx + 4, prevTy + 1],
        [prevTx, prevTy + 2],
        [prevTx + 3, prevTy + 2],
    ]

    if (prevTx === -1) prevPlayerPoints = []
    prevTx = tx
    prevTy = ty

    drawWithStyle(prevPlayerPoints, 'grey')
    drawWithStyle(playerPoints, 'red')
    drawWithStyle(wheels, 'black')
}

function undrawLine() {
    const gameTable = document.getElementById('game-table')
    const ctx = gameTable.getContext('2d')
    ctx.clearRect(0, 0, gameWidth, gameHeight)
}

function fillRoadLine(line) {
    var roadLine = []
    for (var i = 0; i < line.length; i++) {
        for (var j = -roadSize + 1; j < roadSize; j++) {
            roadLine.push([line[i][0], line[i][1] + j])
        }
    }
    return roadLine
}

function fillEdgeLine(line) {
    var edgeLine = []
    for (var i = 0; i < line.length; i++) {
        edgeLine.push([line[i][0], line[i][1] - roadSize])
        edgeLine.push([line[i][0], line[i][1] + roadSize])
    }
    return edgeLine
}

function fillLinePoints(line) {
    return line
        .filter(function (_, index) {
            return index < gameWidth
        })
        .map(function (point, index) {
            return [index, point]
        })
}

function drawEdgeLine(line) {
    var red = []
    var white = []
    var div = 6
    var iterd = iter % div
    var redDivs = []
    var whiteDivs = []
    if (iterd === 0) {
        redDivs = [0, 1, 2]
        whiteDivs = [3, 4, 5]
    } else if (iterd === 1) {
        redDivs = [0, 1, 5]
        whiteDivs = [2, 3, 4]
    } else if (iterd === 2) {
        redDivs = [0, 4, 5]
        whiteDivs = [1, 2, 3]
    } else if (iterd === 3) {
        redDivs = [3, 4, 5]
        whiteDivs = [0, 1, 2]
    } else if (iterd === 4) {
        redDivs = [2, 3, 4]
        whiteDivs = [0, 1, 5]
    } else if (iterd === 5) {
        redDivs = [1, 2, 3]
        whiteDivs = [0, 4, 5]
    }
    red = line.filter(function (point) {
        var point0d = point[0] % div
        return redDivs.indexOf(point0d) > -1
    })
    white = line.filter(function (point) {
        var point0d = point[0] % div
        return whiteDivs.indexOf(point0d) > -1
    })
    drawWithStyle(red, 'red')
    drawWithStyle(white, 'white')
}

function drawLine(line) {
    var linePoints = fillLinePoints(line)
    var road = fillRoadLine(linePoints)
    drawWithStyle(road, 'grey')
    var edge = fillEdgeLine(linePoints)
    drawEdgeLine(edge)
}

function movePlayer(points) {
    playerTy = playerTy + points
    if (playerTy < 0) playerTy = 0
    if (playerTy > gameHeight - 3) playerTy = gameHeight - 3
}

grid()

const socket = new WebSocket('ws://localhost:8082')

// Connection opened
socket.addEventListener('open', (e) => {
    console.log('Connected to WS Server')
    socket.send('start the game ma man')
})

socket.addEventListener('message', (e) => {
    const data = JSON.parse(e.data)
    iter = data.iter
    undrawLine()
    drawLine(data.line)
    drawPlayer(data.playerTx, data.playerTy)
})

// function gameLoop() {
//
// }

document.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 38) movePlayer(-1)
    else if (ev.keyCode === 40) movePlayer(1)
})

/**
 * u2 - Rene Bukovina
 */
