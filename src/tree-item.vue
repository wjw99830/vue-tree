

<script>
export default {
  render(h) {
    const vm = this
    const children = []
    //  组件上的onNodeSelect用到了this 不能绑定到原生element上使用 需要用vm指向组件实例↓
    const onNodeSelect = () => {
      vm.selectedNode !== vm.node && !vm.selectedNodes.includes(vm.node) ? vm.$emit('select', vm.node) : vm.$emit('unselect', vm.node)
    }
    if (vm.node.children && vm.node.children.length > 0) {
      children[0] = h('div', {
        on: { click: vm.toggleSubtree },
        class: { 'w-tree-branch': true }
      }, [ h('i', { class: { 'fa': true, 'fa-angle-double-right': !vm.subtreeDisplayed, 'fa-angle-double-down': vm.subtreeDisplayed } }), vm.$scopedSlots.default({ node: vm.node }) ])
      children[1] = h(vm.$options.components.tyTree, {
        style: { display: vm.subtreeDisplayed ? null : 'none' },
        props: {
          model: vm.node.children,
          selectedNode: vm.selectedNode,
          selectedNodes: vm.selectedNodes
        },
        on: {
          select: vm.onNodeSelect,
          unselect: vm.onNodeSelect
        },
        scopedSlots: {
          default: vm.$scopedSlots.default
        }
      })
    } else {
      children[0] = h('div', {
        on: { click: onNodeSelect },
        class: { 
          'w-tree-leaf': true,
          'w-theme': vm.selectedNode === vm.node || vm.selectedNodes.includes(vm.node),
          'w-tree-leaf-selected': vm.selectedNode === vm.node || vm.selectedNodes.includes(vm.node)
        },
      }, [ vm.$scopedSlots.default({ node: vm.node }) ])
    }
    return h('div', {
      class: { 'w-tree-node': true }
    }, children)
  },
  name: 'w-tree-item',
  props: {
    node: { type: [Object, Array, String] },
    selectedNode: { type: [Object, Array, String] },
    selectedNodes: { type: Array }
  },
  data() {
    return { subtreeDisplayed: true }
  },
  methods: {
    toggleSubtree() {
      this.subtreeDisplayed = !this.subtreeDisplayed
    },
    onNodeSelect(node) {
      this.selectedNode !== node && !this.selectedNodes.includes(node) ? this.$emit('select', node) : this.$emit('unselect', node)
    }
  },
  components: { 
    tyTree: () => import('./tree.vue')
  }
}
</script>

<style>
.w-tree-branch {
  height: 1.5rem;
}
.w-tree-branch i {
  font-size: 1.3rem;
  margin-right: 5px;
  vertical-align: top;
}
.w-tree-leaf {
  height: 1.5rem;
  line-height: calc(1.5rem - 4px);
  display: inline-block;
  padding: 2px 5px;
  border: 1px solid transparent;
}
.w-tree-leaf.w-tree-leaf-selected {
  border-color: #97c9dd;
}
.w-tree-leaf,
.w-tree-branch {
  cursor: pointer;
  border-radius: 5px;
  padding: 0 5px;
}
</style>
