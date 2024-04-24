export const traverse = (dynamicId, temp) => {
  while (dynamicId.length) {
    let index = dynamicId.pop();
    if (!dynamicId.length) {
      dynamicId.push(index);
      return Array.isArray(temp) ? temp : temp.child;
    } else {
      temp = temp.child ? temp.child[index] : temp[index];
    }
  }
  return null;
};
