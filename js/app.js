// Lucky draw
document.getElementById("magicBox").addEventListener("click", openBox);

function openBox() {
  const gifts = ["iPhone", "MacBook", "Money", "Laptop", "Loser", "Tablet"];
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

  const resultDiv = document.getElementById("result");
  let img = document.createElement("img");
  let myImg = document.getElementsByClassName("gift-box")[0];
  resultDiv.innerHTML = "";
  img.style.width = "95px";
  img.style.height = "auto";
  const img_div = document.getElementById("lucky_prize");
  if (randomGift === "Loser") {
    resultDiv.textContent = "Sorry, you didn't win anything this time!";
    resultDiv.style.color = "red";
  } else {
    if (randomGift === "Money") {
      resultDiv.textContent = `Congratulations! You won BDT 200000 Taka`;
      img.src = "./images/Taka.jpg";
    } else {
      switch (randomGift) {
        case "iPhone":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "./images/iphone15_plus.jpg";
          break;
        case "MacBook":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "./images/macbook.webp";
          break;
        case "Laptop":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "./images/laptop.png";
          break;
        case "Tablet":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "./images/tablet.png";
          break;
      }
    }
    myImg.src = "./images/gift_opened.png";
    img_div.appendChild(img);
    resultDiv.style.color = "green";
    celebrate();
  }
}

function celebrate() {
  // Basic confetti explosion
  confetti({
    particleCount: 1400,
    spread: 100,
    origin: { y: 0.6 },
  });

  // chain multiple confetti
  setTimeout(() => {
    confetti({
      particleCount: 1300,
      spread: 300,
      origin: { y: 0.5 },
    });
  }, 300);
  setTimeout(() => {
    confetti({
      particleCount: 1200,
      spread: 500,
      origin: { y: 0.4 },
    });
  }, 400);
  setTimeout(() => {
    confetti({
      particleCount: 1100,
      spread: 700,
      origin: { y: 0.3 },
    });
  }, 500);
  setTimeout(() => {
    confetti({
      particleCount: 900,
      spread: 900,
      origin: { y: 0.2 },
    });
  }, 600);
  setTimeout(() => {
    confetti({
      particleCount: 700,
      spread: 1100,
      origin: { x: 0.2 },
    });
  }, 700);
  setTimeout(() => {
    confetti({
      particleCount: 500,
      spread: 1300,
      origin: { x: 0.3 },
    });
  }, 800);
  setTimeout(() => {
    confetti({
      particleCount: 300,
      spread: 1500,
      origin: { x: 0.4 },
    });
  }, 900);
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 1700,
      origin: { x: 0.5 },
    });
  }, 1000);
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 1900,
      origin: { x: 0.6 },
    });
  }, 1100);
}

// Lucky draw end
