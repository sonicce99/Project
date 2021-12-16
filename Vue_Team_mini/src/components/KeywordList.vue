<template>
  <ul class="keyword-list">
    <li
      @click="onClickKeyword(keyword.name)"
      v-for="keyword in keywordList"
      :key="keyword"
    >
      <div class="image">
        <img :src="`${keyword.image}`" :alt="`${keyword.name}`" />
      </div>
      <span>{{ keyword.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    keywordList() {
      return this.$store.state.user.keywordList
    },
  },
  methods: {
    onClickKeyword(searchText) {
      this.$emit('onClickKeyword', searchText)
    },
  },
}
</script>

<style lang="scss" scoped>
.keyword-list {
  @include flexbox();
  @include text-style(14, $dark);
  font-weight: 500;

  li {
    @include column-flexbox();
    width: 160px;
    padding: 4px 0 2px;
    border-radius: 6px;
    cursor: pointer;

    .image {
      @include flexbox();
      width: 80px;
      height: 70px;
      margin-bottom: 10px;
      padding: 6px 12px;
      border: 1px solid $primary;
      border-radius: 6px;

      img {
        display: block;
        width: 100%;
        object-fit: contain;
      }
    }

    ~ li {
      margin-left: 20px;
    }

    background-color: $white;
    transition: background-color 300ms ease-in-out;
    transition: color 200ms ease-in-out;

    &:focus,
    &:active,
    &:not(:disabled):hover {
      outline: none;
      box-shadow: none;
      color: $blue;
      background-color: $background;
    }
  }
}
</style>
