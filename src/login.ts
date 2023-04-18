const url = location.href;
console.log(url);

const patternTop = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/(portal\.pl.*)?$/
const patternLoginId = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=userpass_key\&AUTHMETHOD\=UserPassword$/
const patternLoginSelect = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=idg_key.*$/;
const patternLoginMatrix = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login$/;

// top-page
if (patternTop.test(url)) {
    // transition to login-page
    console.log("top_page");
    const loginUrl = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=userpass_key&AUTHMETHOD=UserPassword";
    location.href = loginUrl;
}

// login-id-page
if (patternLoginId.test(url)) {
    // submit student-id, password
    console.log("login-id-page");
    const formUserName = document.getElementsByName("usr_name")[0] as HTMLInputElement;
    const formUserPass = document.getElementsByName("usr_password")[0] as HTMLInputElement;
    const formSubmit = document.getElementsByName("login")[0] as HTMLFormElement;
    formUserName.value = userData.studentId;
    formUserPass.value = userData.password;
    formSubmit.submit();
}

// login-select-page
if (patternLoginSelect.test(url)) {
    // select authentication method
    console.log("login-select-page");
    const formMethod = document.getElementsByName("message3")[0] as HTMLSelectElement;
    const formSubmit = document.getElementsByName("login")[0] as HTMLFormElement;
    formMethod.selectedIndex = 1;
    formSubmit.submit();
}

// login-matrix-page
if (patternLoginMatrix.test(url)) {
    // submit matrix code
    console.log("login-matrix-page");
    const formTable = document.getElementById("authentication") as HTMLTableElement;
    for (let i = 3; i < 6; i++) {
        const formMatrixStr = formTable.rows[i].cells[0].innerHTML;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const matrixRow = alphabet.indexOf(formMatrixStr[1]);
        const matrixCell = Number(formMatrixStr[3]) - 1;
        console.log(matrixRow, ",", matrixCell);
        const formMatrix = document.getElementsByName("message" + i)[0] as HTMLInputElement;
        formMatrix.value = userData.matrix[matrixCell][matrixRow];
    }
    const formSubmit = document.getElementsByName("login")[0] as HTMLFormElement;
    formSubmit.submit();
}
