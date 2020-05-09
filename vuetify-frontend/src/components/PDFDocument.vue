<template>
  <div class="pdf-document">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="pageNo" label="Page no" outlined shaped></v-text-field> 
          / {{pdf.numPages}} 
          <v-btn small color="normal"><a :href="`#${pageNo}`" style="text-decoration:none;">GO</a></v-btn>
        </v-col>
        
      </v-row>
    </v-container>
    <!-- <div class="mb-4">
      <span>
        <v-text-field v-model="pageNo" outlined shaped></v-text-field>
        / {{pdf.numPages}}
        <v-btn small color="normal">
          <a :href="`#${pageNo}`" style="text-decoration:none;">GO</a>
        </v-btn>
      </span>
    </div>
    <hr /> -->
    <PDFPage
      v-for="page in pages"
      v-bind="{page, scale}"
      :key="page.pageNumber"
      :id="page.pageNumber"
    ></PDFPage>
  </div>
</template>

<script>
import PDFPage from "./PDFPage.vue";
import range from "lodash/range";
export default {
  components: {
    PDFPage
  },
  props: ["url", "scale"],

  data() {
    return {
      pdf: undefined,
      pages: [],
      pageNo: 1
    };
  },

  created() {
    console.log("Create called");
    this.fetchPDF();
  },

  methods: {
    fetchPDF() {
      import("pdfjs-dist/webpack").then(pdfjs => {
        console.log("getting pdf", this.url);
        pdfjs.getDocument(this.url).then(pdf => {
          console.log("After getting pdf: ", pdf);
          this.pdf = pdf;
        });
      });
    }
  },

  watch: {
    pageNo(pageNo) {
      this.pageNo = pageNo;
    },
    pdf(pdf) {
      this.pages = [];
      const promises = range(1, pdf.numPages).map(number =>
        pdf.getPage(number)
      );

      Promise.all(promises).then(pages => {
        this.pages = pages;
        console.log("pages::::", this.pages);
      });
    }
  }
};
</script>