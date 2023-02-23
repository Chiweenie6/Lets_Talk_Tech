const logoutForm = async () => {
  const logoutCheck = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (logoutCheck.ok) {
    document.location.replace("/login");
  } else {
    alert(logoutCheck.statusText);
  }
};

document.getElementById("logout").addEventListener("click", logoutForm);
