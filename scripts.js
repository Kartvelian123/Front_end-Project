// subscribtion validation
const newsletterForm = document.getElementById('subscribe-form');
const newsletterEmailInput = document.getElementById('email-input');
const newsletterMsg = document.getElementById('subscribe-msg');

newsletterForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = newsletterEmailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    showNewsletterMessage("Please enter your email", "red");
  } else if (!emailRegex.test(email)) {
    showNewsletterMessage("Invalid email format", "red");
  } else {
    newsletterEmailInput.value = '';
    showNewsletterMessage("Subscription is sent", "green");
  }
});

function showNewsletterMessage(text, color) {
  newsletterMsg.textContent = text;
  newsletterMsg.style.color = color;

  setTimeout(() => {
    newsletterMsg.textContent = '';
  }, 3000);
}



// footer validation


  function submitEmail() {
    const emailInput = document.getElementById("email1");
    const message = document.getElementById("message");
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      showMessage("Please enter your email", "red");
    } else if (!emailRegex.test(email)) {
      showMessage("Invalid email format", "red");
    } else {
      emailInput.value = "";
      showMessage("Message Sent", "green");
    }
  }

  function showMessage(text, color) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.color = color;
    

    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  }



  //burger-bar
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");

  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });


//რეგისტრაცა
const modal = document.getElementById("registerModal");
const registerButtons = document.querySelectorAll(".register_box");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("registerForm");
const message = document.getElementById("formMessage");


registerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});



closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
  message.textContent = "";
});



window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    form.reset();
    message.textContent = "";
  }
});

// ფორმის ვალიდაცია
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (username === "" || email === "" || password === "" || confirmPassword === "") {
    message.textContent = "Please fill all fields.";
    message.style.color = "red";
    return;
  }

  if (!emailRegex.test(email)) {
    message.textContent = "Invalid email format.";
    message.style.color = "red";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    message.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

  // წარმატება
  message.style.color = "green";
  message.textContent = "Registration successful!";

  // დახურვა 2 წამში
  setTimeout(() => {
    modal.style.display = "none";
    form.reset();
    message.textContent = "";
    message.style.color = "red";
  }, 2000);
});

  

//

const cookieNotice = document.getElementById("cookie-notice");
const acceptBtn = document.getElementById("acceptCookies");

// თუ უკვე "accept" გაკეთებულია, აღარ აჩვენო
if (localStorage.getItem("cookiesAccepted") === "true") {
  cookieNotice.style.display = "none";
}

// ღილაკზე დაჭერისას იმახსოვრებს
acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  cookieNotice.style.display = "none";
});



//scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");

// აჩვენე ღილაკი როცა ჩამოსქროლილია
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// დაჭერისას ამოსქროლე ზედა ნაწილამდე
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



//აპი
let apiData = {};

const cards = document.querySelectorAll('.card');

fetch('https://mocki.io/v1/02582472-7c97-44f4-8974-b007df6b6687')
  .then(res => res.json())
  .then(data => {
    apiData = data;
    initializeCards();
  });

function updateCard(card, category, index) {
  const item = apiData[category][index];
  const titleEl = card.querySelector('h3');
  const sauceEl = card.querySelector('p');
  const priceEl = card.querySelector('.pricee');

  titleEl.textContent = item.name;
  sauceEl.textContent = item.sauce;
  priceEl.textContent = item.price;
}

function initializeCards() {
  const categories = ['burgers', 'combos', 'pizza', 'cake'];

  cards.forEach((card, i) => {
    const category = categories[i]; 
    card.dataset.category = category;
    card.dataset.index = 0;

    updateCard(card, category, 0);

    const leftBtn = card.querySelector('.arrow-btn.light');
    const rightBtn = card.querySelector('.arrow-btn.dark');

    leftBtn.addEventListener('click', () => {
      let index = parseInt(card.dataset.index);
      index = (index - 1 + apiData[category].length) % apiData[category].length;
      card.dataset.index = index;
      updateCard(card, category, index);
    });

    rightBtn.addEventListener('click', () => {
      let index = parseInt(card.dataset.index);
      index = (index + 1) % apiData[category].length;
      card.dataset.index = index;
      updateCard(card, category, index);
    });
  });
}
