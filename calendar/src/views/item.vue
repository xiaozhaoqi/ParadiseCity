<template>
  <div :class="`calendar-item`" @click="clickItem">
    <div :class="{ day: true, actived, weekend: !!isWeekend }">
      {{ value ? value : '' }}
    </div>
    <!-- <div class="marked" v-if="marked"></div> -->
    <div class="xiu" v-if="emojimark">{{ emojimark }}</div>
    <!-- <div class="bottom">
      <div class="yingji" v-if="yingji"></div>
      <div class="kuaisujinji" v-if="kuaisujinji"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['value', 'actived', 'dateString', 'marked', 'isWeekend', 'events'],
  data: function () {
    let events = this.events || []
    return {
      emojimark: events.map((v) => v.emojimark).join('')
    }
  },
  watch: {
    events: {
      deep: true,
      handler: function () {
        let events = this.events || []
      }
    }
  },
  methods: {
    clickItem() {
      this.$emit('clickItem', this.dateString)
    }
  }
}
</script>

<style lang="postcss" scoped>
.calendar-item {
  &.banbenri {
    background: #ecf1fe;
  }
  /* border: 1px solid #999; */
  margin-top: 4px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 14.28%;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  .actived {
    margin: 3px auto;
    width: 24px;
    height: 24px;
    line-height: 23px;
    background-color: #508efd;
    border-radius: 50%;
    color: #fff;
  }
  .weekend {
    color: #b7bcc0;
  }
  .day {
  }
  .marked {
    position: absolute;
    top: 7px;
    right: 5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #02a7f0;
  }
  .xiu,
  .ban {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 8px;
    color: #0a8750;
    font-weight: 400;
    line-height: 1em;
  }
  .ban {
    color: #c30000;
  }
  .yingji {
    background: #c30000;
    margin-right: 1px;
    height: 3px;
    width: 40%;
  }
  .kuaisujinji {
    background: #f4b346;
    height: 3px;
    width: 40%;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 2px;
    right: 2px;
    height: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>