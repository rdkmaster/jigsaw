import {Component} from '@angular/core';
import {LayoutData} from "jigsaw/common/core/data/layout-data";

@Component({
    templateUrl: './demo.component.html',
})
export class SetResizeLineWidthDemoComponent {
    data: LayoutData;
    resizeLineWidth: number;

    constructor() {
        this.data = new LayoutData();
        this.data.direction = 'v';
        this.data.fromObject([
            {},
            {
                grow: 2,
                nodes: [
                    {},
                    {
                        grow: 2
                    }
                ]
            },
            {},
        ]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawEditableBox.resizeLineWidth',
    ];
}
