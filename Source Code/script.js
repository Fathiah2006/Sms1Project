  // ===== SLIDES / CAROUSEL =====
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".right");
  const prevBtn = document.querySelector(".left");
  const dotsContainer = document.querySelector(".dots");

  let current = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const updateSlide = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      dotsContainer.children[i].classList.toggle("active", i === current);
    });
  };

  const goToSlide = (index) => {
    current = index;
    updateSlide();
  };

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

  setInterval(() => {
    current = (current + 1) % slides.length;
    updateSlide();
  }, 10000);

  updateSlide();

  // ===== CART SECTION =====
  let cartItems = [];
  let totalPrice = 0;

  function addToCart(itemName = 'Item', price = 0) {
    const id = Date.now(); // Unique ID
    cartItems.push({ id, name: itemName, price });
    updateCartList();
  }

  function removeCartItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCartList();
  }

  function updateCartList() {
    const cartList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector(".checkout-btn");

    cartList.innerHTML = '';
    totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.price;

      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="remove-btn" onclick="removeCartItem(${item.id})">&times;</button>
      `;
      cartList.appendChild(li);
    });

    cartTotal.textContent = totalPrice.toFixed(2);
    checkoutBtn.disabled = cartItems.length === 0;
    document.getElementById('cartCount').innerText = cartItems.length;
  }

  function toggleCart() {
    document.getElementById('miniCart').style.display = 'block';
    document.getElementById('checkoutMessage').classList.add('hidden'); // Hide message when cart is toggled
  }

  function closeCart() {
    document.getElementById('miniCart').style.display = 'none';
  }

  function checkout() {
    // Show checkout success message
    document.getElementById('checkoutMessage').classList.remove('hidden');
    
    // Clear cart after checkout
    cartItems = [];
    totalPrice = 0;
    updateCartList();

    // Optionally, you could also close the cart after checkout.
    setTimeout(() => {
      closeCart();
    }, 2000);
  }


  // Get the search input from the navbar and the shop items
const menuSearchBox = document.getElementById("navbarSearchBox");
const shopItems = document.querySelectorAll(".shop-item");
const noResults = document.getElementById("noResults");

menuSearchBox.addEventListener("input", () => {
  const searchTerm = menuSearchBox.value.toLowerCase(); // Get the input value and make it lowercase
  let hasMatch = false; // Flag to check if there are any matches

  // Loop through each item in the shop
  shopItems.forEach(item => {
    const itemName = item.querySelector("h3").textContent.toLowerCase(); // Get the name of the item

    if (itemName.includes(searchTerm)) {
      item.style.display = "block"; // If there's a match, show the item
      hasMatch = true;
     
    } else {
      item.style.display = "none"; // Otherwise, hide the item
    }
  });

  // Show "No matching items found" message if no matches
  noResults.style.display = hasMatch ? "none" : "block";
});

  

// Navbar toggle lines start
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("active");
}



function cancelMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.remove('active');
}

// Navbar toggle lines End


const tabButtons = document.querySelectorAll('.tab-button');
const categoryContents = document.querySelectorAll('.category-content');
const menuItems = document.querySelectorAll('.menu-item');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        categoryContents.forEach(content => {
            content.classList.remove('active');
        });

        document.getElementById(category).classList.add('active');
    });
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const ingredientsDiv = item.querySelector('.ingredients');
      if (ingredientsDiv) {
          ingredientsDiv.style.display = ingredientsDiv.style.display === 'none' ? 'block' : 'none';
      }
  });
});




// Gallery section start//
const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-content img');
const closeBtn = lightbox.querySelector('.lightbox-close');
const lightboxPrevBtn = lightbox.querySelector('.lightbox-arrow.left');
const lightboxNextBtn = lightbox.querySelector('.lightbox-arrow.right');
const lightboxCounter = lightbox.querySelector('.lightbox-counter'); // Select the counter element
let currentImageIndex = 0;
let visibleGalleryItems = [];

// Function to update the lightbox image and counter
function updateLightbox(index) {
    lightboxImg.src = visibleGalleryItems[index].querySelector('img').src;
    lightboxCounter.textContent = `${index + 1} / ${visibleGalleryItems.length}`; // Update the counter
}

// Function to open the lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox(currentImageIndex);
    lightbox.style.display = 'flex';
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.dataset.filter;

        // Update active button style
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        visibleGalleryItems = [];
        galleryItems.forEach((item, index) => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                visibleGalleryItems.push(item);
                item.dataset.index = visibleGalleryItems.length - 1; // Store index in visible array
            } else {
                item.style.display = 'none';
            }
        });

        // Reset current index when filtering
        currentImageIndex = 0;
        if (visibleGalleryItems.length > 0) {
            updateLightbox(currentImageIndex); // Update lightbox if there are visible items
        } else {
            lightbox.style.display = 'none'; // Hide lightbox if no items are visible
        }
    });
});

// Event listeners for gallery items to open lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const filter = document.querySelector('.filter-buttons button.active').dataset.filter;
        if (filter === 'all' || this.dataset.category === filter) {
            const index = visibleGalleryItems.findIndex(visibleItem => visibleItem === this);
            if (index !== -1) {
                openLightbox(index);
            }
        }
    });
});

// Event listener for closing the lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Event listeners for navigation arrows
lightboxPrevBtn.addEventListener('click', () => {
    if (visibleGalleryItems.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
        updateLightbox(currentImageIndex);
    }
});

lightboxNextBtn.addEventListener('click', () => {
    if (visibleGalleryItems.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % visibleGalleryItems.length;
        updateLightbox(currentImageIndex);
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Initial setup to show all images
const initialFilterButton = document.querySelector('.filter-buttons button[data-filter="all"]');
if (initialFilterButton) {
    initialFilterButton.click();
}

// Gallery section end//

// Gallery2 section start//
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  const animationDuration = 2000; // Adjust the duration of the animation in milliseconds

  const animateCounter = (element, finalCount) => {
      let start = 0;
      const increment = Math.ceil(finalCount / (animationDuration / 16)); // Increment based on duration and animation frame rate

      const updateCounter = () => {
          start += increment;
          element.textContent = start > finalCount ? finalCount + "+" : start + "+"; // Add "+" at the end
          if (start < finalCount) {
              requestAnimationFrame(updateCounter);
          }
      };

      requestAnimationFrame(updateCounter);
  };

  const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              statNumbers.forEach(numberElement => {
                  const finalCount = parseInt(numberElement.dataset.count);
                  animateCounter(numberElement, finalCount);
              });
              observer.unobserve(entry.target); // Stop observing once animated
          }
      });
  };

  const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5 // Trigger when 50% of the section is visible
  });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
      observer.observe(statsSection);
  }
});
// Gallery2 section end//


// Team section Start//

document.addEventListener('DOMContentLoaded', () => {
  const memberImages = document.querySelectorAll('.member-image');

  memberImages.forEach(image => {
      image.addEventListener('click', () => {
          image.classList.toggle('active');
      });
  });
});

// Team section end//




//Testimonial section start//
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.testimonials-carousel');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.dots-container');
  let currentIndex = 0;
  const intervalTime = 2000; // Time between auto-scroll in milliseconds (5 seconds)
  let autoScrollInterval;

  function updateDots() {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          dot.addEventListener('click', () => goToSlide(index));
          if (index === currentIndex) {
              dot.classList.add('active');
          }
          dotsContainer.appendChild(dot);
      });
  }

  function goToSlide(index) {
      currentIndex = index;
      carousel.scrollTo({
          left: slides[currentIndex].offsetLeft,
          behavior: 'smooth'
      });
      updateDots();
      resetAutoScroll(); // Reset auto-scroll timer when manually navigating
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
  }

  function startAutoScroll() {
      autoScrollInterval = setInterval(nextSlide, intervalTime);
  }

  function stopAutoScroll() {
      clearInterval(autoScrollInterval);
  }

  function resetAutoScroll() {
      stopAutoScroll();
      startAutoScroll();
  }

  // Pause auto-scroll on hover
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);

  updateDots(); // Initialize dots
  startAutoScroll(); // Start auto-scrolling when the page loads
});

//Testimonial section end//



document.getElementById("navbarSearchBox").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchTerm = this.value.trim().toLowerCase();
    const shopItems = document.querySelectorAll(".shop-item");
    let matchedItem = null;

    for (let item of shopItems) {
      const title = item.querySelector("h3").innerText.toLowerCase();
      if (title.includes(searchTerm)) {
        matchedItem = item;
        break;
      }
    }

    if (matchedItem) {
      document.getElementById("noResults").style.display = "none";
      matchedItem.scrollIntoView({ behavior: "smooth", block: "center" });
      matchedItem.style.outline = "3px solid orange";
      setTimeout(() => matchedItem.style.outline = "", 2000);
    } else {
      document.getElementById("noResults").style.display = "block";
    }
  }
});








