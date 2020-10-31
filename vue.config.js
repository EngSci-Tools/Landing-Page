module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/_custom.scss";
        @import "~bootstrap/scss/bootstrap";`
      }
    }
  }
};