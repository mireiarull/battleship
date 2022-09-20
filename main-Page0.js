document.querySelector("#playButton").onclick = function () {
    let userName = document.getElementById("userName").value;
    valueSenderUserName(userName);
    location.href = "./index-Page1.html";
};

document.onkeydown = (evt) => {
    if(evt.key === "Enter"){
        let userName = document.getElementById("userName").value;
        valueSenderUserName(userName);
        location.href = "./index-Page1.html";
    }
  }

const valueSenderUserName = (userName) => {
    localStorage.setItem("userName", userName);
    window.location.href = "index-Page1.html";
    window.location.href = "index-Page2.html";
}