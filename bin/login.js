"use strict";
const url = location.href;
console.log(url);
const patternTop = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/(portal\.pl.*)?$/;
const patternLoginId = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=userpass_key\&AUTHMETHOD\=UserPassword$/;
const patternLoginSelect = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=idg_key.*$/;
const patternLoginMatrix = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login$/;
if (patternTop.test(url)) {
    console.log("top_page");
    const loginUrl = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=userpass_key&AUTHMETHOD=UserPassword";
    location.href = loginUrl;
}
if (patternLoginId.test(url)) {
    console.log("login-id-page");
    const formUserName = document.getElementsByName("usr_name")[0];
    const formUserPass = document.getElementsByName("usr_password")[0];
    const formSubmit = document.getElementsByName("login")[0];
    formUserName.value = userData.studentId;
    formUserPass.value = userData.password;
    formSubmit.submit();
}
if (patternLoginSelect.test(url)) {
    console.log("login-select-page");
    const formMethod = document.getElementsByName("message3")[0];
    const formSubmit = document.getElementsByName("login")[0];
    formMethod.selectedIndex = 1;
    formSubmit.submit();
}
if (patternLoginMatrix.test(url)) {
    console.log("login-matrix-page");
    const formTable = document.getElementById("authentication");
    for (let i = 3; i < 6; i++) {
        const formMatrixStr = formTable.rows[i].cells[0].innerHTML;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const matrixRow = alphabet.indexOf(formMatrixStr[1]);
        const matrixCell = Number(formMatrixStr[3]) - 1;
        console.log(matrixRow, ",", matrixCell);
        const formMatrix = document.getElementsByName("message" + i)[0];
        formMatrix.value = userData.matrix[matrixCell][matrixRow];
    }
    const formSubmit = document.getElementsByName("login")[0];
    formSubmit.submit();
}
