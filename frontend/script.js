// CHANGE THIS to your Railway backend URL after deployment
const API = "https://mangahook-api-production.up.railway.app";

// Login
window.startExam = function () {
  const name = document.getElementById("name").value;
  if (!name) return alert("Enter name");

  localStorage.setItem("user", name);
  window.location.href = "exam.html";
};

// Exam Page
if (window.location.pathname.includes("exam")) {
  let answers = {};

  fetch(`${API}/api/questions`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("questions");

      data.forEach(q => {
        const div = document.createElement("div");

        div.innerHTML = `
          <p>${q.question}</p>
          ${q.options.map(opt =>
            `<button onclick="select(${q.id}, '${opt}')">${opt}</button>`
          ).join("")}
        `;

        container.appendChild(div);
      });
    });

  fetch(`${API}/api/image?q=study`)
    .then(res => res.json())
    .then(img => {
      const image = document.createElement("img");
      image.src = img.src.medium;
      document.getElementById("image").appendChild(image);
    });

  window.select = function (id, answer) {
    answers[id] = answer;
  };

  window.submitExam = function () {
    fetch(`${API}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("result", JSON.stringify(data));
        window.location.href = "result.html";
      });
  };
}

// Result Page
if (window.location.pathname.includes("result")) {
  const data = JSON.parse(localStorage.getItem("result"));

  document.getElementById("result").innerHTML =
    `Score: ${data.score} / ${data.total}`;
}
