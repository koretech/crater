import fs from 'fs'
import path from 'path'

const root = path.join(__dirname, '..')
const semanticUiLess = path.join(root, 'node_modules/semantic-ui-less')

// relocate default config
fs.writeFileSync(
  path.resolve(semanticUiLess, 'theme.config'),
  "@import '../../src/styles/semantic/theme.config';\n",
  'utf8'
)

// fix well known bug with default distribution
fixFontPath(path.resolve(semanticUiLess, 'themes/default/globals/site.variables'))
fixFontPath(path.resolve(semanticUiLess, 'themes/flat/globals/site.variables'))
fixFontPath(path.resolve(semanticUiLess, 'themes/material/globals/site.variables'))

function fixFontPath(filename) {
  var content = fs.readFileSync(filename, 'utf8')
  var newContent = content.replace(
    "@fontPath  : '../../themes/",
    "@fontPath  : '../../../themes/"
  )
  fs.writeFileSync(filename, newContent, 'utf8')
}
