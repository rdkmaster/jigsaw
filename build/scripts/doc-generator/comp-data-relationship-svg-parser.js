if (process.platform.match(/win/g)) {
    console.error('ERROR: this script can only run on linux!');
    process.exit(1);
}

var fs = require('fs');
var exec = require('child_process').exec;

var docHome = __dirname + '/../../../docs/image';
var urlHost = !process.argv[2] ? 'rdk.zte.com.cn' : process.argv[2];

parse('comp-data-relationship');

function parse(fileName) {
    var cmd = `
        cd ${docHome}
        git checkout ${fileName}.svg
        rm -f ${docHome}/page1.xml
        unzip -j ${docHome}/${fileName}.eddx pages/page1.xml -d ${docHome}
    `
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.log(error);
            return;
        }
        addLinkToSVG(fileName);
        fs.unlinkSync(`${docHome}/page1.xml`);
    });
}

function addLinkToSVG(fileName) {
    var xml = fs.readFileSync(`${docHome}/page1.xml`).toString();
    var classes = [];
    xml.replace(/\\par&#x0D;&#x0A;/ig, '').replace(/\$_\$.*?\s(.*?)\\.*?\$(\w+)\$/g,
        function(found, className, type) {
            switch(type) {
                case 'i': type = 'interface'; break;
                case 'c': type = 'class'; break;
                case 'ij': type = 'injectable'; break;
                case 'm': type = 'module'; break;
                case 'd': type = 'directive'; break;
                default: type = ''; break;
            }
            if (!type) {
                console.error('ERROR: unexpected type: ' + type);
                process.exit(1);
            }
            classes.push({className: className, type: type});
            console.log('item found, type=' + type + ', name=' + className);
        }
    );

    if (classes.length == 0) {
        console.error('ERROR: no class names found! raw xml:');
        console.error(xml);
        process.exit(1);
    }

    var svgPath = docHome + '/' + fileName + '.svg';
    var svg = fs.readFileSync(svgPath).toString();
    var pathFound = false;
    svg = svg.replace(/<path\s.*?url\(#linear(\d+)\).*?\/>/gi, function(found, index) {
        if (classes[index]) {
            pathFound = true;
            var fullName = classes[index].className;
            var idx = fullName.indexOf('&lt;');
            idx = idx == -1 ? fullName.length : idx;
            var className = fullName.substring(0, idx);
            return '<a href="http://' + urlHost + '/components/api/' + classes[index].type + '/' +
                    className + '" target="_blank"><title>Click to check the detail of ' + fullName +
                    '</title>' + found + '</a>';
        } else {
            return found;
        }
    });
    if (!pathFound) {
        console.error('ERROR: no path names found in the svg! raw svg:');
        console.error(svg);
        process.exit(1);
    }

    fs.writeFileSync(svgPath, svg);
    console.log('file "' + fileName + '.svg" processed!');
}
