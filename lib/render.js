var system = require('system')
var args = system.args

if (args.length == 1) {
  system.stderr.write("An URL needs to be specified as an argument.")
  phantom.exit(1)
}

var page = require('webpage').create()
var url = args[1]
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

var checkTick = 100
var numChecked = 0
// Fails if total check exceeds this count.
var totalCheckThreshold = 200

// Checks if PDF is ready for rendering by checking
// existence of an element with ID specified with readyID arg.
function checkReady() {
  var isReady = page.evaluate(function() {
    return !!document.getElementById('pdfReady')
  })
  if (isReady) {
    if (jsError) {
      phantom.exit(1)
    } else {
      system.stdout.write(page.content)
      phantom.exit()
    }
  } else {
    numChecked++
    if (numChecked < totalCheckThreshold) {
      window.setTimeout(function () {
        checkReady()
      }, checkTick)
    } else {
      system.stderr.write('Could not find a html element with id "pdfReady" for long time.')
      phantom.exit(1)
    }
  }
}

page.open(url, function(status) {
  if (status == 'fail') {
    phantom.exit(1)
  } else {
    checkReady()
  }
})
