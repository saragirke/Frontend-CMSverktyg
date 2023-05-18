<template>

  <h1 class="pt-7 text-center mb-4 text-3xl font-bold leading-none tracking-tight md:text-5xl lg:text-5xl dark:text-white"> Nyheter </h1>

   <!-- v-for loop för att hämta nyhetsinlägg -->
   <News  v-for="news in sortedNews" :news="news" :key="news.id"/>
   <br />
</template>


<script>
// Importering av komponenter
import News from "../components/News.vue";

export default {
 // Reaktiv data
 data() {
   return {
     news: [],
   };
 },
 
 computed: {
   //Sorterar senaste nyheten längst upp på sidan
   sortedNews: function() {
                 return this.news.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
             }
   },

 components: {
   News,
 },

 methods: {
/*********************************************
* GET - Hämta nyheter
*********************************************/
   async getNews() {
     //Fetch till restwebbtjänst
     const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apinews", {
       method: "GET",
       headers: {
         "Content-type": "application/json",
       },
     });

     // Data lagras
     const data = await resp.json();
     this.news = data;
   },

   async addComment() {
      //Kontrollerar att fälten är ifyllda
      if (
       // (this.commentName != 0) &
        (this.commentPost != 0)
      ) {
        //Javascript objekt
        let CommentObj = {
          //  commentName: this.commentName,
            commentPost: this.commentPost,
        };

        //FETCH
        const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiComment", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(CommentObj),
        });

        const data = await resp.json();


        this.$router.go()
        alert("Tack för din kommentar!" );

      } 
      else {
       document.getElementById("error").innerHTML ="<p>" +"Alla fält behöver fyllas i!" + "</p>";
      }
    }, 

 },
 mounted() {
   this.getNews();

 },
};


</script>

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
   </style>