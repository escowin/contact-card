// entry point | webpack will include the imported files into the bundle.
// - javascript
import "./form";
import "./submit";

// - css
import "../css/index.css";

// bootstrap
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// - images
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
// import Logo from "../images/escowinart.png";

// initDB function, which is called inside the window event listener function
import { initdb } from "./database";

// - dom manipulation
window.addEventListener("load", function() {
    initdb();
    this.document.getElementById('logo').src = Logo;
    this.document.getElementById('bearThumbnail').src = Bear;
    this.document.getElementById('dogThumbnail').src = Dog;
});