/* eslint-disable no-undef */
const buttonNewContact = document.getElementById("btn-new-contact");
const buttonCloseContactModalWindow = document.querySelectorAll(".btn-close-modal");
const modalWrapper = document.querySelectorAll(".modal-wrapper");

if (buttonNewContact) {
  buttonNewContact.addEventListener("click", () => {
    document.getElementById("modal-add-contact").classList.add("active");
  });
}

document.querySelectorAll(".edit-contact").forEach(element => {
  element.addEventListener("click", event => {
    const modalEditContact = document.getElementById("modal-edit-contact");
    const inputContactId = document.getElementById("editContactId");
    const inputContactName = document.getElementById("editContactName");
    const inputContactPhone = document.getElementById("editContactPhone");
    const inputContactEmail = document.getElementById("editContactEmail");

    inputContactId.value = event.target.dataset.id;
    inputContactName.value = event.target.dataset.name;
    inputContactPhone.value = event.target.dataset.phone;
    inputContactEmail.value = event.target.dataset.email;

    modalEditContact.classList.add("active");
  });
});

document.querySelectorAll(".delete-contact").forEach(element => {
  element.addEventListener("click", event => {
    const modalDeleteContact = document.getElementById("modal-delete-contact");
    const inputContactId = document.getElementById("deleteContactId");
    inputContactId.value = event.target.dataset.id;
    modalDeleteContact.classList.add("active");
  });
});

buttonCloseContactModalWindow.forEach(element => {
  element.addEventListener("click", () => {
    modalWrapper.forEach(element => {
      element.classList.remove("active");
    });
  });
});

modalWrapper.forEach(element => {
  window.addEventListener(
    "keydown",
    event => {
      if (event.key == "Escape") {
        element.classList.remove("active");
      } else {
        return;
      }
    },
    true,
  );
});
