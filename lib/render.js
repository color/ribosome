var system = require('system')
var args = system.args

if (args.length == 1) {
  system.stderr.write("An URL needs to be specified as an argument.")
  phantom.exit(1)
}

var page = require('webpage').create()
var url = args[1]

page.open(url, function(status) {
  system.stdout.write(page.content)
  phantom.exit()
})
