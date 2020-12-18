<template>
  <div id="home">
    <b-carousel
      id="carousel"
      v-model="slide"
      :interval="0"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; color: #000"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="(slide, index) in slides" :key="index">
        <h1 v-if='slide.title'>{{ slide.title }}</h1>
        <p v-if='slide.text'>{{ slide.text }}</p>
        <a v-if='slide.link' :href='slide.link' target='_blank'>{{ slide.linkText ? slide.linkText : slide.link }}</a>
        <template v-slot:img>
          <img
          class="d-block c-img"
          :src="slide.img"
          alt="image slot">
        </template>
      </b-carousel-slide>
    </b-carousel>
    <div id='main-content'>
      <NavBar :sticky='true'></NavBar>
      <div id='content'>
        <div id='news'>
          <!-- <h3>EngSci News</h3>
          <News></News> -->
          <b-jumbotron header='EngSci News' lead='Updates every hour'>
            <News></News>
          </b-jumbotron>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import trussImg from '@/assets/carouselImgs/TrussSolver.png'
import downloaderImg from '@/assets/carouselImgs/downloader.png'
import hssImg from '@/assets/carouselImgs/HSSSolver.png'

import NavBar from '@/components/navbar'
import News from '@/components/home/News'

export default {
  name: 'Home',
  components: {
    NavBar,
    News
  },
  data: () => ({
    slide: 0,
    sliding: null,
    slides: [
      { img: trussImg, title: 'Truss Solver', link: 'http://truss.engscitools.ca' },
      { img: downloaderImg, title: 'Lecture Downloader', link: 'http://lectures.engscitools.ca' },
      { img: hssImg, title: 'Hollow Structural Section Solver', link: 'http://hss.engscitools.ca' }
    ]
  }),
  methods: {
    onSlideStart () {
      this.sliding = true
    },
    onSlideEnd () {
      this.sliding = false
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  #carousel {
    height: 100vh;

    .c-img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      object-position: 50% 50%;
    }

    .carousel-caption {
      color: #000;
    }
  }

  #main-content {
    width: 100%;
    min-height: 100vh;

    #content {
      background: $background-secondary;
      margin: 0 10vw;
      display: flex;
      flex-direction: row;

      #news {
        width: 100%;
      }
    }
  }
}
</style>
