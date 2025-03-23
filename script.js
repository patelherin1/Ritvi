let images = ["assets/photo1.jpg", "assets/photo2.jpg", "assets/photo3.jpg", "assets/photo4.jpg", "assets/photo5.jpg"];
let index = 0;

function startSlideshow() {
    setInterval(() => {
        index = (index + 1) % images.length;
        document.getElementById("slide").src = images[index];
    }, 3000);
}

function toggleMusic() {
    let music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * -5 - 2;
        this.color = color;
    }

    Particle.prototype.update = function () {
        this.y += this.speedY;
        this.speedY += 0.1;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    function createFireworks() {
        let x = Math.random() * canvas.width;
        let y = canvas.height;
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.y < 0) particles.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    setInterval(createFireworks, 700);
    animate();
}

document.addEventListener("DOMContentLoaded", () => {
    startSlideshow();
    startFireworks();
});
