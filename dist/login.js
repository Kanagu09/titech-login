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
    if (!formUserName || !formUserPass || !formSubmit)
        errorLog("login-id-page-no-form");
    if (userData.studentId && userData.password) {
        formUserName.value = userData.studentId;
        formUserPass.value = userData.password;
        formSubmit.submit();
    }
    else {
        const submit = function () {
            if (formUserName.value && formUserPass.value)
                formSubmit.submit();
        };
        formUserName.addEventListener("input", submit);
        formUserPass.addEventListener("input", submit);
    }
}
if (patternLoginSelect.test(url)) {
    console.log("login-select-page");
    const formMethod = document.getElementsByName("message3")[0];
    const formSubmit = document.getElementsByName("login")[0];
    if (!formMethod || !formSubmit)
        errorLog("login-select-page-no-form");
    formMethod.selectedIndex = 1;
    formSubmit.submit();
}
if (patternLoginMatrix.test(url)) {
    console.log("login-matrix-page");
    const formTable = document.getElementById("authentication");
    if (!formTable)
        errorLog("login-matrix-page-no-form");
    for (let i = 3; i < 6; i++) {
        const formMatrixStr = formTable.rows[i].cells[0].innerHTML;
        if (!formMatrixStr)
            errorLog("login-matrix-page-no-form");
        const matrixRow = alphabetToNumber(formMatrixStr[1]);
        const matrixCell = Number(formMatrixStr[3]) - 1;
        console.log(matrixRow, ",", matrixCell);
        if (matrixRow == -1 || isNaN(matrixCell))
            errorLog("login-matrix-page-illegal-index");
        const formMatrix = document.getElementsByName("message" + i)[0];
        if (!formMatrix)
            errorLog("login-matrix-page-no-form");
        formMatrix.value = userData.matrix[matrixCell][matrixRow];
    }
    const formSubmit = document.getElementsByName("login")[0];
    if (!formSubmit)
        errorLog("login-matrix-page-no-form");
    formSubmit.submit();
}
function errorLog(errorCode) {
    alert("Login-error.\n" +
        "Redirect to https://portal.nap.gsic.titech.ac.jp\n\n" +
        "error-code: " + errorCode);
    location.href = "https://portal.nap.gsic.titech.ac.jp";
}
function alphabetToNumber(str) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.indexOf(str);
}
