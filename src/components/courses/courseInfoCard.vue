<template>
  <b-media class='course-info'>
    <b-row>
      <b-col sm='5'>
        <b-img :src='img' class='course-img'></b-img>
      </b-col>
      <b-col sm='7'>
        <h5>{{ code }}</h5>
        <p>{{ info }}</p>
        <div v-if='tools' class='tools'>
          <h6>Tools:</h6>
          <a v-for='(tool, index) in tools' :key='index' :href='tool.link' target='_blank'>{{ tool.name }}</a>
        </div>
      </b-col>
    </b-row>
  </b-media>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['code', 'info', 'img', 'tools']
}
</script>

<style lang="less" scoped>
.course-info {
  .course-img {
    width: 100%;
  }

  .tools {
    margin-left: 10px;
    line-height: 1px;
  }
}
</style>
