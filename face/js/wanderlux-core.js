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

if (document.querySelector(".floating-icons")) {
  const media = window.matchMedia("screen and (min-width:1540px)");
  if (media.matches) {
    const floatingIconEl = document.querySelector(".floating-icons");
    const footerEl = document.querySelector("footer");
    const footerElOffsetTop =
      footerEl.getBoundingClientRect().top + window.scrollY;

    function updateFloatingIconPosition() {
      const windowHeight = window.innerHeight;
      const floatingIconHeight = floatingIconEl.offsetHeight;

      if (window.scrollY + windowHeight > footerElOffsetTop) {
        floatingIconEl.style.position = "absolute";
        floatingIconEl.style.top = `${
          footerElOffsetTop - floatingIconHeight
        }px`;
        floatingIconEl.style.bottom = "unset";
      } else {
        floatingIconEl.style.position = "fixed";
        floatingIconEl.style.bottom = "20px";
        floatingIconEl.style.top = "unset";
      }
    }

    updateFloatingIconPosition();
    window.addEventListener("scroll", updateFloatingIconPosition);
    window.addEventListener("resize", updateFloatingIconPosition);
  } else {
    const footerEl = document.querySelector("footer");
    const floatingIconEl = document.querySelector(".floating-icons");

    window.addEventListener("scroll", function () {
      const st = this.scrollY;
      const footerElOffsetTop =
        footerEl.getBoundingClientRect().top + window.scrollY;

      if (st + window.innerHeight > footerElOffsetTop) {
        floatingIconEl.style.position = "absolute";
        floatingIconEl.style.top = `${
          footerElOffsetTop - floatingIconEl.offsetHeight + 26
        }px`;
        floatingIconEl.style.bottom = "unset";
      } else {
        floatingIconEl.style.position = "fixed";
        floatingIconEl.style.bottom = "0";
        floatingIconEl.style.top = "unset";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtn = document.querySelector(".read-btn");
  const contactText = document.querySelector(".contact-text");
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function () {
      contactText.classList.toggle("line-clamp-10");
    });
  }
});

if (document.querySelector('input[name="category-radio"]')) {
  document.addEventListener("DOMContentLoaded", function () {
    const radioCategoriesButtons = document.querySelectorAll(
      'input[type="radio"][name="category-radio"]'
    );
    const fetchContentArticle = document.querySelector(
      ".fetch-content-article"
    );

    if (fetchContentArticle) {
      const cmsQuery = fetchContentArticle.getAttribute("data-catid");

      async function firstContent() {
        const firstResponse = await fetch(
          `/article-load-items.bc?catid=${cmsQuery}`
        );
        const firstData = await firstResponse.text();
        fetchContentArticle.innerHTML = firstData;
      }
      firstContent();

      radioCategoriesButtons.forEach((radio) => {
        radio.addEventListener("change", async function () {
          if (this.checked) {
            const selectedCategoriesCatId = this.value;
            try {
              fetchContentArticle.innerHTML =
                '<div class="text-center flex justify-center items-center">Loading ...</div>';
              const response = await fetch(
                `/article-load-items.bc?catid=${selectedCategoriesCatId}`
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

// currency
document.addEventListener("DOMContentLoaded", function () {
  localStorage_getCurrency();

  if (document.querySelector(".contain-currency-show")) {
      document.querySelector(".currency-selected").setAttribute("onclick", "");
  }

  document.addEventListener('click', function (event) {
      if (!event.target.closest('.currency-selected,.currency-list')) {
          document.querySelector(".currency-list").classList.add("hidden");
      }
  });
});

function currency_selected(element) {
  if (!document.querySelector(".contain-currency")) {
      if (!document.querySelector(".contain-currency-show")) {
          let headerResize = element.closest("#header-resize");
          let currencySelected = headerResize.querySelector(".currency-selected");

          if (currencySelected.getAttribute("data-active") == 0) {
              headerResize.querySelector(".currency-loading").classList.toggle("hidden");

              fetch('/Client_Currency_Rate.bc')
                  .then(response => response.text())
                  .then(text => {
                      const data_currency = JSON.parse(text.replace(/\'/g, '"'));
                      let currencyList = headerResize.querySelector(".currency-list ul");
                      data_currency.rate.forEach(rate => {
                          let listItem = document.createElement("li");
                          listItem.setAttribute("data-cost", rate.rate_cost);
                          listItem.setAttribute("data-floatdigit", data_currency.floatdigit);
                          listItem.textContent = rate.rate_unit;
                          listItem.addEventListener("click", function () { select_currency(listItem); });
                          currencyList.appendChild(listItem);
                      });

                      headerResize.querySelector(".currency-loading").classList.toggle("hidden");
                      currencySelected.setAttribute("data-active", 1);
                      headerResize.querySelector(".currency-list").classList.toggle("hidden");
                  })
                  .catch(error => console.error(error));
          } else {
              headerResize.querySelector(".currency-list").classList.toggle("hidden");
          }
      }
  }
}

function select_currency(element) {
  let headerResize = element.closest("#header-resize");
  headerResize.querySelector(".currency-list").classList.toggle("hidden");
  headerResize.querySelector(".currency-selected").innerHTML = element.innerHTML;
  localStorage_setCurrency(
      element.innerHTML, 
      element.getAttribute("data-cost"), 
      element.getAttribute("data-floatdigit")
  );
}

function localStorage_setCurrency(currency_unit, currency_cost, floatdigit) {
  let currencyObject = {
      'currency_unit': currency_unit,
      'currency_cost': currency_cost,
      'floatdigit': floatdigit,
      'time': new Date().getTime(),
      'expire': 1200000,
  };
  localStorage.setItem('currencyObject', JSON.stringify(currencyObject));
  localStorage_getCurrency();
}

function localStorage_getCurrency() {
  let getCurrencyObject = localStorage.getItem('currencyObject');
  let jsonCurrency = JSON.parse(getCurrencyObject);
  
  if (jsonCurrency) {
      document.querySelector(".currency-selected").innerText = jsonCurrency.currency_unit;

      var timer = setInterval(function () {
          if (new Date().getTime() - jsonCurrency.time >= jsonCurrency.expire) {
              localStorage.removeItem('currencyObject');
              document.querySelector(".currency-selected").innerHTML = '<svg width="32" height="32" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.3301 23.0256V18.747C18.4781 18.7592 19.4074 19.7099 19.4074 20.8795C19.4074 22.0559 18.4781 23.0133 17.3301 23.0256ZM12.5915 13.7395C12.5915 12.544 13.5074 11.573 14.6634 11.4846V16.008C13.5087 15.9196 12.5915 14.9417 12.5915 13.7395ZM22.0741 20.8795C22.0741 18.2098 19.9474 16.0392 17.3301 16.027V11.4683H17.7834C18.6781 11.4683 19.4061 12.2068 19.4061 13.1139V13.2893C19.4061 14.0414 20.0034 14.6493 20.7394 14.6493C21.4754 14.6493 22.0727 14.0414 22.0727 13.2893V13.1139C22.0727 10.7067 20.1487 8.74828 17.7834 8.74828H17.3301V7.56508C17.3301 6.813 16.7327 6.20508 15.9967 6.20508C15.2607 6.20508 14.6634 6.813 14.6634 7.56508V8.7646C12.0368 8.85572 9.9248 11.044 9.9248 13.7408C9.92614 16.4418 12.0395 18.6368 14.6634 18.728V23.0283H14.2154C13.3208 23.0283 12.5941 22.2844 12.5941 21.3691C12.5941 20.617 11.9968 20.0091 11.2608 20.0091C10.5248 20.0091 9.92747 20.617 9.92747 21.3691C9.92747 23.7831 11.8515 25.7483 14.2154 25.7483H14.6634V26.6051C14.6634 27.3558 15.2607 27.9651 15.9967 27.9651C16.7327 27.9651 17.3301 27.3558 17.3301 26.6051V25.7456C19.9474 25.7333 22.0741 23.556 22.0741 20.8795Z" fill="white"></path></svg>';
              document.querySelector(".currency-selected").setAttribute("data-active", 0);
              clearInterval(timer);
              console.log('localStorage has expired');
          }
      }, 1000);
  }
}


// paging
const FetchPageNumPrev = async (dataPageNum) => {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const cmsQuery = fetchContentArticle.getAttribute("data-catid");
  const pagingResponse = await fetch(
    `/article-load-items.bc?catid=${cmsQuery}&pagenum=${dataPageNum}`
  );
  const pagingData = await pagingResponse.text();
  fetchContentArticle.innerHTML = pagingData;
};

const FetchPageNumNext = async (dataPageNum) => {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const cmsQuery = fetchContentArticle.getAttribute("data-catid");
  const pagingResponse = await fetch(
    `/article-load-items.bc?catid=${cmsQuery}&pagenum=${dataPageNum}`
  );
  const pagingData = await pagingResponse.text();
  fetchContentArticle.innerHTML = pagingData;
};

const FetchWithPageNum = async (dataPageNum) => {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const cmsQuery = fetchContentArticle.getAttribute("data-catid");
  const pagingResponse = await fetch(
    `/article-load-items.bc?catid=${cmsQuery}&pagenum=${dataPageNum}`
  );
  const pagingData = await pagingResponse.text();
  fetchContentArticle.innerHTML = pagingData;
};

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

var input = document.getElementById("search");
var isItemSelected = false; // برای بررسی اینکه آیا چیزی انتخاب شده است یا خیر

if (input) {
  input.onkeyup = function () {
    if (this.value.length !== 0) {
      document.querySelector(".search-content ul").classList.remove("hidden");
      var filter = input.value.toUpperCase();
      var lis = document
        .querySelector(".search-content")
        .getElementsByTagName("li");
      isItemSelected = false; // ریست کردن وقتی که کاربر چیزی در ورودی می‌نویسد

      for (var i = 0; i < lis.length; i++) {
        var name = lis[i].innerHTML;
        if (name.toUpperCase().indexOf(filter) == 0) {
          lis[i].style.display = "list-item";
        } else {
          lis[i].style.display = "none";
        }
      }
    } else {
      var lis = document
        .querySelector(".search-content")
        .getElementsByTagName("li");
      for (var i = 0; i < lis.length; i++) {
        lis[i].style.display = "list-item";
      }
      document.querySelector(".search-content ul").classList.remove("hidden");
    }
  };

  document
    .getElementById("search-content-article")
    .addEventListener("submit", function (e) {
      if (!isItemSelected) {
        e.preventDefault();
        document.getElementById("catidsearched").value = 0; // اگر هیچ چیزی انتخاب نشده باشد catid را 0 قرار دهید
        var lis = document
          .querySelector(".search-content")
          .getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
          lis[i].style.display = "list-item";
        }
        document.querySelector(".search-content ul").classList.remove("hidden");
      }
    });

  function contentSearched(datatitle, datacatid) {
    input.value = datatitle;
    document.getElementById("catidsearched").value = datacatid;
    document.querySelector(".search-content ul").classList.add("hidden");
    isItemSelected = true; // وقتی آیتمی انتخاب می‌شود، این متغیر true شود
  }
}

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
        const pathnamehome = window.location.pathname;
        if (pathnamehome) {
          if (pathnamehome == "/hotel") {
            sessionStorage.setItem("pageName", "hotel");
            $("#Hotel").click(function () {
              $("#flight-type-items").hide();
              $(".nav-module").each(function () {
                var checknav = $(this).attr("data-nav");
                if (checknav == "hotel") {
                  $(this).addClass("nav-module-selected");
                } else {
                  $(this).removeClass("nav-module-selected");
                }
              });
              LoadHotel();
            });
          } 
        } else if (pathnamehome == "/tour") {
          sessionStorage.setItem("pageName", "tour");
          $("#Tour").click(function () {
            $("#flight-type-items").hide();
            $(".nav-module").each(function () {
              var checknav = $(this).attr("data-nav");
              if (checknav == "tour") {
                $(this).addClass("nav-module-selected");
              } else {
                $(this).removeClass("nav-module-selected");
              }
            });
            LoadTour();
          });
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

//wanderlux-form

function uploadDocumentPassenger(args) {
  document.querySelector("#passenger-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#passenger-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#passenger-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadPassenger", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaPassenger(e) {
  $bc.setSource("captcha.refreshPassenger", true);
}

async function OnProcessedEditObjectPassenger(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector(
      "#passenger-form-resize .Loading_Form"
    ).style.display = "none";
    document.querySelector("#passenger-form-resize .message-api").innerHTML =
      "Your request has been successfully registered.";
  } else {
    refreshCaptchaPassenger();
    setTimeout(() => {
      document.querySelector(
        "#passenger-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#passenger-form-resize .message-api").innerHTML =
        "An error occurred, please try again.";
    }, 2000);
  }
}

async function RenderFormPassenger() {
  var inputElementVisa7 = document.querySelector(
    ".passenger-username input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Full Name");

  var inputElementVisa7 = document.querySelector(
    " .passenger-number input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Phone Number");

  var inputElementVisa7 = document.querySelector(
    " .passenger-email input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Email Address");
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

// document.addEventListener("DOMContentLoaded", function () {
//   const fetchContentTour = document.querySelector(".fetch-content-tour");
//   const tourLi = document.querySelectorAll(".tour-li");

//   if (fetchContentTour) {
//     async function firstContent() {
//       const firstResponse = await fetch("/tour-load-items.bc?catid=212998");
//       const firstData = await firstResponse.text();
//       fetchContentTour.innerHTML = firstData;
//       refreshSwiper();
//     }

//     firstContent();

//     tourLi.forEach((item) => {
//       item.addEventListener("click", function () {
//         tourLi.forEach((li) => {
//           li.style.backgroundColor = "";
//           li.style.color = "";
//         });

//         item.style.backgroundColor = "#D0B98F";
//         item.style.color = "#031947";

//         let cmsQuery = item.getAttribute("data-id");

//         async function secondContent() {
//           try {
//             const response = await fetch(`/tour-load-items.bc?catid=${cmsQuery}`);
//             if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.text();
//             fetchContentTour.innerHTML = data;

//             refreshSwiper();
//           } catch (error) {
//             console.error("Fetch failed:", error);
//             fetchContentTour.innerHTML =
//               "<p>Error in load: " + error.message + "</p>";
//           }
//         }
//         secondContent();
//       });
//     });
//   }

//   function refreshSwiper() {
//     if (tourSwiper) {
//       tourSwiper.update();
//     } else {
//       tourSwiper = new Swiper(".tour-swiper", {
//         slidesPerView: 5,
//         speed: 400,
//         centeredSlides: false,
//         spaceBetween: 8,
//         grabCursor: true,
//         loop: true,
//         autoplay: {
//           delay: 3000,
//           disableOnInteraction: false,
//         },
//         pagination: {
//           el: ".swiper-pagination",
//           clickable: true,
//         },
//         navigation: {
//           nextEl: ".swiper-button-next-custom",
//           prevEl: ".swiper-button-prev-custom",
//         },
//       });
//     }
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTour = document.querySelector(".fetch-content-tour");
  const tourLi = document.querySelectorAll(".tour-li");

  if (fetchContentTour) {
    async function firstContent() {
      fetchContentTour.innerHTML = '<div class="loading-text">Loading...</div>';
      try {
        const firstResponse = await fetch("/tour-load-items.bc?catid=212998");
        if (!firstResponse.ok) {
          throw new Error(`HTTP error! Status: ${firstResponse.status}`);
        }
        const firstData = await firstResponse.text();
        fetchContentTour.innerHTML = firstData;
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentTour.innerHTML =
          "<p>Error loading data: " + error.message + "</p>";
      }
    }
    firstContent();

    // تنظیمات برای swiper
    if (tourSwiper) {
      tourSwiper.params.spaceBetween = 8; // Reapply spaceBetween
      tourSwiper.update(); // Recalculate
    }
    if (tourSwiperMobile) {
      tourSwiperMobile.params.spaceBetween = 0; // Reapply spaceBetween
      tourSwiperMobile.update(); // Recalculate
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
          fetchContentTour.innerHTML =
            '<div class="loading-text">Loading...</div>';
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
              "<p>Error loading data: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});

if (document.querySelector(".tour-swiper-mobile")) {
  var tourSwiperMobile = new Swiper(".tour-swiper-mobile", {
    slidesPerView: 1.5,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
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
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
