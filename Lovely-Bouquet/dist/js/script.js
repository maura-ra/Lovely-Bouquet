const hamburger = document.querySelector(".ri-menu-3-line");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("menu-active");  
});

window.onscroll = () => {
  menu.classList.remove("menu-active");
};

const btnFilter = document.querySelectorAll(".produk-box ul li");
const imgitem = document.querySelectorAll(".card");

btnFilter.forEach(button => {
    button.onclick = () => {

        // reset active
        btnFilter.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const btnText = button.textContent.toLowerCase();

        imgitem.forEach(img => {

            img.style.display = "none";

            if (
                img.getAttribute("data-filter") === btnText ||
                btnText === "all produk"
            ) {
                img.style.display = "block";
            }

        });

    };
});

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("reviewForm");
  const reviewContainer = document.getElementById("reviewContainer");
  const stars = document.querySelectorAll(".star");
  const ratingInput = document.getElementById("rating");

  let editMode = false;
  let currentEdit = null;

  // ⭐ STAR CLICK
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      ratingInput.value = index + 1;

      stars.forEach((s, i) => {
        s.classList.toggle("active", i <= index);
      });
    });
  });

  // 📝 SUBMIT
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const bouquet = document.getElementById("bouquet").value;
    const reviewText = document.getElementById("reviewText").value;
    const rating = ratingInput.value;

    if (!rating) {
      alert("Please select a rating ⭐");
      return;
    }

    if (editMode) {
      updateReview(currentEdit, name, bouquet, reviewText, rating);
      editMode = false;
      currentEdit = null;
    } else {
      createReview(name, bouquet, reviewText, rating);
    }

    form.reset();
    stars.forEach(s => s.classList.remove("active"));
  });

  function createReview(name, bouquet, reviewText, rating) {
    const reviewBox = document.createElement("div");
    reviewBox.classList.add("review-box");

    reviewBox.innerHTML = `
      <div class="review-header">
        <h3>${name}</h3>
        <div class="review-actions">
          <span class="edit">✏</span>
          <span class="delete">🗑</span>
        </div>
      </div>
      <p><strong>Bouquet:</strong> ${bouquet}</p>
      <p style="color:gold;">${"★".repeat(rating)}</p>
      <p>${reviewText}</p>
    `;

    reviewContainer.appendChild(reviewBox);

    reviewBox.querySelector(".delete").onclick = () => {
      reviewBox.remove();
    };

    reviewBox.querySelector(".edit").onclick = () => {
      document.getElementById("name").value = name;
      document.getElementById("bouquet").value = bouquet;
      document.getElementById("reviewText").value = reviewText;
      ratingInput.value = rating;

      stars.forEach((s, i) => {
        s.classList.toggle("active", i < rating);
      });

      editMode = true;
      currentEdit = reviewBox;
    };
  }

  function updateReview(box, name, bouquet, reviewText, rating) {
    box.querySelector("h3").textContent = name;
    box.querySelector("p:nth-of-type(1)").innerHTML = `<strong>Bouquet:</strong> ${bouquet}`;
    box.querySelector("p:nth-of-type(2)").innerHTML = "★".repeat(rating);
    box.querySelector("p:nth-of-type(3)").textContent = reviewText;
  }

});