document.querySelector(".AskButton").addEventListener("click", () => {
    window.location.href = "query.html"
})

let token = sessionStorage.getItem("token")

let logout = document.querySelector("#logout").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../index.html"
})

if (token) {
    document.getElementById("ls").style.display = "none"
    document.querySelector(".user").innerText = "Hi!!" + " " + sessionStorage.getItem("Name");
} else {
    document.querySelector("#Name").style.display = "none"
}

async function getData() {
    let data = await fetch("http://localhost:2000/question/getAllQuestions");
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

