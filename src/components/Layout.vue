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

export default {
  name: 'layout',
  components: { GameList, MenuList },
  emits: ['add-to-list'],
  data() {
    return {
      games: [
        {
          name: 'Cyberpunk',
          completed: true,
        },
        {
          name: 'Fallout 4',
          completed: false,
        },
        {
          name: 'Call of Duty: Cold War',
          completed: true,
        },
        {
          name: 'Red Dead Redemption',
          completed: false,
        },
        {
          name: 'game five',
          completed: false,
        },
        {
          name: 'Game Six',
          completed: false,
        },
        {
          name: 'game Seven',
          completed: false,
        },
        {
          name: 'game Eight',
          completed: false,
        },
        {
          name: 'game Nine',
          completed: false,
        },
        {
          name: 'game Ten',
          completed: false,
        },
      ],
      lastIndex: 10,
    };
  },
  props: {},
  methods: {
    addToList(value) {
      this.games[this.lastIndex] = {
        name: value.toString(),
        completed: false,
      };
      this.lastIndex++;
    },
    swapInprogress(i) {
      this.games[i].completed = !this.games[i].completed;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
