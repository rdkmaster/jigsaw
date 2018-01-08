import {Component, ViewEncapsulation} from '@angular/core';
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class customSceneLayoutDemoComponent {
    data: TreeData;

    constructor() {
        this.data = new TreeData();
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
        console.log(this.data);
    }

    sceneData = [
        {id: 1, label: "场景一",},
        {id: 2, label: "场景二",}
    ];
    selectedScene = this.sceneData[0];

    changeData(scene) {
        if (scene.id == 1) {
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
        }
    }
}
