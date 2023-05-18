<template>
  <div v-for="widget in widget" :widget="widget" :key="widget.id">
    <div
      class="widget"
      v-if="widget.display"
      :style="{ backgroundColor: `${widget.widgetColor}` }"
    >
      <div>
        <!-- Bakgrundfärg på widget-->
        <div class="row" :style="{ backgroundColor: `${widget.WidgetColor}` }">
          <div class="column-66">
            <img
              class="responsive"
              :src="'https://cmsverktyg.azurewebsites.net/imageupload/' + widget.imageName"
              :alt="start.altText"
            />
          </div>
          <div class="column-33">
            <!-- Bild med alt-text-->
            <h2 v-bind:id="widget.id" class="text-2xl font-bold mb-3">
              {{ widget.widgetTitle }}
            </h2>
            <p>
              <!-- Text i widget -->
              <span v-html="widget.widgetText"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <main v-for="start in start" :start="start" :key="start.id">
    <div class="container my-24 px-6 mx-auto">
      <section class="mb-32 text-center md:text-left">
        <div class="grid md:grid-cols-2 gap-x-6 xl:gap-x-12">
          <div class="mb-6 md:mb-0">
            <h3 v-bind:id="start.id" class="text-2xl font-bold mb-5">
              {{ start.title }}
            </h3>

            <p v-bind:id="start.id">
             <!-- Texten skrivs ut som raw HTML -->
              <span v-html="start.description"></span>

            </p>
            <br/>
          </div>

          <div class="mb-6 md:mb-0">
            <div class="relative overflow-hidden shadow-lg rounded-lg">
              <img
                :src="'https://cmsverktyg.azurewebsites.net/imageupload/' + start.imageName"
                :alt="start.altText"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>

export default {
  // Reaktiv data
  data() {
    return {
      start: [],
      widget: [],
    };
  },

  methods: {
    /*********************************************
     * GET - Hämta nyheter
     *********************************************/
    async getStart() {
      //Fetch till restwebbtjänst
      const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apistart/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      // Data lagras
      const data = await resp.json();
      this.start = data;
    },

    async getWidget() {
      //Fetch till restwebbtjänst
      const resp = await fetch("https://cmsverktyg.azurewebsites.net/api/apiwidget/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      // Data lagras
      const data = await resp.json();
      this.widget = data;
    },
  },
  mounted() {
    this.getStart();
    this.getWidget();
  },
};
</script>

<style scoped>
/****** CONTAINERS ********/
.widget {
  padding: 34px;
  margin: auto;
  margin-top: 4%;
  width: 70%;
  padding-top: 2%;
  margin-bottom: 2%;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.row {
  margin: 0 auto;
}

.column-66 {
  float: left;
  width: 50%;
}

.column-33 {
  float: left;
  width: 50%;
}

img {
  height: auto;
  max-width: 100%;
}

.responsive {
  width: 90%;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: black;
}

h1 {
    font-family:  'Poppins', sans-serif;
   }

@media screen and (max-width: 1000px) {
  .widget {
    width: 90%;
  }
  .column-66,
  .column-33 {
    width: 100%;
    text-align: center;
    padding: 5px;
  }

  .responsive {
    width: 100%;
  }

  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
    padding: 2px;
  }
  .row {
    width: 80%;
  }
}
</style>
