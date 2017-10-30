Run the following script

```
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
