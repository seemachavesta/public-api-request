
const randomUserUrl = "https://randomuser.me/api/?results=12&nat=us";
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const searchContainer = document.querySelector('.search-container')
const userData = [];
let currentIndex = 0;

// fetching data for url 
async function getJson(){
   try{
      const response = await fetch(randomUserUrl);
      return await response.json();
   }catch(error) {
      throw error;
   }
}

// generate SearchBar for user search
function generateSearchBar(){
    const html =  `<form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
   </form>`
   searchContainer.insertAdjacentHTML('beforeend', html);
}
generateSearchBar()

// Format the Date of Birth
function formatDob(dob) {
   const year = dob[0].split('-')[0];
   const month = dob[0].split('-')[1];
   const day = dob[0].split('-')[2];
   const regex = /\d{4}-\d{2}-\d{2}/gm
   dob = dob.match(regex);
   return `${ month }/${ day }/${ year }`
 }

// Creating HTML for Gallery
function generateHTML(user){
   user.results.forEach(data => {
      userData.push(data)
      const {name, email, location:{city, state}, picture} = data;
         let htmlComponent = `<div class="card" data-id="${data.id.value}">
         <div class="card-img-container">
            <img class="card-img" src="${picture.large}" alt= 'person img'>
         </div>
         <div class="card-info-container">
         <h3 id="name" class="card-name cap">${name.first} ${name.last} </h3>
         <p class="card-text">${email} </p>
         <p class="card-text cap">${city}, ${state}</p>
         </div>
      </div>
      `
         gallery.insertAdjacentHTML('beforeend', htmlComponent);

   })
      }

      function formatDob(dob) {
         const dobRegex = /\d{4}-\d{2}-\d{2}/gm
         dob = dob.match(dobRegex)
         const year = dob[0].split('-')[0]
         const month = dob[0].split('-')[1]
         const day = dob[0].split('-')[2]
         return `${ month }/${ day }/${ year }`
       }
// Crating creating HTML element for model;
function generateModel(user){
      const {name, picture, email, location, phone, dob} =  user;

      let bDate = formatDob(dob.date)
      const div = document.createElement('div');
      div.className = 'modal-container';
      let html = ` <div class="modal">
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
            <div class="modal-btn-container">
               <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
               <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
         </div>`
            div.insertAdjacentHTML('beforeend', html);
            gallery.parentNode.insertBefore(div, gallery.nextElementSibling);
   
}

// function for preview next or previs users
function toggleModel(user){
      const {name: {first, last}, picture, email, location, phone, dob} =  user;
      let bDate = formatDob(dob.date);

      const modalInfo = document.querySelector('.modal-info-container').children;
      for(let i = 0; i < modalInfo.length; i++){
         const info = modalInfo[i]
         if(info.className == 'modal-img'){
            info.src = picture.large;
         }
         if(info.id === 'name'){
            info.textContent = `${first} ${last}`;
         }
         if(info.id === 'email'){
            info.textContent = email;
         }
         if(info.id === 'location'){
            info.textContent = location.city;
         }
         if(info.id === 'phone-number'){
            info.textContent = phone;
         }
         if(info.id === 'address'){
            info.textContent = `${location.street.number} ${location.street.name}., ${location.city}, ${location.state} ${location.postcode}`;
         }
         if(info.id === 'birthday'){
            info.textContent = `Birthday: ${bDate}`;
         }
      }
      
      
}

// click event for displaying model
gallery.addEventListener('click', (e) => {
   const card = e.target.parentElement.parentElement;
   userData.forEach((n, i) => {
      if(n.id.value === card.dataset.id){
         currentIndex = i;   
      }  
   })
   generateModel(userData[currentIndex])
})

// Closing and toggle model
body.addEventListener('click', (e) => {  

   if(e.target.tagName === 'STRONG'){
      const div = e.target.parentElement.parentElement.parentElement;
      div.style.display = 'none';
   }
   if(e.target.id === 'modal-next'){
     
      currentIndex++
      if(currentIndex > userData.length - 1){
         currentIndex = 0;
      }
      toggleModel(userData[currentIndex]);
      
   }
   if(e.target.id === 'modal-prev'){
      currentIndex --
      if(currentIndex < 0){
         currentIndex = userData.length - 1;
      }
      toggleModel(userData[currentIndex]);

   }
})
// Display the gallery;
getJson().then(generateHTML)



