<template>
  <div id='classes'>
    <div id='years' role='tablist'>
      <b-card no-body class="mb-1" v-for='(courses, year) in years' :key='year'>
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block @click="setYear(year)">Year {{ year }}</b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${year}`" v-model='yearVisibility[year]'  accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <CourseCard v-for='course in courses' :key='course.name' :code='course.name' :info='course.info' :img='course.img' :tools='course.tools'></CourseCard>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import CourseCard from '@/components/courses/courseInfoCard'

export default {
  name: 'Classes',
  components: {
    CourseCard
  },
  data () {
    return {
      years: {
        1: [
          { name: 'CIV102', info: 'Civil Engineering', img: this.getImage(1, 'CIV102'), tools: [{ name: 'HSS Calculator', link: 'http://hss.engscitools.ca' }] },
          { name: 'ESC194', info: 'Calculus', img: this.getImage(1, 'ESC194') }
        ],
        2: [
          { name: 'Other Course', info: 'Some other course' }
        ]
      }
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
      return require(`../components/courses/year${year}/${courseName}.jpg`)
    }
  }
}
</script>

<style lang="scss" scoped>
#classes {
  .card {
    background: $background-secondary;
  }
}
</style>
