// Obtener usuarios del localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Guardar usuarios
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// REGISTRO
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;
    const msg = document.getElementById("regMsg");

    let users = getUsers();

    // Verificar si ya existe
    if (users.find(u => u.user === user)) {
      msg.style.color = "red";
      msg.textContent = "El usuario ya existe";
      return;
    }

    users.push({ user, pass });
    saveUsers(users);

    msg.style.color = "green";
    msg.textContent = "Usuario registrado ✔";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    const msg = document.getElementById("loginMsg");

    let users = getUsers();

    const validUser = users.find(u => u.user === user && u.pass === pass);

    if (validUser) {
      localStorage.setItem("currentUser", user);
      window.location.href = "dashboard.html";
    } else {
      msg.style.color = "red";
      msg.textContent = "Datos incorrectos";
    }
  });
}

// DASHBOARD
const welcome = document.getElementById("welcomeUser");

if (welcome) {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "login.html";
  } else {
    welcome.textContent = "Bienvenido, " + currentUser + " 🎉";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}