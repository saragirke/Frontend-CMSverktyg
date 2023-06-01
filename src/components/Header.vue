<template >
<div v-for="header in header" :header="header" :key="header.id">
    <nav class="p-4 text-black-200 shadow-lg" :style="{background: `${header.navColor}`}">
  <div class="flex justify-between items-center" >
  <div class="flex items-center pl-2"> <RouterLink to="/">
    <img :src="('https://cmsverktyg.azurewebsites.net/imageupload/'+ header.logoName)"
    class="h-12 md:h-12 lg:h-14 mr-3" alt="Logga med länk till startsidan" /></RouterLink>
  </div>

  <!-- Navigerting stora skärmar -->
<div class="hidden md:flex">
  <ul class="hidden md:flex">
    <li class="text-lg pr-10 "><RouterLink to="/" class="focus:underline hover:underline uppercase" style="text-underline-offset: 8px;">Hem</RouterLink></li>
    <li class="text-lg pr-10"><RouterLink to="service" class="focus:underline hover:underline uppercase" style="text-underline-offset: 8px;">Tjänster</RouterLink></li>
    <li class="text-lg pr-10"><RouterLink to="news" class="focus:underline hover:underline uppercase" style="text-underline-offset: 8px;">Nyheter</RouterLink></li>
    <li class="text-lg pr-10"><RouterLink to="about" class="focus:underline hover:underline uppercase" style="text-underline-offset: 8px;">Om Oss</RouterLink></li>
    <li class="text-lg pr-10"><RouterLink to="contact" class="focus:underline hover:underline uppercase" style="text-underline-offset: 8px;">Kontakt</RouterLink></li>
  </ul>
  </div>

  <div class="hidden md:flex">
    <a :href="header.instagram" target="_blank"><i class="fab fa-instagram text-2xl pr-8 transition duration-300 focus:text-gray-400 hover:text-gray-400"></i></a>
    <a :href="header.facebook" target="_blank"><i class="fab fa-facebook text-2xl pr-8 transition duration-300 focus:text-gray-400 hover:text-gray-400"></i></a>
    <a :href="header.linkedin" target="_blank"><i class="fab fa-linkedin text-2xl pr-8 transition duration-300 focus:text-gray-400 hover:text-gray-400"></i></a>
  </div>
  </div>
    
  <!-- Navigering för mobil-->
  <ul class="navbar" id="navbar">
    <li class="text-lg pr-8 "><RouterLink to="/" class="transition duration-300 focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">HEM</RouterLink></li>
    <li class="text-lg pr-8"><RouterLink to="service" class="transition duration-300 focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">TJÄNSTER</RouterLink></li>
    <li class="text-lg pr-8"><RouterLink to="news" class="transition duration-300 focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">NYHETER</RouterLink></li>
    <li class="text-lg pr-8"><RouterLink to="about" class="transition duration-300 focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">OM OSS</RouterLink></li>
    <li class="text-lg pr-8"><RouterLink to="contact" class="transition duration-300 focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">KONTAKT</RouterLink></li>
    <a class="close" href="#">
      <img src="https://ljc-dev.github.io/testing0/ham-close.svg" alt="close">
    </a>
  </ul>
  <a class="hamburger" href="#navbar">
      <img src="https://ljc-dev.github.io/testing0/ham.svg" alt="menu">
  </a>
</nav>


<div class="header">
  <img :src="('https://cmsverktyg.azurewebsites.net/imageupload/'+ header.imageName)" alt="Headerbild">
  <div class="centered">
  <h1 class="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl" :style="{color: `${header.fontColor}`, fontFamily: `${header.font}`}">
  {{header.title }}
  </h1>
  <h2 class="text-center text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400" :style="{color: `${header.fontColor}`}">  {{header.subTitle }} 
  </h2>
</div>
</div>
</div>


</template>


<script>

  import '../main.js';
  
  export default {
  // Reaktiv data
  data() {
  return {
    header: [],
  }
  ;
  },

  
  methods: {

    
  /*********************************************
  * GET
  *********************************************/
  async getHeader() {
    //Fetch till restwebbtjänst
    const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiheader/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
  
    // Data lagras
    const data = await resp.json();
    this.header = data;
  },
  
  
  },
  mounted() {
  this.getHeader();
  },
  };
</script>

<style scoped>
/* If the screen size is 600px wide or less, hide the element */
@media only screen and (min-width: 750px) {
  .hamburger {
    display: none;
  }
}



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border: 1px solid red; */
}

.hamburger, .close {
  border: none;
  cursor: pointer;
  /* position absolute position the icons relative to the body because they have no position relative parents*/
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
}

.hamburger {
  background:transparent;
}

.close {
  background: black;
}

.hamburger img, .close img {
  width: 100%;
  height: 100%;
}

.navbar {
  position: absolute;
  /* a higher z-index put navbar above hamburger */
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  /* basic menu styling*/
  list-style: none;
  background: rgb(250, 247, 247);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  /* animate slide up/down */
  transform: translateY(-100%);
  transition: transform 0.2s ease;
}

/* :target is called when its anchor id #navbar is called by clicking on the hamburger which has href="#navbar" */

.navbar:target {
  /* show navbar */
  transform: translateY(0);
}

li a {
  display: block;
  /* remove default underline and add our own with padding and border bottom */
  text-decoration: none;
  padding-bottom: 5px;
}





.show {
  display: block;
}

#wrapper {
  margin: 0 auto;
  width: 100%;
}

.header {
 
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  /*opacity: 0.8; */
}

.header img {
  width: 100%;
  height: auto;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  position: relative;
  text-align: center;
  color: white;
    /* Full height */
    height: 100%; 

/* Center and scale the image nicely */
}



</style>

