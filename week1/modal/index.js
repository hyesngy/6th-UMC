const open = document.getElementById("open");
const close = document.getElementById("close");
const modalWrapper = document.querySelector(".modal-wrapper");

open.onclick = () => {
  modalWrapper.style.display="flex";
};

close.onclick = () => {
  modalWrapper.style.display="none";
};