import {Component, ViewEncapsulation} from '@angular/core';
import {LayoutData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class customSceneLayoutDemoComponent {
    data: LayoutData;
    data2: LayoutData;
    data3: LayoutData;

    constructor() {
        this.data = new LayoutData();
        this.data.fromObject([
            {
                direction: 'v',
                nodes: [
                    {
                        nodes: [
                            {},
                            {
                                direction: 'v',
                                nodes: [
                                    {},
                                    {},
                                ]
                            }
                        ]
                    },
                    {
                        grow: 2,
                        nodes: [
                            {},
                            {},
                            {},
                        ]
                    }
                ]
            },
            {
                grow: '3'
            },
        ]);
        this.data2 = new LayoutData();
        this.data3 = new LayoutData();
    }

    sceneData = [
        {id: 1, label: "场景一",},
        {id: 2, label: "场景二",}
    ];
    selectedScene = this.sceneData[0];

    changeData(scene) {
        if (scene.id == 1) {
            this.data.direction = 'h';
            this.data.fromObject([
                {
                    direction: 'v',
                    nodes: [
                        {
                            nodes: [
                                {},
                                {
                                    direction: 'v',
                                    nodes: [
                                        {},
                                        {},
                                    ]
                                }
                            ]
                        },
                        {
                            grow: 2,
                            nodes: [
                                {},
                                {},
                                {},
                            ]
                        }
                    ]
                },
                {
                    grow: '3'
                },
            ]);
        } else if (scene.id = 2) {
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
        console.log(this.data);
    }

    consoleData() {
        console.log(this.data2);
    }

    parseData(data) {
        console.log(data);
        console.log(data.toString());
        this.data3 = LayoutData.toData(data.toString());
        console.log(this.data3);
    }
}
