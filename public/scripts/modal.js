/* eslint-disable no-undef */
const buttonNewContact = document.getElementById("btn-new-contact");
const buttonCloseNewContactWindow = document.querySelectorAll(".btn-close-modal");
const modalWrapper = document.querySelectorAll(".modal-wrapper");

document.querySelectorAll(".delete-contact").forEach(element => {
  element.addEventListener("click", event => {
    const modalDeleteContact = document.getElementById("modal-delete-contact");
    const divAddNewContact = document.getElementById("add-new-contact");
    const inputContactId = document.getElementById("contactId");
    inputContactId.value = event.target.dataset.id;
    divAddNewContact.style.visibility = "hidden";
    modalDeleteContact.classList.add("active");

    console.log(event.target.dataset.id);

    window.addEventListener(
      "keydown",
      event => {
        if (event.key == "Escape") {
          modalDeleteContact.classList.remove("active");
        } else {
          return;
        }
      },
      true,
    );
  });
});

buttonCloseNewContactWindow.forEach(element => {
  element.addEventListener("click", () => {
    modalWrapper.forEach(element => {
      element.classList.remove("active");
    });
  });
});

if (buttonNewContact) {
  buttonNewContact.addEventListener("click", () => {
    const divAddNewContact = document.getElementById("add-new-contact");

    divAddNewContact.style.visibility = "visible";

    document.getElementById("modal-add-contact").classList.add("active");

    window.addEventListener(
      "keydown",
      event => {
        if (event.key == "Escape") {
          modalWrapper.classList.remove("active");
        } else {
          return;
        }
      },
      true,
    );
  });
}
