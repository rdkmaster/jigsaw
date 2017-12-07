# Clone the repo

Run the following script

```
git config --global http.proxy proxy.zte.com.cn:80                       # do this if neccessary
git clone https://github.com/rdkmaster/jigsaw.git
cd jigsaw
```

# Install dependencies

Run the following script

```
npm install -g @angular/cli
npm install
npm start
```

Open your browser and navigate to `http://localhost:4200`, the page should open correctly and Jigsaw's testing page should show if everything is fine. Try make any modification in the Jigsaw's project, and webpack should compile automaticly, and the testing page should be refreshed as soon as the compilation is done. And your Jigsaw development env is OK now.

Tips:
- Try nodejs 6.x instead if you are encounting some strange error while installing dependencies with nodejs 8.x;
- Do **NOT** use `cnpm` to install dependencies;
- **To all ZTErs**, you can use the npm mirror inside of ZTE for faster speed of installing, [check this link for more details](docs/how-to-use-npm-mirror-inside-of-zte/index.md)

# Start coding

Open your browser and navigate to `http://localhost:4200`, the page should open correctly and Jigsaw's testing page should show if everything is fine. Try make any modification in the Jigsaw's project, and webpack should compile automaticly, and the testing page should be refreshed as soon as the compilation is done. And your Jigsaw development env is OK now.
