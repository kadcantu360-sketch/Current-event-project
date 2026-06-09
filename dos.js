
function run() {
    if (window.location.href.includes("gameOver.html")) {
        const queryString = window.location.search; 
        const urlParams = new URLSearchParams(queryString);
        reasonForGameOver = parseInt(urlParams.get("reasonForGameOver"));

        if (reasonForGameOver === 0) {
            document.body.style.backgroundImage = "url('win.png')";
        } else if (reasonForGameOver === 1) {
            document.body.style.backgroundImage = "url('broke.png')";
        } else if (reasonForGameOver === 2) {
            document.body.style.backgroundImage = "url('power.png')";
        } else if (reasonForGameOver === 3) {
            document.body.style.backgroundImage = "url('FSAlose.png')";
        }
    }
    requestAnimationFrame(run);
}
run();