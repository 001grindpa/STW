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
        const checkBox = body.querySelector("main #check");
        const menu = body.querySelector("main .menu");
        const todate = body.querySelector("main .todate");
        const tBody = body.querySelector("main .menu table #tBody");

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
            wheel_img.classList.add("spin");
            priceImgs.forEach(el => el.style.display = "none");

            let r = await fetch("/randPrice");
            let data = await r.json();

            // interact with price items
            let priceFeedObj = Object.values(data.priceFeedObj);
            
            localStorage.setItem("feed", JSON.stringify(priceFeedObj));
            console.log(localStorage.getItem("feed"));

            let arr = data.priceFeed;
            console.log(arr)
            

            if (data.priceFeed.msg == "Bike") {
                priceImgs[0].style.display = "block";
                priceTxt.textContent = "bike!";
            }
            else if (data.priceFeed.msg == "Home") {
                priceImgs[1].style.display = "block";
                priceTxt.textContent = "house!";
            }
            else if (data.priceFeed.msg == "Pen") {
                priceImgs[2].style.display = "block";
                priceTxt.textContent = "pen!";
            }
            else if (data.priceFeed.msg == "Nike") {
                priceImgs[3].style.display = "block";
                priceTxt.textContent = "Nike Airforce shoe!";
            }
            else if (data.priceFeed.msg == "Free spin") {
                // priceImgs[3].style.display = "block";
                priceTxt.textContent = "Free spin!";
            }

            setTimeout(() => {
                wheel_img.classList.remove("spin");
                resultBg.style.display = "block";
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                tr.prepend(td2);
                tr.prepend(td);
                td.textContent = arr.msg;
                td2.textContent = arr.date;
                tBody.prepend(tr);
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