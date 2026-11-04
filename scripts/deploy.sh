#!/bin/bash
set -e

PORT=${PORT:-3000}
echo "Deploying application on port $PORT..."

# 1. Check if PM2 is available (Globally or in node_modules)
if command -v pm2 > /dev/null 2>&1; then
    echo "PM2 detected globally. Reloading application..."
    pm2 reload sortbackend || pm2 start src/server.js --name sortbackend
elif [ -f "./node_modules/.bin/pm2" ]; then
    echo "PM2 detected locally. Reloading application..."
    ./node_modules/.bin/pm2 reload sortbackend || ./node_modules/.bin/pm2 start src/server.js --name sortbackend
else
    # 2. Fallback: Background execution with nohup
    echo "PM2 not found. Starting in background mode..."
    pkill -f "src/server.js" || true
    sleep 1

    # In Jenkins, processes might get killed by ProcessTreeKiller unless JENKINS_NODE_COOKIE is set
    export JENKINS_NODE_COOKIE=dontKillMe
    nohup node src/server.js > app.log 2>&1 &
    echo "Application started in background (PID: $!)."
fi

echo "Deployment finished."
