<template>
  <div
    class="loader-box"
    :style="{
      width: `${size * 2}px`,
      height: `${size * 2}px`,
    }"
  >
    <div
      :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
      class="loader"
    >
      <div
        class="item"
        :style="{
          width: `${size * 0.92}px`,
          height: `${size * 0.92}px`,
          backgroundColor: `${color}`,
        }"
      ></div>
    </div>
    <div
      :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
      class="loader"
    >
      <div
        class="item"
        :style="{
          width: `${size * 0.92}px`,
          height: `${size * 0.92}px`,
          backgroundColor: `${color}`,
        }"
      ></div>
    </div>
    <div
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        marginTop: `${size * -0.01}px`,
      }"
      class="loader"
    >
      <div
        class="item"
        :style="{
          width: `${size * 0.92}px`,
          height: `${size * 0.92}px`,
          backgroundColor: `${color}`,
        }"
      ></div>
    </div>
    <div
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        marginTop: `${size * -0.01}px`,
      }"
      class="loader"
    >
      <div
        class="item"
        :style="{
          width: `${size * 0.92}px`,
          height: `${size * 0.92}px`,
          backgroundColor: `${color}`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 22,
    },
    color: {
      type: String,
      default: '$blue-light',
    },
    width: {
      type: Number,
      default: 4,
    },
  },
}
</script>

<style lang="scss" scoped>
.loader-box {
  @include pos-center();
  display: flex;
  flex-wrap: wrap;
  .loader {
    @include flexbox();

    .item {
      border-radius: 30%;
    }
    &:first-child .item {
      animation: blink 1s linear infinite;
    }
    &:nth-child(2) .item {
      animation: blink 1s linear 0.4s infinite;
    }
    &:nth-child(3) .item {
      animation: blink 1s linear 1.2s infinite;
    }
    &:nth-child(4) .item {
      animation: blink 1s linear 0.8s infinite;
    }
  }
}
@keyframes blink {
  0% {
    background-color: $blue-light;
  }
  75% {
    background-color: $blue-dark;
  }
  100% {
    background-color: $blue-light;
  }
}
</style>
