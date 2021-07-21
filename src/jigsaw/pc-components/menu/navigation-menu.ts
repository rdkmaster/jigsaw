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
import {AbstractJigsawComponent} from "../../common/common";
import {collapseMotion} from "../../common/components/animations/collapse";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

@Component({
    selector: 'jigsaw-navigation-menu, j-navigation-menu',
    templateUrl: 'navigation-menu.html',
    host: {
        '[class.jigsaw-nav-menu]': 'true',
        '[class.jigsaw-nav-menu-light]': 'theme == "light"',
        '[class.jigsaw-nav-menu-dark]': 'theme == "dark"',
        '[class.jigsaw-nav-menu-default]': 'theme == "default"',
        '[style.height]': 'height',
        '[style.width]': 'showToggleButton && collapsed ? null : width'
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

    /**
     * @internal
     */
    public _$menuSelect(menuItem: any): void {
        if (menuItem.nodes && menuItem.nodes.length > 0) {
            // 有子菜单，只展开
            menuItem.isActive = !menuItem.isActive;
            return;
        }
        if (menuItem.selected) {
            // 已选中，直接返回
            return;
        }
        // 没有子菜单，选中当前点击项，发出事件
        this.data.nodes.forEach(menu => {
            if (menu.selected) {
                menu.selected = false;
                menu.nodes.forEach(item => item.selected = false);
            }
        });
        menuItem.selected = !menuItem.selected;
        this.select.emit(menuItem);
    }

    /**
     * @internal
     */
    public _$subMenuSelect(menu: SimpleNode): void {
        if (menu.selected) {
            // 已选中，直接返回
            return;
        }
        menu.selected = !menu.selected;
        this.select.emit(menu);
        this.data.nodes.forEach(node => {
            let currentIndex = -1;
            node.nodes.forEach((item, index) => {
                if (item.label == menu.label) {
                    currentIndex = index;
                } else {
                    item.selected = false;
                }
            });
            if (currentIndex != -1) {
                // 当前点击菜单的上一级菜单
                node.selected = menu.selected;
            }
            if (currentIndex == -1 && node.selected) {
                // 其它菜单，置为非选择状态
                node.selected = false;
                node.nodes.forEach(item => item.selected = false);
            }
        })
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public theme: "light" | "dark" | "default" = "default";

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
}
