<template>
  <Transition>
    <div>
      {{ regdata }}
      <div class="calendar bg" v-show="pwd == '1225' && dateString">
        <div><a href="../">🔙</a></div>
        <div class="calendar-tip" v-if="!yearMode">
          <span class="prev-year" @click="prev('year')">上年</span>
          <span class="prev-month" @click="prev('month')">上月</span>
          <span style="font-size: 16px;font-weight: bold;" title="当前日期" @click="clickItem('')">
            {{ `${year}-${String(month + 1).padStart(2, '0')}` }}
          </span>
          <span class="next-month" @click="next('month')">下月</span>
          <span class="next-year" @click="next('year')">下年</span>
        </div>
        <div class="calendar-tip" v-if="yearMode">
          <span class="prev-year" @click="prev('year'); getYearList();">上年</span>
          <span style="font-size: 16px;font-weight: bold;" title="当前日期">
            {{ `${year}` }}
          </span>
          <span class="next-year" @click="next('year'); getYearList();">下年</span>
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
        <div class="calendar-day" v-if="!yearMode">
          <Item v-for="(item, index) in itemList" :key="item.key" v-bind="item" @clickItem="clickItem" />
        </div>
        <div v-if="yearMode" style="padding-bottom: 300px;">
          <div v-for="(list, index) in yearList" :key="index">
            <div style="text-align: center;font-size: 14px;font-weight: bold;margin-top:5px;">{{ `${index + 1} 月` }}
            </div>
            <div class="calendar-day">
              <Item v-for="(item) in list" :key="item.key" v-bind="item" @clickItem="clickItem(item.dateString)" />
            </div>
          </div>
        </div>
        <div
          :style="`${yearMode ? 'position:fixed;bottom:0;background:#fff;left:10px;right:10px;height: 300px;overflow: auto;border-top: 1px solid #ccc;' : ''}`">
          <div style="margin: 10px 0;font-size: 14px;display: flex;align-items: center;">
            <input type="date" style="width: 100px; font-size: 13px;" v-model="dateString"
              @change="clickItem(dateString)" />
            <button @click="updateDateContent" style="font-size: 12px;margin-left: 10px;">保存</button>
            <!-- <button @click="clickItem('')" style="font-size: 12px;margin-left: 10px;">今天</button> -->
            <button @click="searchModal = true;" style="font-size: 12px;margin-left: 10px;">搜索</button>
            <button @click="addWeightModal = true; weightDate = dateString"
              style="font-size: 12px;margin-left: 10px;">体重</button>
            <button @click="getYearList(); yearMode = !yearMode;" style="font-size: 12px;margin-left: 10px;">{{ yearMode
        ?
        '月度' : '年度'
              }}</button>
          </div>


          <textarea class="date-content" :rows="7" style="width: 100%" v-model="dateContent"
            :placeholder="`运动（滑雪|球|跑步|慢跑|散步|运动|骑车|自行车|跳绳）\n饮食\n今日最佳\n等等`" />
          <div style="color:red;font-size: 14px; ">{{ status }}</div>


          <p style="font-size: 13px;font-weight: bold;display: flex;justify-content: space-between;">
            <span style="display: inline-block;width:120px; font-weight: bold;font-size: 12px;">
              {{ year }}年
              <span style="color:#0a8750; font-weight: bold;font-size: 12px;">{{ moneyYear }}</span>
              元
            </span>
            <span style="display: inline-block;width:120px; font-weight: bold;font-size: 12px;">
              {{ month + 1 }}月
              <span :style="`color:${moneyMonth > 3000 ? '#f93885' : '#0a8750'}; font-weight: bold;font-size: 12px;`">
                {{
        moneyMonth }}</span>
              元
            </span>
            <span style="display: inline-block; font-weight: bold;font-size: 12px;">
              {{ day }}日
              <span :style="`color:${money > 100 ? '#f93885' : '#0a8750'}; font-weight: bold;font-size: 12px;`">{{ money
                }}</span>
              元
            </span>
          </p>

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
        </div>

        <div v-show="searchModal"
          style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;overflow: auto;width: 100%;padding: 20px;background: #fff;">
          <div>
            <div>
              <p style="font-size: 13px;font-weight: bold; margin-bottom: 4px;">
                历史搜索
              </p>
              <input placeholder="输入关键字" type="text" v-model="query" :disabled="allowSearch"
                style="margin-right: 4px;font-size: 13px;width: 120px;">
              <button @click="search('history')" :disabled="allowSearch" style="margin-right: 4px;">搜索</button>
              <button @click="allowSearch = false" :disabled="!allowSearch" style="margin-right: 4px;">停止</button>
              <button @click="searchModal = false" style="margin-right: 4px;">关闭</button>
              <span style="font-size: 12px;">进度：{{ searchNum }}/{{ searchNumAll }}</span>
              <div v-for="item in searchResult" :key="item.key">
                <p style="font-size: 13px;font-weight: bold;">{{ item.date }}</p>
                <p style="font-size: 12px;" v-html="item.content"></p>
              </div>
              <div v-show="searchNum > 0 && searchResult.length == 0" style="font-size: 12px;color: #333;">搜不到哟</div>
            </div>
          </div>
        </div>
        <div v-show="addWeightModal"
          style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;overflow: auto;width: 100%;padding: 20px;background: #fff;">
          <div>
            <div>
              <p style="font-size: 13px;font-weight: bold; margin-bottom: 4px;">
                记录体重
              </p>
              <input type="date" v-model="weightDate" style="margin-right: 4px;width: 100px;font-size: 13px;">
              <input placeholder="琦体重" type="text" v-model="weightQ" style="margin-right: 4px;width: 60px;">
              <input placeholder="楠体重" type="text" v-model="weightN" style="margin-right: 4px;width: 60px;">
              <button @click="saveWeight" style="margin-right: 4px;">保存</button>
              <button @click="addWeightModal = false">关闭</button>
            </div>
            <div style="margin: 30px 0 0;overflow: hidden;">
              <div id="weightChart" style="width:calc(100vw - 40px);height:400px;"></div>
              <div id="moneyChart" style="width:calc(100vw - 40px);height:400px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="pwd != '1225'">
        <img :src="bg" alt="" @load="bgLoaded = true"
          style="position: fixed;left: 0;right: 0;top: 0;bottom: 0;width: 100%;margin: auto;z-index: -1;">
        <!-- <span v-show="bgLoaded && dateString"
          style="position: fixed;left: 0;right: 0;top: 0;bottom: 0;width: 100%;font-weight: bold;margin: auto;width: 50px;font-size: 10px;height: 50px;border: none;box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px 4px;border-radius: 50%;display: block;background: #fff;line-height: 50px;text-align: center;"
          @click="openpwd">
          芝麻开门
        </span> -->
        <span
          style="position: fixed;right: 0;top: 0;bottom: 0; font-weight: bold;margin: auto;width: 50px;font-size: 10px;height: 50px;border: none;box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px 4px;border-radius: 50%;display: block;background: #fff;opacity: 0;line-height: 50px;text-align: center;"
          @click="savepwd">
          芝麻开门，别关门了
        </span>
      </div>
    </div>

  </Transition>
