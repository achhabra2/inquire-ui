<template>
<header-container :loading="motdsLoaded" title="Help">
  <template slot="content">
    <div class="media">
      <div class="media__video">
        <iframe src="https://cisco.app.box.com/embed/s/qqctd6lh9l5zxi58185krqvn80az5mxi" width="800" height="550" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>
      </div>
    </div>
    <div class="media">
      <div class="media__video">
       <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_EBo1Q4Z4Bg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  </template>
</header-container>
</template>

<script>
import { mapState } from 'vuex';
import HeaderContainer from './elements/Header.vue';

export default {
  components: {
    HeaderContainer,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.media {
  max-width: 900px;
  width: 100%;
  margin: auto;
  padding: 20px;
  &__video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    width: 100%;
    overflow: hidden;
    background: gray;
    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
