'use strict'; 

let selectedUser;
const form = document.forms.editUserForm;

function creatButton(text) {
  const btnView = document.createElement('button');
  btnView.classList.add('btn-view', 'btn-style');
  btnView.innerText = text;
  btnView.setAttribute('data-action', text);
  return btnView;
}

function showUserInfo (user, index) {
  const userInfo = document.getElementById('user-info');
  if (selectedUser === index) {
    userInfo.innerHTML = '';
    selectedUser = null;
  } else {
    userInfo.innerHTML = `
      Name: ${user.name} </br>
      Password: ${user.password} </br>
      Age: ${user.age} </br>
      Email: ${user.email} </br>
      Phone number: ${user.phoneNumber} </br>
      Bankcard number: ${user.cardNumber} </br>
    `;  
    selectedUser = index;  
  }
}

function removeUser (index) {
  const usersList = getUsersList();

  document.getElementById('modal-text').innerText = `
  Are you sure you want to delete ${usersList[index].name}?
  `;

  const modal = document.getElementById('remove-user-modal');
  modal.style.display = 'block';

  const btnConfirm = document.getElementById('btn-confirm');
  btnConfirm.onclick = function () {
    usersList.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usersList));
    document.getElementById('user-list').innerHTML = '';
    showUsers(usersList);
    
    if (selectedUser === index) {
      document.getElementById('user-info').innerHTML = '';
      selectedUser = null;
    }
    modal.style.display = 'none';
  }

  const btnCancel = document.getElementById('btn-cancel');
  btnCancel.onclick = function () {
    modal.style.display = 'none';
  }
}

function editUserInfo(user, index) {
  const formElem = document.getElementById('form');
  formElem.classList.remove('hidden');
  for (let property in user) {
    form.elements[property].value = user[property];
  }

  const usersList = getUsersList();

  const btnSave = document.getElementsByClassName('btn-save')[0];
  btnSave.onclick = function () {
    for (let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].type === 'button') {
        continue;
      } 
      usersList[index][form.elements[i].name] = form.elements[i].value;
    }
    localStorage.setItem('users', JSON.stringify(usersList));
    document.getElementById('user-list').innerHTML = '';
    formElem.classList.add('hidden');
    showUsers(usersList);
  };
}

function showUsers (usersList) {
  const usersListContainer = document.getElementById('user-list');
  for (let i = 0; i < usersList.length; i++) {
    const userItem = document.createElement('div');
    userItem.classList.add('user-item');
    userItem.innerHTML = `
    <span class="user-name"> ${usersList[i].name} </span>
    `;
    userItem.onclick = function(event) {
      let target = event.target;
      if (target.tagName !=='BUTTON') return;
      const targetAction = target.getAttribute('data-action');  
      if (targetAction === 'View') {
        showUserInfo(usersList[i], i);
      }  else if (targetAction === 'Remove') {
        removeUser (i);
      } else if (targetAction === 'Edit') {
        editUserInfo(usersList[i], i);
      }
    };
    userItem.appendChild(creatButton('View'));
    userItem.appendChild(creatButton('Edit'));
    userItem.appendChild(creatButton('Remove'));
    usersListContainer.appendChild(userItem);
  }
}

function getUsersList () {
  let usersInStorage = localStorage.getItem('users');
  if (usersInStorage) {
    return JSON.parse(usersInStorage)
  } 
  return users;
}

const usersList = getUsersList();
showUsers(usersList);




