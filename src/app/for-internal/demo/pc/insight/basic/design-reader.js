/* eslint-disable sort-keys */
/* components[] */
const argv = require("yargs")
    .option("a", {
        alias: "all",
        describe: "convert all file to svd",
        boolean: true,
    })
    .option("o", {
        alias: "output",
        default: "Results",
        describe: "This is outputs' folder name, 'Results' by default",
        type: "string",
    })
    .option("i", {
        alias: "input",
        default: "",
        describe: "Input folder name",
        type: "string",
    })
    .option("f", {
        alias: "force",
        boolean: false,
        describe: "Clear outputs folder",
    }).argv;
const { debug } = require("console");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// Debug Mode Controllor
const debugMode = false;
const filterMode = { modeTrigger: false, uxIndex: 4, uxName: "text" };
let aFile = [];
let inputPath = "";
if (!argv.all) {
    if (!argv.input) {
        console.log(nLog("red", "错误：未提供需要转换的文件夹！"));
        process.exit(9);
    } else {
        aFile.push(/[^/]*$/.exec(argv.input)[0]);
        if (argv.input.indexOf("/") !== -1) {
            inputPath = argv.input.substring(0, argv.input.lastIndexOf("/"));
        }
    }
} else {
    aFile = [];
    inputPath = path.resolve(argv.input);
    fs.readdirSync(inputPath).forEach((name) => {
        if (name !== "__MACOSX") {
            aFile.push(name);
        }
    });
}

// mark
const resultFolder = argv.output;
// if (!fs.existsSync(resultFolder)) {
// 	resultFolder = path.join(__dirname, "Results");
// }

if (argv.force) {
    deleteFolderRecursive(resultFolder);
}
fs.mkdirSync(resultFolder);

