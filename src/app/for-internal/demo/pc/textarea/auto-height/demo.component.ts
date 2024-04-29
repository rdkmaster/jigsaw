import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
})
export class TextareaAutoHeightComponent {

    value = `
{
    "acceptDroppedNode": false,
    "selector": "awade-layout",
    "agentId": "4b468c77-23d4-4287-9c1a-ee7c0a10b53c",
    "id": "root",
    "config": {
        "moduleType": "common",
        "routeParam": "",
        "version": "v10.9.24"
    },
    "children": [
        {
            "acceptDroppedNode": false,
            "inputs": [
                {
                    "property": "innerHTML",
                    "selectedType": "string",
                    "value": {
                        "initial": "按钮",
                        "remote": {
                            "mock": {
                                "enabled": false,
                                "script": "",
                                "type": "browser-redirect"
                            },
                            "useLoading": true
                        }
                    }
                }
            ],
            "selector": "jigsaw-button",
            "agentId": "e23c40f8-acc2-4623-a9b7-3add58f32c56",
            "id": "jigsawButton2",
            "layout": {
                "left": 13,
                "top": 18,
                "width": 10,
                "height": 4,
                "scaleDirection": "none",
                "align_items": "center"
            }
        }
    ]
}

    `;

    changeValue() {
        this.value = `
{
    "acceptDroppedNode": false,
    "selector": "awade-layout",
    "agentId": "4b468c77-23d4-4287-9c1a-ee7c0a10b53c",
    "id": "root",
    "config": {
        "moduleType": "common",
        "routeParam": "",
        "version": "v10.9.24"
    }
}

        `;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '支持有初始化数据时高度自适应；初始化后通过设置value改变文本时高度自适应；手写文本时高度自适应。';
    description: string = '';
}
