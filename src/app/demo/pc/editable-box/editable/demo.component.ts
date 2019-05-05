import {Component} from '@angular/core';
import {LayoutData} from "jigsaw/common/core/data/layout-data";

@Component({
    templateUrl: './demo.component.html',
})
export class EditableDemoComponent {
    data: LayoutData;
    editable: boolean = true;

    constructor() {
        this.data = new LayoutData();
        this.data.fromObject([
            {
                grow: 2,
                direction: 'v',
                nodes: [
                    {},
                    {
                        nodes:[
                            {},
                            {}
                        ]
                    }
                ]
            },
            {},
        ]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了`j-editable-box`的是否可编辑的功能';
    description: string = '';
    tags: string[] = [
        'JigsawEditableBox.editable',
    ];
}
