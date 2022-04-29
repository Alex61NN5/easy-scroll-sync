let scrollElements = [];

const reset = () => {
  // remove all the old event listeners
  scrollElements.forEach((x) => {
    x.element.removeEventListener("scroll", () => {});
  });
  // empty scrollElements
  scrollElements = [];
};

const createScrollListeners = () => {
  // remove window / document event listeners
  window.removeEventListener("load", createScrollListeners);
  document.removeEventListener("DOMContentLoaded", createScrollListeners);

  reset();

  const dataScrollElementNodes = document.querySelectorAll("[data-scrollsync]");
  const dataScrollElements = Array.from(dataScrollElementNodes);

  if (dataScrollElements.length === 0) {
    console.warn(
      "EasyScrollSync: No scroll elements found. You may have to call easyScrollSync() after view initialised to manually find the scrollable elements."
    );
  } else {
    dataScrollElements.forEach((element, index) => {
      scrollElements.push({
        element: element,
        id: index,
        scrolling: false,
      });
      element.addEventListener("scroll", () => {
        syncScroll(scrollElements[index], index);
      });
    });
  }
};

const syncScroll = (element, index) => {
  // remove current element from scrollingElements
  const elements = scrollElements.filter((x) => x.id !== element.id);

  // create list of other elements scroll status
  const elementsScrolling = elements.map((x) => x.scrolling);

  // check to see if any other elements are currently scrolling
  if (!elementsScrolling.includes(true)) {
    // set element scroll to be true
    scrollElements[index].scrolling = true;

    // store top and left positions
    const top = element.element.scrollTop;
    const left = element.element.scrollLeft;

    // update the top and left position for each element
    elements.forEach((x) => {
      x.element.scrollTop = top;
      x.element.scrollLeft = left;
    });
  }

  // set all other scrollElements 'scrolling' to false
  scrollElements
    .filter((x) => x.id !== element.id)
    .forEach((element) => {
      element.scrolling = false;
    });
};

const listenForSpaNavigation = () => {
  // This function is for SPA or applications that use javascript to navigate
  // on page navigation if will reset and check for any scroll sync elements
  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    createScrollListeners();
  };
};

const scrollSync = () => {
  // Wait for document load to be complete
  if (document.readyState === "complete") {
    window.setTimeout(createScrollListeners);
  } else {
    document.addEventListener("DOMContentLoaded", createScrollListeners);
    window.addEventListener("load", createScrollListeners);
  }
};

scrollSync();
listenForSpaNavigation();

export const easyScrollSync = () => {
  createScrollListeners();
};
