#!/bin/bash

function start() {
    npm run start
}

function install-dependencies() {
    echo "install-dependencies"
    npm install react-unity-webgl
    npm install --save-dev gh-pages
    npm install bootstrap
    npm install react-router-dom
}

function deploy() {
    echo "deploy"
    npm run build
    npm run deploy
}

function test-contact-form() {
    echo "test-contact-form with e2e and captcha"
}

function main() {
    clear
    echo "Welcome to CartoonKickoff Web React!"

    if [ "$1" = "test" ]; then
        npm run test
    elif [ "$1" = "start" ]; then
        start
    elif [ "$1" = "create-app" ]; then
        npx create-react-app cartoon-kickoff-react --template typescript
    elif [ "$1" = "install-dependencies" ]; then
        install-dependencies
    elif [ "$1" = "deploy" ]; then
        deploy
    elif [ "$1" = "publish" ]; then
        deploy
    elif [ "$1" = "test-contact-form" ]; then
        test-contact-form
    else
        echo "Could not find the action: '$1'."
    fi
}

main "$1"
