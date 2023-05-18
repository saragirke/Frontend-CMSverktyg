<template>
    
  <!-- v-for loop för att hämta nyhetsinlägg -->
  <Header v-for="header in header" :header="header" :key="header.id" />
  
  <br />
  </template>
  
  
  <script>
  // Importering av komponenter
  import Header from "../components/Header.vue";
  
  export default {
  // Reaktiv data
  data() {
  return {
    header: [],
  };
  },
  
  components: {
  Header,
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
  

  </style>