<template>
  <div id='classes'>
    <b-card v-for='(yearInfo, year) in years' :key='year'>
      <b-media>
        <h4>Year {{ year }}</h4>
        <p>{{ yearInfo.info }}</p>
        <a v-for='(tool, index) in yearInfo.tools' :key='index' :href='tool.link' target='_blank'>Tool: {{ tool.name }}</a>
        <CourseCard v-for='course in yearInfo.courses' :key='course.name'
          :code='course.name' :info='course.info' :img='getImage(year, course.name)' :tools='course.tools'
        ></CourseCard>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import CourseCard from '@/components/courses/courseInfoCard'
import years from '@/assets/tools.json'

export default {
  name: 'Tools',
  components: {
    CourseCard
  },
  data () {
    return {
      years
    }
  },
  computed: {
    year () {
      return this.$route.params.year
    },
    validYears () {
      return Object.keys(this.years)
    },
    yearVisibility () {
      // Constructs an object where the keys are the year number and the value is whether the accordian should be open
      return Object.fromEntries(Object.keys(this.years).map(year => [year, year === this.year]))
    }
  },
  methods: {
    setYear (year) {
      if (this.year === year) {
        this.$router.push({ name: 'Tools' })
      } else {
        this.$router.push({ name: 'Tools', params: { year } })
      }
    },
    getImage (year, courseName) {
      try {
        return require(`../components/courses/year${year}/${courseName}.jpg`)
      } catch (err) {
        return undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#classes {
  width: 80vw;
  .card {
    background: $background-secondary;
  }
}
</style>
