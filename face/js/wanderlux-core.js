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


if (document.querySelector('input[name="country-radio"]')) {
  document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll(
      'input[type="radio"][name="category-radio"]'
    );
    const fetchContentArticle = document.querySelector(
      ".fetch-content-article"
    );

    if (fetchContentArticle) {
      const cmsQuery = fetchContentArticle.getAttribute("data-catid");

      async function firstContent() {
        const firstResponse = await fetch(`/article-load-items.bc?catid=213014`);
        const firstData = await firstResponse.text();
        fetchContentArticle.innerHTML = firstData;
      }
      firstContent();

      radioButtons.forEach((radio) => {
        radio.addEventListener("change", async function () {
          if (this.checked) {
            const selectedCatId = this.value;
            try {
              fetchContentArticle.innerHTML =
                '<div class="text-center flex justify-center items-center">Loading ...</div>';
              const response = await fetch(
                `/article-load-items.bc?catid=${selectedCatId}`
              );
              const data = await response.text();
              fetchContentArticle.innerHTML = data;
            } catch (error) {
              console.error("Error:", error);
              fetchContentArticle.innerHTML =
                '<div class="text-red-500">Error Loading Articles</div>';
            }
          }
        });
      });
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".email-icon")) {
    const emailIcon = document.querySelector(".email-icon");
    const emailPopup = document.querySelector(".email-popup");
    const closeIcon = document.querySelector(".close-icon");

    emailIcon.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        emailPopup.classList.toggle("opacity-0");
        emailPopup.classList.toggle("translate-x-full");
        emailPopup.classList.toggle("pointer-events-none");
      } else {
        emailPopup.classList.remove("opacity-0");
        emailPopup.classList.remove("translate-x-full");
        emailPopup.classList.remove("pointer-events-none");
        emailPopup.classList.remove("translate-y-[-50%]");
      }
    });

    closeIcon.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        emailPopup.classList.add("opacity-0");
        emailPopup.classList.add("translate-x-full");
        emailPopup.classList.add("pointer-events-none");
      } else {
        emailPopup.classList.add("opacity-0");
        emailPopup.classList.add("translate-y-[-50%]");
        emailPopup.classList.add("pointer-events-none");
        emailPopup.classList.add("translate-y-0");
      }
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

function uploadDocumentFooter(args) {
  document.querySelector("#footer-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#footer-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#footer-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadFooter", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaFooter(e) {
  $bc.setSource("captcha.refreshFooter", true);
}

async function OnProcessedEditObjectFooter(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#footer-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#footer-form-resize .message-api").innerHTML =
      "Your request has been successfully registered.";
  } else {
    refreshCaptchaFooter();
    setTimeout(() => {
      document.querySelector(
        "#footer-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#footer-form-resize .message-api").innerHTML =
        "An error occurred, please try again.";
    }, 2000);
  }
}

async function RenderFormFooter() {
  var inputElementVisa7 = document.querySelector(
    ".footer-username input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "First/Last Name");

  var inputElementVisa7 = document.querySelector(
    " .footer-email input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Email");

}


//form contact 

function uploadDocumentContact(args) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadContact", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaContact(e) {
  $bc.setSource("captcha.refreshContact", true);
}

async function OnProcessedEditObjectContact(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#contact-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#contact-form-resize .message-api").innerHTML =
      "Your request has been successfully registered.";
  } else {
    refreshCaptchaContact();
    setTimeout(() => {
      document.querySelector(
        "#contact-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#contact-form-resize .message-api").innerHTML =
        "An error occurred, please try again.";
    }, 2000);
  }
}

async function RenderFormContact() {
  var inputElementVisa7 = document.querySelector(
    ".contact-username input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Name");

  var inputElementVisa7 = document.querySelector(
    " .contact-email input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Email");

  var inputElementVisa7 = document.querySelector(
    " .contact-number input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Phone Number");

  var inputElementVisa7 = document.querySelector(
    " .contact-message input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Message");
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

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTour = document.querySelector(".fetch-content-tour");
  const tourLi = document.querySelectorAll(".tour-li");

  if (fetchContentTour) {
    async function firstContent() {
      const firstResponse = await fetch("/tour-load-items.bc?catid=212998");
      const firstData = await firstResponse.text();
      fetchContentTour.innerHTML = firstData;
      refreshSwiper();
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
            const response = await fetch(`/tour-load-items.bc?catid=${cmsQuery}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.text();
            fetchContentTour.innerHTML = data;

            refreshSwiper();
          } catch (error) {
            console.error("Fetch failed:", error);
            fetchContentTour.innerHTML =
              "<p>Error in load: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }

  function refreshSwiper() {
    if (tourSwiper) {
      tourSwiper.update(); 
    } else {
      tourSwiper = new Swiper(".tour-swiper", {
        slidesPerView: 5,
        speed: 400,
        centeredSlides: false,
        spaceBetween: 8,
        grabCursor: true,
        loop: true,
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
  }
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
    if (tourSwiper) {
      tourSwiper.params.spaceBetween = 8; // Reapply spaceBetween
      tourSwiper.update(); // Recalculate
    }

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
