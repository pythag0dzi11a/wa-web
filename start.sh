#!/usr/bin/env bash
set -euo pipefail

PYTHONENV="./utils/.venv"

function detectPythonEnv(){
    echo "Detecting Python environment..."
    if [ ! -d "$PYTHONENV" ]; then
        echo "Python environment not found."
        return 0
    else
        echo "Python environment found."
        return 1
    fi
}

function createPythonEnvUV(){
    echo "Creating UV environment..."
    cd "./utils"
    uv sync
}

function startUtils(){
    echo "Starting utils..."
    cd "./utils"
    uv run
}

function start(){
    detectPythonEnv
    if [ $? -eq 0 ]; then
        createPythonEnvUV
    fi
    startUtils
    echo "Starting application..."
}

start