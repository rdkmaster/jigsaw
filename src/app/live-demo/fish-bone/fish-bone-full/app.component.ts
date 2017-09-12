import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class FishBoneFullComponent{
    data = [
        {
            label: '父节点1',
            nodes: [
                {
                    label: '父节点11',
                    nodes: [
                        {
                            label: '子节点111',
                            nodes: [
                                {
                                    label: 'end'
                                },
                                {
                                    label: 'end'
                                },
                                {
                                    label: 'end'
                                }
                            ]
                        },
                        {
                            label: '子节点112'
                        }
                    ]
                },
                {
                    label: '父节点12',
                    nodes: [
                        {
                            label: '子节点121'
                        }
                    ]
                }
            ]
        },
        {
            label: '父节点2',
            nodes: [
                {
                    label: '父节点21',
                    nodes: [
                        {
                            label: '子节点211',
                            nodes: [
                                {
                                    label: 'end'
                                },
                                {
                                    label: 'end'
                                },
                                {
                                    label: 'end'
                                }
                            ]
                        },
                        {
                            label: '子节点212'
                        }
                    ]
                },
                {
                    label: '父节点22',
                    nodes: [
                        {
                            label: '子节点221'
                        }
                    ]
                }
            ]
        }
    ]
}
