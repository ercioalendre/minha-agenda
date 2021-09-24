/* eslint-disable no-undef */
const buttonCloseErrorWrapper = document.getElementById("close-error");
const buttonGoToMyAccount = document.getElementById("go-to-my-account");

if (buttonGoToMyAccount)
  buttonGoToMyAccount.addEventListener("click", () => (window.location.href = "/my-account"));

if (buttonCloseErrorWrapper)
  buttonCloseErrorWrapper.addEventListener("click", () => removeErrorWrapper());

function removeErrorWrapper() {
  document.getElementById("message-wrapper").remove();
}
