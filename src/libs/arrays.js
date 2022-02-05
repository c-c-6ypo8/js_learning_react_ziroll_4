/* Moves element to new position inside the array. Returns modified copy of
  the initial array */
const moveArrayElement = (initialArray, fromIndex, toIndex) => {
  let newArray = [...initialArray]
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export { moveArrayElement, shuffleArray }
