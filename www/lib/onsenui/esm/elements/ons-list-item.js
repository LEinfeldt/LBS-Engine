import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import ons from '../ons';
import util from '../ons/util';
import styler from '../ons/styler';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

var defaultClassName = 'list-item';
var scheme = {
  '.list-item': 'list-item--*',
  '.list-item__left': 'list-item--*__left',
  '.list-item__center': 'list-item--*__center',
  '.list-item__right': 'list-item--*__right',
  '.list-item__label': 'list-item--*__label',
  '.list-item__title': 'list-item--*__title',
  '.list-item__subtitle': 'list-item--*__subtitle',
  '.list-item__thumbnail': 'list-item--*__thumbnail',
  '.list-item__icon': 'list-item--*__icon'
};

/**
 * @element ons-list-item
 * @category list
 * @modifier tappable
 *   [en]Make the list item change appearance when it's tapped. On iOS it is better to use the "tappable" and "tap-background-color" attribute for better behavior when scrolling.[/en]
 *   [ja]タップやクリックした時に効果が表示されるようになります。[/ja]
 * @modifier chevron
 *   [en]Display a chevron at the right end of the list item and make it change appearance when tapped.[/en]
 *   [ja][/ja]
 * @modifier longdivider
 *   [en]Displays a long horizontal divider between items.[/en]
 *   [ja][/ja]
 * @modifier nodivider
 *   [en]Removes the divider between list items.[/en]
 *   [ja][/ja]
 * @modifier material
 *   [en]Display a Material Design list item.[/en]
 *   [ja][/ja]
 * @description
 *   [en]
 *     Component that represents each item in a list. The list item is composed of three parts that are represented with the `left`, `center` and `right` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *
 *     ```
 *     <ons-list-item>
 *       <div class="left">Left</div>
 *       <div class="center">Center</div>
 *       <div class="right">Right</div>
 *     </ons-list-item>
 *     ```
 *
 *     There is also a number of classes (prefixed with `list-item__*`) that help when putting things like icons and thumbnails into the list items.
 *   [/en]
 *   [ja][/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @codepen yxcCt
 * @tutorial vanilla/Reference/list
 * @example
 * <ons-list-item>
 *   <div class="left">
 *     <ons-icon icon="md-face" class="list-item__icon"></ons-icon>
 *   </div>
 *   <div class="center">
 *     <div class="list-item__title">Title</div>
 *     <div class="list-item__subtitle">Subtitle</div>
 *   </div>
 *   <div class="right">
 *     <ons-switch></ons-switch>
 *   </div>
 * </ons-list-item>
 */

var ListItemElement = function (_BaseElement) {
  _inherits(ListItemElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the list item.[/en]
   *   [ja]各要素の表現を指定します。[/ja]
   */

  /**
   * @attribute lock-on-drag
   * @type {String}
   * @description
   *   [en]Prevent vertical scrolling when the user drags horizontally.[/en]
   *   [ja]この属性があると、ユーザーがこの要素を横方向にドラッグしている時に、縦方向のスクロールが起きないようになります。[/ja]
   */

  /**
   * @attribute tappable
   * @type {Boolean}
   * @description
   *   [en]Makes the element react to taps.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute tap-background-color
   * @type {Color}
   * @description
   *   [en] Changes the background color when tapped. For this to work, the attribute "tappable" needs to be set. The default color is "#d9d9d9". It will display as a ripple effect on Android.[/en]
   *   [ja][/ja]
   */

  function ListItemElement() {
    _classCallCheck(this, ListItemElement);

    var _this = _possibleConstructorReturn(this, (ListItemElement.__proto__ || _Object$getPrototypeOf(ListItemElement)).call(this));

    contentReady(_this, function () {
      _this._compile();
    });
    return _this;
  }

  _createClass(ListItemElement, [{
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);

      this.classList.add(defaultClassName);

      var left = void 0,
          center = void 0,
          right = void 0;

      for (var i = 0; i < this.children.length; i++) {
        var el = this.children[i];

        if (el.classList.contains('left')) {
          el.classList.add('list-item__left');
          left = el;
        } else if (el.classList.contains('center')) {
          center = el;
        } else if (el.classList.contains('right')) {
          el.classList.add('list-item__right');
          right = el;
        }
      }

      if (!center) {
        center = document.createElement('div');

        if (!left && !right) {
          while (this.childNodes[0]) {
            center.appendChild(this.childNodes[0]);
          }
        } else {
          for (var _i = this.childNodes.length - 1; _i >= 0; _i--) {
            var _el = this.childNodes[_i];
            if (_el !== left && _el !== right) {
              center.insertBefore(_el, center.firstChild);
            }
          }
        }

        this.insertBefore(center, right || null);
      }

      center.classList.add('center');
      center.classList.add('list-item__center');

      util.updateRipple(this);

      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;
        case 'ripple':
          util.updateRipple(this);
          break;
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._setupListeners(true);
      this._originalBackgroundColor = this.style.backgroundColor;
      this.tapped = false;
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._setupListeners(false);
    }
  }, {
    key: '_setupListeners',
    value: function _setupListeners(add) {
      var action = (add ? 'add' : 'remove') + 'EventListener';
      this[action]('drag', this._onDrag);
      this[action]('touchstart', this._onTouch);
      this[action]('mousedown', this._onTouch);
      this[action]('touchend', this._onRelease);
      this[action]('touchmove', this._onRelease);
      this[action]('touchcancel', this._onRelease);
      this[action]('mouseup', this._onRelease);
      this[action]('mouseout', this._onRelease);
      this[action]('touchleave', this._onRelease);
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(event) {
      var gesture = event.gesture;
      // Prevent vertical scrolling if the users pans left or right.
      if (this.hasAttribute('lock-on-drag') && ['left', 'right'].indexOf(gesture.direction) > -1) {
        gesture.preventDefault();
      }
    }
  }, {
    key: '_onTouch',
    value: function _onTouch() {
      if (this.tapped) {
        return;
      }

      this.tapped = true;
      var touchStyle = { transition: 'background-color 0.0s linear 0.02s, box-shadow 0.0s linear 0.02s' };

      if (this.hasAttribute('tappable')) {
        if (this.style.backgroundColor) {
          this._originalBackgroundColor = this.style.backgroundColor;
        }

        touchStyle.backgroundColor = this.getAttribute('tap-background-color') || '#d9d9d9';
        touchStyle.boxShadow = '0px -1px 0px 0px ' + touchStyle.backgroundColor;
      }

      styler(this, touchStyle);
    }
  }, {
    key: '_onRelease',
    value: function _onRelease() {
      this.tapped = false;
      this.style.backgroundColor = this._originalBackgroundColor || '';
      styler.clear(this, 'transition boxShadow');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class', 'ripple'];
    }
  }]);

  return ListItemElement;
}(BaseElement);

export default ListItemElement;


ons.elements.ListItem = ListItemElement;
customElements.define('ons-list-item', ListItemElement);