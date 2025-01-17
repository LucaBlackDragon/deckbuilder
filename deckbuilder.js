function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var Options =
/**
 * The maximum amount of cards that the deck can contain.
 * 
 * @property {number}
 * 
 * @default Infinity
 */

/**
 * @param {Object} options The initialiation parameters from Deckbuilder.
 */
function Options() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Options);

  _defineProperty(this, "maxCardCount", Infinity);

  Object.assign(this, options);
};

/**
 * Clone an object and its properties.
 * 
 * @param {Object} o The object to clone.
 * 
 * @returns {Object} Returns the cloned object.
 */
function deepCopy(o) {
  var out;
  var key;
  var v;
  out = Array.isArray(o) ? [] : {};

  for (key in o) {
    v = o[key];
    out[key] = _typeof(v) === 'object' && v !== null ? deepCopy(v) : v;
  }

  return out;
}

/**
 * Shuffle the deck using the Fisher-Yates method.
 * 
 * The Fisher-Yates method is one of the best array randomization techniques available which makes it a good method for
 * shuffling the deck.
 * 
 * @param {Array<Card>} deck The deck to shuffle.
 * @param {number} [times=1] The number of times to repeat the shuffle using this method.
 * 
 * @returns {Array<Card>|boolean} Returns the shuffled deck
 */
function fisherYates(deck) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  while (times > 0) {
    var i = deck.length;
    if (i === 0) return false;

    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var cardI = deck[i];
      var cardJ = deck[j];
      deck[i] = cardJ;
      deck[j] = cardI;
    }

    times--;
  }

  return deck;
}
/**
 * Shuffle the deck using the strip method.
 * 
 * The strip method involves cutting the deck at a random point and putting the cut part back in the deck at a random
 * position.
 * 
 * @param {Array<Card>} deck The deck to shuffle.
 * @param {number} [times=1] The number of times to repeat the shuffle using this method.
 * 
 * @returns {Array<Card>} Returns the shuffled deck
 */

function strip(deck) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var cutMax = Math.floor(deck.length * (1 / 4));
  var splitNum = randomInt(3, cutMax);

  while (times > -1) {
    var deckSplit = deck.splice(0, splitNum);
    var insertPos = randomInt(0, deck.length);
    var deck1 = deck.slice(0, insertPos);
    var deck2 = deck.slice(insertPos);
    deck = deck1.concat(deckSplit, deck2);
    times--;
  }

  return deck;
}
/**
 * Generates a random number between two values.
 * 
 * @param {number} min The minimum value that can be returned.
 * @param {number} max The maximum value that can be returned.
 * 
 * @returns {number} Returns a value between the minimum and maximum values.
 */

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Deckbuilder helps you create and manage car decks for any type of card game.
 */
