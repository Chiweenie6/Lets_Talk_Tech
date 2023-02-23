const loginForm = async (info) => {
  info.preventDefault();

  const username = document.getElementById("floatingUsername").value.trim();
  const password = document.getElementById("floatingPassword").value.trim();

  if (username && password) {
    const loginCheck = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (loginCheck.ok) {
      document.location.replace("/");
    } else {
      alert("Login failed 🚫");
    }
  }
};

document.querySelector(".loginForm").addEventListener("submit", loginForm);
