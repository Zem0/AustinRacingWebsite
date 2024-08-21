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

document.querySelector('.scroll-button').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor click behavior

  const target = document.querySelector('#video-section-1'); // Select the target element
  target.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element smoothly

  const audio = document.querySelector('.bike-noise'); // Select the audio element
  audio.play(); // Play the audio
});



// image carousel
if (document.querySelectorAll(".carousel").length > 0) {
  let carousels = document.querySelectorAll(".carousel");
  carousels.forEach(carousel => newCarousel(carousel));

  function newCarousel(carousel) {
    let carouselChildren = carousel.children;
    let speed = carousel.dataset.speed;
    let carouselContent = carousel.querySelector('.carousel-content');
    const carouselLength = carouselContent.children.length;
    let width = window.innerWidth;
    let count = width;
    let counterIncrement = width;
    let int = setInterval(timer, speed);

    // initial transform
    carouselContent.style.transform = `translateX(-${width}px)`;

    function timer() {
      if (count >= (counterIncrement - 2) * (carouselLength - 2)) {
        count = 0;
        carouselContent.style.transform = `translateX(-${count}px)`;
      }
      count = count + counterIncrement;
      carouselContent.style.transform = `translateX(-${count}px)`;
    }

    function carouselClick() {
      // left click
      carouselChildren[0].addEventListener("click", function() {
        count = count - width;
        carouselContent.style.transform = `translateX(-${count - 100}px)`;
        if (count < counterIncrement) {
          count = counterIncrement * (carouselLength - 2);
          carouselContent.style.transform = `translateX(-${count - 100}px)`;
        }
      });
      // right click
      carouselChildren[1].addEventListener("click", function() {
        count = count + width;
        carouselContent.style.transform = `translateX(-${count + 100}px)`;
        if (count >= counterIncrement * (carouselLength - 1)) {
          count = counterIncrement;
          carouselContent.style.transform = `translateX(-${count + 100}px)`;
        }
      });
    }

    function carouselHoverEffect() {
      // left hover effect events
      carouselChildren[0].addEventListener("mouseenter", function() {
        carouselContent.style.transform = `translateX(-${count - 100}px)`;
        clearInterval(int);
      });
      carouselChildren[0].addEventListener("mouseleave", function() {
        carouselContent.style.transform = `translateX(-${count}px)`;
        int = setInterval(timer, speed);
      });

      // right hover effect events
      carouselChildren[1].addEventListener("mouseenter", function() {
        carouselContent.style.transform = `translateX(-${count + 100}px)`;
        clearInterval(int);
      });
      carouselChildren[1].addEventListener("mouseleave", function() {
        carouselContent.style.transform = `translateX(-${count}px)`;
        int = setInterval(timer, speed);
      });
    }

    carouselHoverEffect();
    carouselClick();
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const scrollContainer = document.querySelector('.card-wrapper');
  const leftButton = document.querySelector('.scroll-button.left');
  const rightButton = document.querySelector('.scroll-button.right');

  function getCardWidthWithMargin() {
      const card = scrollContainer.querySelector('.card');
      const cardStyle = getComputedStyle(card);
      const cardWidth = card.offsetWidth;
      const cardMarginRight = parseInt(cardStyle.marginRight);
      return cardWidth + cardMarginRight;
  }

  function scrollToNextCard(direction) {
      const cardWidthWithMargin = getCardWidthWithMargin();
      const paddingLeft = parseInt(getComputedStyle(scrollContainer).paddingLeft);
      const paddingRight = parseInt(getComputedStyle(scrollContainer).paddingRight);

      // Adjust scrolling position to include padding
      if (direction === 1) {
          scrollContainer.scrollBy({ left: cardWidthWithMargin, behavior: 'smooth' });
      } else {
          scrollContainer.scrollBy({ left: -cardWidthWithMargin, behavior: 'smooth' });
      }
  }

  function updateButtons() {
      const paddingLeft = parseInt(getComputedStyle(scrollContainer).paddingLeft);
      const paddingRight = parseInt(getComputedStyle(scrollContainer).paddingRight);

      leftButton.disabled = scrollContainer.scrollLeft <= paddingLeft;
      rightButton.disabled = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - paddingRight;
  }

  leftButton.addEventListener('click', () => scrollToNextCard(-1));
  rightButton.addEventListener('click', () => scrollToNextCard(1));
  scrollContainer.addEventListener('scroll', updateButtons);

  // Initial button state
  updateButtons();
});

document.addEventListener('DOMContentLoaded', function () {
  // Select all Vimeo iframes
  const iframes = document.querySelectorAll('.video-wrapper iframe');

  // Create a new Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          const iframe = entry.target;
          const player = new Vimeo.Player(iframe);

          if (entry.isIntersecting) {
              // If the iframe is in view, play the video
              player.play();
          } else {
              // If the iframe is out of view, pause the video
              player.pause();
          }
      });
  }, { threshold: 0.5 });

  // Observe each iframe
  iframes.forEach(iframe => observer.observe(iframe));
});
