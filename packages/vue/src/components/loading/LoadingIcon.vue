<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid">
    <g transform="rotate(180 50 50)">
      <LoadingIconBar
        :key="index"
        :fill="fill"
        :x="bar.x"
        :height="bar.height"
        :begin="bar.begin"
        v-for="(bar, index) in bars" />
    </g>
  </svg>
</template>

<script>
  import LoadingIconBar from './LoadingIconBar.vue';

  export default {
    name: 'LoadingIcon',
    components: {
      LoadingIconBar
    },
    props: ['fill'],
    data() {
      return {
        bars: [{
          x: '15',
          height: '44.8443',
          begin: '-0.4s'
        }, {
          x: '35',
          height: '69.9554',
          begin: '-0.2s'
        }, {
          x: '55',
          height: '30.8454',
          begin: '-0.6s'
        }, {
          x: '75',
          height: '54.6369',
          begin: '0s'
        }]
      }
    }
  }
</script>
