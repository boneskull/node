'use strict';

const common = require('../common');
const { ServerResponse } = require('http');

const res = new ServerResponse({
  method: 'GET',
  httpVersionMajor: 1,
  httpVersionMinor: 1
});

common.expectsError(
  () => { res.pipe(res); },
  {
    code: 'ERR_STREAM_CANNOT_PIPE',
    type: Error
  }
);
