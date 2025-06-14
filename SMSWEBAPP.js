// Show Home when page loads
document.addEventListener('DOMContentLoaded', function () {
  showPage('home');
});

// Navbar clicks
document.getElementById('nav-home').onclick = () => showPage('home');
document.getElementById('nav-library').onclick = () => showPage('library');
document.getElementById('nav-message').onclick = () => showPage('message');
document.getElementById('nav-group').onclick = () => showPage('group');
document.getElementById('nav-contact').onclick = () => showPage('contact');

// Page boxes
const PageHome = document.getElementById('page-home');
const PageLibrary = document.getElementById('page-library');
const PageMessage = document.getElementById('page-message');
const PageGroup = document.getElementById('page-group');
const PageContact = document.getElementById('page-contact');

// Show one page at a time
function showPage(page) {
  PageHome.style.display = "none";
  PageLibrary.style.display = "none";
  PageMessage.style.display = "none";
  PageGroup.style.display = "none";
  PageContact.style.display = "none";

  if (page === "home") {
    PageHome.style.display = "flex";
    showLibraries();
    showGroups();
  }

  if (page === "library") PageLibrary.style.display = "flex";
  if (page === "message") {
    PageMessage.style.display = "flex";
    fillLibraryDropdown();
  }

  if (page === "group") PageGroup.style.display = "flex";
  if (page === "contact") {
    PageContact.style.display = "flex";
    fillGroupDropdown();
  }
}

// --- Add Library ---
document.getElementById('library-submit').onclick = function () {
  let name = document.getElementById('library-name-input').value.trim();
  if (name === "") return alert("Please type a library name!");

  let libraries = JSON.parse(localStorage.getItem('libraries') || "[]");
  libraries.push(name);
  localStorage.setItem('libraries', JSON.stringify(libraries));

  document.getElementById('library-name-input').value = "";
  alert("Library added!");
  showLibraries();
  fillLibraryDropdown();
};

// Show clickable libraries
function showLibraries() {
  let box = document.getElementById('library-list');
  let libraries = JSON.parse(localStorage.getItem('libraries') || "[]");

  if (libraries.length === 0) {
    box.innerHTML = "Library<br><span style='color:gray;'>No libraries yet</span>";
    return;
  }

  let html = "Library<ul>";
  for (let lib of libraries) {
    html += `<li style="cursor:pointer;" onclick="showMessageForLibrary('${lib}')">${lib}</li>`;
  }
  html += "</ul>";
  box.innerHTML = html;
}

// Fill dropdown on Add Message
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

// --- Add Message ---
document.getElementById('message-submit').onclick = function () {
  let library = document.getElementById('library-select').value;
  let message = document.getElementById('library-message').value.trim();

  if (library === "") return alert("Please select a library!");
  if (message === "") return alert("Please type a message!");

  let messages = JSON.parse(localStorage.getItem('messages') || '{}');
  messages[library] = message;
  localStorage.setItem('messages', JSON.stringify(messages));

  alert("Message saved!");
  document.getElementById('library-message').value = "";
};

// Show message for selected library
function showMessageForLibrary(libraryName) {
  let box = document.getElementById('message-list');
  let messages = JSON.parse(localStorage.getItem('messages') || '{}');
  let msg = messages[libraryName];

  if (!msg) {
    box.innerHTML = "Message<br><span style='color:gray;'>No message found</span>";
    return;
  }

  box.innerHTML = `Message<ul><li style="cursor:pointer;" onclick="fillSmsMessage('${msg.replace(/'/g, "\\'")}')">${libraryName}: ${msg}</li></ul>`;
}

// Fill SMS textarea with message
function fillSmsMessage(msg) {
  document.querySelector('#page-home textarea').value = msg;
}