var Deckbuilder = /*#__PURE__*/function () {
  /**
   * A reference to the options for this instance.
   * 
   * @property {Options}
   */

  /**
   * A reference to the current deck of cards.
   * 
   * @property {Array<Card>}
   */

  /**
   * The total number of cards in this deck.
   * 
   * @property {number}
   */

  /**
   * A reference to the cards that are currently drawn out and not a part of the deck.
   * 
   * @property {Array<Card>}
   */

  /**
   * A reference to the cards that are currently discarded and not part of the deck.
   * 
   * @property {Array<Card>}
   */

  /**
   * The shuffle methods available for use.
   * 
   * @property {any}
   */

  /**
   * @param {Object} [options]
   * @param {number} [options.maxCardCount=Infinity] The maximum number of cards that can be in this deck.
   */
  function Deckbuilder(options) {
    _classCallCheck(this, Deckbuilder);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "deck", []);

    _defineProperty(this, "count", 0);

    _defineProperty(this, "drawn", []);

    _defineProperty(this, "discarded", []);

    _defineProperty(this, "SHUFFLE_METHODS", {
      STRIP: strip,
      FISHERYATES: fisherYates
    });

    this.options = new Options(options);
  }
  /**
   * Adds one or more cards to the deck.
   * 
   * A card must be an object and it can have any properties that suit your needs but at the very least it needs an id that Deckbuilder
   * can use to keep track of the card.
   * 
   * @param {Card | Array<Card>} cards One or more cards to add to the deck.
   * @param {boolean} [shuffleIn=false] If this is set to true, the card will be inserted into a random position in the deck instead of being added to the bottom.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */


  _createClass(Deckbuilder, [{
    key: "add",
    value: function add(cards) {
      var shuffleIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!Array.isArray(cards)) cards = [cards];

      var _iterator = _createForOfIteratorHelper(cards),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _card = _step.value;

          if (!_card.id) {
            console.warn('Card is missing the id property, skipping...');
            continue;
          }

          if (this.count === this.options.maxCardCount) {
            console.warn('The maximum amount of cards for this deck has been reached');
            return this;
          }

          if (shuffleIn) {
            var randomPosition = Math.floor(Math.random() * this.deck.length);
            this.deck.splice(randomPosition, 0, _card);
          } else this.deck.push(_card);

          this.count++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this;
    }
    /**
     * Remove one or more cards from the deck.
     * 
     * The card or cards to be removed need to be referenced by their id property.
     * 
     * @param {string|Array<string>} ids The id or ids of the cards to remove from the deck.
     * 
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "remove",
    value: function remove(ids) {
      if (!Array.isArray(ids)) ids = [ids];
      this.deck = this.deck.filter(function (card) {
        return !ids.includes(card.id);
      });
      return this;
    }
    /**
     * Edits a card's properties from the deck.
     * 
     * To define a new property, just set a new key and value. To edit a property, define the key to edit and the new value to set for that key. To
     * remove a property, define the key to delete.
     * 
     * @param {string} id The id of the card to edit.
     * @param {string} key The name of the property to add, edit, or remove.
     * @param {any} [value=null] The value to add to the key. If removing a key just leave this blank.
     * 
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "edit",
    value: function edit(id, key) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _iterator2 = _createForOfIteratorHelper(this.deck),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _card2 = _step2.value;

          if (_card2.id === id) {
            value ? _card2[key] = value : delete _card2[key];
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return this;
    }
    /**
     * Shuffles the deck using one of the available shuffle methods any number of times.
     * 
     * @param {number} [times=1] The number of times to shuffle the deck.
     * @param {string} [method='fisherYates'] The method to use for shuffling the deck.
     * 
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "shuffle",
    value: function shuffle() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.SHUFFLE_METHODS.FISHERYATES;
      this.deck = method(this.deck, times);
      return this;
    }
    /**
     * Deals a specified number of cards from the deck to a specified number of players.
     * 
     * The cards can be dealt one at a time or all at once for each player.
     * 
     * @param {number} players The number of players to deal cards to.
     * @param {number} cards The amount of cards to deal to each player.
     * @param {boolean} [allAtOnce=false] If set to true, all the cards will be dealt to each player instead of just one at a time.
     * 
     * @returns {Deal} Returns a Deal object containing the players and the cards they have been dealt.
     */

  }, {
    key: "deal",
    value: function deal(players, cards) {
      var _this = this;
      var deal = {};

      var _deck = deepCopy(this.deck);

      var totalCards = players * cards;

      var _loop = function _loop(i, _player) {
        if (_player >= players) _player = 0;
        var currentPlayer = _player + 1;
        if (!deal[currentPlayer]) deal[currentPlayer] = [];
        deal[currentPlayer].push(_this.deck[i]);

        _this.drawn.push(_this.deck[i]);

        _deck.filter(function (card) {
          if (card.id == _this.deck[i].id) _deck.splice(_deck.indexOf(card), 1);
        });

        player = _player;
      };

      for (var i = 0, player = 0; i < totalCards; ++i, ++player) {
        _loop(i, player);
      }

      this.deck = _deck;
      return deal;
    }
    /**
     * Draw any number of cards from the top of the deck.
     * 
     * @param {number} cards The number of cards to draw.
     * 
     * @returns {Array<Card>} The cards that have been drawn.
     */

  }, {
    key: "draw",
    value: function draw(cards) {
      var _this2 = this;

      var drawn = [];

      var _deck = deepCopy(this.deck);

      var _loop2 = function _loop2(i) {
        _this2.drawn.push(_this2.deck[i]);

        _deck.filter(function (card) {
          if (card.id == _this2.deck[i].id) _deck.splice(_deck.indexOf(card), 1);
        });
      };

      for (var i = 0; i < cards; ++i) {
        _loop2(i);
      }

      this.deck = _deck;
      return drawn;
    }
    /**
     * Pick one or more cards from the deck by their id/ids.
     * 
     * @param {string|Array<string>} ids The id or ids of the cards to pick.
     * 
     * @returns {Array<Card>} Returns the picked cards.
     */

  }, {
    key: "pick",
    value: function pick(ids) {
      if (!Array.isArray(ids)) ids = [ids];
      return this.deck.filter(function (card) {
        return ids.includes(card.id);
      });
    }
    /**
     * 
     * Searches and draws cards from the deck
     * 
     * @param criteria search criteria
     * @param max maximum number of cards that must match the criteria. If specified and reached, further cards will not be considered
     * @param min minimum number of cards that must match the criteria. If not reached, no card will be drawn
     * @returns cards matching the criteria (if min is satisfied), up to max (if specified)
     */

  }, {
    key: "search",
    value: function search(criteria, max, min) {
      if (!min) min = 1;
      if (!max) max = Infinity;
      var matches = [];

      for (var i = 0; i < this.deck.length; ++i) {
        if (matches.length >= max) continue;

        if (criteria(this.deck[i], i, this.deck)) {
          matches.push(this.deck[i]);
        }
      }

      if (matches.length >= min) {
        this.drawn = [].concat(_toConsumableArray(this.drawn), matches);
        this.deck = this.deck.filter(function (card) {
          return !matches.map(function (card) {
            return card.id;
          }).includes(card.id);
        });
        return matches;
      }

      return [];
    }
    /**
     * Discards any number of cards from the draw pile and optionally from the deck.
     * 
     * @param {string|Array<string>} ids The id or ids of the cards to discard.
     * @param {boolean} [checkDeck=false] If set to true, it will also check the deck for cards it can discard and not just the drawn pile.
     * 
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "discard",
    value: function discard(ids) {
      var checkDeck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!Array.isArray(ids)) ids = [ids];
      this.discarded = this.drawn.filter(function (card) {
        return ids.includes(card.id);
      });
      this.drawn = this.drawn.filter(function (card) {
        return !ids.includes(card.id);
      });

      if (checkDeck) {
        this.discarded = this.discarded.concat(this.deck.filter(function (card) {
          return ids.includes(card.id);
        }));
        this.deck = this.deck.filter(function (card) {
          return !ids.includes(card.id);
        });
      }

      return this;
    }
    /**
     * Returns cards from the drawn pile back to the deck.
     *
     * @param {string|Array<string>} [cards] By default all cards from the draw pile will be returned, this option can be used to return only certain cards from the drawn pile.
     *  
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "returnDrawn",
    value: function returnDrawn() {
      var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!Array.isArray(cards)) cards = [cards];

      if (cards.length === 0) {
        this.deck = this.deck.concat(this.drawn);
        this.drawn = [];
        return this;
      }

      var cardsToReturn = this.drawn.filter(function (card) {
        return cards.includes(card.id);
      });
      this.deck = this.deck.concat(cardsToReturn);
      this.drawn = this.drawn.filter(function (card) {
        return !cards.includes(card.id);
      });
      return this;
    }
    /**
     * Returns cards from the discarded pile back to the deck.
     *
     * @param {string|Array<string>} [cards] By default all cards from the discarded pile will be returned, this option can be used to return only certain cards from the discarded pile.
     *  
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "returnDiscarded",
    value: function returnDiscarded() {
      var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!Array.isArray(cards)) cards = [cards];

      if (cards.length === 0) {
        this.deck = this.deck.concat(this.discarded);
        this.discarded = [];
        return this;
      }

      var cardsToReturn = this.discarded.filter(function (card) {
        return cards.includes(card.id);
      });
      this.deck = this.deck.concat(cardsToReturn);
      this.discarded = this.discarded.filter(function (card) {
        return !cards.includes(card.id);
      });
      return this;
    }
  }]);

  return Deckbuilder;
}();

export default Deckbuilder;
