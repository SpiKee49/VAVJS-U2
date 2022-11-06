import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8082 })

wss.on('connection', function connection(ws) {
    console.log('Running WS server on port 8082')
})

// var size = 10 //px
// var gameWidth = 160 * size //tiles
// var gameHeight = 80 * size // tiles
// let line = []

// let playerTx = 1
// let playerTy = Math.floor(gameHeight / 2)

// let iter = 0
// let speed = 75
// let score = 0
// let ival

// function random(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min)
// }

// function generateLine() {
//     for (var i = 0; i < gameWidth * 2; i++)
//         line.push(Math.floor(gameHeight / 2))
// }
// generateLine()

// function bumpLine() {
//     var gW = gameWidth / size
//     var gW2 = gW / 2
//     var gW4 = gW / 4
//     var gH = gameHeight / size
//     var gH2 = gH / 2
//     var bump = random(0, gH - 1)
//     var bumpOffset = bump - gH2
//     if (bump < gH2) bumpOffset = gH2 - bump
//     if (bump !== Math.floor(gH2)) {
//         var by = bump
//         var xx = gW + gW4
//         var xy = (bump - gH2) / 2 + gH2
//         if (bump < gH2) xy = bump + bumpOffset / 2
//         var slope = gW2 / bumpOffset
//         var ox = gW + gW2
//         var oy = xy - slope * (ox - xx)
//         if (bump < gH2) oy = slope * (ox - xx) + xy
//         var r = by - oy
//         if (bump < gH2) r = oy - by
//         for (var i = gW + 1; i < gW * 2 - 1; i++) {
//             var fx = i
//             line[i] =
//                 Math.floor(Math.sqrt(r * r - (fx - ox) * (fx - ox)) + oy) * size
//             if (bump < gH2)
//                 line[i] =
//                     -Math.floor(Math.sqrt(r * r - (fx - ox) * (fx - ox)) - oy) *
//                     size
//         }
//     } else {
//         for (var i = gW + 1; i < gW * 2 - 1; i++) {
//             line[i] = Math.floor(gH2)
//         }
//     }
// }

// function collision() {
//     var tx = playerTx
//     var ty = playerTy
//     var playerPoints = [
//         [tx, ty],
//         [tx + 3, ty],
//         [tx, ty + 1],
//         [tx + 1, ty + 1],
//         [tx + 2, ty + 1],
//         [tx + 3, ty + 1],
//         [tx + 4, ty + 1],
//         [tx, ty + 2],
//         [tx + 3, ty + 2],
//     ]

//     var linePoints = fillLinePoints([
//         line[0],
//         line[1],
//         line[2],
//         line[3],
//         line[4],
//         line[5],
//     ])
//     var megaLinePoints = fillRoadLine(linePoints).concat(
//         fillEdgeLine(linePoints)
//     )

//     var allIn = true
//     playerPoints.forEach(function (playerPoint) {
//         var isIn = false
//         megaLinePoints.forEach(function (linePoint) {
//             if (
//                 playerPoint[0] === linePoint[0] &&
//                 playerPoint[1] === linePoint[1]
//             )
//                 isIn = true
//         })
//         if (!isIn) allIn = false
//     })
//     return !allIn
// }

// function moveLine() {
//     line.shift()
//     line.push(Math.floor(gameHeight / 2))
// }

// function gameLoop() {
//     if (iter % (gameWidth / size) === 0 && iter !== 0) {
//         bumpLine()
//     }
//     moveLine()
//     if (iter % (gameWidth * 3) === 0 && iter !== 0) {
//         if (speed > 5) {
//             speed = Math.floor(speed * 0.8)
//             console.log('faster: ' + speed)
//             clearInterval(ival)
//             ival = setInterval(gameLoop, speed)
//         }
//     }

//     if (collision()) {
//         console.log('collision')
//         clearInterval(ival)
//     }
//     iter++
//     score += speed
// }
