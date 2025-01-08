// ==UserScript==
// @name         awesomerank++
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  awesomerank with actual ranked/sorted stuff...
// @author       You
// @match        https://awesomerank.github.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=awesomerank.github.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  // Get all the existing lists
  const existingLists = document.querySelectorAll('ul');

  // Initialize an array to hold all the list items
  let allListItems = [];

  // Loop through each existing list
  existingLists.forEach(list => {
    const listItems = list.querySelectorAll('li');

    // Loop through each list item and extract the star ratings
    listItems.forEach(item => {
      const starLinks = item.querySelectorAll('a[href^="http"]');
      let stars = 0;

      starLinks.forEach(starLink => {
        const starsMatch = starLink.textContent.match(/★(\d+)/);
        const starRating = starsMatch ? parseInt(starsMatch[1]) : 0;
        stars = Math.max(stars, starRating); // Capture the highest star rating among all links
      });

      allListItems.push({ item, stars });
    });
  });

  // Sort the list items by star ratings in descending order
  allListItems.sort((a, b) => b.stars - a.stars);

  // Create a new list with the sorted items
  const sortedList = document.createElement('ul');
  sortedList.id = 'resultList';
  allListItems.forEach(({ item }) => {
    const clonedItem = item.cloneNode(true);
    const listItem = document.createElement('li');
    listItem.appendChild(clonedItem);
    sortedList.appendChild(listItem);
  });

  // Prepend the sorted list to the body
  const firstElement = document.body.firstChild;
  document.body.insertBefore(sortedList, firstElement);
})();
