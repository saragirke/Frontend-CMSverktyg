<template>
  <div class="bg-slate-50">
    <h1
      class="pt-7 text-center mb-4 text-2xl font-bold leading-none md:text-3xl lg:text-5xl"
    >
      Våra Tjänster
    </h1>
    <div class="container pb-8 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <template
          v-for="service in service"
          :service="service"
          :key="service.id"
        >
          <!-- Column -->
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg bg-white">
              <img
                class="block h-auto w-full"
                :src="'https://cmsverktyg.azurewebsites.net/imageupload/' + service.imageName"
                :alt="service.altText"
              />

              <div class="p-4 pt-2">
                <div class="mb-8 my-2 my-6">
                  <h2 class="font-bold text-xl mb-2 my-6">
                    {{ service.title }}
                  </h2>
                  <p>
                    <span v-html="service.description"></span>
                  </p>
                  <br />
                  <p class="font-bold">Pris:</p>
                  <p>{{ service.price }}</p>
                </div>
              </div>
            </article>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import "../main.js";

export default {
  // Reaktiv data
  data() {
    return {
      service: [],
    };
  },

  methods: {
    /*********************************************
     * GET
     *********************************************/
    async getService() {
      //Fetch till restwebbtjänst
      const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiService/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      // Data lagras
      const data = await resp.json();
      this.service = data;
    },
  },
  mounted() {
    this.getService();
  },
};
</script>

<style scoped>
p {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: black;
  line-height: 1.7;
}

article {
  font-family: "Poppins", sans-serif;
}

h1 {
  font-family: "Poppins", sans-serif;
}
</style>
