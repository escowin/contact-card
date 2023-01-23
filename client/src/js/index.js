// entry point | webpack will include the imported files into the bundle.
// - javascript
import { toggleForm, clearForm } from "./form";
// import "./submit";

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

// - database crud
import { initdb, getDb, postDb } from "./database";
import { fetchCards } from "./cards";

// - on-load functionality
window.addEventListener("load", function () {
  initdb();
  fetchCards(); // data is pulled from the indexdb database. creates & renders new card per data object
  // getDb();
  // postDB();

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
