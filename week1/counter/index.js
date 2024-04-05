const number = document.getElementById("number");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");

increase.onclick = () => {
    console.log("increase 가 클릭됨");
    number.innerText++;
  };
  
  decrease.onclick = () => {
    console.log("decrease 가 클릭됨");
    number.innerText--;

  };