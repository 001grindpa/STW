document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id == "landing") {
        const body = document.querySelector("body");
        const enter = document.querySelector("#enter");
        const formEl = body.querySelector("main form");
        const notifyCont = body.querySelector("main .notify");

        formEl.addEventListener("submit", async (e) => {
            e.preventDefault();
            let form = new FormData(formEl);
            let username = form.get("username");

            let notify = document.createElement("div");
            notifyCont.appendChild(notify);

            try {
                let r = await fetch("/landing", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({"username": username})
                });
                let d = await r.json();
                console.log(d.msg);
                if (localStorage.getItem("feed")) {
                    localStorage.removeItem("feed");
                }
                if (d.msg == "please enter a username") {
                    notify.textContent = "Please enter a username";
                    notify.classList.add("slideIn");
                    setTimeout(() => {
                        notify.classList.remove("slideIn");
                        notify.classList.add("slideOut");
                    }, 3000);
                    setTimeout(() => notifyCont.removeChild(notify), 4000);
                }
                if (d.msg == "enter") {
                    if (localStorage.getItem("muted")) {
                        localStorage.removeItem("muted");
                    }
                    enter.click();
                }
            }
            catch(error) {
                console.log("error: " + error)
            }
        })
    }
    else if (document.body.id === "index") {
        const body = document.querySelector("body");
        const press = body.querySelector("main .wheel_img .press");
        const wheel_img = body.querySelector("main .wheel_img img");
        const htpCheck = body.querySelector("main #htp");
        const htpBtn = body.querySelector("main .float");
        const htpNot = body.querySelector("main .htp");
        const resultBg = body.querySelector("main .resultBg");
        const result = body.querySelector("main .resultBg .result");
        const priceImgs = body.querySelectorAll("main .resultBg .result .imgs img");
        const freeSpin  = body.querySelector("main .resultBg .result .freeSpin");
        const counter = body.querySelector("main .counter")
        const priceTxt = body.querySelector("main .resultBg .priceTxt");
        const spinAgainBtn = body.querySelector("main .resultBg .result .again");
        const checkBox = body.querySelector("main #check");
        const menu = body.querySelector("main .menu");
        const todate = body.querySelector("main .todate");
        const tBody = body.querySelector("main .menu table #tBody");
        const loader = body.querySelector(".loader");
        const mainBody = body.querySelector(".mainCont");
        const achievedCont = body.querySelector("main .greet + .won + div");
        const nullCollection = body.querySelector("main .greet + .won + div div");
        // audio objects
        const tada = body.querySelector("main #tada");
        const wheelSound = body.querySelector("main #wheel-sound");
        const audioCheck = body.querySelector("main #audio");
        const audioLogo = body.querySelector("main .audioConfig img");
        const audioNotice = body.querySelector("main #audio ~ div");
        
        //test
        // let achieved = document.createElement("img");
        // achieved.src = "/static/gifs/Bike.gif";
        // achievedCont.appendChild(achieved);

        // load page
        window.addEventListener("load", () => {
            loader.style.display = "block";
            mainBody.style.display = "block";
        })

        // mute and unmute audio
        audioLogo.addEventListener("click", () => {
            if (audioCheck.checked == false) {
                audioLogo.src = "/static/images/audio.png";
                audioNotice.textContent = "click to unmute app audio";
                wheelSound.muted = true;
                tada.muted = true;
                localStorage.setItem("muted", true);
            }
            else {
                audioLogo.src = "/static/images/no-audio.png";
                audioNotice.textContent = "click to mute app audio";
                wheelSound.muted = false;
                tada.muted = false;
                localStorage.removeItem("muted");
            }
        })
        // check audio state
        if (localStorage.getItem("muted")) {
            audioCheck.checked = true;
            audioLogo.src = "/static/images/audio.png";
            audioNotice.textContent = "click to unmute app audio";
            wheelSound.muted = true;
            tada.muted = true;
            localStorage.setItem("muted", true);
        } else {
            audioLogo.src = "/static/images/no-audio.png";
            audioNotice.textContent = "click to mute app audio";
            wheelSound.muted = false;
            tada.muted = false;
            localStorage.removeItem("menu");
        }
        
        // date setup
        let date = new Date().getDate();
        let month = new Date().toLocaleString("default", {"month": "short"});
        if (localStorage.getItem("feed")) {
            let arr = localStorage.getItem("feed");
            
            console.log(arr);
            for (let i of JSON.parse(arr)) {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                tr.prepend(td2);
                tr.prepend(td);
                td.textContent = i.msg;
                td2.textContent = i.date;
                tBody.prepend(tr);
            }
        }

        todate.textContent = `${date} ${month}`;

        checkBox.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
        })

        menu.addEventListener("click", (e) => {
            e.stopPropagation();
        })

        spinAgainBtn.addEventListener("click", () => {
            resultBg.style.display = "none";
        })

        body.addEventListener("click", () => {
            if (htpCheck.checked == true) {
                htpCheck.checked = false;
            }
            if (checkBox.checked == true) {
                checkBox.checked = false;
            }
        })
        htpBtn.addEventListener("click", (e) => {
            e.stopPropagation();
        })
        htpCheck.addEventListener("click", (e) => {
            e.stopPropagation();
        })
        htpNot.addEventListener("click", (e) => {
            e.stopPropagation();
        })
        
        let totalSpins = 3;

        press.addEventListener("click", async () => {
            // play wheel audio
            wheelSound.play();

            counter.textContent = parseInt(counter.textContent) + 1;
            counter.style.display = "block";
            counter.classList.add("fade");

            // deactivate spin if max spin is reached
            if (parseInt(counter.textContent) == totalSpins) {
                press.style.display = "none";
            }

            wheel_img.classList.add("spin");
            priceImgs.forEach(el => el.style.display = "none");
            freeSpin.style.display = "none";

            let r = await fetch("/randPrice");
            let data = await r.json();

            // interact with price items
            let priceFeedObj = Object.values(data.priceFeedObj);
            
            localStorage.setItem("feed", JSON.stringify(priceFeedObj));
            console.log(localStorage.getItem("feed"));

            let arr = data.priceFeed;
            console.log(arr);
            
            if (data.priceFeed.msg == "Bike") {
                priceImgs[0].style.display = "block";
                priceTxt.textContent = "bike!";
            }
            else if (data.priceFeed.msg == "Home") {
                priceImgs[1].style.display = "block";
                priceTxt.textContent = "house!";
            }
            else if (data.priceFeed.msg == "pen") {
                priceImgs[2].style.display = "block";
                priceTxt.textContent = "pen!";
            }
            else if (data.priceFeed.msg == "Nike AirMax") {
                priceImgs[3].style.display = "block";
                priceTxt.textContent = "Nike Airforce shoe!";
            }
            else if (data.priceFeed.msg == "Free spin") {
                freeSpin.style.display = "block";
                priceTxt.textContent = "Free spin!";
                totalSpins += 1;
                if (press.style.display == "none") {
                    press.style.display = "block";
                }
            }

            setTimeout(() => {
                tada.play();
                wheel_img.classList.remove("spin");
                resultBg.style.display = "block";

                // logic for creating historic data in dom
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                tr.prepend(td2);
                tr.prepend(td);
                td.textContent = arr.msg;
                td2.textContent = arr.date;
                tBody.prepend(tr);
                counter.classList.remove("fade");
                counter.style.display = "none";

                // logic for creating achieved price images in dom
                if (data.priceFeed.msg != "Free spin") {
                    nullCollection.textContent ="";
                    let achieved = document.createElement("img");
                    achieved.src = `/static/gifs/${arr.msg}.gif`;
                    achievedCont.appendChild(achieved);
                }

            }, 4000);
        })

        resultBg.addEventListener("click", () => {
            resultBg.style.display = "none";
        })
        result.addEventListener("click", (e) => {
            e.stopPropagation();
        })
    }
})