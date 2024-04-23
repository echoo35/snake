//oyun masası
var blockSize = 25; // Her bir blok boyutunu piksel cinsinden belirtir.
var rows = 20; // Oyun alanının satır sayısını belirtir.
var cols = 20; // Oyun alanının sütun sayısını belirtir.
var board; // Oyun tahtası için bir değişken.
var context; // Oyun tahtasına erişim için bir değişken.

//yılan kafası
var snakeX = blockSize * 5; // Yılanın başlangıç x konumunu belirler.
var snakeY = blockSize * 5; // Yılanın başlangıç y konumunu belirler.

var velocityX = 0; // Yılanın x ekseni üzerindeki hızını belirler.
var velocityY = 0; // Yılanın y ekseni üzerindeki hızını belirler.

var snakeBody = []; // Yılanın vücut kısmını temsil eden bir dizi.

//food
var foodX; // Yiyeceğin x konumunu belirler.
var foodY; // Yiyeceğin y konumunu belirler.

var gameOver = false; // Oyunun durumunu belirler (bitip bitmediğini).

window.onload = function() {
    board = document.getElementById("board"); // Oyun tahtasına erişir.
    board.height = rows * blockSize; // Tahtanın yüksekliğini blok boyutu ile çarparak belirler.
    board.width = cols * blockSize; // Tahtanın genişliğini blok boyutu ile çarparak belirler.
    context = board.getContext("2d"); // Tahtaya çizim yapmak için 2D bağlam oluşturur.

    placeFood(); // Yiyeceği yerleştirir.
    document.addEventListener("keyup", changeDirection); // Klavye tuşlarına basıldığında yönlendirme değişimini dinler.
    setInterval(update, 1000/10); // Oyun güncellemelerini belirli bir süre aralığında gerçekleştirir.
}

function update() {
    if (gameOver) {
        return; // Oyun bittiğinde fonksiyonu sonlandırır.
    }

    context.fillStyle="black"; // Oyun tahtasının rengini siyah olarak ayarlar.
    context.fillRect(0, 0, board.width, board.height); // Oyun tahtasını yeniden çizer.

    context.fillStyle="red"; // Yiyeceğin rengini belirler.
    context.fillRect(foodX, foodY, blockSize, blockSize); // Yiyeceği çizer.

    if (snakeX == foodX && snakeY == foodY) { // Eğer yılan yiyeceği yediğinde...
        snakeBody.push([foodX, foodY]); // Yılanın vücuduna bir parça ekler.
        placeFood(); // Yeni bir yiyecek yerleştirir.
    }

    for (let i = snakeBody.length-1; i > 0; i--) { // Yılanın vücudunu günceller.
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime"; // Yılanın rengini belirler.
    snakeX += velocityX * blockSize; // Yılanın x konumunu günceller.
    snakeY += velocityY * blockSize; // Yılanın y konumunu günceller.
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // Yılanı çizer.
    for (let i = 0; i < snakeBody.length; i++) { // Yılanın vücudunu çizer.
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Oyunun koşulları
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) { // Yılanın tahtanın dışına çıkıp çıkmadığını kontrol eder.
        gameOver = true; // Oyunu sonlandırır.
        alert("Game Over"); // Kullanıcıya oyunun bittiğini bildiren bir mesaj gösterir.
    }

    for (let i = 0; i < snakeBody.length; i++) { // Yılanın vücudu ile çarpışma kontrolü yapar.
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true; // Oyunu sonlandırır.
            alert("Game Over"); // Kullanıcıya oyunun bittiğini bildiren bir mesaj gösterir.
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) { // Yukarı ok tuşuna basıldığında ve yılan aşağı gitmiyorsa...
        velocityX = 0; // Yılanın x hızını sıfırlar.
        velocityY = -1; // Yılanın y hızını ayarlar.
    }
    else if (e.code == "ArrowDown" && velocityY != -1) { // Aşağı ok tuşuna basıldığında ve yılan yukarı gitmiyorsa...
        velocityX = 0; // Yılanın x hızını sıfırlar.
        velocityY = 1; // Yılanın y hızını ayarlar.
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) { // Sol ok tuşuna basıldığında ve yılan sağa gitmiyorsa...
        velocityX = -1; // Yılanın x hızını ayarlar.
        velocityY = 0; // Yılanın y hızını sıfırlar.
    }
    else if (e.code == "ArrowRight" && velocityX != -1) { // Sağ ok tuşuna basıldığında ve yılan sola gitmiyorsa...
        velocityX = 1; // Yılanın x hızını ayarlar.
        velocityY = 0; // Yılanın y hızını sıfırlar.
    }
}

function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize; // Yiyeceğin x konumunu belirler.
    foodY = Math.floor(Math.random() * rows) * blockSize; // Yiyeceğin y konumunu belirler.
}
