<template>
  <b-media>
    <b-container>
      <b-row>
        <b-col sm='5'>
          <b-img :src='img' class='course-img'></b-img>
        </b-col>
        <b-col sm='7'>
          <h5>{{ code }}</h5>
          <p>{{ info }}</p>
          <b-media>
            <a v-for='(tool, index) in tools' :key='index' :href='tool.link' target='_blank'>Tool: {{ tool.name }}</a>
          </b-media>
        </b-col>
      </b-row>
    </b-container>
  </b-media>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['code', 'info', 'img', 'tools'],
  created () {
    console.log(this.code, 'Tools', this.tools)
  }
}
</script>

<style lang="less" scoped>
#course-info {
  text-align: left;
}
.course-img {
  width: 100%;
}
</style>
