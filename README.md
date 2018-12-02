# vue-treeview
Treeview for Vue 2.3.0+
# Install
> npm i vue-w-tree
# Example
(```)<w-tree
  :model="treeModel"
  allowUnselect
  multiSelect
  :selected-nodes.sync="mySelectedNodes"
  @select="currentSelected = $event"
  @unselect="log('unselected a node')">
  <span scoped-slot="{ node }">{{ node.name }}</span>
</w-tree>(```)
# APIs
+ Props:
   * `model: Array<Node> = []`: your data that expected to display a tree; **Note that a branch data must has a filed named children typeof `Array<Node>` like `{ name: 'myBranch', children: [node1, node2] }`**
   * `multiSelect: Boolean = false`: Toggle that select nodes multiply;
   * `allowUnselect: Boolean = false`: Toggle that unselect operation;
   * `selected-node: Node = null`: Bind that your selected node data. That's means if you select a node like `{ name: "I'm a node" }`, the    selected-node will keep the same reference of the node, Please use it with `.sync` like `:selected-node.sync="mySelectedNode"`;
   * `selected-nodes: Array<Node> = []`: It's similar to `selected-node`.Don't forget `.sync`;
+ Events:
   * `select(node: Node): void`: a function accept the selection;
   * `unselect(node: Node): void`: a function accept the unselective node;
+ Util:
   * `hasLeaf(tree: Array<Node>): Boolean`: you can use it via `import { hasLeaf } from 'vue-w-tree'` to check whether a tree has leaf(if    it may has only branches);
