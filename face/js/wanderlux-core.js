const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
    // headerMenu.style.display = "none";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
    // headerMenu.style.display = "block";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcon = document.querySelector(".dropdown-icon");

  toggleDropdowns.forEach((toggle) => {
    const submenu = toggle.nextElementSibling;

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTour = document.querySelector(".fetch-content-tour");
  const tourLi = document.querySelectorAll(".tour-li");
  if (fetchContentTour) {
    async function firstContent() {
      const firstResponse = await fetch("/tour-load-items.bc?catid=212998");
      const firstData = await firstResponse.text();
      fetchContentTour.innerHTML = firstData;
    }
    firstContent();

    tourLi.forEach((item) => {
      item.addEventListener("click", function () {
        tourLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });

        item.style.backgroundColor = "#D0B98F";
        item.style.color = "#031947";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          try {
            const firstResponse = await fetch(
              `/tour-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentTour.innerHTML = firstData;
          } catch (error) {
            console.error("Fetch failed:", error);
            fetchContentTour.innerHTML =
              "<p>error in load: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});


function loadContentHomePage() {
  loadSearchEngine("search-engine-en.bc", "search-box");
}

async function loadSearchEngine(url, sectionload) {
  try {
    var xhrobj = new XMLHttpRequest();
    xhrobj.open("GET", url);
    xhrobj.send();

    xhrobj.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var container = document.getElementById(sectionload);
        container.innerHTML = xhrobj.responseText;

        var scripts = container.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var scriptTag = document.createElement("script");
          if (scripts[i].src) {
            scriptTag.src = scripts[i].src;
            scriptTag.async = false;
          } else {
            scriptTag.text = scripts[i].textContent;
          }
          document.head
            .appendChild(scriptTag)
            .parentNode.removeChild(scriptTag);
        }
      }
    };
  } catch (error) {}
}

if (document.querySelector(".tour-swiper")) {
  var tourSwiper = new Swiper(".tour-swiper", {
    slidesPerView: 5,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".tour-swiper-mobile")) {
  var tourSwiperMobile = new Swiper(".tour-swiper-mobile", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
if (document.querySelector(".hotels-swiper")) {
  var hotelsSwiper = new Swiper(".hotels-swiper", {
    slidesPerView: 3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".tourism-swiper")) {
  var tourismSwiper = new Swiper(".tourism-swiper", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}

if (document.querySelector(".tourism-swiper-tour")) {
  var tourismSwiperTour = new Swiper(".tourism-swiper-tour", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}

if (document.querySelector(".tourism-swiper-hotel")) {
var tourismSwiperHotel = new Swiper(".tourism-swiper-hotel", {
  slidesPerView: 4,
  speed: 400,
centeredSlides: false,
spaceBetween: 8,
grabCursor: true,
autoplay: {
  delay: 2500,
  disableOnInteraction: false,
},
loop:true,
navigation: {
nextEl: '.swiper-button-next-custom',
prevEl: '.swiper-button-prev-custom',
},

});
}