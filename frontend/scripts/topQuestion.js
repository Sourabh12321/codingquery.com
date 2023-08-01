document.querySelector(".AskButton").addEventListener("click", () => {
    window.location.href = "query.html"
})

// Suppose the current URL is "https://example.com/?id=123&name=John"
const params = new URLSearchParams(window.location.search);

// Get the value of the "id" parameter
const githubtoken = params.get('token'); // "123"
const githubname = params.get('Name'); // "123"


let chatbtn = document.querySelector("#chat");
let home = document.querySelector("#homeA");
home.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    window.location.href = "https://thunderous-alpaca-184d8d.netlify.app/"
})
let homee = document.querySelector("#homeLogo");
homee.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    window.location.href = "https://thunderous-alpaca-184d8d.netlify.app/"
})


// Get the value of the "name" parameter
if (githubname) {
    sessionStorage.setItem("token", githubtoken);
    sessionStorage.setItem("Name", githubname);

}
window.onload = function () {
    const hambtn1 = document.querySelector("#ham-nav");
    const hambtn = document.querySelector(".hamburger");
    hambtn.addEventListener("click", () => {
        hambtn.classList.toggle("is-active");
        hambtn1.classList.toggle("is-active");
    })
}


let token = sessionStorage.getItem("token")

chatbtn.addEventListener("click", (a) => {
    a.preventDefault();
    if (token) {
        window.location.href = "../frontend/chat.html"
    } else {
        swal({
            title: "Please Login first",
            icon: "warning",
        });
    }

})
let logout = document.querySelector("#logout").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "https://thunderous-alpaca-184d8d.netlify.app/"
})

if (token) {
    document.getElementById("ls").style.display = "none"
    document.querySelector(".user").innerText = "Hi!!" + " " + sessionStorage.getItem("Name");
} else {
    document.querySelector("#Name").style.display = "none"
}

async function getData() {
    let data = await fetch("https://codingquery.onrender.com/question/getAllQuestions");
    let res = await data.json();
    showAllQuestion(res)
}
getData()

let thirdSection = document.querySelector(".third-section")

function showAllQuestion(array) {
    array.forEach((item) => {
        // console.log(item)
        let detailsDiv = document.createElement("div");
        detailsDiv.setAttribute("class", "details")

        let votesDiv = document.createElement("div");
        votesDiv.setAttribute("class", "votes")
        votesDiv.innerHTML = "0 votes"

        let answerDiv = document.createElement("div");
        answerDiv.setAttribute("class", "answer")
        answerDiv.innerHTML = `${item.answer.length}  answer`


        let titleDiv = document.createElement("div");
        titleDiv.setAttribute("class", "title")

        let linkdiv = document.createElement("a");
        linkdiv.setAttribute("src", "Link");

        let questionTitleDiv = document.createElement("div");
        questionTitleDiv.setAttribute("class", "questionTitle")
        questionTitleDiv.innerHTML = item.title

        linkdiv.append(questionTitleDiv)

        let userNameDiv = document.createElement("div");
        userNameDiv.setAttribute("class", "userName")
        userNameDiv.innerHTML = item.name + " " + item.Date.substring(0, 15) + " " + item.Time;

        let hrDiv = document.createElement("hr");
        hrDiv.style.marginTop = "20px"

        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "eCard");
        cardDiv.setAttribute("id", item._id)
        cardDiv.addEventListener("click", () => {
            localStorage.setItem("particularQuestion", JSON.stringify(item))
            window.location.href = "../frontend/questions.html"
        })

        detailsDiv.append(votesDiv, answerDiv)
        titleDiv.append(linkdiv, userNameDiv)

        cardDiv.append(detailsDiv, titleDiv)

        thirdSection.append(cardDiv, hrDiv)
    });
}

// function questionClicked(event){
//     console.log(event)
// }

