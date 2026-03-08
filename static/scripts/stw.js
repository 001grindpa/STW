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
})