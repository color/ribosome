module.exports = pdf = {}

var fs = require('fs')
var Prince = require("prince")

pdf.generate = function(htmlPath, pdfPath, success, error, license) {
  var prince = Prince()
  if (license) {
    prince = prince.license(license)
  }
  prince
    .inputs(htmlPath)
    .output(pdfPath)
    .execute()
    .then(function() {
      fs.readFile(pdfPath, function(err, pdfContent) {
        if (err) {
          error(err)
        } else {
          success(pdfContent)
        }
      })
    }, function(err) {
      error(err)
    })
}