</template>

<script>
import Item from './item.vue'
import * as req from './req.js'
import * as echarts from 'echarts'
let weightChart = null
let moneyChart = null
export default {
  props: [],
  components: { Item },
  data: function () {
    const date = new Date()
    return {
      force: false,
      bg: `bg (${String(Date.now()).slice(-1)}).jpg`,
      date,
      bgLoaded: false,
      db: new DB(),
      searchModal: false,
      todoList: [],
      pwd: localStorage.getItem('pwd'),
      year: '',
      month: '',
      day: '',
      firstDay: null,
      monthDayLength: null,
      itemList: [],
      yearList: [],
      selected: [],
      events: [],
      markList: [],
      status: '',
      dateString: '',
      dateContent: '',
      curSha: '',
      weightQ: '', weightN: '',
      weightDate: '',
      history: [],
      searchResult: [],
      searchYear: new Date().getFullYear(),
      searchMonth: new Date().getMonth() + 1,
      query: '',
      temp: ``,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      allowSearch: false,
      searchNum: 0,
      searchNumAll: 0,
      weightOption: {
        grid: {
          left: 40,
          right: 50,
        },
        tooltip: {
          trigger: 'item',
          formatter: (a) => {
            if (a.componentType == 'markLine' || a.componentType == 'markPoint') {
              return `${a.name}${a.value}`
            }
            return `${a[0].data[0]}<br>${a
              .map((v) => `<span style="color:${v.color}">${v.seriesName}${v.data[1]}</span><br>`)
              .join('')}`;
          }
        },
        xAxis: {
          axisPointer: {
            show: true,
            type: 'line',
          },
          type: 'time',
        },
        legend: {},
        yAxis: {
          min: 50,
          max: 90,
          interval: 5,
          type: 'value',
        },
        dataZoom: [
          {
            start: 90,
            end: 100,
            brushSelect: false
          }
        ],
        series: [
          {
            markPoint: {
              data: [
                {
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值',
                }
              ]
            },
            itemStyle: {
              color: '#0a8750'
            },
            name: '楠',
            type: 'scatter',
            symbolSize: 2,
            data: []
          },
          {
            markPoint: {
              label: false,
              data: [
                {
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值',
                }
              ]
            },
            itemStyle: {
              color: '#02a7f0'
            },
            name: '琦',
            type: 'scatter',
            symbolSize: 2,
            data: []
          }
        ]
      },
      moneyOption: {
        grid: {
          left: 50,
          right: 50,
        },
        tooltip: {
          trigger: 'item',
          formatter: (a) => {
            if (a.componentType == 'markLine' || a.componentType == 'markPoint') {
              return `${a.name}${a.value}`
            }
            return `${a[0].data[0]}<br>${a
              .map((v) => `<span style="color:${v.color}">${v.seriesName}${v.data[1]}</span><br>`)
              .join('')}`;
          }
        },
        xAxis: {
          axisPointer: {
            show: true,
            type: 'line',
            label: {
              show: false
            },
            lineStyle: {
              width: 0.5
            }
          },
          type: 'time',
          boundaryGap: false
        },
        legend: {},
        yAxis: {
          // min: 50,
          // max: 90,
          // interval: 2,
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            start: 70,
            end: 100,
            brushSelect: false
          }
        ],
        series: [
          {
            markPoint: {
              data: [
                {
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值',
                }
              ]
            },
            itemStyle: {
              color: '#f4b346'
            },
            name: '消费',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: []
          },
        ]
      },
      money: 0,
      moneyMonth: 0,
      moneyYear: 0,
      allDayList: [],
      sportList: [],
      addWeightModal: false,
      yearMode: false,
      regdata: '',
      touchIDOptions: {
        publicKey: {
          rp: { name: "Xcalendar" },
          user: {
            name: "X",
            id: this.base64ToArrayBuffer("123"),
            displayName: "X"
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            {
              type: "public-key",
              alg: -35
            },
            { type: "public-key", alg: -36 },
            { type: "public-key", alg: -257 },
            {
              type: "public-key",
              alg: -258
            },
            { type: "public-key", alg: -259 },
            { type: "public-key", alg: -37 },
            {
              type: "public-key",
              alg: -38
            },
            { type: "public-key", alg: -39 },
            { type: "public-key", alg: -8 }
          ],
          challenge: this.base64ToArrayBuffer(
            '123'
          ),
          timeout: 60000,
          authenticatorSelection: {
            authenticatorAttachment: "platform"
          }
        }
      },
      touchIDLoginOptions: {
        publicKey: {
          challenge: this.base64ToArrayBuffer(
            '123'
          ),
          allowCredentials: [ 
            {
              type: "public-key",
              id: this.base64ToArrayBuffer(
                'n6Ve7V+J8MxUwA9Qt9JZBwfTT4xKmSyuE4IEByxyiQU='
              ),
              transports: ["internal"]
            }, 
          ]
        }
      }
    }
  },
  async mounted() {
    moneyChart = echarts.init(document.getElementById('moneyChart'), null, { locale: "ZH" })
    weightChart = echarts.init(document.getElementById('weightChart'), null, { locale: "ZH" })
    window.addEventListener("resize", () => {
      moneyChart.resize()
      weightChart.resize()
    });
    await this.init();
  },
  methods: {
    async che() {
      try {
        await navigator.credentials.get(this.touchIDLoginOptions)
      } catch (error) {
        document.write('')
        function _0x5681() { var _0x1a1da9 = ['1XKKrCq', '3594357fwUjBA', 'tel:10086', '1068212HrfKDA', '5QDMwFF', '4343896BDfuNv', '66VpnzGk', 'constructor', 'outerWidth', 'innerHeight', 'debugger', '237349SfKdBC', '526354kDClxq', 'call', '372165qmWCQj', 'innerWidth', '10921730AWfZZR']; _0x5681 = function () { return _0x1a1da9; }; return _0x5681(); } function _0x5004(_0x3c23d, _0x575f24) { var _0x5681ef = _0x5681(); return _0x5004 = function (_0x5004ce, _0x4d4714) { _0x5004ce = _0x5004ce - 0x122; var _0x24563e = _0x5681ef[_0x5004ce]; return _0x24563e; }, _0x5004(_0x3c23d, _0x575f24); } (function (_0x2cb1e6, _0x4e83c1) { var _0x443a83 = _0x5004, _0x5d779f = _0x2cb1e6(); while (!![]) { try { var _0x138f5b = -parseInt(_0x443a83(0x128)) / 0x1 * (parseInt(_0x443a83(0x123)) / 0x2) + parseInt(_0x443a83(0x125)) / 0x3 + parseInt(_0x443a83(0x12b)) / 0x4 * (parseInt(_0x443a83(0x12c)) / 0x5) + -parseInt(_0x443a83(0x12e)) / 0x6 * (-parseInt(_0x443a83(0x122)) / 0x7) + parseInt(_0x443a83(0x12d)) / 0x8 + parseInt(_0x443a83(0x129)) / 0x9 + -parseInt(_0x443a83(0x127)) / 0xa; if (_0x138f5b === _0x4e83c1) break; else _0x5d779f['push'](_0x5d779f['shift']()); } catch (_0x3ffe1c) { _0x5d779f['push'](_0x5d779f['shift']()); } } }(_0x5681, 0x55b77), ((() => { function _0x4af5cc() { var _0x679e22 = _0x5004; (window['outerHeight'] - window[_0x679e22(0x131)] > 0xc8 || window[_0x679e22(0x130)] - window[_0x679e22(0x126)] > 0xc8) && (window['location']['href'] = _0x679e22(0x12a)), setInterval(() => { var _0x50eea5 = _0x679e22; (function () { return ![]; }[_0x50eea5(0x12f)](_0x50eea5(0x132))[_0x50eea5(0x124)]()); }, 0x32); } try { _0x4af5cc(); } catch (_0x3ce291) { } })()));
        function _0x2135(_0x4bbc64, _0x26a108) { var _0x26631f = _0x2663(); return _0x2135 = function (_0x2135bd, _0x5bf402) { _0x2135bd = _0x2135bd - 0x192; var _0x412bf4 = _0x26631f[_0x2135bd]; return _0x412bf4; }, _0x2135(_0x4bbc64, _0x26a108); } var _0x349f95 = _0x2135; (function (_0x41a571, _0xca219) { var _0x365327 = _0x2135, _0x431187 = _0x41a571(); while (!![]) { try { var _0x46de6c = parseInt(_0x365327(0x194)) / 0x1 * (-parseInt(_0x365327(0x19a)) / 0x2) + parseInt(_0x365327(0x19b)) / 0x3 + parseInt(_0x365327(0x192)) / 0x4 * (-parseInt(_0x365327(0x199)) / 0x5) + -parseInt(_0x365327(0x197)) / 0x6 + parseInt(_0x365327(0x198)) / 0x7 + parseInt(_0x365327(0x195)) / 0x8 * (parseInt(_0x365327(0x19d)) / 0x9) + -parseInt(_0x365327(0x193)) / 0xa; if (_0x46de6c === _0xca219) break; else _0x431187['push'](_0x431187['shift']()); } catch (_0x489a7c) { _0x431187['push'](_0x431187['shift']()); } } }(_0x2663, 0x6de41), document[_0x349f95(0x19c)] = function () { return ![]; }, document[_0x349f95(0x196)] = function (_0x1c8eeb) { if (_0x1c8eeb['keyCode'] === 0x7b) return ![]; }); function _0x2663() { var _0x37fd1f = ['2649747xXTExy', 'oncontextmenu', '9TksNiN', '1679112JYXoYS', '7966030ZFcVSx', '4rsxjsu', '6252128epbeJA', 'onkeydown', '953664NodKDZ', '4358683hukFTi', '5ewqXet', '230998YVbRim']; _0x2663 = function () { return _0x37fd1f; }; return _0x2663(); }
        (function (_0x183bf0, _0x18916a) { var _0x28213e = _0x2cd8, _0xfa5855 = _0x183bf0(); while (!![]) { try { var _0x16c101 = parseInt(_0x28213e(0x14d)) / 0x1 * (-parseInt(_0x28213e(0x14a)) / 0x2) + -parseInt(_0x28213e(0x151)) / 0x3 + parseInt(_0x28213e(0x14b)) / 0x4 + parseInt(_0x28213e(0x14c)) / 0x5 + -parseInt(_0x28213e(0x14e)) / 0x6 + -parseInt(_0x28213e(0x150)) / 0x7 + parseInt(_0x28213e(0x149)) / 0x8; if (_0x16c101 === _0x18916a) break; else _0xfa5855['push'](_0xfa5855['shift']()); } catch (_0x51e03b) { _0xfa5855['push'](_0xfa5855['shift']()); } } }(_0x283b, 0x9e504), setInterval(function () { var _0x3a2b83 = _0x2cd8; typeof console[_0x3a2b83(0x14f)] !== 'undefined' && document[_0x3a2b83(0x152)](''); }, 0x3e8)); function _0x2cd8(_0x30f2ee, _0xf45b6a) { var _0x283bb0 = _0x283b(); return _0x2cd8 = function (_0x2cd858, _0x4ecc56) { _0x2cd858 = _0x2cd858 - 0x149; var _0x52ce9e = _0x283bb0[_0x2cd858]; return _0x52ce9e; }, _0x2cd8(_0x30f2ee, _0xf45b6a); } function _0x283b() { var _0x5c616e = ['2463eWhKcT', '201504ZxpNsP', 'clear', '7054929FsIZxg', '3670224ZMfhJT', 'write', '16034632gUWmCo', '468rsHVZy', '3277620neDFen', '3329495WsNmKq']; _0x283b = function () { return _0x5c616e; }; return _0x283b(); }
      }
    },
    async reg() {
      const publicKeyCredential = await navigator.credentials.create(
        this.touchIDOptions
      );

      if (publicKeyCredential && "rawId" in publicKeyCredential) {
        const rawId = publicKeyCredential["rawId"];
        const touchId = this.arrayBufferToBase64(rawId);
        const response = publicKeyCredential["response"];
        const clientDataJSON = this.arrayBufferToString(
          response["clientDataJSON"]
        );
        this.regdata = touchId
      }
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    },
    arrayBufferToBase64(buffer) {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },
    arrayBufferToString(buffer) {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return binary;
    },
    async saveWeight() {
      if (this.weightN) {
        let res = await this.getDayCache('1995-12-25')
        let content = res.content.split('\n').map(v => ([v.split(' ')[0], v.split(' ')[1]]))
        content.unshift([this.weightDate, this.weightN])
        await req.sendNewArticle({ title: '1995-12-25', content: content.map(v => `${v[0]} ${v[1]}`).join('\n'), sha: res.sha })
      }
      if (this.weightQ) {
        let res = await this.getDayCache('1995-12-26')
        let content = res.content.split('\n').map(v => ([v.split(' ')[0], v.split(' ')[1]]))
        content.unshift([this.weightDate, this.weightQ])
        await req.sendNewArticle({ title: '1995-12-26', content: content.map(v => `${v[0]} ${v[1]}`).join('\n'), sha: res.sha })
      }
      // this.addWeightModal = false;
      this.init('update');
    },
    openpwd() {
      this.pwd = '1225'
    },
    savepwd() {
      this.reg();
      // localStorage.setItem('pwd', '1225');
      // this.pwd = '1225'
    },
    getDayCache(dateString) {
      return this.db.read({
        dbName: "calendar",
        objName: "dayCache",
        param: dateString,
      }).then(res => {
        if (res && this.allDayList.find(v => v.sha == res.sha)) {
          // 命中缓存 
          return res
        } else {
          // 内容不一致，重新查
          console.log('内容不一致，重新查' + dateString)
          return req.getArticle(dateString).then(res => {
            let cache = {
              date: dateString,
              content: decodeURIComponent(atob(res.content)),
              sha: res.sha
            }
            this.db.update({
              dbName: "calendar",
              objName: "dayCache",
              param: dateString,
              response: cache
            })
            return cache;
          }).catch((err) => {
          })
        }
      }).catch((err) => {
        console.error(err);
        return req.getArticle(dateString).then(res => {
          let cache = {
            date: dateString,
            content: decodeURIComponent(atob(res.content)),
            sha: res.sha
          }
          return cache;
        })
      })
    },
    async init(type, dateString) {
      req.getArticleList().then(res => {
        this.markList = res.filter(v => v.size > 1).map(v => v.path.slice(15, -3))
        this.allDayList = res;
      }).finally(() => {
        this.getDayCache('1996-10-13').then(res => {
          this.events = (res.content).split('\n').map(v => ({ dateString: v.split(' ')[0], emojimark: v.split(' ')[1] }))
          if (type == 'update') {
            if (dateString) {
              this.clickItem(dateString)
            }
          } else {
            this.clickItem('')
          }
        })
        this.getDayCache('1995-12-25').then(res => {
          // 楠体重
          this.weightOption.series[0].data = res.content.split('\n').map(v => ([v.split(' ')[0], v.split(' ')[1]]))
          weightChart.setOption(this.weightOption)
        })
        this.getDayCache('1995-12-26').then(res => {
          // 琦体重
          this.weightOption.series[1].data = res.content.split('\n').map(v => ([v.split(' ')[0], v.split(' ')[1]]))
          weightChart.setOption(this.weightOption)
        })
      })
    },
    async updateDateContent() {
      // update
      try {
        let remoteCur = await req.getArticle(this.dateString)
        if (remoteCur.sha == this.curSha || this.curSha == '' || this.force) {
          this.force = false;
          let res = await req.sendNewArticle({ title: this.dateString, content: this.dateContent, sha: this.curSha })
          this.status = 'success!';
          this.db.update({
            dbName: "calendar",
            objName: "dayCache",
            param: this.dateString,
            response: {
              date: this.dateString,
              content: this.dateContent,
              sha: res.content.sha
            },
          })
          this.init('update', this.dateString);
          setTimeout(() => {
            this.status = ''
          }, 2000);
        } else {
          let res = confirm('别人可能更新了这篇内容，是否覆盖更新？冲突内容如下：' + decodeURIComponent(atob(remoteCur.content)))
          if (res) {
            this.force = true;
            this.curSha = remoteCur.sha;
            this.updateDateContent()
          }
        }
      } catch (error) {
        this.status = '没存上，再来！error: ' + error
      }

    },
    async search(type) {
      if (type == 'money') {
        this.moneyOption.series[0].data = []
        let moneyDay = 0
        let moneyMonth = 0
        let moneyYear = 0
        this.sportList = []
        for (let i = 1; i <= this.markList.length - 1; i++) {
          try {
            this.getDayCache(this.markList[this.markList.length - i]).then(item => {
              let content = item.content
              try {
                let money = 0;
                (content.match(/[0-9.]*元/ig) || []).map(v => {
                  try {
                    let m = Number(v.replace(/元/g, ''))
                    if (!!m) {
                      money = money + m
                    }
                  } catch (error) {
                    console.log(error)
                  }
                })
                if (this.markList[this.markList.length - i].indexOf(`${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`) > -1) {
                  moneyDay = moneyDay + money;
                }
                if (this.markList[this.markList.length - i].indexOf(`${this.year}-${String(this.month + 1).padStart(2, '0')}`) > -1) {
                  moneyMonth = moneyMonth + money;
                }
                if (this.markList[this.markList.length - i].indexOf(String(this.year)) > -1) {
                  moneyYear = moneyYear + money;
                }
                if (money > 0) {
                  this.moneyOption.series[0].data.push([this.markList[this.markList.length - i], String(money)])
                }
                if (i == this.markList.length - 1) {
                  moneyChart.setOption(this.moneyOption)
                  this.money = moneyDay
                  this.moneyMonth = moneyMonth
                  this.moneyYear = moneyYear
                }
              } catch (error) {
                console.log(error)
              }
              try {
                if (content.match(/滑雪|球|跑步|慢跑|散步|运动|骑车|自行车|跳绳/ig)) {
                  this.sportList.push({
                    date: this.markList[this.markList.length - i],
                    content: content
                  })
                }
              } catch (error) {
                console.log(error)
              }
              if (i == this.markList.length - 1) {
                this.calendar();
              }
            })
          } catch (error) {

          }
        }
      }
      if (type == 'history') {
        this.searchNum = 0
        this.searchNumAll = 0
        this.allowSearch = true
        this.searchResult = []
        for (let i = 1; i <= this.markList.length - 1; i++) {
          try {
            this.searchNumAll++
            if (this.allowSearch) {
              this.getDayCache(this.markList[this.markList.length - i]).then(item => {
                this.searchNum++;
                let content = item.content
                if (content.indexOf(this.query) > -1) {
                  content = content.replaceAll(this.query, `<span style="background: yellow;">${this.query}</span>`)
                  this.searchResult.push({
                    date: this.markList[this.markList.length - i],
                    content: content
                  })
                }
                if (/[1-9]0+/.test(String(this.searchNum)) || this.searchNum > this.searchNumAll - 3) {
                  setTimeout(() => {
                    this.searchResult.sort((a, b) => {
                      return a.date < b.date ? 1 : -1
                    })
                  }, 100);
                }

              }).catch(err => {

              }).finally(() => {
                if (i == this.markList.length - 1 || this.searchNum == this.searchNumAll) {
                  this.allowSearch = false;
                }
              })
            }
          } catch (error) {

          }
        }
      }
    },
    async clickItem(dateString) {
      if (dateString) {
        this.date = new Date(dateString)
      } else {
        this.date = new Date()
      }
      this.year = this.date.getFullYear()
      this.month = this.date.getMonth()
      this.day = this.date.getDate()
      this.dateString = `${this.year}-${this.month + 1 < 10 ? '0' + (this.month + 1) : this.month + 1
        }-${this.day < 10 ? '0' + this.day : this.day}`
      dateString = this.dateString
      this.calendar();
      if (this.yearMode) {
        this.getYearList();
      }
      this.dateContent = 'loading...'
      try {
        const item = await this.getDayCache(dateString)
        this.dateContent = item.content
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
          if (this.markList.find(v => v == `${i}${dateString.slice(4)}`)) {
            const item = await this.getDayCache(`${i}${dateString.slice(4)}`)
            if (this.dateString == dateString) {
              this.history.push({
                date: `${i}${dateString.slice(4)}`,
                content: item.content
              })
            }
          }
        } catch (error) {
        }
      }
      this.search('money')
    },
    prev(type) {
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
      this.search('money', type)
    },
    next(type) {
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
      this.search('money', type)
    },
    getYearList() {
      this.yearList = []
      for (let i = 0; i < 12; i++) {
        let year = this.date.getFullYear()
        let month = i // 取当前月，此数字是实际月份减一
        let day = this.date.getDate()

        // query month event list
        let firstDay =
          (new Date(year, month, 1).getDay() == 0
            ? 7
            : new Date(year, month, 1).getDay()) - 1 // 本月第一天是星期几
        let monthDayLength = new Date(year, month + 1, -1).getDate() + 1 // 本月一共有几天
        let itemList = []
        for (let i = 0; i < firstDay; i++) {
          itemList.push({
            value: 0,
            events: [],
            key: i
          })
        }
        for (let j = 1; j <= monthDayLength; j++) {
          const dateString = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1
            }-${j < 10 ? '0' + j : j}`
          const markDate = this.events.find((v) => v.dateString == dateString)
          itemList.push({
            isWeekend: new Date(dateString).getDay() == 6 || new Date(dateString).getDay() == 0,
            value: j,
            actived:
              year == new Date().getFullYear() &&
              month == new Date().getMonth() &&
              j == new Date().getDate(),
            dateString,
            key: dateString,
            selected: this.dateString == dateString,
            marked: this.markList.findIndex(v => v.indexOf(dateString) > -1) > -1,
            desc: markDate ? markDate.desc : '',
            sported: this.sportList.findIndex(v => v.date == dateString) > -1,
            events: this.events.filter((v) => v.dateString == dateString)
          })
        }
        this.yearList[i] = itemList
      }
    },
    async calendar() {
      this.year = this.date.getFullYear()
      this.month = this.date.getMonth() // 取当前月，此数字是实际月份减一
      this.day = this.date.getDate()

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
          sported: this.sportList.findIndex(v => v.date == dateString) > -1,
          events: this.events.filter((v) => v.dateString == dateString)
        })
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
  }
}

class DB {
  /* 
  {
          dbName: "test",   //数据库名称
          objName: "test1",  // 表名称
          param: { a: 1 },   // id值
          response: {        // 存储的value
            b: 2,
          },
  }
  */
  constructor() {
    this.db = null;
  }
  getType(val) {
    let type = typeof val == "object";
    return type;
  }
  // 打开数据库
  open(parm) {
    if (this.db) {
      return this.db;
    }
    return new Promise((res, rej) => {
      let request = window.indexedDB.open(parm.dbName, parm.versions);
      request.onerror = function (event) {
        console.log(event);
        // 错误处理
        rej();
      };
      request.onsuccess = event => {
        this.db = request.result;
        res();
        // 成功处理
      };
      // 数据库更新时的回调
      request.onupgradeneeded = event => {
        this.db = event.target.result;
        this.createdDB(parm);
      };
    });
  }
  // 创建库表
  createdDB(parm) {
    if (!this.db.objectStoreNames.contains(parm.objName)) {
      this.db.createObjectStore(parm.objName, {
        keyPath: "id"
      });
      // objectStore.createIndex("data", "data", { unique: false });
      // unique name可能会重复
    }
  }
  // 新增（不需要使用）
  async add(parm = { dbName, objName, param, response }) {
    await this.open(parm);
    // await this.upgrade(dbName);
    return new Promise((res, rej) => {
      let transaction = this.db.transaction([parm.objName], "readwrite");
      let objectStore = transaction.objectStore(parm.objName);

      // 用户读取数据，参数是主键
      let request = objectStore.add({
        id: JSON.stringify(parm.param),
        data: JSON.stringify(parm.response)
      });
      console.log(request);

      request.onsuccess = function (event) {
        res(event);
        console.log("数据写入成功");
      };

      request.onerror = function (event) {
        rej();
        console.log("数据写入失败");
      };
    });
  }
  // 读取库表数据
  async read(parm = { dbName, objName, param, response }) {
    await this.open(parm);

    return new Promise((res, rej) => {
      let type = this.getType(parm.param);

      var transaction = this.db.transaction([parm.objName]);
      var objectStore = transaction.objectStore(parm.objName);
      // 用户读取数据，参数是主键
      var request = objectStore.get(
        type ? JSON.stringify(parm.param) : parm.param
      );

      request.onerror = function (event) {
        console.log("事务失败");
        rej();
      };

      request.onsuccess = function (event) {
        if (request.result) {
          let data = (request.result.data);
          res(data);
        } else {
          res(request.result);
          console.log("未获得数据记录");
        }
      };
    });
  }
  // 修改库表数据,但是因为创建数据库时直接创建了库表,所以无论是添加还是修改都掉这个就可以了.
  async update(parm = { dbName, objName, param, response }) {
    await this.open(parm);

    return new Promise((res, rej) => {
      let type = this.getType(parm.param);
      var request = this.db
        .transaction([parm.objName], "readwrite")
        .objectStore(parm.objName)
        .put({
          id: type ? JSON.stringify(parm.param) : parm.param,
          data: type ? JSON.stringify(parm.response) : parm.response
        });

      request.onsuccess = function (event) {
        res();
        console.log("数据更新成功");
      };

      request.onerror = function (event) {
        rej();
        console.log("数据更新失败");
      };
    });
  }
  // 删除某个表的数据
  async remove(parm = { dbName, objName, param, response }) {
    await this.open(parm);

    return new Promise((res, rej) => {
      let type = this.getType(parm.param);

      var request = this.db
        .transaction([parm.objName], "readwrite")
        .objectStore(parm.objName)
        .delete(type ? JSON.stringify(parm.param) : parm.param);

      request.onsuccess = function (event) {
        res();
        console.log("数据删除成功");
      };
    });
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
<style lang="postcss">
.typed-out {
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
  padding: 20px;
  width: 100%;
  height: 100%;
  background: #fff;
}

.update-btn {
  font-size: 32px;
  font-weight: bold;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  background: transparent;
  margin: auto;
  border: none;
  border-radius: 100px;
}

.date-content {
  border: 1px solid #c0c0c0;
  outline: none;
  font-size: 14px;
  line-height: 1.5em;
  font-weight: normal;
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

    text-align: center;
    margin: 10px 0;

    span {
      font-weight: bold;
    }

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
    font-size: 12px;
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