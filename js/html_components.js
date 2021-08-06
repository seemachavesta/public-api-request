"use strict";

const gallery = document.querySelector('#gallery');
const randomUserUrl = "https://randomuser.me/api/?results=12&nat=us";
const body = document.querySelector('body');
const searchContainer = document.querySelector('.search-container');

// Creating Search bar
const html =  `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
searchContainer.insertAdjacentHTML('beforeend', html);

// Create Gallery HTML markup
function generateHTML(data){
    const {name, picture, email, location: {city, state}} = data;
    let htmlComponent = `<div class="card" data-id="${data.id.value}">
    <div class="card-img-container">
       <img class="card-img" src="${picture.large}" alt= 'person img'>
    </div>
    <div class="card-info-container">
    <h3 id="name" class="card-name cap">${name.first} ${name.last} </h3>
    <p class="card-text">${email} </p>
    <p class="card-text cap">${city}, ${state}</p>
    </div>
 </div>`
 gallery.insertAdjacentHTML('beforeend', htmlComponent);
  
}

// Creating model for employee gallery 
function generateModel(user){
    const {name, picture, email, location, phone, dob} =  user;
    let bDate = formatDob(dob.date)
   
    const div = document.createElement('div');
    div.className = 'modal-container'
    let modalComponent = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text" id="email">${email}</p>
                <p class="modal-text cap" id="location">${location.city}</p>
                <hr>
                <p class="modal-text" id="phone-number">${phone}</p>
                <p class="modal-text" id="address">${location.street.number} ${location.street.name}., ${location.city}, ${location.state} ${location.postcode}</p>
                <p class="modal-text" id="birthday">Birthday: ${bDate}</p>
            </div>
    
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
     </div>`;

    div.insertAdjacentHTML('beforeend', modalComponent);
    gallery.parentNode.insertBefore(div, gallery.nextElementSibling);
}

