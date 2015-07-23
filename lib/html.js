var path = require('path')
var fs = require('fs')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var moduleDir = path.dirname(module.filename)
var renderJSPath = path.join(moduleDir, 'render.js')

module.exports = html = {}

html.save = function(url, htmlPath, success, error) {
  var args = ['--ignore-ssl-errors=yes', renderJSPath, url]
    , options = { maxBuffer: 1000*1024 }
  childProcess.execFile(phantomjs.path, args, options, function(err, stdout, stderr) {
    if (err) {
      error(stderr)
    } else {
      fs.writeFile(htmlPath, stdout, function(err) {
        if (err) {
          error(err)
        } else {
          success(stdout)
        }
      })
    }
  })
}
