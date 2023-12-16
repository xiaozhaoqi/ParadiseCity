<template>
  <div :class="`calendar-item`" @click="clickItem">
    <div :class="{ day: true, weekend: !!isWeekend }">
      <span :class="{ sported }"> {{ value ? value : '' }}</span>
    </div>
    <div class="xiu" v-if="emojimark">{{ emojimark }}</div>
    <div class="bottom">
      <div :class="{ marked, actived, selected }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'sported', 'actived', 'dateString', 'selected', 'marked', 'isWeekend', 'events'],
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
      this.value && this.$emit('clickItem', this.dateString)
    }
  }
}
</script>

<style lang="postcss" scoped>
.calendar-item {
  &.banbenri {
    background: #ecf1fe;
  }

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


  .sported {
    border: 3px solid #f93885;
    border-radius: 50%;
    line-height: 0;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .weekend {
    color: #b7bcc0;
  }

  .day {
    display: flex;
    justify-content: center;
  }


  .xiu,
  .ban {
    position: absolute;
    top: -2px;
    right: 0;
    font-size: 8px;
    color: #0a8750;
    font-weight: 400;
    line-height: 1em;
  }

  .ban {
    color: #c30000;
  }





  .marked {
    background: #0a8750;
    height: 3px;
    width: 50%;
  }

  .actived {
    background: #02a7f0;
    margin-right: 1px;
    height: 3px;
    width: 50%;
  }

  .selected {
    background: #f4b346;
    margin-right: 1px;
    height: 3px;
    width: 50%;
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