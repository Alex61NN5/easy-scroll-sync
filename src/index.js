let scrollElements = [];

reset = () => {
  // remove all the old event listeners
  scrollElements.forEach(x => {
    x.element.removeEventListener('scroll', () => {});
  });
  // empty scrollElements
  scrollElements = [];
};

createScrollListeners = () => {
  // remove window / document event listeners
  window.removeEventListener('load', () => {});
  document.removeEventListener('DOMContentLoaded', () => {});

  reset();
  Array.prototype.forEach.call(document.querySelectorAll('[data-scrollsync]'), (element, index) => {
    scrollElements.push({
      element: element,
      id: index,
      scrolling: false
    });
    element.addEventListener('scroll', () => {
      syncScroll(scrollElements[index], index);
    });
  });
};

syncScroll = (element, index) => {
  // remove current element from scrollingElements
  const elements = scrollElements.filter(x => x.id !== element.id);

  // create list of other elements scroll status
  const elementsScrolling = elements.map(x => x.scrolling);

  // check to see if any other elements are currently scrolling
  if (!elementsScrolling.includes(true)) {

    // set element scroll to be true
    scrollElements[index].scrolling = true;

    // store top and left positions
    const top = element.element.scrollTop;
    const left = element.element.scrollLeft;

    // update the top and left position for each element
    elements.forEach(x => {
      x.element.scrollTop = top;
      x.element.scrollLeft = left;
    });
  }

  // set all other scrollElements 'scrolling' to false
  scrollElements
    .filter(x => x.id !== element.id)
    .forEach(element => {
      element.scrolling = false;
    })
};

listenForSpaNavigation = () => {
  // This function is for SPA or applications that use javascript to navigate
  // on page navigation if will reset and check for any scroll sync elements
  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    createScrollListeners();
  };
}

scrollSync = () => {
  if (document.readyState === 'complete') {
    window.setTimeout(createScrollListeners());
  } else {
    document.addEventListener('DOMContentLoaded', createScrollListeners());
    window.addEventListener('load', createScrollListeners());
  }
}

scrollSync();
listenForSpaNavigation();