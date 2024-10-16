const form = document.querySelector("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");

// add a submit event listener on the form and prevent the default behaviour
// event propagation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}
function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const captchaValue = captcha.value.trim();
  console.log(
    usernameValue,
    emailValue,
    passwordValue,
    password2Value,
    captchaValue
  );
  // validate the username (empty fields, min length is 5)
  if (usernameValue === "") {
    setError(username, "Username is required");
  } else if (usernameValue.length < 5) {
    setError(username, "minimum username length is 5");
  } else {
    setSuccess(username);
  }
  // validate email (email value must not be empty, email must nclude @)
  if (emailValue === "") {
    setError(email, "email is required");
  } else if (!emailValue.includes("@")) {
    setError(email, "email must include '@' ");
  } else {
    setSuccess(email);
  }
  // password must not be empty and the minimum password length is 7
  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 7) {
    setError(password, "Minimum password character must be 7");
  } else {
    setSuccess(password);
  }
  // confirm password
  if (password2Value === "") {
    setError(password2, "Password is required");
  } else if (password2Value !== passwordValue) {
    setError(password2, "must match first password");
  } else {
    setSuccess(password2);
  }
  // captcha value must not be empty
  if (captchaValue === "") {
    setError(captcha, "Authentication is needed");
  } else {
    setSuccess(captcha);
  }
}

// select that button using the class show-btn
const button = document.querySelector(".show-btn");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const inputType = password.getAttribute("type");
  if (inputType === "password") {
    password.setAttribute("type", "text");
    button.value = "Hide ";
  } else {
    password.setAttribute("type", "password");
    button.value = "show";
  }
});

captcha.addEventListener("input", (e) => {
  // select the image
  const img = document.querySelector("img");
  const text = e.target.value;
  const blurValue = 20 - text.length;
  //   blur(blur)px
  img.style.filter = `blur(${blurValue}px)`;
  if (blurValue <= 0) {
    setSuccess(captcha)
  }else {
    setError(captcha, "Test is not long enough")
  }
});
