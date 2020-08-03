<!--
父组件用 v-model绑定值
v-model 传参格式 2010-1 表示2010年第1季度
change  当值发生变化时触发
-->
<style scoped lang="scss">
.v-quarter-select {
  position: relative;
}
.quarter-select-input {
  line-height: 30px;
  border: 1px solid #dcdfe6;
  padding-left: 32px;
  padding-right: 20px;
  border-radius: 4px;
  color: #606266;
  cursor: pointer;
  outline: 0;
}
.iconbiaoge {
  position: absolute;
  top: 8px;
  left: 10px;
}
.iconshibai {
  display: none;
  position: absolute;
  top: 9px;
  right: 5px;
  color: #d4d4d4;
  font-size: 14px;
  cursor: pointer;
}
.quarter-select-input:focus {
  border-color: #409eff;
}
.quarter-select-input::-webkit-input-placeholder {
  color: #c0c4cc;
}
.quarter-select-input::-moz-placeholder {
  color: #c0c4cc;
}
.quarter-select-input::-ms-input-placeholder {
  color: #c0c4cc;
}
.v-quarter-select:hover .iconshibai {
  display: block;
}
/*下拉选择框*/
.select-picker {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  width: 380px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  background: #fff;
  z-index: 999;
}
.select-arrow {
  position: absolute;
  top: -6px;
  left: 15px;
  display: block;
  width: 8px;
  height: 8px;
  background: #fff;
  border-top: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.select-year {
  border-bottom: 1px solid #d4d4d4;
  position: relative;
  line-height: 40px;
  text-align: center;
  .iconfont {
    display: inline-block;
  }
  span {
    cursor: pointer;
  }
  .year-pre {
    position: absolute;
    top: 0;
    left: 20px;
  }
  .year-next {
    position: absolute;
    right: 20px;
    top: 0;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
.select-quarter {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  .quarter-item {
    width: 25%;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  .quarter-item:hover {
    color: #0bb894;
  }
  .current-quarter {
    color: #0bb894;
    font-weight: bold;
  }
}
</style>
<template>
  <div class="v-quarter-select">
    <i class="iconfont iconbiaoge"></i>
    <input
      class="quarter-select-input"
      :placeholder="placeholder"
      :value="inputValue"
      @change="valueChangeFun"
      @input="value => userInput = value"
      @click.stop="selectShowFun"
    />
    <i class="iconfont iconshibai" @click="clearValueFun"></i>
    <div class="select-picker" v-show="selectShow" @click.stop>
      <i class="select-arrow"></i>
      <!--具体季度的选择-->
      <div class="select-year" v-show="!yearShow">
        <span class="year-pre iconfont iconjiantou" @click="yearPreFun"></span>
        <span @click="yearSelectFun">{{year}}</span>
        <span class="year-next iconfont iconjiantou" @click="yearNextFun"></span>
      </div>
      <div class="select-quarter" v-show="!yearShow">
        <p
          :class="['quarter-item', currentYear == year &&  quarterNum == item ? 'current-quarter': '']"
          @click="selectedQuarterFun(item)"
          v-for="item in 4"
          :key="item"
        >第&nbsp;&nbsp;{{item}}&nbsp;&nbsp;季度</p>
        <!--<p :class="['quarter-item', quarter.getFullYear() == year &&  quarterNum == 2 ? 'current-quarter': '']" @click="selectedQuarterFun(1)">第&nbsp;&nbsp;2&nbsp;&nbsp;季度</p>-->
        <!--<p :class="['quarter-item', quarter.getFullYear() == year &&  quarterNum == 3 ? 'current-quarter': '']">第&nbsp;&nbsp;3&nbsp;&nbsp;季度</p>-->
        <!--<p :class="['quarter-item', quarter.getFullYear() == year &&  quarterNum == 4 ? 'current-quarter': '']">第&nbsp;&nbsp;4&nbsp;&nbsp;季度</p>-->
      </div>
      <!--年份的选择-->
      <div class="select-year" v-show="yearShow">
        <span class="year-pre iconfont iconjiantou" @click="yearRangePreFun"></span>
        <span>{{yearRange}}</span>
        <span class="year-next iconfont iconjiantou" @click="yearRangeNextFun"></span>
      </div>
      <div class="select-quarter" v-show="yearShow">
        <p
          :class="['quarter-item', currentYear == item ? 'current-quarter': '']"
          v-for="item in yearRangeList"
          :key="item"
          @click="selectedYearFun(item)"
        >{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cyx-quarterSelect",
  props: {
    value: {
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    format: {
      type: String,
      default: "yyyy年-第q季度"
    }
  },
  data () {
    return {
      inputValue: '',
      selectShow: false,
      year: new Date().getFullYear(),
      currentYear: new Date().getFullYear(),
      quarterNum: parseInt(new Date().getMonth() / 3) + 1,
      yearShow: false,
      yearRange: "",
      yearRangeList: []
    };
  },
  computed: {
    quarterFormat () {
      let quarter = "";
      if (this.value) {
        this.year = this.value.split("-")[0];
        this.currentYear = this.value.split("-")[0];
        this.quarterNum = this.value.split("-")[1];
      } else {
        this.year = new Date().getFullYear();
        this.currentYear = new Date().getFullYear();
        this.quarterNum = parseInt(new Date().getMonth() / 3) + 1;
        return null
      }
      let format = this.format;
      if (format.indexOf("yyyy") != -1) {
        format = format.replace(/yyyy/, this.currentYear.toString());
      }
      if (format.indexOf("q") != -1) {
        format = format.replace(/q/, this.quarterNum.toString());
      }
      return format;
    }
  },
  model: {
    prop: "value", //绑定的值，通过父组件传递
    event: "update" //自定义时间名
  },
  monted () {
    // 如果是内部
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))) return;
    // 外部
    if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  },
  methods: {
    selectShowFun (e) {
      this.selectShow = true;
    },
    selectHidenFun () {
      this.selectShow = false;
    },
    // 清除值
    clearValueFun () {
      this.inputValue = null
      this.valueChangeFun()
    },

    // 上一年
    yearPreFun () {
      this.year--;
    },
    // 下一年
    yearNextFun () {
      this.year++;
    },
    // 选择季度
    selectedQuarterFun (item) {
      this.currentYear = this.year;
      this.quarterNum = item;
      this.inputValue = this.format.replace(/yyyy/, this.currentYear).replace(/q/, this.quarterNum)
      this.valueChangeFun()
      this.selectShow = false;
    },
    // 值修改
    valueChangeFun () {
      let str = this.format.replace(/yyyy/, '^[0-9]{4}').replace(/q/, '[1-4]') + '$'
      let newReg = new RegExp(str)
      if (this.inputValue === null) {
        this.$emit("change", null);
        this.$emit("update", null);
      } else if (newReg.test(this.inputValue)) {
        this.$emit("change", this.currentYear + "-" + this.quarterNum);
        this.$emit("update", this.currentYear + "-" + this.quarterNum);
      } else {
        console.error('填写格式错误')
      }
    },
    // 选择年份 展示年份范围
    yearSelectFun () {
      this.yearRange = this.year - 11 + "-" + this.year;
      this.yearRangeList = [];
      for (let i = 0; i < 12; i++) {
        this.yearRangeList.push(this.year - 11 + i);
      }
      this.yearShow = true;
    },
    // 前一个年份范围
    yearRangePreFun () {
      let yearArr = this.yearRange.split("-");
      this.yearRange =
        (parseInt(yearArr[0]) - 12).toString() +
        "-" +
        (parseInt(yearArr[1]) - 12).toString();
      this.yearRangeList = [];
      for (let i = 0; i < 12; i++) {
        this.yearRangeList.push(parseInt(yearArr[0]) - 12 + i);
      }
    },
    // 下一个年份范围
    yearRangeNextFun () {
      let yearArr = this.yearRange.split("-");
      this.yearRange =
        (parseInt(yearArr[0]) + 12).toString() +
        "-" +
        (parseInt(yearArr[1]) + 12).toString();
      this.yearRangeList = [];
      for (let i = 0; i < 12; i++) {
        this.yearRangeList.push(parseInt(yearArr[0]) + 12 + i);
      }
    },
    // 选择某一年
    selectedYearFun (year) {
      this.year = year;
      this.yearShow = false;
    }
  },
  destroyed () {
    // window.removeEventListener("click", this.selectHidenFun);
  },
  watch: {
    value: {
      handler (newValue) {
        if (newValue) {
          this.year = newValue.split("-")[0];
          this.currentYear = newValue.split("-")[0];
          this.quarterNum = newValue.split("-")[1];
          let format = this.format;
          if (format.indexOf("yyyy") != -1) {
            format = format.replace(/yyyy/, this.currentYear.toString());
          }
          if (format.indexOf("q") != -1) {
            format = format.replace(/q/, this.quarterNum.toString());
          }
          this.inputValue = format
        }
      }
    }
  }
};
</script>
