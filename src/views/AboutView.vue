<template>
   <h1 class="pt-7 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-5xl dark:text-white"> Om Oss </h1>
<main  v-for="about in about" :about="about" :key="about.id">
<div class="container my-24 px-6 mx-auto" >
  <section class="mb-32 text-gray-800 text-center md:text-left"> 
    <div class="grid md:grid-cols-2 gap-x-6 xl:gap-x-12">

      <div class="mb-6 md:mb-0">
        <h2 v-bind:id="about.id" class="text-2xl font-bold mb-3">{{ about.aboutTitle }}</h2>
        <div v-html="legacySystemHTML" class="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
         
        </div>
        <p  class="text-gray-500" v-bind:id="about.id">
           <span v-html="about.aboutText"></span> <!-- Texten skrivs ut som raw HTML -->
        </p>
        <br>
</div>


<div class="mb-6 md:mb-0">
        <div
          class="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg">
          <img :src="('https://cmsverktyg.azurewebsites.net/imageupload/'+ about.aboutImage)" :alt="(about.altText)" class="w-full"/>
        </div>
      </div>
      
    </div>
    </section>
      </div>
    </main>

    <section class="flex items-center justify-center border-t-2"  v-if="staff.length > 0">
  <div class="py-8 px-4 mxauto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 class="mb-4 text-4xl font-extrabold text-black">Medarbetare</h2>
      </div> 
     
      <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
    
            <template  v-for="staff in staff" :staff="staff" :key="staff.id">
              <div class="text-center">
              <img class="mx-auto mb-4 w-48 h-48 rounded-full" :src="('https://cmsverktyg.azurewebsites.net/imageupload' + staff.imageName)" :alt="(staff.altText)" />
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-black">
                  <a href="#">{{ staff.name }}</a>
              </h3>
              <p class="font-semibold">{{ staff.title }}</p><br>
              <p>E-mail: <a class="underline" href="mailto: {{ staff.email}} ">{{ staff.email}}</a> </p>
              <p>Telefon: {{ staff.number }}</p>
            </div>
            </template>
      
          </div>
          </div>
</section>


</template>


<style scoped>
   p{
    font-family:  'Poppins', sans-serif;
    font-size: 16px;
    color:black;
    line-height: 1.7;
   }
   h1 {
    font-family:  'Poppins', sans-serif;
   }
   h3 {
    font-family:  'Poppins', sans-serif;
   }
   h2 {
    font-family:  'Poppins', sans-serif;
   }
</style>



<script>


export default {
 // Reaktiv data
 data() {
   return {
     about: [],
     staff: []
   };
 },
 
 computed: {

   },

 methods: {
/*********************************************
* GET - Hämta nyheter
*********************************************/
   async getAbout() {
     //Fetch till restwebbtjänst
     const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiabout/", {
       method: "GET",
       headers: {
         "Content-type": "application/json",
       },
     });

     // Data lagras
     const data = await resp.json();
     this.about = data;
   },

   async getStaff() {
     //Fetch till restwebbtjänst
     const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apistaff/", {
       method: "GET",
       headers: {
         "Content-type": "application/json",
       },
     });

     // Data lagras
     const data = await resp.json();
     this.staff = data;
   },

 },
 mounted() {
   this.getAbout();
   this.getStaff();
 },
};


</script>