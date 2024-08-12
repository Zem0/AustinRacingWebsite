var collapsible = document.getElementsByClassName("collapsible");

for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight === "2000px") {
      content.style.maxHeight = "0";
    } else {
      content.style.maxHeight = "2000px";
    }
  });
}