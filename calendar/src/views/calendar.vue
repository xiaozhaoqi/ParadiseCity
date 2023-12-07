<template>
  <Transition>

    <div class="calendar bg" @touchmove="touchmove" @touchstart="touchstart" v-if="pwd == '1225'">
      <div><a href="../">🔙</a></div>
      <div class="calendar-tip">
        <span class="prev-year" @click="prev('year')">上年</span>
        <span class="prev-month" @click="prev('month')">上月</span>
        <span style="font-size: 16px;font-weight: bold;" title="当前日期" @click="clickDate">
          {{ `${year}-${month + 1}` }}
        </span>
        <span class="next-month" @click="next('month')">下月</span>
        <span class="next-year" @click="next('year')">下年</span>
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
      <div style="margin: 10px 0;font-size: 14px;">
        <input type="date" v-model="dateString" @change="changeInputDate" />
      </div>

      <textarea class="date-content" style="height: 50vh;width: 100%" v-model="dateContent"
        placeholder="今天你运动了吗？点我记录一下吧" />
      <div style="display: flex;">
        <div>
          <p style="font-size: 13px;font-weight: bold;">往年今日</p>
          <div v-for="item in history" :key="item.key">
            <p style="font-size: 13px;font-weight: bold;">{{ item.date }}</p>
            <p style="font-size: 12px;">{{ item.content }}</p>
          </div>
        </div>
        <!-- <div style="flex: 0 0 50%;">
        <p style="font-size: 13px;font-weight: bold;">待办事项</p>
        <div v-for="item in todoList" :key="item.key">
          <p style="font-size: 13px;font-weight: bold;">{{ item.dateString }}</p>
          <p style="font-size: 12px;">
            <input style="vertical-align: -2px;" type="checkbox" v-model="item.state">
            {{ item.content }}
          </p>
        </div>
      </div> -->
      </div>
      <button @click="updateDateContent" class="update-btn">😆 <br><span style="color:red;font-size: 20px;">{{ status
      }}</span></button>
    </div>
    <div v-else>
      <img :src="bg" alt="" style="position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    margin: auto;
    z-index: -1;">
      <span style="position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    font-weight: bold;
    margin: auto;width: 50px;
    font-size: 10px;
    height: 50px;border: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px 4px;
    border-radius: 50%;display: block;
    background: #fff;
    line-height: 50px;
    text-align: center;" @click="pwd = '1225'">
        芝麻开门
      </span>
    </div>
  </Transition>
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
      bg: `bg (${String(Date.now()).slice(-1)}).jpg`,
      date,
      todoList: [],
      pwd: localStorage.getItem('pwd'),
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      firstDay: null,
      monthDayLength: null,
      itemList: [],
      selected: [],
      events: [],
      markList: [],
      status: '',
      dateString: '',
      dateContent: '',
      isEdit: false,
      curSha: '',
      history: [],
      temp: ``,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    }
  },
  async mounted() {
    this.dateString = `${this.year}-${this.month + 1 < 10 ? '0' + (this.month + 1) : this.month + 1
      }-${this.day < 10 ? '0' + this.day : this.day}`
    await this.init()
    this.clickItem(this.dateString)
  },
  methods: {
    changepwd() {
      if (this.pwd == '1225') {
        localStorage.setItem('pwd', '1225')
      }
    },
    touchstart(e) {
      this.startX = e.targetTouches[0].pageX;
      this.startY = e.targetTouches[0].pageY;
    },
    touchmove(e) {
      this.endX = e.targetTouches[0].pageX;
      this.endY = e.targetTouches[0].pageY;
      let dValueX = Math.abs(this.startX - this.endX);
      let dValueY = Math.abs(this.startY - this.endY);
      const stopRange = window.screen.width / 5;
      // 水平滑动长度大于纵向滑动长度，选择水平滑动
      if (dValueX > dValueY) {
        if (dValueX > stopRange) {
          if (this.startX <= this.endX) {
            this.prev('month')
          } else {
            this.next('month')
          }
          this.startX = 0;
          this.startY = 0
        }
        e.preventDefault();
      } else {
        // e.preventDefault();
      }

    },
    async init() {
      try {
        const item = await req.getArticle('1996-10-13') // 标记
        this.events = (decodeURIComponent(atob(item.content))).split('\n').map(v => ({ dateString: v.split(' ')[0], emojimark: v.split(' ')[1] }))
        this.calendar()
      } catch (error) {
      }
      try {
        const item = await req.getArticle('1995-12-25') // 待办
        this.todoList = (decodeURIComponent(atob(item.content))).split('\n').map(v => ({ dateString: v.split(' ')[0], content: v.split(' ')[1], state: false }))
        this.calendar()
      } catch (error) {
      }
      try {
        let markList = await req.getArticleList()
        this.markList = markList.filter(v => v.size > 1).map(v => v.name.slice(0, -3))
        this.calendar()
      } catch (error) {
      }

    },
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
        this.init()
        setTimeout(() => {
          this.status = ''
        }, 2000);
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
      this.dateContent = 'loading...'
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
      this.history = []
      for (let i = Number(dateString.slice(0, 4)) - 1; i > 2011; i--) {
        try {
          const item = await req.getArticle(`${i}${dateString.slice(4)}`)
          this.history.push({
            date: `${i}${dateString.slice(4)}`,
            content: decodeURIComponent(atob(item.content))
          })
        } catch (error) {
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
          marked: this.markList.findIndex(v => v.indexOf(dateString) > -1) > -1,
          desc: markDate ? markDate.desc : '',
          events: this.events.filter((v) => v.dateString == dateString)
        })
      }
    }
  }
}
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
<style lang="postcss" > .typed-out {
   overflow: hidden;
   animation:
     typing 2s steps(20, end) forwards;
   width: 0;
 }

 @keyframes typing {
   from {
     white-space: nowrap;
     width: 0
   }

   to {
     white-space: wrap;
     width: 100%
   }
 }

 .bg {
   padding: 1rem;
   height: 100%;
   background: #fff;
 }

 .update-btn {
   font-size: 32px;
   font-weight: bold;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 30px;
   background: transparent;
   margin: auto;
   border: none;
   width: 100%;
   border-radius: 100px;
 }

 .date-content {
   border: none;
   outline: none;
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
   min-height: 150vh;
   padding-bottom: 100px;
   margin: auto;

   .calendar-tip {
     cursor: pointer;
     position: relative;
     display: flex;
     justify-content: space-around;
     align-items: center;
     flex-wrap: nowrap;
     font-size: 12px;
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
   }

   .calendar-day {
     /* padding: 0 15%; */
     font-size: 12px;

     span {
       display: inline-block;
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