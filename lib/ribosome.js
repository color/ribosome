var path = require('path')
var tmp = require('tmp')
var html = require('./html.js')
var pdf = require('./pdf.js')

module.exports = ribosome = {}

ribosome.translate = function(url, success, error) {
  tmp.dir(function(err, dirPath) {
    if (err) {
      error(err)
    } else {
      var htmlPath = path.join(dirPath, "tmp.html")
      var pdfPath = path.join(dirPath, "tmp.pdf")
      html.save(url, htmlPath, function() {
        pdf.generate(htmlPath, pdfPath, function(pdfContent) {
          success(pdfContent)
        }, function(err) {
          error(err)
        })
      }, function(err) {
        error(err)
      })
    }
  })
}
