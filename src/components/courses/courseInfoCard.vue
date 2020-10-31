<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
    <b-col md="4">
      <b-card-img thumbnail v-if='img' :src='img' alt="Image"></b-card-img>
    </b-col>
    <b-col md="8" id='course-info'>
      <b-card-body :title="code">
        <b-card-text>
          {{ info }}
        </b-card-text>
        <div v-if='tools'>
          <b-card-text v-for='(tool, index) in tools' :key='index'>
            <a :href='tool.link' target='_blank'>Tool: {{ tool.name }}</a>
          </b-card-text>
        </div>
      </b-card-body>
    </b-col>
    </b-row>
  </b-card>
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
</style>
