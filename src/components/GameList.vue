<template>
  <div class="container gameList">
    <div class="mx-auto">
      <h1 class="text-gray-800 font-bold text-2xl ">
        Your list of games
      </h1>

      <form @submit.prevent="inputBox">
        <input
          class="pl-1 rounded-l-lg border-t border-b border-l border-gray-200 text-gray-800 bg-white outline-none"
          placeholder="Enter you game"
          type="text"
          ref="textBox"
        />
        <button
          class="px-2 rounded-r-lg bg-gray-400 text-gray-800 font-bold uppercase border-gray-300 border-t border-b border-r focus:bg-gray-500 focus:text-white hover:bg-gray-500 hover:text-white focus:outline-none"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>

    <div class="container inProgress my-2" v-show="inProgressList.length > 0">
      <div class="text-left flex">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
        <div class="font-semibold text-red-300">In Progress</div>
      </div>
      <ul
        class="text-gray-700 text-center bg-gray-400 hover:text-white hover:bg-blue-500 m-2"
        v-for="i in inProgressList"
        :key="i.name"
        @click="swapInprogress(i)"
      >
        {{
          i.name
        }}
      </ul>
    </div>

    <div class="container completed" v-show="completedList.length > 0">
      <div class="text-left flex ">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
        <div class="font-semibold text-green-300">
          Completed
        </div>
      </div>
      <ul
        class="text-gray-700 text-center bg-gray-400 hover:text-white hover:bg-blue-500 m-2"
        v-for="i in completedList"
        :key="i._id"
        @click="swapInprogress(i)"
      >
        {{
          i.name
        }}
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameList',
  components: {},
  data() {
    return {
      inputText: '',
    };
  },
  props: {
    games: Array,
  },
  methods: {
    inputBox() {
      this.inputText = this.$refs.textBox.value;
      this.$refs.textBox.value = '';
      this.$emit('add-to-list', this.inputText);
    },
    swapInprogress: function(i) {
      this.$emit('swap-inprogress', i._id);
    },
    listSort(gamesList) {
      if (this.games.length > 0) {
        return gamesList.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } else {
        return this.games;
      }
    },
  },
  computed: {
    inProgressList: function() {
      let sorted = this.listSort(this.games);
      return sorted.filter((games) => games.completed === false);
    },
    completedList: function() {
      let sorted = this.listSort(this.games);
      return sorted.filter((games) => games.completed === true);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
span svg {
  width: 1.5em;
  height: 1.5em;
}

.completed ul {
  text-decoration: line-through;
}
</style>
