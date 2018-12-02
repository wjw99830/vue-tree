export const hasLeaf = (tree) => {
  const stack = [tree]
  let flag = false
  while(stack.length > 0) {
    const target = stack.pop()
    target.forEach((i) => {
      if (Array.isArray(i.children)) {
        stack.push(i.children)
      } else {
        flag = true
      }
    })
  }
  return flag
}