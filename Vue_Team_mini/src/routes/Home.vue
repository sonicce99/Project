<template>
  <div class="wrapper">
    <HomeHeader />
    <div ref="position" class="inner">
      <div class="input-group">
        <i class="bx bx-search"></i>
        <input
          @keyup.delete="onKeyReset"
          @keyup.enter="onKeyup"
          class="form-input"
          type="text"
          placeholder="상품을 검색하세요"
          v-model="searchText"
          autofocus
        />
        <button
          @click.prevent="resetQuery"
          type="reset"
          class="btn-reset"
          v-if="searchText.length"
        >
          <i class="bx bxs-x-circle"></i>
        </button>
      </div>

      <div v-if="!isResult">
        <KeywordList @onClickKeyword="clickBrandLogo" />
      </div>

      <div v-if="isResult" class="items">
        <div class="no-result" v-if="!searchResults.length">
          검색 결과가 없습니다.
        </div>
        <SearchResults :searchResults="searchResults" />
      </div>
    </div>
    <div v-if="isLoading"><Loader class="loader" /></div>
  </div>
</template>

<script>
import HomeHeader from '~/components/HomeHeader'
import SearchResults from '~/components/SearchResults'
import KeywordList from '~/components/KeywordList'
import Loader from '~/components/Loader'

export default {
  components: {
    HomeHeader,
    SearchResults,
    KeywordList,
    Loader,
  },
  data() {
    return {
      searchText: '',
      searchTags: [],
      isResult: false,
      isLoading: false,
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.user.searchResults
    },
  },
  methods: {
    logOut() {
      sessionStorage.removeItem('token')
      this.$store.dispatch('user/logOut')
      this.$router.push('/')
    },
    async onKeyup() {
      if (!this.searchText) return
      this.$refs.position.classList.add('on')
      this.searchText = this.searchText
      this.isLoading = true
      await this.$store.dispatch('user/SHOW_SEARCHRESULTS', {
        searchText: this.searchText,
      })
      this.isLoading = false
      this.isResult = true
    },
    async clickBrandLogo(brand) {
      this.$refs.position.classList.add('on')
      this.isResult = true
      this.searchText = brand
      this.isLoading = true
      this.$store.dispatch('user/SHOW_SEARCHRESULTS', { searchTags: [brand] })
      this.isLoading = false
    },
    resetQuery() {
      this.searchText = ''
      this.isResult = false
      this.isLoading = false
      this.$refs.position.classList.remove('on')
    },
    onKeyReset() {
      if (!this.searchText.length) this.resetQuery()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;

  .inner {
    @include pos-center();
    width: 70%;
    animation: searchOff 800ms alternate;

    &.on {
      top: 100px;
      transform: translate(-50%, 0);
      animation: searchOn 800ms alternate;
    }

    .input-group {
      width: 50%;
      margin: 0 auto 40px;

      .form-input {
        padding-left: 40px;
      }

      .btn-reset {
        position: absolute;
        top: 10px;
        right: 12px;

        .bxs-x-circle {
          font-size: 22px;
          color: $blue;
        }
      }
    }

    .items {
      @include flexbox(center, start);
      height: 80vh;
      border: 1px solid $dark;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: darken($border, 30%);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background-color: $border;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
      }

      .no-result {
        @include text-style(24, $dark);
        width: 100%;
        font-weight: 400;
        padding: 1em;
        margin-bottom: 1em;
        user-select: none;
      }

      .loader {
        @include pos-center();
      }
    }
  }
}

@keyframes searchOn {
  to {
    top: 100px;
  }

  from {
    top: 50%;
    opacity: 1;
  }
}

@keyframes searchOff {
  to {
    top: 50%;
    opacity: 1;
  }

  from {
    top: 100px;
    opacity: 0;
  }
}
</style>
