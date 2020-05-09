<template>
  <div class="app">
    <h1 class="my-3">Files</h1>
    <v-container fluid>
      <v-row>
        <button v-on:click="back()" v-bind:class="{'hidden':path==''|| path==undefined}" class="mr-3">
          <font-awesome-icon icon="backward" class="fa-2x" />
        </button>
        <h1>{{path}}</h1>
        <v-col cols="12">
          <v-row :align="alignment" :justify="justify" class="grey lighten-5">
            <v-li
              v-for="file in files"
              :key="file.id"
              class="ma-3 pa-6"
              style="width: 250px"
              outlined
              tile
            >
              <center>
                <font-awesome-icon icon="file-pdf" class="fa-3x" />
                <br />
                <a v-on:click="openPDF(file)">{{file}}</a>
              </center>
            </v-li>
            <v-li
              v-for="folder in folders"
              :key="folder.id"
              class="ma-3 pa-6"
              style="width: 250px"
              outlined
              tile
            >
              <center>
                <font-awesome-icon icon="folder" class="fa-3x" />
                <br />
                <router-link :to="path ? `/files/${path}/${folder}` : `/files/${folder}`" style="text-decoration:none;">{{folder}}</router-link>
              </center>
            </v-li>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FileStructure",

  props: ["path"],
  data: function() {
    return {
      root: "http://localhost:3000/files/Notes",
      files: [],
      folders: []
    };
  },

  watch: {
    $route(to, from) {
      console.log("To is:" + to + " and from is:" + from);
      console.log("path in watch::", this.path);
      this.openFolder(this.path);
    }
  },

  methods: {
    openPDF(message) {
      console.log(message);
      this.$router.push({
        name: "PDFViewer",
        params: { path: "/" + this.path + "/" + message }
      });
    },

    openFolder(message) {
      console.log("Message in OpenFolder function:::", message);
      let path = message;
      if (path) path = "/" + path;
      else path = "";
      axios
        .get(this.root + path)
        .then(response => {
          console.log("Response from the backend", response);
          if (response.status === 200) {
            console.log(this.path);
            this.files = response.data.files;
            this.folders = response.data.folders;
          }
        })
        .catch(error => {
          console.log("Error in get axios", error);
        });
    },

    back() {
      console.log("Clicked on Back button");
      let newPath = this.path;
      newPath = newPath.substring(0, newPath.lastIndexOf("/"));
      console.log("Path after clicking on back button:: ", newPath);

      this.$router.push({ name: "FileStructure", params: { path: newPath } });
    }
  },

  created() {
    console.log("props:::" + this.path);
    console.log(this.$route);
    let path = this.$route.params.path;
    if (path) path = "/" + path;
    else path = "";
    axios
      .get(this.root + path)
      .then(response => {
        console.log("Response from the backend", response);
        if (response.status === 200) {
          this.files = response.data.files;
          this.folders = response.data.folders;
        }
      })
      .catch(error => {
        console.log("Error in get axios", error);
      });
  }
};
</script>

<style scoped>
.app {
      font-family: 'PT Serif', serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }
.hidden {
  visibility: hidden;
}
</style>
