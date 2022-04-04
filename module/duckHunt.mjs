class Games {
  constructor() {
    this.x = 0;
    this.duck = document.querySelector(".duck");
    this.score = document.querySelector(".score");
    this.timeLeft = document.querySelector(".time");
    this.birds = document.querySelectorAll(".birds");
    this.menu = document.querySelector(".menu");
    this.themeSong = document.querySelector("#theme");
    this.deathSong = document.querySelector("#lose");
    this.winSong = document.querySelector("#win");
    this.easy = document.querySelector(".easy");
    this.medium = document.querySelector(".medium");
    this.hard = document.querySelector(".hard");
  }

  init() {
    this.easy.onclick = () => {
      this.play("Easy");
    };
    this.medium.onclick = () => {
      this.play("Medium");
    };
    this.hard.onclick = () => {
      this.play("Hard");
    };
  }

  randomPosition(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  duckClick() {
    this.moveDuck();
    this.increaseScore();
  }

  birdsClick() {
    this.moveBirds();
    this.decreaseScore();
  }

  timer() {
    setInterval(() => {
      let timer = Number(this.timeLeft.textContent);
      this.timeLeft.textContent = timer - 1;
      if (Number(this.timeLeft.textContent) === 0) {
        this.themeSong.pause();
        this.deathSong.play();
        setTimeout(() => {
          alert("LOSERR!!");
          window.location.reload();
        }, 100);
      }
    }, 1000);
  }

  changePosition(difficulty) {
    let speed;
    if (difficulty === "Easy") {
      speed = 1500;
    } else if (difficulty === "Medium") {
      speed = 1000;
    } else {
      speed = 600;
    }
    setInterval(() => {
      this.moveDuck();
      this.moveBirds();
    }, speed);
  }

  play(difficulty) {
    this.themeSong.play();
    this.menu.style.display = "none";
    this.moveDuck();
    this.moveBirds();
    this.duck.onclick = () => {
      this.duckClick();
    };
    this.birds.forEach((bird) => {
      bird.onclick = () => {
        this.birdsClick();
      };
    });
    this.changePosition(difficulty);
    this.timer();
  }

  increaseScore() {
    let initialScore = Number(this.score.textContent);
    this.score.textContent = initialScore + 10;
    if (Number(this.score.textContent) === 100) {
      this.themeSong.pause();
      this.winSong.play();
      setTimeout(() => {
        alert("You Win!");
        window.location.reload();
      }, 100);
    }
  }

  decreaseScore() {
    let initialScore = Number(this.score.textContent);
    this.score.textContent = initialScore - 20;
  }

  moveDuck() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.duck.style.top = this.randomPosition(h) * 0.5 + "px";
    this.duck.style.left = this.randomPosition(w) * 0.9 + "px";
  }

  moveBirds() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.birds.forEach((bird) => {
      bird.style.top = this.randomPosition(h) * 0.5 + "px";
      bird.style.left = this.randomPosition(w) * 0.9 + "px";
    });
  }
}

export default Games;
