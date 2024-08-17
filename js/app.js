// Lucky draw
document.getElementById("lucky_box").addEventListener("click", openBox);

function openBox() {
  const gifts = ["iPhone", "MacBook", "Money", "Laptop", "Loser", "Tablet"];
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

  const resultDiv = document.getElementById("result");
  const img_div = document.getElementById("lucky_prize");
  let img = document.createElement("img");
  let myImg = document.getElementsByClassName("gift-box")[0];
  img_div.innerHTML = "";
  resultDiv.innerHTML = "";
  img.style.width = "95px";
  img.style.height = "auto";
  if (randomGift === "Loser") {
    resultDiv.textContent = "Sorry, you didn't win anything this time!";
    resultDiv.style.color = "red";
  } else {
    if (randomGift === "Money") {
      resultDiv.textContent = `Congratulations! You won BDT 200000 Taka`;
      img.src = "../images/Taka.jpg";
    } else {
      switch (randomGift) {
        case "iPhone":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "../images/iphone15_plus.jpg";
          break;
        case "MacBook":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "../images/macbook.webp";
          break;
        case "Laptop":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "../images/laptop.png";
          break;
        case "Tablet":
          resultDiv.textContent = `Congratulations! You won a ${randomGift}`;
          img.src = "../images/tablet.png";
          break;
      }
    }
    myImg.src = "../images/gift_opened.png";
    img_div.appendChild(img);
    resultDiv.style.color = "green";
    celebrate();
  }
}

function celebrate() {
  // Basic confetti explosion
  confetti({
    particleCount: 900,
    spread: 100,
    origin: { y: 0.6 },
  });

  // chain multiple confetti
  setTimeout(() => {
    confetti({
      particleCount: 800,
      spread: 300,
      origin: { y: 0.5 },
    });
  }, 200);
  setTimeout(() => {
    confetti({
      particleCount: 700,
      spread: 500,
      origin: { y: 0.4 },
    });
  }, 300);
  setTimeout(() => {
    confetti({
      particleCount: 600,
      spread: 700,
      origin: { x: 0.5 },
    });
  }, 400);
  setTimeout(() => {
    confetti({
      particleCount: 500,
      spread: 900,
      origin: { x: 0.6 },
    });
  }, 500);
}

// Lucky draw end

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

if (token && userId) {
  document.getElementById("lucky_gift").style.display = "";
  document.getElementById("lucky_title").style.display = "";
  document.getElementById("auth_title").style.display = "none";
} else {
  document.getElementById("lucky_gift").style.display = "none";
  document.getElementById(("lucky_title".style.display = "none"));
  document.getElementById("auth_title").style.display = "";
}
