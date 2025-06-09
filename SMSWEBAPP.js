// When page loads, show Home page
document.addEventListener('DOMContentLoaded', function () {
  showPage('home');
});

// Navbar click = show correct page
document.getElementById('nav-home').onclick = () => showPage('home');
document.getElementById('nav-library').onclick = () => showPage('library');
document.getElementById('nav-message').onclick = () => showPage('message');
document.getElementById('nav-group').onclick = () => showPage('group');
document.getElementById('nav-contact').onclick = () => showPage('contact');

// Get page boxes to show or hide
const PageHome = document.getElementById('page-home');
const PageLibrary = document.getElementById('page-library');
const PageMessage = document.getElementById('page-message');
const PageGroup = document.getElementById('page-group');
const PageContact = document.getElementById('page-contact');

// Show only the page you want
function showPage(page) {
  PageHome.style.display = "none";
  PageLibrary.style.display = "none";
  PageMessage.style.display = "none";
  PageGroup.style.display = "none";
  PageContact.style.display = "none";
  if (page === "home") {
    PageHome.style.display = "flex";
    showLibraries();
    showMessages(); // Show all messages in Home page (LINE ADDED)
  }
  if (page === "library") PageLibrary.style.display = "flex";
  if (page === "message") {
    PageMessage.style.display = "flex";
    fillLibraryDropdown();
  }
  if (page === "group") PageGroup.style.display = "flex";
  if (page === "contact") PageContact.style.display = "flex";
}

// --- LIBRARY LOGIC ---
// Add library and save to storage
document.getElementById('library-submit').onclick = function () {
  let name = document.getElementById('library-name-input').value.trim();
  if (name === "") {
    alert("Please type a library name!");
    return;
  }
  let libraries = JSON.parse(localStorage.getItem('libraries') || "[]");
  libraries.push(name);
  localStorage.setItem('libraries', JSON.stringify(libraries));
  document.getElementById('library-name-input').value = "";
  alert("Library added!");
  showLibraries();
  fillLibraryDropdown();
}

// Show all libraries on Home page
function showLibraries() {
  let box = document.getElementById('library-list');
  let libraries = JSON.parse(localStorage.getItem('libraries') || "[]");
  if (libraries.length == 0) {
    box.innerHTML = "Library<br><span style='color:gray;'>No libraries yet</span>";
    return;
  }
  let list = libraries.map(lib => "<li>" + lib + "</li>").join('');
  box.innerHTML = "Library<ul style='padding-left:20px;margin:0;'>" + list + "</ul>";
}

// Fill dropdown on Add Message page
function fillLibraryDropdown() {
  let select = document.getElementById('library-select');
  select.innerHTML = '<option value="">Select Library</option>';
  let libraries = JSON.parse(localStorage.getItem('libraries') || "[]");
  for (let lib of libraries) {
    let option = document.createElement('option');
    option.value = lib;
    option.text = lib;
    select.appendChild(option);
  }
}

// --- ADD MESSAGE LOGIC ---
// When you click "Submit" in Add Message
document.getElementById('message-submit').onclick = function () {
  let library = document.getElementById('library-select').value;
  let message = document.getElementById('library-message').value.trim();

  if (library === "") {
    alert("Please select a library!");
    return;
  }
  if (message === "") {
    alert("Please type a message!");
    return;
  }

  // Save message for this library
  // All messages stored in: { libraryName: message, ... }
  let messages = JSON.parse(localStorage.getItem('messages') || '{}');
  messages[library] = message;
  localStorage.setItem('messages', JSON.stringify(messages));

  alert("Message saved!");
  document.getElementById('library-message').value = ""; // Clear box
}

// Show all messages on Home page
function showMessages() {
  let box = document.getElementById('message-list');
  let messages = JSON.parse(localStorage.getItem('messages') || '{}');
  let html = "Message";
  let keys = Object.keys(messages);
  if (keys.length === 0) {
    html += "<br><span style='color:gray;'>No messages yet</span>";
  } else {
    html += "<ul style='padding-left:20px;margin:0;'>";
    for (let lib of keys) {
      html += "<li><b>" + lib + "</b>: " + messages[lib] + "</li>";
    }
    html += "</ul>";
  }
  box.innerHTML = html;
}

// --- SEND SMS VALIDATION ---
document.getElementById('sms-submit').onclick = function () {
  const name = document.getElementById('sms-name').value.trim();
  const mobile = document.getElementById('sms-mobile').value.trim();
  const email = document.getElementById('sms-email').value.trim();
  const message = document.querySelector('#page-home textarea').value.trim();

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("❌ Name should have only letters (A-Z or a-z).");
    return;
  }
  if (!/^[0-9]+$/.test(mobile)) {
    alert("❌ Mobile number should have only digits (0-9).");
    return;
  }
  if (!email.includes("@")) {
    alert("❌ Email should contain '@' symbol.");
    return;
  }
  if (message === "") {
    alert("❌ Message cannot be empty.");
    return;
  }
  alert("✅ SMS sent successfully");
};

// --- ADD CONTACT VALIDATION ---
document.getElementById('contact-submit').onclick = function () {
  const name = document.getElementById('contact-name').value.trim();
  const mobile = document.getElementById('contact-mobile').value.trim();
  const email = document.getElementById('contact-email').value.trim();

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("❌ Name should have only letters (A-Z or a-z).");
    return;
  }
  if (!/^[0-9]+$/.test(mobile)) {
    alert("❌ Mobile number should have only digits (0-9).");
    return;
  }
  if (!email.includes("@")) {
    alert("❌ Email should contain '@' symbol.");
    return;
  }
  alert("✅ Contact added successfully");
};
