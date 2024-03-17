var urlParams = new URLSearchParams(window.location.search);
var category = urlParams.get('category');

const titles = {
    variety: 'Variety',
    entertainment: 'Entertainment',
    funAndGames: 'Fun & games',
    everydayLife: 'Everyday life',
    world: 'The world'
}

document.getElementById('game-title').innerText = titles[category]

document.getElementById('start-button').addEventListener('click', startGame)

document.getElementById('quit-button').addEventListener('click', event => window.location.href = 'index.html')

document.getElementById('reset-button').addEventListener('click', () => location.reload())

function startGame(event) {
    document.getElementById('guess-count').innerText = 'Guesses: 0'
    runClock()
    skipPhrase()
    document.getElementById('guessed-button').addEventListener('click', nextPhrase)
    document.getElementById('skip-button').addEventListener('click', skipPhrase)
    document.getElementById('start-button').removeEventListener('click', startGame)
}

async function runClock() {
    await new Promise(async (resolve, reject) => {
        var time = 55
        function oneLessSecond() {
            time = parseInt(document.getElementById('game-timer').innerText.split(':')[1])
            document.getElementById('game-timer').innerText = time - 1 < 10 ? `00:0${time - 1}` : `00:${time - 1}`
            if (time == 0) {
                alert('Time is up!')
                document.getElementById('game-timer').innerText = '00:55'
                document.getElementById('guessed-button').removeEventListener('click', nextPhrase)
                document.getElementById('skip-button').removeEventListener('click', skipPhrase)
                document.getElementById('start-button').addEventListener('click', startGame)
            }
        }
        while (time > 0) {
            await new Promise((resolve, reject) => setTimeout(resolve, 1000))
            oneLessSecond()
        }
        resolve()
    })
}

function nextPhrase() {
    let randomInt = Math.floor(Math.random() * (phrases[category].length - 1))
    document.getElementById('phrase-paragraph').innerText = phrases[category][randomInt]
    let countDisplay = document.getElementById('guess-count')
    let currentCount = parseInt(countDisplay.innerText.split(' ')[1])
    countDisplay.innerText = `Guesses: ${currentCount + 1}`
}

function skipPhrase() {
    let randomInt = Math.floor(Math.random() * (phrases[category].length - 1))
    document.getElementById('phrase-paragraph').innerText = phrases[category][randomInt]
}
