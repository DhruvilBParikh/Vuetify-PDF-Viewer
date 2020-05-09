import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FileStructure from '../views/FileStructure.vue'
import PDFViewer from '../views/PDFViewer.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/files/:path*',
    name: 'FileStructure',
    props: true,
    component: FileStructure
  },
  {
    path: '/pdfViewer/:path',
    name: 'PDFViewer',
    props: true,
    component: PDFViewer
  }
]

const router = new VueRouter({
  routes
})


export default router


