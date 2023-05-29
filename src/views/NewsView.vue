<template>
  <div>
    <h1 class="pt-7 text-center mb-4 text-3xl font-bold leading-none tracking-tight md:text-5xl lg:text-5xl dark:text-white">Nyheter</h1>

    <!-- v-for loop för att hämta nyhetsinlägg -->
    <News v-for="news in paginatedNews" :news="news" :key="news.id" />
    <br />

    <!-- Paginering -->
    <div class="flex justify-center">
      <button @click="previousPage" :disabled="currentPage === 1">Föregående</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Nästa</button>
    </div>
  </div>
</template>

<script>
// Importering av komponenter
import News from "../components/News.vue";

export default {
  components: {
    News,
  },

  data() {
    return {
      news: [],
      currentPage: 1,
      newsPerPage: 5,
    };
  },

  computed: {
    sortedNews() {
      return this.news.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    },
    totalPages() {
      return Math.ceil(this.sortedNews.length / this.newsPerPage);
    },
    paginatedNews() {
      const startIndex = (this.currentPage - 1) * this.newsPerPage;
      const endIndex = startIndex + this.newsPerPage;
      return this.sortedNews.slice(startIndex, endIndex);
    },
  },

  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
   
  async getNews() {
    const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apinews", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await resp.json();
    this.news = data;
  },
  },

  async mounted() {
    await this.getNews();
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

h1 {
  font-family: "Poppins", sans-serif;
}
</style>