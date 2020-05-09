<template>
  <div id="pdf-viewer">
    <PDFDocument v-bind="{url, scale}" />
  </div>
</template>

<script>
import PDFDocument from '@/components/PDFDocument.vue';
export default {
  name: 'App',
  props:['path'],
  components: {
    PDFDocument
  },
  data() {
    return {
      url: 'http://localhost:3000/Notes'+this.path, // a PDF
      scale: 2,
    }
  },
}
</script>

<style>
#pdf-viewer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
