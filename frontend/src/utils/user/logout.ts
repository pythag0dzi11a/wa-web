export default function () {
    localStorage.removeItem("jwt");
    sessionStorage.clear();
    window.location.replace("/"); // do not use aJump here, to update everything
}
