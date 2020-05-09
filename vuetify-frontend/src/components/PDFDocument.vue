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
    <PDFPage
      v-for="page in pages"
      v-bind="{page, scale}"
      :key="page.pageNumber"
      :id="page.pageNumber"
    ></PDFPage>
  </div>
</template>

<script>
import debug from 'debug';
const log = debug('app:components/PDFDocument');
import PDFPage from "./PDFPage.vue";
import range from "lodash/range";
export default {
  components: {
    PDFPage
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1.0,
    },
  },

  data() {
    return {
      pdf: undefined,
      pages: [],
      pageNo: 1
    };
  },

  created() {
    this.fetchPDF();
  },

  methods: {
    fetchPDF() {
      import("pdfjs-dist/webpack").then(pdfjs => {
        pdfjs.getDocument(this.url).then(pdf => {
          this.pdf = pdf;
        });
      });
    }
  },

  watch: {
    pdf: {
      pageNo(pageNo) {
      this.pageNo = pageNo;
      },
      handler(pdf) {
        this.pages = [];
        const promises = range(1, pdf.numPages + 1).map(number => pdf.getPage(number));
        return Promise.all(promises).
          then(pages => (this.pages = pages)).
          then(() => log('pages fetched'))
      }
    },
  },
  
};
</script>