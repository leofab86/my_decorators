'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activeComponentDispatcher = undefined;

var _flux = require('flux');

const activeComponentDispatcher = exports.activeComponentDispatcher = new _flux.Dispatcher(); /*
                                                                                               * Copyright (c) 2015, Facebook, Inc.
                                                                                               * All rights reserved.
                                                                                               *
                                                                                               * This source code is licensed under the BSD-style license found in the
                                                                                               * LICENSE file in the root directory of this source tree. An additional grant
                                                                                               * of patent rights can be found in the PATENTS file in the same directory.
                                                                                               *
                                                                                               * AppDispatcher
                                                                                               *
                                                                                               * A singleton that operates as the central hub for application updates.
                                                                                               */