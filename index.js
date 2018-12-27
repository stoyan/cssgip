'use strict';

const getColorPalette = require('image-palette');
const getPixels = require('image-pixels');
const getSize = require('image-size');

const PALETTESIZE = 4;

module.exports = async (file) => {
  const {width, height} = await getSize(file);
  const pix = await getPixels(file); // required for some unknown reason
  const tl = getColorPalette(await getPixels(file, {clip: [0, 0, width / 2, height / 2]}), PALETTESIZE).colors[0];
  const tr = getColorPalette(await getPixels(file, {clip: [width/2, 0, width/2, height/2]}), PALETTESIZE).colors[0];
  const bl = getColorPalette(await getPixels(file, {clip: [0, height/2, width/2, height/2]}), PALETTESIZE).colors[0];
  const br = getColorPalette(await getPixels(file, {clip: {x: width/2, y: height/2, width: width/2, height: height/2}}), PALETTESIZE).colors[0];
  const palette = getColorPalette(await getPixels(file, {clip: [0, 0, width, height]}), PALETTESIZE).colors[0];

  const distances = [
    getDistance(tl, bl),
    getDistance(tl, tr),
    getDistance(tl, br),
    getDistance(bl, tr),
    getDistance(tr, br),
    getDistance(bl, br),
  ];

  const colors = [
    [tl, bl],
    [tl, tr],
    [tl, br],
    [bl, tr],
    [tr, br],
    [bl, br],
  ];

  const directions = [
    'to bottom',
    'to right',
    '135deg',
    '45deg',
    'to bottom',
    'to right',
  ];

  const furthest = Math.max.apply(null, distances);
  const idx = distances.findIndex((el, idx) => el === furthest);
  
  const background = toHex(palette);
  const gradient = `linear-gradient(${directions[idx]}, ${toHex(colors[idx][0])} 0%, ${toHex(colors[idx][1])} 100%)`;
  const css = `background: ${background}; background: ${gradient}`;
  return {
    css,
    background,
    gradient,
  };
}

function toHex(rgb) {
  let r = Number(rgb[0]).toString(16);
  let g = Number(rgb[1]).toString(16);
  let b = Number(rgb[2]).toString(16);
  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;
  return '#' + r + g + b;
}

function getDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb2[0] - rgb1[0], 2),
    Math.pow(rgb2[1] - rgb1[1], 2),
    Math.pow(rgb2[2] - rgb1[2], 2),
  );
}