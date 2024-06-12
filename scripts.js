function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    document.body.appendChild(star);

    setTimeout(() => {
        document.body.removeChild(star);
    }, 2000);
}

setInterval(createShootingStar, 1000);
