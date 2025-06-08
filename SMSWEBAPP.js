document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});


// Get all nav links
const navHome = document.getElementById('nav-home');
const navLibrary = document.getElementById('nav-library');
const navMessage = document.getElementById('nav-message');
const navGroup = document.getElementById('nav-group');
const navContact = document.getElementById('nav-contact');

// Get all page divs
const PageHome = document.getElementById('page-home');
const PageLibrary = document.getElementById('page-library');
const PageMessage = document.getElementById('page-message');
const PageGroup = document.getElementById('page-group');
const PageContact = document.getElementById('page-contact');

// Get input fields and button
const nameInput = document.getElementById('sms-name');
const mobileInput = document.getElementById('sms-mobile');
const emailInput = document.getElementById('sms-email');
const messageInput = document.querySelector('textarea');
const submitButton = document.getElementById('sms-submit');



// Function to show one page and hide others
function showPage(pageName) {
  // 1. Hide all pages
  PageHome.style.display = "none";
  PageLibrary.style.display = "none";
  PageMessage.style.display = "none";
  PageGroup.style.display = "none";
  PageContact.style.display = "none";



  // 2. Show only the page we want
if (pageName === "home") PageHome.style.display = "flex";
if (pageName === "library") PageLibrary.style.display = "flex";
if (pageName === "message") PageMessage.style.display = "flex";
if (pageName === "group") PageGroup.style.display = "flex";
if (pageName === "contact") PageContact.style.display = "flex";
}


// Add click events to nav links
navHome.onclick = () => showPage('home');
navLibrary.onclick = () => showPage('library');
navMessage.onclick = () => showPage('message');
navGroup.onclick = () => showPage('group');
navContact.onclick = () => showPage('contact');


//send sms validation code//

// Run when "Send SMS" button is clicked
submitButton.onclick = () => {
  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // 1. Check if name has only letters (no numbers or special characters)
  const lettersOnly = /^[A-Za-z ]+$/;
  if (!lettersOnly.test(name)) {
    alert("❌ Name should have only letters (A-Z or a-z).");
    nameInput.focus();
    return;
  }

  // 2. Check if mobile has only numbers (no letters or special characters)
  const numbersOnly = /^[0-9]+$/;
  if (!numbersOnly.test(mobile)) {
    alert("❌ Mobile number should have only digits (0-9).");
    mobileInput.focus();
    return;
  }

  // 3. Check if email contains "@"
  if (!email.includes("@")) {
    alert("❌ Email should contain '@' symbol.");
    emailInput.focus();
    return;
  }

  // 4. Optional: Message should not be empty
  if (message === "") {
    alert("❌ Message cannot be empty.");
    messageInput.focus();
    return;
  }

  // ✅ If all validations passed
  alert("✅ SMS sent successfully");
};
