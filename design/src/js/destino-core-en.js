function select_lang(e){
   const ulElement = e.querySelector("ul");
   if (ulElement.style.display === "none" || ulElement.style.display === "") {
       ulElement.style.display = "block";
   } else {
       ulElement.style.display = "none";
   }
}
document.addEventListener('click', function(event) {
    const langElements = document.querySelectorAll('.select-lang');
    langElements.forEach(function(langElement) {
        const ulElement = langElement.querySelector('ul');
        if (!langElement.contains(event.target)) {
            ulElement.style.display = 'none';
        }
    });
});
function content_search(e){
   const closestDiv = e.closest("div");
   const searchForm = closestDiv.querySelector(".search_form");
   if (searchForm.style.display === "none" || searchForm.style.display === "") {
       searchForm.style.display = "block";
   } else {
       searchForm.style.display = "none";
   }
}


function openParentdropDown(e) {
    let o = e.closest("li").querySelector(".dropdownmenu"),
       t = o.classList.contains("hidden");
    document.querySelectorAll(".toggleSubMenuBox").forEach(e => {
       e.querySelector(".arrow-icon-menu").classList.remove("rotate-180")
    }), document.querySelectorAll(".dropdownmenu-parent").forEach(e => {
       e.classList.add("hidden")
    }), document.querySelectorAll(".dropdownmenu").forEach(e => {
       e.classList.add("hidden"), screen.width <= 1024 && e.closest("li").querySelector(".arrow-icon-menu").classList.remove("rotate-180")
    }), t ? (o.classList.remove("hidden"), e.querySelector(".arrow-icon-menu").classList.add("rotate-180")) : (o.classList.add("hidden"), e.querySelector(".arrow-icon-menu").classList.remove("rotate-180"))
 }
 
 function opendropDown(e) {
    let o = e.closest("li").querySelector(".dropdownmenu");
    o.classList.contains("hidden") ? (o.closest("li").closest("ul").querySelectorAll(".dropdownmenu").forEach(e => {
       e.classList.add("hidden"), screen.width <= 1024 && e.closest("li").querySelector(".arrow-icon-menu").classList.remove("rotate-180")
    }), screen.width <= 1024 && e.querySelector(".arrow-icon-menu").classList.remove("rotate-180"), o.classList.remove("hidden"), screen.width <= 1024 && (e.querySelector(".arrow-icon-menu").classList.remove("rotate-90"), e.querySelector(".arrow-icon-menu").classList.remove("max-lg:rotate-0"), e.querySelector(".arrow-icon-menu").classList.add("rotate-180"))) : (o.closest("li").closest("ul").querySelectorAll(".dropdownmenu").forEach(e => {
       e.classList.add("hidden"), screen.width <= 1024 && e.closest("li").querySelector(".arrow-icon-menu").classList.remove("rotate-180")
    }), screen.width <= 1024 && e.querySelector(".arrow-icon-menu").classList.remove("rotate-180"))
 }
 
 function scrollToMenu() {
    const e = document.getElementById("menu-box").offsetTop;
    window.scrollTo({
       top: e,
       behavior: "smooth"
    })
 }
 
 function openHamburgerMenu(e) {
    document.getElementById("menu-box").classList.add("header-visible"), scrollToMenu()
 }
 
 function closeHamburgerMenu(e) {
    document.getElementById("menu-box").classList.remove("header-visible")
 }      


 function fillroute(e) {
   var t = e.getAttribute("dep-id"),
       i = e.getAttribute("des-id"),
       a = e.getAttribute("dep-text"),
       r = e.getAttribute("des-text");
   document.querySelector(".departure-city .co-id").value = t;
   document.querySelector(".departure-city .text-value").value = a;
   document.querySelector(".destination-city .co-id").value = i;
   document.querySelector(".destination-city .text-value").value = r;
   var searchBoxTop = document.querySelector("#search-box").offsetTop;
   window.scrollTo({
       top: searchBoxTop,
       behavior: "smooth"
   });
}

document.addEventListener("DOMContentLoaded", function () {
   loadInitialComments();
});

function loadInitialComments() {
   var selectedElement = document.querySelector(".comments-item .selected-cat");
   if (selectedElement) {
       load_comment(selectedElement);
   }
}
function load_comment(e) {
   var t = e;
   document.querySelectorAll(".comments-item li").forEach(function(item) {
       item.classList.remove("selected-cat");
   });
   t.classList.add("selected-cat");
   var a = t.getAttribute("data-id");
   t.closest(".comments-show").querySelector(".comment-loading").classList.remove("hidden");
   fetch("/load-comments.bc?lang=2&id=" + a)
       .then(response => response.text())
       .then(data => {
           t.closest(".comments-show").querySelector(".comment-loading").classList.add("hidden");
           var loadCommentsElement = t.closest(".comments-show").querySelector(".load-comments");
           loadCommentsElement.innerHTML = data;
           var scripts = loadCommentsElement.querySelectorAll("script");
           scripts.forEach(function(script) {
               eval(script.textContent);
           });
       })
       .catch(error => console.error('Error loading comments:', error));
}

function change_url(t) {
   var e = t.getAttribute("data-name"); 
   var targetButton = document.querySelector("." + e + "-btn"); 

   if (targetButton) {
       targetButton.click();
       targetButton.scrollIntoView({ behavior: "smooth" });
   }
}

function loadContentHomaPage(){
   loadSearchEngine('search-engine-en.bc' , 'search-box');
}

async function loadSearchEngine(url, sectionload) {
   try {
       var xhrobj = new XMLHttpRequest();
       xhrobj.open('GET', url);
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
                   document.head.appendChild(scriptTag).parentNode.removeChild(scriptTag);
               }
           }
       };
   } catch (error) {
   }
}
/*------------------CURRENCY-----------------------*/
document.addEventListener("DOMContentLoaded", function () {
   localStorage_getCurrency();

   if (document.querySelector(".contain-currency-show")) {
       document.querySelector(".currency-selected").setAttribute("onclick", "");
   }

   document.addEventListener('click', function (event) {
       if (!event.target.closest('.currency-selected,.currency-list')) {
           document.querySelector(".currency-list").classList.add("unvisible");
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
                       headerResize.querySelector(".currency-list").classList.toggle("unvisible");
                   })
                   .catch(error => console.error(error));
           } else {
               headerResize.querySelector(".currency-list").classList.toggle("unvisible");
           }
       }
   }
}

function select_currency(element) {
   let headerResize = element.closest("#header-resize");
   headerResize.querySelector(".currency-list").classList.toggle("unvisible");
   headerResize.querySelector(".currency-selected").innerText = element.innerText;
   localStorage_setCurrency(
       element.innerText, 
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
               document.querySelector(".currency-selected").innerText = '--Select--';
               document.querySelector(".currency-selected").setAttribute("data-active", 0);
               clearInterval(timer);
               console.log('localStorage has expired');
           }
       }, 1000);
   }
}
//<!---------------LOGIN JS--------------->//
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 1024) {
        const loginInfo = document.querySelector('.Login_Information');
        const col3SecondPart = document.querySelector('.login_info_mobile');
        if (loginInfo && col3SecondPart) {
            col3SecondPart.appendChild(loginInfo);
          }
    }
 });








