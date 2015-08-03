var system = require('system')
var args = system.args

if (args.length == 1) {
  system.stderr.write("An URL needs to be specified as an argument.")
  phantom.exit(1)
}

var page = require('webpage').create()
var url = args[1]

page.open(url, function(status) {
  if (status == 'fail') {
    phantom.exit(1)
  } else {
    window.setTimeout(function () {
      system.stdout.write(page.content)
      phantom.exit()
    }, 5000)
  }
})
