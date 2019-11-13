import QuarterSelect from './src/components/quarterSelect'
import _Vue from 'vue'
// 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
// 使用 window.Vue.component('yyl-npm-practice', Main) 的时候 外部引用的时候 有可能会覆盖该组件，导致组件无法正常使用；
// 使用下面的的定义方式后， 在.vue 环境下 使用方式不变， 在只引用 ys-expression.js 环境下 需在 new Vue（） 之前加 window['ys-expression'].default.install();
// if(typeof window !== "undefined" && window.Vue){
//   window.Vue.compontent('npm-test', QuarterSelect)
// }
//这样就可以使用Vue.use进行全局安装了。
QuarterSelect.install = Vue =>{
  if(!Vue){
    window.Vue = Vue = _Vue
  }
  Vue.component(QuarterSelect.name, Main)
}
export default QuarterSelect
