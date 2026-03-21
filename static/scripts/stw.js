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
        const priceTxt = body.querySelector("main .resultBg .priceTxt");
        const spinAgainBtn = body.querySelector("main .resultBg .result .again");
        const hamburger = body.querySelector("main .burger");
        const menu = body.querySelector("main .menu");
        const todate = body.querySelector("main .todate");

        let date = new Date().getDate();
        let month = new Date().toLocaleString("default", {"month": "short"});
        
        todate.textContent = `${date} ${month}`;

        hamburger.addEventListener("click", (e) => {
            if (menu.style.transform < "translateX(-99%)") {
                menu.style.transform = "translateX(0)";
            } else {
                menu.style.transform = "translateX(-100%)";
            }
            e.stopPropagation();
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
            if (menu.style.transform > "translateX(-10%)") {
                menu.style.transform = "translateX(-100%)";
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
            wheel_img.classList.add("spin");
            priceImgs.forEach(el => el.style.display = "none");

            let r = await fetch("/randPrice");
            let data = await r.json();

            // interact with price items
            if (data.msg == "Bike") {
                priceImgs[0].style.display = "block";
                priceTxt.textContent = "Bike!";
            }
            else if (data.msg == "Home") {
                priceImgs[1].style.display = "block";
                priceTxt.textContent = "Home!";
            }
            else if (data.msg == "Pen") {
                priceImgs[2].style.display = "block";
                priceTxt.textContent = "Pen!";
            }
            else if (data.msg == "Nike") {
                priceImgs[3].style.display = "block";
                priceTxt.textContent = "Nike Airforce!";
            }

            setTimeout(() => {
                wheel_img.classList.remove("spin");
                resultBg.style.display = "block";
            }, 3000);
        })

        resultBg.addEventListener("click", () => {
            resultBg.style.display = "none";
        })
        result.addEventListener("click", (e) => {
            e.stopPropagation();
        })

    }
})