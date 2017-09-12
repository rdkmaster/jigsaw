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
                                    label: '子节点1111',
                                    nodes: [
                                        {
                                            label: "子节点11111",
                                            nodes: [
                                                {
                                                    label: 'end'
                                                }
                                            ]
                                        }
                                    ]
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

    data2= [
        {
            label: '单进程性能',
            nodes: [
                {
                    label: '并发能力与网口速率上限有关'
                },
                {
                    label: '模拟实际测试代码',
                    nodes: [
                        {
                            label: '单进程内存与并发的关系',
                            nodes: [
                                {
                                    label: '大约是16G/100并发基本呈线性增长'
                                }
                            ]
                        },
                        {
                            label: '单主机CPU极限',
                            nodes: [
                                {
                                    label: '约？并发'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '单进程空载极限',
                    nodes: [
                        {
                            label: '保守并发量约100万这是保守计算值'
                        }
                    ]

                }
            ]
        },
        {
            label: 'FDFDFDF',
            nodes: [
                {
                    label: '飞飞狒狒飞飞狒狒',
                    nodes: [
                        {
                            label: 'ddddddddddddddddd',
                            nodes: [
                                {
                                    label: 'dddddddddddddd'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
