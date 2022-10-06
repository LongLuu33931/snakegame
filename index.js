var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

window.onload = () => {
  gameLoop();
};

function gameLoop() {
  setInterval(show, 1000 / 20);
}

function show() {
  draw();
  update();
}

function update() {
  snake.move();
  eatApple();
  checkHitWall();
}

function checkHitWall() {
  var head = snake.tail[snake.tail.length - 1];
  if (head.x == -snake.size) {
    head.x = canvas.width - snake.size;
  } else if (head.x == canvas.width) {
    head.x = 0;
  } else if (head.y == -snake.size) {
    head.y = canvas.height - snake.size;
  } else if (head.y == canvas.height) {
    head.y = 0;
  }
}

function eatApple() {
  if (
    snake.tail[snake.tail.length - 1].x == apple.x &&
    snake.tail[snake.tail.length - 1].y == apple.y
  ) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
    apple = new Apple();
  }
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  createRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.tail.length; i++) {
    createRect(
      snake.tail[i].x + 2.5,
      snake.tail[i].y + 2.5,
      snake.size - 5,
      snake.size - 5,
      "white"
    );
  }

  canvasContext.font = "20px Arial";
  canvasContext.fillStyle = "#00FF42";
  canvasContext.fillText(
    "Score: " + (snake.tail.length - 1),
    canvas.width - 250,
    18
  );
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (e) => {
  setTimeout(() => {
    if ((e.keyCode == 37 || e.keyCode == 65) && snake.rotateX != 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if ((e.keyCode == 38 || e.keyCode == 87) && snake.rotateY != 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if ((e.keyCode == 39 || e.keyCode == 68) && snake.rotateX != -1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if ((e.keyCode == 40 || e.keyCode == 83) && snake.rotateY != -1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  });
});

class Snake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 0;
    this.rotateY = 1;
  }

  move() {
    if (this.rotateX == 1) {
      var newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateX == -1) {
      var newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateY == 1) {
      var newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    } else if (this.rotateY == -1) {
      var newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}

class Apple {
  constructor() {
    var isTouching;
    while (true) {
      isTouching = false;
      this.x =
        Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      this.y =
        Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;
      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
          isTouching = true;
        }
      }

      this.color = "red";
      this.size = snake.size;
      if (!isTouching) {
        break;
      }
    }
  }
}

var snake = new Snake(20, 20, 20);

var apple = new Apple();
