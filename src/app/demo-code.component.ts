import {Component, ViewEncapsulation} from "@angular/core";
import {SimpleTreeData} from "../jigsaw/common/core/data/tree-data";
import {ZTreeSettingSetting} from "../jigsaw/pc-components/tree/ztree-types";

let project;
if (window.hasOwnProperty('getJigsawDemoCode')) {
    project = (<any>window).getJigsawDemoCode();
}

@Component({
    template: `
        <div class="container">
            <div class="tool-bar">header</div>
            <div class="source-content">
                <j-box [resizable]="true" height="100%">
                    <j-box class="box-content">
                        <jigsaw-tree-ext [data]="fileTree" [setting]="setting">
                        </jigsaw-tree-ext>
                    </j-box>
                    <j-box grow="3" class="box-content">
                    </j-box>
                </j-box>
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
        }

        .ztree li a {
            color: #fff;
        }

        .jigsaw-box-resize-line:hover {
            border-color: #aaa;
        }

        .jigsaw-box-resize-line {
            border-color: #666;
        }

        .source-content {
            height: 100%;
            background-color: #303030;
        }

        .box-content {
            /*这边的样式用来给resize line留位置，让resize line看上去像是在两个box中间*/
            height: 100%;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class DemoCodeComponent {
    fileTree: SimpleTreeData;
    setting: ZTreeSettingSetting = {
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
                console.log('custom setting event onclick: click "' + treeNode.label + '" and high light it')
            }
        }
    };

    constructor() {
        this.fileTree = new SimpleTreeData();
        this.fileTree.fromXML(`
            <node>
                <node label="item1"></node>
                <node label="item1"></node>
                <node label="item1">
                
                <node label="item1"></node>
                    <node label="item1"></node>
                    <node label="item1"></node>
                    <node label="item1"></node>
                    <node label="item1"></node>
                </node>
                <node label="item1"></node>
                <node label="item1"></node>
            </node>
        `)
    }
}
