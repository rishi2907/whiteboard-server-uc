const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

var nodes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // draw();
}

// function draw() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
// }

window.onresize = resize;
// function move(e) {
    
//     if (e.buttons) {
//         console.log(e);
//         context.fillStyle = 'green';
//         context.beginPath();
//         context.arc(e.x, e.y,1, 0, Math.PI * 2, true)
//         context.strokeStyle = e.strokeStyle;
//         context.stroke();
//         // context.stroke();
//         context.fill();
//     }
// }
var lastPoint;
// function move(e) {
//     if (e.buttons) {
//         if (!lastPoint) {
//             lastPoint = { x: e.offsetX, y: e.offsetY };
//             return;
//         }
//         context.beginPath();
//         context.moveTo(lastPoint.x, lastPoint.y);
//         context.lineTo(e.offsetX, e.offsetY);
//         context.strokeStyle = 'green';
//         context.lineWidth = 5;
//         context.lineCap = 'round';
//         context.stroke();
//         lastPoint = { x: e.offsetX, y: e.offsetY };
//     }
// }
function key(e) {
    if (e.key === 'Backspace') {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

window.onkeydown = key;
window.onmousemove = move;
resize();

function broadcast(data) {
    Object.values(peerConnections).forEach(peer => {
        console.log(peer);
        console.log("rishi")
        peer.send(data);
    });
}

function onPeerData(id, data) {
    draw(JSON.parse(data));
}

function draw(data) {
    console.log(data)
    context.beginPath();
    context.moveTo(data.lastPoint.x, data.lastPoint.y);
    context.lineTo(data.x, data.y);
    context.strokeStyle = data.color;
    context.lineWidth = Math.pow(1, 4) * 2;
    context.lineCap = 'round';
    context.stroke();
}

color = 'green'
function move(e) {
    if (e.buttons) {
        if (!lastPoint) {
            lastPoint = { x: e.offsetX, y: e.offsetY };
            return;
        }

        draw({
            lastPoint,
            x: e.offsetX,
            y: e.offsetY,
            color: 'green'
        });

        broadcast(JSON.stringify({
            lastPoint,
            x: e.offsetX,
            y: e.offsetY,
            color: 'green',
        }));

        lastPoint = { x: e.offsetX, y: e.offsetY };
    }
}