// --- SMS Validate ---
document.getElementById('sms-submit').onclick = function () {
  const name = document.getElementById('sms-name').value.trim();
  const mobile = document.getElementById('sms-mobile').value.trim();
  const email = document.getElementById('sms-email').value.trim();
  const message = document.querySelector('#page-home textarea').value.trim();

  if (!/^[A-Za-z ]+$/.test(name)) return alert("❌ Name must be letters only.");
  if (!/^[0-9]+$/.test(mobile)) return alert("❌ Mobile must be numbers only.");
  if (!email.includes("@")) return alert("❌ Email must contain '@'.");
  if (message === "") return alert("❌ Message can't be empty.");

  alert("✅ SMS sent!");
};

// --- Add Group ---
document.getElementById('group-submit').onclick = function () {
  let groupName = document.getElementById('group-name-input').value.trim();
  if (groupName === "") return alert("Please enter a group name.");

  let groups = JSON.parse(sessionStorage.getItem('groups') || "[]");
  groups.push(groupName);
  sessionStorage.setItem('groups', JSON.stringify(groups));
  document.getElementById('group-name-input').value = "";
  alert("Group added!");
  showGroups();
};

// Show clickable groups
function showGroups() {
  let box = document.getElementById('groups-list');
  let groups = JSON.parse(sessionStorage.getItem('groups') || "[]");

  if (groups.length === 0) {
    box.innerHTML = "Groups<br><span style='color:gray;'>No groups yet</span>";
    return;
  }

  let html = "Groups<ul>";
  for (let g of groups) {
    html += `<li style="cursor:pointer;" onclick="showContacts('${g}')">${g}</li>`;
  }
  html += "</ul>";
  box.innerHTML = html;
}

// --- Add Contact ---
document.getElementById('contact-submit').onclick = function () {
  const group = document.getElementById('group-select').value;
  const name = document.getElementById('contact-name').value.trim();
  const mobile = document.getElementById('contact-mobile').value.trim();
  const email = document.getElementById('contact-email').value.trim();

  if (!/^[A-Za-z ]+$/.test(name)) return alert("❌ Name must be letters only.");
  if (!/^[0-9]+$/.test(mobile)) return alert("❌ Mobile must be numbers only.");
  if (!email.includes("@")) return alert("❌ Email must have '@'.");

  let contacts = JSON.parse(sessionStorage.getItem("contacts") || "{}");
  if (!contacts[group]) contacts[group] = [];
  contacts[group].push({ name, mobile, email });
  sessionStorage.setItem("contacts", JSON.stringify(contacts));

  alert("✅ Contact added!");
  document.getElementById('contact-name').value = "";
  document.getElementById('contact-mobile').value = "";
  document.getElementById('contact-email').value = "";
};

// Show contacts for selected group
function showContacts(groupName) {
  let box = document.getElementById("contact-list");
  let contacts = JSON.parse(sessionStorage.getItem("contacts") || "{}");

  if (!contacts[groupName] || contacts[groupName].length === 0) {
    box.innerHTML = "Contact Details<br><span style='color:gray;'>No contacts</span>";
    return;
  }

  let html = `Contact Details for <b>${groupName}</b><ul>`;
  for (let c of contacts[groupName]) {
    html += `<li style="cursor:pointer;" onclick="fillSmsContact('${c.name}', '${c.mobile}', '${c.email}')">${c.name} - ${c.mobile} - ${c.email}</li>`;
  }
  html += "</ul>";
  box.innerHTML = html;
}

// Fill SMS name, mobile, email
function fillSmsContact(name, mobile, email) {
  document.getElementById('sms-name').value = name;
  document.getElementById('sms-mobile').value = mobile;
  document.getElementById('sms-email').value = email;
}

// Fill dropdown in Add Contact
function fillGroupDropdown() {
  let dropdown = document.getElementById("group-select");
  dropdown.innerHTML = '<option value="">Select Group</option>';

  let groups = JSON.parse(sessionStorage.getItem("groups") || "[]");
  for (let g of groups) {
    let option = document.createElement("option");
    option.value = g;
    option.text = g;
    dropdown.appendChild(option);
  }
}
