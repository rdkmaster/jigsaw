import {Component} from '@angular/core';
import {LayoutData} from "jigsaw/core/data/layout-data";

@Component({
    templateUrl: './demo.component.html',
})
export class EditableAndBlockedDemoComponent {
    data: LayoutData;
    editable: boolean = true;
    blocked: boolean = true;

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
}
