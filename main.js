// doc css vars
document.documentElement.style.setProperty("--mainColor", localStorage.getItem("favcolor") || "#ffa93a");
            
let lang = localStorage.getItem("lang") || "en";

function checkLink(url) {
    return Array.from(document.getElementsByTagName("link")).find(e => e.getAttribute("href") == url);
}

function langAjax(lang, func) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (lang == "ar") {
                if (checkLink("rtl.css") == undefined) {
                    var rtl = document.createElement("link");
                        rtl.type = 'text/css';
                        rtl.rel = "stylesheet";
                        rtl.href = "rtl.css";
                    document.head.appendChild(rtl);
                }
            } else if (lang == "en"){
                if (checkLink("rtl.css")) {
                    document.head.removeChild(document.head.lastChild);
                }
            }
            document.body.innerHTML = request.response;

            func();
        }
    }
    request.open("GET", `langs/${lang}.html`);
    request.send();
}

langAjax(lang, all);

function all() {

    function onReady(callback) {
        var intervalId = window.setInterval(function() {
          if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
          }
        }, 500);
      }
      
      function setVisible(selector, visible) {
        document.querySelector(selector).style.display = visible ? 'block' : 'none';
    }
      
    onReady(function() {
        setVisible('.hohoho', true);
        setVisible('#load', false);
    });
    document.getElementById("settings").classList.remove("active");
    let langs = Array.from(document.querySelectorAll(".settings .lang .langs span"));
    langs.forEach(e => {
        if (e.getAttribute("id") == lang) {
            e.classList.add("active");
        }
        e.onclick = () => {
            lang = e.getAttribute("id") 
            localStorage.setItem("lang", lang);
            langs.forEach(f => f.classList.remove("active"));
            e.classList.add("active");
            langAjax(lang, all);
        }
    });
    
    // side bar

    let sideToggler     = document.getElementById("sidebarToggler"),
    closeSidebar    = document.getElementById("closeSidebar"),
        page            = document.getElementById("page");

        function toggleSidebar () {
        sideToggler.classList.toggle("active");
        page.classList.toggle("side-on");
    }

    sideToggler.onclick = toggleSidebar;
    closeSidebar.onclick = toggleSidebar;

    let links = Array.from(document.querySelectorAll("a"));

    links.forEach (e => {
        e.onclick = () => {
            if (e.dataset.href != undefined) {
                sideToggler.classList.remove("active");
                page.classList.remove("side-on");
                setTimeout(f => {
                    document.getElementById(e.dataset.href).scrollIntoView({
                        block: "nearest",
                        inline: "center",
                        behavior: "smooth"
                    });
                }, 500)
        
            }
        }
    });

    // coloring 

    let color = document.getElementById("color"),
    colorsList = document.querySelectorAll(".colorsList span");
        
    colorsList.forEach(e => {
        if (document.documentElement.style.getPropertyValue("--mainColor") == e.dataset.color) {
            e.classList.add("active");
        }
        e.onclick = function () {
            localStorage.setItem("favcolor", e.dataset.color);
            document.documentElement.style.setProperty("--mainColor", localStorage.getItem("favcolor"));
            colorsList.forEach(f => f.classList.remove("active"));
            e.classList.add("active");
        }
    })

    color.oninput = function () {
        localStorage.setItem("favcolor", color.value);
        document.documentElement.style.setProperty("--mainColor", localStorage.getItem("favcolor"));
        colorsList.forEach(e => {
            e.classList.remove("active");
            if (document.documentElement.style.getPropertyValue("--mainColor") == e.dataset.color) {
                e.classList.add("active");
            }
        });
    }

    // settings

    let gear = document.getElementById("gear"),
        settings = document.getElementById("settings");
    gear.onclick = () => {
        settings.classList.toggle("active");
    }

    // sidebar search 

    let search      = document.getElementById("search"),
        allLinks         = document.querySelectorAll("ul#linkoos li a"),
        linkoos     = document.getElementById("linkoos");
    
    search.oninput = function () {
        if (search.value.length > 0) {
            let sideLinks   = Array.from(document.querySelectorAll("ul#linkoos li a")),
                reg = new RegExp(".*" + search.value.split("").join(".*") + ".*", "gi");
            
            let searched = sideLinks.filter(e => reg.test(e.textContent));
            sideLinks.forEach(e => {
                document.getElementById("linkoos").removeChild(e.parentElement);
            });
            searched.forEach(e => {
                let li = document.createElement("li");
                li.appendChild(e); 
                linkoos.appendChild(li);
            })
        } else {
            allLinks.forEach(e => {
                let linkoos = document.getElementById("linkoos");
                let li = document.createElement("li");
                li.appendChild(e); 
                linkoos.appendChild(li);
            })
        }
    }

    // to top

    let top = document.getElementById("toTop");
    top.onclick = function () {
        window.scrollTo({
            top: 0,
            left:0,
            behavior: "smooth"
        });
    }

}
