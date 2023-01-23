// entry point | webpack will include the imported files into the bundle.
// - database crud
import { initdb, postDb, deleteDb, editDb } from "./database";
import { fetchCards } from "./cards";

// - frontend javascript
import { toggleForm, clearForm } from "./form";

// - bootstrap
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// - css
import "../css/index.css";

// - images
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
// import Logo from "../images/escowinart.png";


// dom manipulation
// - on-load functionality
window.addEventListener("load", function () {
  initdb();
  fetchCards(); // data is pulled from the indexdb database. creates & renders new card per data object

  this.document.getElementById("logo").src = Logo;
  this.document.getElementById("bearThumbnail").src = Bear;
  this.document.getElementById("dogThumbnail").src = Dog;
});

// - form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    // obtains passed form eleemnt values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // calls edit function, passing in above values
    editDb(profileId, name, email, phone, profile);

    fetchCards();
    
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

// - update functionality
window.editCard = e => {
    // contact id
    profileId = parseInt(e.dataset.id);

    // values pre-populates edit form
    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById('name').value = editName;
    document.getElementById('email').value = editEmail;
    document.getElementById('phone').value = editPhone;

    // css
    form.style.display = "block"

    // true | updates existing, rather than create, contact
    submitBtnToUpdate = true;
}

// - delete functionality
window.deleteCard = e => {
    let id = parseInt(e.id)
    // deletes card
    deleteDb(id);
    // reloads dom
    fetchCards();
};