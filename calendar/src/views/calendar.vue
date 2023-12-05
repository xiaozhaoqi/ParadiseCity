<template>
  <div class="calendar">
    <div><a href="../">🔙</a></div>
    <div class="calendar-tip">
      <span class="prev-year" @click="prev('year')" title="前一年">{{ '<<' }}</span>
          <span class="prev-month" @click="prev('month')" title="前一月">{{ '<' }}</span>
              <span class="date-desc" title="当前日期" @click="clickDate">
                {{ `${year}-${month + 1}` }}
              </span>
              <span class="next-month" @click="next('month')" title="后一月">{{ '>' }}</span>
              <span class="next-year" @click="next('year')" title="后一年">{{ '>>' }}</span>
    </div>
    <div class="calendar-day">
      <Item v-for="(item, index) in [
        { value: '一' },
        { value: '二' },
        { value: '三' },
        { value: '四' },
        { value: '五' },
        { value: '六' },
        { value: '日' }
      ]" :key="item.key" v-bind="item" />
    </div>
    <div class="calendar-day">
      <Item v-for="(item, index) in itemList" :key="item.key" v-bind="item" @clickItem="clickItem" />
    </div>
    <div style="margin: 10px; display: flex; justify-content: space-between; align-items: center">
      <!-- <span style="font-weight: bold; font-size: 16px" v-show="isEdit">{{ dateString }}</span> -->
      <input type="date" v-model="dateString" @change="changeInputDate" />
      <div>
        <!-- <input type="checkbox" v-model="isEdit" id="edit-btn" style="vertical-align: -2px" /> -->
        <!-- <label for="edit-btn">edit</label> -->
      </div>
    </div>
    <!-- <div class="date-content" v-show="!isEdit">{{ dateContent }}</div> -->
    <textarea class="date-content" style="height: 50vh; width: 100%" v-model="dateContent" />
    <button @click="updateDateContent" class="update-btn">update <span style="color:red">{{ status }}</span></button>
  </div>
</template>

