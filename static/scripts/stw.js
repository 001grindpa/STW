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

        body.addEventListener("click", () => {
            if (htpCheck.checked == true) {
                htpCheck.checked = false;
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
        
        let choice = "";
        const choices = {
            1: "Bike", 2: "Free spin", 3: "Nike", 4: "Free spin", 5: "Pen", 6: "Home"
        }
        function randint (min, max) {
            return Math.floor(Math.random() * (max-min + 1)) + min;
        }
        let n = randint(1, 4);
        choice = choices[n];
        console.log("final choice: " + choice)


        press.addEventListener("click", () => {
            wheel_img.classList.add("spin");

            setTimeout(() => wheel_img.classList.remove("spin"), 3000);
        })
    }
})