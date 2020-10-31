<template>
  <div id='class'>
    <p>Year: {{ year }}</p>
    <p>Course: {{ courseCode }}</p>
  </div>
</template>

<script>
export default {
  name: 'Class',
  computed: {
    courseCode () {
      return this.$route.params.courseCode
    },
    year () {
      return this.$route.params.year
    }
  }
}
</script>

<style lang="less" scoped>
#class {

}
</style>
