var system = require('system')
var args = system.args

if (args.length == 1) {
  system.stderr.write("An URL needs to be specified as an argument.")
  phantom.exit(1)
}

var page = require('webpage').create()
var url = args[1]
var page_render_timeout = 5000
var jsError = false

// Catches JS errors
page.onError = function(msg, trace) {
  jsError = true

  var msgStack = ['ERROR: ' + msg]

  if (trace && trace.length) {
    msgStack.push('TRACE:')
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''))
    })
  }

  system.stderr.write(msgStack.join('\n'))
}

page.open(url, function(status) {
  if (status == 'fail') {
    phantom.exit(1)
  } else {
    window.setTimeout(function () {
      if (jsError) {
        phantom.exit(1)
      } else {
        system.stdout.write(page.content)
        phantom.exit()
      }
    }, page_render_timeout)
  }
})
