// entry point | webpack will include the imported files into the bundle.
// - javascript
import "./form";
import "./submit";

// - images
// import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
import Logo from "../images/escowinart.png";

// - dom manipulation
window.addEventListener("load", function() {
    this.document.getElementById('logo').src = Logo;
    this.document.getElementById('bearThumbnail').src = Bear;
    this.document.getElementById('dogThumbnail').src = Dog;
});