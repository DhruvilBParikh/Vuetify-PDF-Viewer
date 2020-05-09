<template>
  <v-app class="app">
    <v-app-bar absolute color="white" class="app">
      <v-img
        class="mx-2"
        src="https://cdn0.capterra-static.com/logos/150/2038943-1494571854.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title class="mx-5">Rockliffe PDFViewer</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" tag="v-btn">
        <v-btn color="#FF8C69" flat value="feed">
          <span>Home</span>
        </v-btn>
      </router-link>
      <router-link to="/files" tag="v-button" class="ml-2">
        <v-btn color="#FF8C69" flat value="feed">
          <span>File Structure</span>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-sheet class="mt-12">
      <v-container>
        <v-content class="mt-2">
          <router-view />
        </v-content>
      </v-container>
    </v-sheet>
  </v-app>
</template>


<script>
export default {
  name: "App",

  data: () => ({
    
  })
};
</script>

<style>
.app {
      font-family: 'EB Garamond', serif ;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }
</style>

