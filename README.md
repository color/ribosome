# Ribosome

A simple library that can generate PDF from web assets located at a given URL.

The PDF generator waits until the loading page inserts a html element with ID "pdfReady".

## Getting Started

### How to install

```
npm install ribosome
```

### Usage

```js
var ribosome = require('ribosome')
var url = 'https://google.com'

ribosome.translate(url, function(pdf) {
  console.log(pdf)
}, function(err) {
  console.error(err)
})
```
