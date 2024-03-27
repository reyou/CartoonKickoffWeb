#!/bin/bash

function start() {
    kill-server
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
    echo "Deploying with gh-pages"
    npm run build
    npm run deploy
}

function contact-us() {
    echo "test-contact-form with e2e and captcha"
    node "scripts\test\contact-us.js"
}

function log-in() {
    echo "login with e2e and captcha"
    node "scripts\test\log-in.js"
}

function sign-up() {
    echo "sign-up with e2e and captcha"
    node "scripts\test\sign-up.js"
}

function local_run() {
    echo "local run"
    echo "http://localhost:3000/"
}

function kill-server() {
    echo "kill server"
    PID=$(lsof -t -i:3000)

    # If a PID was found, kill the process
    if [ -z "$PID" ]; then
        echo "No process found on port 3000."
    else
        echo "Killing process on port 3000 with PID: $PID"
        kill "$PID"

        if [ $? -eq 0 ]; then
            echo "Process killed successfully."
        else
            echo "Failed to kill process."
        fi
    fi

}

function main() {
    clear
    echo "Welcome to CartoonKickoff Web React!"

    if [ "$1" = "test" ]; then
        npm run test
    elif [ "$1" = "start" ]; then
        start
    elif [ "$1" = "server" ]; then
        start
    elif [ "$1" = "kill-server" ]; then
        kill-server
    elif [ "$1" = "local" ]; then
        local_run
    elif [ "$1" = "create-app" ]; then
        npx create-react-app cartoon-kickoff-react --template typescript
    elif [ "$1" = "install-dependencies" ]; then
        install-dependencies
    elif [ "$1" = "deploy" ]; then
        deploy
    elif [ "$1" = "publish" ]; then
        deploy
    elif [ "$1" = "contact-us" ]; then
        contact-us
    elif [ "$1" = "log-in" ]; then
        log-in
    elif [ "$1" = "sign-up" ]; then
        sign-up
    else
        echo "Could not find the action: '$1'."
    fi
}

main "$1"
