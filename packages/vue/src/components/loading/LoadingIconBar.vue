<template>
  <rect
    width="10"
    y="15"
    :x="x"
    :height="height"
    :fill="fill">
    <animate
      attributeName="height"
      calcMode="spline"
      values="50;70;30;50"
      keyTimes="0;0.33;0.66;1"
      dur="1"
      keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
      repeatCount="indefinite"
      :begin="begin" />
  </rect>
</template>

<script>
  export default {
    name: 'LoadingIconBar',
    props: ['fill', 'x', 'height', 'begin']
  }
</script>
