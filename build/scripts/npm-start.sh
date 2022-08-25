
echo "start env $1 on port $2 ..."

node build/scripts/extract-theme-variables.js
node build/scripts/create-component-wings-theme.js
node build/scripts/generate-external-demo-info.js

node --max_old_space_size=2048 node_modules/@angular/cli/bin/ng serve $1 \
     --poll 500 --disable-host-check --host 0.0.0.0 --port $2
