const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const systemSelect = document.getElementById("system");
const massSlider = document.getElementById("mass");
const gravSlider = document.getElementById("grav");
const dtSlider = document.getElementById("dt");

const massVal = document.getElementById("massVal");
const gravVal = document.getElementById("gravVal");
const dtVal = document.getElementById("dtVal");

const resetBtn = document.getElementById("reset");

let bodies = [];
let G = parseFloat(gravSlider.value);
let dt = parseFloat(dtSlider.value);
let mass = parseFloat(massSlider.value);

// Plummer softening length (astrophysical standard)
const EPS = 5;

massVal.textContent = mass;
gravVal.textContent = G;
dtVal.textContent = dt;

class Body {
    constructor(x, y, vx, vy, m, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 0;
        this.m = m;
        this.color = color;
        this.trail = [];
    }

    draw() {
        this.trail.push([this.x, this.y]);
        if (this.trail.length > 120) this.trail.shift();

        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i][0], this.trail[i][1]);
        }
        ctx.strokeStyle = this.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.cbrt(this.m) * 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initSystem() {
    bodies = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    if (systemSelect.value === "2") {
        bodies.push(new Body(cx - 150, cy, 0, -1.2, mass, "#facc15"));
        bodies.push(new Body(cx + 150, cy, 0, 1.2, mass, "#38bdf8"));
    } else {
        bodies.push(new Body(cx - 120, cy, 0, -1, mass, "#facc15"));
        bodies.push(new Body(cx + 120, cy, 0, 1, mass, "#38bdf8"));
        bodies.push(new Body(cx, cy - 160, 1, 0, mass, "#fb7185"));
    }

    computeAccelerations();
}

function computeAccelerations() {
    for (const b of bodies) {
        b.ax = 0;
        b.ay = 0;
    }

    for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
            const dx = bodies[j].x - bodies[i].x;
            const dy = bodies[j].y - bodies[i].y;
            const r2 = dx * dx + dy * dy + EPS * EPS;
            const r = Math.sqrt(r2);

            const f = G / (r2 * r);

            const fx = f * dx;
            const fy = f * dy;

            bodies[i].ax += fx * bodies[j].m;
            bodies[i].ay += fy * bodies[j].m;

            bodies[j].ax -= fx * bodies[i].m;
            bodies[j].ay -= fy * bodies[i].m;
        }
    }
}

// Velocity Verlet (Leapfrog) integrator
function update() {
    for (const b of bodies) {
        b.vx += 0.5 * b.ax * dt;
        b.vy += 0.5 * b.ay * dt;

        b.x += b.vx * dt;
        b.y += b.vy * dt;
    }

    computeAccelerations();

    for (const b of bodies) {
        b.vx += 0.5 * b.ax * dt;
        b.vy += 0.5 * b.ay * dt;
    }
}

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const b of bodies) {
        b.draw();
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// UI hooks
massSlider.oninput = () => {
    mass = parseFloat(massSlider.value);
    massVal.textContent = mass;
    initSystem();
};

gravSlider.oninput = () => {
    G = parseFloat(gravSlider.value);
    gravVal.textContent = G;
};

dtSlider.oninput = () => {
    dt = parseFloat(dtSlider.value);
    dtVal.textContent = dt;
};

systemSelect.onchange = initSystem;
resetBtn.onclick = initSystem;

initSystem();
loop();
