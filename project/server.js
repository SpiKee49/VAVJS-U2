/**
 * u2 - Rene Bukovina
 */

import express from 'express'

const app = express()
const port = 8080

app.use(express.static('static'))
app.use(express.json({ extended: false }))

let players = []

app.post('/register', function (req, res) {
    const data = req.body
    if (
        players.length > 0 &&
        (players.map((item) => item.email).includes(data.email) ||
            players.map((item) => item.login).includes(data.login))
    ) {
        res.status(400)
            .send('Account with same email or login already exists')
            .end()
    } else {
        players.push({
            id: players.length + 1,
            email: data.email,
            login: data.login,
            password: data.password,
            logged: 'false',
            playerTx: data.playerTx,
            playerTy: data.playerTy,
        })
        res.status(200)
            .send('User successfully registered. Continue with logging in')
            .end()
    }
})

app.post('/login', function (req, res) {
    const data = req.body
    if (
        players.length === 0 ||
        !players.map((item) => item.login).includes(data.login)
    ) {
        res.status(400)
            .send(`User with login ${data.login} does not exist`)
            .end()
    }

    const userIndex = players.map((item) => item.login).indexOf(data.login)

    if (players[userIndex].password != data.password) {
        return res.status(400).send('Wrong password. Please try again.').end()
    }
    res.status(200).json(players[userIndex]).end()
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
/**
 * u2 - Rene Bukovina
 */
