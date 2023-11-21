// load all urls from redirect.yaml
const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

const redirectsFile = fs.readFileSync(path.join(__dirname, 'redirects.yaml'), 'utf8')
const redirects = YAML.parse(redirectsFile)
console.log(redirects)

// generate html page for each redirect url from redirects.yaml
const templateHTML = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
console.log(templateHTML)

// loop through each redirect url and generate html page
for(let [slug, url] of Object.entries(redirects)) {
  const html = templateHTML.replaceAll('https://example.com', url)

  // create folder if not exist for each slug
  const folderPath = path.join(__dirname, 'out', slug)
  fs.mkdirSync(folderPath, {recursive: true})

  // write html file to folder
  fs.writeFileSync(path.join(folderPath, 'index.html'), html)
  
}

