<script>
export default {
  props: ["page", "scale"],

  render : function (h) {
    const { canvasAttrs: attrs } = this;
    return h("canvas",{attrs})
  },

  created() {
    this.viewport = this.page.getViewport(this.scale);
    console.log("View port::", this.viewport)
  },
  computed: {
    canvasAttrs() {
      let { width, height } = this.viewport;
      [width, height] = [width, height].map(dim => Math.ceil(dim));

      const style = this.canvasStyle;
      console.log("After math ceil")
      console.log("Width:", width)
      console.log("height:", height)
      return {
        width,
        height,
        style,
        class: "pdf-page"
      };
    },

    canvasStyle() {
      const {
        width: actualSizeWidth,
        height: actualSizeHeight
      } = this.actualSizeViewport;
      const pixelRatio = window.devicePixelRatio || 1;
      console.log("Pixel Ratio:", pixelRatio)
      const [pixelWidth, pixelHeight] = [
        actualSizeWidth,
        actualSizeHeight
      ].map(dim => Math.ceil(dim / pixelRatio));
      return `width: ${pixelWidth}px; height: ${pixelHeight}px;`;
    },

    actualSizeViewport() {
      return this.viewport.clone({ scale: this.scale });
    }
  },

  mounted() {
    this.drawPage();
  },

  methods: {
    drawPage() {
      if (this.renderTask) return;

      const { viewport } = this;
      const canvasContext = this.$el.getContext("2d");
      const renderContext = { canvasContext, viewport };

      
      this.renderTask = this.page.render(renderContext);
      this.renderTask.then(() => this.$emit("rendered", this.page))
      .catch(this.destroyRenderTask);
    },
    

    destroyPage(page) {
      if (!page) return;
      page._destroy();
      if (this.renderTask) this.renderTask.cancel();
    },

    destroyRenderTask() {
      if (!this.renderTask) return;
      this.renderTask.cancel();
      delete this.renderTask;
    }
  },

  beforeDestroy() {
    this.destroyPage(this.page);
  },

  watch: {
    page(page, oldPage) {
      this.destroyPage(oldPage);
    }
  }
};
</script>