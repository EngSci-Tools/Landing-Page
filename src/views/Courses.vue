<template>
  <div id='courses' v-if='basicCourseInfo'>
    <b-row v-for='(row, index) in rows' :key='index'>
      <b-col v-for='course in row' :key='course.id'>
        <b-card no-body :sub-title='course.code' :title='course.name' class='course-card shadow-sm mb-3 mt-2'>
          <b-nav class='q-nav' fill>
            <b-nav-item v-for='tab in Object.values(course.tabs).sort((a, b) => a.position - b.position)' :key='tab.position' :href='tab.url' target='_blank' class='q-nav-item'>{{ tab.label }} <b-badge v-if='tab.badge'>{{ tab.badge }}</b-badge></b-nav-item>
            <b-nav-item :href='course.skuleCoursesLink' target='_blank'>Skule</b-nav-item>
            <b-nav-item :href='course.calendarLink' target='_blank'><BIconCalendarPlus/></b-nav-item>
          </b-nav>
          <b-card-body class='pb-0'>
            <b-card-title><b-link :to='`/courses/${course.id}`'>{{ course.name }}</b-link></b-card-title>
            <b-card-sub-title>{{ course.code }}</b-card-sub-title>
            <b-card-text class='mt-3 mb-0'>Total Students: <b-badge>{{ course.totalStudents }}</b-badge></b-card-text>
            <b-card-text class='mt-0 mb-1'><b>Teaching Team:</b></b-card-text>
          </b-card-body>
          <b-list-group class='teaching-team' flush>
            <b-list-group-item class='teaching-team-item' v-for='teacher in course.teachers' :key='teacher.id'>{{ teacher.display_name }}</b-list-group-item>
          </b-list-group>
          <b-card-body v-if='course.tools' class='pb-0'>
            <b-card-text><b>Course Tools:</b></b-card-text>
          </b-card-body>
          <b-list-group class='tools' flush>
            <b-list-group-item class='tools-item' v-for='(link, tool, index) in course.tools' :key='index' :href='link' target='_blank'>{{ tool }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Courses',
  computed: {
    ...mapGetters('courses', ['basicCourseInfo']),
    rows () {
      const rows = []
      let currRow = []
      let c = 0
      for (const course of Object.values(this.basicCourseInfo)) {
        if (c > 1) {
          rows.push(currRow)
          currRow = []
          c = 0
        }
        currRow.push(course)
        c++
      }
      rows.push(currRow)
      return rows
    }
  }
}
</script>

<style lang="scss" scoped>
#courses {
  width: 80vw;

  .course-card {
    .teaching-team {
      max-height: 10em;
      overflow: scroll;

      .teaching-team-item {
        background: $background-secondary;
      }
    }

    .tools {
      max-height: 10em;
      overflow: scroll;

      .tools-item {
        background: $background-secondary;
      }
    }

    .q-nav {
      border-bottom: 1px solid $background-primary;

      .q-nav-item {
        &:hover {
          color: grey;
        }
      }
    }
  }
}
</style>
