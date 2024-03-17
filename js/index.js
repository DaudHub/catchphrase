const button = document.getElementById('start-button')
button.addEventListener('click', initgame)
const categorySelect = document.getElementById('select-categ')
function initgame(event) {
    window.location.href = `game.html?category=${categorySelect.value}`
}