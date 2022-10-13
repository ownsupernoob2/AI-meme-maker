"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
        }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];return o(n || r);
        }, p, p.exports, r, e, n, t);
      }return n[i].exports;
    }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }return o;
  }return r;
})()({ 1: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
      return [];
    };

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
      return '/';
    };
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
      return 0;
    };
  }, {}], 2: [function (require, module, exports) {
    /* eslint-env browser */
    module.exports = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' ? self.FormData : window.FormData;
  }, {}], 3: [function (require, module, exports) {
    "use strict";
    /* tslint:disable */
    /* eslint-disable */
    /**
     * OpenAI API
     * APIs for sampling from and fine-tuning language models
     *
     * The version of the OpenAPI document: 1.0.5
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenAIApi = exports.OpenAIApiFactory = exports.OpenAIApiFp = exports.OpenAIApiAxiosParamCreator = void 0;
    var axios_1 = require("axios");
    // Some imports not used depending on template conditions
    // @ts-ignore
    var common_1 = require("./common");
    // @ts-ignore
    var base_1 = require("./base");
    /**
     * OpenAIApi - axios parameter creator
     * @export
     */
    exports.OpenAIApiAxiosParamCreator = function (configuration) {
      var _this = this;

      return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune: function cancelFineTune(fineTuneId) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // verify required parameter 'fineTuneId' is not null or undefined
                    common_1.assertParamExists('cancelFineTune', 'fineTuneId', fineTuneId);
                    localVarPath = "/fine-tunes/{fine_tune_id}/cancel".replace("{" + "fine_tune_id" + "}", encodeURIComponent(String(fineTuneId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        },
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer: function createAnswer(createAnswerRequest) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // verify required parameter 'createAnswerRequest' is not null or undefined
                    common_1.assertParamExists('createAnswer', 'createAnswerRequest', createAnswerRequest);
                    localVarPath = "/answers";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createAnswerRequest, localVarRequestOptions, configuration);
                    return _context2.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        },
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification: function createClassification(createClassificationRequest) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    // verify required parameter 'createClassificationRequest' is not null or undefined
                    common_1.assertParamExists('createClassification', 'createClassificationRequest', createClassificationRequest);
                    localVarPath = "/classifications";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createClassificationRequest, localVarRequestOptions, configuration);
                    return _context3.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 14:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        },
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion: function createCompletion(createCompletionRequest) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    // verify required parameter 'createCompletionRequest' is not null or undefined
                    common_1.assertParamExists('createCompletion', 'createCompletionRequest', createCompletionRequest);
                    localVarPath = "/completions";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createCompletionRequest, localVarRequestOptions, configuration);
                    return _context4.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 14:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
        },
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit: function createEdit(createEditRequest) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    // verify required parameter 'createEditRequest' is not null or undefined
                    common_1.assertParamExists('createEdit', 'createEditRequest', createEditRequest);
                    localVarPath = "/edits";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEditRequest, localVarRequestOptions, configuration);
                    return _context5.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));
        },
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding: function createEmbedding(createEmbeddingRequest) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    // verify required parameter 'createEmbeddingRequest' is not null or undefined
                    common_1.assertParamExists('createEmbedding', 'createEmbeddingRequest', createEmbeddingRequest);
                    localVarPath = "/embeddings";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEmbeddingRequest, localVarRequestOptions, configuration);
                    return _context6.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 14:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));
        },
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {any} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile: function createFile(file, purpose) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, localVarFormParams, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    // verify required parameter 'file' is not null or undefined
                    common_1.assertParamExists('createFile', 'file', file);
                    // verify required parameter 'purpose' is not null or undefined
                    common_1.assertParamExists('createFile', 'purpose', purpose);
                    localVarPath = "/files";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};
                    localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();

                    if (file !== undefined) {
                      localVarFormParams.append('file', file);
                    }
                    if (purpose !== undefined) {
                      localVarFormParams.append('purpose', purpose);
                    }
                    localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = localVarFormParams;
                    return _context7.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 18:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));
        },
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune: function createFineTune(createFineTuneRequest) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    // verify required parameter 'createFineTuneRequest' is not null or undefined
                    common_1.assertParamExists('createFineTune', 'createFineTuneRequest', createFineTuneRequest);
                    localVarPath = "/fine-tunes";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createFineTuneRequest, localVarRequestOptions, configuration);
                    return _context8.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 14:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));
        },
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch: function createSearch(engineId, createSearchRequest) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    // verify required parameter 'engineId' is not null or undefined
                    common_1.assertParamExists('createSearch', 'engineId', engineId);
                    // verify required parameter 'createSearchRequest' is not null or undefined
                    common_1.assertParamExists('createSearch', 'createSearchRequest', createSearchRequest);
                    localVarPath = "/engines/{engine_id}/search".replace("{" + "engine_id" + "}", encodeURIComponent(String(engineId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = common_1.serializeDataIfNeeded(createSearchRequest, localVarRequestOptions, configuration);
                    return _context9.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 15:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          }));
        },
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile: function deleteFile(fileId) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    // verify required parameter 'fileId' is not null or undefined
                    common_1.assertParamExists('deleteFile', 'fileId', fileId);
                    localVarPath = "/files/{file_id}".replace("{" + "file_id" + "}", encodeURIComponent(String(fileId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context10.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));
        },
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel: function deleteModel(model) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    // verify required parameter 'model' is not null or undefined
                    common_1.assertParamExists('deleteModel', 'model', model);
                    localVarPath = "/models/{model}".replace("{" + "model" + "}", encodeURIComponent(String(model)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context11.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11, this);
          }));
        },
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile: function downloadFile(fileId) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    // verify required parameter 'fileId' is not null or undefined
                    common_1.assertParamExists('downloadFile', 'fileId', fileId);
                    localVarPath = "/files/{file_id}/content".replace("{" + "file_id" + "}", encodeURIComponent(String(fileId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context12.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee12, this);
          }));
        },
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines: function listEngines() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    localVarPath = "/engines";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context13.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 11:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13, this);
          }));
        },
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles: function listFiles() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    localVarPath = "/files";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context14.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 11:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee14, this);
          }));
        },
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents: function listFineTuneEvents(fineTuneId, stream) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    // verify required parameter 'fineTuneId' is not null or undefined
                    common_1.assertParamExists('listFineTuneEvents', 'fineTuneId', fineTuneId);
                    localVarPath = "/fine-tunes/{fine_tune_id}/events".replace("{" + "fine_tune_id" + "}", encodeURIComponent(String(fineTuneId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    if (stream !== undefined) {
                      localVarQueryParameter['stream'] = stream;
                    }
                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context15.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 13:
                  case "end":
                    return _context15.stop();
                }
              }
            }, _callee15, this);
          }));
        },
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes: function listFineTunes() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    localVarPath = "/fine-tunes";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context16.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 11:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee16, this);
          }));
        },
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels: function listModels() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    localVarPath = "/models";
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context17.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 11:
                  case "end":
                    return _context17.stop();
                }
              }
            }, _callee17, this);
          }));
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine: function retrieveEngine(engineId) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee18$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    // verify required parameter 'engineId' is not null or undefined
                    common_1.assertParamExists('retrieveEngine', 'engineId', engineId);
                    localVarPath = "/engines/{engine_id}".replace("{" + "engine_id" + "}", encodeURIComponent(String(engineId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context18.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context18.stop();
                }
              }
            }, _callee18, this);
          }));
        },
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile: function retrieveFile(fileId) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee19$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    // verify required parameter 'fileId' is not null or undefined
                    common_1.assertParamExists('retrieveFile', 'fileId', fileId);
                    localVarPath = "/files/{file_id}".replace("{" + "file_id" + "}", encodeURIComponent(String(fileId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context19.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context19.stop();
                }
              }
            }, _callee19, this);
          }));
        },
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune: function retrieveFineTune(fineTuneId) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee20$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    // verify required parameter 'fineTuneId' is not null or undefined
                    common_1.assertParamExists('retrieveFineTune', 'fineTuneId', fineTuneId);
                    localVarPath = "/fine-tunes/{fine_tune_id}".replace("{" + "fine_tune_id" + "}", encodeURIComponent(String(fineTuneId)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context20.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context20.stop();
                }
              }
            }, _callee20, this);
          }));
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel: function retrieveModel(model) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
            var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
            return regeneratorRuntime.wrap(function _callee21$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
                  case 0:
                    // verify required parameter 'model' is not null or undefined
                    common_1.assertParamExists('retrieveModel', 'model', model);
                    localVarPath = "/models/{model}".replace("{" + "model" + "}", encodeURIComponent(String(model)));
                    // use dummy base URL string because the URL constructor only accepts absolute URLs.

                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    baseOptions = void 0;

                    if (configuration) {
                      baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};

                    common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};

                    localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return _context21.abrupt("return", {
                      url: common_1.toPathString(localVarUrlObj),
                      options: localVarRequestOptions
                    });

                  case 12:
                  case "end":
                    return _context21.stop();
                }
              }
            }, _callee21, this);
          }));
        }
      };
    };
    /**
     * OpenAIApi - functional programming interface
     * @export
     */
    exports.OpenAIApiFp = function (configuration) {
      var localVarAxiosParamCreator = exports.OpenAIApiAxiosParamCreator(configuration);
      return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune: function cancelFineTune(fineTuneId, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee22$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    _context22.next = 2;
                    return localVarAxiosParamCreator.cancelFineTune(fineTuneId, options);

                  case 2:
                    localVarAxiosArgs = _context22.sent;
                    return _context22.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context22.stop();
                }
              }
            }, _callee22, this);
          }));
        },

        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer: function createAnswer(createAnswerRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee23$(_context23) {
              while (1) {
                switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.next = 2;
                    return localVarAxiosParamCreator.createAnswer(createAnswerRequest, options);

                  case 2:
                    localVarAxiosArgs = _context23.sent;
                    return _context23.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context23.stop();
                }
              }
            }, _callee23, this);
          }));
        },

        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification: function createClassification(createClassificationRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee24$(_context24) {
              while (1) {
                switch (_context24.prev = _context24.next) {
                  case 0:
                    _context24.next = 2;
                    return localVarAxiosParamCreator.createClassification(createClassificationRequest, options);

                  case 2:
                    localVarAxiosArgs = _context24.sent;
                    return _context24.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context24.stop();
                }
              }
            }, _callee24, this);
          }));
        },

        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion: function createCompletion(createCompletionRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee25$(_context25) {
              while (1) {
                switch (_context25.prev = _context25.next) {
                  case 0:
                    _context25.next = 2;
                    return localVarAxiosParamCreator.createCompletion(createCompletionRequest, options);

                  case 2:
                    localVarAxiosArgs = _context25.sent;
                    return _context25.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context25.stop();
                }
              }
            }, _callee25, this);
          }));
        },

        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit: function createEdit(createEditRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee26$(_context26) {
              while (1) {
                switch (_context26.prev = _context26.next) {
                  case 0:
                    _context26.next = 2;
                    return localVarAxiosParamCreator.createEdit(createEditRequest, options);

                  case 2:
                    localVarAxiosArgs = _context26.sent;
                    return _context26.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context26.stop();
                }
              }
            }, _callee26, this);
          }));
        },

        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding: function createEmbedding(createEmbeddingRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee27$(_context27) {
              while (1) {
                switch (_context27.prev = _context27.next) {
                  case 0:
                    _context27.next = 2;
                    return localVarAxiosParamCreator.createEmbedding(createEmbeddingRequest, options);

                  case 2:
                    localVarAxiosArgs = _context27.sent;
                    return _context27.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context27.stop();
                }
              }
            }, _callee27, this);
          }));
        },

        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {any} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile: function createFile(file, purpose, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee28$(_context28) {
              while (1) {
                switch (_context28.prev = _context28.next) {
                  case 0:
                    _context28.next = 2;
                    return localVarAxiosParamCreator.createFile(file, purpose, options);

                  case 2:
                    localVarAxiosArgs = _context28.sent;
                    return _context28.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context28.stop();
                }
              }
            }, _callee28, this);
          }));
        },

        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune: function createFineTune(createFineTuneRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee29$(_context29) {
              while (1) {
                switch (_context29.prev = _context29.next) {
                  case 0:
                    _context29.next = 2;
                    return localVarAxiosParamCreator.createFineTune(createFineTuneRequest, options);

                  case 2:
                    localVarAxiosArgs = _context29.sent;
                    return _context29.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context29.stop();
                }
              }
            }, _callee29, this);
          }));
        },

        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch: function createSearch(engineId, createSearchRequest, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee30$(_context30) {
              while (1) {
                switch (_context30.prev = _context30.next) {
                  case 0:
                    _context30.next = 2;
                    return localVarAxiosParamCreator.createSearch(engineId, createSearchRequest, options);

                  case 2:
                    localVarAxiosArgs = _context30.sent;
                    return _context30.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context30.stop();
                }
              }
            }, _callee30, this);
          }));
        },

        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile: function deleteFile(fileId, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee31$(_context31) {
              while (1) {
                switch (_context31.prev = _context31.next) {
                  case 0:
                    _context31.next = 2;
                    return localVarAxiosParamCreator.deleteFile(fileId, options);

                  case 2:
                    localVarAxiosArgs = _context31.sent;
                    return _context31.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context31.stop();
                }
              }
            }, _callee31, this);
          }));
        },

        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel: function deleteModel(model, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee32$(_context32) {
              while (1) {
                switch (_context32.prev = _context32.next) {
                  case 0:
                    _context32.next = 2;
                    return localVarAxiosParamCreator.deleteModel(model, options);

                  case 2:
                    localVarAxiosArgs = _context32.sent;
                    return _context32.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context32.stop();
                }
              }
            }, _callee32, this);
          }));
        },

        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile: function downloadFile(fileId, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee33() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee33$(_context33) {
              while (1) {
                switch (_context33.prev = _context33.next) {
                  case 0:
                    _context33.next = 2;
                    return localVarAxiosParamCreator.downloadFile(fileId, options);

                  case 2:
                    localVarAxiosArgs = _context33.sent;
                    return _context33.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context33.stop();
                }
              }
            }, _callee33, this);
          }));
        },

        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines: function listEngines(options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee34() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee34$(_context34) {
              while (1) {
                switch (_context34.prev = _context34.next) {
                  case 0:
                    _context34.next = 2;
                    return localVarAxiosParamCreator.listEngines(options);

                  case 2:
                    localVarAxiosArgs = _context34.sent;
                    return _context34.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context34.stop();
                }
              }
            }, _callee34, this);
          }));
        },

        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles: function listFiles(options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee35() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee35$(_context35) {
              while (1) {
                switch (_context35.prev = _context35.next) {
                  case 0:
                    _context35.next = 2;
                    return localVarAxiosParamCreator.listFiles(options);

                  case 2:
                    localVarAxiosArgs = _context35.sent;
                    return _context35.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context35.stop();
                }
              }
            }, _callee35, this);
          }));
        },

        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents: function listFineTuneEvents(fineTuneId, stream, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee36() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee36$(_context36) {
              while (1) {
                switch (_context36.prev = _context36.next) {
                  case 0:
                    _context36.next = 2;
                    return localVarAxiosParamCreator.listFineTuneEvents(fineTuneId, stream, options);

                  case 2:
                    localVarAxiosArgs = _context36.sent;
                    return _context36.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context36.stop();
                }
              }
            }, _callee36, this);
          }));
        },

        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes: function listFineTunes(options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee37() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee37$(_context37) {
              while (1) {
                switch (_context37.prev = _context37.next) {
                  case 0:
                    _context37.next = 2;
                    return localVarAxiosParamCreator.listFineTunes(options);

                  case 2:
                    localVarAxiosArgs = _context37.sent;
                    return _context37.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context37.stop();
                }
              }
            }, _callee37, this);
          }));
        },

        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels: function listModels(options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee38() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee38$(_context38) {
              while (1) {
                switch (_context38.prev = _context38.next) {
                  case 0:
                    _context38.next = 2;
                    return localVarAxiosParamCreator.listModels(options);

                  case 2:
                    localVarAxiosArgs = _context38.sent;
                    return _context38.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context38.stop();
                }
              }
            }, _callee38, this);
          }));
        },

        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine: function retrieveEngine(engineId, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee39() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee39$(_context39) {
              while (1) {
                switch (_context39.prev = _context39.next) {
                  case 0:
                    _context39.next = 2;
                    return localVarAxiosParamCreator.retrieveEngine(engineId, options);

                  case 2:
                    localVarAxiosArgs = _context39.sent;
                    return _context39.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context39.stop();
                }
              }
            }, _callee39, this);
          }));
        },

        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile: function retrieveFile(fileId, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee40() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee40$(_context40) {
              while (1) {
                switch (_context40.prev = _context40.next) {
                  case 0:
                    _context40.next = 2;
                    return localVarAxiosParamCreator.retrieveFile(fileId, options);

                  case 2:
                    localVarAxiosArgs = _context40.sent;
                    return _context40.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context40.stop();
                }
              }
            }, _callee40, this);
          }));
        },

        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune: function retrieveFineTune(fineTuneId, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee41() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee41$(_context41) {
              while (1) {
                switch (_context41.prev = _context41.next) {
                  case 0:
                    _context41.next = 2;
                    return localVarAxiosParamCreator.retrieveFineTune(fineTuneId, options);

                  case 2:
                    localVarAxiosArgs = _context41.sent;
                    return _context41.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context41.stop();
                }
              }
            }, _callee41, this);
          }));
        },

        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel: function retrieveModel(model, options) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee42() {
            var localVarAxiosArgs;
            return regeneratorRuntime.wrap(function _callee42$(_context42) {
              while (1) {
                switch (_context42.prev = _context42.next) {
                  case 0:
                    _context42.next = 2;
                    return localVarAxiosParamCreator.retrieveModel(model, options);

                  case 2:
                    localVarAxiosArgs = _context42.sent;
                    return _context42.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));

                  case 4:
                  case "end":
                    return _context42.stop();
                }
              }
            }, _callee42, this);
          }));
        }
      };
    };
    /**
     * OpenAIApi - factory interface
     * @export
     */
    exports.OpenAIApiFactory = function (configuration, basePath, axios) {
      var localVarFp = exports.OpenAIApiFp(configuration);
      return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune: function cancelFineTune(fineTuneId, options) {
          return localVarFp.cancelFineTune(fineTuneId, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer: function createAnswer(createAnswerRequest, options) {
          return localVarFp.createAnswer(createAnswerRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification: function createClassification(createClassificationRequest, options) {
          return localVarFp.createClassification(createClassificationRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion: function createCompletion(createCompletionRequest, options) {
          return localVarFp.createCompletion(createCompletionRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit: function createEdit(createEditRequest, options) {
          return localVarFp.createEdit(createEditRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding: function createEmbedding(createEmbeddingRequest, options) {
          return localVarFp.createEmbedding(createEmbeddingRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {any} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile: function createFile(file, purpose, options) {
          return localVarFp.createFile(file, purpose, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune: function createFineTune(createFineTuneRequest, options) {
          return localVarFp.createFineTune(createFineTuneRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch: function createSearch(engineId, createSearchRequest, options) {
          return localVarFp.createSearch(engineId, createSearchRequest, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile: function deleteFile(fileId, options) {
          return localVarFp.deleteFile(fileId, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel: function deleteModel(model, options) {
          return localVarFp.deleteModel(model, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile: function downloadFile(fileId, options) {
          return localVarFp.downloadFile(fileId, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines: function listEngines(options) {
          return localVarFp.listEngines(options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles: function listFiles(options) {
          return localVarFp.listFiles(options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents: function listFineTuneEvents(fineTuneId, stream, options) {
          return localVarFp.listFineTuneEvents(fineTuneId, stream, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes: function listFineTunes(options) {
          return localVarFp.listFineTunes(options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels: function listModels(options) {
          return localVarFp.listModels(options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine: function retrieveEngine(engineId, options) {
          return localVarFp.retrieveEngine(engineId, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile: function retrieveFile(fileId, options) {
          return localVarFp.retrieveFile(fileId, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune: function retrieveFineTune(fineTuneId, options) {
          return localVarFp.retrieveFineTune(fineTuneId, options).then(function (request) {
            return request(axios, basePath);
          });
        },

        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel: function retrieveModel(model, options) {
          return localVarFp.retrieveModel(model, options).then(function (request) {
            return request(axios, basePath);
          });
        }
      };
    };
    /**
     * OpenAIApi - object-oriented interface
     * @export
     * @class OpenAIApi
     * @extends {BaseAPI}
     */

    var OpenAIApi = function (_base_1$BaseAPI) {
      _inherits(OpenAIApi, _base_1$BaseAPI);

      function OpenAIApi() {
        _classCallCheck(this, OpenAIApi);

        return _possibleConstructorReturn(this, (OpenAIApi.__proto__ || Object.getPrototypeOf(OpenAIApi)).apply(this, arguments));
      }

      _createClass(OpenAIApi, [{
        key: "cancelFineTune",

        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */
        value: function cancelFineTune(fineTuneId, options) {
          var _this3 = this;

          return exports.OpenAIApiFp(this.configuration).cancelFineTune(fineTuneId, options).then(function (request) {
            return request(_this3.axios, _this3.basePath);
          });
        }
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createAnswer",
        value: function createAnswer(createAnswerRequest, options) {
          var _this4 = this;

          return exports.OpenAIApiFp(this.configuration).createAnswer(createAnswerRequest, options).then(function (request) {
            return request(_this4.axios, _this4.basePath);
          });
        }
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createClassification",
        value: function createClassification(createClassificationRequest, options) {
          var _this5 = this;

          return exports.OpenAIApiFp(this.configuration).createClassification(createClassificationRequest, options).then(function (request) {
            return request(_this5.axios, _this5.basePath);
          });
        }
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createCompletion",
        value: function createCompletion(createCompletionRequest, options) {
          var _this6 = this;

          return exports.OpenAIApiFp(this.configuration).createCompletion(createCompletionRequest, options).then(function (request) {
            return request(_this6.axios, _this6.basePath);
          });
        }
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createEdit",
        value: function createEdit(createEditRequest, options) {
          var _this7 = this;

          return exports.OpenAIApiFp(this.configuration).createEdit(createEditRequest, options).then(function (request) {
            return request(_this7.axios, _this7.basePath);
          });
        }
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createEmbedding",
        value: function createEmbedding(createEmbeddingRequest, options) {
          var _this8 = this;

          return exports.OpenAIApiFp(this.configuration).createEmbedding(createEmbeddingRequest, options).then(function (request) {
            return request(_this8.axios, _this8.basePath);
          });
        }
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {any} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createFile",
        value: function createFile(file, purpose, options) {
          var _this9 = this;

          return exports.OpenAIApiFp(this.configuration).createFile(file, purpose, options).then(function (request) {
            return request(_this9.axios, _this9.basePath);
          });
        }
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createFineTune",
        value: function createFineTune(createFineTuneRequest, options) {
          var _this10 = this;

          return exports.OpenAIApiFp(this.configuration).createFineTune(createFineTuneRequest, options).then(function (request) {
            return request(_this10.axios, _this10.basePath);
          });
        }
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "createSearch",
        value: function createSearch(engineId, createSearchRequest, options) {
          var _this11 = this;

          return exports.OpenAIApiFp(this.configuration).createSearch(engineId, createSearchRequest, options).then(function (request) {
            return request(_this11.axios, _this11.basePath);
          });
        }
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "deleteFile",
        value: function deleteFile(fileId, options) {
          var _this12 = this;

          return exports.OpenAIApiFp(this.configuration).deleteFile(fileId, options).then(function (request) {
            return request(_this12.axios, _this12.basePath);
          });
        }
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "deleteModel",
        value: function deleteModel(model, options) {
          var _this13 = this;

          return exports.OpenAIApiFp(this.configuration).deleteModel(model, options).then(function (request) {
            return request(_this13.axios, _this13.basePath);
          });
        }
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "downloadFile",
        value: function downloadFile(fileId, options) {
          var _this14 = this;

          return exports.OpenAIApiFp(this.configuration).downloadFile(fileId, options).then(function (request) {
            return request(_this14.axios, _this14.basePath);
          });
        }
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "listEngines",
        value: function listEngines(options) {
          var _this15 = this;

          return exports.OpenAIApiFp(this.configuration).listEngines(options).then(function (request) {
            return request(_this15.axios, _this15.basePath);
          });
        }
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "listFiles",
        value: function listFiles(options) {
          var _this16 = this;

          return exports.OpenAIApiFp(this.configuration).listFiles(options).then(function (request) {
            return request(_this16.axios, _this16.basePath);
          });
        }
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "listFineTuneEvents",
        value: function listFineTuneEvents(fineTuneId, stream, options) {
          var _this17 = this;

          return exports.OpenAIApiFp(this.configuration).listFineTuneEvents(fineTuneId, stream, options).then(function (request) {
            return request(_this17.axios, _this17.basePath);
          });
        }
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "listFineTunes",
        value: function listFineTunes(options) {
          var _this18 = this;

          return exports.OpenAIApiFp(this.configuration).listFineTunes(options).then(function (request) {
            return request(_this18.axios, _this18.basePath);
          });
        }
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "listModels",
        value: function listModels(options) {
          var _this19 = this;

          return exports.OpenAIApiFp(this.configuration).listModels(options).then(function (request) {
            return request(_this19.axios, _this19.basePath);
          });
        }
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "retrieveEngine",
        value: function retrieveEngine(engineId, options) {
          var _this20 = this;

          return exports.OpenAIApiFp(this.configuration).retrieveEngine(engineId, options).then(function (request) {
            return request(_this20.axios, _this20.basePath);
          });
        }
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "retrieveFile",
        value: function retrieveFile(fileId, options) {
          var _this21 = this;

          return exports.OpenAIApiFp(this.configuration).retrieveFile(fileId, options).then(function (request) {
            return request(_this21.axios, _this21.basePath);
          });
        }
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "retrieveFineTune",
        value: function retrieveFineTune(fineTuneId, options) {
          var _this22 = this;

          return exports.OpenAIApiFp(this.configuration).retrieveFineTune(fineTuneId, options).then(function (request) {
            return request(_this22.axios, _this22.basePath);
          });
        }
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         * @memberof OpenAIApi
         */

      }, {
        key: "retrieveModel",
        value: function retrieveModel(model, options) {
          var _this23 = this;

          return exports.OpenAIApiFp(this.configuration).retrieveModel(model, options).then(function (request) {
            return request(_this23.axios, _this23.basePath);
          });
        }
      }]);

      return OpenAIApi;
    }(base_1.BaseAPI);

    exports.OpenAIApi = OpenAIApi;
  }, { "./base": 4, "./common": 5, "axios": 8 }], 4: [function (require, module, exports) {
    "use strict";
    /* tslint:disable */
    /* eslint-disable */
    /**
     * OpenAI API
     * APIs for sampling from and fine-tuning language models
     *
     * The version of the OpenAPI document: 1.0.5
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
    // Some imports not used depending on template conditions
    // @ts-ignore
    var axios_1 = require("axios");
    exports.BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
    /**
     *
     * @export
     */
    exports.COLLECTION_FORMATS = {
      csv: ",",
      ssv: " ",
      tsv: "\t",
      pipes: "|"
    };
    /**
     *
     * @export
     * @class BaseAPI
     */

    var BaseAPI = function BaseAPI(configuration) {
      var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : exports.BASE_PATH;
      var axios = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : axios_1.default;

      _classCallCheck(this, BaseAPI);

      this.basePath = basePath;
      this.axios = axios;
      if (configuration) {
        this.configuration = configuration;
        this.basePath = configuration.basePath || this.basePath;
      }
    };

    exports.BaseAPI = BaseAPI;
    ;
    /**
     *
     * @export
     * @class RequiredError
     * @extends {Error}
     */

    var RequiredError = function (_Error) {
      _inherits(RequiredError, _Error);

      function RequiredError(field, msg) {
        _classCallCheck(this, RequiredError);

        var _this24 = _possibleConstructorReturn(this, (RequiredError.__proto__ || Object.getPrototypeOf(RequiredError)).call(this, msg));

        _this24.field = field;
        _this24.name = "RequiredError";
        return _this24;
      }

      return RequiredError;
    }(Error);

    exports.RequiredError = RequiredError;
  }, { "axios": 8 }], 5: [function (require, module, exports) {
    "use strict";
    /* tslint:disable */
    /* eslint-disable */
    /**
     * OpenAI API
     * APIs for sampling from and fine-tuning language models
     *
     * The version of the OpenAPI document: 1.0.5
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createRequestFunction = exports.toPathString = exports.serializeDataIfNeeded = exports.setSearchParams = exports.setOAuthToObject = exports.setBearerAuthToObject = exports.setBasicAuthToObject = exports.setApiKeyToObject = exports.assertParamExists = exports.DUMMY_BASE_URL = void 0;
    var base_1 = require("./base");
    /**
     *
     * @export
     */
    exports.DUMMY_BASE_URL = 'https://example.com';
    /**
     *
     * @throws {RequiredError}
     * @export
     */
    exports.assertParamExists = function (functionName, paramName, paramValue) {
      if (paramValue === null || paramValue === undefined) {
        throw new base_1.RequiredError(paramName, "Required parameter " + paramName + " was null or undefined when calling " + functionName + ".");
      }
    };
    /**
     *
     * @export
     */
    exports.setApiKeyToObject = function (object, keyParamName, configuration) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee43() {
        var localVarApiKeyValue;
        return regeneratorRuntime.wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                if (!(configuration && configuration.apiKey)) {
                  _context43.next = 12;
                  break;
                }

                if (!(typeof configuration.apiKey === 'function')) {
                  _context43.next = 7;
                  break;
                }

                _context43.next = 4;
                return configuration.apiKey(keyParamName);

              case 4:
                _context43.t0 = _context43.sent;
                _context43.next = 10;
                break;

              case 7:
                _context43.next = 9;
                return configuration.apiKey;

              case 9:
                _context43.t0 = _context43.sent;

              case 10:
                localVarApiKeyValue = _context43.t0;

                object[keyParamName] = localVarApiKeyValue;

              case 12:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this);
      }));
    };
    /**
     *
     * @export
     */
    exports.setBasicAuthToObject = function (object, configuration) {
      if (configuration && (configuration.username || configuration.password)) {
        object["auth"] = { username: configuration.username, password: configuration.password };
      }
    };
    /**
     *
     * @export
     */
    exports.setBearerAuthToObject = function (object, configuration) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee44() {
        var accessToken;
        return regeneratorRuntime.wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                if (!(configuration && configuration.accessToken)) {
                  _context44.next = 12;
                  break;
                }

                if (!(typeof configuration.accessToken === 'function')) {
                  _context44.next = 7;
                  break;
                }

                _context44.next = 4;
                return configuration.accessToken();

              case 4:
                _context44.t0 = _context44.sent;
                _context44.next = 10;
                break;

              case 7:
                _context44.next = 9;
                return configuration.accessToken;

              case 9:
                _context44.t0 = _context44.sent;

              case 10:
                accessToken = _context44.t0;

                object["Authorization"] = "Bearer " + accessToken;

              case 12:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, this);
      }));
    };
    /**
     *
     * @export
     */
    exports.setOAuthToObject = function (object, name, scopes, configuration) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee45() {
        var localVarAccessTokenValue;
        return regeneratorRuntime.wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                if (!(configuration && configuration.accessToken)) {
                  _context45.next = 12;
                  break;
                }

                if (!(typeof configuration.accessToken === 'function')) {
                  _context45.next = 7;
                  break;
                }

                _context45.next = 4;
                return configuration.accessToken(name, scopes);

              case 4:
                _context45.t0 = _context45.sent;
                _context45.next = 10;
                break;

              case 7:
                _context45.next = 9;
                return configuration.accessToken;

              case 9:
                _context45.t0 = _context45.sent;

              case 10:
                localVarAccessTokenValue = _context45.t0;

                object["Authorization"] = "Bearer " + localVarAccessTokenValue;

              case 12:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45, this);
      }));
    };
    /**
     *
     * @export
     */
    exports.setSearchParams = function (url) {
      var searchParams = new URLSearchParams(url.search);

      for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objects[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var object = _step.value;

          for (var key in object) {
            if (Array.isArray(object[key])) {
              searchParams.delete(key);
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = object[key][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var item = _step2.value;

                  searchParams.append(key, item);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            } else {
              searchParams.set(key, object[key]);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      url.search = searchParams.toString();
    };
    /**
     *
     * @export
     */
    exports.serializeDataIfNeeded = function (value, requestOptions, configuration) {
      var nonString = typeof value !== 'string';
      var needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers['Content-Type']) : nonString;
      return needsSerialization ? JSON.stringify(value !== undefined ? value : {}) : value || "";
    };
    /**
     *
     * @export
     */
    exports.toPathString = function (url) {
      return url.pathname + url.search + url.hash;
    };
    /**
     *
     * @export
     */
    exports.createRequestFunction = function (axiosArgs, globalAxios, BASE_PATH, configuration) {
      return function () {
        var axios = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalAxios;
        var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BASE_PATH;

        var axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url });
        return axios.request(axiosRequestArgs);
      };
    };
  }, { "./base": 4 }], 6: [function (require, module, exports) {
    "use strict";
    /* tslint:disable */
    /* eslint-disable */
    /**
     * OpenAI API
     * APIs for sampling from and fine-tuning language models
     *
     * The version of the OpenAPI document: 1.0.5
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Configuration = void 0;
    var packageJson = require("../package.json");

    var Configuration = function () {
      function Configuration() {
        var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Configuration);

        this.apiKey = param.apiKey;
        this.organization = param.organization;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
        if (!this.baseOptions) {
          this.baseOptions = {};
        }
        this.baseOptions.headers = Object.assign({ 'User-Agent': "OpenAI/NodeJS/" + packageJson.version, 'Authorization': "Bearer " + this.apiKey }, this.baseOptions.headers);
        if (this.organization) {
          this.baseOptions.headers['OpenAI-Organization'] = this.organization;
        }
        if (!this.formDataCtor) {
          this.formDataCtor = require("form-data");
        }
      }
      /**
       * Check if the given MIME is a JSON MIME.
       * JSON MIME examples:
       *   application/json
       *   application/json; charset=UTF8
       *   APPLICATION/JSON
       *   application/vnd.company+json
       * @param mime - MIME (Multipurpose Internet Mail Extensions)
       * @return True if the given MIME is JSON, false otherwise.
       */


      _createClass(Configuration, [{
        key: "isJsonMime",
        value: function isJsonMime(mime) {
          var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
          return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
        }
      }]);

      return Configuration;
    }();

    exports.Configuration = Configuration;
  }, { "../package.json": 38, "form-data": 2 }], 7: [function (require, module, exports) {
    "use strict";
    /* tslint:disable */
    /* eslint-disable */
    /**
     * OpenAI API
     * APIs for sampling from and fine-tuning language models
     *
     * The version of the OpenAPI document: 1.0.5
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */

    var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function get() {
          return m[k];
        } });
    } : function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = this && this.__exportStar || function (m, exports) {
      for (var p in m) {
        if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./api"), exports);
    __exportStar(require("./configuration"), exports);
  }, { "./api": 3, "./configuration": 6 }], 8: [function (require, module, exports) {
    module.exports = require('./lib/axios');
  }, { "./lib/axios": 10 }], 9: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');
    var settle = require('./../core/settle');
    var cookies = require('./../helpers/cookies');
    var buildURL = require('./../helpers/buildURL');
    var buildFullPath = require('../core/buildFullPath');
    var parseHeaders = require('./../helpers/parseHeaders');
    var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
    var createError = require('../core/createError');
    var transitionalDefaults = require('../defaults/transitional');
    var Cancel = require('../cancel/Cancel');

    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }

        if (utils.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };

          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(createError('Request aborted', config, 'ECONNABORTED', request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError('Network Error', config, null, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }

        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = function onCanceled(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel('canceled') : cancel);
            request.abort();
            request = null;
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }

        if (!requestData) {
          requestData = null;
        }

        // Send the request
        request.send(requestData);
      });
    };
  }, { "../cancel/Cancel": 11, "../core/buildFullPath": 16, "../core/createError": 17, "../defaults/transitional": 24, "./../core/settle": 21, "./../helpers/buildURL": 27, "./../helpers/cookies": 29, "./../helpers/isURLSameOrigin": 32, "./../helpers/parseHeaders": 34, "./../utils": 37 }], 10: [function (require, module, exports) {
    'use strict';

    var utils = require('./utils');
    var bind = require('./helpers/bind');
    var Axios = require('./core/Axios');
    var mergeConfig = require('./core/mergeConfig');
    var defaults = require('./defaults');

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);

      // Copy axios.prototype to instance
      utils.extend(instance, Axios.prototype, context);

      // Copy context to instance
      utils.extend(instance, context);

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    var axios = createInstance(defaults);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios;

    // Expose Cancel & CancelToken
    axios.Cancel = require('./cancel/Cancel');
    axios.CancelToken = require('./cancel/CancelToken');
    axios.isCancel = require('./cancel/isCancel');
    axios.VERSION = require('./env/data').version;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require('./helpers/spread');

    // Expose isAxiosError
    axios.isAxiosError = require('./helpers/isAxiosError');

    module.exports = axios;

    // Allow use of default import syntax in TypeScript
    module.exports.default = axios;
  }, { "./cancel/Cancel": 11, "./cancel/CancelToken": 12, "./cancel/isCancel": 13, "./core/Axios": 14, "./core/mergeConfig": 20, "./defaults": 23, "./env/data": 25, "./helpers/bind": 26, "./helpers/isAxiosError": 31, "./helpers/spread": 35, "./utils": 37 }], 11: [function (require, module, exports) {
    'use strict';

    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */

    function Cancel(message) {
      this.message = message;
    }

    Cancel.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };

    Cancel.prototype.__CANCEL__ = true;

    module.exports = Cancel;
  }, {}], 12: [function (require, module, exports) {
    'use strict';

    var Cancel = require('./Cancel');

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      var resolvePromise;

      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      var token = this;

      // eslint-disable-next-line func-names
      this.promise.then(function (cancel) {
        if (!token._listeners) return;

        var i;
        var l = token._listeners.length;

        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = function (onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function (resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };

        return promise;
      };

      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };

    /**
     * Subscribe to the cancel signal
     */

    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }

      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };

    /**
     * Unsubscribe from the cancel signal
     */

    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };

    module.exports = CancelToken;
  }, { "./Cancel": 11 }], 13: [function (require, module, exports) {
    'use strict';

    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }, {}], 14: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');
    var buildURL = require('../helpers/buildURL');
    var InterceptorManager = require('./InterceptorManager');
    var dispatchRequest = require('./dispatchRequest');
    var mergeConfig = require('./mergeConfig');
    var validator = require('../helpers/validator');

    var validators = validator.validators;
    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */
    Axios.prototype.request = function request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }

      config = mergeConfig(this.defaults, config);

      // Set config.method
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = 'get';
      }

      var transitional = config.transitional;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }

      // filter out skipped interceptors
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });

      var promise;

      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, undefined];

        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);

        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
      }

      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }

      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }

      return promise;
    };

    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    };

    // Provide aliases for supported request methods
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        }));
      };
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });

    module.exports = Axios;
  }, { "../helpers/buildURL": 27, "../helpers/validator": 36, "./../utils": 37, "./InterceptorManager": 15, "./dispatchRequest": 18, "./mergeConfig": 20 }], 15: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');

    function InterceptorManager() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };

    module.exports = InterceptorManager;
  }, { "./../utils": 37 }], 16: [function (require, module, exports) {
    'use strict';

    var isAbsoluteURL = require('../helpers/isAbsoluteURL');
    var combineURLs = require('../helpers/combineURLs');

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     * @returns {string} The combined full path
     */
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }, { "../helpers/combineURLs": 28, "../helpers/isAbsoluteURL": 30 }], 17: [function (require, module, exports) {
    'use strict';

    var enhanceError = require('./enhanceError');

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }, { "./enhanceError": 19 }], 18: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');
    var transformData = require('./transformData');
    var isCancel = require('../cancel/isCancel');
    var defaults = require('../defaults');
    var Cancel = require('../cancel/Cancel');

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new Cancel('canceled');
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      // Ensure headers exist
      config.headers = config.headers || {};

      // Transform request data
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);

      // Flatten headers
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);

      utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });

      var adapter = config.adapter || defaults.adapter;

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }

        return Promise.reject(reason);
      });
    };
  }, { "../cancel/Cancel": 11, "../cancel/isCancel": 13, "../defaults": 23, "./../utils": 37, "./transformData": 22 }], 19: [function (require, module, exports) {
    'use strict';

    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */

    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }

      error.request = request;
      error.response = response;
      error.isAxiosError = true;

      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }, {}], 20: [function (require, module, exports) {
    'use strict';

    var utils = require('../utils');

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */
    module.exports = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};

      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(undefined, config2[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      var mergeMap = {
        'url': valueFromConfig2,
        'method': valueFromConfig2,
        'data': valueFromConfig2,
        'baseURL': defaultToConfig2,
        'transformRequest': defaultToConfig2,
        'transformResponse': defaultToConfig2,
        'paramsSerializer': defaultToConfig2,
        'timeout': defaultToConfig2,
        'timeoutMessage': defaultToConfig2,
        'withCredentials': defaultToConfig2,
        'adapter': defaultToConfig2,
        'responseType': defaultToConfig2,
        'xsrfCookieName': defaultToConfig2,
        'xsrfHeaderName': defaultToConfig2,
        'onUploadProgress': defaultToConfig2,
        'onDownloadProgress': defaultToConfig2,
        'decompress': defaultToConfig2,
        'maxContentLength': defaultToConfig2,
        'maxBodyLength': defaultToConfig2,
        'transport': defaultToConfig2,
        'httpAgent': defaultToConfig2,
        'httpsAgent': defaultToConfig2,
        'cancelToken': defaultToConfig2,
        'socketPath': defaultToConfig2,
        'responseEncoding': defaultToConfig2,
        'validateStatus': mergeDirectKeys
      };

      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });

      return config;
    };
  }, { "../utils": 37 }], 21: [function (require, module, exports) {
    'use strict';

    var createError = require('./createError');

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
      }
    };
  }, { "./createError": 17 }], 22: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');
    var defaults = require('../defaults');

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      /*eslint no-param-reassign:0*/
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });

      return data;
    };
  }, { "../defaults": 23, "./../utils": 37 }], 23: [function (require, module, exports) {
    (function (process) {
      (function () {
        'use strict';

        var utils = require('../utils');
        var normalizeHeaderName = require('../helpers/normalizeHeaderName');
        var enhanceError = require('../core/enhanceError');
        var transitionalDefaults = require('./transitional');

        var DEFAULT_CONTENT_TYPE = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };

        function setContentTypeIfUnset(headers, value) {
          if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
            headers['Content-Type'] = value;
          }
        }

        function getDefaultAdapter() {
          var adapter;
          if (typeof XMLHttpRequest !== 'undefined') {
            // For browsers use XHR adapter
            adapter = require('../adapters/xhr');
          } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
            // For node use HTTP adapter
            adapter = require('../adapters/http');
          }
          return adapter;
        }

        function stringifySafely(rawValue, parser, encoder) {
          if (utils.isString(rawValue)) {
            try {
              (parser || JSON.parse)(rawValue);
              return utils.trim(rawValue);
            } catch (e) {
              if (e.name !== 'SyntaxError') {
                throw e;
              }
            }
          }

          return (encoder || JSON.stringify)(rawValue);
        }

        var defaults = {

          transitional: transitionalDefaults,

          adapter: getDefaultAdapter(),

          transformRequest: [function transformRequest(data, headers) {
            normalizeHeaderName(headers, 'Accept');
            normalizeHeaderName(headers, 'Content-Type');

            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
              return data;
            }
            if (utils.isArrayBufferView(data)) {
              return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
              setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
              return data.toString();
            }
            if (utils.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
              setContentTypeIfUnset(headers, 'application/json');
              return stringifySafely(data);
            }
            return data;
          }],

          transformResponse: [function transformResponse(data) {
            var transitional = this.transitional || defaults.transitional;
            var silentJSONParsing = transitional && transitional.silentJSONParsing;
            var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

            if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
              try {
                return JSON.parse(data);
              } catch (e) {
                if (strictJSONParsing) {
                  if (e.name === 'SyntaxError') {
                    throw enhanceError(e, this, 'E_JSON_PARSE');
                  }
                  throw e;
                }
              }
            }

            return data;
          }],

          /**
           * A timeout in milliseconds to abort a request. If set to 0 (default) a
           * timeout is not created.
           */
          timeout: 0,

          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',

          maxContentLength: -1,
          maxBodyLength: -1,

          validateStatus: function validateStatus(status) {
            return status >= 200 && status < 300;
          },

          headers: {
            common: {
              'Accept': 'application/json, text/plain, */*'
            }
          }
        };

        utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
          defaults.headers[method] = {};
        });

        utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
          defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
        });

        module.exports = defaults;
      }).call(this);
    }).call(this, require('_process'));
  }, { "../adapters/http": 9, "../adapters/xhr": 9, "../core/enhanceError": 19, "../helpers/normalizeHeaderName": 33, "../utils": 37, "./transitional": 24, "_process": 1 }], 24: [function (require, module, exports) {
    'use strict';

    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }, {}], 25: [function (require, module, exports) {
    module.exports = {
      "version": "0.26.1"
    };
  }, {}], 26: [function (require, module, exports) {
    'use strict';

    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }, {}], 27: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');

    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */
    module.exports = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];

        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (utils.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }

          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
          });
        });

        serializedParams = parts.join('&');
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    };
  }, { "./../utils": 37 }], 28: [function (require, module, exports) {
    'use strict';

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */

    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
    };
  }, {}], 29: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');

    module.exports = utils.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    }() :

    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null;
        },
        remove: function remove() {}
      };
    }();
  }, { "./../utils": 37 }], 30: [function (require, module, exports) {
    'use strict';

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */

    module.exports = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return (/^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
      );
    };
  }, {}], 31: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }, { "./../utils": 37 }], 32: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');

    module.exports = utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL(url) {
        var href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() :

    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }, { "./../utils": 37 }], 33: [function (require, module, exports) {
    'use strict';

    var utils = require('../utils');

    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }, { "../utils": 37 }], 34: [function (require, module, exports) {
    'use strict';

    var utils = require('./../utils');

    // Headers whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;

      if (!headers) {
        return parsed;
      }

      utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));

        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });

      return parsed;
    };
  }, { "./../utils": 37 }], 35: [function (require, module, exports) {
    'use strict';

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */

    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }, {}], 36: [function (require, module, exports) {
    'use strict';

    var VERSION = require('../env/data').version;

    var validators = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
      validators[type] = function validator(thing) {
        return (typeof thing === "undefined" ? "undefined" : _typeof(thing)) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    var deprecatedWarnings = {};

    /**
     * Transitional option validator
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     * @returns {function}
     */
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return function (value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          // eslint-disable-next-line no-console
          console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };

    /**
     * Assert object's properties type
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     */

    function assertOptions(options, schema, allowUnknown) {
      if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== 'object') {
        throw new TypeError('options must be an object');
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError('option ' + opt + ' must be ' + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error('Unknown option ' + opt);
        }
      }
    }

    module.exports = {
      assertOptions: assertOptions,
      validators: validators
    };
  }, { "../env/data": 25 }], 37: [function (require, module, exports) {
    'use strict';

    var bind = require('./helpers/bind');

    // utils is a library of generic helper functions non-specific to axios

    var toString = Object.prototype.toString;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    function isArray(val) {
      return Array.isArray(val);
    }

    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    function isUndefined(val) {
      return typeof val === 'undefined';
    }

    /**
     * Determine if a value is a Buffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }

    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    function isFormData(val) {
      return toString.call(val) === '[object FormData]';
    }

    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */
    function isString(val) {
      return typeof val === 'string';
    }

    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */
    function isNumber(val) {
      return typeof val === 'number';
    }

    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    function isObject(val) {
      return val !== null && (typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object';
    }

    /**
     * Determine if a value is a plain Object
     *
     * @param {Object} val The value to test
     * @return {boolean} True if value is a plain Object, otherwise false
     */
    function isPlainObject(val) {
      if (toString.call(val) !== '[object Object]') {
        return false;
      }

      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }

    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */
    function isDate(val) {
      return toString.call(val) === '[object Date]';
    }

    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */
    function isFile(val) {
      return toString.call(val) === '[object File]';
    }

    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }

    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }

    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    function isURLSearchParams(val) {
      return toString.call(val) === '[object URLSearchParams]';
    }

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    }

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */
    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
        return false;
      }
      return typeof window !== 'undefined' && typeof document !== 'undefined';
    }

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */
    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      // Force an array if not already something iterable
      if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function merge() /* obj1, obj2, obj3, ... */{
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     * @return {string} content value without BOM
     */
    function stripBOM(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    }

    module.exports = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject,
      isPlainObject: isPlainObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      extend: extend,
      trim: trim,
      stripBOM: stripBOM
    };
  }, { "./helpers/bind": 26 }], 38: [function (require, module, exports) {
    module.exports = {
      "_from": "openai",
      "_id": "openai@3.0.0",
      "_inBundle": false,
      "_integrity": "sha512-YNAPZKzBfE6MnR5Ro/z3uKbg7T3F3W1FoTCtYheKRdEjZeheMX49QYFeL990gBFAhuGziEZCUdhnNT+eIrxX/Q==",
      "_location": "/openai",
      "_phantomChildren": {},
      "_requested": {
        "type": "tag",
        "registry": true,
        "raw": "openai",
        "name": "openai",
        "escapedName": "openai",
        "rawSpec": "",
        "saveSpec": null,
        "fetchSpec": "latest"
      },
      "_requiredBy": ["#USER", "/"],
      "_resolved": "https://registry.npmjs.org/openai/-/openai-3.0.0.tgz",
      "_shasum": "0816f1d72ee37820c9ff14d93d597431489fec37",
      "_spec": "openai",
      "_where": "C:\\Users\\ahmed\\Downloads\\AI-meme",
      "author": {
        "name": "OpenAI"
      },
      "bugs": {
        "url": "https://github.com/openai/openai-node/issues"
      },
      "bundleDependencies": false,
      "dependencies": {
        "axios": "^0.26.0",
        "form-data": "^4.0.0"
      },
      "deprecated": false,
      "description": "Node.js library for the OpenAI API",
      "devDependencies": {
        "@types/node": "^12.11.5",
        "typescript": "^3.6.4"
      },
      "homepage": "https://github.com/openai/openai-node#readme",
      "keywords": ["openai", "open", "ai", "gpt-3", "gpt3"],
      "license": "MIT",
      "main": "./dist/index.js",
      "name": "openai",
      "repository": {
        "type": "git",
        "url": "git+ssh://git@github.com/openai/openai-node.git"
      },
      "scripts": {
        "build": "tsc --outDir dist/"
      },
      "types": "./dist/index.d.ts",
      "version": "3.0.0"
    };
  }, {}], 39: [function (require, module, exports) {
    (function (process) {
      (function () {
        var _this25 = this;

        var _require = require("openai"),
            Configuration = _require.Configuration,
            OpenAIApi = _require.OpenAIApi;
        // const SerpApi = require("google-search-results-nodejs");


        var memeMaker = function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee46() {
            var li, inputValue, t, _configuration, _openai, response, configuration, openai, completion;

            return regeneratorRuntime.wrap(function _callee46$(_context46) {
              while (1) {
                switch (_context46.prev = _context46.next) {
                  case 0:
                    li = document.createElement("li");
                    inputValue = document.getElementById("myInput").value;
                    t = document.createTextNode(inputValue);

                    li.appendChild(t);

                    if (!(inputValue === '')) {
                      _context46.next = 8;
                      break;
                    }

                    alert("You must write something!");
                    _context46.next = 15;
                    break;

                  case 8:
                    console.log(inputValue);
                    _configuration = new Configuration({
                      apiKey: process.env.OPENAI_API_KEY
                    });
                    _openai = new OpenAIApi(_configuration);
                    _context46.next = 13;
                    return _openai.createCompletion({
                      model: "text-davinci-002",
                      prompt: "Correct this to standard English:\n\nShe no went to the market.",
                      temperature: 0,
                      max_tokens: 60,
                      top_p: 1,
                      frequency_penalty: 0,
                      presence_penalty: 0
                    });

                  case 13:
                    response = _context46.sent;

                    console.log(response);

                  case 15:
                    configuration = new Configuration({
                      apiKey: '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'
                    });
                    openai = new OpenAIApi(configuration);
                    _context46.next = 19;
                    return openai.createCompletion({
                      model: "text-davinci-002",
                      prompt: "Hello world"
                    });

                  case 19:
                    completion = _context46.sent;

                    console.log(completion.data.choices[0].text);

                  case 21:
                  case "end":
                    return _context46.stop();
                }
              }
            }, _callee46, _this25);
          }));

          return function memeMaker() {
            return _ref.apply(this, arguments);
          };
        }();

        console.log('test');

        var element = document.getElementById('addBtn');
        element.addEventListener('click', memeMaker());

        // const search = new SerpApi.GoogleSearch('bb943b6380ad5f771b8b00885027bdfd6ee6f65a1870fc76010c52081aeb04d0'); //your API key from serpapi.com

        // const searchQuery = "bugatti chiron";

        // const params = {
        //   q: searchQuery, // what we want to search
        //   engine: "google", // search engine
        //   hl: "en", // parameter defines the language to use for the Google search
        //   gl: "us", // parameter defines the country to use for the Google search
        //   tbm: "isch", // parameter defines the type of search you want to do (isch - Google Images)
        // };

        // console.log("hi")

        // console.log(document.getElementById('textbox_id').value)
        // const getJson = () => {
        //   return new Promise((resolve) => {
        //     search.json(params, resolve);
        //   });
        // };


        // exports.getResults = async () => {
        //   const imagesResults = [];
        //   while (true) {
        //     const json = await getJson();
        //     if (json.images_results) {
        //       imagesResults.push(...json.images_results);
        //       params.ijn ? (params.ijn += 1) : (params.ijn = 1);
        //     } else break;
        //   }


        //   return imagesResults;
        // };

      }).call(this);
    }).call(this, require('_process'));
  }, { "_process": 1, "openai": 7 }] }, {}, [39]);