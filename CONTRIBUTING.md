# Clone the repo

Run the following script

```
git config --global http.proxy proxy.zte.com.cn:80                       # do this if neccessary
git clone https://github.com/rdkmaster/jigsaw.git
cd jigsaw
```

# Install dependencies

We provide 2 options to install the dependencies, and we strongly recommend the Chinese mainland developers to use option 1 decause of the unstableness of `npm`, it could save you a lot of time and trouble comparing with installing with option 2. Option 2 is a standard npm script, use this option if you have a good network access.

## Option 1

We just simply zip all the dependecy packages and save it in ours website, what you need to do is download the zip bundle and unzip it to the right place. [The bundle can be found here](http://rdk.zte.com.cn/misc/node_modules.zip).

We also made a small tool to help you install the bundle in case you are new to `npm`:
- for Windows users: just simply double click `build/install/install.exe`
- for Mac / Linux users: just simply run `build/install/install.sh`

## Option 2

Run the following script

```
npm config set proxy=http://proxy.zte.com.cn:80                          # do this if neccessary
npm config set registry=https://registry.npm.taobao.org/                 # for Chinese developers only
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass # for Chinese developers only
npm install -g @angular/cli
npm install
npm start
```

Tips:
- Try nodejs 6.x instead if you are encounting some strange error while installing dependencies with nodejs 8.x;
- Do **NOT** use `cnpm` to install dependencies;
- Get your own http proxy url and port from the Internet Options, do not copy `http://proxy.zte.com.cn:80` directly. Ignore this step if your PC is connecting to the network directly.

# Start coding

Open your browser and navigate to `http://localhost:4200`, the page should open correctly and Jigsaw's testing page should show if everything is fine. Try make any modification in the Jigsaw's project, and webpack should compile automaticly, and the testing page should be refreshed as soon as the compilation is done. And your Jigsaw development env is OK now.
