<template>
<footer>
  <div v-for="footer in footer" :footer="footer" :key="footer.id" :style="{backgroundColor: `${footer.footerColor}`}">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="#" class="flex items-center"  v-for="header in header" :header="header" :key="header.id">
                <RouterLink to="/"> <img :src="('https://cmsverktyg.azurewebsites.net/imageupload/'+ header.logoName)" class="h-8 mr-3" alt="Logga med länk till startsidan" /> </RouterLink>
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"  :style="{color: `${footer.fontColor}`}"> {{header.title }}</span>
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold uppercase " :style="{color: `${footer.fontColor}`}" >Kontakt</h2>
                  <ul class="font-medium" :style="{color: `${footer.fontColor}`}">
                    <li class="mb-4">
                    <a href="mailto:{{footer.footerEmail}}" aria-label="Kontakt E-post"><i class="fa-solid fa-envelope"></i> {{footer.footerEmail}}</a>
                    </li>
                      <li>
                        <i class=" fa-solid fa-phone" aria-label="Kontakt Telefon"></i>{{ footer.footerPhone}}
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold uppercase dark:text-white" :style="{color: `${footer.fontColor}`}">Länkar</h2>
                  <ul class=" font-medium" :style="{color: `${footer.fontColor}`}">
                      <li class="mb-4">
                        <RouterLink to="/" class="focus:underline hover:underline" style="text-underline-offset: 8px;">Hem</RouterLink><br>
                        <RouterLink to="service" class="focus:outline-none focus:underline hover:underline" style="text-underline-offset: 6px;">Tjänster</RouterLink><br>
                        <RouterLink to="news" class="focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">Nyheter</RouterLink><br>
                        <RouterLink to="about" class="focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">Om oss</RouterLink><br>
                        <RouterLink to="contact" class="focus:outline-none focus:underline hover:underline" style="text-underline-offset: 8px;">Kontakt</RouterLink>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div></div>
</footer>
</template>
  
<script>
  // Importering av komponenter
import Header from "../components/Header.vue";
  
  export default {
  // Reaktiv data
  data() {
  return {
    footer: [],
    header: []
  }
  ;
  },

  components: {
   Header,
 },

  
  methods: {
  /*********************************************
  * GET
  *********************************************/
  async getFooter() {
    //Fetch till restwebbtjänst
    const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apifooter/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
  
    // Data lagras
    const data = await resp.json();
    this.footer = data;
  },

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
  this.getFooter();
  this.getHeader();
  },
  };
</script>
  
  <style scoped>
footer {
  margin-top: 0%;
}
  </style>
  