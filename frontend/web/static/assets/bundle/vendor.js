/*!
  * Native JavaScript for Bootstrap v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BSN = factory());
}(this, (function () { 'use strict';

  const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

  const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  function getElementTransitionDuration(element) {
    const computedStyle = getComputedStyle(element);
    const propertyValue = computedStyle[transitionProperty];
    const durationValue = computedStyle[transitionDuration];
    const durationScale = durationValue.includes('ms') ? 1 : 1000;
    const duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function emulateTransitionEnd(element, handler) {
    let called = 0;
    const endEvent = new Event(transitionEndEvent);
    const duration = getElementTransitionDuration(element);

    if (duration) {
      element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      });
      setTimeout(() => {
        if (!called) element.dispatchEvent(endEvent);
      }, duration + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  function queryElement(selector, parent) {
    const lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const fadeClass = 'fade';

  const showClass = 'show';

  const dataBsDismiss = 'data-bs-dismiss';

  function bootstrapCustomEvent(namespacedEventType, eventProperties) {
    const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

    if (eventProperties instanceof Object) {
      Object.keys(eventProperties).forEach((key) => {
        Object.defineProperty(OriginalCustomEvent, key, {
          value: eventProperties[key],
        });
      });
    }
    return OriginalCustomEvent;
  }

  function normalizeValue(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (!Number.isNaN(+value)) {
      return +value;
    }

    if (value === '' || value === 'null') {
      return null;
    }

    // string / function / Element / Object
    return value;
  }

  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const normalOps = {};
    const dataOps = {};
    const data = { ...element.dataset };

    Object.keys(data)
      .forEach((k) => {
        const key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach((k) => {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach((k) => {
        if (k in inputOps) {
          normalOps[k] = inputOps[k];
        } else if (k in dataOps) {
          normalOps[k] = dataOps[k];
        } else {
          normalOps[k] = defaultOps[k];
        }
      });

    return normalOps;
  }

  /* Native JavaScript for Bootstrap 5 | Base Component
  ----------------------------------------------------- */

  class BaseComponent {
    constructor(name, target, defaults, config) {
      const self = this;
      const element = queryElement(target);

      if (element[name]) element[name].dispose();
      self.element = element;

      if (defaults && Object.keys(defaults).length) {
        self.options = normalizeOptions(element, defaults, (config || {}), 'bs');
      }
      element[name] = self;
    }

    dispose(name) {
      const self = this;
      self.element[name] = null;
      Object.keys(self).forEach((prop) => { self[prop] = null; });
    }
  }

  /* Native JavaScript for Bootstrap 5 | Alert
  -------------------------------------------- */

  // ALERT PRIVATE GC
  // ================
  const alertString = 'alert';
  const alertComponent = 'Alert';
  const alertSelector = `.${alertString}`;
  const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

  // ALERT CUSTOM EVENTS
  // ===================
  const closeAlertEvent = bootstrapCustomEvent(`close.bs.${alertString}`);
  const closedAlertEvent = bootstrapCustomEvent(`closed.bs.${alertString}`);

  // ALERT EVENT HANDLERS
  // ====================
  function alertTransitionEnd(self) {
    const { element, relatedTarget } = self;
    toggleAlertHandler(self);

    if (relatedTarget) closedAlertEvent.relatedTarget = relatedTarget;
    element.dispatchEvent(closedAlertEvent);

    self.dispose();
    element.parentNode.removeChild(element);
  }

  // ALERT PRIVATE METHOD
  // ====================
  function toggleAlertHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    if (self.dismiss) self.dismiss[action]('click', self.close);
  }

  // ALERT DEFINITION
  // ================
  class Alert extends BaseComponent {
    constructor(target) {
      super(alertComponent, target);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // the dismiss button
      self.dismiss = queryElement(alertDismissSelector, element);
      self.relatedTarget = null;

      // add event listener
      toggleAlertHandler(self, 1);
    }

    // ALERT PUBLIC METHODS
    // ====================
    close(e) {
      const target = e ? e.target : null;
      const self = e
        ? e.target.closest(alertSelector)[alertComponent]
        : this;
      const { element } = self;

      if (self && element && hasClass(element, showClass)) {
        if (target) {
          closeAlertEvent.relatedTarget = target;
          self.relatedTarget = target;
        }
        element.dispatchEvent(closeAlertEvent);
        if (closeAlertEvent.defaultPrevented) return;

        removeClass(element, showClass);

        if (hasClass(element, fadeClass)) {
          emulateTransitionEnd(element, () => alertTransitionEnd(self));
        } else alertTransitionEnd(self);
      }
    }

    dispose() {
      toggleAlertHandler(this);
      super.dispose(alertComponent);
    }
  }

  Alert.init = {
    component: alertComponent,
    selector: alertSelector,
    constructor: Alert,
  };

  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  const activeClass = 'active';

  const dataBsToggle = 'data-bs-toggle';

  /* Native JavaScript for Bootstrap 5 | Button
  ---------------------------------------------*/

  // BUTTON PRIVATE GC
  // =================
  const buttonString = 'button';
  const buttonComponent = 'Button';
  const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;
  const ariaPressed = 'aria-pressed';

  // BUTTON PRIVATE METHOD
  // =====================
  function toggleButtonHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.element[action]('click', self.toggle);
  }

  // BUTTON DEFINITION
  // =================
  class Button extends BaseComponent {
    constructor(target) {
      super(buttonComponent, target);
      const self = this;

      // initialization element
      const { element } = self;

      // set initial state
      self.isActive = hasClass(element, activeClass);
      element.setAttribute(ariaPressed, !!self.isActive);

      // add event listener
      toggleButtonHandler(self, 1);
    }

    // BUTTON PUBLIC METHODS
    // =====================
    toggle(e) {
      if (e) e.preventDefault();
      const self = e ? this[buttonComponent] : this;
      const { element } = self;

      if (hasClass(element, 'disabled')) return;

      self.isActive = hasClass(element, activeClass);
      const { isActive } = self;

      const action = isActive ? removeClass : addClass;
      const ariaValue = isActive ? 'false' : 'true';

      action(element, activeClass);
      element.setAttribute(ariaPressed, ariaValue);
    }

    dispose() {
      toggleButtonHandler(this);
      super.dispose(buttonComponent);
    }
  }

  Button.init = {
    component: buttonComponent,
    selector: buttonSelector,
    constructor: Button,
  };

  const supportPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          result = true;
          return result;
        },
      });
      document[addEventListener]('DOMContentLoaded', function wrap() {
        document[removeEventListener]('DOMContentLoaded', wrap, opts);
      }, opts);
    } catch (e) {
      throw Error('Passive events are not supported');
    }

    return result;
  })();

  // general event options

  var passiveHandler = supportPassive ? { passive: true } : false;

  function reflow(element) {
    return element.offsetHeight;
  }

  function isElementInScrollRange(element) {
    const bcr = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
  }

  /* Native JavaScript for Bootstrap 5 | Carousel
  ----------------------------------------------- */

  // CAROUSEL PRIVATE GC
  // ===================
  const carouselString = 'carousel';
  const carouselComponent = 'Carousel';
  const carouselSelector = `[data-bs-ride="${carouselString}"]`;
  const carouselControl = `${carouselString}-control`;
  const carouselItem = `${carouselString}-item`;
  const dataBsSlideTo = 'data-bs-slide-to';
  const pausedClass = 'paused';
  const defaultCarouselOptions = {
    pause: 'hover', // 'boolean|string'
    keyboard: false, // 'boolean'
    touch: true, // 'boolean'
    interval: 5000, // 'boolean|number'
  };
  let startX = 0;
  let currentX = 0;
  let endX = 0;

  // CAROUSEL CUSTOM EVENTS
  // ======================
  const carouselSlideEvent = bootstrapCustomEvent(`slide.bs.${carouselString}`);
  const carouselSlidEvent = bootstrapCustomEvent(`slid.bs.${carouselString}`);

  // CAROUSEL EVENT HANDLERS
  // =======================
  function carouselTransitionEndHandler(self) {
    const {
      index, direction, element, slides, options, isAnimating,
    } = self;

    // discontinue disposed instances
    if (isAnimating && element[carouselComponent]) {
      const activeItem = getActiveIndex(self);
      const orientation = direction === 'left' ? 'next' : 'prev';
      const directionClass = direction === 'left' ? 'start' : 'end';
      self.isAnimating = false;

      addClass(slides[index], activeClass);
      removeClass(slides[activeItem], activeClass);

      removeClass(slides[index], `${carouselItem}-${orientation}`);
      removeClass(slides[index], `${carouselItem}-${directionClass}`);
      removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);

      element.dispatchEvent(carouselSlidEvent);

      // check for element, might have been disposed
      if (!document.hidden && options.interval
        && !hasClass(element, pausedClass)) {
        self.cycle();
      }
    }
  }

  function carouselPauseHandler(e) {
    const eventTarget = e.target;
    const self = eventTarget.closest(carouselSelector)[carouselComponent];
    const { element, isAnimating } = self;

    if (!hasClass(element, pausedClass)) {
      addClass(element, pausedClass);
      if (!isAnimating) {
        clearInterval(self.timer);
        self.timer = null;
      }
    }
  }

  function carouselResumeHandler(e) {
    const eventTarget = e.target;
    const self = eventTarget.closest(carouselSelector)[carouselComponent];
    const { isPaused, isAnimating, element } = self;

    if (!isPaused && hasClass(element, pausedClass)) {
      removeClass(element, pausedClass);

      if (!isAnimating) {
        clearInterval(self.timer);
        self.timer = null;
        self.cycle();
      }
    }
  }

  function carouselIndicatorHandler(e) {
    e.preventDefault();
    const { target } = e;
    const self = target.closest(carouselSelector)[carouselComponent];

    if (self.isAnimating) return;

    const newIndex = target.getAttribute(dataBsSlideTo);

    if (target && !hasClass(target, activeClass) // event target is not active
      && newIndex) { // AND has the specific attribute
      self.to(+newIndex); // do the slide
    }
  }

  function carouselControlsHandler(e) {
    e.preventDefault();
    const that = this;
    const self = that.closest(carouselSelector)[carouselComponent];
    const { controls } = self;

    if (controls[1] && that === controls[1]) {
      self.next();
    } else if (controls[1] && that === controls[0]) {
      self.prev();
    }
  }

  function carouselKeyHandler({ which }) {
    const [element] = Array.from(document.querySelectorAll(carouselSelector))
      .filter((x) => isElementInScrollRange(x));

    if (!element) return;
    const self = element[carouselComponent];

    switch (which) {
      case 39:
        self.next();
        break;
      case 37:
        self.prev();
        break;
    }
  }

  // CAROUSEL TOUCH HANDLERS
  // =======================
  function carouselTouchDownHandler(e) {
    const element = this;
    const self = element[carouselComponent];

    if (!self || self.isTouch) { return; }

    startX = e.changedTouches[0].pageX;

    if (element.contains(e.target)) {
      self.isTouch = true;
      toggleCarouselTouchHandlers(self, 1);
    }
  }

  function carouselTouchMoveHandler(e) {
    const { changedTouches, type } = e;
    const self = this[carouselComponent];

    if (!self || !self.isTouch) { return; }

    currentX = changedTouches[0].pageX;

    // cancel touch if more than one changedTouches detected
    if (type === 'touchmove' && changedTouches.length > 1) {
      e.preventDefault();
    }
  }

  function carouselTouchEndHandler(e) {
    const element = this;
    const self = element[carouselComponent];

    if (!self || !self.isTouch) { return; }

    endX = currentX || e.changedTouches[0].pageX;

    if (self.isTouch) {
      // the event target is outside the carousel OR carousel doens't include the related target
      if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
        && Math.abs(startX - endX) < 75) { // AND swipe distance is less than 75px
        // when the above conditions are satisfied, no need to continue
        return;
      } // OR determine next index to slide to
      if (currentX < startX) {
        self.index += 1;
      } else if (currentX > startX) {
        self.index -= 1;
      }

      self.isTouch = false;
      self.to(self.index); // do the slide

      toggleCarouselTouchHandlers(self); // remove touch events handlers
    }
  }

  // CAROUSEL PRIVATE METHODS
  // ========================
  function activateCarouselIndicator(self, pageIndex) { // indicators
    const { indicators } = self;
    Array.from(indicators).forEach((x) => removeClass(x, activeClass));
    if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
  }

  function toggleCarouselTouchHandlers(self, add) {
    const { element } = self;
    const action = add ? addEventListener : removeEventListener;
    element[action]('touchmove', carouselTouchMoveHandler, passiveHandler);
    element[action]('touchend', carouselTouchEndHandler, passiveHandler);
  }

  function toggleCarouselHandlers(self, add) {
    const {
      element, options, slides, controls, indicator,
    } = self;
    const {
      touch, pause, interval, keyboard,
    } = options;
    const action = add ? addEventListener : removeEventListener;

    if (pause && interval) {
      element[action]('mouseenter', carouselPauseHandler);
      element[action]('mouseleave', carouselResumeHandler);
      element[action]('touchstart', carouselPauseHandler, passiveHandler);
      element[action]('touchend', carouselResumeHandler, passiveHandler);
    }

    if (touch && slides.length > 1) {
      element[action]('touchstart', carouselTouchDownHandler, passiveHandler);
    }

    controls.forEach((arrow) => {
      if (arrow) arrow[action]('click', carouselControlsHandler);
    });

    if (indicator) indicator[action]('click', carouselIndicatorHandler);
    if (keyboard) window[action]('keydown', carouselKeyHandler);
  }

  function getActiveIndex(self) {
    const { slides, element } = self;
    return Array.from(slides)
      .indexOf(element.getElementsByClassName(`${carouselItem} ${activeClass}`)[0]) || 0;
  }

  // CAROUSEL DEFINITION
  // ===================
  class Carousel extends BaseComponent {
    constructor(target, config) {
      super(carouselComponent, target, defaultCarouselOptions, config);
      // bind
      const self = this;

      // additional properties
      self.timer = null;
      self.direction = 'left';
      self.isPaused = false;
      self.isAnimating = false;
      self.index = 0;
      self.timer = null;
      self.isTouch = false;

      // initialization element
      const { element } = self;
      // carousel elements
      // a LIVE collection is prefferable
      self.slides = element.getElementsByClassName(carouselItem);
      const { slides } = self;

      // invalidate when not enough items
      // no need to go further
      if (slides.length < 2) { return; }

      self.controls = [
        queryElement(`.${carouselControl}-prev`, element),
        queryElement(`.${carouselControl}-next`, element),
      ];

      // a LIVE collection is prefferable
      self.indicator = queryElement('.carousel-indicators', element);
      self.indicators = (self.indicator && self.indicator.querySelectorAll(`[${dataBsSlideTo}]`)) || [];

      // set JavaScript and DATA API options
      const { options } = self;

      // don't use TRUE as interval, it's actually 0, use the default 5000ms better
      self.options.interval = options.interval === true
        ? defaultCarouselOptions.interval
        : options.interval;

      // set first slide active if none
      if (getActiveIndex(self) < 0) {
        if (slides.length) addClass(slides[0], activeClass);
        if (self.indicators.length) activateCarouselIndicator(self, 0);
      }

      // attach event handlers
      toggleCarouselHandlers(self, 1);

      // start to cycle if interval is set
      if (options.interval) self.cycle();
    }

    // CAROUSEL PUBLIC METHODS
    // =======================
    cycle() {
      const self = this;
      const { isPaused, element, options } = self;
      if (self.timer) {
        clearInterval(self.timer);
        self.timer = null;
      }

      if (isPaused) {
        removeClass(element, pausedClass);
        self.isPaused = !isPaused;
      }

      self.timer = setInterval(() => {
        if (isElementInScrollRange(element)) {
          self.index += 1;
          self.to(self.index);
        }
      }, options.interval);
    }

    pause() {
      const self = this;
      const { element, options, isPaused } = self;
      if (options.interval && !isPaused) {
        clearInterval(self.timer);
        self.timer = null;
        addClass(element, pausedClass);
        self.isPaused = !isPaused;
      }
    }

    next() {
      const self = this;
      if (!self.isAnimating) { self.index += 1; self.to(self.index); }
    }

    prev() {
      const self = this;
      if (!self.isAnimating) { self.index -= 1; self.to(self.index); }
    }

    to(idx) {
      const self = this;
      const {
        element, isAnimating, slides, options,
      } = self;
      const activeItem = getActiveIndex(self);
      let next = idx;

      // when controled via methods, make sure to check again
      // first return if we're on the same item #227
      if (isAnimating || activeItem === next) return;

      // determine transition direction
      if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
        self.direction = 'left'; // next
      } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
        self.direction = 'right'; // prev
      }
      const { direction } = self;

      // find the right next index
      if (next < 0) { next = slides.length - 1; } else if (next >= slides.length) { next = 0; }

      // orientation, class name, eventProperties
      const orientation = direction === 'left' ? 'next' : 'prev';
      const directionClass = direction === 'left' ? 'start' : 'end';
      const eventProperties = {
        relatedTarget: slides[next], direction, from: activeItem, to: next,
      };

      // update event properties
      Object.keys(eventProperties).forEach((k) => {
        carouselSlideEvent[k] = eventProperties[k];
        carouselSlidEvent[k] = eventProperties[k];
      });

      // discontinue when prevented
      element.dispatchEvent(carouselSlideEvent);
      if (carouselSlideEvent.defaultPrevented) return;

      // update index
      self.index = next;

      clearInterval(self.timer);
      self.timer = null;

      self.isAnimating = true;
      activateCarouselIndicator(self, next);

      if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
        addClass(slides[next], `${carouselItem}-${orientation}`);
        reflow(slides[next]);
        addClass(slides[next], `${carouselItem}-${directionClass}`);
        addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

        emulateTransitionEnd(slides[next], () => carouselTransitionEndHandler(self));
      } else {
        addClass(slides[next], activeClass);
        removeClass(slides[activeItem], activeClass);

        setTimeout(() => {
          self.isAnimating = false;

          // check for element, might have been disposed
          if (element && options.interval && !hasClass(element, pausedClass)) {
            self.cycle();
          }

          element.dispatchEvent(carouselSlidEvent);
        }, 100);
      }
    }

    dispose() {
      const self = this;
      const { slides } = self;
      const itemClasses = ['start', 'end', 'prev', 'next'];

      Array.from(slides).forEach((slide, idx) => {
        if (hasClass(slide, activeClass)) activateCarouselIndicator(self, idx);
        itemClasses.forEach((c) => removeClass(slide, `${carouselItem}-${c}`));
      });

      toggleCarouselHandlers(self);
      clearInterval(self.timer);
      super.dispose(carouselComponent);
    }
  }

  Carousel.init = {
    component: carouselComponent,
    selector: carouselSelector,
    constructor: Carousel,
  };

  const ariaExpanded = 'aria-expanded';

  // collapse / tab
  const collapsingClass = 'collapsing';

  const dataBsTarget = 'data-bs-target';

  const dataBsParent = 'data-bs-parent';

  const dataBsContainer = 'data-bs-container';

  function getTargetElement(element) {
    return queryElement(element.getAttribute(dataBsTarget) || element.getAttribute('href'))
          || element.closest(element.getAttribute(dataBsParent))
          || queryElement(element.getAttribute(dataBsContainer));
  }

  /* Native JavaScript for Bootstrap 5 | Collapse
  ----------------------------------------------- */

  // COLLAPSE GC
  // ===========
  const collapseString = 'collapse';
  const collapseComponent = 'Collapse';
  const collapseSelector = `.${collapseString}`;
  const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;

  // COLLAPSE CUSTOM EVENTS
  // ======================
  const showCollapseEvent = bootstrapCustomEvent(`show.bs.${collapseString}`);
  const shownCollapseEvent = bootstrapCustomEvent(`shown.bs.${collapseString}`);
  const hideCollapseEvent = bootstrapCustomEvent(`hide.bs.${collapseString}`);
  const hiddenCollapseEvent = bootstrapCustomEvent(`hidden.bs.${collapseString}`);

  // COLLAPSE PRIVATE METHODS
  // ========================
  function expandCollapse(self) {
    const {
      element, parent, triggers,
    } = self;

    element.dispatchEvent(showCollapseEvent);
    if (showCollapseEvent.defaultPrevented) return;

    self.isAnimating = true;
    if (parent) parent.isAnimating = true;

    addClass(element, collapsingClass);
    removeClass(element, collapseString);

    element.style.height = `${element.scrollHeight}px`;

    emulateTransitionEnd(element, () => {
      self.isAnimating = false;
      if (parent) parent.isAnimating = false;

      triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'true'));

      removeClass(element, collapsingClass);
      addClass(element, collapseString);
      addClass(element, showClass);

      element.style.height = '';

      element.dispatchEvent(shownCollapseEvent);
    });
  }

  function collapseContent(self) {
    const {
      element, parent, triggers,
    } = self;

    element.dispatchEvent(hideCollapseEvent);

    if (hideCollapseEvent.defaultPrevented) return;

    self.isAnimating = true;
    if (parent) parent.isAnimating = true;

    element.style.height = `${element.scrollHeight}px`;

    removeClass(element, collapseString);
    removeClass(element, showClass);
    addClass(element, collapsingClass);

    reflow(element);
    element.style.height = '0px';

    emulateTransitionEnd(element, () => {
      self.isAnimating = false;
      if (parent) parent.isAnimating = false;

      triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'false'));

      removeClass(element, collapsingClass);
      addClass(element, collapseString);

      element.style.height = '';

      element.dispatchEvent(hiddenCollapseEvent);
    });
  }

  function toggleCollapseHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { triggers } = self;

    if (triggers.length) {
      triggers.forEach((btn) => btn[action]('click', collapseClickHandler));
    }
  }

  // COLLAPSE EVENT HANDLER
  // ======================
  function collapseClickHandler(e) {
    const { target } = e;
    const trigger = target.closest(collapseToggleSelector);
    const element = getTargetElement(trigger);
    const self = element && element[collapseComponent];
    if (self) self.toggle(target);

    // event target is anchor link #398
    if (trigger && trigger.tagName === 'A') e.preventDefault();
  }

  // COLLAPSE DEFINITION
  // ===================
  class Collapse extends BaseComponent {
    constructor(target, config) {
      super(collapseComponent, target, { parent: null }, config);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // set triggering elements
      self.triggers = Array.from(document.querySelectorAll(collapseToggleSelector))
        .filter((btn) => getTargetElement(btn) === element);

      // set parent accordion
      self.parent = queryElement(self.options.parent);
      const { parent } = self;

      // set initial state
      self.isAnimating = false;
      if (parent) parent.isAnimating = false;

      // add event listeners
      toggleCollapseHandler(self, 1);
    }

    // COLLAPSE PUBLIC METHODS
    // =======================
    toggle(related) {
      const self = this;
      if (!hasClass(self.element, showClass)) self.show(related);
      else self.hide(related);
    }

    hide() {
      const self = this;
      const { triggers, isAnimating } = self;
      if (isAnimating) return;

      collapseContent(self);
      if (triggers.length) {
        triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
      }
    }

    show() {
      const self = this;
      const {
        element, parent, triggers, isAnimating,
      } = self;
      let activeCollapse;
      let activeCollapseInstance;

      if (parent) {
        activeCollapse = Array.from(parent.querySelectorAll(`.${collapseString}.${showClass}`))
          .find((i) => i[collapseComponent]);
        activeCollapseInstance = activeCollapse && activeCollapse[collapseComponent];
      }

      if ((!parent || (parent && !parent.isAnimating)) && !isAnimating) {
        if (activeCollapseInstance && activeCollapse !== element) {
          collapseContent(activeCollapseInstance);
          activeCollapseInstance.triggers.forEach((btn) => {
            addClass(btn, `${collapseString}d`);
          });
        }

        expandCollapse(self);
        if (triggers.length) {
          triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
        }
      }
    }

    dispose() {
      const self = this;
      const { parent } = self;
      toggleCollapseHandler(self);

      if (parent) delete parent.isAnimating;
      super.dispose(collapseComponent);
    }
  }

  Collapse.init = {
    component: collapseComponent,
    selector: collapseSelector,
    constructor: Collapse,
  };

  const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

  const dropdownMenuClass = 'dropdown-menu';

  function isEmptyAnchor(elem) {
    const parentAnchor = elem.closest('A');
    // anchor href starts with #
    return elem && ((elem.href && elem.href.slice(-1) === '#')
      // OR a child of an anchor with href starts with #
      || (parentAnchor && parentAnchor.href && parentAnchor.href.slice(-1) === '#'));
  }

  function setFocus(element) {
    element.focus();
  }

  /* Native JavaScript for Bootstrap 5 | Dropdown
  ----------------------------------------------- */

  // DROPDOWN PRIVATE GC
  // ===================
  const [dropdownString] = dropdownMenuClasses;
  const dropdownComponent = 'Dropdown';
  const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

  // DROPDOWN PRIVATE GC
  // ===================
  const dropupString = dropdownMenuClasses[1];
  const dropstartString = dropdownMenuClasses[2];
  const dropendString = dropdownMenuClasses[3];
  const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
  const hideMenuClass = ['d-block', 'invisible'];
  const verticalClass = [dropdownString, dropupString];
  const horizontalClass = [dropstartString, dropendString];
  const defaultDropdownOptions = {
    offset: 5, // [number] 5(px)
    display: 'dynamic', // [dynamic|static]
  };

  // DROPDOWN CUSTOM EVENTS
  // ========================
  const showDropdownEvent = bootstrapCustomEvent(`show.bs.${dropdownString}`);
  const shownDropdownEvent = bootstrapCustomEvent(`shown.bs.${dropdownString}`);
  const hideDropdownEvent = bootstrapCustomEvent(`hide.bs.${dropdownString}`);
  const hiddenDropdownEvent = bootstrapCustomEvent(`hidden.bs.${dropdownString}`);

  // DROPDOWN PRIVATE METHODS
  // ========================
  function styleDropdown(self, show) {
    const {
      element, menu, originalClass, menuEnd, options,
    } = self;
    const parent = element.parentElement;

    // reset menu offset and position
    const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
    resetProps.forEach((p) => { menu.style[p] = ''; });
    removeClass(parent, 'position-static');

    if (!show) {
      parent.className = originalClass.join(' ');
      const menuAction = menuEnd && !hasClass(menu, dropdownMenuEndClass) ? addClass : removeClass;
      menuAction(menu, dropdownMenuEndClass);
      return;
    }

    const { offset } = options;
    let positionClass = dropdownMenuClasses.find((c) => originalClass.includes(c));

    let dropdownMargin = {
      dropdown: [offset, 0, 0],
      dropup: [0, 0, offset],
      dropstart: [-1, offset, 0],
      dropend: [-1, 0, 0, offset],
    };

    const dropdownPosition = {
      dropdown: { top: '100%' },
      dropup: { top: 'auto', bottom: '100%' },
      dropstart: { left: 'auto', right: '100%' },
      dropend: { left: '100%', right: 'auto' },
      menuEnd: { right: 0, left: 'auto' },
    };

    // force showing the menu to calculate its size
    hideMenuClass.forEach((c) => addClass(menu, c));

    const dropdownRegex = new RegExp(`\\b(${dropdownString}|${dropupString}|${dropstartString}|${dropendString})+`);
    const elementDimensions = { w: element.offsetWidth, h: element.offsetHeight };
    const menuDimensions = { w: menu.offsetWidth, h: menu.offsetHeight };
    const HTML = document.documentElement;
    const BD = document.body;
    const windowWidth = (HTML.clientWidth || BD.clientWidth);
    const windowHeight = (HTML.clientHeight || BD.clientHeight);
    const targetBCR = element.getBoundingClientRect();
    // dropdownMenuEnd && [ dropdown | dropup ]
    const leftExceed = targetBCR.left + elementDimensions.w - menuDimensions.w < 0;
    // dropstart
    const leftFullExceed = targetBCR.left - menuDimensions.w < 0;
    // !dropdownMenuEnd && [ dropdown | dropup ]
    const rightExceed = targetBCR.left + menuDimensions.w >= windowWidth;
    // dropend
    const rightFullExceed = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth;
    // dropstart | dropend
    const bottomExceed = targetBCR.top + menuDimensions.h >= windowHeight;
    // dropdown
    const bottomFullExceed = targetBCR.top + menuDimensions.h + elementDimensions.h >= windowHeight;
    // dropup
    const topExceed = targetBCR.top - menuDimensions.h < 0;

    const btnGroup = parent.parentNode.closest('.btn-group,.btn-group-vertical');

    // recompute position
    if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
      positionClass = dropdownString;
    }
    if (horizontalClass.includes(positionClass) && bottomExceed) {
      positionClass = dropupString;
    }
    if (positionClass === dropstartString && leftFullExceed && !bottomExceed) {
      positionClass = dropendString;
    }
    if (positionClass === dropendString && rightFullExceed && !bottomExceed) {
      positionClass = dropstartString;
    }
    if (positionClass === dropupString && topExceed && !bottomFullExceed) {
      positionClass = dropdownString;
    }
    if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
      positionClass = dropupString;
    }

    // set spacing
    dropdownMargin = dropdownMargin[positionClass];
    menu.style.margin = `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`;
    Object.keys(dropdownPosition[positionClass]).forEach((position) => {
      menu.style[position] = dropdownPosition[positionClass][position];
    });

    // update dropdown position class
    if (!hasClass(parent, positionClass)) {
      parent.className = parent.className.replace(dropdownRegex, positionClass);
    }

    // update dropdown / dropup to handle parent btn-group element
    // as well as the dropdown-menu-end utility class
    if (verticalClass.includes(positionClass)) {
      const menuEndAction = rightExceed ? addClass : removeClass;

      if (!btnGroup) menuEndAction(menu, dropdownMenuEndClass);
      else if (leftExceed) addClass(parent, 'position-static');

      if (hasClass(menu, dropdownMenuEndClass)) {
        Object.keys(dropdownPosition.menuEnd).forEach((p) => {
          menu.style[p] = dropdownPosition.menuEnd[p];
        });
      }
    }

    // remove util classes from the menu, we have its size
    hideMenuClass.forEach((c) => removeClass(menu, c));
  }

  function toggleDropdownDismiss(self) {
    const action = self.open ? addEventListener : removeEventListener;

    document[action]('click', dropdownDismissHandler);
    document[action]('focus', dropdownDismissHandler);
    document[action]('keydown', dropdownPreventScroll);
    document[action]('keyup', dropdownKeyHandler);
    if (self.options.display === 'dynamic') {
      window[action]('scroll', dropdownLayoutHandler, passiveHandler);
      window[action]('resize', dropdownLayoutHandler, passiveHandler);
    }
  }

  function toggleDropdownHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.element[action]('click', dropdownClickHandler);
  }

  function getCurrentOpenDropdown() {
    const currentParent = dropdownMenuClasses
      .map((c) => document.getElementsByClassName(`${c} ${showClass}`))
      .find((x) => x.length);

    if (currentParent && currentParent.length) {
      return Array.from(currentParent[0].children).find((x) => x.hasAttribute(dataBsToggle));
    }
    return null;
  }

  // DROPDOWN EVENT HANDLERS
  // =======================
  function dropdownDismissHandler(e) {
    const { target, type } = e;
    if (!target.closest) return; // some weird FF bug #409

    const element = getCurrentOpenDropdown();
    const parent = element && element.parentNode;
    const self = element && element[dropdownComponent];
    const menu = self && self.menu;

    const hasData = target.closest(dropdownSelector) !== null;
    const isForm = parent && parent.contains(target)
      && (target.tagName === 'form' || target.closest('form') !== null);

    if (type === 'click' && isEmptyAnchor(target)) {
      e.preventDefault();
    }
    if (type === 'focus'
      && (target === element || target === menu || menu.contains(target))) {
      return;
    }

    if (isForm || hasData) ; else if (self) {
      self.hide(element);
    }
  }

  function dropdownClickHandler(e) {
    const element = this;
    const self = element[dropdownComponent];
    self.toggle(element);

    if (isEmptyAnchor(e.target)) e.preventDefault();
  }

  function dropdownPreventScroll(e) {
    if (e.which === 38 || e.which === 40) e.preventDefault();
  }

  function dropdownKeyHandler({ which }) {
    const element = getCurrentOpenDropdown();
    const self = element[dropdownComponent];
    const { menu, menuItems, open } = self;
    const activeItem = document.activeElement;
    const isSameElement = activeItem === element;
    const isInsideMenu = menu.contains(activeItem);
    const isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;

    let idx = menuItems.indexOf(activeItem);

    if (isMenuItem) { // navigate up | down
      if (isSameElement) {
        idx = 0;
      } else if (which === 38) {
        idx = idx > 1 ? idx - 1 : 0;
      } else if (which === 40) {
        idx = idx < menuItems.length - 1 ? idx + 1 : idx;
      }

      if (menuItems[idx]) setFocus(menuItems[idx]);
    }

    if (((menuItems.length && isMenuItem) // menu has items
        || (!menuItems.length && (isInsideMenu || isSameElement)) // menu might be a form
        || !isInsideMenu) // or the focused element is not in the menu at all
        && open && which === 27 // menu must be open
    ) {
      self.toggle();
    }
  }

  function dropdownLayoutHandler() {
    const element = getCurrentOpenDropdown();
    const self = element && element[dropdownComponent];

    if (self && self.open) styleDropdown(self, 1);
  }

  // DROPDOWN DEFINITION
  // ===================
  class Dropdown extends BaseComponent {
    constructor(target, config) {
      super(dropdownComponent, target, defaultDropdownOptions, config);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // set targets
      const parent = element.parentElement;
      self.menu = queryElement(`.${dropdownMenuClass}`, parent);
      const { menu } = self;

      self.originalClass = Array.from(parent.classList);

      // set original position
      self.menuEnd = hasClass(menu, dropdownMenuEndClass);

      self.menuItems = [];

      Array.from(menu.children).forEach((child) => {
        if (child.children.length && (child.children[0].tagName === 'A')) self.menuItems.push(child.children[0]);
        if (child.tagName === 'A') self.menuItems.push(child);
      });

      // set initial state to closed
      self.open = false;

      // add event listener
      toggleDropdownHandler(self, 1);
    }

    // DROPDOWN PUBLIC METHODS
    // =======================
    toggle(related) {
      const self = this;
      const { open } = self;

      if (open) self.hide(related);
      else self.show(related);
    }

    show(related) {
      const self = this;
      const currentParent = queryElement(dropdownMenuClasses.map((c) => `.${c}.${showClass}`).join(','));
      const currentElement = currentParent && queryElement(dropdownSelector, currentParent);

      if (currentElement) currentElement[dropdownComponent].hide();

      const { element, menu, open } = self;
      const parent = element.parentNode;

      // update relatedTarget and dispatch
      showDropdownEvent.relatedTarget = related || null;
      parent.dispatchEvent(showDropdownEvent);
      if (showDropdownEvent.defaultPrevented) return;

      // change menu position
      styleDropdown(self, 1);

      addClass(menu, showClass);
      addClass(parent, showClass);

      element.setAttribute(ariaExpanded, true);
      self.open = !open;

      setTimeout(() => {
        setFocus(menu.getElementsByTagName('INPUT')[0] || element); // focus the first input item | element
        toggleDropdownDismiss(self);

        shownDropdownEvent.relatedTarget = related || null;
        parent.dispatchEvent(shownDropdownEvent);
      }, 1);
    }

    hide(related) {
      const self = this;
      const { element, menu, open } = self;
      const parent = element.parentNode;
      hideDropdownEvent.relatedTarget = related || null;
      parent.dispatchEvent(hideDropdownEvent);
      if (hideDropdownEvent.defaultPrevented) return;

      removeClass(menu, showClass);
      removeClass(parent, showClass);

      // revert to original position
      styleDropdown(self);

      element.setAttribute(ariaExpanded, false);
      self.open = !open;

      setFocus(element);

      // only re-attach handler if the instance is not disposed
      setTimeout(() => toggleDropdownDismiss(self), 1);

      // update relatedTarget and dispatch
      hiddenDropdownEvent.relatedTarget = related || null;
      parent.dispatchEvent(hiddenDropdownEvent);
    }

    dispose() {
      const self = this;
      const { element } = self;

      if (hasClass(element.parentNode, showClass) && self.open) self.hide();

      toggleDropdownHandler(self);

      super.dispose(dropdownComponent);
    }
  }

  Dropdown.init = {
    component: dropdownComponent,
    selector: dropdownSelector,
    constructor: Dropdown,
  };

  const ariaHidden = 'aria-hidden';

  const ariaModal = 'aria-modal';

  const fixedTopClass = 'fixed-top';

  const fixedBottomClass = 'fixed-bottom';

  const stickyTopClass = 'sticky-top';

  const fixedItems = Array.from(document.getElementsByClassName(fixedTopClass))
    .concat(Array.from(document.getElementsByClassName(fixedBottomClass)))
    .concat(Array.from(document.getElementsByClassName(stickyTopClass)))
    .concat(Array.from(document.getElementsByClassName('is-fixed')));

  function resetScrollbar() {
    const bd = document.body;
    bd.style.paddingRight = '';
    bd.style.overflow = '';

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        fixed.style.paddingRight = '';
        fixed.style.marginRight = '';
      });
    }
  }

  function measureScrollbar() {
    const windowWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - windowWidth);
  }

  function setScrollbar(scrollbarWidth, overflow, isOpen) {
    const bd = document.body;
    const bodyPad = parseInt(getComputedStyle(bd).paddingRight, 10);
    const sbWidth = isOpen && bodyPad ? 0 : scrollbarWidth;

    if (overflow) {
      bd.style.paddingRight = `${bodyPad + sbWidth}px`;

      if (fixedItems.length) {
        fixedItems.forEach((fixed) => {
          const isSticky = hasClass(fixed, stickyTopClass);
          const itemPadValue = getComputedStyle(fixed).paddingRight;
          fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
          if (isSticky) {
            const itemMValue = getComputedStyle(fixed).marginRight;
            fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
          }
        });
      }
    }
  }

  const modalOpenClass = 'modal-open';
  const modalBackdropClass = 'modal-backdrop';
  const modalActiveSelector = `.modal.${showClass}`;
  const offcanvasActiveSelector = `.offcanvas.${showClass}`;

  const overlay = document.createElement('div');
  overlay.setAttribute('class', `${modalBackdropClass}`);

  function getCurrentOpen() {
    return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
  }

  function appendOverlay(hasFade) {
    document.body.appendChild(overlay);
    if (hasFade) addClass(overlay, fadeClass);
  }

  function showOverlay() {
    addClass(overlay, showClass);
    reflow(overlay);
  }

  function hideOverlay() {
    removeClass(overlay, showClass);
  }

  function removeOverlay() {
    const bd = document.body;
    const currentOpen = getCurrentOpen();

    if (!currentOpen) {
      removeClass(overlay, fadeClass);
      removeClass(bd, modalOpenClass);
      bd.removeChild(overlay);
      resetScrollbar();
    }
  }

  function isVisible(element) {
    return getComputedStyle(element).visibility !== 'hidden'
      && element.offsetParent !== null;
  }

  /* Native JavaScript for Bootstrap 5 | Modal
  -------------------------------------------- */

  // MODAL PRIVATE GC
  // ================
  const modalString = 'modal';
  const modalComponent = 'Modal';
  const modalSelector = `.${modalString}`;
  // const modalActiveSelector = `.${modalString}.${showClass}`;
  const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
  const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
  const modalStaticClass = `${modalString}-static`;
  const modalDefaultOptions = {
    backdrop: true, // boolean|string
    keyboard: true, // boolean
  };

  // MODAL CUSTOM EVENTS
  // ===================
  const showModalEvent = bootstrapCustomEvent(`show.bs.${modalString}`);
  const shownModalEvent = bootstrapCustomEvent(`shown.bs.${modalString}`);
  const hideModalEvent = bootstrapCustomEvent(`hide.bs.${modalString}`);
  const hiddenModalEvent = bootstrapCustomEvent(`hidden.bs.${modalString}`);

  // MODAL PRIVATE METHODS
  // =====================
  function setModalScrollbar(self) {
    const { element, scrollbarWidth } = self;
    const bd = document.body;
    const html = document.documentElement;
    const openModal = hasClass(bd, modalOpenClass);
    const bodyOverflow = html.clientHeight !== html.scrollHeight
                      || bd.clientHeight !== bd.scrollHeight;
    const modalOverflow = element.clientHeight !== element.scrollHeight;

    if (!modalOverflow && scrollbarWidth) {
      element.style.paddingRight = `${scrollbarWidth}px`;
    }
    setScrollbar(scrollbarWidth, (modalOverflow || bodyOverflow), openModal);
  }

  function toggleModalDismiss(self, add) {
    const action = add ? addEventListener : removeEventListener;
    window[action]('resize', self.update, passiveHandler);
    self.element[action]('click', modalDismissHandler);
    document[action]('keydown', modalKeyHandler);
  }

  function toggleModalHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { triggers } = self;

    if (triggers.length) {
      triggers.forEach((btn) => btn[action]('click', modalClickHandler));
    }
  }

  function afterModalHide(self) {
    const { triggers } = self;
    removeOverlay();
    self.element.style.paddingRight = '';
    self.isAnimating = false;

    if (triggers.length) {
      const visibleTrigger = triggers.find((x) => isVisible(x));
      if (visibleTrigger) setFocus(visibleTrigger);
    }
  }

  function afterModalShow(self) {
    const { element, relatedTarget } = self;
    setFocus(element);
    self.isAnimating = false;

    toggleModalDismiss(self, 1);

    shownModalEvent.relatedTarget = relatedTarget;
    element.dispatchEvent(shownModalEvent);
  }

  function beforeModalShow(self) {
    const { element, hasFade } = self;
    element.style.display = 'block';

    setModalScrollbar(self);
    if (!queryElement(modalActiveSelector)) {
      addClass(document.body, modalOpenClass);
    }

    addClass(element, showClass);
    element.removeAttribute(ariaHidden);
    element.setAttribute(ariaModal, true);

    if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
    else afterModalShow(self);
  }

  function beforeModalHide(self, force) {
    const {
      element, relatedTarget, hasFade,
    } = self;
    const currentOpen = getCurrentOpen();

    element.style.display = '';

    // force can also be the transitionEvent object, we wanna make sure it's not
    // call is not forced and overlay is visible
    if (!force && hasFade && hasClass(overlay, showClass)
      && !currentOpen) { // AND no modal is visible
      hideOverlay();
      emulateTransitionEnd(overlay, () => afterModalHide(self));
    } else {
      afterModalHide(self);
    }

    toggleModalDismiss(self);

    hiddenModalEvent.relatedTarget = relatedTarget;
    element.dispatchEvent(hiddenModalEvent);
  }

  // MODAL EVENT HANDLERS
  // ====================
  function modalClickHandler(e) {
    const { target } = e;
    const trigger = target.closest(modalToggleSelector);
    const element = getTargetElement(trigger);
    const self = element && element[modalComponent];

    if (trigger.tagName === 'A') e.preventDefault();

    if (self.isAnimating) return;

    self.relatedTarget = trigger;

    self.toggle();
  }

  function modalKeyHandler({ which }) {
    const element = queryElement(modalActiveSelector);
    const self = element[modalComponent];
    const { options, isAnimating } = self;
    if (!isAnimating // modal has no animations running
      && options.keyboard && which === 27 // the keyboard option is enabled and the key is 27
      && hasClass(element, showClass)) { // the modal is not visible
      self.relatedTarget = null;
      self.hide();
    }
  }

  function modalDismissHandler(e) {
    const element = this;
    const self = element[modalComponent];

    if (self.isAnimating) return;

    const { isStatic, modalDialog } = self;
    const { target } = e;
    const selectedText = document.getSelection().toString().length;
    const targetInsideDialog = modalDialog.contains(target);
    const dismiss = target.closest(modalDismissSelector);

    if (isStatic && !targetInsideDialog) {
      addClass(element, modalStaticClass);
      self.isAnimating = true;
      emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
    } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog)) {
      self.relatedTarget = dismiss || null;
      self.hide();
      e.preventDefault();
    }
  }

  function staticTransitionEnd(self) {
    const duration = getElementTransitionDuration(self.modalDialog) + 17;
    removeClass(self.element, modalStaticClass);
    // user must wait for zoom out transition
    setTimeout(() => { self.isAnimating = false; }, duration);
  }

  // MODAL DEFINITION
  // ================
  class Modal extends BaseComponent {
    constructor(target, config) {
      super(modalComponent, target, modalDefaultOptions, config);

      // bind
      const self = this;

      // the modal
      const { element } = self;

      // the modal-dialog
      self.modalDialog = queryElement(`.${modalString}-dialog`, element);

      // modal can have multiple triggering elements
      self.triggers = Array.from(document.querySelectorAll(modalToggleSelector))
        .filter((btn) => getTargetElement(btn) === element);

      // additional internals
      self.isStatic = self.options.backdrop === 'static';
      self.hasFade = hasClass(element, fadeClass);
      self.isAnimating = false;
      self.scrollbarWidth = measureScrollbar();
      self.relatedTarget = null;

      // attach event listeners
      toggleModalHandler(self, 1);

      // bind
      self.update = self.update.bind(self);
    }

    // MODAL PUBLIC METHODS
    // ====================
    toggle() {
      const self = this;
      if (hasClass(self.element, showClass)) self.hide();
      else self.show();
    }

    show() {
      const self = this;
      const {
        element, isAnimating, hasFade, relatedTarget,
      } = self;
      let overlayDelay = 0;

      if (hasClass(element, showClass) && !isAnimating) return;

      showModalEvent.relatedTarget = relatedTarget || null;
      element.dispatchEvent(showModalEvent);
      if (showModalEvent.defaultPrevented) return;

      self.isAnimating = true;

      // we elegantly hide any opened modal/offcanvas
      const currentOpen = getCurrentOpen();
      if (currentOpen && currentOpen !== element) {
        const that = currentOpen[modalComponent]
          ? currentOpen[modalComponent]
          : currentOpen.Offcanvas;
        that.hide();
      }

      if (!queryElement(`.${modalBackdropClass}`)) {
        appendOverlay(hasFade);
      }
      overlayDelay = getElementTransitionDuration(overlay);

      if (!hasClass(overlay, showClass)) {
        showOverlay();
      }

      if (!currentOpen) {
        setTimeout(() => beforeModalShow(self), overlayDelay);
      } else beforeModalShow(self);
    }

    hide(force) {
      const self = this;
      const {
        element, isAnimating, hasFade, relatedTarget,
      } = self;
      if (!hasClass(element, showClass) && !isAnimating) return;

      hideModalEvent.relatedTarget = relatedTarget || null;
      element.dispatchEvent(hideModalEvent);
      if (hideModalEvent.defaultPrevented) return;

      self.isAnimating = true;
      removeClass(element, showClass);
      element.setAttribute(ariaHidden, true);
      element.removeAttribute(ariaModal);

      if (hasFade && force !== 1) {
        emulateTransitionEnd(element, () => beforeModalHide(self));
      } else {
        beforeModalHide(self, force);
      }
    }

    update() {
      const self = this;

      if (hasClass(self.element, showClass)) setModalScrollbar(self);
    }

    dispose() {
      const self = this;
      self.hide(1); // forced call

      toggleModalHandler(self);

      super.dispose(modalComponent);
    }
  }

  Modal.init = {
    component: modalComponent,
    selector: modalSelector,
    constructor: Modal,
  };

  /* Native JavaScript for Bootstrap 5 | OffCanvas
  ------------------------------------------------ */

  // OFFCANVAS PRIVATE GC
  // ====================
  const offcanvasString = 'offcanvas';
  const offcanvasComponent = 'Offcanvas';
  const OffcanvasSelector = `.${offcanvasString}`;
  const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
  const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
  const offcanvasTogglingClass = `${offcanvasString}-toggling`;
  const offcanvasDefaultOptions = {
    backdrop: true, // boolean
    keyboard: true, // boolean
    scroll: false, // boolean
  };

  // OFFCANVAS CUSTOM EVENTS
  // =======================
  const showOffcanvasEvent = bootstrapCustomEvent(`show.bs.${offcanvasString}`);
  const shownOffcanvasEvent = bootstrapCustomEvent(`shown.bs.${offcanvasString}`);
  const hideOffcanvasEvent = bootstrapCustomEvent(`hide.bs.${offcanvasString}`);
  const hiddenOffcanvasEvent = bootstrapCustomEvent(`hidden.bs.${offcanvasString}`);

  // OFFCANVAS PRIVATE METHODS
  // =========================
  function setOffCanvasScrollbar(self) {
    const bd = document.body;
    const html = document.documentElement;
    const openOffCanvas = hasClass(bd, modalOpenClass);
    const bodyOverflow = html.clientHeight !== html.scrollHeight
                      || bd.clientHeight !== bd.scrollHeight;
    setScrollbar(self.scrollbarWidth, bodyOverflow, openOffCanvas);
  }

  function toggleOffcanvasEvents(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.triggers.forEach((btn) => btn[action]('click', offcanvasTriggerHandler));
  }

  function toggleOffCanvasDismiss(add) {
    const action = add ? addEventListener : removeEventListener;
    document[action]('keydown', offcanvasKeyDismissHandler);
    document[action]('click', offcanvasDismissHandler);
  }

  function beforeOffcanvasShow(self) {
    const { element, options } = self;

    if (!options.scroll) {
      addClass(document.body, modalOpenClass);
      setOffCanvasScrollbar(self);
    }

    addClass(element, offcanvasTogglingClass);
    addClass(element, showClass);
    element.style.visibility = 'visible';

    emulateTransitionEnd(element, () => showOffcanvasComplete(self));
  }

  function beforeOffcanvasHide(self) {
    const { element, options } = self;
    const currentOpen = getCurrentOpen();

    element.blur();

    if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
      hideOverlay();
      emulateTransitionEnd(overlay, () => hideOffcanvasComplete(self));
    } else hideOffcanvasComplete(self);
  }

  // OFFCANVAS EVENT HANDLERS
  // ========================
  function offcanvasTriggerHandler(e) {
    const trigger = this.closest(offcanvasToggleSelector);
    const element = getTargetElement(trigger);
    const self = element && element[offcanvasComponent];

    if (trigger.tagName === 'A') e.preventDefault();
    if (self) {
      self.relatedTarget = trigger;
      self.toggle();
    }
  }

  function offcanvasDismissHandler(e) {
    const element = queryElement(offcanvasActiveSelector);
    if (!element) return;

    const offCanvasDismiss = queryElement(offcanvasDismissSelector, element);
    const self = element[offcanvasComponent];
    if (!self) return;

    const { options, open, triggers } = self;
    const { target } = e;
    const trigger = target.closest(offcanvasToggleSelector);

    if (trigger && trigger.tagName === 'A') e.preventDefault();

    if (open && ((!element.contains(target) && options.backdrop
      && (!trigger || (trigger && !triggers.includes(trigger))))
      || offCanvasDismiss.contains(target))) {
      self.relatedTarget = target === offCanvasDismiss ? offCanvasDismiss : null;
      self.hide();
    }
  }

  function offcanvasKeyDismissHandler({ which }) {
    const element = queryElement(offcanvasActiveSelector);
    if (!element) return;

    const self = element[offcanvasComponent];

    if (self && self.options.keyboard && which === 27) {
      self.relatedTarget = null;
      self.hide();
    }
  }

  function showOffcanvasComplete(self) {
    const { element, triggers, relatedTarget } = self;
    removeClass(element, offcanvasTogglingClass);

    element.removeAttribute(ariaHidden);
    element.setAttribute(ariaModal, true);
    element.setAttribute('role', 'dialog');
    self.isAnimating = false;

    if (triggers.length) {
      triggers.forEach((btn) => btn.setAttribute(ariaExpanded, true));
    }

    shownOffcanvasEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(shownOffcanvasEvent);

    toggleOffCanvasDismiss(1);
    setFocus(element);
  }

  function hideOffcanvasComplete(self) {
    const {
      element, options, relatedTarget, triggers,
    } = self;
    const currentOpen = getCurrentOpen();

    element.setAttribute(ariaHidden, true);
    element.removeAttribute(ariaModal);
    element.removeAttribute('role');
    element.style.visibility = '';
    self.open = false;
    self.isAnimating = false;

    if (triggers.length) {
      triggers.forEach((btn) => btn.setAttribute(ariaExpanded, false));
      const visibleTrigger = triggers.find((x) => isVisible(x));
      if (visibleTrigger) setFocus(visibleTrigger);
    }

    // handle new offcanvas showing up
    if (!currentOpen) {
      if (options.backdrop) removeOverlay();
      if (!options.scroll) {
        resetScrollbar();
        removeClass(document.body, modalOpenClass);
      }
    }

    hiddenOffcanvasEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(hiddenOffcanvasEvent);
    removeClass(element, offcanvasTogglingClass);

    toggleOffCanvasDismiss();
  }

  // OFFCANVAS DEFINITION
  // ====================
  class Offcanvas extends BaseComponent {
    constructor(target, config) {
      super(offcanvasComponent, target, offcanvasDefaultOptions, config);
      const self = this;

      // instance element
      const { element } = self;

      // all the triggering buttons
      self.triggers = Array.from(document.querySelectorAll(offcanvasToggleSelector))
        .filter((btn) => getTargetElement(btn) === element);

      // additional instance property
      self.open = false;
      self.isAnimating = false;
      self.scrollbarWidth = measureScrollbar();

      // attach event listeners
      toggleOffcanvasEvents(self, 1);
    }

    // OFFCANVAS PUBLIC METHODS
    // ========================
    toggle() {
      const self = this;
      return self.open ? self.hide() : self.show();
    }

    show() {
      const self = this[offcanvasComponent] ? this[offcanvasComponent] : this;
      const {
        element, options, isAnimating, relatedTarget,
      } = self;
      let overlayDelay = 0;

      if (self.open || isAnimating) return;

      showOffcanvasEvent.relatedTarget = relatedTarget || null;
      element.dispatchEvent(showOffcanvasEvent);

      if (showOffcanvasEvent.defaultPrevented) return;

      // we elegantly hide any opened modal/offcanvas
      const currentOpen = getCurrentOpen();
      if (currentOpen && currentOpen !== element) {
        const that = currentOpen[offcanvasComponent]
          ? currentOpen[offcanvasComponent]
          : currentOpen.Modal;
        that.hide();
      }

      self.open = true;
      self.isAnimating = true;

      if (options.backdrop) {
        if (!queryElement(`.${modalBackdropClass}`)) {
          appendOverlay(1);
        }

        overlayDelay = getElementTransitionDuration(overlay);

        if (!hasClass(overlay, showClass)) showOverlay();

        setTimeout(() => beforeOffcanvasShow(self), overlayDelay);
      } else beforeOffcanvasShow(self);
    }

    hide(force) {
      const self = this;
      const { element, isAnimating, relatedTarget } = self;

      if (!self.open || isAnimating) return;

      hideOffcanvasEvent.relatedTarget = relatedTarget || null;
      element.dispatchEvent(hideOffcanvasEvent);
      if (hideOffcanvasEvent.defaultPrevented) return;

      self.isAnimating = true;
      addClass(element, offcanvasTogglingClass);
      removeClass(element, showClass);

      if (!force) {
        emulateTransitionEnd(element, () => beforeOffcanvasHide(self));
      } else beforeOffcanvasHide(self);
    }

    dispose() {
      const self = this;
      self.hide(1);
      toggleOffcanvasEvents(self);
      super.dispose(offcanvasComponent);
    }
  }

  Offcanvas.init = {
    component: offcanvasComponent,
    selector: OffcanvasSelector,
    constructor: Offcanvas,
  };

  const ariaDescribedBy = 'aria-describedby';

  var tipClassPositions = {
    top: 'top', bottom: 'bottom', left: 'start', right: 'end',
  };

  function isVisibleTip(tip, container) {
    return container.contains(tip);
  }

  function isMedia(element) {
    return [SVGElement, HTMLImageElement, HTMLVideoElement]
      .some((mediaType) => element instanceof mediaType);
  }

  function closestRelative(element) {
    let retval = null;
    let el = element;
    while (el !== document.body) {
      el = el.parentElement;
      if (getComputedStyle(el).position === 'relative') {
        retval = el;
        break;
      }
    }
    return retval;
  }

  // both popovers and tooltips (this, event)
  function styleTip(self, e) {
    const tipClasses = /\b(top|bottom|start|end)+/;
    const tip = self.tooltip || self.popover;
    // reset tip style
    tip.style.top = '';
    tip.style.left = '';
    tip.style.right = '';
    // continue with metrics
    const isPopover = !!self.popover;
    let tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };
    const windowWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    const windowHeight = (document.documentElement.clientHeight || document.body.clientHeight);
    const { element, options, arrow } = self;
    let { container, placement } = options;
    let parentIsBody = container === document.body;
    const targetPosition = getComputedStyle(element).position;
    const parentPosition = getComputedStyle(container).position;
    const staticParent = !parentIsBody && parentPosition === 'static';
    let relativeParent = !parentIsBody && parentPosition === 'relative';
    const relContainer = staticParent && closestRelative(container);
    // static containers should refer to another relative container or the body
    container = relContainer || container;
    relativeParent = staticParent && relContainer ? 1 : relativeParent;
    parentIsBody = container === document.body;
    const parentRect = container.getBoundingClientRect();
    const leftBoundry = relativeParent ? parentRect.left : 0;
    const rightBoundry = relativeParent ? parentRect.right : windowWidth;
    // this case should not be possible
    // absoluteParent = !parentIsBody && parentPosition === 'absolute',
    // this case requires a container with placement: relative
    const absoluteTarget = targetPosition === 'absolute';
    const targetRect = element.getBoundingClientRect();
    const scroll = parentIsBody
      ? { x: window.pageXOffset, y: window.pageYOffset }
      : { x: container.scrollLeft, y: container.scrollTop };
    const elemDimensions = { w: element.offsetWidth, h: element.offsetHeight };
    const top = relativeParent ? element.offsetTop : targetRect.top;
    const left = relativeParent ? element.offsetLeft : targetRect.left;
    // reset arrow style
    arrow.style.top = '';
    arrow.style.left = '';
    arrow.style.right = '';
    let topPosition;
    let leftPosition;
    let rightPosition;
    let arrowTop;
    let arrowLeft;
    let arrowRight;

    // check placement
    let topExceed = targetRect.top - tipDimensions.h < 0;
    let bottomExceed = targetRect.top + tipDimensions.h + elemDimensions.h >= windowHeight;
    let leftExceed = targetRect.left - tipDimensions.w < leftBoundry;
    let rightExceed = targetRect.left + tipDimensions.w + elemDimensions.w >= rightBoundry;

    topExceed = ['left', 'right'].includes(placement)
      ? targetRect.top + elemDimensions.h / 2 - tipDimensions.h / 2 < 0
      : topExceed;
    bottomExceed = ['left', 'right'].includes(placement)
      ? targetRect.top + tipDimensions.h / 2 + elemDimensions.h / 2 >= windowHeight
      : bottomExceed;
    leftExceed = ['top', 'bottom'].includes(placement)
      ? targetRect.left + elemDimensions.w / 2 - tipDimensions.w / 2 < leftBoundry
      : leftExceed;
    rightExceed = ['top', 'bottom'].includes(placement)
      ? targetRect.left + tipDimensions.w / 2 + elemDimensions.w / 2 >= rightBoundry
      : rightExceed;

    // recompute placement
    // first, when both left and right limits are exceeded, we fall back to top|bottom
    placement = (['left', 'right'].includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
    placement = placement === 'top' && topExceed ? 'bottom' : placement;
    placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
    placement = placement === 'left' && leftExceed ? 'right' : placement;
    placement = placement === 'right' && rightExceed ? 'left' : placement;

    // update tooltip/popover class
    if (!tip.className.includes(placement)) {
      tip.className = tip.className.replace(tipClasses, tipClassPositions[placement]);
    }
    // if position has changed, update tip dimensions
    tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };

    // we check the computed width & height and update here
    const arrowWidth = arrow.offsetWidth || 0;
    const arrowHeight = arrow.offsetHeight || 0;
    const arrowAdjust = arrowWidth / 2;

    // compute tooltip / popover coordinates
    if (['left', 'right'].includes(placement)) { // secondary|side positions
      if (placement === 'left') { // LEFT
        leftPosition = left + scroll.x - tipDimensions.w - (isPopover ? arrowWidth : 0);
      } else { // RIGHT
        leftPosition = left + scroll.x + elemDimensions.w + (isPopover ? arrowWidth : 0);
      }

      // adjust top and arrow
      if (topExceed) {
        topPosition = top + scroll.y;
        arrowTop = elemDimensions.h / 2 - arrowWidth;
      } else if (bottomExceed) {
        topPosition = top + scroll.y - tipDimensions.h + elemDimensions.h;
        arrowTop = tipDimensions.h - elemDimensions.h / 2 - arrowWidth;
      } else {
        topPosition = top + scroll.y - tipDimensions.h / 2 + elemDimensions.h / 2;
        arrowTop = tipDimensions.h / 2 - arrowHeight / 2;
      }
    } else if (['top', 'bottom'].includes(placement)) {
      if (e && isMedia(element)) {
        const eX = !relativeParent ? e.pageX : e.layerX + (absoluteTarget ? element.offsetLeft : 0);
        const eY = !relativeParent ? e.pageY : e.layerY + (absoluteTarget ? element.offsetTop : 0);

        if (placement === 'top') {
          topPosition = eY - tipDimensions.h - (isPopover ? arrowWidth : arrowHeight);
        } else {
          topPosition = eY + arrowHeight;
        }

        // adjust left | right and also the arrow
        if (e.clientX - tipDimensions.w / 2 < leftBoundry) { // when exceeds left
          leftPosition = 0;
          arrowLeft = eX - arrowAdjust;
        } else if (e.clientX + tipDimensions.w * 0.51 >= rightBoundry) { // when exceeds right
          leftPosition = 'auto';
          rightPosition = 0;
          arrowLeft = tipDimensions.w - (rightBoundry - eX) - arrowAdjust;
        } else { // normal top/bottom
          leftPosition = eX - tipDimensions.w / 2;
          arrowLeft = tipDimensions.w / 2 - arrowAdjust;
        }
      } else {
        if (placement === 'top') {
          topPosition = top + scroll.y - tipDimensions.h - (isPopover ? arrowHeight : 0);
        } else { // BOTTOM
          topPosition = top + scroll.y + elemDimensions.h + (isPopover ? arrowHeight : 0);
        }

        // adjust left | right and also the arrow
        if (leftExceed) {
          leftPosition = 0;
          arrowLeft = left + elemDimensions.w / 2 - arrowAdjust;
        } else if (rightExceed) {
          leftPosition = 'auto';
          rightPosition = 0;
          arrowRight = elemDimensions.w / 2 + (parentRect.right - targetRect.right) - arrowAdjust;
        } else {
          leftPosition = left + scroll.x - tipDimensions.w / 2 + elemDimensions.w / 2;
          arrowLeft = tipDimensions.w / 2 - arrowAdjust;
        }
      }
    }

    // apply style to tooltip/popover and its arrow
    tip.style.top = `${topPosition}px`;
    tip.style.left = leftPosition === 'auto' ? leftPosition : `${leftPosition}px`;
    tip.style.right = rightPosition !== undefined ? `${rightPosition}px` : '';
    // update arrow placement or clear side
    if (arrowTop !== undefined) {
      arrow.style.top = `${arrowTop}px`;
    }

    if (arrowLeft !== undefined) {
      arrow.style.left = `${arrowLeft}px`;
    } else if (arrowRight !== undefined) {
      arrow.style.right = `${arrowRight}px`;
    }
  }

  let bsnUID = 1;

  // popover, tooltip, scrollspy need a unique id
  function getUID(element, key) {
    bsnUID += 1;
    return element[key] || bsnUID;
  }

  function getTipContainer(element) {
    // maybe the element is inside a modal
    const modal = element.closest('.modal');

    // OR maybe the element is inside a fixed navbar
    const navbarFixed = element.closest(`.${fixedTopClass},.${fixedBottomClass}`);

    // set default container option appropriate for the context
    return modal || navbarFixed || document.body;
  }

  /* Native JavaScript for Bootstrap 5 | Popover
  ---------------------------------------------- */

  // POPOVER PRIVATE GC
  // ==================
  const popoverString = 'popover';
  const popoverComponent = 'Popover';
  const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
  const popoverDefaultOptions = {
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', // string
    title: null, // string
    content: null, // string
    sanitizeFn: null, // function
    customClass: null, // string
    dismissible: false, // boolean
    animation: true, // boolean
    trigger: 'hover', // string
    placement: 'top', // string
    delay: 200, // number
  };

  // POPOVER PRIVATE GC
  // ==================
  const isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent);
  // popoverArrowClass = `${popoverString}-arrow`,
  const popoverHeaderClass = `${popoverString}-header`;
  const popoverBodyClass = `${popoverString}-body`;
  // close btn for dissmissible popover
  let popoverCloseButton = '<button type="button" class="btn-close"></button>';

  // POPOVER CUSTOM EVENTS
  // =====================
  const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
  const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
  const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
  const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

  // POPOVER EVENT HANDLERS
  // ======================
  function popoverForceFocus() {
    setFocus(this);
  }

  function popoverTouchHandler({ target }) {
    const self = this;
    const { popover, element } = self;

    if ((popover && popover.contains(target)) // popover includes touch target
      || target === element // OR touch target is element
      || element.contains(target)) ; else {
      self.hide();
    }
  }

  // POPOVER PRIVATE METHODS
  // =======================
  function createPopover(self) {
    const { id, options } = self;
    const {
      animation, customClass, sanitizeFn, placement, dismissible,
    } = options;
    let { title, content, template } = options;

    // set initial popover class
    const placementClass = `bs-${popoverString}-${tipClassPositions[placement]}`;

    // fixing #233
    title = title ? title.trim() : null;
    content = content ? content.trim() : null;

    // sanitize title && content
    if (sanitizeFn) {
      title = title ? sanitizeFn(title) : null;
      content = content ? sanitizeFn(content) : null;
      template = template ? sanitizeFn(template) : null;
      popoverCloseButton = sanitizeFn(popoverCloseButton);
    }

    self.popover = document.createElement('div');
    const { popover } = self;

    // set id and aria-describedby
    popover.setAttribute('id', id);
    popover.setAttribute('role', 'tooltip');

    // load template
    const popoverTemplate = document.createElement('div');
    popoverTemplate.innerHTML = template.trim();
    popover.className = popoverTemplate.firstChild.className;
    popover.innerHTML = popoverTemplate.firstChild.innerHTML;

    const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
    const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

    // set arrow
    self.arrow = queryElement(`.${popoverString}-arrow`, popover);

    // set dismissible button
    if (dismissible) {
      title = title ? title + popoverCloseButton : title;
      content = title === null ? +popoverCloseButton : content;
    }

    // fill the template with content from data attributes
    if (title && popoverHeader) popoverHeader.innerHTML = title.trim();
    if (content && popoverBody) popoverBody.innerHTML = content.trim();

    // set popover animation and placement
    if (!hasClass(popover, popoverString)) addClass(popover, popoverString);
    if (animation && !hasClass(popover, fadeClass)) addClass(popover, fadeClass);
    if (customClass && !hasClass(popover, customClass)) {
      addClass(popover, customClass);
    }
    if (!hasClass(popover, placementClass)) addClass(popover, placementClass);
  }

  function removePopover(self) {
    const { element, popover, options } = self;
    element.removeAttribute(ariaDescribedBy);
    options.container.removeChild(popover);
    self.timer = null;
  }

  function togglePopoverHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { element, options } = self;
    const { trigger, dismissible } = options;
    self.enabled = !!add;

    if (trigger === 'hover') {
      element[action]('mousedown', self.show);
      element[action]('mouseenter', self.show);
      if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
      if (!dismissible) element[action]('mouseleave', self.hide);
    } else if (trigger === 'click') {
      element[action](trigger, self.toggle);
    } else if (trigger === 'focus') {
      if (isIphone) element[action]('click', popoverForceFocus);
      element[action]('focusin', self.show);
    }
  }

  function dismissHandlerToggle(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { options, element, popover } = self;
    const { trigger, dismissible } = options;

    if (dismissible) {
      const [btnClose] = popover.getElementsByClassName('btn-close');
      if (btnClose) btnClose[action]('click', self.hide);
    } else {
      if (trigger === 'focus') element[action]('focusout', self.hide);
      if (trigger === 'hover') document[action]('touchstart', popoverTouchHandler, passiveHandler);
    }

    if (!isMedia(element)) {
      window[action]('scroll', self.update, passiveHandler);
      window[action]('resize', self.update, passiveHandler);
    }
  }

  function popoverShowTrigger(self) {
    dismissHandlerToggle(self, 1);
    self.element.dispatchEvent(shownPopoverEvent);
  }

  function popoverHideTrigger(self) {
    dismissHandlerToggle(self);
    removePopover(self);
    self.element.dispatchEvent(hiddenPopoverEvent);
  }

  // POPOVER DEFINITION
  // ==================
  class Popover extends BaseComponent {
    constructor(target, config) {
      popoverDefaultOptions.container = getTipContainer(queryElement(target));
      super(popoverComponent, target, popoverDefaultOptions, config);

      // bind
      const self = this;

      // initialization element
      const { element } = self;
      // additional instance properties
      self.timer = null;
      self.popover = null;
      self.arrow = null;
      self.enabled = false;
      // set unique ID for aria-describedby
      self.id = `${popoverString}-${getUID(element)}`;

      // set instance options
      const { options } = self;

      // media elements only work with body as a container
      self.options.container = isMedia(element)
        ? popoverDefaultOptions.container
        : queryElement(options.container);

      // reset default container
      popoverDefaultOptions.container = null;

      // invalidate when no content is set
      if (!options.content) return;

      // crate popover
      createPopover(self);

      // bind
      self.update = self.update.bind(self);

      // attach event listeners
      togglePopoverHandlers(self, 1);
    }

    update(e) {
      styleTip(this, e);
    }

    // POPOVER PUBLIC METHODS
    // ======================
    toggle(e) {
      const self = e ? this[popoverComponent] : this;
      const { popover, options } = self;
      if (!isVisibleTip(popover, options.container)) self.show();
      else self.hide();
    }

    show(e) {
      const self = e ? this[popoverComponent] : this;
      const {
        element, popover, options, id,
      } = self;
      const { container } = options;

      clearTimeout(self.timer);

      self.timer = setTimeout(() => {
        if (!isVisibleTip(popover, container)) {
          element.dispatchEvent(showPopoverEvent);
          if (showPopoverEvent.defaultPrevented) return;

          // append to the container
          container.appendChild(popover);
          element.setAttribute(ariaDescribedBy, id);

          self.update(e);
          if (!hasClass(popover, showClass)) addClass(popover, showClass);

          if (options.animation) emulateTransitionEnd(popover, () => popoverShowTrigger(self));
          else popoverShowTrigger(self);
        }
      }, 17);
    }

    hide(e) {
      let self;
      if (e && this[popoverComponent]) {
        self = this[popoverComponent];
      } else if (e) { // dismissible popover
        const dPopover = this.closest(`.${popoverString}`);
        const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
        self = dEl[popoverComponent];
      } else {
        self = this;
      }
      const { element, popover, options } = self;

      clearTimeout(self.timer);

      self.timer = setTimeout(() => {
        if (isVisibleTip(popover, options.container)) {
          element.dispatchEvent(hidePopoverEvent);
          if (hidePopoverEvent.defaultPrevented) return;

          removeClass(popover, showClass);

          if (options.animation) emulateTransitionEnd(popover, () => popoverHideTrigger(self));
          else popoverHideTrigger(self);
        }
      }, options.delay + 17);
    }

    enable() {
      const self = this;
      const { enabled } = self;
      if (!enabled) {
        togglePopoverHandlers(self, 1);
        self.enabled = !enabled;
      }
    }

    disable() {
      const self = this;
      const { enabled, popover, options } = self;
      if (enabled) {
        if (isVisibleTip(popover, options.container) && options.animation) {
          self.hide();

          setTimeout(
            () => togglePopoverHandlers(self),
            getElementTransitionDuration(popover) + options.delay + 17,
          );
        } else {
          togglePopoverHandlers(self);
        }
        self.enabled = !enabled;
      }
    }

    toggleEnabled() {
      const self = this;
      if (!self.enabled) self.enable();
      else self.disable();
    }

    dispose() {
      const self = this;
      const { popover, options } = self;
      const { container, animation } = options;
      if (animation && isVisibleTip(popover, container)) {
        options.delay = 0; // reset delay
        self.hide();
        emulateTransitionEnd(popover, () => togglePopoverHandlers(self));
      } else {
        togglePopoverHandlers(self);
      }
      super.dispose(popoverComponent);
    }
  }

  Popover.init = {
    component: popoverComponent,
    selector: popoverSelector,
    constructor: Popover,
  };

  /* Native JavaScript for Bootstrap 5 | ScrollSpy
  ------------------------------------------------ */

  // SCROLLSPY PRIVATE GC
  // ====================
  const scrollspyString = 'scrollspy';
  const scrollspyComponent = 'ScrollSpy';
  const scrollspySelector = '[data-bs-spy="scroll"]';
  const scrollSpyDefaultOptions = {
    offset: 10,
    target: null,
  };

  // SCROLLSPY CUSTOM EVENT
  // ======================
  const activateScrollSpy = bootstrapCustomEvent(`activate.bs.${scrollspyString}`);

  // SCROLLSPY PRIVATE METHODS
  // =========================
  function updateSpyTargets(self) {
    const {
      target, scrollTarget, isWindow, options, itemsLength, scrollHeight,
    } = self;
    const { offset } = options;
    const links = target.getElementsByTagName('A');

    self.scrollTop = isWindow
      ? scrollTarget.pageYOffset
      : scrollTarget.scrollTop;

    // only update items/offsets once or with each mutation
    if (itemsLength !== links.length || getScrollHeight(scrollTarget) !== scrollHeight) {
      let href;
      let targetItem;
      let rect;

      // reset arrays & update
      self.items = [];
      self.offsets = [];
      self.scrollHeight = getScrollHeight(scrollTarget);
      self.maxScroll = self.scrollHeight - getOffsetHeight(self);

      Array.from(links).forEach((link) => {
        href = link.getAttribute('href');
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

        if (targetItem) {
          self.items.push(link);
          rect = targetItem.getBoundingClientRect();
          self.offsets.push((isWindow ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
        }
      });
      self.itemsLength = self.items.length;
    }
  }

  function getScrollHeight(scrollTarget) {
    return scrollTarget.scrollHeight || Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
  }

  function getOffsetHeight({ element, isWindow }) {
    if (!isWindow) return element.getBoundingClientRect().height;
    return window.innerHeight;
  }

  function clear(target) {
    Array.from(target.getElementsByTagName('A')).forEach((item) => {
      if (hasClass(item, activeClass)) removeClass(item, activeClass);
    });
  }

  function activate(self, item) {
    const { target, element } = self;
    clear(target);
    self.activeItem = item;
    addClass(item, activeClass);

    // activate all parents
    const parents = [];
    let parentItem = item;
    while (parentItem !== document.body) {
      parentItem = parentItem.parentNode;
      if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
    }

    parents.forEach((menuItem) => {
      const parentLink = menuItem.previousElementSibling;

      if (parentLink && !hasClass(parentLink, activeClass)) {
        addClass(parentLink, activeClass);
      }
    });

    // update relatedTarget and dispatch
    activateScrollSpy.relatedTarget = item;
    element.dispatchEvent(activateScrollSpy);
  }

  function toggleSpyHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.scrollTarget[action]('scroll', self.refresh, passiveHandler);
  }

  // SCROLLSPY DEFINITION
  // ====================
  class ScrollSpy extends BaseComponent {
    constructor(target, config) {
      super(scrollspyComponent, target, scrollSpyDefaultOptions, config);
      // bind
      const self = this;

      // initialization element & options
      const { element, options } = self;

      // additional properties
      self.target = queryElement(options.target);

      // invalidate
      if (!self.target) return;

      // set initial state
      self.scrollTarget = element.clientHeight < element.scrollHeight ? element : window;
      self.isWindow = self.scrollTarget === window;
      self.scrollTop = 0;
      self.maxScroll = 0;
      self.scrollHeight = 0;
      self.activeItem = null;
      self.items = [];
      self.offsets = [];

      // bind events
      self.refresh = self.refresh.bind(self);

      // add event handlers
      toggleSpyHandlers(self, 1);

      self.refresh();
    }

    // SCROLLSPY PUBLIC METHODS
    // ========================
    refresh() {
      const self = this;
      const { target } = self;

      // check if target is visible and invalidate
      if (target.offsetHeight === 0) return;

      updateSpyTargets(self);

      const {
        scrollTop, maxScroll, itemsLength, items, activeItem,
      } = self;

      if (scrollTop >= maxScroll) {
        const newActiveItem = items[itemsLength - 1];

        if (activeItem !== newActiveItem) {
          activate(self, newActiveItem);
        }
        return;
      }

      const { offsets } = self;

      if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
        self.activeItem = null;
        clear(target);
        return;
      }

      items.forEach((item, i) => {
        if (activeItem !== item && scrollTop >= offsets[i]
          && (typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1])) {
          activate(self, item);
        }
      });
    }

    dispose() {
      toggleSpyHandlers(this);
      super.dispose(scrollspyComponent);
    }
  }

  ScrollSpy.init = {
    component: scrollspyComponent,
    selector: scrollspySelector,
    constructor: ScrollSpy,
  };

  const ariaSelected = 'aria-selected';

  /* Native JavaScript for Bootstrap 5 | Tab
  ------------------------------------------ */

  // TAB PRIVATE GC
  // ================
  const tabString = 'tab';
  const tabComponent = 'Tab';
  const tabSelector = `[${dataBsToggle}="${tabString}"]`;

  // TAB CUSTOM EVENTS
  // =================
  const showTabEvent = bootstrapCustomEvent(`show.bs.${tabString}`);
  const shownTabEvent = bootstrapCustomEvent(`shown.bs.${tabString}`);
  const hideTabEvent = bootstrapCustomEvent(`hide.bs.${tabString}`);
  const hiddenTabEvent = bootstrapCustomEvent(`hidden.bs.${tabString}`);

  let nextTab;
  let nextTabContent;
  let nextTabHeight;
  let activeTab;
  let activeTabContent;
  let tabContainerHeight;
  let tabEqualContents;

  // TAB PRIVATE METHODS
  // ===================
  function triggerTabEnd(self) {
    const { tabContent, nav } = self;
    tabContent.style.height = '';
    removeClass(tabContent, collapsingClass);
    nav.isAnimating = false;
  }

  function triggerTabShow(self) {
    const { tabContent, nav } = self;

    if (tabContent) { // height animation
      if (tabEqualContents) {
        triggerTabEnd(self);
      } else {
        setTimeout(() => { // enables height animation
          tabContent.style.height = `${nextTabHeight}px`; // height animation
          reflow(tabContent);
          emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
        }, 50);
      }
    } else {
      nav.isAnimating = false;
    }
    shownTabEvent.relatedTarget = activeTab;
    nextTab.dispatchEvent(shownTabEvent);
  }

  function triggerTabHide(self) {
    const { tabContent } = self;
    if (tabContent) {
      activeTabContent.style.float = 'left';
      nextTabContent.style.float = 'left';
      tabContainerHeight = activeTabContent.scrollHeight;
    }

    // update relatedTarget and dispatch event
    showTabEvent.relatedTarget = activeTab;
    hiddenTabEvent.relatedTarget = nextTab;
    nextTab.dispatchEvent(showTabEvent);
    if (showTabEvent.defaultPrevented) return;

    addClass(nextTabContent, activeClass);
    removeClass(activeTabContent, activeClass);

    if (tabContent) {
      nextTabHeight = nextTabContent.scrollHeight;
      tabEqualContents = nextTabHeight === tabContainerHeight;
      addClass(tabContent, collapsingClass);
      tabContent.style.height = `${tabContainerHeight}px`; // height animation
      reflow(tabContent);
      activeTabContent.style.float = '';
      nextTabContent.style.float = '';
    }

    if (hasClass(nextTabContent, fadeClass)) {
      setTimeout(() => {
        addClass(nextTabContent, showClass);
        emulateTransitionEnd(nextTabContent, () => {
          triggerTabShow(self);
        });
      }, 20);
    } else { triggerTabShow(self); }

    activeTab.dispatchEvent(hiddenTabEvent);
  }

  function getActiveTab({ nav }) {
    const activeTabs = nav.getElementsByClassName(activeClass);

    if (activeTabs.length === 1
      && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentNode, c))) {
      [activeTab] = activeTabs;
    } else if (activeTabs.length > 1) {
      activeTab = activeTabs[activeTabs.length - 1];
    }
    return activeTab;
  }

  function getActiveTabContent(self) {
    return queryElement(getActiveTab(self).getAttribute('href'));
  }

  function toggleTabHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.element[action]('click', tabClickHandler);
  }

  // TAB EVENT HANDLER
  // =================
  function tabClickHandler(e) {
    const self = this[tabComponent];
    e.preventDefault();
    if (!self.nav.isAnimating) self.show();
  }

  // TAB DEFINITION
  // ==============
  class Tab extends BaseComponent {
    constructor(target) {
      super(tabComponent, target);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // event targets
      self.nav = element.closest('.nav');
      const { nav } = self;
      self.dropdown = nav && queryElement(`.${dropdownMenuClasses[0]}-toggle`, nav);
      activeTabContent = getActiveTabContent(self);
      self.tabContent = supportTransition && activeTabContent.closest('.tab-content');
      tabContainerHeight = activeTabContent.scrollHeight;

      // set default animation state
      nav.isAnimating = false;

      // add event listener
      toggleTabHandler(self, 1);
    }

    // TAB PUBLIC METHODS
    // ==================
    show() { // the tab we clicked is now the nextTab tab
      const self = this;
      const { element, nav, dropdown } = self;
      nextTab = element;
      if (!hasClass(nextTab, activeClass)) {
        // this is the actual object, the nextTab tab content to activate
        nextTabContent = queryElement(nextTab.getAttribute('href'));
        activeTab = getActiveTab({ nav });
        activeTabContent = getActiveTabContent({ nav });

        // update relatedTarget and dispatch
        hideTabEvent.relatedTarget = nextTab;
        activeTab.dispatchEvent(hideTabEvent);
        if (hideTabEvent.defaultPrevented) return;

        nav.isAnimating = true;
        removeClass(activeTab, activeClass);
        activeTab.setAttribute(ariaSelected, 'false');
        addClass(nextTab, activeClass);
        nextTab.setAttribute(ariaSelected, 'true');

        if (dropdown) {
          if (!hasClass(element.parentNode, dropdownMenuClass)) {
            if (hasClass(dropdown, activeClass)) removeClass(dropdown, activeClass);
          } else if (!hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
        }

        if (hasClass(activeTabContent, fadeClass)) {
          removeClass(activeTabContent, showClass);
          emulateTransitionEnd(activeTabContent, () => triggerTabHide(self));
        } else {
          triggerTabHide(self);
        }
      }
    }

    dispose() {
      toggleTabHandler(this);
      super.dispose(tabComponent);
    }
  }

  Tab.init = {
    component: tabComponent,
    selector: tabSelector,
    constructor: Tab,
  };

  /* Native JavaScript for Bootstrap 5 | Toast
  -------------------------------------------- */

  // TOAST PRIVATE GC
  // ================
  const toastString = 'toast';
  const toastComponent = 'Toast';
  const toastSelector = `.${toastString}`;
  const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
  const showingClass = 'showing';
  const hideClass = 'hide';
  const toastDefaultOptions = {
    animation: true,
    autohide: true,
    delay: 500,
  };

  // TOAST CUSTOM EVENTS
  // ===================
  const showToastEvent = bootstrapCustomEvent(`show.bs.${toastString}`);
  const hideToastEvent = bootstrapCustomEvent(`hide.bs.${toastString}`);
  const shownToastEvent = bootstrapCustomEvent(`shown.bs.${toastString}`);
  const hiddenToastEvent = bootstrapCustomEvent(`hidden.bs.${toastString}`);

  // TOAST PRIVATE METHODS
  // =====================
  function showToastComplete(self) {
    const { element, options } = self;
    if (!options.animation) {
      removeClass(element, showingClass);
      addClass(element, showClass);
    }

    element.dispatchEvent(shownToastEvent);
    if (options.autohide) self.hide();
  }

  function hideToastComplete(self) {
    const { element } = self;
    addClass(element, hideClass);
    element.dispatchEvent(hiddenToastEvent);
  }

  function closeToast(self) {
    const { element, options } = self;
    removeClass(element, showClass);

    if (options.animation) {
      reflow(element);
      emulateTransitionEnd(element, () => hideToastComplete(self));
    } else {
      hideToastComplete(self);
    }
  }

  function openToast(self) {
    const { element, options } = self;
    removeClass(element, hideClass);

    if (options.animation) {
      reflow(element);
      addClass(element, showingClass);
      addClass(element, showClass);

      emulateTransitionEnd(element, () => showToastComplete(self));
    } else {
      showToastComplete(self);
    }
  }

  function toggleToastHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    if (self.dismiss) {
      self.dismiss[action]('click', self.hide);
    }
  }

  // TOAST EVENT HANDLERS
  // ====================
  function completeDisposeToast(self) {
    clearTimeout(self.timer);
    toggleToastHandler(self);
  }

  // TOAST DEFINITION
  // ================
  class Toast extends BaseComponent {
    constructor(target, config) {
      super(toastComponent, target, toastDefaultOptions, config);
      // bind
      const self = this;

      // dismiss button
      self.dismiss = queryElement(toastDismissSelector, self.element);

      // bind
      self.show = self.show.bind(self);
      self.hide = self.hide.bind(self);

      // add event listener
      toggleToastHandler(self, 1);
    }

    // TOAST PUBLIC METHODS
    // ====================
    show() {
      const self = this;
      const { element } = self;
      if (element && hasClass(element, hideClass)) {
        element.dispatchEvent(showToastEvent);
        if (showToastEvent.defaultPrevented) return;

        addClass(element, fadeClass);
        clearTimeout(self.timer);
        self.timer = setTimeout(() => openToast(self), 10);
      }
    }

    hide(noTimer) {
      const self = this;
      const { element, options } = self;

      if (element && hasClass(element, showClass)) {
        element.dispatchEvent(hideToastEvent);
        if (hideToastEvent.defaultPrevented) return;

        clearTimeout(self.timer);
        self.timer = setTimeout(
          closeToast(self),
          noTimer ? 10 : options.delay,
        );
      }
    }

    dispose() {
      const self = this;
      const { element, options } = self;
      self.hide();

      if (options.animation) emulateTransitionEnd(element, () => completeDisposeToast(self));
      else completeDisposeToast(self);

      super.dispose(toastComponent);
    }
  }

  Toast.init = {
    component: toastComponent,
    selector: toastSelector,
    constructor: Toast,
  };

  const dataOriginalTitle = 'data-original-title';

  /* Native JavaScript for Bootstrap 5 | Tooltip
  ---------------------------------------------- */

  // TOOLTIP PRIVATE GC
  // ==================
  const tooltipString = 'tooltip';
  const tooltipComponent = 'Tooltip';
  const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;

  const titleAttr = 'title';
  const tooltipInnerClass = `${tooltipString}-inner`;
  const tooltipDefaultOptions = {
    title: null,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    placement: 'top',
    animation: true,
    customClass: null,
    delay: 200,
    sanitizeFn: null,
  };

  // TOOLTIP CUSTOM EVENTS
  // =====================
  const showTooltipEvent = bootstrapCustomEvent(`show.bs.${tooltipString}`);
  const shownTooltipEvent = bootstrapCustomEvent(`shown.bs.${tooltipString}`);
  const hideTooltipEvent = bootstrapCustomEvent(`hide.bs.${tooltipString}`);
  const hiddenTooltipEvent = bootstrapCustomEvent(`hidden.bs.${tooltipString}`);

  // TOOLTIP PRIVATE METHODS
  // =======================
  function createTooltip(self) {
    const { options, id } = self;
    const placementClass = `bs-${tooltipString}-${tipClassPositions[options.placement]}`;
    let titleString = options.title.trim();

    // sanitize stuff
    if (options.sanitizeFn) {
      titleString = options.sanitizeFn(titleString);
      options.template = options.sanitizeFn(options.template);
    }

    if (!titleString) return;

    // create tooltip
    self.tooltip = document.createElement('div');
    const { tooltip } = self;

    // set aria
    tooltip.setAttribute('id', id);

    // set markup
    const tooltipMarkup = document.createElement('div');
    tooltipMarkup.innerHTML = options.template.trim();

    tooltip.className = tooltipMarkup.firstChild.className;
    tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

    queryElement(`.${tooltipInnerClass}`, tooltip).innerHTML = titleString;

    // set arrow
    self.arrow = queryElement(`.${tooltipString}-arrow`, tooltip);

    // set class and role attribute
    tooltip.setAttribute('role', tooltipString);
    // set classes
    if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
    if (options.animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
    if (options.customClass && !hasClass(tooltip, options.customClass)) {
      addClass(tooltip, options.customClass);
    }
    if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
  }

  function removeTooltip(self) {
    const { element, options, tooltip } = self;
    element.removeAttribute(ariaDescribedBy);
    options.container.removeChild(tooltip);
    self.timer = null;
  }

  function disposeTooltipComplete(self) {
    const { element } = self;
    toggleTooltipHandlers(self);
    if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
  }
  function toggleTooltipAction(self, add) {
    const action = add ? addEventListener : removeEventListener;

    document[action]('touchstart', tooltipTouchHandler, passiveHandler);

    if (!isMedia(self.element)) {
      window[action]('scroll', self.update, passiveHandler);
      window[action]('resize', self.update, passiveHandler);
    }
  }
  function tooltipShownAction(self) {
    toggleTooltipAction(self, 1);
    self.element.dispatchEvent(shownTooltipEvent);
  }
  function tooltipHiddenAction(self) {
    toggleTooltipAction(self);
    removeTooltip(self);
    self.element.dispatchEvent(hiddenTooltipEvent);
  }
  function toggleTooltipHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { element } = self;

    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    element[action]('mousedown', self.show);
    element[action]('mouseenter', self.show);
    element[action]('mouseleave', self.hide);
  }

  function toggleTooltipTitle(self, content) {
    // [0 - add, 1 - remove] | [0 - remove, 1 - add]
    const titleAtt = [dataOriginalTitle, titleAttr];
    const { element } = self;

    element.setAttribute(titleAtt[content ? 0 : 1],
      (content || element.getAttribute(titleAtt[0])));
    element.removeAttribute(titleAtt[content ? 1 : 0]);
  }

  // TOOLTIP EVENT HANDLERS
  // ======================
  function tooltipTouchHandler({ target }) {
    const { tooltip, element } = this;
    if (tooltip.contains(target) || target === element || element.contains(target)) ; else {
      this.hide();
    }
  }

  // TOOLTIP DEFINITION
  // ==================
  class Tooltip extends BaseComponent {
    constructor(target, config) {
      // initialization element
      const element = queryElement(target);
      tooltipDefaultOptions.title = element.getAttribute(titleAttr);
      tooltipDefaultOptions.container = getTipContainer(element);
      super(tooltipComponent, element, tooltipDefaultOptions, config);

      // bind
      const self = this;

      // additional properties
      self.tooltip = null;
      self.arrow = null;
      self.timer = null;
      self.enabled = false;

      // instance options
      const { options } = self;

      // media elements only work with body as a container
      self.options.container = isMedia(element)
        ? tooltipDefaultOptions.container
        : queryElement(options.container);

      // reset default options
      tooltipDefaultOptions.container = null;
      tooltipDefaultOptions[titleAttr] = null;

      // invalidate
      if (!options.title) return;

      // all functions bind
      tooltipTouchHandler.bind(self);
      self.update = self.update.bind(self);

      // set title attributes and add event listeners
      if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

      // create tooltip here
      self.id = `${tooltipString}-${getUID(element)}`;
      createTooltip(self);

      // attach events
      toggleTooltipHandlers(self, 1);
    }

    // TOOLTIP PUBLIC METHODS
    // ======================
    show(e) {
      const self = e ? this[tooltipComponent] : this;
      const {
        options, tooltip, element, id,
      } = self;
      clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        if (!isVisibleTip(tooltip, options.container)) {
          element.dispatchEvent(showTooltipEvent);
          if (showTooltipEvent.defaultPrevented) return;

          // append to container
          options.container.appendChild(tooltip);
          element.setAttribute(ariaDescribedBy, id);

          self.update(e);
          if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
          if (options.animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
          else tooltipShownAction(self);
        }
      }, 20);
    }

    hide(e) {
      const self = e ? this[tooltipComponent] : this;
      const { options, tooltip, element } = self;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        if (isVisibleTip(tooltip, options.container)) {
          element.dispatchEvent(hideTooltipEvent);
          if (hideTooltipEvent.defaultPrevented) return;

          removeClass(tooltip, showClass);
          if (options.animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
          else tooltipHiddenAction(self);
        }
      }, options.delay);
    }

    update(e) {
      styleTip(this, e);
    }

    toggle() {
      const self = this;
      const { tooltip, options } = self;
      if (!isVisibleTip(tooltip, options.container)) self.show();
      else self.hide();
    }

    enable() {
      const self = this;
      const { enabled } = self;
      if (!enabled) {
        toggleTooltipHandlers(self, 1);
        self.enabled = !enabled;
      }
    }

    disable() {
      const self = this;
      const { tooltip, options, enabled } = self;
      if (enabled) {
        if (!isVisibleTip(tooltip, options.container) && options.animation) {
          self.hide();

          setTimeout(
            () => toggleTooltipHandlers(self),
            getElementTransitionDuration(tooltip) + options.delay + 17,
          );
        } else {
          toggleTooltipHandlers(self);
        }
        self.enabled = !enabled;
      }
    }

    toggleEnabled() {
      const self = this;
      if (!self.enabled) self.enable();
      else self.disable();
    }

    dispose() {
      const self = this;
      const { tooltip, options } = self;

      if (options.animation && isVisibleTip(tooltip, options.container)) {
        options.delay = 0; // reset delay
        self.hide();
        emulateTransitionEnd(tooltip, () => disposeTooltipComplete(self));
      } else {
        disposeTooltipComplete(self);
      }
      super.dispose(tooltipComponent);
    }
  }

  Tooltip.init = {
    component: tooltipComponent,
    selector: tooltipSelector,
    constructor: Tooltip,
  };

  var version = "3.0.15";

  // import { alertInit } from '../components/alert-native.js';
  // import { buttonInit } from '../components/button-native.js';
  // import { carouselInit } from '../components/carousel-native.js';
  // import { collapseInit } from '../components/collapse-native.js';
  // import { dropdownInit } from '../components/dropdown-native.js';
  // import { modalInit } from '../components/modal-native.js';
  // import { offcanvasInit } from '../components/offcanvas-native.js';
  // import { popoverInit } from '../components/popover-native.js';
  // import { scrollSpyInit } from '../components/scrollspy-native.js';
  // import { tabInit } from '../components/tab-native.js';
  // import { toastInit } from '../components/toast-native.js';
  // import { tooltipInit } from '../components/tooltip-native.js';

  const componentsInit = {
    Alert: Alert.init,
    Button: Button.init,
    Carousel: Carousel.init,
    Collapse: Collapse.init,
    Dropdown: Dropdown.init,
    Modal: Modal.init,
    Offcanvas: Offcanvas.init,
    Popover: Popover.init,
    ScrollSpy: ScrollSpy.init,
    Tab: Tab.init,
    Toast: Toast.init,
    Tooltip: Tooltip.init,
  };

  function initializeDataAPI(Konstructor, collection) {
    Array.from(collection).forEach((x) => new Konstructor(x));
  }

  function initCallback(context) {
    const lookUp = context instanceof Element ? context : document;

    Object.keys(componentsInit).forEach((comp) => {
      const { constructor, selector } = componentsInit[comp];
      initializeDataAPI(constructor, lookUp.querySelectorAll(selector));
    });
  }

  // bulk initialize all components
  if (document.body) initCallback();
  else {
    document.addEventListener('DOMContentLoaded', () => initCallback(), { once: true });
  }

  var index = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip,

    initCallback,
    Version: version,
  };

  return index;

})));
(function(){
  var ajaxErr, ld$obj, ld$, k, ref$, v, ns, xhrpar, fetch;
  if (!(typeof ld$ != 'undefined' && ld$ !== null)) {
    ajaxErr = function(s, d, j){
      var ref$;
      return ref$ = new Error(s + " " + d), ref$.data = d, ref$.json = j, ref$.id = s, ref$.code = s, ref$.name = 'lderror', ref$.message = d, ref$;
    };
    ld$obj = function(dom){
      return import$(dom, ld$obj.prototype);
    };
    ld$ = function(it){
      return new ld$obj(it);
    };
    ld$obj.prototype = {
      find: function(s, n){
        var r, ref$, ret, e;
        if (!(r = this).querySelector) {
          ref$ = [document, r.toString(), s], r = ref$[0], s = ref$[1], n = ref$[2];
        }
        if (s instanceof HTMLElement) {
          return s;
        }
        try {
          if (n === 0) {
            return r.querySelector(s);
          }
          ret = Array.from(r.querySelectorAll(s));
          if (n) {
            return ret[n];
          } else {
            return ret;
          }
        } catch (e$) {
          e = e$;
          console.warn("ld$.find exception: " + s + " / " + n + " under ", r);
          throw e;
        }
      },
      index: function(){
        return Array.from(this.parentNode.childNodes).indexOf(this);
      },
      child: function(){
        return Array.from(this.childNodes);
      },
      parent: function(s, e){
        var n;
        e == null && (e = null);
        n = this;
        while (n && n !== e) {
          n = n.parentNode;
        }
        if (n !== e) {
          return null;
        }
        if (!s) {
          return this;
        }
        n = this;
        while (n && n !== e && (!n.matches || (n.matches && !n.matches(s)))) {
          n = n.parentNode;
        }
        if (n === e && (!e || !e.matches || !e.matches(s))) {
          return null;
        }
        return n;
      },
      cls: function(o, p, n){
        var k, v, i$, ref$, len$, ref1$, l, results$ = [], results1$ = [], this$ = this;
        if (typeof o === 'object') {
          for (k in o) {
            v = o[k];
            results$.push(this.classList[v ? 'add' : 'remove'](k));
          }
          return results$;
        } else {
          for (i$ = 0, len$ = (ref$ = [[p, !!o], [n, !o]]).length; i$ < len$; ++i$) {
            ref1$ = ref$[i$], l = ref1$[0], v = ref1$[1];
            results1$.push((Array.isArray(l)
              ? l
              : [l]).map(fn$));
          }
          return results1$;
        }
        function fn$(it){
          return this$.classList.toggle(it, v);
        }
      },
      attr: function(n, v){
        var k, results$ = [];
        if (typeof n === 'object') {
          for (k in n) {
            v = n[k];
            results$.push(this.setAttribute(k, v));
          }
          return results$;
        } else if (v == null) {
          return this.getAttribute(n);
        } else {
          return this.setAttribute(n, v);
        }
      },
      on: function(n, cb){
        return this.addEventListener(n, cb);
      },
      remove: function(){
        if (this.parentNode) {
          return this.parentNode.removeChild(this);
        }
      },
      insertAfter: function(n, s){
        return this.insertBefore(n, s.nextSibling);
      }
    };
    for (k in ref$ = ld$obj.prototype) {
      v = ref$[k];
      fn$(k, v);
    }
    ns = {
      svg: "http://www.w3.org/2000/svg"
    };
    xhrpar = function(u, o, p){
      var c, that, k, v;
      c = import$({
        credentials: 'same-origin'
      }, o);
      if (p.json) {
        c.body = JSON.stringify(p.json);
        (c.headers || (c.headers = {}))['Content-Type'] = 'application/json; charset=UTF-8';
      }
      if (that = p.params) {
        u = u + ("?" + (function(){
          var ref$, results$ = [];
          for (k in ref$ = that) {
            v = ref$[k];
            results$.push(k + "=" + encodeURIComponent(v));
          }
          return results$;
        }()).join('&'));
      }
      if (ld$.fetch.headers && !p.noDefaultHeaders) {
        import$(c.headers || (c.headers = {}), ld$.fetch.headers);
      }
      return {
        c: c,
        u: u
      };
    };
    import$(ld$, {
      json: function(v){
        var e;
        try {
          return JSON.parse(v);
        } catch (e$) {
          e = e$;
          return v;
        }
      },
      fetch: function(url, o, opt){
        o == null && (o = {});
        opt == null && (opt = {});
        return new Promise(function(res, rej){
          var ref$, u, c, h;
          ref$ = xhrpar(url, o, opt), u = ref$.u, c = ref$.c;
          h = setTimeout(function(){
            rej(ajaxErr(1006, "timeout"));
            return h = null;
          }, opt.timeout || 40 * 1000);
          return fetch(u, c).then(function(v){
            if (!h) {
              return;
            }
            clearTimeout(h);
            if (!(v && v.ok)) {
              return v.clone().text().then(function(t){
                var withHeaders, json, e;
                withHeaders = function(e){
                  return Object.defineProperty(e, 'headers', {
                    value: v.headers,
                    enumerable: false
                  });
                };
                try {
                  json = JSON.parse(t);
                  if (json && json.name === 'lderror') {
                    return rej(withHeaders(import$(ajaxErr(v.status, t), json)));
                  }
                } catch (e$) {
                  e = e$;
                  json = null;
                }
                return rej(withHeaders(ajaxErr(v.status, t, json)));
              });
            } else {
              return res(opt.type != null ? v[opt.type]() : v);
            }
          })['catch'](function(e){
            clearTimeout(h);
            return rej(e);
          });
        });
      },
      create: function(o){
        var n, k, v;
        n = o.ns
          ? document.createElementNS(ns[o.ns] || o.ns, o.name)
          : document.createElement(o.name);
        if (o.style) {
          import$(n.style, o.style);
        }
        if (o.attr) {
          (function(){
            var ref$, results$ = [];
            for (k in ref$ = o.attr) {
              v = ref$[k];
              results$.push([k, v]);
            }
            return results$;
          }()).map(function(p){
            return n.setAttribute(p[0], p[1]);
          });
        }
        if (o.className) {
          n.classList.add.apply(n.classList, o.className);
        }
        if (o.text) {
          n.appendChild(document.createTextNode(o.text));
        }
        if (o.html) {
          n.innerHTML = o.html;
        }
        return n;
      }
    });
    ld$.xhr = function(url, o, opt){
      o == null && (o = {});
      opt == null && (opt = {});
      return new Promise(function(res, rej){
        var ref$, u, c, x, done, p, k, v;
        ref$ = xhrpar(url, o, opt), u = ref$.u, c = ref$.c;
        x = new XMLHttpRequest();
        done = false;
        x.onreadystatechange = function(){
          var ret, e;
          if (x.readyState === XMLHttpRequest.DONE) {
            if (done) {
              return;
            }
            done = true;
            if (+x.status >= 200 && +x.status < 300) {
              try {
                ret = opt.type === 'json' && x.responseText
                  ? JSON.parse(x.responseText)
                  : x.responseText;
              } catch (e$) {
                e = e$;
                return rej(ajaxErr(x.status, x.responseText));
              }
              return res(ret);
            } else {
              return rej(ajaxErr(x.status, x.responseText));
            }
          }
        };
        x.onloadstart = function(){
          if (opt.progress) {
            return opt.progress({
              percent: 0,
              val: 0,
              len: 0
            });
          }
        };
        x.onerror = function(){
          if (!done) {
            done = true;
            return rej(ajaxErr(1046));
          }
        };
        x.onabort = function(){
          if (!done) {
            done = true;
            return rej(ajaxErr(1047));
          }
        };
        x.ontimeout = function(){
          if (!done) {
            done = true;
            return rej(ajaxErr(1006));
          }
        };
        if (opt.progress) {
          p = function(evt){
            var ref$, val, len;
            ref$ = [evt.loaded, evt.total], val = ref$[0], len = ref$[1];
            return opt.progress({
              percent: val / len,
              val: val,
              len: len
            });
          };
          if (x.upload) {
            x.upload.onprogress = p;
          } else {
            x.onprogress = p;
          }
        }
        x.open(c.method || 'GET', u, true);
        for (k in ref$ = c.headers || {}) {
          v = ref$[k];
          x.setRequestHeader(k, v);
        }
        return x.send(c.body);
      });
    };
    ld$.fetch.headers = {};
    if (typeof window != 'undefined' && window !== null) {
      window.ld$ = ld$;
      fetch = window.fetch;
    }
    if (typeof module != 'undefined' && module !== null) {
      if (fetch == null) {
        fetch = require("node-fetch");
      }
      module.exports = ld$;
    }
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function fn$(k, v){
    return ld$[k] = function(z){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return v.apply(z, args);
    };
  }
}).call(this);
// Generated by LiveScript 1.3.1
var slice$ = [].slice;
(function(){
  var debounce;
  debounce = function(f, o){
    var ref$, l, ret;
    if (typeof f === 'number' && !(o != null)) {
      return new Promise(function(res, rej){
        return setTimeout(function(){
          return res();
        }, f);
      });
    }
    if (typeof o === 'function') {
      ref$ = [o, f], f = ref$[0], o = ref$[1];
    }
    if (!o) {
      o = {};
    }
    ref$ = typeof f === 'object'
      ? [f.func, f]
      : [
        f, {
          delay: typeof o === 'object' ? o.delay || 750 : o
        }
      ], f = ref$[0], o = ref$[1];
    l = {};
    ret = function(){
      var args, used, delay, p, this$ = this;
      args = slice$.call(arguments);
      used = false;
      delay = ret.delay.value || o.delay || 750;
      ret.delay.value = 0;
      p = new Promise(function(res, rej){
        if (used) {
          return;
        }
        if (l.h) {
          ret.clear();
        }
        l.res = res;
        l.rej = rej;
        return l.h = setTimeout(function(){
          var ret;
          ret = f.apply(this$, args);
          if (ret && typeof ret.then === 'function') {
            ret.then(function(){
              var args;
              args = slice$.call(arguments);
              return res.apply(null, args);
            });
          } else {
            res(ret);
          }
          return l.res = null, l.rej = null, l.h = 0, l;
        }, delay);
      });
      p.now = function(){
        used = true;
        ret.clear();
        return f.apply(this$, args);
      };
      p.cancel = function(){
        return ret.clear();
      };
      return p;
    };
    ret.clear = function(){
      clearTimeout(l.h);
      if (l.res) {
        l.res(null);
      }
      return l.h = 0, l.res = null, l.rej = null, l;
    };
    ret.delay = function(it){
      ret.delay.value = it;
      return ret;
    };
    return ret;
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = debounce;
  }
  if (typeof window != 'undefined' && window !== null) {
    return window.debounce = debounce;
  }
})();
(function(){
  var local, lda, ldc;
  local = {};
  window.lda = lda = {};
  window.ldc = ldc = {
    module: {},
    register: function(n, d, f){
      var ret;
      if (Array.isArray(n)) {
        this.apps.push(ret = {
          f: d,
          d: n
        });
      } else {
        ret = this.module[n] = {
          f: f,
          d: d
        };
      }
      return ret;
    },
    evtHandler: {},
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    actHandler: {},
    action: function(n, cb){
      var ref$;
      if (typeof n === 'object') {
        if (!local.name) {
          console.warn("ldc.action(): Action registered after module initialization will be anonymous actions.");
          console.warn("You can name the action set explicitly if you have to do this.");
          console.warn("e.g., ldc.action('name', { actions ... });");
          console.warn("related action object: ", n);
        }
        if (local.name) {
          return lda[local.name] = n;
        }
      } else if (typeof cb === 'object') {
        return lda[n] = cb;
      } else {
        return ((ref$ = this.actHandler)[n] || (ref$[n] = [])).push(cb);
      }
    },
    act: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.actHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    apps: [],
    app: function(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return this.apps = this.apps.concat(args);
    },
    init: function(ns){
      var _, i$, len$, k, this$ = this, results$ = [];
      _ = function(param){
        var ref$, p, name, m, i$, len$, n;
        ref$ = typeof param === 'object'
          ? [{}, "", param]
          : [{}, param, this$.module[param]], p = ref$[0], name = ref$[1], m = ref$[2];
        if (!m) {
          return null;
        }
        if (m.o) {
          return m.o;
        }
        if (m.state === 'initing') {
          throw new Error("circular dependency");
        }
        m.state = 'initing';
        for (i$ = 0, len$ = (ref$ = m.d).length; i$ < len$; ++i$) {
          n = ref$[i$];
          p[n] = _(n);
        }
        m.state = 'inited';
        local.name = name;
        m.o = m.f.call(m._o = {}, p);
        local.name = null;
        return m.o;
      };
      ns = !ns
        ? this.apps
        : Array.isArray(ns)
          ? ns
          : [ns];
      for (i$ = 0, len$ = ns.length; i$ < len$; ++i$) {
        k = ns[i$];
        results$.push(_(k));
      }
      return results$;
    },
    run: function(n){
      this.init(n);
      return null;
    }
  };
  window.addEventListener('DOMContentLoaded', function(){
    return ldc.init();
  });
}).call(this);
(function(){
  var _, proxise;
  _ = function(q, v, n){
    return q.splice(0, q.length).map(function(o){
      o[n](v);
      if (o.timeout) {
        return clearTimeout(o.timeout);
      }
    });
  };
  proxise = function(a, b){
    var ref$, f, timeout, q, ret;
    ref$ = a instanceof Function
      ? [a, b || 0]
      : [b, a || 0], f = ref$[0], timeout = ref$[1];
    q = [];
    ret = function(){
      var args, res$, i$, to$, r, pair, handle;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      if ((r = f.apply(this, args)) instanceof Promise) {
        return r;
      } else {
        pair = null;
        handle = timeout ? setTimeout(function(){
          var idx;
          if (!(pair && ~(idx = q.indexOf(pair)))) {
            return;
          }
          q.splice(idx, 1);
          return pair.rej(new Error("timeout"));
        }, timeout) : null;
        return new Promise(function(res, rej){
          return q.push(pair = {
            res: res,
            rej: rej,
            timeout: handle
          });
        });
      }
    };
    ret.resolve = function(v){
      return _(q, v, 'res');
    };
    ret.reject = function(v){
      return _(q, v, 'rej');
    };
    return ret;
  };
  proxise.once = function(cb, v){
    var lc, ret;
    lc = {};
    return ret = proxise(function(){
      var args, res$, i$, to$, this$ = this;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      if (lc.inited) {
        return Promise.resolve(!(v != null)
          ? lc.val
          : typeof v === 'function' ? v() : v);
      }
      if (lc.initing) {
        return;
      }
      lc.initing = true;
      return Promise.resolve().then(function(){
        return cb.apply(this$, args);
      })['finally'](function(){
        return lc.initing = false;
      }).then(function(val){
        lc.inited = true;
        ret.resolve(val = !(v != null)
          ? lc.val = val
          : typeof v === 'function' ? v() : v);
        return val;
      })['catch'](function(it){
        ret.reject(it);
        return Promise.reject(it);
      });
    });
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = proxise;
  } else if (typeof window != 'undefined' && window !== null) {
    window.proxise = proxise;
  }
}).call(this);
(function(){
  var ldloader;
  ldloader = function(opt){
    var this$ = this;
    opt == null && (opt = {});
    this.opt = import$({
      activeClass: 'running',
      baseZ: 4000,
      autoZ: false,
      className: '',
      atomic: true
    }, opt);
    this._toggler = typeof opt.toggler === 'function'
      ? opt.toggler
      : function(){};
    if (opt.zmgr) {
      this.zmgr(opt.zmgr);
    }
    ['root', 'container'].map(function(n){
      var list;
      if (opt[n]) {
        list = Array.isArray(opt[n])
          ? opt[n]
          : opt[n] instanceof NodeList
            ? Array.from(opt[n])
            : [opt[n]];
        return this$[n] = list.map(function(it){
          var ret;
          ret = typeof it === 'string' ? document.querySelector(it) : it;
          if (!ret) {
            console.warn("[ldloader] warning: no node found for " + it);
          }
          return ret;
        });
      }
    });
    if (!this.container) {
      this.container = this.root
        ? this.root.map(function(it){
          return it.parentNode;
        })
        : [document.body];
    }
    if (!this.root) {
      this.root = this.container.map(function(it){
        var node;
        node = document.createElement("div");
        it.appendChild(node);
        return node;
      });
    }
    this.root.map(function(it){
      it.classList.add.apply(it.classList, (this$.opt.className || '').split(' ').filter(function(it){
        return it;
      }));
      it.classList.remove(opt.activeClass);
      if (opt.inactiveClass) {
        return it.classList.add(opt.inactiveClass);
      }
    });
    this.running = false;
    this.count = 0;
    return this;
  };
  ldloader.prototype = import$(Object.create(Object.prototype), {
    zmgr: function(it){
      if (it != null) {
        return this._zmgr = it;
      } else {
        return this._zmgr;
      }
    },
    isOn: function(){
      return this.running;
    },
    on: function(delay){
      delay == null && (delay = 0);
      return this.toggle(true, delay);
    },
    off: function(delay, force){
      delay == null && (delay = 0);
      force == null && (force = false);
      return this.toggle(false, delay, force);
    },
    cancel: function(v){
      clearTimeout(this.handle);
      if (v != null) {
        return this.toggle(v);
      }
    },
    flash: function(dur, delay){
      var this$ = this;
      dur == null && (dur = 1000);
      delay == null && (delay = 0);
      return this.toggle(true, delay).then(function(){
        return this$.toggle(false, dur + delay);
      });
    },
    render: function(){
      var runid, _, ret, this$ = this;
      if (!(this.running && this.opt.ctrl && this.opt.ctrl.step)) {
        return this.render.runid = -1;
      }
      this.render.runid = runid = Math.random();
      this.render.start = 0;
      if (this.opt.ctrl.init) {
        this.root.map(function(it){
          return this$.opt.ctrl.init.call(it);
        });
      }
      _ = function(t){
        if (!this$.render.start) {
          this$.render.start = t;
        }
        this$.root.map(function(it){
          return this$.opt.ctrl.step.call(it, t - this$.render.start);
        });
        if (this$.render.runid === runid) {
          return requestAnimationFrame(function(it){
            return _(it);
          });
        } else if (this$.opt.ctrl.done) {
          return this$.root.map(function(it){
            return this$.opt.ctrl.done.call(it, t - this$.render.start);
          });
        }
      };
      return ret = requestAnimationFrame(function(it){
        return _(it);
      });
    },
    toggle: function(v, delay, force){
      var d, ret, this$ = this;
      delay == null && (delay = 0);
      force == null && (force = false);
      d = !(v != null)
        ? this.root[0].classList.contains(this.opt.activeClass) ? -1 : 1
        : v
          ? 1
          : -1;
      if (this.handle) {
        this.cancel();
      }
      if (delay) {
        return new Promise(function(res, rej){
          return this$.handle = setTimeout(function(){
            return this$.toggle(v).then(function(){
              return res();
            });
          }, delay);
        });
      }
      ret = new Promise(function(res, rej){
        var ref$, running, zmgr;
        this$.count = (ref$ = this$.count + d) > 0 ? ref$ : 0;
        if (!force && !this$.opt.atomic && (this$.count >= 2 || (this$.count === 1 && d < 0))) {
          return res();
        }
        this$.root.map(function(it){
          it.classList.toggle(this$.opt.activeClass, d > 0);
          if (this$.opt.inactiveClass) {
            return it.classList.toggle(this$.opt.inactiveClass, d < 0);
          }
        });
        this$.running = running = this$.root[0].classList.contains(this$.opt.activeClass);
        if (this$.opt.ctrl) {
          this$.render();
        }
        if (!this$.opt.autoZ) {
          return res();
        }
        zmgr = this$._zmgr || ldloader._zmgr;
        if (running) {
          this$.z = zmgr.add(this$.opt.baseZ);
          this$.root.map(function(it){
            return it.style.zIndex = this$.z;
          });
        } else {
          zmgr.remove(this$.z);
        }
        return res();
      });
      return ret.then(function(){
        return this$._toggler(d > 0 ? true : false);
      });
    }
  });
  import$(ldloader, {
    _zmgr: {
      add: function(v){
        var z, ref$;
        (this.s || (this.s = [])).push(z = Math.max(v || 0, ((ref$ = this.s)[ref$.length - 1] || 0) + 1));
        return z;
      },
      remove: function(v){
        var i;
        if ((i = (this.s || (this.s = [])).indexOf(v)) < 0) {} else {
          return this.s.splice(i, 1);
        }
      }
    },
    zmgr: function(it){
      if (it != null) {
        return this._zmgr = it;
      } else {
        return this._zmgr;
      }
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldloader;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldloader = ldloader;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(){
  var ldform;
  ldform = function(opt){
    var root, fields, status, el, that, check, k, v, this$ = this;
    opt == null && (opt = {});
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? ld$.find(document, opt.root, 0)
      : opt.root;
    this.evtHandler = {};
    this.fields = fields = {};
    this.status = status = {
      all: 1
    };
    this.el = el = {};
    if (opt.submit != null) {
      el.submit = typeof opt.submit === 'string'
        ? ld$.find(this.root, opt.submit, 0)
        : opt.submit;
    }
    if (!el.submit) {
      if (that = ld$.find(root, '[type=submit]', 0)) {
        el.submit = that;
      }
    }
    ['debounce', 'verify', 'names', 'getFields', 'afterCheck'].map(function(n){
      if (opt[n]) {
        return this$[n] = opt[n];
      }
    });
    check = function(e){
      return this$.check({
        n: e && e.target ? e.target.getAttribute('name') : undefined,
        e: e
      });
    };
    this.fields = fields = this.getFields(root);
    this.values(opt.values || {});
    for (k in fields) {
      v = fields[k];
      (Array.isArray(v)
        ? v
        : [v]).map(fn$);
      status[k] = 1;
    }
    this.checkDebounced = debounce(330, function(n, fs, s, res, rej){
      var names, all, len, that;
      names = this.names(s);
      all = s.all;
      delete s.all;
      this.afterCheck(s, fs);
      len = names.map(function(n){
        return s[n] != null && s[n] === 0;
      }).filter(function(it){
        return !it;
      }).length;
      if (!(s.all != null)) {
        s.all = !len ? 0 : 1;
      }
      names.map(function(n){
        return (Array.isArray(fs[n])
          ? fs[n]
          : [fs[n]]).map(function(f){
          var x$;
          x$ = f.classList;
          x$.toggle('is-invalid', s[n] === 2);
          x$.toggle('is-valid', s[n] < 1);
          return x$;
        });
      });
      if (all !== s.all) {
        this.fire('readystatechange', s.all === 0);
      }
      if (that = this.el.submit) {
        that.classList.toggle('disabled', s.all !== 0);
      }
      return res();
    });
    if (opt.init) {
      opt.init.apply(this);
    }
    if (this.opt.initCheck) {
      this.checkAll();
    }
    return this;
    function fn$(f){
      return ['change', 'input', 'paste'].forEach(function(n){
        return f.addEventListener(n, check);
      });
    }
  };
  ldform.prototype = import$(Object.create(Object.prototype), {
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    field: function(n){
      return this.fields[n];
    },
    reset: function(){
      var ref$, s, fs;
      ref$ = [this.status, this.fields], s = ref$[0], fs = ref$[1];
      s.all = 1;
      this.names(s).map(function(n){
        var v;
        v = fs[n];
        if (Array.isArray(v)) {
          v.map(function(f){
            f.checked = it.defaultChecked;
            return f.classList.remove('is-invalid', 'is-valid');
          });
        } else {
          v.value = '';
          v.classList.remove('is-invalid', 'is-valid');
        }
        return s[n] = 1;
      });
      return this.check();
    },
    ready: function(){
      return this.status.all === 0;
    },
    verify: function(n, v, e){
      return v ? 0 : 2;
    },
    names: function(){
      var k, results$ = [];
      for (k in this.fields) {
        results$.push(k);
      }
      return results$;
    },
    debounce: function(){
      return true;
    },
    afterCheck: function(){},
    values: function(val){
      var k, ref$, v, fs, ret, results$ = [], this$ = this;
      if (val != null) {
        for (k in ref$ = val || {}) {
          v = ref$[k];
          if (!(fs = this.fields[k])) {
            continue;
          }
          fs = Array.isArray(fs)
            ? fs
            : [fs];
          results$.push(fs.map(fn$));
        }
        return results$;
      } else {
        ret = {};
        for (k in ref$ = this.fields) {
          v = ref$[k];
          (Array.isArray(v)
            ? v
            : [v]).map(fn1$);
        }
        return ret;
      }
      function fn$(f){
        var type;
        type = f.getAttribute('type');
        if (type === 'file') {} else if (type === 'radio') {
          return f.checked = f.value === v;
        } else if (type === 'checkbox') {
          return f.checked = in$(f.value, v || []);
        } else {
          return this$.fields[k].value = v;
        }
      }
      function fn1$(f){
        var type;
        type = f.getAttribute('type');
        if (type === 'checkbox') {
          if (f.checked) {
            return (ret[k] || (ret[k] = [])).push(f.value);
          }
        } else if (type === 'radio') {
          if (f.checked) {
            return ret[k] = f.value;
          }
        } else {
          return ret[k] = f.getAttribute('type') === 'checkbox'
            ? f.checked
            : f.value;
        }
      }
    },
    getfd: function(){
      var fd, k, ref$, v, i$, to$, i;
      fd = new FormData();
      for (k in ref$ = this.fields) {
        v = ref$[k];
        if (v.files && v.files.length) {
          for (i$ = 0, to$ = v.files.length; i$ < to$; ++i$) {
            i = i$;
            fd.append(k + "[]", v.files[i]);
          }
        } else if (Array.isArray(v)) {
          v.map(fn$);
        } else {
          fd.append(k, v.value);
        }
      }
      return fd;
      function fn$(f){
        if (f.checked) {
          return fd.append(k + "[]", f.value);
        }
      }
    },
    getFields: function(root){
      var ret, this$ = this;
      ret = {};
      ld$.find(this.root, '[name]').map(function(f){
        var form, n;
        form = ld$.parent(f, '[ldform]', this$.root);
        if (form && this$.root !== form) {
          return;
        }
        n = f.getAttribute('name');
        if (ret[n]) {
          if (Array.isArray(ret[n])) {
            return ret[n].push(f);
          } else {
            return ret[n] = [ret[n], f];
          }
        } else {
          return ret[n] = f;
        }
      });
      return ret;
    },
    checkAll: function(){
      var k, v;
      return Promise.all((function(){
        var ref$, results$ = [];
        for (k in ref$ = this.fields) {
          v = ref$[k];
          results$.push(this.check({
            n: k,
            now: true
          }));
        }
        return results$;
      }.call(this)));
    },
    check: function(opt){
      var this$ = this;
      opt == null && (opt = {});
      if (Array.isArray(opt)) {
        return Promise.all(opt.map(function(it){
          return this$.check(it);
        }));
      }
      return new Promise(function(res, rej){
        var ref$, n, e, now, fs, s, v, r, p;
        ref$ = {
          n: opt.n,
          e: opt.e,
          now: opt.now
        }, n = ref$.n, e = ref$.e, now = ref$.now;
        if (n && !in$(n, this$.names(s))) {
          return;
        }
        if (n != null && !this$.fields[n]) {
          return rej(new Error("ldform.check: field " + n + " not found."));
        }
        ref$ = [this$.fields, this$.status], fs = ref$[0], s = ref$[1];
        if (fs[n]) {
          if (!Array.isArray(fs[n])) {
            v = fs[n].value;
          } else {
            v = fs[n].filter(function(it){
              return it.checked;
            }).map(function(it){
              return it.value;
            });
            if (fs[n][0].getAttribute('type') === 'radio') {
              v = v[0];
            }
          }
          r = this$.verify(n, v, fs[n]);
        }
        p = !(r && r.then)
          ? Promise.resolve(s[n] = r)
          : r.then(function(it){
            return s[n] = it;
          });
        return p.then(function(){
          if (this$.debounce(n, s) && !now) {
            return this$.checkDebounced(n, fs, s, res, rej);
          } else {
            return this$.checkDebounced(n, fs, s, res, rej).now();
          }
        });
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldform;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldform = ldform;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
(function(){
  var parent, ldcover, normOpt;
  parent = function(r, s, e){
    var n;
    e == null && (e = document);
    n = r;
    while (n && n !== e) {
      n = n.parentNode;
    }
    if (n !== e) {
      return null;
    }
    n = r;
    while (n && n !== e && n.matches && !n.matches(s)) {
      n = n.parentNode;
    }
    if (n === e && (!e.matches || !e.matches(s))) {
      return null;
    }
    return n;
  };
  ldcover = function(opt){
    var ret;
    opt == null && (opt = {});
    this.evtHandler = {};
    this.opt = import$({
      delay: 300,
      autoZ: true,
      baseZ: 3000,
      escape: true,
      byDisplay: true
    }, opt);
    if (opt.zmgr) {
      this.zmgr(opt.zmgr);
    }
    this.promises = [];
    this._r = !opt.root
      ? (ret = document.createElement("div"), ret.innerHTML = "<div class=\"base\"></div>", ret)
      : typeof opt.root === 'string'
        ? document.querySelector(opt.root)
        : opt.root;
    this.cls = typeof opt.type === 'string'
      ? opt.type.split(' ')
      : opt.type;
    this.resident = opt.resident != null ? opt.resident : false;
    this.inPlace = opt.inPlace != null ? opt.inPlace : true;
    this.container = typeof opt.container === 'string'
      ? document.querySelector(opt.container)
      : opt.container;
    if (!(this._r.content && this._r.content.nodeType === Element.DOCUMENT_FRAGMENT_NODE)) {
      this.init();
    }
    return this;
  };
  ldcover.prototype = import$(Object.create(Object.prototype), {
    root: function(){
      if (!this.inited) {
        this.init();
      }
      return this._r;
    },
    init: function(){
      var that, clicksrc, this$ = this;
      if (this.inited) {
        return;
      }
      this.inited = true;
      if (!this.inPlace) {
        this._r.parentNode.removeChild(this._r);
        document.body.appendChild(this._r);
      }
      if (!this.resident && this._r.parentNode) {
        this._c = document.createComment(" ldcover placeholder ");
        this._r.parentNode.insertBefore(this._c, this._r);
        this._r.parentNode.removeChild(this._r);
      }
      if (this._r.content && this._r.content.nodeType === Element.DOCUMENT_FRAGMENT_NODE) {
        this._r = this._r.content.cloneNode(true).childNodes[0];
        this._r.parentNode.removeChild(this._r);
      }
      if (that = this._r.getAttribute('data-lock')) {
        if (that === 'true') {
          this.opt.lock = true;
        }
      }
      this.inner = this._r.querySelector('.inner');
      this.base = this._r.querySelector('.base');
      this._r.classList.add.apply(this._r.classList, ['ldcv'].concat(this.cls || []));
      if (this.opt.byDisplay) {
        this._r.style.display = 'none';
      }
      clicksrc = null;
      this._r.addEventListener('mousedown', this.el_md = function(e){
        return clicksrc = e.target;
      });
      return this._r.addEventListener('click', this.el_c = function(e){
        var tgt, action;
        if (clicksrc === this$._r && !this$.opt.lock) {
          e.stopPropagation();
          return this$.toggle(false);
        }
        if (parent(e.target, '*[data-ldcv-cancel]', this$._r)) {
          e.stopPropagation();
          return this$.cancel();
        }
        tgt = parent(e.target, '*[data-ldcv-set]', this$._r);
        if (tgt && (action = tgt.getAttribute("data-ldcv-set")) != null) {
          if (!parent(tgt, '.disabled', this$._r)) {
            e.stopPropagation();
            return this$.set(action);
          }
        }
      });
    },
    zmgr: function(it){
      if (it != null) {
        return this._zmgr = it;
      } else {
        return this._zmgr;
      }
    },
    append: function(it){
      var base;
      base = this._r.childNodes[0];
      return (base && base.classList.contains('base')
        ? base
        : this._r).appendChild(it);
    },
    get: function(p){
      var this$ = this;
      return new Promise(function(res, rej){
        this$.promises.push({
          res: res,
          rej: rej
        });
        return this$.toggle(true, p);
      });
    },
    cancel: function(err, hide){
      hide == null && (hide = true);
      this.promises.splice(0).map(function(p){
        var ref$;
        return p.rej(err || (ref$ = new Error(), ref$.name = 'lderror', ref$.id = 999, ref$));
      });
      if (hide) {
        return this.toggle(false);
      }
    },
    set: function(v, hide){
      hide == null && (hide = true);
      this.promises.splice(0).map(function(p){
        return p.res(v);
      });
      if (hide) {
        return this.toggle(false);
      }
    },
    isOn: function(){
      return this._r.classList.contains('active');
    },
    lock: function(){
      return this.opt.lock = true;
    },
    toggle: function(v, p){
      var this$ = this;
      return new Promise(function(res, rej){
        var cur, isActive, seq;
        if (!this$.inited) {
          this$.init();
        }
        if (v && p != null) {
          this$.fire('data', p);
        }
        if (!(v != null) && this$._r.classList.contains('running')) {
          return res();
        }
        cur = this$._r.classList.contains('running')
          ? this$._target
          : this$._r.classList.contains('active');
        if (v != null && cur === !!v) {
          return res();
        }
        this$._target = isActive = v != null
          ? !!v
          : !cur;
        this$._seq = seq = (this$._seq || 0) + 1;
        if (isActive && !this$._r.parentNode) {
          if (!(this$.container != null) && this$._c && this$._c.parentNode) {
            this$._c.parentNode.insertBefore(this$._r, this$._c);
          } else {
            (this$.container || document.body).appendChild(this$._r);
          }
        }
        this$._r.classList.add('running');
        if (this$.opt.byDisplay) {
          this$._r.style.display = 'block';
        }
        if (!isActive && this$.el_esc) {
          document.removeEventListener('keyup', this$.el_esc);
          this$.el_esc = null;
        }
        return setTimeout(function(){
          var idx;
          this$._r.classList.toggle('active', isActive);
          setTimeout(function(){
            if (this$._seq !== seq) {
              return;
            }
            this$._r.classList.remove('running');
            if (this$.opt.transformFix && isActive) {
              this$._r.classList.add('shown');
            }
            if (!isActive && this$.opt.byDisplay) {
              this$._r.style.display = 'none';
            }
            if (!isActive && this$._r.parentNode && !this$.resident) {
              this$._r.parentNode.removeChild(this$._r);
            }
            if (!isActive && this$.opt.autoZ) {
              this$._r.style.zIndex = "";
            }
            return this$.fire("toggled." + (isActive ? 'on' : 'off'));
          }, this$.opt.delay);
          if (this$._r.classList.contains('inline')) {
            if (isActive) {
              if (!this$.el_h) {
                this$.el_h = function(e){
                  if (this$._r.contains(e.target)) {} else {
                    return this$.toggle(false);
                  }
                };
                window.addEventListener('click', this$.el_h);
              }
            } else if (this$.el_h) {
              window.removeEventListener('click', this$.el_h);
              this$.el_h = null;
            }
          }
          if (!this$.opt.lock && this$.opt.escape && isActive && !this$.el_esc) {
            this$.el_esc = function(e){
              var ref$;
              if (e.keyCode === 27) {
                if ((ref$ = ldcover.popups)[ref$.length - 1] === this$) {
                  return this$.toggle(false);
                }
              }
            };
            document.addEventListener('keyup', this$.el_esc);
          }
          if (this$.opt.animation && this$.inner) {
            this$.inner.classList[isActive ? 'add' : 'remove'].apply(this$.inner.classList, this$.opt.animation.split(' '));
          }
          if (isActive) {
            ldcover.popups.push(this$);
          } else {
            idx = ldcover.popups.indexOf(this$);
            if (idx >= 0) {
              ldcover.popups.splice(idx, 1);
            }
          }
          if (this$.opt.autoZ) {
            if (isActive) {
              this$._r.style.zIndex = this$.z = (this$._zmgr || ldcover._zmgr).add(this$.opt.baseZ);
            } else {
              (this$._zmgr || ldcover._zmgr).remove(this$.z);
              delete this$.z;
            }
          }
          if (this$.opt.transformFix && !isActive) {
            this$._r.classList.remove('shown');
          }
          if (this$.promises.length && !isActive) {
            this$.set(undefined, false);
          }
          this$.fire("toggle." + (isActive ? 'on' : 'off'));
          return res();
        }, 50);
      });
    },
    on: function(n, cb){
      var this$ = this;
      return (Array.isArray(n)
        ? n
        : [n]).map(function(n){
        var ref$;
        return ((ref$ = this$.evtHandler)[n] || (ref$[n] = [])).push(cb);
      });
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    destroy: function(o){
      var this$ = this;
      o == null && (o = {});
      return this.toggle(false).then(function(){
        if (this$._c) {
          if (!o.removeNode) {
            this$._c.parentNode.insertBefore(this$._r, this$._c);
          }
          this$._c.parentNode.removeChild(this$._c);
        }
        this$._r.removeEventListener('mousedown', this$.el_md);
        return this$._r.removeEventListener('click', this$.el_c);
      });
    }
  });
  ldcover.dialog = function(opt){
    opt == null && (opt = {});
    return new Promise(function(res, rej){
      var addCls, rmCls, themeName, theme, escapable, options, fields, root, inner, tel, mel, fwrap, owrap, inputOf, hasRequired, i$, len$, f, fel, lel, iel, eel, collect, validate, btnEls, di, i, b, ref$, defaultBtn, cls, cov, focusTarget;
      addCls = function(el, cls){
        if (cls) {
          return el.classList.add.apply(el.classList, String(cls).split(/\s+/));
        }
      };
      rmCls = function(el, cls){
        if (cls) {
          return el.classList.remove.apply(el.classList, String(cls).split(/\s+/));
        }
      };
      themeName = String(opt.theme || ldcover.dialog.theme());
      theme = ldcover.dialog.themes[themeName] || {};
      escapable = opt.escape != null ? !!opt.escape : true;
      options = opt.options || [{
        label: 'OK',
        value: 'ok',
        variant: 'primary',
        focus: true
      }];
      fields = opt.fields || [];
      root = ldcover.dialog.dom();
      inner = root.querySelector('.inner');
      tel = root.querySelector('.title');
      mel = root.querySelector('.msg');
      fwrap = root.querySelector('.fields');
      owrap = root.querySelector('.options');
      if (opt.title) {
        tel.textContent = opt.title;
        addCls(tel, theme.title);
      } else if (tel && tel.parentNode) {
        tel.parentNode.removeChild(tel);
      }
      if (opt.msg && opt.msg.nodeType) {
        mel.appendChild(opt.msg);
      } else if (opt.msg != null) {
        mel.textContent = opt.msg;
      } else if (mel && mel.parentNode) {
        mel.parentNode.removeChild(mel);
      }
      if (opt.msg != null) {
        addCls(mel, theme.msg);
      }
      inputOf = {};
      hasRequired = false;
      if (!fields.length) {
        if (fwrap && fwrap.parentNode) {
          fwrap.parentNode.removeChild(fwrap);
        }
      } else {
        addCls(fwrap, theme.fields);
        for (i$ = 0, len$ = fields.length; i$ < len$; ++i$) {
          f = fields[i$];
          fel = document.createElement('div');
          fel.className = 'field';
          addCls(fel, theme.field);
          fwrap.appendChild(fel);
          if (f.label) {
            lel = document.createElement('label');
            lel.textContent = f.label;
            addCls(lel, theme.label);
            fel.appendChild(lel);
          }
          if (f.type === 'textarea') {
            iel = document.createElement('textarea');
            addCls(iel, theme.textarea);
          } else {
            iel = document.createElement('input');
            iel.type = f.type || 'text';
            addCls(iel, theme.input);
          }
          if (f.placeholder) {
            iel.placeholder = f.placeholder;
          }
          if (f.value != null) {
            iel.value = f.value;
          }
          addCls(iel, f.cls);
          if (f.isRequired) {
            hasRequired = true;
          }
          fel.appendChild(iel);
          eel = document.createElement('div');
          eel.className = 'error';
          addCls(eel, theme.error);
          fel.appendChild(eel);
          inputOf[f.name] = iel;
        }
      }
      collect = function(){
        var ret, k, ref$, el;
        ret = {};
        for (k in ref$ = inputOf) {
          el = ref$[k];
          ret[k] = el.value;
        }
        return ret;
      };
      validate = function(){
        var ok, i$, ref$, len$, f, iel, fel, err;
        ok = true;
        for (i$ = 0, len$ = (ref$ = fields).length; i$ < len$; ++i$) {
          f = ref$[i$];
          iel = inputOf[f.name];
          fel = iel.parentNode;
          err = fel.querySelector('.error');
          if (f.isRequired && !String(iel.value || '').trim()) {
            err.textContent = f.error || 'This field is required.';
            fel.classList.add('has-error');
            addCls(iel, theme.invalid);
            if (ok) {
              iel.focus();
            }
            ok = false;
          } else {
            err.textContent = '';
            fel.classList.remove('has-error');
            rmCls(iel, theme.invalid);
          }
        }
        return ok;
      };
      addCls(owrap, theme.options);
      btnEls = options.map(function(b){
        var bel;
        bel = document.createElement('button');
        bel.type = 'button';
        bel.classList.add(b.variant || 'default');
        addCls(bel, typeof theme.button === 'string'
          ? theme.button
          : (theme.button || {})[b.variant || 'default']);
        addCls(bel, b.cls);
        bel.textContent = b.label;
        owrap.appendChild(bel);
        return bel;
      });
      di = -1;
      for (i$ = 0, len$ = options.length; i$ < len$; ++i$) {
        i = i$;
        b = options[i$];
        if (b.focus) {
          di = i;
          break;
        }
      }
      if (di < 0) {
        for (i$ = 0, len$ = options.length; i$ < len$; ++i$) {
          i = i$;
          b = options[i$];
          if ((ref$ = b.variant) === 'primary' || ref$ === 'danger') {
            di = i;
          }
        }
      }
      if (di < 0 && options.length) {
        di = options.length - 1;
      }
      defaultBtn = di >= 0 ? btnEls[di] : null;
      options.forEach(function(b, i){
        return btnEls[i].addEventListener('click', function(){
          if (b.action) {
            return b.action.call(cov, {
              fields: collect()
            });
          }
          if (hasRequired && b.value != null && !b.novalidate && !validate()) {
            return;
          }
          return cov.set({
            value: b.value,
            fields: collect()
          });
        });
      });
      inner.addEventListener('keydown', function(e){
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
          e.preventDefault();
          if (defaultBtn) {
            return defaultBtn.click();
          }
        }
      });
      cls = ['builtin', 'autogap', 'scroll'];
      cls.push(themeName);
      if ((ref$ = opt.size) === 'sm' || ref$ === 'md' || ref$ === 'lg') {
        cls.push(opt.size);
      }
      if (opt.cls) {
        cls = cls.concat(String(opt.cls).split(/\s+/));
      }
      cov = new ldcover({
        root: root,
        escape: escapable,
        lock: !escapable,
        type: cls
      });
      focusTarget = function(){
        var tgt;
        tgt = fields.length ? inputOf[fields[0].name] : defaultBtn;
        if (tgt && document.activeElement !== tgt) {
          return tgt.focus();
        }
      };
      cov.on(['toggle.on', 'toggled.on'], focusTarget);
      cov.on('toggled.off', function(){
        return setTimeout(function(){
          return cov.destroy();
        }, 0);
      });
      return cov.get().then(function(v){
        return res(v === undefined ? {
          value: null,
          fields: collect()
        } : v);
      })['catch'](function(){
        return res({
          value: null,
          fields: collect()
        });
      });
    });
  };
  ldcover.dialog.dom = function(){
    var root;
    root = document.createElement('div');
    root.innerHTML = '<div class="base"><div class="inner"><div class="title"></div><div class="msg"></div><div class="fields"></div><div class="options"></div></div></div>';
    return root;
  };
  ldcover.dialog.theme = function(it){
    if (it != null) {
      return ldcover.dialog._theme = it;
    } else {
      return ldcover.dialog._theme || 'generic';
    }
  };
  ldcover.dialog.themes = {
    bootstrap: {
      title: 'h5',
      input: 'form-control',
      textarea: 'form-control',
      invalid: 'is-invalid',
      error: 'text-danger small',
      button: {
        'default': 'btn btn-outline-secondary',
        primary: 'btn btn-primary',
        danger: 'btn btn-danger'
      }
    }
  };
  normOpt = function(msg, opt){
    if (msg && typeof msg === 'object' && !msg.nodeType) {
      return import$(import$({}, msg), opt || {});
    } else {
      return import$({
        msg: msg
      }, opt || {});
    }
  };
  ldcover.alert = function(msg, opt){
    var o;
    o = normOpt(msg, opt);
    return ldcover.dialog({
      title: o.title,
      msg: o.msg,
      size: o.size,
      cls: o.cls,
      theme: o.theme,
      options: [{
        label: o.okText || 'OK',
        value: 'ok',
        variant: o.variant || 'primary',
        focus: true
      }]
    }).then(function(){});
  };
  ldcover.confirm = function(msg, opt){
    var o;
    o = normOpt(msg, opt);
    return ldcover.dialog({
      title: o.title,
      msg: o.msg,
      size: o.size,
      cls: o.cls,
      theme: o.theme,
      options: [
        {
          label: o.cancelText || 'Cancel',
          value: null
        }, {
          label: o.okText || 'OK',
          value: true,
          variant: o.variant || 'primary',
          focus: true
        }
      ]
    }).then(function(r){
      return r.value === true;
    });
  };
  ldcover.prompt = function(msg, opt){
    var o;
    o = normOpt(msg, opt);
    return ldcover.dialog({
      title: o.title,
      msg: o.msg,
      size: o.size,
      cls: o.cls,
      theme: o.theme,
      fields: [{
        name: 'value',
        type: o.type || 'text',
        placeholder: o.placeholder,
        value: o.value,
        isRequired: o.isRequired
      }],
      options: [
        {
          label: o.cancelText || 'Cancel',
          value: null
        }, {
          label: o.okText || 'OK',
          value: 'ok',
          variant: o.variant || 'primary',
          focus: true
        }
      ]
    }).then(function(r){
      if (r.value === 'ok') {
        return r.fields.value;
      } else {
        return null;
      }
    });
  };
  import$(ldcover, {
    popups: [],
    _zmgr: {
      add: function(v){
        var z, ref$;
        (this.s || (this.s = [])).push(z = Math.max(v || 0, ((ref$ = this.s)[ref$.length - 1] || 0) + 1));
        return z;
      },
      remove: function(v){
        var i;
        if ((i = (this.s || (this.s = [])).indexOf(v)) < 0) {} else {
          return this.s.splice(i, 1);
        }
      }
    },
    zmgr: function(it){
      if (it != null) {
        return this._zmgr = it;
      } else {
        return this._zmgr;
      }
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldcover;
  } else if (window) {
    window.ldcover = ldcover;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
// Generated by LiveScript 1.6.0
var ldcvmgr;
ldcvmgr = function(opt){
  var that;
  opt == null && (opt = {});
  this.opt = opt;
  this.evtHandler = {};
  this.path = opt.path || "/modules/cover";
  if (typeof this.path === 'string') {
    this.path = this.path.replace(/\/$/, '');
  }
  this.loader = (that = opt.loader)
    ? that
    : new ldloader({
      className: "ldld full",
      autoZ: true
    });
  this.mgr = opt.manager || null;
  this.covers = {};
  this.workers = {};
  this.errorCover = opt.errorCover || 'error';
  this.errorHandling = false;
  this.prepareProxy = proxise(function(n){});
  if (opt.zmgr) {
    this.zmgr(opt.zmgr);
  }
  this.baseZ = opt.baseZ || (opt.zmgr ? 'modal' : 3000);
  if (opt.autoInit) {
    this.init();
  }
  return this;
};
ldcvmgr.prototype = import$(Object.create(Object.prototype), {
  on: function(n, cb){
    var ref$;
    return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
  },
  fire: function(n){
    var v, res$, i$, to$, ref$, len$, cb, results$ = [];
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    v = res$;
    for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
      cb = ref$[i$];
      results$.push(cb.apply(this, v));
    }
    return results$;
  },
  zmgr: function(it){
    if (it != null) {
      return this._zmgr = it;
    } else {
      return this._zmgr;
    }
  },
  error: function(n, e, p){
    n == null && (n = '');
    e == null && (e = {});
    p == null && (p = {});
    if (n === 'error' || n === this.errorCover || n === this._id(this.errorCover)) {
      alert("something is wrong; please reload and try again");
    } else {
      this.errorHandling = true;
      this.toggle(this.errorCover || 'error', true, {
        err: e,
        param: p
      });
    }
    return console.log(e.message || e);
  },
  _id: function(o){
    if (typeof o === 'object') {
      return this.mgr.id(o);
    } else {
      return o;
    }
  },
  prepare: function(o){
    var n, p, that, name, this$ = this;
    n = this._id(o);
    if (this.covers[n]) {
      return Promise.resolve();
    }
    if (this.workers[n]) {
      return this.prepareProxy(n);
    }
    if (this.errorHandling) {
      this.loader.on();
      this.errorHandling = false;
    } else {
      this.loader.on(1000);
    }
    p = typeof o === 'object'
      ? this.workers[n] = this.mgr.get(o).then(function(bc){
        return bc.create();
      }).then(function(bi){
        return bi.attach({
          root: document.body,
          data: {
            zmgr: this$._zmgr,
            baseZ: this$.baseZ
          }
        }).then(function(){
          var ret;
          this$.covers[n] = ret = bi['interface']();
          return bi.dom();
        });
      })
      : (that = document.querySelector(".ldcvmgr[data-name='" + n + "']"))
        ? Promise.resolve(that)
        : (name = typeof this.path === 'function'
          ? this.path(n)
          : this.path + "/" + n + ".html", this.workers[n] = fetch(name).then(function(v){
          if (!(v && v.ok)) {
            throw new Error("modal '" + (!n ? '<no-name>' : n) + "' load failed.");
          }
          return v.text();
        }).then(function(code){
          var bc;
          bc = new block['class']({
            manager: this$.mgr,
            code: code
          });
          return bc.create({
            root: document.body
          }).then(function(bi){
            var itf;
            if (itf = bi['interface']()) {
              this.covers[n] = itf;
            }
            return bi.dom();
          });
        }));
    return p['finally'](function(){
      return this$.loader.cancel(false);
    }).then(function(root){
      var ref$, ref1$;
      if (!this$.covers[n]) {
        this$.covers[n] = new ldcover({
          root: root,
          lock: root.getAttribute('data-lock') === 'true',
          zmgr: this$._zmgr,
          baseZ: this$.baseZ
        });
      }
      this$.prepareProxy.resolve();
      return ref1$ = (ref$ = this$.workers)[n], delete ref$[n], ref1$;
    })['catch'](function(it){
      this$.prepareProxy.reject(it);
      delete this$.workers[n];
      throw it;
    });
  },
  purge: function(o){
    var n, ref$, ref1$;
    n = this._id(o);
    if (n != null) {
      return ref1$ = (ref$ = this.covers)[n], delete ref$[n], ref1$;
    } else {
      return this.covers = {};
    }
  },
  lock: function(o, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].lock();
    }).then(function(){
      return this$.covers[n].toggle(true, p);
    })['catch'](function(e){
      return this$.error(n, e, p);
    });
  },
  toggle: function(o, v, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].toggle(v, p);
    }).then(function(){
      return this$.fire((this$.covers[n].isOn() ? 'on' : 'off') + "", {
        node: this$.covers[n],
        param: p,
        name: n
      });
    })['catch'](function(e){
      return this$.error(n, e, p);
    });
  },
  getcover: function(o){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n];
    });
  },
  getdom: function(o){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].root();
    });
  },
  isOn: function(o){
    var n;
    n = this._id(o);
    return this.covers[n] && this.covers[n].isOn();
  },
  set: function(o, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].set(p);
    });
  },
  get: function(o, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      this$.fire("on", {
        node: this$.covers[n],
        param: p,
        name: n
      });
      return this$.covers[n].get(p);
    })['catch'](function(e){
      return this$.error(n, e, p);
    });
  },
  init: function(root){
    var this$ = this;
    ld$.find(root || document.body, '.ldcvmgr').map(function(n){
      var id;
      if (!(id = n.getAttribute('data-name')) || this$.covers[id]) {
        return;
      }
      return this$.covers[id] = new ldcover({
        root: n,
        lock: n.getAttribute('data-lock') === 'true',
        zmgr: this$._zmgr,
        baseZ: this$.baseZ
      });
    });
    return document.body.addEventListener('click', function(evt){
      var n, id;
      if (!(n = ld$.parent(evt.target, "[data-ldcvmgr-toggle]"))) {
        return;
      }
      if (!(id = n.getAttribute('data-ldcvmgr-toggle'))) {
        return;
      }
      return this$.toggle(/:/.exec(id) ? this$.mgr.id2obj(id) : id);
    });
  }
});
if (typeof module != 'undefined' && module !== null) {
  module.exports = ldcvmgr;
} else if (typeof window != 'undefined' && window !== null) {
  window.ldcvmgr = ldcvmgr;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
(function(){
  var setEvtHandler, find, parent, ldview;
  setEvtHandler = function(d, k, f){
    return d.node.addEventListener(k, function(evt){
      return f(import$({
        evt: evt
      }, d));
    });
  };
  find = function(n, s, i){
    if (i != null) {
      return n.querySelectorAll(s)[i];
    } else {
      return Array.from(n.querySelectorAll(s));
    }
  };
  parent = function(n, s){
    return n.closest(s);
  };
  ldview = function(opt){
    var names, i$, ref$, k, v, len$, list, j$, len1$, it, res$, this$ = this;
    opt == null && (opt = {});
    if (arguments.length > 1) {
      opt = ldview.merge.apply(ldview, Array.from(arguments));
    }
    this.evtHandler = {};
    this._ctxs = opt.ctxs || null;
    this.views = [this].concat(opt.baseViews || []);
    this._ctx = opt.context || opt.ctx || null;
    if (opt.context) {
      console.warn('[ldview] `context` is deprecated. use `ctx` instead.');
    }
    this.attr = opt.attr || {};
    this.style = opt.style || {};
    this.handler = opt.handler || {};
    this.action = opt.action || {};
    this.text = opt.text || {};
    this.initer = opt.init || {};
    this.prefix = opt.prefix;
    this.global = opt.global || false;
    this.ld = this.global ? 'pd' : 'ld';
    this.initRender = opt.initRender != null ? opt.initRender : true;
    this.root = typeof opt.root === 'string'
      ? find(document, opt.root, 0)
      : opt.root;
    if (!this.root) {
      console.warn("[ldview] warning: no node found for root ", opt.root);
    }
    if (this.root.setAttribute && !this.global) {
      this.id = "ld-" + Math.random().toString(36).substring(2);
      this.root.setAttribute("ld-scope-" + this.id, '');
    }
    if (this.template = opt.template) {
      this.root.textContent = '';
      this.root.appendChild(this.template.cloneNode(true));
    }
    this.update();
    names = {};
    for (i$ = 0, len$ = (ref$ = [(fn$.call(this))].concat([(fn1$.call(this))], [(fn2$.call(this))], [(fn3$.call(this))], [(fn4$.call(this))], (fn5$.call(this)).map(fn6$))).length; i$ < len$; ++i$) {
      list = ref$[i$];
      for (j$ = 0, len1$ = list.length; j$ < len1$; ++j$) {
        it = list[j$];
        names[it] = true;
      }
    }
    res$ = [];
    for (k in names) {
      res$.push(k);
    }
    this.names = res$;
    if (this.initRender) {
      this.init().then(function(){
        return this$.render();
      });
    }
    return this;
    function fn$(){
      var results$ = [];
      for (k in this.initer) {
        results$.push(k);
      }
      return results$;
    }
    function fn1$(){
      var results$ = [];
      for (k in this.attr) {
        results$.push(k);
      }
      return results$;
    }
    function fn2$(){
      var results$ = [];
      for (k in this.style) {
        results$.push(k);
      }
      return results$;
    }
    function fn3$(){
      var results$ = [];
      for (k in this.text) {
        results$.push(k);
      }
      return results$;
    }
    function fn4$(){
      var results$ = [];
      for (k in this.handler) {
        results$.push(k);
      }
      return results$;
    }
    function fn5$(){
      var ref$, results$ = [];
      for (k in ref$ = this.action) {
        v = ref$[k];
        results$.push(v);
      }
      return results$;
    }
    function fn6$(it){
      var k, results$ = [];
      for (k in it) {
        results$.push(k);
      }
      return results$;
    }
  };
  ldview.prototype = import$(Object.create(Object.prototype), {
    update: function(root){
      var selector, exclusions, all, eachesNodes, eaches, nodes, prefixRE, this$ = this;
      root == null && (root = this.root);
      if (!this.nodes) {
        this.nodes = [];
      }
      if (!this.eaches) {
        this.eaches = [];
      }
      if (!this.map) {
        this.map = {
          nodes: {},
          eaches: {}
        };
      }
      selector = this.prefix
        ? "[" + this.ld + "-each^=" + this.prefix + "\\$]"
        : "[" + this.ld + "-each]";
      exclusions = this.global
        ? []
        : find(root, (this.id ? "[ld-scope-" + this.id + "] " : "") + ("[ld-scope] " + selector));
      all = find(root, selector);
      eachesNodes = this.eaches.map(function(it){
        return it.n;
      });
      eaches = all.filter(function(it){
        return !in$(it, exclusions);
      }).filter(function(it){
        return !in$(it, eachesNodes);
      }).map(function(n){
        var name, c, i, ret, p, that;
        if (!n.parentNode) {
          return null;
        }
        if (parent(n.parentNode, "*[" + this$.ld + "-each]")) {
          return null;
        }
        name = n.getAttribute(this$.ld + "-each");
        if (!this$.handler[name]) {
          return null;
        }
        c = n.parentNode;
        i = Array.from(c.childNodes).indexOf(n);
        ret = {
          idx: i,
          node: n,
          name: name,
          nodes: []
        };
        p = document.createComment(" " + this$.ld + "-each=" + name + " ");
        if (!this$.handler[name].host) {
          c.insertBefore(p, n);
        }
        c.removeChild(n);
        p._data = ret;
        ret.proxy = p;
        ret.container = (that = this$.handler[name].host) ? new that({
          root: c
        }) : c;
        return ret;
      }).filter(function(it){
        return it;
      });
      this.eaches = this.eaches.concat(eaches);
      eaches.map(function(node){
        var ref$, key$;
        return ((ref$ = this$.map.eaches)[key$ = node.name] || (ref$[key$] = [])).push(node);
      });
      selector = this.prefix
        ? "[" + this.ld + "^=" + this.prefix + "\\$]"
        : "[" + this.ld + "]";
      exclusions = this.global
        ? []
        : find(root, (this.id ? "[ld-scope-" + this.id + "] " : "") + ("[ld-scope] " + selector));
      all = find(root, selector);
      nodes = all.filter(function(it){
        return !(in$(it, exclusions) || in$(it, this$.nodes));
      });
      this.nodes = this.nodes.concat(nodes);
      prefixRE = this.prefix ? new RegExp("^" + this.prefix + "\\$") : null;
      nodes.map(function(node){
        var names;
        names = (node.getAttribute(this$.ld) || "").split(' ');
        if (this$.prefix) {
          names = names.map(function(it){
            return it.replace(prefixRE, "").trim();
          });
        }
        return names.map(function(it){
          var ref$;
          return ((ref$ = this$.map.nodes)[it] || (ref$[it] = [])).push({
            node: node,
            names: names,
            local: {},
            evts: {}
          });
        });
      });
      if (!this.map.nodes['@']) {
        return this.map.nodes['@'] = [{
          node: this.root,
          names: '@',
          local: {},
          evts: {}
        }];
      }
    },
    procEach: function(name, data, key, initOnly){
      var c, list, getkey, keycount, items, usekey, nodes, proxyIndex, ns, consumed, i$, i, n, k, j, node, idx, expectedIdx, _, ps, this$ = this;
      key == null && (key = null);
      c = typeof this._ctx === 'function'
        ? this._ctx({
          node: this.root,
          ctxs: this._ctxs,
          views: this.views
        })
        : this._ctx;
      list = this.handler[name].list({
        name: data.name,
        node: data.node,
        views: this.views,
        context: c,
        ctx: c,
        ctxs: this._ctxs
      }) || [];
      getkey = this.handler[name].key;
      keycount = {};
      items = [];
      usekey = !!getkey;
      if (!getkey) {
        getkey = function(it){
          return it;
        };
      } else {
        list.map(function(n){
          var k;
          if (typeof (k = getkey(n)) === 'object') {
            return;
          }
          return keycount[k] = (keycount[k] || 0) + 1;
        });
      }
      nodes = data.nodes.filter(function(it){
        return it;
      }).map(function(n){
        var k;
        k = getkey(n._data);
        if ((typeof k !== 'object' && !usekey) || (typeof k === 'object' && !in$(n._data, list)) || (usekey && !keycount[k])) {
          data.container.removeChild(n);
          delete n._data;
        } else {
          items.push(k);
          if (usekey && keycount[k]) {
            keycount[k]--;
          }
        }
        return n;
      }).filter(function(it){
        return it._data != null;
      });
      proxyIndex = Array.from(data.container.childNodes).indexOf(data.proxy);
      if (proxyIndex < 0) {
        proxyIndex = data.container.childNodes.length;
      }
      ns = [];
      consumed = {};
      for (i$ = list.length - 1; i$ >= 0; --i$) {
        i = i$;
        n = list[i];
        k = getkey(n);
        if (usekey && typeof k !== 'object') {
          consumed[k] = (consumed[k] || 0) + 1;
        }
        if ((j = items.indexOf(k)) >= 0) {
          node = nodes[j];
          items.splice(j, 1);
          nodes.splice(j, 1);
          node._data = n;
          if (!node._obj) {
            node._obj = {
              node: node,
              name: name,
              idx: i,
              local: {}
            };
          }
          node._obj.data = n;
          idx = Array.from(data.container.childNodes).indexOf(node);
          expectedIdx = proxyIndex - (list.length - i);
          if (idx !== expectedIdx) {
            data.container.removeChild(node);
            proxyIndex = Array.from(data.container.childNodes).indexOf(data.proxy);
            if (proxyIndex < 0) {
              proxyIndex = data.container.childNodes.length;
            }
            expectedIdx = proxyIndex - (list.length - i);
            data.container.insertBefore(node, data.container.childNodes[expectedIdx + 1]);
            proxyIndex = proxyIndex + 1;
          }
          ns.splice(0, 0, node);
          continue;
        }
        if (usekey && typeof k !== 'object') {
          if (consumed[k] > 1) {
            continue;
          }
        }
        node = data.node.cloneNode(true);
        node._data = n;
        node._obj = {
          node: node,
          name: name,
          data: n,
          idx: i,
          local: {}
        };
        node.removeAttribute(this.ld + "-each");
        expectedIdx = proxyIndex - (list.length - i);
        data.container.insertBefore(node, data.container.childNodes[expectedIdx + 1]);
        proxyIndex = proxyIndex + 1;
        ns.splice(0, 0, node);
      }
      _ = ns.filter(function(it){
        return it;
      });
      if (key != null) {
        _ = _.filter(function(it){
          return in$(getkey(it._obj.data), key);
        });
      }
      ps = _.map(function(it, i){
        return this$._render(name, it._obj, i, this$.handler[name], true, initOnly);
      });
      if (data.container.update) {
        data.container.update();
      }
      data.nodes = ns;
      return Promise.all(ps);
    },
    get: function(n){
      return ((this.map.nodes[n] || [])[0] || {}).node;
    },
    getAll: function(n){
      return (this.map.nodes[n] || []).map(function(it){
        return it.node;
      });
    },
    _render: function(n, d, i, b, e, initOnly){
      var c, init, handler, text, attr, style, action, ref$, ps, k, v, f;
      c = typeof this._ctx === 'function'
        ? c = this._ctx({
          node: this.root,
          ctxs: this._ctxs,
          views: this.views
        })
        : this._ctx;
      d.ctx = c;
      d.context = c;
      d.ctxs = this._ctxs;
      d.views = this.views;
      if (b) {
        if (b.view) {
          init = function(arg$){
            var node, local, data, ctx, ctxs, views, _cfg, ref$, _ctx;
            node = arg$.node, local = arg$.local, data = arg$.data, ctx = arg$.ctx, ctxs = arg$.ctxs, views = arg$.views;
            _cfg = (ref$ = import$({
              ctx: data
            }, b.view), ref$.initRender = false, ref$.root = node, ref$.baseViews = views, ref$.ctxs = ctxs
              ? [ctx].concat(ctxs)
              : [ctx], ref$);
            if (typeof _cfg.ctx === 'function') {
              _ctx = _cfg.ctx;
              _cfg.ctx = function(opt){
                return _ctx(import$({
                  ctx: data || ctx
                }, opt));
              };
              local._ctx = _ctx;
            }
            local._view = new ldview(_cfg);
            return local._view.init();
          };
          handler = function(opt){
            var local, data, ctx, ctxs;
            local = opt.local, data = opt.data, ctx = opt.ctx, ctxs = opt.ctxs;
            if (e) {
              local._view.ctx(data || ctx);
            } else if (local._ctx) {
              local._view.ctx(local._ctx((opt.ctxs = [ctx].concat(ctxs), opt)));
            }
            local._view.ctxs(ctxs
              ? [ctx].concat(ctxs)
              : [ctx]);
            return local._view.render();
          };
        } else {
          init = b.init || null;
          handler = b.handler || b.handle || null;
          text = b.text || null;
          attr = b.attr || null;
          style = b.style || null;
          action = b.action || {};
        }
      } else {
        ref$ = [this.initer[n], this.handler[n], this.attr[n], this.style[n], this.text[n], this.action], init = ref$[0], handler = ref$[1], attr = ref$[2], style = ref$[3], text = ref$[4], action = ref$[5];
      }
      try {
        if (init && !(d.inited || (d.inited = {}))[n]) {
          d.inited[n] = Promise.resolve(init(d)).then(function(){
            return d.inited[n] = true;
          });
        }
        if (initOnly) {
          return Promise.resolve((d.inited || (d.inited = {}))[n]);
        }
        ps = [];
        if (handler) {
          ps.push(handler(d));
        }
        if (text) {
          d.node.textContent = typeof text === 'function' ? text(d) : text;
        }
        if (attr) {
          for (k in ref$ = attr(d) || {}) {
            v = ref$[k];
            d.node.setAttribute(k, v);
          }
        }
        if (style) {
          for (k in ref$ = style(d) || {}) {
            v = ref$[k];
            d.node.style[k] = v;
          }
        }
        for (k in ref$ = action || {}) {
          v = ref$[k];
          if (!v || !((f = b
            ? v
            : v[n]) && !(d.evts || (d.evts = {}))[k])) {
            continue;
          }
          setEvtHandler(d, k, f);
          d.evts[k] = true;
        }
        return Promise.all(ps);
      } catch (e$) {
        e = e$;
        console.warn("[ldview] failed when rendering " + n + ":", e);
        throw e;
      }
    },
    bindEachNode: function(arg$){
      var name, container, idx, node, obj;
      name = arg$.name, container = arg$.container, idx = arg$.idx, node = arg$.node;
      if (!(obj = this.map.eaches[name].filter(function(it){
        return it.container === container;
      })[0])) {
        return;
      }
      if (idx != null) {
        return obj.nodes.splice(idx, 0, node);
      } else {
        return obj.nodes.push(node);
      }
    },
    unbindEachNode: function(arg$){
      var name, container, idx, node, obj;
      name = arg$.name, container = arg$.container, idx = arg$.idx, node = arg$.node;
      if (!(obj = this.map.eaches[name].filter(function(it){
        return it.container === container;
      })[0])) {
        return;
      }
      if (node && !idx) {
        idx = obj.nodes.indexOf(node);
      }
      return obj.nodes.splice(idx, 1);
    },
    init: function(names){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return this._prerender('init', names, args);
    },
    render: function(names){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return this._prerender('render', names, args);
    },
    _prerender: function(type, names, args){
      var initOnly, _, ps, k, this$ = this;
      initOnly = type === 'init';
      this.fire('beforeRender');
      _ = function(n){
        var ps, ref$, key;
        ps = [];
        if (typeof n === 'object') {
          ref$ = [n.name, n.key], n = ref$[0], key = ref$[1];
          if (!Array.isArray(key)) {
            key = [key];
          }
        }
        if (this$.map.nodes[n]) {
          ps = ps.concat(this$.map.nodes[n].map(function(d, i){
            d.name = n;
            d.idx = i;
            return this$._render(n, d, i, typeof this$.handler[n] === 'object' ? {
              view: this$.handler[n]
            } : null, false, initOnly);
          }));
        }
        if (this$.map.eaches[n] && this$.handler[n]) {
          ps = ps.concat(this$.map.eaches[n].map(function(it){
            return this$.procEach(n, it, key, initOnly);
          }));
        }
        return Promise.all(ps);
      };
      ps = names
        ? ((Array.isArray(names)
          ? names
          : [names]).concat(args)).map(function(it){
          return _(it);
        })
        : (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = this.names).length; i$ < len$; ++i$) {
            k = ref$[i$];
            results$.push(_(k));
          }
          return results$;
        }.call(this));
      this.fire('afterRender');
      return Promise.all(ps);
    },
    setContext: function(v){
      console.warn('[ldview] `setContext` is deprecated. use `ctx(...)` instead.');
      return this._ctx = v;
    },
    setCtx: function(v){
      console.warn('[ldview] `setCtx` is deprecated. use `ctx(...)` instead.');
      return this._ctx = v;
    },
    ctx: function(v){
      if (arguments.length) {
        return this._ctx = v;
      } else {
        return this._ctx;
      }
    },
    ctxs: function(v){
      if (arguments.length) {
        return this._ctxs = v;
      } else {
        return this._ctxs;
      }
    },
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    }
  });
  ldview.merge = function(){
    return ldview._merge.apply(ldview, [{}].concat(Array.from(arguments)));
  };
  ldview._merge = function(){
    var list, a, i$, len$, b, k;
    list = Array.from(arguments);
    if (list.length < 2) {
      return list[0];
    }
    a = list.splice(0, 1)[0];
    for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
      b = list[i$];
      for (k in b) {
        if (!(b[k] != null)) {
          continue;
        }
        if (typeof b[k] === 'object' && b[k].constructor === Object) {
          ldview._merge(a[k] || (a[k] = {}), b[k]);
        } else {
          a[k] = b[k];
        }
      }
    }
    return a;
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldview;
  }
  if (typeof window != 'undefined' && window !== null) {
    window.ldView = window.ldview = ldview;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
(function(){
  var idmap, lderror;
  idmap = {
    0: "unknown lderror",
    998: "skipped",
    999: "canceled",
    1000: "user not login",
    1001: "suspicious user",
    1002: "unknown error",
    1003: "image process failed",
    1004: "quota exceeded",
    1005: "csrftoken mismatch",
    1006: "timeout",
    1007: "server down",
    1008: "unable to parse user data",
    1009: "bot",
    1010: "captcha error",
    1011: "resource conflict",
    1012: "permission denied",
    1013: "expire",
    1014: "apply for a resource that already exists",
    1015: "bad parameter",
    1016: "feature not yet available",
    1017: "resource corrupted",
    1018: "no consent",
    1019: "wrong domain",
    1020: "not supported",
    1021: "email not verified",
    1022: "missing dependency",
    1023: "lderror testing",
    1024: "limited by throttling",
    1025: "runtime error",
    1026: "not applicable",
    1027: "missing config",
    1028: "resource unavailable",
    1029: "session data corrupted",
    1030: "password mismatched",
    1031: "weak password",
    1032: "credential scheme mismatched",
    1033: "view failed to render",
    1034: "user not found",
    1035: "payment rejected",
    1036: "reused passwords not allowed",
    1037: "offline",
    1038: "file too large",
    1039: "payment rejected",
    1040: "registration closed",
    1041: "resource possibly blocked by client",
    1042: "3rd party service error",
    1043: "additional token required",
    1044: "unsupported encoding",
    1045: "invalid token / code",
    1046: "network or cors issue",
    1047: "abort",
    1048: "captcha required",
    1049: "too many attempts",
    1050: "code consumed",
    1051: "ip not allowed",
    1052: "account not activated"
  };
  lderror = function(opt, id){
    var _id, that, e;
    opt == null && (opt = "");
    id == null && (id = 0);
    if (!(this instanceof lderror)) {
      return new lderror(opt, id);
    }
    _id = (!isNaN(+id) ? +id : 0) || opt.id || 0;
    if (typeof opt === 'string') {
      this.message = opt;
      this.id = _id;
    } else if (opt instanceof Error) {
      (this.stack = opt.stack, this.message = opt.message, this).id = _id;
    } else if (typeof opt === 'object') {
      delete opt.__proto__;
      delete opt.constructor;
      import$(this, opt).id = _id;
    } else if (typeof opt === 'number') {
      this.id = opt;
      if (typeof id === 'string') {
        this.message = id;
      } else if (typeof id === 'object') {
        this.payload = id;
      }
      if (!this.message) {
        this.message = (that = idmap[this.id || 0])
          ? that
          : this.id >= 100 && this.id < 600
            ? "http code: " + this.id
            : idmap[0] + " (id: " + (this.id || 0) + ")";
      }
    }
    this.name = lderror.prototype.name;
    this.stack = (e = import$(new Error(), this)).stack;
    this.error = e;
    return this;
  };
  lderror.prototype = import$(Object.create(Error.prototype), {
    name: 'lderror',
    toString: function(opt){
      var obj;
      opt == null && (opt = {});
      obj = this.toObject();
      if (opt.stack != null && !opt.stack) {
        delete obj.stack;
      }
      return JSON.stringify(obj);
    },
    toObject: function(){
      var ref$;
      return ref$ = {
        name: this.name
      }, ref$.id = this.id, ref$.message = this.message, ref$.stack = this.stack, ref$.payload = this.payload, ref$;
    }
  });
  lderror.id = function(opt){
    if (opt && typeof opt === 'object' && opt.name === 'lderror' && opt.id) {
      return opt.id;
    }
    return 0;
  };
  lderror.message = function(o){
    if (typeof o === 'number') {
      return idmap[o] || idmap[0];
    } else if (typeof o === 'object') {
      return idmap[o.id] || idmap[0];
    }
    return idmap[0];
  };
  lderror.reject = function(opt, id){
    return Promise.reject(new lderror(opt, id));
  };
  lderror.handler = function(o){
    var h, this$ = this;
    o == null && (o = {});
    this.i = (o.ignore || []).concat([999]);
    this.h = o.handler;
    this.r = o.rule || function(it){
      return it;
    };
    this.s = {};
    h = function(e){
      var i, p;
      if (in$(i = lderror.id(e), this$.i)) {
        return;
      }
      this$.s[i] = 1;
      p = this$.h(this$.r(i), e);
      if (!(p && p.then)) {
        this$.s[i] = 0;
      } else {
        p.then(function(){
          return this$.s[i] = 0;
        });
      }
      if (!i) {
        console.log(e);
        throw e;
      }
    };
    h.isOn = function(){
      var k, v;
      return !!(function(){
        var ref$, results$ = [];
        for (k in ref$ = this.s) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }.call(this$)).filter(function(v){
        return v;
      }).length;
    };
    return h;
  };
  lderror.eventHandler = {
    error: function(e){
      if (e.error && e.error.name === 'lderror' && e.error.error && e.error !== e.error.error) {
        console.warn("uncaught lderror", e.error);
        console.warn("with its internal Error object thrown:");
        e.preventDefault();
        setTimeout(function(){
          throw e.error.error;
        }, 0);
        return true;
      }
      return false;
    },
    rejection: function(e){
      if (e.reason && e.reason.name === 'lderror' && e.reason.error) {
        console.warn("Unhandled rejection with lderror:", e.reason);
        console.warn("with its internal Error object thrown:");
        setTimeout(function(){
          throw e.reason.error;
        }, 0);
        e.preventDefault();
        return true;
      }
      return false;
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = lderror;
  } else if (typeof window != 'undefined' && window !== null) {
    window.lderror = lderror;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
(function(){
  var ldtab, lc;
  ldtab = function(opt){
    var root, this$ = this;
    this.opt = opt;
    this.cls = {
      tab: {
        className: ['ldtab'],
        classIn: ['ldtab-in'],
        classOut: ['ldtab-out'],
        delay: 350
      },
      panel: {
        className: ['ldtab-panel'],
        classIn: ['ldtab-panel-in'],
        classOut: ['ldtab-panel-out'],
        delay: 350
      }
    };
    import$(this.cls.tab, opt.tab || {});
    import$(this.cls.panel, opt.panel || {});
    this.evtHandler = {};
    ['tab', 'panel'].map(function(t){
      return ['className', 'classIn', 'classOut'].map(function(n){
        if (typeof this$.cls[t][n] === 'string') {
          return this$.cls[t][n] = this$.cls[t][n].split(' ').filter(function(it){
            return it.trim();
          });
        }
      });
    });
    root = opt.root;
    this.root = root = typeof root === 'string'
      ? document.querySelector(root)
      : root ? root : null;
    this.active = {};
    this.pends = {};
    this.group = {};
    if (!(opt.autoInit != null) || opt.autoInit) {
      this.init();
    }
    return this;
  };
  ldtab.prototype = import$(Object.create(Object.prototype), {
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    init: function(){
      return this.add(Array.from(this.root.querySelectorAll('[ldtab]')));
    },
    parse: function(node){
      var n, p, group, name, tab, active;
      n = node;
      while (n && n !== this.root && (!n.matches || (n.matches && !n.matches('[ldtab-group]')))) {
        n = n.parentNode;
      }
      p = !(n && n.matches && n.matches('[ldtab-group]')) ? null : n;
      group = (p ? p : node).getAttribute('ldtab-group');
      name = node.getAttribute('ldtab');
      tab = p ? p.getAttribute('type') : null;
      if (!tab) {
        tab = node.getAttribute('type');
      }
      tab = tab === 'tab';
      active = node.hasAttribute('default') && node.getAttribute('default') !== 'false';
      return {
        group: group,
        name: name,
        tab: tab,
        active: active
      };
    },
    add: function(nodes){
      var this$ = this;
      nodes = Array.isArray(nodes)
        ? nodes
        : [nodes];
      return nodes.map(function(node){
        var ref$, group, name, tab, active, n, ref1$, delay;
        ref$ = this$.parse(node), group = ref$.group, name = ref$.name, tab = ref$.tab, active = ref$.active;
        n = (ref$ = (ref1$ = this$.group)[group] || (ref1$[group] = {}))[name] || (ref$[name] = {});
        if (!node._ldtab_debounce) {
          delay = this$.cls[tab ? 'tab' : 'panel'].delay;
          if (delay) {
            node._ldtab_debounce = debounce(delay, function(){
              return node.classList.remove('active');
            });
          }
        }
        if (tab) {
          n.tab = (n.tab || (n.tab = [])).concat([node]);
          node.classList.add(this$.cls.tab.className);
          node.addEventListener('click', function(){
            return this$.toggle({
              group: group,
              name: name
            });
          });
        } else {
          n.panel = (n.panel || (n.panel = [])).concat([node]);
          node.classList.add(this$.cls.panel.className);
        }
        if (active) {
          return this$.toggle({
            group: group,
            name: name
          });
        }
      });
    },
    update: function(arg$){
      var group, name, active, n, ref$, ref1$, this$ = this;
      group = arg$.group, name = arg$.name, active = arg$.active;
      n = (ref$ = (ref1$ = this.group)[group] || (ref1$[group] = {}))[name] || (ref$[name] = {});
      if (active) {
        ['tab', 'panel'].map(function(t){
          return (n[t] || (n[t] = [])).map(function(node){
            if (node.classList.contains('active')) {
              return;
            }
            if (this$.cls[t].activate) {
              return this$.cls[t].activate({
                node: node
              });
            } else {
              if (node._ldtab_debounce) {
                node._ldtab_debounce.clear();
              }
              node.classList.remove(this$.cls[t].classOut);
              node.classList.add(this$.cls[t].classIn);
              return node.classList.add('active');
            }
          });
        });
      } else {
        ['tab', 'panel'].map(function(t){
          return (n[t] || (n[t] = [])).map(function(node){
            if (!node.classList.contains('active')) {
              return;
            }
            if (this$.cls[t].deactivate) {
              return this$.cls[t].deactivate({
                node: node
              });
            } else {
              if (node._ldtab_debounce) {
                node._ldtab_debounce();
              } else {
                node.classList.remove('active');
              }
              node.classList.remove(this$.cls[t].classIn);
              return node.classList.add(this$.cls[t].classOut);
            }
          });
        });
      }
      return n.active = active;
    },
    toggle: function(arg$){
      var group, name, g, ref$, k, v, this$ = this;
      group = arg$.group, name = arg$.name;
      g = (ref$ = this.group)[group] || (ref$[group] = {});
      (function(){
        var ref$, results$ = [];
        for (k in ref$ = this.group[group]) {
          v = ref$[k];
          results$.push(k);
        }
        return results$;
      }.call(this)).filter(function(it){
        return it !== name;
      }).map(function(name){
        return this$.update({
          group: group,
          name: name,
          active: false
        });
      });
      this.update({
        group: group,
        name: name,
        active: true
      });
      return this.fire('on', {
        group: group,
        name: name
      });
    }
  });
  lc = {};
  ldtab.init = function(opt){
    lc.ldtab = new ldtab(opt);
    return lc.ldtab.add(Array.from(document.querySelectorAll('[ldtab]')));
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldtab;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldtab = ldtab;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(){
  var ldfolder;
  ldfolder = function(opt){
    var root, this$ = this;
    root = opt.root;
    this._delta = {
      wk: new WeakMap(),
      set: new Set()
    };
    this.exclusive = opt.exclusive || false;
    this.root = root = typeof root === 'string'
      ? document.querySelector(root)
      : root ? root : null;
    this.root.addEventListener('click', function(e){
      var n, p;
      n = e.target;
      while (n && n !== this$.root && (!n.matches || (n.matches && !n.matches('.ldfd-toggle')))) {
        n = n.parentNode;
      }
      if (!(n && n !== this$.root)) {
        return;
      }
      p = n;
      while (p = p.nextSibling) {
        if (p.classList && p.classList.contains('ldfd-menu')) {
          break;
        }
      }
      if (p) {
        return this$.toggle(p);
      }
    });
    return this;
  };
  ldfolder.prototype = import$(Object.create(Object.prototype), {
    fit: function(menu){
      return this.toggle(menu, menu.parentNode.classList.contains('show'), true);
    },
    toggle: function(menu, v, force, internal){
      var s, list, results$ = [], this$ = this;
      force == null && (force = false);
      internal == null && (internal = false);
      this._toggle(menu, v, force, internal);
      s = this._delta.set;
      while (s.size) {
        list = Array.from(s);
        s.clear();
        results$.push(list.map(fn$));
      }
      return results$;
      function fn$(it){
        var isOn;
        isOn = it.parentNode.classList.contains('show');
        return this$._toggle(it, isOn, true, true);
      }
    },
    _toggle: function(menu, v, force, internal){
      var ison, ch, delta, sh, n, this$ = this;
      force == null && (force = false);
      internal == null && (internal = false);
      ison = menu.parentNode.classList.contains('show');
      if ((v = v != null
        ? v
        : !ison) === ison && !force) {
        return;
      }
      if (this.exclusive && v && !internal) {
        Array.from(this.root.querySelectorAll('.ldfd.show > .ldfd-menu')).map(function(it){
          if (it.contains(menu) || menu.contains(it)) {
            return;
          }
          return this$._toggle(it, false, false, true);
        });
      }
      ch = getComputedStyle(menu).height || 0;
      menu.style.height = "";
      menu.offsetHeight;
      delta = 0;
      if (internal) {
        delta = this._delta.wk.get(menu) || 0;
        this._delta.wk['delete'](menu);
      }
      sh = menu.scrollHeight + delta;
      menu.style.height = ch;
      menu.offsetHeight;
      menu.style.height = (!v ? 0 : sh) + "px";
      menu.parentNode.classList.toggle('show', v);
      n = menu;
      while (n.parentNode && n.parentNode !== this.root) {
        n = n.parentNode;
        if (!n.matches('.ldfd-menu')) {
          continue;
        }
        this.delta(n, (!v ? 0 : sh) - +ch.replace('px', ''));
        break;
      }
      return v;
    },
    delta: function(node, value){
      var ret;
      this._delta.wk.set(node, ret = (this._delta.wk.get(node) || 0) + value);
      return this._delta.set.add(node);
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldfolder;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldfolder = ldfolder;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(){
  var lc, ldnotify;
  lc = {};
  ldnotify = function(opt){
    var this$ = this;
    opt == null && (opt = {});
    this.opt = {
      className: ['ldnotify-item'],
      classIn: ['ldnotify-in'],
      classOut: ['ldnotify-out'],
      delay: 3000
    };
    import$(this.opt, opt);
    ['className', 'classIn', 'classOut'].map(function(it){
      if (typeof this$.opt[it] === 'string') {
        return this$.opt[it] = this$.opt[it].split(' ').filter(function(it){
          return it.trim();
        });
      }
    });
    if (opt.classByType) {
      this.classByType = opt.classByType;
    }
    this.root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    if (!this.root) {
      this.root = document.body.appendChild(document.createElement('div'));
    }
    this.root.classList.add('ldnotify');
    return this;
  };
  ldnotify.prototype = import$(Object.create(Object.prototype), {
    classByType: function(it){
      return "ldnotify-" + it;
    },
    send: function(type, msg){
      var node, span, this$ = this;
      node = document.createElement('div');
      span = document.createElement('span');
      node.appendChild(span);
      node.setAttribute('class', (this.opt.className.concat(this.opt.classIn, [this.classByType(type)])).join(' '));
      span.innerText = msg;
      this.root.insertBefore(node, this.root.childNodes[0]);
      return setTimeout(function(){
        node.classList.remove.apply(node.classList, this$.opt.classIn);
        node.classList.add.apply(node.classList, this$.opt.classOut);
        return setTimeout(function(){
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }, this$.opt.delay);
      }, this.opt.delay);
    }
  });
  ldnotify.send = function(){
    var args, res$, i$, to$;
    res$ = [];
    for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    args = res$;
    if (!lc.obj) {
      lc.obj = new ldnotify();
    }
    return lc.obj.send.apply(lc.obj, args);
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldnotify;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldnotify = ldnotify;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(){ var curegex = [
[
  {
    "name": "email",
    "rule": "^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.[a-z]{2,}|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$",
    "flag": "i"
  },
  {
    "name": "url",
    "rule": "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)"
  },
  {
    "name": "password-len8-cn",
    "rule": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
  },
  {
    "name": "password-len8-cns",
    "rule": "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
  },
  {
    "name": "password-len8-uln",
    "rule": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
  },
  {
    "name": "password-len8-ulns",
    "rule": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  }
]
];
var map, main;
map = {};
curegex.map(function(regs){
  return regs.map(function(it){
    return map[it.name] = it;
  });
});
main = {
  get: function(name, engine){
    var obj;
    if (!engine) {
      engine = this._engine || RegExp;
    }
    if (!(obj = map[name])) {
      return null;
    }
    return new engine(obj.rule, obj.flag || []);
  },
  engine: function(it){
    return this._engine = it;
  },
  raw: function(name){
    return map[name];
  }
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = main;
}
if (typeof window != 'undefined' && window !== null) {
  window.curegex = main;
}
})();
(function(){
  var zmgr;
  zmgr = function(opt){
    opt == null && (opt = {});
    this.opt = opt;
    this.stack = [];
    this.step = opt.step || 1;
    if (opt.init != null) {
      this.init = opt.init;
    }
    this._g = import$(import$({}, zmgr.layer), opt.layer || {});
    this._v = {};
    this._s = {};
    return this;
  };
  zmgr.prototype = import$(Object.create(Object.prototype), {
    scope: function(n, s){
      var nv, this$ = this;
      nv = typeof n === 'number'
        ? n
        : this._g[n];
      return {
        add: function(_n, _s){
          var _nv;
          if (!(_n != null)) {
            _n = n;
          } else {
            _nv = typeof _n === 'number'
              ? _n
              : this$._g[_n];
            _n = this$.step < 0
              ? _nv < nv ? _n : n
              : _nv > nv ? _n : n;
          }
          return this$.add(_n, _s != null ? _s : s);
        },
        remove: function(_n, _v){
          return this$.remove(_n != null ? _n : n, _v);
        }
      };
    },
    add: function(v, s){
      var n, ref$;
      s == null && (s = 0);
      if (!(v != null) || typeof v === 'number') {
        if (!(v != null)) {
          v = this.init;
        }
        if (this.init != null) {
          v = this.step > 0
            ? Math.max(this.init, v)
            : Math.min(this.init, v);
        }
        if (!(this.value != null)) {
          this.value = v;
        }
        v = this.step > 0
          ? Math.max(this.value, v)
          : Math.min(this.value, v);
        v = v + (this.step > 0
          ? 1
          : -1) * Math.max(Math.abs(this.step), Math.abs(s));
        this.stack.push(v);
        this.value = v;
        return v;
      } else {
        n = v;
        v = (this.step > 0
          ? Math.max
          : Math.min)(this._g[n], this._v[n] || this._g[n]);
        v = v + (this.step > 0
          ? 1
          : -1) * Math.max(Math.abs(this.step), Math.abs(s));
        ((ref$ = this._s)[n] || (ref$[n] = [])).push(v);
        this._v[n] = v;
        return v;
      }
    },
    remove: function(n, v){
      var i, ref$;
      if (typeof n === 'number') {
        if (!~(i = this.stack.indexOf(n))) {
          return;
        }
        this.stack.splice(i, 1);
        return this.value = (ref$ = this.stack)[ref$.length - 1];
      } else {
        if (!(i = ((ref$ = this._s)[n] || (ref$[n] = [])).indexOf(v))) {
          return;
        }
        ((ref$ = this._s)[n] || (ref$[n] = [])).splice(i, 1);
        return this._v[n] = (ref$ = this._s)[ref$.length - 1];
      }
    }
  });
  zmgr.layer = {
    notify: 5000,
    splash: 4000,
    modal: 3000,
    fixed: 2000,
    float: 1000,
    base: 1
  };
  zmgr.notify = 'notify';
  zmgr.splash = 'splash';
  zmgr.modal = 'modal';
  zmgr.fixed = 'fixed';
  zmgr.float = 'float';
  zmgr.base = 'base';
  if (typeof module != 'undefined' && module !== null) {
    module.exports = zmgr;
  } else if (typeof window != 'undefined' && window !== null) {
    window.zmgr = zmgr;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
