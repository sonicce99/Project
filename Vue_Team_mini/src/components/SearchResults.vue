<template>
  <ul class="search-results">
    <li v-for="searchResult in searchResults" :key="searchResult.id">
      <h3>{{ searchResult.title }}</h3>
      <strong>{{ getPrice(searchResult) }} 원</strong>
      <div>
        <RouterLink
          class="detail"
          :to="{
            name: 'UserSingleProductDetails',
            params: { id: searchResult.id },
          }"
        >
          <img
            :src="`${searchResult.thumbnail}`"
            :alt="`${searchResult.title}`"
          />
        </RouterLink>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['searchResults'],
  methods: {
    getPrice(searchResult) {
      return searchResult.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss" scoped>
.search-results {
  @include flexbox(center, center);
  flex-wrap: wrap;
  width: 90%;
  padding: 10px 0;
  gap: 34px;

  li {
    @include flexbox();
    position: relative;
    width: 250px;
    height: 350px;
    background: $white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    border: 1px solid $white;
    cursor: pointer;
    transition: opacity 300ms ease-in-out;
    transition: border-color 400ms ease-in-out;

    &:hover {
      border: 3px solid $blue;
      opacity: 0.8;
    }

    img {
      @include pos-center-x();
      top: 10px;
      width: 160px;
      height: 218px;
      border-radius: 15px;
    }
    h3 {
      @include pos-center-x();
      @include flexbox();
      @include text-style(18, $dark);
      bottom: 60px;
      width: 100%;
    }

    strong {
      @include pos-center-x();
      @include text-style(14, $blue-dark);
      bottom: 24px;
    }
  }
}
</style>
