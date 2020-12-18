<template>
  <div id='course'>
    <p>Course: {{ course.code }} - {{ course.name }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  computed: {
    ...mapGetters('courses', ['courseDetails']),
    courseId () {
      return this.$route.params.courseId
    },
    course () {
      return this.courseDetails(this.courseId)
    }
  }
}
</script>

<style lang="less" scoped>
#course {

}
</style>
