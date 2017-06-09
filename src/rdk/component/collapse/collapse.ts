import {
    NgModule, Component, ViewEncapsulation, QueryList, Input, ContentChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RdkCollapsePane} from "./collapse-pane";
import {AbstractRDKComponent} from "../core";

/**
 * @description 折叠容器组件.
 *
 * 何时使用
 * 对复杂区域进行分组和隐藏，保持页面的整洁。
 * 手风琴 是一种特殊的折叠面板，只允许单个内容区域展开。
 */
@Component({
    selector: 'rdk-collapse',
    templateUrl: 'collapse.html',
    styleUrls: ['collapse.scss'],
    host: {
        '[style.width]': 'width',
        'class':'rdk-collapse-host'
    },
    encapsulation: ViewEncapsulation.None
})
export class RdkCollapse extends AbstractRDKComponent{

    @ContentChildren(RdkCollapsePane) panes: QueryList<RdkCollapsePane>;

    /**
     * 组件模式(默认值 "default",可同时展开多个面板; 手风琴, 只可展开一个活动的面板;)
     * @type {string| CollapseMode}
     */
    @Input()
    public mode: string| CollapseMode = 'default';  // accordion
}

/**
 * 组件模式.
 */
export enum CollapseMode {
    default, accordion
}

/**
 * 折叠面板组件模块. (使用时直接引入模块就好.)
 */
@NgModule({
    imports: [CommonModule],
    declarations: [RdkCollapse, RdkCollapsePane],
    exports: [RdkCollapse, RdkCollapsePane]
})
export class RdkCollapseModule { }
