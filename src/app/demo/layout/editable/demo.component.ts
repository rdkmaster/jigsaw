import {Component} from '@angular/core';
import {LayoutData} from "jigsaw/core/data/layout-data";

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
}
