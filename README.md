# GIP

Gradient Image Placeholders

## Purpose

Generate background CSS for an image to show something while the image is yet to load.

Writeup: https://calendar.perfplanet.com/2018/gradient-image-placeholders/

## Try it out

https://tools.w3clubs.com/gip/


## CLI

```
npm i -g cssgip
gip test.png
# background: #3f8cc4; background: linear-gradient(to bottom, #0f7ad2 0%, #b0adbe 100%)
```

## Usage

```
const gip = require('cssgip');
const result = await gip('./image.jpg');
```

The `result` is an object with three properties like:

```
css: "background: #ab9f92; background: linear-gradient(135deg, #cbc6c2 0%, #5d5347 100%)"
background: "#ab9f92"
gradient: "linear-gradient(135deg, #cbc6c2 0%, #5d5347 100%)"
```


