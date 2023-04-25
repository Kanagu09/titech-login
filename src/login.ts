const url = location.href;
console.log(url);

// https://portal.nap.gsic.titech.ac.jp/portal.pl*
const patternTop = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/(portal\.pl.*)?$/
// https://portal.nap.gsic.titech.ac.jp/GetAccess/Login/Template=userpass_key&AUTHMETHOD=UserPassword
const patternLoginId = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=userpass_key\&AUTHMETHOD\=UserPassword$/
// https://portal.nap.gsic.titech.ac.jp/GetAccess/Login/Template=idg_key*
const patternLoginSelect = /^https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=idg_key.*$/;
// https://portal.nap.gsic.titech.ac.jp/GetAccess/Login
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
    if (!formUserName || !formUserPass || !formSubmit)
        errorLog("login-id-page-no-form");
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
    if (!formMethod || !formSubmit)
        errorLog("login-select-page-no-form");
    formMethod.selectedIndex = 1;
    formSubmit.submit();
}

// login-matrix-page
if (patternLoginMatrix.test(url)) {
    // submit matrix code
    console.log("login-matrix-page");
    const formTable = document.getElementById("authentication") as HTMLTableElement;
    if (!formTable)
        errorLog("login-matrix-page-no-form");

    for (let i = 3; i < 6; i++) {
        const formMatrixStr = formTable.rows[i].cells[0].innerHTML;
        if (!formMatrixStr)
            errorLog("login-matrix-page-no-form");

        // get matrix-index
        const matrixRow = alphabetToNumber(formMatrixStr[1]);
        const matrixCell = Number(formMatrixStr[3]) - 1;
        console.log(matrixRow, ",", matrixCell);
        if (matrixRow == -1 || isNaN(matrixCell))
            errorLog("login-matrix-page-illegal-index");

        // fill matrix
        const formMatrix = document.getElementsByName("message" + i)[0] as HTMLInputElement;
        if (!formMatrix)
            errorLog("login-matrix-page-no-form");
        formMatrix.value = userData.matrix[matrixCell][matrixRow];
    }

    const formSubmit = document.getElementsByName("login")[0] as HTMLFormElement;
    if (!formSubmit)
        errorLog("login-matrix-page-no-form");
    formSubmit.submit();
}

// error log
function errorLog(errorCode: string): void {
    alert("\
        Login-error.\n\
        Redirect to https://portal.nap.gsic.titech.ac.jp\n\n\
        error-code: " + errorCode
    );
    location.href = "https://portal.nap.gsic.titech.ac.jp";
}

// convert alphabet to number
function alphabetToNumber(str: string): number {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.indexOf(str);
}
