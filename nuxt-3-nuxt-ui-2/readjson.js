const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'firebase/serviceAccount.json')

try {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const jsonData = JSON.parse(fileContent)
  const result = JSON.stringify(jsonData)
  console.log(result)
}
catch (error) {
  console.error('Error reading or parsing the JSON file:', error.message)
}