aFile.forEach((file) => {
    const fileName = file;
    const filePath = path.join(inputPath, fileName);
    const htmlPath = path.join(inputPath, fileName, "index.html");
    const resultPath = path.join(argv.output, fileName);

    if (!fs.existsSync(filePath)) {
        console.log(
            nLog("red", "错误：未找到文件名为 " + fileName + " 的文件夹")
        );
        process.exit(9);
    }
    if (!fs.existsSync(htmlPath)) {
        console.log(
            nLog(
                "red",
                "错误：未找到 " + fileName + " 文件夹目录下的index.html文件"
            )
        );
        process.exit(9);
    }

    fs.readFile(htmlPath, "utf8", (err, data) => {
        if (err) {
            console.error('failed to read file:', err);
            return;
        }
        fs.mkdirSync(resultPath);
        const regExp = /let data =([\s\S]*)meaxure\.render\(data\)/;
        const match = data.match(regExp);
        let _oUx='';
        if (match && match.length >= 2) {
            _oUx = match[1].trim().replace(/;$/, "");
        } else {
            console.log('未找到匹配的内容。');
        }
        // const _oUx = matches[0].substring(0, matches[0].length - 5).slice(6);
        const oUx = JSON.parse(_oUx);

        /* Main program */
        const aUx = oUx.artboards;
        const dir = [];
        oUx.artboards.forEach((items, i) => {
            dir.push(items.name);
        });

        // record the counts of components and create uid
        const compInfos = { total: 1, file: "fileName + pageName" };

        aUx.forEach((items, i) => {
            let pageName = "";
            // Ux resource controllor
            if (filterMode.modeTrigger && i !== filterMode.uxIndex) return;
            /* Test Code */
            const _arr = [];
            const _arr2 = [];
            let _arr3 = [];
            let _arr4 = [];

            items.layers.forEach((item) => {
                _arr.push(item.name);
                if (item.name.indexOf("collapse") !== -1) {
                    _arr2.push(item);
                }
            });
            _arr3 = items.layers.filter((_item) => _item.content !== undefined);
            _arr4 = items.layers.filter(
                (_item) => _item.name.indexOf("steps") !== -1
            );
            // debugger;

            // correct the name in case it has bad impact on Filepath
            // if (items.name.indexOf("/") !== -1 || items.name.indexOf(":") !== -1 || items.name.indexOf("\\") !== -1) {
            // 	pageName = items.name.replace(/[\\/:"*?<>|\s]/g, "-");
            // } else {
            // 	pageName = items.name;
            // }

            pageName = items.name.replace(/[\\/:"*?<>|\s]/g, "-");

            fs.mkdirSync(path.join(resultPath, pageName));
            compInfos.file = fileName + " - " + pageName;
            const aLayers = items.layers;
            const oFilter = {
                aLayers: aLayers,
            };
            const aChildren = [];
            console.log(aLayers);
            console.log(oFilter);
            console.log(aChildren);
            console.log(compInfos);
            layerArrayToSVD(aLayers, oFilter, aChildren, compInfos);
            // Init SVD data
            const svdTemplate = {
                acceptDroppedNode: false,
                selector: "awade-layout",
                agentId: uuidv4(),
                id: "root",
                config: {
                    moduleType: "common",
                    routeParam: "",
                    version: "v9.0.6",
                },
                children: aChildren,
            };
            const svdData = JSON.stringify(svdTemplate);
            fs.writeFile(
                path.join(resultPath, pageName, "AppComponent.svd"),
                svdData,
                (err) => {
                    if (err) {
                        console.error('failed to read AppComponent.svd', err);
                    }
                    // 文件写入成功。
                    console.log(
                        nLog("cyan", fileName + " - " + pageName) +
                            "已成功转换为svd文件！"
                    );
                }
            );
        });
        console.log(
            nLog("blue", fileName) +
                " 中已成功识别 " +
                nLog("green", compInfos.total) +
                " 个组件"
        );
    });
});

// table list text
/* main function
 **  transfer laryer arrary to svd data
 */
function layerArrayToSVD(aLayers, oFilter, aChildren, compInfos) {
    // Find all containers
    let aContainer = aLayers.filter(
        (layer) =>
            /plx:\s*(drawer|card|time|date|step|select|graph|table)[^/]*/.test(
                layer.name
            ) || /^overlay$/.test(layer.name)
    );
    // collapse amend
    aContainer = aContainer.filter(
        (layer) => layer.name.indexOf("element") === -1
    );
    // deduplication
    let aIndex = [];
    if (aContainer.length >= 2) {
        aContainer.forEach((oContainer, index) => {
            for (let i = 0; i < aContainer.length; i++) {
                if (i !== index && isInclude(oContainer, aContainer[i])) {
                    aIndex.push(i);
                }
            }
        });
    }
    aIndex = arryaUnique(aIndex).reverse(); // deduplication & sort
    if (aIndex.length !== 0) {
        aIndex.forEach((num) => {
            aContainer.splice(num, 1);
        });
    }
    showYourself("aContainer", aContainer);
    aContainer.forEach((oContainer) => {
        aChildren.push(svdGenerator(oContainer, oFilter, compInfos));
    });

    // Find all basic components
    const aComp = oFilter.aLayers.filter((layer) =>
        /plx:\s*(input|button|list|slider|checkbox|transfer|breadcrumb|tag|number input|img|steps|navi导航\/left|switch|progress bar|pagination|tree|area)[^/]*/.test(
            layer.name
        )
    );
    // aComp = aLayers.filter((layer) => /plx:\s*(table)[^/]*/.test(layer.name));
    showYourself("aComp", aComp);
    aComp.forEach((oComp) => {
        aChildren.push(svdGenerator(oComp, oFilter, compInfos));
    });
    // Find all text & icon components
    const aText = oFilter.aLayers.filter((layer) =>
        /plx:\s*(text|icon|picture)[^/]*/.test(layer.name)
    );
    showYourself("aText", aText);
    aText.forEach((oText) => {
        aChildren.push(svdGenerator(oText, oFilter, compInfos));
    });
}

// generate component svd data
function svdGenerator(layer, oFilter, compInfos) {
    // Init component svd data
    const oComponent = {
        acceptDroppedNode: false,
        inputs: [],
        styles: {},
        directives: [],
        selector: "",
        agentId: uuidv4(),
        id: "",
        layout: {
            left: Math.ceil(layer.rect.x / 8),
            top: Math.ceil(layer.rect.y / 8),
            width: Math.ceil(layer.rect.width / 8),
            height: Math.ceil(layer.rect.height / 8),
        },
    };
    const compID = layer.objectID;
    const rawType = layer.name;
    let type = "";
    if (rawType.indexOf("idea") !== -1) {
        type = layer.name.split(":")[1].split("/")[0];
    }
    const subLayers = findChildren(layer, oFilter.aLayers);
    const aContent = subLayers.filter((layer) => layer.content !== undefined);
    const svdProp = {
        disabled: {
            property: "disabled",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        checked: {
            property: "checked",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        icon: {
            property: "icon",
            selectedType: "AwadeIcon",
            value: {
                initial: '"iconfont iconfont-e87b"',
            },
        },
        placeholder: {
            property: "placeholder",
            selectedType: "string",
            value: {
                initial: "",
            },
        },
        src: {
            property: "src",
            selectedType: "string",
            value: {
                initial: "awade-assets/vmax-logo.png",
            },
        },
        open: {
            property: "open",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        searchable: {
            property: "searchable",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        closable: {
            property: "closable",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        showMarker: {
            property: "showMarker",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        multipleSelect: {
            property: "multipleSelect",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        // bellow properties have potential of change
        onLabel: {
            property: "onLabel",
            selectedType: "string",
            value: {
                initial: "开",
            },
        },
        offLabel: {
            property: "offLabel",
            selectedType: "string",
            value: {
                initial: "关",
            },
        },
        date: {
            property: "date",
            selectedType: "string",
            value: {
                initial: "2020/12/12",
            },
        },
        data: {
            property: "data",
            selectedType: "",
            value: {
                initial: null,
            },
        },
        innerHTML: {
            property: "innerHTML",
            selectedType: "string",
            value: {
                initial: "",
            },
        },
        mode: {
            property: "mode",
            selectedType: "Mode",
            value: {
                initial: '"complex"',
            },
        },
        preSize: {
            property: "preSize",
            selectedType: "preSize",
            value: {
                initial: '"default"',
            },
        },
        vaild: {
            property: "valid",
            selectedType: "boolean",
            value: {
                initial: false,
            },
            bindTo: null,
        },
        value: {
            property: "value",
            selectedType: "string",
            value: {
                initial: "",
            },
        },
        status: {
            property: "status",
            selectedType: "status",
            value: {
                initial: '"processing"',
            },
        },
        labelPosition: {
            property: "labelPosition",
            selectedType: "labelPosition",
            value: {
                initial: '"right"',
            },
        },
        animate: {
            property: "animate",
            selectedType: "boolean",
            value: {
                initial: true,
            },
        },
        gr: {
            property: "gr",
            selectedType: "Granularity",
            value: {
                initial: '"time"',
            },
        },
        setting: {
            property: "setting",
            selectedType: "ZTreeSettingSetting",
            value: {
                initial: "",
            },
            bindTo: "jigsawTreeExt_setting",
        },
        title: {
            property: "title",
            selectedType: "string",
            value: {
                initial: "",
            },
        },
        isActive: {
            property: "isActive",
            selectedType: "boolean",
            value: {
                initial: false,
            },
        },
        position: {
            property: "position",
            selectedType: "position",
            value: {
                initial: '"left"',
            },
        },
    };

    overlayTransfer();
    // component processors
    drawerProcessor();
    cardProcessor();
    tableProcessor();
    graphProcessor();
    buttonProcessor();
    inputProcessor();
    selectProcessor();
    naviProcessor();
    stepProcessor();
    transferProcessor();
    breadcrumbProcessor();
    checkboxProcessor();
    imgProcessor();
    numericProcessor();
    switchProcessor();
    sliderProcessor();
    datepickerProcessor();
    timepickerProcessor();
    tagProcessor();
    treeProcessor();
    areaProcessor();
    cascadeProcessor();
    listProcessor();
    paginationProcessor();
    colorpickerProcessor();
    uploadProcessor();
    timesectionProcessor();
    rateProcessor();
    progressProcessor();
    hrProcessor();
    iframeProcessor();
    placeholderProcessor();
    h1Processor();
    h2Processor();
    h3Processor();
    h4Processor();
    h5Processor();
    h6Processor();
    linkProcessor();
    loadingProcessor();
    basicgisProcessor();
    textProcessor();
    iconProcessor();
    return oComponent;

    /* components[drawer] */
    function drawerProcessor() {
        if (type.indexOf("drawer") === -1) return;
        // [open][position]\[floating][width][height][offsetTop][offsetLeft][offsetRight][offsetBottom]
        const _status = layer.name.split("/")[1];
        showYourself("drawer", layer, subLayers, _status);
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.acceptDroppedNode = true;
        oComponent.id = "jigsawDrawer" + compInfos.total++;
        oComponent.selector = "jigsaw-drawer";
        const _children = [];
        layerArrayToSVD(
            subLayers,
            { aLayers: subLayers },
            _children,
            compInfos
        );
        _children.forEach((subComp) => {
            subComp.layout.left = subComp.layout.left - oComponent.layout.left;
            subComp.layout.top = subComp.layout.top - oComponent.layout.top;
        });
        oComponent.children = [
            {
                acceptDroppedNode: false,
                selector: "awade-group-layout",
                agentId: uuidv4(),
                id: "awadeGroupLayout" + compInfos.total++,
                children: _children,
            },
        ];

        // spot [position]
        const position = {
            property: "position",
            selectedType: "position",
            value: {
                initial: '"left"',
            },
        };
        if (rawType.indexOf("left") !== -1) {
            position.value.initial = '"left"';
        } else if (rawType.indexOf("right") !== -1) {
            position.value.initial = '"right"';
        } else if (rawType.indexOf("bottom") !== -1) {
            position.value.initial = '"bottom"';
        } else if (rawType.indexOf("top") !== -1) {
            position.value.initial = '"top"';
        } else {
            nWarn(compInfos.file, compID, "此抽屉未标注位置信息或位置信息错误");
        }
        oComponent.inputs.push(position);
    }

    /* components[tabs] */
    function tabsProcessor() {
        if (type.indexOf("tabs") === -1) return;
        // \[selectedIndex][editablte]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.acceptDroppedNode = true;
        oComponent.id = "jigsawTabs" + compInfos.total++;
        oComponent.selector = "jigsaw-tabs";
        showYourself("tabs", layer, subLayers, oFilter.aLayers);

        // const _children = [];
        // layerArrayToSVD(subLayers, { aLayers: subLayers }, _children, compInfos);
        // _children.forEach((subComp) => {
        // 	subComp.layout.left = subComp.layout.left - oComponent.layout.left;
        // 	subComp.layout.top = subComp.layout.top - oComponent.layout.top;
        // });
        // oComponent.children = [
        // 	{
        // 		acceptDroppedNode: false,
        // 		selector: "awade-tabs-layout",
        // 		agentId: uuidv4(),
        // 		id: "awadeTabsLayout" + compInfos.total++,
        // 		children: _children
        // 	}
        // ];
        const aSubTab = subLayers.filter(
            (layer) => layer.name.indexOf("tab") !== -1
        );
        aSubTab.sort(sortByProperties(false, "rect", "y"));
        const aTabTitle = aContent
            .filter((layer) => layer.rect.y <= aSubTab[0].rect.y)
            .sort(sortByProperties(true, "rect", "x"));
        // debugger;
        const _children = [];
        aTabTitle.forEach((item) => {
            debugger;
            const subChildren = {
                acceptDroppedNode: false,
                inputs: [],
                selector: "awade-tabs-layout",
                agentId: uuidv4(),
                id: "awadeTabsLayout" + compInfos.total++,
                children: [],
            };

            const title = {
                property: "title",
                selectedType: "string",
                value: {
                    initial: item.content.trim(),
                },
            };
            subChildren.inputs.push(title);

            _children.push(subChildren);

            const _subChildren = [];
            if (item.color["color-hex"].indexOf("#029AF2") !== -1) {
                let _tempLayer = {};
                _tempLayer = {
                    rect: {
                        x: layer.rect.x,
                        y: layer.rect.y + aSubTab[0].rect.y,
                        width: layer.rect.width,
                        height: layer.rect.height - aSubTab[0].rect.y,
                    },
                };
                const _subLayers = subLayers.filter((item) =>
                    isInclude(_tempLayer, item)
                );
                layerArrayToSVD(
                    _subLayers,
                    { aLayers: _subLayers },
                    _subChildren,
                    compInfos
                );
                _subChildren.forEach((subComp) => {
                    subComp.layout.left =
                        subComp.layout.left - Math.ceil(_tempLayer.rect.x / 8);
                    subComp.layout.top =
                        subComp.layout.top - Math.ceil(_tempLayer.rect.y / 8);
                });
            }
            subChildren.children = _subChildren;
        });
        oComponent.children = _children;
    }

    /* components[card] */
    function cardProcessor() {
        if (type.indexOf("card") === -1) return;
        showYourself("card", layer, subLayers);
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.acceptDroppedNode = true;
        oComponent.id = "awadeGroup" + compInfos.total++;
        oComponent.selector = "awade-group";
        const _children = [];
        layerArrayToSVD(
            subLayers,
            { aLayers: subLayers },
            _children,
            compInfos
        );
        _children.forEach((subComp) => {
            subComp.layout.left = subComp.layout.left - oComponent.layout.left;
            subComp.layout.top = subComp.layout.top - oComponent.layout.top;
        });
        oComponent.children = [
            {
                acceptDroppedNode: false,
                selector: "awade-group-layout",
                agentId: uuidv4(),
                id: "awadeGroupLayout" + compInfos.total++,
                children: _children,
            },
        ];
    }

    /* components[collapse] */
    function collapseProcessor() {
        if (type.indexOf("collapses") === -1) return;
        // \[mode]
        // \[title][isActive]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-collapse";
        oComponent.id = "jigsawCollapse" + compInfos.total++;
        showYourself("collapse", layer, subLayers, aContent);
        const aSubColl = subLayers.filter(
            (layer) => layer.name.indexOf("element") !== -1
        );
        if (aSubColl.length === 0) {
            nWarn(compInfos.file, compID, "未能识折叠组的子项");
        } else {
            const _children = [];
            aSubColl.sort(sortByProperties(true, "rect", "y"));
            aSubColl.forEach((item, subCollIndex) => {
                const subChildren = {
                    acceptDroppedNode: false,
                    inputs: [],
                    selector: "awade-collapse-layout",
                    agentId: uuidv4(),
                    id: "awadeCollapseLayout" + compInfos.total++,
                    children: [],
                };

                const aText = aContent
                    .filter((layer) => isInclude(item, layer))
                    .sort(sortByProperties(true, "rect", "y"));

                if (aText.length === 0) {
                    nWarn(compInfos.file, compID, "未能识折叠组的子项的标题");
                } else {
                    // spot [title]
                    const title = {
                        property: "title",
                        selectedType: "string",
                        value: {
                            initial: aText[0].content.trim(),
                        },
                    };
                    subChildren.inputs.push(title);
                }

                // spot [isActive]
                const isActive = {
                    property: "isActive",
                    selectedType: "boolean",
                    value: {
                        initial: item.name.indexOf("open") !== -1,
                    },
                };
                subChildren.inputs.push(isActive);

                _children.push(subChildren);

                const _subChildren = [];
                if (item.name.indexOf("open") !== -1) {
                    let _tempLayer = {};
                    if (subCollIndex !== aSubColl.length - 1) {
                        _tempLayer = {
                            rect: {
                                x: item.rect.x,
                                y: item.rect.y + item.rect.height,
                                width: item.rect.width,
                                height:
                                    aSubColl[subCollIndex + 1].rect.y -
                                    item.rect.y -
                                    item.rect.height,
                            },
                        };
                    } else {
                        _tempLayer = {
                            rect: {
                                x: item.rect.x,
                                y: item.rect.y + item.rect.height,
                                width: item.rect.width,
                                height:
                                    layer.rect.y -
                                    item.rect.y -
                                    item.rect.height,
                            },
                        };
                    }
                    const _subLayers = subLayers.filter((item) =>
                        isInclude(_tempLayer, item)
                    );
                    layerArrayToSVD(
                        _subLayers,
                        { aLayers: _subLayers },
                        _subChildren,
                        compInfos
                    );
                    _subChildren.forEach((subComp) => {
                        subComp.layout.left =
                            subComp.layout.left -
                            Math.ceil(_tempLayer.rect.x / 8);
                        subComp.layout.top =
                            subComp.layout.top -
                            Math.ceil(_tempLayer.rect.y / 8);
                    });
                }
                subChildren.children = _subChildren;
            });
            oComponent.children = _children;
        }
    }

    /* components[table] */
    function tableProcessor() {
        if (type.indexOf("table") === -1) return;
        // [data]\[columnDefines][columnDefineGeneratorContext][additionalColumnDefines][contentWidth][floatingHeader][hideHeader][selectedRow][trackRowBy]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-table";
        oComponent.id = "jigsawTable" + compInfos.total++;
        // spot [data]
        const aHeader = aContent
            .filter((aText) => aText.color["css-rgba"] === "rgba(1,77,121,1)")
            .sort(sortByProperties(true, "rect", "x"));
        const aData = aContent
            .filter((aText) => aText.name.indexOf("list") !== -1)
            .sort(sortByProperties(true, "rect", "x"));
        const _data = {
            header: [],
            field: [],
            data: [],
        };
        if (aHeader.length === 0) {
            nWarn(compInfos.file, compID, "此表格组件没有读取到表头信息");
        } else {
            aHeader.forEach((item, i) => {
                _data.header.push(item.content.trim());
                _data.field.push(`field${i}`);
                _data.data.push([]);
            });
            if (aContent.length === 0) {
                nWarn(compInfos.file, compID, "此表格组件没有读取到表格数据");
            } else {
                aData.forEach((item, index) => {
                    const aDataText = item.content.trim().split("\n");
                    aDataText.forEach((text) => {
                        _data.data[index].push(text);
                    });
                });
            }
        }
        showYourself("table", layer, subLayers, aContent, rawType, aHeader);
        const data = {
            property: "data",
            selectedType: "TableData",
            editorMode: "complex",
            value: {
                initial: JSON.stringify(_data),
            },
        };
        oComponent.inputs.push(data);
    }

    /* components[graph] */
    function graphProcessor() {
        if (type.indexOf("graph") === -1) return;
        // [data]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-pie-graph";
        oComponent.id = "jigsawPieGraph" + compInfos.total++;
        showYourself("graph", layer, subLayers, aContent);

        if (rawType.indexOf("pie") !== -1) {
            oComponent.selector = "jigsaw-pie-graph";
            oComponent.id = "jigsawPieGraph" + compInfos.total++;
        } else if (rawType.indexOf("dot") !== -1) {
            oComponent.selector = "jigsaw-scatter-graph";
            oComponent.id = "jigsawScatterGraph" + compInfos.total++;
        } else if (
            rawType.indexOf("line") !== -1 &&
            rawType.indexOf("bar") !== -1
        ) {
            oComponent.selector = "jigsaw-rectangular-graph";
            oComponent.id = "jigsawRectangularGraph" + compInfos.total++;
        } else if (rawType.indexOf("line") !== -1) {
            oComponent.selector = "jigsaw-rectangular-graph";
            oComponent.id = "jigsawRectangularGraph" + compInfos.total++;
        } else if (rawType.indexOf("bar") !== -1) {
            oComponent.selector = "jigsaw-rectangular-graph";
            oComponent.id = "jigsawRectangularGraph" + compInfos.total++;
        } else {
            oComponent.selector = "jigsaw-rectangular-graph";
            oComponent.id = "jigsawRectangularGraph" + compInfos.total++;
            nWarn(compInfos.file, compID, "此图标未能识别到具体的图标类型");
        }
    }

    /* components[button] */
    function buttonProcessor() {
        if (type.indexOf("button") === -1) return;
        // [innerHTML][disabled]\[colorType][preSize]
        const aIcon = subLayers.filter(
            (layer) => layer.name.indexOf("ic/") !== -1
        );

        showYourself("button", layer, subLayers, aContent, aIcon);
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawButton" + compInfos.total++;
        oComponent.selector = "jigsaw-button";
        // get inputs setting
        // spot [disabled]
        if (type.indexOf("disable") !== -1) {
            oComponent.inputs.push(svdProp.disabled);
        }
        // spot [innerHTML]
        if (aContent.length !== 0) {
            const _innerHtml = aContent[0].content.trim();
            if (aIcon.length !== 0) {
                const iconName = aIcon[0].name.split("/")[1];
                svdProp.innerHTML.value.initial = `${iconName}  ${_innerHtml}`;
            } else {
                svdProp.innerHTML.value.initial = _innerHtml;
            }
            oComponent.inputs.push(svdProp.innerHTML);
        }
        // style
        if (subLayers.length !== 0) {
            // style [border]
            const oDiv = subLayers.filter(
                (subLayer) =>
                    subLayer.rect.x === layer.rect.x &&
                    subLayer.rect.y === layer.rect.y &&
                    subLayer.rect.width === layer.rect.width &&
                    subLayer.rect.height === layer.rect.height
            );
            if (oDiv.length !== 0) {
                if (oDiv[0].borders.length !== 0) {
                    oComponent.styles.borderCheck = 1;
                    oComponent.styles.border = {
                        border_color: oDiv[0].borders[0].color["css-rgba"],
                        border_width: oDiv[0].borders[0].thickness,
                        border_radius: oDiv[0].radius,
                    };
                }
                if (oDiv[0].fills.length !== 0) {
                    oComponent.styles.backgroundColorCheck = 1;
                    oComponent.styles.background = {
                        background_color: oDiv[0].fills[0].color["css-rgba"],
                    };
                }
            } else {
                oComponent.styles.borderCheck = 1;
                oComponent.styles.border = {
                    border_color: "rgba(255,255,255,0)",
                    border_width: 0,
                };
                oComponent.styles.backgroundColorCheck = 1;
                oComponent.styles.background = {
                    background_color: "rgba(255,255,255,0)",
                };
            }
            if (aContent.length !== 0) {
                // style [textAlign]
                if (aContent[0].textAlign === "center") {
                    oComponent.styles.alignCenter = true;
                } else if (aContent[0].textAlign === "right") {
                    oComponent.styles.alignRight = true;
                } else if (aContent[0].textAlign === "left") {
                    oComponent.styles.alignLeft = true;
                } else {
                    oComponent.styles.alignCenter = true;
                }
                // style [font]
                oComponent.styles.font = {
                    color: aContent[0].color["css-rgba"],
                    fontSize: aContent[0].fontSize,
                    lineHeight: aContent[0].lineHeight,
                };
            }
        }
    }

    /* components[input][textarea] */
    function inputProcessor() {
        if (type.indexOf("input") === -1) return;
        // [disabled][placeholder]\[innerHTML][value][clearable][valid]
        const aDiv = subLayers.filter(
            (subLayer) =>
                subLayer.rect.x === layer.rect.x &&
                subLayer.rect.y === layer.rect.y &&
                subLayer.rect.width === layer.rect.width &&
                subLayer.rect.height === layer.rect.height
        );
        showYourself("input", layer, subLayers, aDiv, aContent);

        // input
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        if (aContent.length === 0) {
            oComponent.selector = "jigsaw-input";
            oComponent.id = "jigsawInput" + compInfos.total++;
        } else {
            const textHeight = aContent[0].rect.height;
            if (layer.rect.height > textHeight * 3) {
                oComponent.selector = "jigsaw-textarea";
                oComponent.id = "jigsawTextarea" + compInfos.total++;
            } else {
                oComponent.selector = "jigsaw-input";
                oComponent.id = "jigsawInput" + compInfos.total++;
            }
            // get inputs setting
            // spot [disabled][placeholder][value]
            const _text = aContent[0].content.trim();
            const textType = aContent[0].name;
            // [placeholder]
            if (textType.indexOf("tip") !== -1) {
                svdProp.placeholder.value.initial = _text;
                oComponent.inputs.push(svdProp.placeholder);
            }
            // [vaild]
            if (rawType.indexOf("error") !== -1) {
                const aShape = subLayers.filter(
                    (layer) => layer.name === "矩形"
                );
                if (aShape.length === 0) {
                    nWarn(
                        compInfos.file,
                        compID,
                        '未能识别组件下名为"矩形"的图形'
                    );
                } else {
                    const tRect = aShape[0];
                    oComponent.layout = {
                        left: Math.ceil(tRect.rect.x / 8),
                        top: Math.ceil(tRect.rect.y / 8),
                        width: Math.ceil(tRect.rect.width / 8),
                        height: Math.ceil(tRect.rect.height / 8),
                    };
                }
                // [placeholder]error类
                if (textType.indexOf("error") !== -1) {
                    svdProp.placeholder.value.initial = _text;
                    oComponent.inputs.push(svdProp.placeholder);
                }
                svdProp.vaild.bindTo = `jigsawInput${oComponent.id}_valid`;
                oComponent.inputs.push(svdProp.vaild);
            }
            // [disabled]
            if (textType.indexOf("disable") !== -1) {
                const _value = {
                    property: "value",
                    selectedType: "string",
                    value: {
                        initial: _text,
                    },
                };
                oComponent.inputs.push(_value);
                oComponent.inputs.push(svdProp.disabled);
            }

            // [value]
            if (
                textType.indexOf("h1") !== -1 ||
                textType.indexOf("h2") !== -1 ||
                textType.indexOf("h3") !== -1 ||
                textType.indexOf("h4") !== -1 ||
                textType.indexOf("h5") !== -1 ||
                textType.indexOf("h6") !== -1
            ) {
                const _value = {
                    property: "value",
                    selectedType: "string",
                    value: {
                        initial: _text,
                    },
                };
                oComponent.inputs.push(_value);
            }

            // style [font]
            oComponent.styles.font = {
                fontSize: aContent[0].fontSize,
                lineHeight: aContent[0].lineHeight,
            };
        }
    }

    /* components[select] */
    function selectProcessor() {
        if (type.indexOf("select") === -1) return;
        // [placeholder][data][multipleSelect]\[value][disabled][autoWidth][optionCount][searchable][openTrigger][closeTrigger][clearable][vaild]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-select";
        oComponent.id = "jigsawSelect" + compInfos.total++;
        showYourself("select", layer, subLayers, aContent);
        if (rawType.indexOf("open") !== -1) {
            const aShape = subLayers
                .filter((layer) => layer.name === "矩形")
                .sort(sortByProperties(true, "rect", "y"));
            if (aShape.length === 0) {
                nWarn(compInfos.file, compID, '未能识别组件下名为"矩形"的图形');
            } else {
                const tRect = aShape[0];
                oComponent.layout = {
                    left: Math.ceil(tRect.rect.x / 8),
                    top: Math.ceil(tRect.rect.y / 8),
                    width: Math.ceil(tRect.rect.width / 8),
                    height: Math.ceil(tRect.rect.height / 8),
                };
            }
            // spot [data]
            if (aContent.length === 0) {
                nWarn(
                    compInfos.file,
                    compID,
                    "未能识别已打开下拉框中的文本信息"
                );
            } else {
                const aText = aContent.sort(
                    sortByProperties(true, "rect", "y")
                );
                let _str = "[";
                aText[aText.length - 1].content.split("\n").forEach((item) => {
                    _str += '"' + item + '",';
                });
                _str += "]";
                const _data = {
                    property: "data",
                    selectedType: "any[]",
                    value: {
                        initial: _str,
                    },
                };
                oComponent.inputs.push(_data);
            }
        }

        // spot [placeholder]
        if (aContent.length !== 0) {
            const aText = aContent.sort(sortByProperties(true, "rect", "y"));
            aText[0].css.forEach((style) => {
                if (style.indexOf("color") !== -1) {
                    const _color = style.split(":")[1].split(";")[0].trim();
                    if (_color === "#999999") {
                        const _text = aContent[0].content.trim();
                        svdProp.placeholder.value.initial = _text;
                        oComponent.inputs.push(svdProp.placeholder);
                    }
                }
            });
        }

        // spot [disabled]
        if (rawType.indexOf("disable") !== -1) {
            oComponent.inputs.push(svdProp.disabled);
        }

        // spot [multipleSelect]
        const aTag = subLayers.filter(
            (layer) => layer.name.indexOf("tag") !== -1
        );
        if (aTag.length !== 0) {
            oComponent.inputs.push(svdProp.multipleSelect);
        }
    }

    /* components[navi] */
    function naviProcessor() {
        if (type.indexOf("navi") === -1) return;
        // [data]\[width][showToggleButton][collapsed][height]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-navigation-menu";
        oComponent.id = "jigsawNavigationMenu" + compInfos.total++;
        const aLabel = subLayers
            .filter((layer) => /plx:\s*(text)[^/]*/.test(layer.name))
            .sort(sortByProperties(true, "rect", "y"));
        const aIcon = subLayers
            .filter((layer) => /plx:\s*(ic)[^/]*/.test(layer.name))
            .sort(sortByProperties(true, "rect", "y"));
        aLabel.forEach((layer, i) => {
            aLabel[i] = layer.content;
        });
        aIcon.forEach((layer, i) => {
            aIcon[i] = layer.name.split("/")[1];
        });
        showYourself("navi", layer, subLayers, aLabel, aIcon);
        let _str = "[";
        for (let i = 0; i < aLabel.length; i++) {
            _str += '{label:"' + aLabel[i] + '",icon:"iconfont iconfont-e9ad"},';
        }
        _str += "]";
        const _data = {
            property: "data",
            selectedType: "SimpleTreeData",
            value: {
                initial: _str,
            },
        };
        oComponent.inputs.push(_data);
    }

    /* components[step] */
    function stepProcessor() {
        if (type.indexOf("step") === -1) return;
        // [data]\[numInline][preSize]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-steps-multiline";
        oComponent.id = "jigsawStepsMultiline" + compInfos.total++;

        // spot [data]
        const aTitle = subLayers
            .filter((layer) => layer.name.indexOf("body") !== -1)
            .sort(sortByProperties(true, "rect", "x"));
        const aSubTitle = subLayers
            .filter((layer) => layer.name.indexOf("chart") !== -1)
            .sort(sortByProperties(true, "rect", "x"));
        const aStatus = subLayers
            .filter(
                (layer) =>
                    layer.name.indexOf("element") !== -1 &&
                    layer.name.indexOf("line") === -1
            )
            .sort(sortByProperties(true, "rect", "x"));
        aTitle.forEach((layer, i) => {
            aTitle[i] = layer.content;
        });
        aSubTitle.forEach((layer, i) => {
            aSubTitle[i] = layer.content;
        });
        aStatus.forEach((layer, i) => {
            if (layer.name.indexOf("done") !== -1) {
                aStatus[i] = "done";
            } else if (layer.name.indexOf("processing") !== -1) {
                aStatus[i] = "processing";
            } else if (layer.name.indexOf("waiting") !== -1) {
                aStatus[i] = "waiting";
            } else if (layer.name.indexOf("error") !== -1) {
                aStatus[i] = "error";
            } else {
                aStatus[i] = "error";
                nWarn(compInfos.file, compID, "未能识别此步骤的类型");
            }
        });

        showYourself("step", layer, subLayers, aTitle, aSubTitle, aStatus);
        // let _str = "[";
        // for (let i = 0; i < aStatus.length; i++) {
        // 	_str += "{title:\"" + aTitle[i] + "\",status:\"" + aStatus[i] + "\",subTitle:\"" + aSubTitle[i] + "\"},";
        // }
        // _str += "]";
        const _dataStr = [];
        aStatus.forEach((item, i) => {
            const _obj = {
                title: aTitle[i],
                status: aStatus[i],
                subTitle: aSubTitle[i],
            };
            _dataStr[i] = _obj;
        });
        // 状态可选项有error,done,processing,warning,skipped,waiting 共6种
        // '[{title:"done标题",status:"done",subTitle:"done描述"},{title:"error标题",status:"error",subTitle:"error描述"},{title:"processing标题",status:"processing",subTitle:"processing描述"},{title:"warning标题",status:"warning",subTitle:"warning描述"},{title:"skipped标题",status:"skipped",subTitle:"skipped描述"},{title:"waiting标题",status:"waiting",subTitle:"waiting描述"},]';
        const _data = {
            property: "data",
            selectedType: "any[]",
            value: {
                initial: JSON.stringify(_dataStr),
                remote: null,
            },
            editorMode: "complex",
        };
        oComponent.inputs.push(_data);
        const _numInline = {
            property: "numInline",
            selectedType: "number",
            value: {
                initial: aStatus.length,
            },
        };
        oComponent.inputs.push(_numInline);
    }

    /* components[transfer] */
    function transferProcessor() {
        if (type.indexOf("transfer") === -1) return;
        // [data][selectedItems][disabled]\[trackItemBy][labelField][subLabelField][searchable]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-transfer";
        oComponent.id = "jigsawTransfer" + compInfos.total++;
        showYourself("transfer", layer, subLayers, aContent);

        const aStatus = layer.name.split("/");
        for (let i = 1; i < aStatus.length; i++) {
            // spot [disabled]
            if (aStatus[i].indexOf("disable") !== -1) {
                oComponent.inputs.push(svdProp.disabled);
            }
        }

        // spot [data][selectedItems]
        if (aContent.length !== 0) {
            aContent.sort(sortByProperties(true, "rect", "x"));
            const _left = aContent
                .slice(0, aContent.length / 2)
                .sort(sortByProperties(true, "rect", "y"));
            const _right = aContent
                .slice(aContent.length / 2, aContent.length)
                .sort(sortByProperties(true, "rect", "y"));
            if (
                _left[1].name.indexOf("tips") !== -1 &&
                _right[1].name.indexOf("tips") !== -1
            ) {
                oComponent.inputs.push(svdProp.searchable);
                if (_left.length > 2) {
                    let _str = "[";
                    for (let i = 2; i < _left.length; i++) {
                        _str += '{label:"' + _left[i].name.trim() + '"},';
                    }
                    _str += "]";
                    const _data = {
                        property: "data",
                        selectedType: "ArrayCollection",
                        value: {
                            initial: _str,
                        },
                    };
                    oComponent.inputs.push(_data);
                }
                if (_right.length > 2) {
                    let _str = "[";
                    for (let i = 2; i < _right.length; i++) {
                        _str += '{label:"' + _right[i].name.trim() + '"},';
                    }
                    _str += "]";
                    const _selectedItems = {
                        property: "selectedItems",
                        selectedType: "ArrayCollection",
                        value: {
                            initial: _str,
                        },
                    };
                    oComponent.inputs.push(_selectedItems);
                }
            } else {
                if (_left.length > 1) {
                    let _str = "[";
                    for (let i = 2; i < _left.length; i++) {
                        _str += '{label:"' + _left[i].name.trim() + '"},';
                    }
                    _str += "]";
                    const _data = {
                        property: "data",
                        selectedType: "ArrayCollection",
                        value: {
                            initial: _str,
                        },
                    };
                    oComponent.inputs.push(_data);
                }
                if (_right.length > 1) {
                    let _str = "[";
                    for (let i = 2; i < _right.length; i++) {
                        _str += '{label:"' + _right[i].name.trim() + '"},';
                    }
                    _str += "]";
                    const _selectedItems = {
                        property: "data",
                        selectedType: "ArrayCollection",
                        value: {
                            initial: _str,
                        },
                    };
                    oComponent.inputs.push(_selectedItems);
                }
            }
        }
    }

    /* components[breadcrumb] */
    function breadcrumbProcessor() {
        if (type.indexOf("breadcrumb") === -1) return;
        // \[routesConfig][separator][generatorContext][theme]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-breadcrumb";
        oComponent.id = "jigsawBreadcrumb" + compInfos.total++;
        showYourself("breadcrumb", layer, subLayers);
    }

    /* components[checkbox] */
    function checkboxProcessor() {
        if (type.indexOf("checkbox") === -1) return;
        // layer.rect.width += 100;
        // layer.rect.height += 100;
        // subLayers = findChildren(layer, oFilter.aLayers);
        // aContent = subLayers.filter((layer) => layer.content !== undefined);
        // [innerHTML][checked]\[valid][disabled][enableIndeterminate]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawCheckbox" + compInfos.total++;
        oComponent.selector = "jigsaw-checkbox";
        showYourself("checkbox", layer, subLayers, aContent);
        if (aContent.length !== 0) {
            // spot [innerHTML]
            svdProp.innerHTML.value.initial = aContent[0].content.trim();
            oComponent.inputs.push(svdProp.innerHTML);
        } else {
            nWarn(compInfos.file, compID, "未能识别文字信息");
        }
        // spot [checked]
        if (type.indexOf("checked") !== -1) {
            oComponent.inputs.push(svdProp.checked);
        }
    }

    /* components[radio] */
    function radioProcessor() {
        if (type.indexOf("radios") === -1) return;
        // [data]\[value][trackItemBy][labelField][valid]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawRadiosLite" + compInfos.total++;
        oComponent.selector = "jigsaw-radios-lite";

        // spot [data]
        // let aRadio = subLayers.filter((layer) => /plx:\s*(radio\/(?!l))[^/]*/.test(layer.name)).sort(sortByProperties(true,"rect", "x"));
        showYourself("radio", layer, subLayers, aContent);
        const aLabel = aContent
            .sort(sortByProperties(true, "rect", "y"))
            .sort(sortByProperties(true, "rect", "x"));
        aLabel.forEach((layer, i) => {
            aLabel[i] = layer.content;
        });
        let _str = "[";
        for (let i = 0; i < aLabel.length; i++) {
            _str += '{label:"' + aLabel[i] + '"},';
        }
        _str += "]";
        const _data = {
            property: "data",
            selectedType: "ArrayCollection",
            value: {
                initial: _str,
            },
        };
        oComponent.inputs.push(_data);
    }

    /* components[img] */
    function imgProcessor() {
        if (type.indexOf("img") === -1 && type.indexOf("picture") === -1)
            return;
        // [src]\[alt]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "img" + compInfos.total++;
        oComponent.selector = "img";
        showYourself("img", layer, subLayers, aContent);
        // spot [src]
        let picName = "awade-assets/vmax-logo.png";
        if (rawType.indexOf("/") === -1) {
            nWarn(compInfos.file, compID, "未能识别图片的名称信息");
        } else {
            picName = rawType.split("/")[1].split(" ")[0];
        }
        svdProp.src.value.initial = "awade-assets/" + picName + ".png";
        oComponent.inputs.push(svdProp.src);
    }

    /* components[numeric input] */
    function numericProcessor() {
        if (type.indexOf("number input") === -1) return;
        // [value]/[min][max][step][placeholder][valid][disabled][blurOnClear]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawNumericInput" + compInfos.total++;
        oComponent.selector = "jigsaw-numeric-input";
        showYourself("numeric", layer, subLayers, aContent);
        if (aContent.length !== 0) {
            const _num = aContent[0].content;
            const _value = {
                property: "value",
                selectedType: "number",
                value: {
                    initial: _num,
                },
            };
            oComponent.inputs.push(_value);
        }
    }

    /* components[switch] */
    function switchProcessor() {
        if (type.indexOf("switch") === -1) return;
        // [onLabel][offLabel][disabled][checked]/[size][valid]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawSwitch" + compInfos.total++;
        oComponent.selector = "jigsaw-switch";
        showYourself("switch", layer, subLayers, aContent);

        // spot [disabled]
        if (rawType.indexOf("disable") !== -1) {
            oComponent.inputs.push(svdProp.disabled);
        }
        // spot [checked]
        if (rawType.indexOf("on") !== -1 || rawType.indexOf("open") !== -1) {
            oComponent.inputs.push(svdProp.checked);
        }

        // spot [onLabel][offLabel]
        if (aContent.length !== 0) {
            if (aContent[0].content === undefined) return;
            const _text = aContent[0].content.trim();

            let _onLabelText = "开";
            let _offLabelText = "关";

            if (_text === "开" || _text === "关") {
                _onLabelText = "开";
                _offLabelText = "关";
            } else if (_text === "ON" || _text === "OFF") {
                _onLabelText = "ON";
                _offLabelText = "OFF";
            } else if (_text === "On" || _text === "Off") {
                _onLabelText = "On";
                _offLabelText = "Off";
            } else if (_text === "on" || _text === "off") {
                _onLabelText = "on";
                _offLabelText = "off";
            }
            svdProp.onLabel.value.initial = _onLabelText;
            svdProp.offLabel.value.initial = _offLabelText;
            oComponent.inputs.push(svdProp.onLabel);
            oComponent.inputs.push(svdProp.offLabel);
        }
    }

    /* components[slider] */
    function sliderProcessor() {
        if (type.indexOf("slider") === -1) return;
        // [disabled]/[value][min][max][step][vertical][marks][valid]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-slider";
        oComponent.id = "jigsawSlider" + compInfos.total++;
        showYourself("slider", layer, subLayers);

        const aStatus = layer.name.split("/");
        for (let i = 1; i < aStatus.length; i++) {
            // spot [disabled]
            if (aStatus[i].indexOf("disable") !== -1) {
                oComponent.inputs.push(svdProp.disabled);
            }
        }
    }

    /* components[datepicker] */
    function datepickerProcessor() {
        if (type.indexOf("date") === -1) return;
        // datepicker
        // \[gr][date][limitStart][limitEnd][weekStart][grItems][markDates][step][valid][disabled][placeholder][openTrigger][closeTrigger]
        // datepicker/range
        // \[gr][beginDate][endDate][limitStart][limitEnd][weekStart][grItems][markDates][step][valid][disabled]
        // datepicker/select
        // \[gr][date][limitStart][limitEnd][weekStart][grItems][markDates][step][valid][disabled][placeholder][openTrigger][closeTrigger]
        // datepicker/select/range
        // \[gr][date][limitStart][limitEnd][weekStart][grItems][markDates][step][valid][disabled][placeholder][openTrigger][closeTrigger]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);

        if (rawType.indexOf("range") !== -1) {
            oComponent.selector = "jigsaw-range-date-time-select";
            oComponent.id = "jigsawRangeDateTimeSelect" + compInfos.total++;
            oComponent.importModule = [
                {
                    module: "TimeGr",
                    from: "@rdkmaster/jigsaw",
                },
                {
                    module: "TimeService",
                    from: "@rdkmaster/jigsaw",
                },
                {
                    module: "MarkDate",
                    from: "@rdkmaster/jigsaw",
                },
                {
                    module: "RangeDate",
                    from: "@rdkmaster/jigsaw",
                },
            ];
        } else {
            oComponent.selector = "jigsaw-date-time-select";
            oComponent.id = "jigsawDateTimeSelect" + compInfos.total++;
            oComponent.importModule = [
                {
                    module: "TimeGr",
                    from: "@rdkmaster/jigsaw",
                },
                {
                    module: "TimeService",
                    from: "@rdkmaster/jigsaw",
                },
                {
                    module: "MarkDate",
                    from: "@rdkmaster/jigsaw",
                },
            ];
        }

        if (rawType.indexOf("open") !== -1) {
            const aRect = subLayers.filter(
                (layer) => layer.name.indexOf("矩形") !== -1
            );
            aRect
                .sort(sortByProperties(true, "rect", "x"))
                .sort(sortByProperties(true, "rect", "x"));
            if (aRect.length < 2) {
                nWarn(compInfos.file, compID, "未能识别此日期选择器的位置信息");
            } else {
                const tRect = aRect[0];
                oComponent.layout = {
                    left: Math.ceil(tRect.rect.x / 8),
                    top: Math.ceil(tRect.rect.y / 8),
                    width: Math.ceil(tRect.rect.width / 8),
                    height: Math.ceil(tRect.rect.height / 8),
                };
            }
        }

        // spot [gr]
        if (rawType.indexOf("moment") !== -1) {
            svdProp.gr.value.initial = '"second"';
            oComponent.inputs.push(svdProp.gr);
        }

        // spot [placeholder][date]
        if (aContent !== 0) {
            const aText = aContent.sort(sortByProperties(true, "rect", "y"));
            aText[0].css.forEach((style) => {
                if (style.indexOf("color") !== -1) {
                    const _color = style.split(":")[1].split(";")[0].trim();
                    if (_color === "#999999") {
                        const _text = aContent[0].content.trim();
                        svdProp.placeholder.value.initial = _text;
                        oComponent.inputs.push(svdProp.placeholder);
                    } else if (_color === "#333333") {
                        const _date = aContent[0].content.trim();
                        svdProp.date.value.initial = _date;
                        oComponent.inputs.push(svdProp.date);
                    }
                }
            });
        }

        // if (rawType.indexOf("select") !== -1) {
        // 		oComponent.selector = "jigsaw-range-time";
        // 		oComponent.id = "jigsawRangeTime" + compInfos.total++;
        // 		oComponent.importModule = [
        // 			{
        // 				module: "TimeGr",
        // 				from: "@rdkmaster/jigsaw"
        // 			},
        // 			{
        // 				module: "TimeService",
        // 				from: "@rdkmaster/jigsaw"
        // 			},
        // 			{
        // 				module: "MarkDate",
        // 				from: "@rdkmaster/jigsaw"
        // 			}
        // 		];
        // 	} else {
        // 		oComponent.selector = "jigsaw-time";
        // 		oComponent.id = "jigsawTime" + compInfos.total++;
        // 		oComponent.importModule = [
        // 			{
        // 				module: "TimeGr",
        // 				from: "@rdkmaster/jigsaw"
        // 			},
        // 			{
        // 				module: "TimeService",
        // 				from: "@rdkmaster/jigsaw"
        // 			},
        // 			{
        // 				module: "MarkDate",
        // 				from: "@rdkmaster/jigsaw"
        // 			}
        // 		];
        // 	}
        // }
    }

    /* components[timepicker] */
    function timepickerProcessor() {
        if (type.indexOf("time") === -1) return;
        // [disabled][gr]\[value][limitStart][limitEnd][step][popDirection][valid]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-time-picker";
        oComponent.id = "jigsawTimePicker" + compInfos.total++;
        showYourself("timepicker", layer, subLayers, aContent);
        oComponent.importModule = [
            {
                module: "TimeGr",
                from: "@rdkmaster/jigsaw",
            },
            {
                module: "TimeService",
                from: "@rdkmaster/jigsaw",
            },
        ];
        if (rawType.indexOf("open") !== -1) {
            const aRect = subLayers.filter(
                (layer) => layer.name.indexOf("矩形") !== -1
            );
            aRect
                .sort(sortByProperties(true, "rect", "x"))
                .sort(sortByProperties(true, "rect", "x"));
            if (aRect.length < 2) {
                nWarn(compInfos.file, compID, "未能识别此时间选择器的位置信息");
            } else {
                const tRect = aRect[0];
                oComponent.layout = {
                    left: Math.ceil(tRect.rect.x / 8),
                    top: Math.ceil(tRect.rect.y / 8),
                    width: Math.ceil(tRect.rect.width / 8),
                    height: Math.ceil(tRect.rect.height / 8),
                };
            }
        }

        // spot [disabled]
        if (rawType.indexOf("disable") !== -1) {
            oComponent.inputs.push(svdProp.disabled);
        }

        // spot [gr]
        if (aContent.length === 1) {
            const _time = aContent[0].content;
            const _count = (_time.match(/:/g) || []).length;
            if (_count === 1) {
                svdProp.gr.value.initial = '"time_hour_minute"';
                oComponent.inputs.push(svdProp.gr);
            }
        }
    }

    /* components[tag] */
    function tagProcessor() {
        if (type.indexOf("tag") === -1) return;
        // [innerHTML][color]/[closable][showBorder]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawTag" + compInfos.total++;
        oComponent.selector = "jigsaw-tag";
        showYourself("tag", layer, subLayers, aContent);
        // spot [innerHTML]
        if (aContent.length !== 0) {
            svdProp.innerHTML.value.initial = aContent[0].content.trim();
            oComponent.inputs.push(svdProp.innerHTML);
        }
        // spot [closable]
        if (rawType.indexOf("delete") !== -1) {
            oComponent.inputs.push(svdProp.closable);
        }

        // style
        if (subLayers.length !== 0) {
            // style [border]
            const oDiv = subLayers.filter(
                (subLayer) =>
                    subLayer.rect.x === layer.rect.x &&
                    subLayer.rect.y === layer.rect.y &&
                    subLayer.rect.width === layer.rect.width &&
                    subLayer.rect.height === layer.rect.height
            );
            if (oDiv.length !== 0) {
                if (oDiv[0].borders.length !== 0) {
                    oComponent.styles.borderCheck = 1;
                    oComponent.styles.border = {
                        border_color: oDiv[0].borders[0].color["css-rgba"],
                        border_width: oDiv[0].borders[0].thickness,
                        border_radius: oDiv[0].radius,
                    };
                }
                if (oDiv[0].fills.length !== 0) {
                    oComponent.styles.backgroundColorCheck = 1;
                    oComponent.styles.background = {
                        background_color: oDiv[0].fills[0].color["css-rgba"],
                    };
                }
            } else {
                oComponent.styles.borderCheck = 1;
                oComponent.styles.border = {
                    border_color: "rgba(255,255,255,0)",
                    border_width: 0,
                };
                oComponent.styles.backgroundColorCheck = 1;
                oComponent.styles.background = {
                    background_color: "rgba(255,255,255,0)",
                };
            }
            if (aContent.length !== 0) {
                // style [textAlign]
                if (aContent[0].textAlign === "center") {
                    oComponent.styles.alignCenter = true;
                } else if (aContent[0].textAlign === "right") {
                    oComponent.styles.alignRight = true;
                } else if (aContent[0].textAlign === "left") {
                    oComponent.styles.alignLeft = true;
                } else {
                    oComponent.styles.alignCenter = true;
                }
                // style [font]
                oComponent.styles.font = {
                    color: aContent[0].color["css-rgba"],
                    fontSize: aContent[0].fontSize,
                    lineHeight: aContent[0].lineHeight,
                };
            }
        }
    }

    /* components[tree] */
    function treeProcessor() {
        if (type.indexOf("tree") === -1) return;
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers, aContent);
        oComponent.id = "jigsawTreeExt" + compInfos.total++;
        oComponent.selector = "jigsaw-tree-ext";
        showYourself("tree", layer, subLayers, aContent);

        const _setting = {
            edit: {
                enable: rawType.indexOf("edit") !== -1,
                showRemoveBtn: rawType.indexOf("edit") !== -1,
                showRenameBtn: rawType.indexOf("edit") !== -1,
            },
            data: {
                key: {
                    children: "nodes",
                    name: "label",
                },
            },
            view: {
                showIcon: rawType.indexOf("icon") !== -1,
            },
            check: {
                enable: rawType.indexOf("checkbox") !== -1,
            },
        };
        const setting = {
            property: "setting",
            selectedType: "ZTreeSettingSetting",
            value: {
                initial: JSON.stringify(_setting),
            },
            bindTo: oComponent.id + "_setting",
        };
        oComponent.inputs.push(setting);

        const _data = [
            {
                label: "父节点",
                open: true,
                nodes: [
                    { label: "子节点1", typeId: 11 },
                    { label: "子节点2", typeId: 12 },
                ],
            },
            {
                label: "父节点",
                open: true,
                nodes: [
                    { label: "子节点1", typeId: 21 },
                    { label: "子节点2", typeId: 22 },
                    { label: "子节点3", typeId: 23 },
                    { label: "子节点4", typeId: 24 },
                ],
            },
            {
                label: "父节点",
                open: false,
                nodes: [
                    { label: "子节点1", typeId: 31 },
                    { label: "子节点2", typeId: 32 },
                    { label: "子节点3", typeId: 33 },
                    { label: "子节点4", typeId: 34 },
                ],
            },
        ];

        const data = {
            property: "data",
            selectedType: "SimpleTreeData",
            value: {
                initial: JSON.stringify(_data),
            },
        };
        oComponent.inputs.push(data);
    }

    /* components[area] */
    function areaProcessor() {
        if (type.indexOf("area") === -1) return;
        // \[data][dataGenerator][generatorContext][selectedItems][labelField][trackItemBy][multipleSelect][optionWidth]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.acceptDroppedNode = true;
        oComponent.selector = "jigsaw-combo-select";
        oComponent.id = "jigsawComboSelect" + compInfos.total++;
        showYourself("area", layer, subLayers, aContent);

        const _children = [
            {
                acceptDroppedNode: false,
                inputs: [
                    {
                        property: "data",
                        selectedType: "SimpleTreeData",
                        value: {
                            initial:
                                '\n        {\n            nodes: [\n                {\n                    label:"北京市",\n                    nodes:[\n                        {label:"东城区"},\n                        {label:"西城区"},\n                        {label:"朝阳区"},\n                        {label:"丰台区"},\n                        {label:"石景山区"},\n                        {label:"海淀区"},\n                        {label:"顺义区"},\n                        {label:"通州区"},\n                        {label:"大兴区"},\n                        {label:"房山区"},\n                        {label:"门头沟区"},\n                        {label:"昌平区"},\n                        {label:"平谷区"},\n                        {label:"密云区"},\n                        {label:"怀柔区"},\n                        {label:"延庆区"}\n                    ],\n                    title:"区"\n                },\n                {\n                    label:"江苏省",\n                    nodes:[\n                        {\n                            label:"南京市",\n                            nodes:[\n                                {label:"玄武区"},\n                                {label:"秦淮区"},\n                                {label:"鼓楼区"},\n                                {label:"建邺区"},\n                                {label:"雨花台区"},\n                                {label:"栖霞区"},\n                                {label:"浦口区"},\n                                {label:"六合区"},\n                                {label:"江宁区"},\n                                {label:"溧水区"},\n                                {label:"高淳区"}\n                            ],\n                            title:"区"\n                        },\n                        {\n                            label:"无锡市",\n                            nodes:[\n                                {label:"梁溪区"},\n                                {label:"滨湖区"},\n                                {label:"惠山区"},\n                                {label:"锡山区"},\n                                {label:"新吴区"},\n                                {label:"江阴市"},\n                                {label:"宜兴市"}\n                            ],\n                            title:"区"\n                        },\n                        {\n                            label:"苏州市",\n                            nodes:[\n                                {label:"姑苏区"},\n                                {label:"相城区"},\n                                {label:"吴中区"},\n                                {label:"虎丘区"},\n                                {label:"吴江区"},\n                                {label:"常熟市"},\n                                {label:"昆山市"},\n                                {label:"张家港市"},\n                                {label:"太仓市"}\n                            ],\n                            title:"区"\n                        }\n                    ],\n                    title:"市"\n                }\n            ],\n            title: "省/直辖市"\n        }\n    ',
                        },
                    },
                ],
                selector: "jigsaw-cascade",
                agentId: uuidv4(),
                id: "jigsawCascade" + compInfos.total++,
                layout: {
                    left: 0,
                    top: 0,
                    width: 41,
                    height: 27,
                    scaleDirection: "none",
                    align_items: "flex-start",
                },
            },
        ];
        oComponent.children = [
            {
                acceptDroppedNode: false,
                selector: "awade-combo-layout",
                agentId: uuidv4(),
                id: "awadeComboLayout" + compInfos.total++,
                children: _children,
            },
        ];
    }

    /* components[cascade] */
    function cascadeProcessor() {
        if (type.indexOf("cascade") === -1) return;
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawCascade" + compInfos.total++;
        oComponent.selector = "jigsaw-cascade";
        showYourself("cascade", layer, subLayers, aContent);
    }

    /* components[list] */
    function listProcessor() {
        if (type.indexOf("list") === -1) return;
        // list-lite
        // [data]/[selectedItems][trackItemBy][labelField][multipleSelect][searchable][optionCount][valid]
        // list
        // [data][innerHTML]/[selectedItems][trackItemBy][labelField][multipleSelect][valid]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);

        let aLabel = aContent
            .sort(sortByProperties(true, "rect", "y"))
            .sort(sortByProperties(true, "rect", "x"));
        if (aLabel[aLabel.length - 1].name.indexOf("select") !== -1) {
            oComponent.selector = "jigsaw-list";
            oComponent.id = "jigsawList" + compInfos.total++;
            const aButton = aLabel.slice(aLabel.length / 2, aLabel.length);
            aLabel = aLabel.slice(0, aLabel.length / 2);
            svdProp.data.selectedType = "GroupOptionValue[]";
            svdProp.innerHTML.value.initial =
                "{{$item}}    <a>" + aButton[0].content + "</a>";
            oComponent.inputs.push(svdProp.innerHTML);
        } else {
            oComponent.selector = "jigsaw-list-lite";
            oComponent.id = "jigsawListLite" + compInfos.total++;
            svdProp.data.selectedType = "any[]";
        }
        let _data = "[";
        aLabel.forEach((item) => {
            _data += '"' + item.content + '",';
        });
        _data += "]";
        svdProp.data.value.initial = _data;
        oComponent.inputs.push(svdProp.data);
        showYourself("list", layer, subLayers, aContent, aLabel);
    }

    /* components[pagination] */
    function paginationProcessor() {
        if (type.indexOf("pagination") === -1) return;
        // [mode]/[searchable][showQuickJumper][placeholder][data][pageSizeOptions]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-pagination";
        oComponent.id = "jigsawPagination" + compInfos.total++;
        showYourself("pagination", layer, subLayers, aContent);
        // spot [mode]
        if (rawType.indexOf("short") !== -1) {
            svdProp.mode.value.initial = '"simple"';
            oComponent.inputs.push(svdProp.mode);
        } else if (rawType.indexOf("long") !== -1) {
            svdProp.mode.value.initial = '"complex"';
            oComponent.inputs.push(svdProp.mode);
        }
    }

    /* components[colorpicker] */
    function colorpickerProcessor() {
        if (type.indexOf("colorpicker") === -1) return;
        // \[color][enableOpacity][mode][enableConfirm][limitedColors][preSize]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-color-select";
        oComponent.id = "jigsawColorSelect" + compInfos.total++;
        showYourself("colorpicker", layer, subLayers);
    }

    /* components[upload] */
    function uploadProcessor() {
        if (type.indexOf("upload") === -1) return;
        // \[targetUrl][fileType][multiple][contentField][fileNameField][fileVerify][additionalFields][minSize][maxSize]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-upload";
        oComponent.id = "jigsawUpload" + compInfos.total++;
        showYourself("upload", layer, subLayers);
    }

    /* components[timesection] */
    function timesectionProcessor() {
        if (type.indexOf("timesection") === -1) return;
        // \/[value][showLastDay][currentTime][layout][showHour][showWeek][showDate][multipleHour][multipleDate]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-time-section";
        oComponent.id = "jigsawTimeSection" + compInfos.total++;
        showYourself("time section", layer, subLayers);
    }

    /* components[rate] */
    function rateProcessor() {
        if (type.indexOf("rate") === -1) return;
        // \/[icon][max][allowHalf][value][disabled]
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.selector = "jigsaw-rate";
        oComponent.id = "jigsawRate" + compInfos.total++;
        showYourself("rate", layer, subLayers);
        const aStatus = layer.name.split("/");
        if (aStatus.indexOf("disable") !== -1) {
            oComponent.inputs.push(svdProp.disabled);
        }
    }

    /* components[progress] */
    function progressProcessor() {
        if (type.indexOf("progress bar") === -1) return;
        // [preSize][showMarker][value][status][labelPosition][animate]\
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "jigsawProgress" + compInfos.total++;
        oComponent.selector = "jigsaw-progress";
        const aRect = subLayers.filter(
            (layer) => layer.name.indexOf("矩形") !== -1
        );
        showYourself("progress bar", layer, subLayers, aContent, aRect);

        // spot [value]
        if (aContent.length === 0) {
            if (rawType.indexOf("circle") === -1) {
                if (aRect.length === 1) {
                    svdProp.value.selectedType = "number";
                    svdProp.value.value.initial = 0;
                    oComponent.inputs.push(svdProp.value);
                } else if (aRect.length === 2) {
                    let numerator = 1;
                    let denominator = 1;
                    let _value = 100;
                    aRect[0].css.forEach((item) => {
                        if (item.indexOf("background") !== -1) {
                            const _bg = item.split(":")[1].split(";")[0].trim();
                            if (_bg === "#DDDDDD") {
                                numerator = aRect[1].rect.width;
                                denominator = aRect[0].rect.width;
                            } else {
                                numerator = aRect[0].rect.width;
                                denominator = aRect[1].rect.width;
                            }
                        }
                    });
                    _value = Math.floor((numerator / denominator) * 100);
                    svdProp.value.selectedType = "number";
                    svdProp.value.value.initial = _value;
                    oComponent.inputs.push(svdProp.value);
                } else {
                    nWarn(
                        compInfos.file,
                        compID,
                        "此进度条没有识别到数值文本且矩形数据有误"
                    );
                }
            }
        } else {
            if (aContent.length > 1) {
                aContent.sort(sortByProperties(true, "rect", "y"));
            }
            const _value = aContent[0].content.trim().split("%")[0];
            svdProp.value.selectedType = "number";
            svdProp.value.value.initial = _value;
            oComponent.inputs.push(svdProp.value);
        }

        // spot [showMarker]
        if (aContent.length > 2) {
            oComponent.inputs.push(svdProp.showMarker);
        }

        // spot [preSize]
        if (rawType.indexOf("tall") !== -1) {
            svdProp.preSize.value.initial = '"large"';
            oComponent.inputs.push(svdProp.preSize);
        }

        // spot [status]
        if (rawType.indexOf("circle") === -1) {
            if (aRect.length === 2) {
                aRect.forEach((oRect) => {
                    oRect.css.forEach((item) => {
                        if (item.indexOf("background") !== -1) {
                            const _bg = item.split(":")[1].split(";")[0].trim();
                            if (_bg === "#07BB75") {
                                svdProp.status.value.initial = '"success"';
                            } else if (_bg === "#EA9715") {
                                svdProp.status.value.initial = '"block"';
                            } else if (_bg === "#E94F4F") {
                                svdProp.status.value.initial = '"error"';
                            } else {
                                svdProp.status.value.initial = '"processing"';
                            }
                        }
                    });
                });
            }
            oComponent.inputs.push(svdProp.status);
        }

        // spot [labelPosition]
        if (rawType.indexOf("circle") === -1) {
            if (rawType.indexOf("tall") !== -1) {
                aContent.sort(sortByProperties(true, "rect", "y"));
                if (aContent[0].color["color-hex"].indexOf("FFF") !== -1) {
                    svdProp.labelPosition.value.initial = '"followLeft"';
                } else {
                    svdProp.labelPosition.value.initial = '"followRight"';
                }
            }
            oComponent.inputs.push(svdProp.labelPosition);
        }

        // spot [animation]
        svdProp.animate.value.initial = rawType.indexOf("animate") !== -1;
        oComponent.inputs.push(svdProp.animate);
    }

    /* components[hr] */
    function hrProcessor() {
        if (type.indexOf("hr") === -1) return;
        oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "hr" + compInfos.total++;
        oComponent.selector = "hr";
        showYourself("hr", layer, subLayers, aContent);
    }

    /* components[iframe] */
    function iframeProcessor() {
        if (type.indexOf("iframe") === -1) return;
        // \[src]
        oComponent.id = "awadeIframe" + compInfos.total++;
        oComponent.selector = "awade-iframe";

        showYourself("iframe", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[placeholder] */
    function placeholderProcessor() {
        if (type.indexOf("placeholder") === -1) return;
        oComponent.id = "awadePlaceholder" + compInfos.total++;
        oComponent.selector = "awade-placeholder";

        showYourself("iframe", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[h1] */
    function h1Processor() {
        if (type.indexOf("h1") === -1) return;
        oComponent.id = "h1" + compInfos.total++;
        oComponent.selector = "h1";

        showYourself("h1", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[h2] */
    function h2Processor() {
        if (type.indexOf("h2") === -1) return;
        //  \[innerHTML]
        oComponent.id = "h2" + compInfos.total++;
        oComponent.selector = "h2";

        showYourself("h2", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[h3] */
    function h3Processor() {
        if (type.indexOf("h3") === -1) return;
        // \[innerHTML]
        oComponent.id = "h3" + compInfos.total++;
        oComponent.selector = "h3";

        showYourself("h3", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[h4] */
    function h4Processor() {
        if (type.indexOf("h4") === -1) return;
        // \[innerHTML]
        oComponent.id = "h4" + compInfos.total++;
        oComponent.selector = "h4";

        showYourself("h4", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[h5] */
    function h5Processor() {
        if (type.indexOf("h5") === -1) return;
        // \[innerHTML]
        oComponent.id = "h5" + compInfos.total++;
        oComponent.selector = "h5";

        showYourself("h5", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[h6] */
    function h6Processor() {
        if (type.indexOf("h6") === -1) return;
        // \[innerHTML]
        oComponent.id = "h6" + compInfos.total++;
        oComponent.selector = "h6";

        showYourself("h6", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[link] */
    function linkProcessor() {
        if (type.indexOf("link") === -1) return;
        // \[innerHTML][href][target]
        oComponent.id = "a" + compInfos.total++;
        oComponent.selector = "a";

        showYourself("link", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[loading] */
    function loadingProcessor() {
        if (type.indexOf("loading") === -1) return;
        // \[color]
        oComponent.id = "jigsawFontLoading" + compInfos.total++;
        oComponent.selector = "jigsaw-font-loading";

        showYourself("loading", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[basicgis] */
    function basicgisProcessor() {
        if (type.indexOf("basicgis") === -1) return;
        // \[src][map]
        oComponent.selector = "uid-basic-gis";
        oComponent.id = "uidBasicGis" + compInfos.total++;

        showYourself("loading", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* components[text][span][p] */
    function textProcessor() {
        if (type.indexOf("text") === -1) return;
        // [innerHTML]\
        // oFilter.aLayers = deleteChildren(layer, oFilter.aLayers);
        oComponent.id = "span" + compInfos.total++;
        oComponent.selector = "span";

        showYourself("text", layer, subLayers, aContent);

        // spot [innerHTML]
        if (layer.content === undefined) {
            svdProp.innerHTML.value.initial = "未知文本";
            nWarn(compInfos.file, compID, "未能识别文字信息");
        }
        svdProp.innerHTML.value.initial = layer.content.trim();
        // style
        oComponent.styles.font = {
            color: layer.color["css-rgba"],
            fontSize: layer.fontSize,
            lineHeight: layer.lineHeight,
        };

        // if (aContent.length === 0) {
        // 	svdProp.innerHTML.value.initial = "未知文本";
        // 	nWarn(compInfos.file, compID, "未能识别文字信息");
        // } else {
        // 	if (aContent.length > 1) {
        // 		svdProp.innerHTML.value.initial = "未知文本";
        // 		nWarn(compInfos.file, compID, "存在多个文字信息");
        // 	} else {
        // 		if (aContent[0].content.indexOf("\n")) {
        // 			oComponent.id = "p" + compInfos.total++;
        // 			oComponent.selector = "p";
        // 		}
        // 		svdProp.innerHTML.value.initial = aContent[0].content.trim();
        // 		// style
        // 		oComponent.styles.font = {
        // 			color: aContent[0].color["css-rgba"],
        // 			fontSize: aContent[0].fontSize,
        // 			lineHeight: aContent[0].lineHeight
        // 		};
        // 		if (rawType.indexOf("link") !== -1) {
        // 			oComponent.styles.fontUnderline = true;
        // 		}
        // 	}
        // }
        oComponent.inputs.push(svdProp.innerHTML);
    }

    /* components[icon] */
    function iconProcessor() {
        if (type.indexOf("icon") === -1) return;

        // \[innerHTML]
        oComponent.id = "jigsawIcon" + compInfos.total++;
        oComponent.selector = "jigsaw-icon";
        showYourself("icon", layer, subLayers, aContent);
        oComponent.inputs.push(svdProp.icon);
    }

    /* overlay transfer */
    function overlayTransfer() {
        if (rawType.indexOf("overlay") === -1) return;
        const filterTab = subLayers.filter((layer) =>
            /plx:\s*(tab)[^/]*/.test(layer.name)
        );
        const filterCollapse = subLayers.filter((layer) =>
            /plx:\s*(collapse)[^/]*/.test(layer.name)
        );
        const filterRadio = subLayers.filter((layer) =>
            /plx:\s*(radio)[^/]*/.test(layer.name)
        );
        if (filterTab.length > 0) {
            type = "tabs";
            tabsProcessor();
        } else if (filterCollapse.length > 0) {
            type = "collapses";
            collapseProcessor();
        } else if (filterRadio.length > 0) {
            type = "radios";
            radioProcessor();
        }
    }
}

// Find out sub-layers. Sub-layers are which could be fully covered by his father.
function findChildren(target, layers) {
    return layers.filter(
        (layer) => layer !== target && isInclude(target, layer)
    );
}

// Delete used layers.
function deleteChildren(target, layers) {
    return layers.filter((layer) => !isInclude(target, layer));
}

// Define whether layer1 cover layer2 or not
function isInclude(layer1, layer2) {
    const x11 = layer1.rect.x;
    const x12 = layer1.rect.x + layer1.rect.width;
    const y11 = layer1.rect.y;
    const y12 = layer1.rect.y + layer1.rect.height;
    const x21 = layer2.rect.x;
    const x22 = layer2.rect.x + layer2.rect.width;
    const y21 = layer2.rect.y;
    const y22 = layer2.rect.y + layer2.rect.height;
    return (
        x21 >= x11 &&
        x21 <= x12 &&
        y21 >= y11 &&
        y21 <= y12 &&
        x22 >= x11 &&
        x22 <= x12 &&
        y22 >= y11 &&
        y22 <= y12
    );
}

// Sort array by properties
function sortByProperties(order, ...args) {
    // order descending/ascending ascending by default
    let rev = 1;
    if (order === true) {
        rev = 1;
    } else {
        rev = -1;
    }

    return function (a, b) {
        args.forEach((property) => {
            a = a[property];
            b = b[property];
        });
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    };
}

// array deduplication
function arryaUnique(arr) {
    const res = [];
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            res.push(arr[i]);
            obj[arr[i]] = 1;
        }
    }

    return res;
}

// better console log experience
function showYourself(groupName, ...args) {
    if (filterMode.modeTrigger) {
        if (filterMode.uxName !== "" && groupName !== filterMode.uxName) return;
    }
    if (debugMode) {
        console.group(groupName);
        args.forEach((item, i) => {
            console.log('--> item:', item);
        });
        console.groupEnd();
    }
}

// node.js delete folder
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file, index) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

// node dressing niceLog
function nLog(keys, source) {
    const nodeStyles = {
        reset: "\x1B[0m",
        bright: "\x1B[1m",
        grey: "\x1B[2m",
        italic: "\x1B[3m",
        underline: "\x1B[4m",
        reverse: "\x1B[7m",
        hidden: "\x1B[8m",
        black: "\x1B[30m",
        red: "\x1B[31m",
        green: "\x1B[32m",
        yellow: "\x1B[33m",
        blue: "\x1B[34m",
        magenta: "\x1B[35m",
        cyan: "\x1B[36m",
        white: "\x1B[37m",
        blackBG: "\x1B[40m",
        redBG: "\x1B[41m",
        greenBG: "\x1B[42m",
        yellowBG: "\x1B[43m",
        blueBG: "\x1B[44m",
        magentaBG: "\x1B[45m",
        cyanBG: "\x1B[46m",
        whiteBG: "\x1B[47m",
    };
    let values = "";
    if (typeof keys === "string") {
        values = nodeStyles[keys];
    } else {
        keys.forEach((key) => {
            values += nodeStyles[key];
        });
    }
    return values + source + nodeStyles.reset;
}

// node log system
function nWarn(fileInfo, compInfo, errorInfo) {
    console.log(
        nLog("yellow", "警告 ") +
            fileInfo +
            " > " +
            nLog("underline", "组件" + compInfo) +
            " " +
            errorInfo
    );
}
