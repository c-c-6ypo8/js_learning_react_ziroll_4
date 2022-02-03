const loadDataFromLS = (storageName) => {
  return storageName ? JSON.parse(localStorage.getItem(storageName)) : {}
}

const saveDataToLS = (storageName, data) => {
  localStorage.setItem(storageName, JSON.stringify(data))
}

export { saveDataToLS, loadDataFromLS }
