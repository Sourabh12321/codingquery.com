// let Maindiv = document.getElementById("renderhere");

// let query = localStorage.getItem("query");
// // const baseURL = "http://localhost:8000"
// if (query) {
//     console.log(query)
//     callthisfun(query)

//     async function callthisfun(query) {
//         let data = await fetch(`${baseURL}/questions/search/${query}`);
//         let res = await data.json();
//         console.log(res)
//         // console.log(window.location.href)

//         if (res.length == 0) {
//             document.getElementById("ques").value = ""
//             Maindiv.innerHTML = ""
//             Maindiv.innerHTML = "<h3>Sorry, No questions are found</h3>"
//         }

//         else {
//             document.getElementById("ques").value = ""
//             Maindiv.innerHTML = ""
//             renderData(res);
//         }

//         localStorage.removeItem("query");

//     }

// }
// else {
//     getData()
// }
let thirdSection = document.querySelector(".third-section")
        let votesDiv = document.createElement("div");
        votesDiv.setAttribute("class","votes")
        votesDiv.innerHTML = "votes"

        let answerDiv = document.createElement("div");
        answerDiv.setAttribute("class","answer")
        answerDiv.innerHTML = "answer"


        let titleDiv = document.createElement("div");
        titleDiv.setAttribute("class","title")

        let linkdiv = document.createElement("a");
        linkdiv.setAttribute("src","Link");

        let questionTitleDiv = document.createElement("div");
        questionTitleDiv.setAttribute("class","questionTitle")
        questionTitleDiv.innerHTML = "Questions"

        linkdiv.append(questionTitleDiv)

        let userNameDiv = document.createElement("div");
        userNameDiv.setAttribute("class","userName")
        userNameDiv.innerHTML = "userName";

        detailsDiv.append(votesDiv,answerDiv)
        titleDiv.append(linkdiv,userNameDiv)

        thirdSection.append(cardDiv,hrDiv)
    });
}
