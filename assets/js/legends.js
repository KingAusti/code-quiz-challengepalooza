let clear = document.getElementById('clear');

legendScores = function() {
    let scores = JSON.parse(window.localStorage.getItem('highScores')) || [];
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    scores.forEach(function(score){
        let li = document.createElement('list');
        li.textItem.textContent = score.champion + ": " + score;
        let list = document.querySelector('#leader-board');
        list.appendChild(li);
    });
};
clearLegends = function() {
    window.localStorage.removeItem('highScores');
    window.location.reload();
}
clear.onclick = clearLegends;

legendScores();