/**
 * This one is injected to content iframe.
 * It reads the data-interaction-x attributes enable the links from one view to another.
 * TODO: Let webpack / Babel transpile this file.
 * Issue: PROFI-37
 */

(function() {
  'use strict';

  addClickEvents();

  function addClickEvents() {
    const interactionElements = document.querySelectorAll(
      '[data-interaction-target-view]'
    );
    [...interactionElements].forEach(element => {
      element.addEventListener('click', handleClick);
    });
  }

  function getCurrentPath() {
    // return parent.document.location.hash;
    return parent.document.location.pathname;
  }

  function setNewLocation(path) {
    parent.document.location.pathname = path;
    // parent.window.history.pushState('', '', path);
    // parent.location.hash = path;
  }

  function handleClick(event) {
    event.preventDefault();

    const targetView = event.target.dataset.interactionTargetView;
    setNewLocation(getCurrentPath().replace(/view\/\d+/, `view/${targetView}`));
  }
})();
