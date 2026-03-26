#!/usr/bin/env bash

set -ex

# TODO: migrate to test manager (e.g. mocha) if scale-up

node ./tests/test_case_1.js
node ./tests/test_case_2.js
node ./tests/test_case_3.js
node ./tests/test_case_4.js
node ./tests/test_case_5.js
node ./tests/test_case_6.js
node ./tests/test_case_7.js
node ./tests/test_case_8.js
node ./tests/test_case_9.js

echo "done"
