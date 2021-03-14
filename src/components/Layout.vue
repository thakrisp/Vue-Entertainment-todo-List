<template>
  <div class="container max-w-full">
    <div class="grid grid-flow-col gap-4 text-white text-center p-1">
      <div class="bg-gray-500 border border-red-500">
        <MenuList />
      </div>
      <div class="col-span-12 bg-gray-500 border border-red-500">
        <GameList
          :games="games"
          @add-to-list="addToList"
          @swap-inprogress="swapInprogress"
        />
      </div>
      <div class="bg-gray-500 border border-red-500">
        <div>chart</div>
      </div>
    </div>
  </div>
</template>

<script>
import GameList from './GameList';
import MenuList from './MenuList';
import axios from 'axios';

const url = 'api/items/';

export default {
  name: 'layout',
  components: { GameList, MenuList },
  emits: ['add-to-list'],
  data() {
    return {
      games: [],
      error: '',
    };
  },
  props: {},
  methods: {
    getList() {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => resolve((this.games = res.data)))
          .catch(() => {
            reject;
          });
      });
    },
    async addToList(value) {
      let stringValue = value.toString();
      await axios.post(url, { name: stringValue });
      this.getList();
    },
    async swapInprogress(i) {
      let status;

      this.games.map((el) => {
        if (el._id == i) {
          status = !el.completed;
          return el;
        }
        return el;
      });

      await axios.put(`${url}${i}`, { id: i, completed: status });
      this.getList();
    },
  },
  async created() {
    try {
      this.games = await this.getList();
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
