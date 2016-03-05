#!/bin/sh

# cd to dir of this script
MYDIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
pushd $MYDIR > /dev/null
# upon any kind of termination, return to our original directory
trap "popd > /dev/null" EXIT SIGHUP SIGINT SIGTERM

#######

# https://webpack.github.io/docs/hot-module-replacement-with-webpack.html

webpack-dev-server ./index.jsx --hot --inline --module-bind "css=inline-css\!css"
