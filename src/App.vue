<template>
  <div id="app-container">
    <transition
      name="fade"
      mode="out-in"
    >
      <NavBar v-if='!currPageNav' :sticky='true'></NavBar>
    </transition>
    <div id='app'>
      <div id="left" class="side-button" v-if='currentPageGroupIndex > -1'><router-link v-if='previousPage' :to="previousPage"><b-icon-chevron-compact-left></b-icon-chevron-compact-left></router-link></div>
      <div id="routes" :class='{ navigator: currentPageGroupIndex > -1 }'>
        <transition
          name="fade"
          mode="out-in"
          @after-leave="$root.$emit('triggerScroll')"
        >
          <router-view/>
        </transition>
      </div>
      <div id="right" class="side-button" v-if='currentPageGroupIndex > -1'><router-link v-if='nextPage' :to="nextPage"><b-icon-chevron-compact-right></b-icon-chevron-compact-right></router-link></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    navGroups: [],
    noNavPages: ['/']
  }),
  computed: {
    currentPage () {
      return this.$route.path
    },
    currPageNav () {
      return this.noNavPages.indexOf(this.currentPage) > -1
    },
    currentPageGroupIndex () {
      // Which nav group are we in?
      return this.navGroups.map(group => group.indexOf(this.currentPage) > -1).indexOf(true)
    },
    currentPageIndex () {
      // In our navgroup, what index page are we at.
      if (this.currentPageGroupIndex < 0) {
        // If we don't have a navgroup, we don't have a current page.
        return -1
      }
      return this.navGroups[this.currentPageGroupIndex].indexOf(this.currentPage)
    },
    nextPage () {
      // The next page in our navGroup if we have a page and a next page.
      if (this.currentPageIndex < 0) {
        return undefined
      }
      return this.currentPageIndex + 1 >= this.navGroups[this.currentPageGroupIndex].length ? undefined : this.navGroups[this.currentPageGroupIndex][this.currentPageIndex + 1]
    },
    previousPage () {
      // The previous item in our navGroup if we have a page and a next page.
      if (this.currentPageIndex < 0) {
        return undefined
      }
      return this.currentPageIndex - 1 < 0 ? undefined : this.navGroups[this.currentPageGroupIndex][this.currentPageIndex - 1]
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

#app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  background: $background-primary;
  min-height: 100vh;
  color: #ecf0f1;
  #app {
    display: flex;
    flex-direction: row;
    justify-content: center;

    #routes {
      &.navigator > div {
        width: 80vw;
      }
    }
  }

  .side-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #95a5a6;
  }

  #left {
    width: 10vw;
  }

  #right {
    width: 10vw;
  }
}
</style>
