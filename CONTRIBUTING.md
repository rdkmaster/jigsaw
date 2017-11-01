Run the following script

```
git config --global http.proxy proxy.zte.com.cn:80                       # do this if neccessary
git clone https://github.com/rdkmaster/jigsaw.git
cd jigsaw
npm config set proxy=http://proxy.zte.com.cn:80                          # do this if neccessary
npm config set registry=https://registry.npm.taobao.org/                 # for Chinese developers only
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass # for Chinese developers only
npm install -g @angular/cli
npm install
npm start
```

Open your browser and navigate to `http://localhost:4200`, the page should open correctly and Jigsaw's testing page should show if everything is fine. Try make any modification in the Jigsaw's project, and webpack should compile automaticly, and the testing page should be refreshed as soon as the compilation is done. And your Jigsaw development env is OK now.

Tips:
- Try nodejs 6.x instead if you are encounting some strange error while installing dependencies with nodejs 8.x;
- Do **NOT** use `cnpm` to install dependencies;
- Get your own http proxy url and port from the Internet Options, do not copy `http://proxy.zte.com.cn:80` directly. Ignore this step if your PC is connecting to the network directly.
