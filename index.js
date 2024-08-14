var collapsible = document.getElementsByClassName("collapsible");

for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight === "2000px") {
      content.style.maxHeight = "0";
      content.style.opacity = "0";
    } else {
      content.style.maxHeight = "2000px";
      content.style.opacity = "1";
    }
  });
}

// // Get the height of the body element
// var bodyHeight = document.body.scrollHeight;

// // Select the target element you want to set the height on
// var targetElement = document.getElementsByClassName("parallax-layer-back");

// // Set the height of the target element to match the body height
// targetElement.style.height = bodyHeight + 'px';

document.addEventListener("DOMContentLoaded", function() {
    var bodyHeight = document.body.offsetHeight;
    var targetElement = document.getElementsByClassName("parallax-layer-back");
    if (targetElement) {
        targetElement.style.height = bodyHeight + 'px';
    } else {
        console.error('Element with id "targetElement" not found.');
    }
});