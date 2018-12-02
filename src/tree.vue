<script>
import { hasLeaf } from './util'
export default {
  render(h) {
    const vm = this
    return h('div', { 
      class: {
        'w-ul': true,
        'w-tree': true
      }
    }, vm.model.map((node, index) => !node.children || hasLeaf(node.children) ? h(vm.$options.components.tyTreeItem, {
      props: {
        key: index,
        node,
        selectedNode: vm.selectedNode,
        selectedNodes: vm.selectedNodes,
        allowUnselect: vm.allowUnselect
      },
      on: {
        select: vm.onNodeSelect,
        unselect: vm.onNodeUnselect
      },
      scopedSlots: {
        default: vm.$scopedSlots.default
      }
    }) : null))
  },
  components: {
    tyTreeItem: () => import('./tree-item.vue')
  },
  props: {
    model: {
      type: Array,
      default: () => []
    },
    selectedNode: {
      default: null
    },
    selectedNodes: {
      type: Array,
      default: () => []
    },
    allowUnselect: { type: Boolean, default: false },
    multiSelect: { type: Boolean, default: false }
  },
  methods: {
    onNodeSelect(node) {
      this.multiSelect ? this.$emit('update:selectedNodes', this.selectedNodes.concat(node)) : this.$emit('update:selectedNode', node)
      this.$emit('select', node)
    },
    onNodeUnselect(node) {
      if (!this.allowUnselect) return
      this.multiSelect ? 
        this.$emit('update:selectedNodes', this.selectedNodes.filter(old => old !== node))
        :
        this.$emit('update:selectedNode', node)
      this.$emit('unselect', node)
    }
  }
}

</script>

<style>
.w-tree .w-tree {
  padding-left: 1.5rem;
  height: calc(100% - 1.5rem);
}
.w-tree .w-tree:hover {
  height: 50%;
}
</style>
