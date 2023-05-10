import {Component, ViewEncapsulation, NgZone, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JigsawThemeService, SimpleTreeData} from "jigsaw/public_api";
import { AsyncDescription } from '../../../template/demo-template/demo-template';

@Component({
    selector: 'fish-bone-basic',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FishBoneBasicComponent extends AsyncDescription {
    public demoPath = "demo/fish-bone/basic";


    data: SimpleTreeData;
    constructor(public http: HttpClient, public _zone: NgZone, el: ElementRef, private _themeService: JigsawThemeService) {
        super(http, el);
        this.data = new SimpleTreeData();
        this.data.label = '<span class="orange">目标标题</span>';
        this.data.fromObject([
            {
                label: '<span class="orange"><span class="iconfont iconfont-e221"></span>父节点1</span>',
                nodes: [
                    {
                        label: '<span class="iconfont iconfont-e67a"></span>父节点11',
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
                                                        label: '<span class="line">5,3,9,6,5,9,7,3,5,2</span>'
                                                    }
                                                ]
                                            },
                                            {
                                                label: 'end'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: '子节点112',
                                nodes: [
                                    {
                                        label: '<span class="bar-colours-1">5,3,9,6,5,9,7,3,5,2</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '父节点12'
                    }
                ]
            },
            {
                label: '<span class="orange"><span class="iconfont iconfont-e1ee"></span>父节点2</span>',
                nodes: [
                    {
                        label: '<span class="iconfont iconfont-e67a"></span>父节点21',
                        nodes: [
                            {
                                label: '子节点211',
                                nodes: [
                                    {
                                        label: '<span class="iconfont iconfont-e547"></span>end'
                                    },
                                    {
                                        label: '<span class="line">5,3,9,6,5,9,7,3,5,2</span>'
                                    },
                                    {
                                        label: `
                                                <div class="jigsaw-table-host" style="width: 300px;${this._themeService.majorStyle == 'dark' ? 'background: #0f111a' : ''}">
                                                <table>
                                                    <thead><tr><td>ID</td><td>name</td><td>gender</td><td>city</td></tr></thead>
                                                    <tbody>
                                                        <tr><td>1</td><td><a onclick="hello('tom')">tom</a></td><td>male</td><td>nj</td></tr>
                                                        <tr><td>2</td><td><a onclick="hello('jerry')">jerry</a></td><td>male</td><td>shz</td></tr>
                                                        <tr><td>3</td><td><a onclick="hello('marry')">marry</a></td><td>female</td><td>sh</td></tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                            `,
                                        // 这里需要特别注意，由于我们给了一段html片段并且包含了回调函数`hello()`，
                                        // 因此这里必须设置 `innerHtmlContext` 属性作为`hello()`函数的上下文
                                        // 如果html片段中不包含回调函数，则无需设置 `innerHtmlContext` 属性
                                        innerHtmlContext: this
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
            },
            {
                label: '<span class="orange"><span class="iconfont iconfont-e67a"></span>父节点3</span>',
                nodes: [
                    {
                        label: '父节点31',
                        nodes: [
                            {
                                label: '<span class="iconfont iconfont-e547"></span>end'
                            }
                        ]
                    }
                ]
            },
            {
                label: '<span class="orange">父节点4</span>',
                nodes: [
                    {
                        label: '<span class="bar-colours-1">5,3,9,6,5,9,7,3,5,2</span>'
                    },
                    {
                        label: 'end'
                    }
                ]
            },
            {
                label: '<span class="orange">父节点5</span>',
                nodes: [
                    {
                        label: '<span class="pie-colours-2">5,3,9,6,5</span>'
                    }
                ]
            }
        ]);
    }
}
