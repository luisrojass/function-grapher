export const readJSON = async (file) => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result)
        resolve(json)
      } catch (err) {
        reject(err)
      }
    }
    reader.readAsText(file)
  })
}
