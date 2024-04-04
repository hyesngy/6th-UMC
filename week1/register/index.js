
var isName=0;
var isEmail=0;
var isAge=0;
var isPassword=0;
var isPwCheck=0;
var button=document.querySelector("button");
buttonActivate();

//이름
function nameCheck(){

    const nameInput= document.getElementById("username");
    const nameError= document.getElementById("nameError");

    if (nameInput.value === '') {
    nameError.textContent = "필수 입력 항목입니다!";
    nameError.style.color = "red";
    } 
    else {
    nameError.textContent = "멋진 이름이네요!";
    nameError.style.color = "green";
    isName=1;
    }
     buttonActivate();
}
document.getElementById("username").addEventListener("input", nameCheck);

//이메일
function emailCheck(){
    const emailInput=document.getElementById("email");
    const emailError=document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput.value)) {
        emailError.textContent = "올바른 이메일 형식입니다";
        emailError.style.color = "green";
        isEmail=1;
    }
    else if(emailInput.value===''){
        emailError.textContent = "이메일을 입력해주세요!";
        emailError.style.color = "red";
    }
    else{
        emailError.textContent = "올바른 이메일 형식이 아닙니다!";
        emailError.style.color = "red";
    }
    buttonActivate();
}
document.getElementById("email").addEventListener("input", emailCheck);

//나이
function ageCheck(){
    const ageInput=document.getElementById("age");
    const ageError=document.getElementById("ageError");
    ageError.style.color = "red";

    if(ageInput.value===''){
        ageError.textContent="나이를 입력해주세요!";
    }
    else if(isNaN(ageInput.value)){
        ageError.textContent="나이는 숫자 형식이어야 합니다!";
    }
    else if(ageInput.value<0){
        ageError.textContent="나이는 음수가 될 수 없습니다!";
    } 
    else if(ageInput.value.includes('.')){
        ageError.textContent="나이는 소수가 될 수 없습니다!";
    }
    else if(ageInput.value<19){
        ageError.textContent="미성년자는 가입할 수 없습니다!";
    }
    else{
        ageError.style.color = "green";
        ageError.textContent="올바른 나이 형식입니다!";
        isAge=1;
    }
    buttonActivate();
}
document.getElementById("age").addEventListener("input", ageCheck);

//비밀번호
function password(){
    const passwordInput=document.getElementById("password");
    const passwordError=document.getElementById("passwordError");
    passwordError.style.color = "red";

    const password = passwordInput.value;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    if(passwordInput.value.length<4 || passwordInput.value===''){
        passwordError.textContent="비밀번호는 최소 4자리 이상이어야 합니다.";
    }
    else if(!(hasLowerCase && hasNumbers && hasSymbols)){
        passwordError.textContent = "비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.";
    }
    else if(passwordInput.value.length>12){
        passwordError.textContent="비밀번호는 최대 12자리까지 가능합니다.";
    }
    else{
        passwordError.style.color = "green";
        passwordError.textContent="올바른 비밀번호입니다!";
        isPassword=1;
    }
    buttonActivate();

}
document.getElementById("password").addEventListener("input", password);


//비밀번호확인
function pwCheck(){
    const pwCheckInput=document.getElementById("pwCheck");
    const pwCheckError=document.getElementById("pwCheckError");
    const passwordInput=document.getElementById("password");

    if((pwCheckInput.value)!==(passwordInput.value)){
        pwCheckError.textContent="비밀번호가 일치하지 않습니다.";
        pwCheckError.style.color="red";
    }
    else if(pwCheckInput.value===''){
        pwCheckError.textContent="비밀번호가 일치하지 않습니다.";
        pwCheckError.style.color="red";
    }else{
        pwCheckError.textContent="비밀번호가 일치합니다.";
        pwCheckError.style.color="green";
        isPwCheck=1;
    }
    buttonActivate();
}
document.getElementById("pwCheck").addEventListener("input", pwCheck);

//버튼활성화

function buttonActivate(){
if(isName && isEmail && isAge && isPassword && isPwCheck){
    button.disabled=false;
}
else{
    button.disabled=true;
}
}

//모달
const modalContainer = document.querySelector(".modalContainer");
const closeBtn = document.getElementById("closeButton");

document.querySelector("button").addEventListener("click", function(event) {
    event.preventDefault();
    modalContainer.style.display = "block";
});

function close() {
    modalContainer.style.display = "none";
    document.querySelector("form").submit();
}

closeBtn.addEventListener("click", close);