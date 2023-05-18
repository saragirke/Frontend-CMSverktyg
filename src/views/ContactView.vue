<template>
<form @submit.prevent="sendMessage()" class="bg-slate-50">
  <div class="flex justify-center items-center">
    <div class="container mx-auto my-9 px-4 lg:px-20">
      <div class="w-full p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl bg-white">
        <div class="flex justify-center items-center">
          <h1 class="font-bold text-5xl">Kontakta oss</h1>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-1 mt-5">
          <input v-model="FirstName" id="FirstName" name="FirstName" class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Förnamn" aria-label="Förnamn" />

          <input v-model="LastName" id="LastName" name="LastName" class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Efternamn" aria-label="Efternamn" />

          <input v-model="Email" id="Email" name="Email" class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="email" placeholder="Email" aria-label="Email" />
        </div>
        
        <div class="my-4">
          <textarea v-model="MessageText" placeholder="Meddelande" class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            aria-label="Meddelande"></textarea>
        </div>
        
        <div class="my-2 w-1/2 lg:w-1/4">
          <div id="error"></div>
          <button class="uppercase text-sm font-bold tracking-wide bg-green-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline hover:bg-green-800 hover:text-white transition-colors duration-300">
            Skicka
          </button>
        </div>
      </div>
    </div>
  </div> 
</form>
  </template>
  
  <script>
  export default {
    data() {
      return {
         FirstName: "",
         LastName: "",
         MessageText: "",
        Email: ""
      }
    },
  
    emits: [],
  
    methods: {
      async sendMessage() {
        //Kontrollerar att fälten är ifyllda
        if (
          (this.FirstName != 0) &
          (this.LastName != 0) &
          (this.MEssageText != 0) &
          (this.Email != 0) 
        ) {
          //Javascript objekt
          let MessageObj = {
              FirstName: this.FirstName,
              LastName: this.LastName,
              MessageText: this.MessageText,
              Email: this.Email,
          };
  
          //FETCH
          const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiMessage/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(MessageObj),
          });
  
          const data = await resp.json();
  
          /*Töm fälten efter lagring*/
          this.FirstName = "";
          this.LastName = "";
          this.Email = "";
          this.MssageText = "";
  

          document.getElementById("error").innerHTML = "<div class='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400' role='alert'>" + "Meddelandet har skickats!" + "</div>";
  
        } 
        else {
          document.getElementById("error").innerHTML ="<div class='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>" + "Vänligen fyll i alla fält, tack!" + "</div>";
        }
      },
    },
  };
  </script>

  <style scoped>
   h1 {
    font-family:  'Poppins', sans-serif;
   }</style>
  
  