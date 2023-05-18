<template>
    <div class="formDiv">
      <form @submit.prevent="addComment()">
  
        <label for="commentName">Namn:</label>
        <input v-model="CommentName" type="text" id="name" name="name" />
  
        <label for="commentPost">Kommentar:</label>
        <textarea
          v-model="CommentPost" rows="10" cols="50"
          placeholder="type in your comment" />

        <div id="error"></div>

        <input type="submit" class="sortBtn" value="Kommentera" />
      </form>
      <br /><br />
    </div>
  </template>


<script>
export default {
  data() {
    return {
       CommentPost: ""
    }
  },

  emits: ["CommentAdded"],

  methods: {
    async addComment() {
      //Kontrollerar att fälten är ifyllda
      if (
        (this.commentName != 0) &
        (this.commentPost != 0)
      ) {
        //Javascript objekt
        let CommentObj = {
            commentName: this.commentName,
            commentPost: this.commentPost,
        };

        //FETCH
        const resp = await fetch("http://localhost:5140/api/apiComment/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(CommentObj),
        });

        const data = await resp.json();


        this.$router.go()
        alert("Vi har nu tagit emot din intresseanmälan. Vid intresse tar vi kontakt via e-mail." );

      } 
      else {
       document.getElementById("error").innerHTML ="<p>" +"Alla fält behöver fyllas i!" + "</p>";
      }
    },
  },
};
</script>