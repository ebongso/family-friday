'use strict';

let createLi = (text) => {
  let li = document.createElement('li');
  li.appendChild(document.createTextNode(text));
  return li;
};