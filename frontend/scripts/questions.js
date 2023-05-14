let question_div = document.getElementById("question");
let question_id = localStorage.getItem("question_id");





// storing Particula quesition in localStoarage 
const particularquestion = JSON.parse(
  localStorage.getItem("particularQuestion")
);

renderQuestion(particularquestion);

function renderQuestion(particularquestion) {
  //   console.log("HEllO", particularquestion);

  question_div.innerHTML = null;
  let temp = document.createElement("div");

  let name = document.createElement("p");
  name.innerText = `Author: ${particularquestion.name}`;

  let h1 = document.createElement("h1");
  h1.innerText = particularquestion.title;

  let p = document.createElement("p");
  p.setAttribute("id", "dis_que");
  p.innerHTML = particularquestion.description;

  let posted = document.createElement("p");
  posted.innerText =
    "Asked at: " +
    particularquestion.Date.substring(0, 15) +
    " , " +
    particularquestion.Time;

  temp.classList = "upper_name_date";
  temp.append(name, posted);

  question_div.append(h1, temp, p);

  document.getElementById(
    "ans_count"
  ).innerText = `${particularquestion.answer.length} Answers`;
}

function answers(data) {
  console.log("Answer Data", data);
  document.getElementById("ans").innerHTML = null;
  let i = 0;
  data.forEach((el) => {
    let div = document.createElement("div");
    div.classList = "answers_divs";

    let innerdiv1 = document.createElement("div");
    innerdiv1.classList = "answerer";

    let name = document.createElement("p");
    name.innerText = `Author: ${el.name}`;

    // console.log("NAAM",el.name)

    let posted = document.createElement("p");
    posted.innerText = `Answered on: ${el.Date}, ${el.Time}`;

    innerdiv1.append(name, posted);

    let innerdiv2 = document.createElement("div");

    let like = document.createElement("p");
    like.setAttribute("class", "like");
    like.innerHTML = `▲`;
    like.classList = "likebtn";

    let count = document.createElement("p");
    count.setAttribute("class", "count");
    count.innerText = 0;

    innerdiv2.append(like, count);
    like.addEventListener("click", () => {
      count.innerText = +count.innerText + 1;
    });

    let p = document.createElement("p");
    p.innerHTML = el.answer;
    // console.log("Answer", p.innerText);
    p.classList = "ans_p";

    let newdiv = document.createElement("div");
    newdiv.append(innerdiv1, p);

    div.append(innerdiv2, newdiv);

    document.getElementById("ans").append(div);
  });
}

let token = sessionStorage.getItem("token");


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
let particularQuestion = JSON.parse(localStorage.getItem("particularQuestion"));
let _id = particularQuestion._id;
document.getElementById("submit").addEventListener("click", async () => {
  let answer = quill.root.innerText;
  // console.log("answer->", answer);
  let qObj = {
    answer,
    _id,
  };
  if (token) {
    // console.log("Getting Token");
    try {
      let x = JSON.parse(localStorage.getItem("loggedInUser"));
      // console.log(x);
      let y = JSON.parse(localStorage.getItem("particularQuestion"));
      // console.log(y.email);
      if (x != y.email) {
        let post_question = await fetch(
          `https://jade-wicked-clownfish.cyclic.app/question/addans`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
            body: JSON.stringify(qObj),
          }
        );
        const res = await post_question.json();
        window.location.reload()
      } else {
        return swal({
          title: "you cannot answer your own questions",
          icon: "warning",
      });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    swal({
      title: "you have to login first",
      icon: "warning",
    });
    window.location.href = "login.html"
  }
});

let x = JSON.parse(localStorage.getItem("particularQuestion"));
let id = x._id;
async function GetSpecific(id) {
  let res = await fetch(`https://jade-wicked-clownfish.cyclic.app/question/getAllQuestions`);
  let data = await res.json();

  data.forEach((elem) => {
    if (id == elem._id) {
      answers(elem.answer);
    }
  });
}
GetSpecific(id);
