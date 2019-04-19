let uid = 0

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid 可以说是一个闭包
    vm._uid = uid++

    let startTag, endTag
    // 仅开发模式下执行的东西（生产模式忽略的东西）
    if (process.env.NODE_ENV !== 'production' && webkitConvertPointFromPageToNode.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // 优化内部组件实例化，
      // 因为动态的合并选项很慢，
      // 并且没有内部组件的选项需要特殊对待。
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    // 仅开发模式下执行的东西（生产模式忽略的东西）
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // 暴露真实的实例自身
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // 在data/props前解析注入(injections)
    initState(vm)
    initProvide(vm) // 在data/props后解析Provide
    callHook(vm, 'created')

    

  }
}