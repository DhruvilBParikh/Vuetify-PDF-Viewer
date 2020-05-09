<template>
  <div class="home">
    
    
      <h3>About this project:</h3>
      <hr>

<h4>Backend:</h4>
<p>
<ul>
  <li>To generate the base for building a backend I have used express-generator.</li>

  <li>Backend allows us to get access to all the files and folders present on the server.</li>

  <li>The folders and files are served statically by the backend server from the "public" folder. </li>
</ul>
</p>


<h4>Frontend:</h4>
<p>
Frontend is developed in Vue and since I was new to this technology, I have used quite a few references
<br>
<b>Vuetify:</b> Most components have been built using Vuetify
<br>
<b>Fontawesome:</b> I have used font-awesome for displaying the icons of files and folders and back button.
<br>
<b>Google fonts:</b> Helps with fonts.
<br>
<b>Pdfjs:</b> This was the most trickiest part and I would like to inform you that the components that help in displaying PDF have been completely referred from "https://github.com/rossta/vue-pdfjs-demo". 
</p>

<h4>Functionalities:</h4>
<p>
  <ul>
    <li>User can navigate through the file structure using the back button displayed on the page and also using the browser's back button functionality.</li>

    <li>User can view pdf by searching through the tree of folders.</li>

    <li>User can search for a particular page while viewing a pdf by entering the pdf page number and hitting GO. To again be able to search, the user will have to click the back button to bring the app to the previous state.</li>
  </ul>
</p>

<h4>Note:</h4>
<p>
Since I was new to Vue.js and was on a time constraint, I tried giving my best. But still, I can find some areas of improvement when it comes to frontend, especially with the file structure, modularity and the coding style that should be followed while coding in Vue.js.
If you have any such suggestions on the coding style/technique, I would be more than happy to work on that.
Other than that, I enjoyed working with Vue.js and I can totally see myself implementing Vue for my future projects. Till then, I am going to work on strengthening my Vue skills.
</p>
Thank You.
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',

}
</script>
