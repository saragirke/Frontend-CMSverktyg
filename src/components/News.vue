
    <template>
<div class="container my-24 px-6 mx-auto" >

<!-- Section: Design Block -->
<section class="mb-32 text-center md:text-left">
    <div class="grid md:grid-cols-2 gap-x-6 xl:gap-x-12">
      <div class="mb-6 md:mb-0">
        <div
          class="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
          data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img :src="('https://cmsverktyg.azurewebsites.net/imageupload'+ news.imageName)" :alt="(news.altText)" class="w-full" />
         
   
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 "
              style="background-color: rgba(251, 251, 251, 0.2)"></div>
   
        </div>
      </div>
   

    <div class="mb-6 md:mb-0">
        <h2 v-bind:id="news.id" class="text-2xl font-bold mb-3">{{ news.title }}</h2>
        <div v-html="legacySystemHTML" class="mb-6">
        </div>
        <p class="mb-6">
          <p>Senast uppdaterad: <p v-bind:id="'dateCreated' + news._id"> {{ news.dateCreated }}</p> 
        </p>
        </p>
        <p v-bind:id="news.id">
           <span v-html="news.post"></span> <!-- Texten skrivs ut som raw HTML -->
        
        </p>
        <br>  <br>  <br>
  
  
        <form class="w-full max-w-xl bg-white rounded-lg" @submit.prevent="addComment(news.id)">
  <input type="hidden" v-bind:id="news.id" value="{{ news.id }}" id="newsId">
  <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" v-model="commentPost" rows="2" cols="50" id="commentPost" name="commentPost" placeholder="Kommentera..." aria-label="Kommentar"></textarea>
  <br>
  <button type="submit" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md mb-4">
  Skicka
</button>
 <br>
 <div v-bind:id="'error' + news.id"></div>
</form>
<div class="w-full max-w-xl bg-white rounded-lg">
<button @click="getCommentByNews(news.id)" class="readComment"> Läs kommentarer ({{ commentCount }})</button>
<div v-bind:id="'comments' + news.id"></div></div>
        
      </div> </div>
      </section>
      </div>


  </template>
  
  <script>
  export default {

    data() {
    return {
       commentPost: "",
       commentCount: 0
    }
  },
    props: {
      news: Object,
    },

    methods:
     {
// Funktion för att räkna antal kommentarer per inlägg 
      async countComments(newsId) {
        const resp = await fetch(`https://cmsverktyg.azurewebsites.net/api/ApiComment/${newsId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await resp.json();
    this.commentCount = data.length; 
  },

      async addComment(newsId) {
      //Kontrollerar att fälten är ifyllda
      if (
        (this.commentName != 0) &
        (this.commentPost != 0) 
      ) {
        //Javascript objekt
        let CommentObj = {
            commentPost: this.commentPost,
            newsId: this.news.id
        };

        //FETCH
        const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiComment/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(CommentObj),
        });

        const data = await resp.json();


        this.commentPost = ""; 
       
       document.getElementById("error" + newsId).innerHTML = "<div class='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400' role='alert'>" + "Kommentaren har skickats!" + "</div>";
      } 
      else {
       document.getElementById("error" + newsId).innerHTML ="<div class='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>" + "Tomt fält" + "</div>";
      }
    }, 

    async getCommentByNews(newsId) {
      
  try {
    const resp = await fetch(`https://cmsverktyg.azurewebsites.net/api/ApiComment/${newsId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const data = await resp.json();

    let comments = '';
    data.forEach(comment => {
      comments += `
        <div id="read">
          <p><strong>Kommentar:</strong> ${comment.commentPost}</p>
          <p><strong>Datum:</strong> ${comment.dateCreated}</p>
        </div>
        <hr>
      `;
    });

    document.getElementById(`comments${newsId}`).innerHTML = comments;
    this.commentCount = data.length; 


  } catch (error) {
    console.log(error);
  }
}

    },

    emits: ["CommentAdded"],
    mounted() {
  this.countComments(this.news.id);
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

   #comments {
    margin-top: 15%;
   }

   .readComment {
    margin-bottom:5%;
    text-decoration: underline;
    font-family:  'Poppins', sans-serif;
   }

   div{
    font-family:  'Poppins', sans-serif;
   }


   </style>
