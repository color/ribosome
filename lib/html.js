var path = require('path')
var fs = require('fs')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var moduleDir = path.dirname(module.filename)
var renderJSPath = path.join(moduleDir, 'render.js')

module.exports = html = {}

html.save = function(url, htmlPath, success, error) {
  var args = ['--ignore-ssl-errors=yes', renderJSPath, url]
    , options = { maxBuffer: 10000*1024 }
  childProcess.execFile(phantomjs.path, args, options, function(phantomErr, stdout, stderr) {
    if (phantomErr || stderr) {
      error(phantomErr || stderr)
    } else {
      fs.writeFile(htmlPath, stdout, function(fileWriteErr) {
        if (fileWriteErr) {
          error(fileWriteErr)
        } else {
          success(stdout)
        }
      })
    }
  })
}
