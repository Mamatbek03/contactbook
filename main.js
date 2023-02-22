let API = "http://localhost:8000/contactsbook";

let pname = document.querySelector("#name");
let surname = document.querySelector("#surname");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let img = document.querySelector("#image");
let btnAdd = document.querySelector("#btn-add");
let contactbook = document.querySelector(".contactbook");

async function getContact() {
  try {
    let res = await fetch(API);
    let contact = await res.json();
    render(contact);
  } catch (error) {
    console.log(error);
  }
}
btnAdd.addEventListener("click", async () => {
  let obj = {
    name: pname.value,
    surname: surname.value,
    email: email.value,
    phone: phone.value,
    image: img.value,
  };
  if (
    !obj.name.trim() ||
    !obj.surname.trim() ||
    !obj.email.trim() ||
    !obj.phone.trim() ||
    !obj.image.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  name.value = "";
  surname.value = "";
  email.value = "";
  phone.value = "";
  image.value = "";
  getContact();
});
function checkContact() {}
function render(contact) {
  contactbook.innerHTML = "";

  contact.forEach((item) => {
    contactbook.innerHTML += `
            <div class='person'>
            <img class='photo' src='${item.image}'>
            <div class='person-info'>
            <p>${item.surname} ${item.name}</p>
            <p>${item.email}</p>
            <p>${item.phone}</p>
            <div class='btns'>
            <button onclick='openEdit(${item.id})'
            data-bs-toggle="modal" data-bs-target="#exampleModal"
              class='btnEdit '>Edit</button>
            <button onclick='deleteContact(${item.id})' class='btnDelete'>Delete</button>
            </div>
            </div>
            </div>
            `;
  });
}
getContact();

async function deleteContact(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    getContact();
  } catch (error) {
    console.log(error);
  }
}
let editName = document.querySelector(".edit-name");
let editSurname = document.querySelector(".edit-surname");
let editEmail = document.querySelector(".edit-email");
let editPhone = document.querySelector(".edit-phone");
let editImg = document.querySelector(".edit-img");
let saveEditBtn = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");

let newObj = {};

function inputs() {
  newObj = {
    name: editName.value,
    surname: editSurname.value,
    email: editEmail.value,
    phone: editPhone.value,
    image: editImg.value,
  };
}

async function openEdit(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let editObj = await res.json();
    editName.value = editObj.name;
    editSurname.value = editObj.surname;
    editEmail.value = editObj.email;
    editPhone.value = editObj.phone;
    editImg.value = editObj.image;
    saveEditBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}

saveEditBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  inputs();
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newObj),
    });
  } catch (error) {
    console.log(error);
  }
  getContact();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});
