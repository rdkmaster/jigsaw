import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, ViewEncapsulation} from "@angular/core";
import {
    JigsawConfirmAlert,
    JigsawErrorAlert,
    JigsawTreeExt,
    SimpleNode,
    SimpleTreeData,
    ZTreeSettings
} from "jigsaw/public_api";
import sdk from "@stackblitz/sdk";

declare const CodeMirror;

function getDemoCode() {
    return window.hasOwnProperty('getJigsawDemoCode') ? (<any>window).getJigsawDemoCode() : null;
}

let project = getDemoCode();
const defaultOpen = 'src/app/for-internal/demo.component.html';

@Component({
    template: `
        <div class="container">
            <div class="tool-bar">
                <p class="go-back" (click)="goBack()">
                    <span class="iconfont iconfont-e4c0"></span> 返回运行效果
                </p>
                <p class="page-title">
                    查看 Jigsaw Demo 源码
                </p>
                <p class="edit-button" (click)="gotoStackblitz()"
                   title="你可以修改Demo的代码并立即运行修改后的代码，注意此功能需要连接外网">
                    <span class="live-icon">LIVE</span>
                    修改Demo并立即查看效果
                    <span class="iconfont iconfont-e4c1"></span>
                </p>
            </div>
            <div class="source-content">
                <div style="overflow:hidden; height:100%">
                    <div class="box-content" style="width: 300px;">
                        <jigsaw-tree-ext #tree [data]="fileTree" [setting]="setting">
                        </jigsaw-tree-ext>
                    </div>
                    <div grow="3" class="box-content" style="width: calc(100vw - 316px);">
                        <div #source style="width:100%; height:100%"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            height: calc(100vh - 40px);
            background-color: #515151;
            width: 100%;
            padding: 0;
        }

        body {
            background-color: #515151;
        }

        .tool-bar {
            height: 32px;
            display: flex;
        }

        .edit-button {
            display: inline-block;
            padding: 2px 0 0 8px;
            font-size: 15px;
            cursor: pointer;
            color: #ddd;
            position: absolute;
            right: 16px;
        }

        .page-title {
            font-size: 15px;
            width: calc(100% - 477px);
            text-align: center;
            color: #fff;
        }

        .go-back {
            color: #ddd;
            top: 8px;
            cursor: pointer;
            font-size: 15px;
            width: 237px;
        }

        .live-icon {
            font-size: 10px;
            background-color: #1389fd;
            border-radius: 4px;
            padding: 0 4px;
        }

        .source-content {
            height: 100%;
            background-color: #303030;
        }

        .box-content {
            height: 100%;
            display: inline-block;
            vertical-align: top;
        }

        .ztree li a {
            color: #fff !important;
        }

        .jigsaw-box-resize-line:hover {
            border-color: #aaa;
        }

        .jigsaw-box-resize-line {
            border-color: #666;
        }

        .CodeMirror {
            height: 100%;
            margin-left: 4px;
            font-family: Consolas, monospace;
            font-size: 14px;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class DemoCodeComponent implements AfterViewInit, OnDestroy {
    @ViewChild('source', {read: ElementRef})
    sourceBox: ElementRef;
    @ViewChild('tree')
    tree: JigsawTreeExt;

    editor: any;
    removeHashChangeHandler: any;
    fileTree: SimpleTreeData = new SimpleTreeData();
    setting: ZTreeSettings = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        },
        edit: {
            enable: false
        },
        callback: {
            onClick: (event, treeId, treeNode) => {
                if (!treeNode.source || !this.editor) {
                    return;
                }
                this.editorOpen(treeNode.source);
            }
        }
    };

    constructor(renderer: Renderer2) {
        this.removeHashChangeHandler = renderer.listen("window", 'hashchange', () => {
            console.log('updating jigsaw demo code ...');
            project = getDemoCode();
            this.initProject();
        });
    }

    goBack() {
        if (window.opener) {
            return window.open('', window.opener.name);
        } else {
            // 原窗口被关闭了
            return window.open(location.href.replace(/\/demo-code/, ''), 'jigsaw-demo-main');
        }
    }

    initProject() {
        if (!project) {
            JigsawErrorAlert.show('数据无效！请点击Demo页面上的查看源码链接跳转过来才可以正常阅读源码。即将跳转到对应的demo页面。',
                () => {
                    location.href = location.href.replace(/\/demo-code/, '');
                    // 背景色被修改了，刷新一下重置
                    location.reload();
                });
            return;
        }
        this.createNodes(project.files);
        this.editorOpen(defaultOpen);
    }

    editorOpen(file: string): void {
        if (!this.editor || !project.files.hasOwnProperty(file)) {
            return;
        }
        this.editor.doc.setValue(project.files[file]);
        const match = file.match(/.+\.(\w+)$/);
        const language = match ? match[1].toLowerCase() : '';
        this.editor.setOption("mode", this.toMode(language));
    }

    toMode(language: string): string {
        switch (language) {
            case 'ts':
                return 'text/typescript';
            case 'js':
                return 'javascript';
            case 'css':
                return 'css';
            case 'scss':
                return 'sass';
            case 'html':
            case 'htm':
            case '':
            default:
                return 'xml';
        }
    }

    ngOnDestroy(): void {
        if (this.removeHashChangeHandler) {
            this.removeHashChangeHandler();
            this.removeHashChangeHandler = null;
        }
    }

    ngAfterViewInit(): void {
        this.editor = CodeMirror(this.sourceBox.nativeElement, {
            value: `loading ...`,
            mode: "xml"
        });
        this.editor.setOption("theme", 'mbo');
        this.editor.setOption("lineNumbers", true);
        this.editor.setOption("styleActiveLine", true);
        this.editor.setOption("matchBrackets", true);
        this.editor.setOption("readOnly", true);

        this.initProject();
    }

    createNodes(files: { [path: string]: string }): void {
        this.fileTree.nodes = [];
        for (let path in files) {
            let parent = this.fileTree.nodes;
            path.split(/\//).forEach((file, idx, arr) => {
                let child: SimpleNode = parent.find(node => node.label == file);
                if (!child) {
                    child = {
                        label: file, nodes: [], open: true,
                        source: idx == arr.length - 1 ? arr.join('/') : null
                    };
                    parent.push(child);
                }
                parent = child.nodes;
            });
        }
        this.fileTree.refresh();
        setTimeout(() => {
            this.tree.selectNodes('label', 'demo.component.html', null);
            this.editor.refresh();
        }, 100)
    }

    gotoStackblitz() {
        const platform = location.href.match(/\/mobile\/.+?\/.+?/) ? 'mobile' : 'pc';
        if (platform == 'mobile') {
            alert('暂未支持移动端的Demo代码演示。');
            return;
        }

        sdk.openProject(project, {openFile: defaultOpen});
    }
}
