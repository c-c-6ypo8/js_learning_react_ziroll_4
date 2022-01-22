/* Moves element to new position inside the array. Returns modified copy of
  the initial array */
const moveArrayElement = (initialArray, fromIndex, toIndex) => {
  let newArray = [...initialArray]
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}

export { moveArrayElement }
