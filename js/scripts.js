"use strict";
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
// Displaying data on gallery
getJson().then(data => {
   data.results.forEach(user => {
      userData.push(user);
      generateHTML(user);
   })
}).catch(error => {
   console.log('Some thing went wrong', error);
   let html = `<div class="card">No Result Found</div>`
   gallery.insertAdjacentHTML('beforeend', html);
});

// Format the Date of Birth
function formatDob(dob) {
   const dobRegex = /\d{4}-\d{2}-\d{2}/gm;
   dob = dob.match(dobRegex);
   const year = dob[0].split('-')[0];
   const month = dob[0].split('-')[1];
   const day = dob[0].split('-')[2];
   return `${ month }/${ day }/${ year }`;
   }


// function for preview next or previs users
function toggleModel(user){  
   const {name: {first, last}, picture, email, location, phone, dob} =  user;
   let bDate = formatDob(dob.date);

   const modalInfo = document.querySelector('.modal-info-container').children;
   for(let i = 0; i < modalInfo.length; i++){
      const info = modalInfo[i];
       console.log(info)
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

   if(e.target.id === 'modal-close-btn' || e.target.tagName === 'STRONG'){
     const modalContainer = document.querySelector('.modal-container');
     const parentElement = modalContainer.parentElement;
     parentElement.removeChild(modalContainer);  
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

 // Display the search item form gallery;
searchContainer.addEventListener('keyup', () => {
   const value = document.querySelector('#search-input').value.toLowerCase();
   const card = document.querySelectorAll('.card');

   for(let i = 0; i < card.length; i++){
     let h3 = card[i].querySelector('h3');
     let name = h3.textContent.toLowerCase();
     if(name.includes(value)){
        card[i].style.display = '';
     }else{
        card[i].style.display = 'none';
     }
   }
})
