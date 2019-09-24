import {
    ChangeDetectorRef,
    Component,
    ContentChildren, EventEmitter,
    forwardRef,
    Host,
    Inject,
    Input,
    Output,
    NgModule,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from "../../common/common";
import {collapseMotion} from "../../common/components/animations/collapse";

/**
 * 组件模式.
 */
export enum CollapseMode {
    default, accordion
}

@Component({
    selector: 'jigsaw-collapse-pane, j-collapse-pane',
    templateUrl: './collapse-pane.html',
    animations: [collapseMotion]
})
export class JigsawCollapsePane extends AbstractJigsawComponent {

    private _isActive: boolean = false;

    @Input()
    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(value: boolean) {
        if (this._isActive != value) {
            this.callLater(() => {
                this._isActive = value;
                this.isActiveChange.emit(value);
            });
            this._updateCollapsePaneStatus();
            this._changeDetector.detectChanges();
        }
    }

    @Output()
    public isActiveChange = new EventEmitter<boolean>();

    constructor(@Host() @Inject(forwardRef(() => JigsawCollapse)) private _collapse,
                private _changeDetector: ChangeDetectorRef) {
        super();
    }

    @Input('header')
    public title: string;

    /**
     * @internal
     */
    public _$onClick() {
        this.isActive = !this.isActive;
    }

    private _updateCollapsePaneStatus() {
        // 手风琴, 自动关闭其他的pane;
        if (this._collapse && this._collapse.panes) {
            this._collapse._selectedIndex = this._collapse.panes.toArray().indexOf(this);
            if (this._collapse.mode === "accordion" || this._collapse.mode === CollapseMode.accordion) {
                this._collapse.panes.forEach(item => {
                    if (item !== this && item.isActive) {
                        item.isActive = false;
                    }
                })
            }
        }
    }
}

/**
 * @description 折叠容器组件.
 *
 * 何时使用
 * 对复杂区域进行分组和隐藏，保持页面的整洁。
 * 手风琴 是一种特殊的折叠面板，只允许单个内容区域展开。
 */
@Component({
    selector: 'jigsaw-collapse, j-collapse',
    templateUrl: 'collapse.html',
    host: {
        '[style.width]': 'width',
        '[class.jigsaw-collapse-host]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class JigsawCollapse extends AbstractJigsawComponent {

    @ContentChildren(JigsawCollapsePane) panes: QueryList<JigsawCollapsePane>;

    /**
     * 组件模式(默认值 "default",可同时展开多个面板; 手风琴, 只可展开一个活动的面板;)
     */
    @Input()
    public mode: string | CollapseMode = 'default';  // accordion

    /**
     * @internal
     */
    public _selectedIndex: number = 0;

}

/**
 * 折叠面板组件模块. (使用时直接引入模块就好.)
 */
@NgModule({
    imports: [CommonModule],
    declarations: [JigsawCollapse, JigsawCollapsePane],
    exports: [JigsawCollapse, JigsawCollapsePane]
})
export class JigsawCollapseModule {
}

