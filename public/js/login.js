// Login to existing profile
const loginForm = async (info) => {
  info.preventDefault();

  const username = document.getElementById("username-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (username && password) {
    const loginCheck = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // If the userame and password match
    if (loginCheck.ok) {
      document.location.replace("/profile");
    } else {
      alert(loginCheck.statusText);
    }
  }
};

// Create new profile
const signUpForm = async (event) => {
  event.preventDefault();

  const username = document.getElementById("username-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (username && password) {
    const formInput = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({username, password}),
      headers: {"Content-Type": "application/json"}
    });

    if (formInput.ok) {
      document.location.replace("/profile");
    } else {
      alert(formInput.statusText)
    }
  }
}

document.querySelector(".login-form").addEventListener("submit", loginForm);

document.querySelector(".signup-form").addEventListener("submit", signUpForm)