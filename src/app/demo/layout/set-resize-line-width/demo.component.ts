import {Component} from '@angular/core';
import {LayoutData} from "jigsaw/core/data/layout-data";

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
                grow: 4,
                nodes: [
                    {},
                    {
                        grow: 4
                    }
                ]
            },
            {},
        ]);
    }
}
