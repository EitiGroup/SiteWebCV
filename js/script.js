var ceresToggler = document.querySelector(".ceres");//clique menu

var navLinksContainer = document.querySelector(".navlinks-container");

function toggleNav() {
  ceresToggler.classList.toggle("open");//croix menu

  var ariaToggle = ceresToggler.getAttribute("aria-expanded") === "true" ?  "false" : "true";
  ceresToggler.setAttribute("aria-expanded", ariaToggle);

  navLinksContainer.classList.toggle("open");
}
ceresToggler.addEventListener("click", toggleNav);//ajoute event clique sur sommai

new ResizeObserver(function(entries) {//observe nav
    if(entries[0].contentRect.width <= 900){
    navLinksContainer.style.transition = "transform 0.3s ease-out";//lance animation 
    } else {
        navLinksContainer.style.transition = "none";
    }
}).observe(document.body);

