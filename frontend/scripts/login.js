// import userDetails from "./object"
// import { baseUrl } from "./object";

//LOGIN FUNCTIONALITY
let btn = document.querySelector("#login");
btn.addEventListener("click", (e) => {
    
    e.preventDefault()
    // console.log(baseUrl);
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let obj = {
        email,
        password
    }
    if (obj.email == "" || obj.password == "") {
        swal({
            title: "Fill All the Details",
            icon: "warning",
        });
    } else {
        console.log(obj);
        lgn(obj)
    }
})

async function lgn(data) {
    // console.log("DATATATAT",data)
    try {
        let res = await fetch("http://localhost:2000/user/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" }
        })
        if (res.ok) {
            let X = await res.json()
            // console.log("XXXXX",X);
            if (X.msg == "login successful") {
                swal({
                    title: "Login Successful",
                    icon: "success",
                });
                setTimeout(() => {
                    sessionStorage.setItem("loggedInUser", JSON.stringify(data.email))
                    sessionStorage.setItem("token", X.token);
                    sessionStorage.setItem("Name", X.user);
                    // window.location.href = `./topQuestions.html?token=${X.token}&name=${X.user}&email=${X.email}`;
                }, 3000)
            }
            else {
                swal({
                    title: "Login Unsuccessful",
                    icon: "error",
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
}