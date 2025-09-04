#!/bin/bash
cd /home/kavia/workspace/code-generation/snackease-130096-130105/snack_app3_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

