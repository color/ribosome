var path = require('path')
var tmp = require('tmp')
var html = require('./html.js')
var pdf = require('./pdf.js')

module.exports = ribosome = {}

// Setup graceful cleanup in case of exceptions.
tmp.setGracefulCleanup()

ribosome.translate = function(url, success, error, license) {
  tmp.dir({ unsafeCleanup: true }, function(err, dirPath, cleanupCallback) {
    if (err) {
      error(err)
    } else {
      var htmlPath = path.join(dirPath, "tmp.html")
      var pdfPath = path.join(dirPath, "tmp.pdf")
      html.save(url, htmlPath, function() {
        pdf.generate(htmlPath, pdfPath, function(pdfContent) {
          success(pdfContent)
          cleanupCallback()
        }, function(err) {
          error(err)
        }, license)
      }, function(err) {
        error(err)
      })
    }
  })
}
