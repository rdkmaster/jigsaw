import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Injector,
    Input,
    OnDestroy,
    Output
} from "@angular/core";
import {SimpleNode, SimpleTreeData} from "../../common/core/data/tree-data";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {collapseMotion} from "../../common/components/animations/collapse";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

@WingsTheme('navigation-menu.scss')
@Component({
    selector: 'jigsaw-navigation-menu, j-navigation-menu',
    templateUrl: 'navigation-menu.html',
    host: {
        '[style.width]': 'showToggleButton && collapsed ? null : width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-nav-menu-host]': 'true',
        '[class.jigsaw-nav-menu-gray]': 'theme == "gray"',
        '[class.jigsaw-nav-menu-default]': 'theme == "default"',
        '[class.jigsaw-nav-menu-inline]': '!showToggleButton'
    },
    animations: [collapseMotion],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawNavigationMenu extends AbstractJigsawComponent implements OnDestroy {
    protected _width: string = '200px';

    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector, private _cdr: ChangeDetectorRef) {
        super();
    }

    private _data: SimpleTreeData;

    @Input()
    @RequireMarkForCheck()
    public get data(): SimpleTreeData {
        return this._data;
    }

    private _removeDataRefresh: CallbackRemoval;

    public set data(value: SimpleTreeData) {
        if (CommonUtils.isUndefined(value) || CommonUtils.isUndefined(value.nodes)) {
            return;
        }
        this._data = value;
        if (this._removeDataRefresh) {
            this._removeDataRefresh();
        }
        this._removeDataRefresh = value.onRefresh(() => this._cdr.markForCheck(), this);
    }

    /**
     * true：显示折叠按钮，用于导航菜单
     * false: 无折叠按钮，用于内嵌菜单
     */
    @Input()
    @RequireMarkForCheck()
    public showToggleButton: boolean = true;

    /**
     * 导航模式下，控制默认是否折叠起来
     */
    @Input()
    @RequireMarkForCheck()
    public collapsed: boolean = false;

    @Output()
    public collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public select: EventEmitter<SimpleNode> = new EventEmitter<SimpleNode>();

    public selectMenu(item: SimpleNode): boolean;
    public selectMenu(property1: string, value1: string | number,
                      property2?: string, value2?: string | number,
                      property3?: string, value3?: string | number): boolean;
    public selectMenu(...args): boolean {
        if (!this.data?.nodes?.length) {
            return false;
        }
        let lv1: SimpleNode, lv2: SimpleNode;
        [lv1, lv2] = this._getNodes(args);
        if (!lv1 && !lv2) {
            return false;
        }

        if (lv2) {
            if (lv2.disabled) {
                // 已禁用，直接返回
                return;
            }
            if (lv2.selected) {
                // 已选择，发送select
                this.select.emit(lv2);
                return;
            }
            this._resetMenuSelected();
            lv2.selected = true;
            lv1.isActive = true;
            this._cdr.markForCheck();
            this.select.emit(lv2);
            return;
        }

        if (lv1) {
            if (lv1.disabled) {
                // 已禁用，直接返回
                return;
            }
            if (lv1.nodes?.length) {
                // 有子菜单，只切换开闭状态
                lv1.isActive = !lv1.isActive;
                this._cdr.markForCheck();
                return;
            }
            if (lv1.selected) {
                // 已选中，发送select
                this.select.emit(lv1);
                return;
            }
            this._resetMenuSelected();
            lv1.selected = true;
            this.select.emit(lv1);
        }
    }

    private _getNodes(args: any[]): [SimpleNode, SimpleNode] {
        if (args[0] instanceof SimpleNode) {
            return this._findNode(args[0]);
        }
        const target: any = {}, trackItemBy = [];
        for (let i = 0; i < args.length; i += 2) {
            if (args[i]) {
                target[args[i]] = args[i + 1];
                trackItemBy.push(args[i]);
            }
        }
        return this._findNode(target, trackItemBy);

    }

    private _resetMenuSelected(): void {
        this.data?.nodes?.forEach(node => {
            if (!node.nodes?.length) {
                node.selected = false;
            }
            node.nodes?.forEach(n => n.selected = false);
        });
    }

    private _findNode(target: {[property: string]: string}, trackItemBy?: string[], parent?: SimpleNode): [SimpleNode, SimpleNode] {
        parent = parent || this.data;
        if (!parent.nodes) {
            return [null, null];
        }
        const node = parent.nodes.find(n => CommonUtils.compareWithKeyProperty(n, target, trackItemBy));
        if (node) {
            return parent == this.data ? [node, null] : [null, node];
        }
        for (let lv1 of parent.nodes) {
            const [, lv2] = this._findNode(target, trackItemBy, lv1);
            if (lv2) {
                return [lv1, lv2];
            }
        }
        return [null, null];
    }

    public toggleMenuDisabled(item: SimpleNode): void;
    public toggleMenuDisabled(property1: string, value1: string | number,
                      property2?: string, value2?: string | number,
                      property3?: string, value3?: string | number): void;
    public toggleMenuDisabled(...args): void {
        if (!this.data?.nodes?.length) {
            return;
        }
        let lv1: SimpleNode, lv2: SimpleNode;
        [lv1, lv2] = this._getNodes(args);
        if (lv2) {
            lv2.disabled = !lv2.disabled;
            lv2.selected = false;
            this._cdr.markForCheck();
            return;
        }
        if (lv1) {
            this._cdr.markForCheck();
            lv1.disabled = !lv1.disabled;
            if (lv1.isActive) {
                // 如果该菜单已经展开，则自动关闭
                lv1.isActive = false;
            }
        }
    }
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public theme: "light" | "dark" | "default" | "gray" = "default";

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeDataRefresh) {
            this._removeDataRefresh();
            this._removeDataRefresh = null;
        }
    }

    /**
     * @internal
     */
    public _$handleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }

    public update(): void {
        this._cdr.markForCheck();
    }
}
