document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mediaBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("disabled")) return;

      const card = btn.closest(".card");
      const container = (card && card.querySelector(".mediaContainer")) || document.querySelector(".mediaContainer");
      const wishBtn = document.querySelector(".wish");

      container.classList.add("top-12");
      btn.classList.add("disabled");

      const img = document.createElement("img");
      img.src = btn.dataset.img || "images/candles.gif";
      img.alt = btn.dataset.imgAlt || "surprise image";
      img.style.width = "50%";
      img.loading = "lazy";

      const audio = document.createElement("audio");
      audio.src = btn.dataset.audio || "song.mp3";
      audio.preload = "auto";
      audio.style.display = "none";

      container.appendChild(img);
      container.appendChild(audio);

      audio.play().catch(err => {
        console.warn("Autoplay prevented:", err);
      });

      const scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;

      audio.addEventListener("ended", () => {
        if (wishBtn)
          wishBtn.style.display = "block";
          wishBtn.classList.add("bottom-12");
      });
    });
  });
  
  const gift = document.getElementById("gift");
  if (gift) {
    const surpriseBox = document.getElementById("surpriseBox");
    let surprises = [];
    const imageFolder = "images/";
    const imageNames = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];

    for (let i = 0; i < imageNames.length; i++) {
        surprises.push(`<img src="${imageFolder}${imageNames[i]}" style="width:600px; margin-bottom: 24px;">`);
    }

    let lastIndex = -1;
    gift.addEventListener("click", function() {
      if (!surpriseBox) return console.warn("No #surpriseBox found to show surprise.");
      this.classList.toggle("open");
      if (this.classList.contains("open"))
        document.querySelector('.gift-box').src = 'images/open-gift.png';
      else
        document.querySelector('.gift-box').src = 'images/closed-gift.png';
      if (this.classList.contains("open")) {
        let random;
        do { random = Math.floor(Math.random() * surprises.length); }
        while (surprises.length > 1 && random === lastIndex);
        lastIndex = random;
        surpriseBox.innerHTML = surprises[random];
      } else {
        surpriseBox.innerHTML = "";
      }
    });
  } else {
    // optional debug log
    // console.log("#gift element missing on this page — gift logic skipped.");
  }

});

document.addEventListener("DOMContentLoaded", () => {
    showHearts();

  function showHearts() {
    const container = document.getElementById("balloonContainer");
    const colors = ["#FF6B6B", "#FFB6C1", "#FF8FAB", "#F473B9", "#F9A8D4", "#FF4C8B"];
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.background = colors[Math.floor(Math.random() * colors.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heart.style.animationDuration = 4 + Math.random() * 4 + "s";
      heart.style.width = 40 + Math.random() * 20 + "px";
      heart.style.height = 36 + Math.random() * 18 + "px";
      container.appendChild(heart);

      heart.addEventListener("animationend", () => heart.remove());
    }

    // remove container after all hearts disappear
    setTimeout(() => container.remove(), 9000);
  }
});


