<template>
  <div class='news' v-if='news'>
    <b-card v-for='article in news' :key='article.title' no-body>
      <b-card-body>
        <h4>{{ article.title }}</h4>
        <b-card-text>
          {{ article.description }}
        </b-card-text>
      </b-card-body>
      <div class='go'>
        <a :href='article.link' target='_blank'><b-icon-chevron-compact-right></b-icon-chevron-compact-right></a>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'News',
  computed: {
    ...mapGetters('news', ['news'])
  }
}
</script>

<style lang="scss" scoped>
.news {
  .card {
    text-align: left;
    flex-direction: row;
    align-items: center;

    .go {
      height: 100%;
      width: 30px;
      font-size: 30px;
      opacity: 0.5;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