<script>
import Item from './item.vue'
import * as req from './req.js'
export default {
  props: [],
  components: { Item },
  data: function () {
    const date = new Date()
    return {
      date,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      firstDay: null,
      monthDayLength: null,
      itemList: [],
      selected: [],
      events: [],
      status: '',
      dateString: '',
      dateContent: '',
      isEdit: false,
      curSha: '',
      temp: `
      运动：
      饮食：
      其他：
      `
    }
  },
  async mounted() {
    // this.calendar()
    this.dateString = `${this.year}-${this.month + 1 < 10 ? '0' + (this.month + 1) : this.month + 1
      }-${this.day < 10 ? '0' + this.day : this.day}`
    try {
      const item = await req.getArticle('1996-10-13')
      this.events = (decodeURIComponent(atob(item.content))).split('\n').map(v => ({ dateString: v.split(' ')[0], emojimark: v.split(' ')[1] }))
      this.calendar()
    } catch (error) {
    }
    this.clickItem(this.dateString)
  },
  methods: {
    changeInputDate(e) {
      this.date = new Date(this.dateString)
      this.clickItem(this.dateString)
      this.calendar()
    },
    async updateDateContent() {
      // update
      try {
        await req.sendNewArticle({ title: this.dateString, content: this.dateContent, sha: this.curSha })
        // this.isEdit = false
        this.status = 'success!'
        setTimeout(() => {
          this.status = ''
        }, 1000);
      } catch (error) {
        this.status = '没存上，再来！'
      }

    },
    clickDate() {
      this.date = new Date()
      this.calendar()
    },
    async clickItem(dateString) {
      if (this.isEdit) {
        return
      }
      this.$emit('clickDay', dateString)
      this.dateString = dateString
      // query day event
      this.calendar()
      this.dateContent = ''
      try {
        const item = await req.getArticle(dateString)
        this.dateContent = decodeURIComponent(atob(item.content))
        this.curSha = item.sha
      } catch (error) {
        if (this.dateString == dateString) {
          this.dateContent = this.temp
          this.curSha = ''
        }
      }
    },
    prev(type) {
      this.$emit('change')
      if (type === 'year') {
        this.date = new Date(this.date.getFullYear() - 1, this.date.getMonth(), 1)
        this.year = this.date.getFullYear()
      }
      if (type === 'month') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1)
        this.year = this.date.getFullYear()
        this.month = this.date.getMonth()
      }
      this.calendar()
    },
    next(type) {
      this.$emit('change')
      if (type === 'year') {
        this.date = new Date(this.date.getFullYear() + 1, this.date.getMonth(), 1)
        this.year = this.date.getFullYear()
      }
      if (type === 'month') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
        this.year = this.date.getFullYear()
        this.month = this.date.getMonth()
      }
      this.calendar()
    },
    async calendar() {
      this.year = this.date.getFullYear() // 取当前年
      this.month = this.date.getMonth() // 取当前月，此数字是实际月份减一
      this.day = this.date.getDate() // 取当前日

      // query month event list
      // req.getArticleList()
      this.firstDay =
        (new Date(this.year, this.month, 1).getDay() == 0
          ? 7
          : new Date(this.year, this.month, 1).getDay()) - 1 // 本月第一天是星期几
      this.monthDayLength = new Date(this.year, this.month + 1, -1).getDate() + 1 // 本月一共有几天
      this.itemList = []
      for (let i = 0; i < this.firstDay; i++) {
        this.itemList.push({
          value: 0,
          events: [],
          key: i
        })
      }
      for (let j = 1; j <= this.monthDayLength; j++) {
        const dateString = `${this.year}-${this.month + 1 < 10 ? '0' + (this.month + 1) : this.month + 1
          }-${j < 10 ? '0' + j : j}`
        const markDate = this.events.find((v) => v.dateString == dateString)
        this.itemList.push({
          isWeekend: new Date(dateString).getDay() == 6 || new Date(dateString).getDay() == 0,
          value: j,
          actived:
            this.year == new Date().getFullYear() &&
            this.month == new Date().getMonth() &&
            j == new Date().getDate(),
          dateString,
          key: dateString,
          selected: this.dateString == dateString,
          marked: !!markDate,
          desc: markDate ? markDate.desc : '',
          events: this.events.filter((v) => v.dateString == dateString)
        })
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.update-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: #076cfa;
}

.date-content {
  margin: 10px;
  font-size: 14px;
  line-height: 1.5em;
  font-weight: normal;
}

.gray {
  color: rgba(51, 51, 51, 0.5) !important;
}

.calrow:last-child .oldline {
  display: none;
}

.oldline {
  position: absolute;
  border-radius: 4px;
  left: 95px;
  top: 15px;
  width: 14px;
  height: 80px;
  background: #ecf1fe;
}

.calline {
  width: 14px;
  background-image: linear-gradient(180deg, #076cfa 0%, #a0bffd 100%);
  position: absolute;
  top: 30px;
  bottom: 70px;
  left: 115px;
  border-radius: 8px;

  &.orange {
    background-image: linear-gradient(180deg, #fa7a0d 0%, #fef1ec 100%);
  }
}

.calendar {
  /* width: 260px; */
  padding-bottom: 100px;
  margin: auto;

  .calendar-tip {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    font-size: 15px;
    color: #1e3a8e;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 700;
    text-align: center;
    margin: 10px 0;

    .gotoday {
      position: absolute;
      right: 0;
      font-size: 11px;
      color: #999999;
      letter-spacing: 0;
      line-height: 22px;
      font-weight: 400;
    }
  }

  .calendar-month {
    text-align: center;
    margin: 10px 0;
    color: #222;
  }

  .calendar-day {
    /* padding: 0 15%; */
    font-size: 12px;

    span {
      display: inline-block;
      color: #222;
      text-align: center;
      height: 32px;
      width: 34px;
      line-height: 32px;
    }
  }
}
</style>
<style lang="postcss" scoped>
.tabs {
  border-bottom: 1px solid #b5b5b7;
  white-space: nowrap;
  z-index: 999;
  padding: 10px 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  span {
    display: inline-block;
    margin-right: 18px;
    color: #333;
    font-size: 14px;
    padding-bottom: 10px;

    &.active {
      font-weight: 700;
      color: #1e3a8e;
      font-size: 14px;
      border-bottom: 4px solid #1e3a8e;
      padding-bottom: 6px;
    }
  }
}
</style>