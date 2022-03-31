let clear = document.getElementById('WIPE-HISTORY');

legendScores = function() {
    let scores = JSON.parse(window.localStorage.getItem('highScores')) || [];
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    scores.forEach(function(player){
        let list = document.createElement('li');
        list.textContent = player.initials + ": " + player.score;
        let leaderList = document.getElementById('leader-board');
        leaderList.appendChild(list);
    });
};
clearLegends = function() {
    window.localStorage.removeItem('highScores');
    window.location.reload();
}
clear.onclick = clearLegends;

legendScores();