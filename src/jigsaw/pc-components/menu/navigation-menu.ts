import {ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, Output, QueryList, ViewChildren} from "@angular/core";
import {SimpleNode, SimpleTreeData} from "../../common/core/data/tree-data";
import {AbstractJigsawComponent} from "../../common/common";
import {collapseMotion} from "../../common/components/animations/collapse";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {IPopupable, PopupOptions, PopupPositionValue} from "../../common/service/popup.service";
import {JigsawFloat} from "../../common/directive/float/float";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

enum MenuLevel {top, sub}

type PopupAnswer = {
    level: MenuLevel,
    menu: any
}

@Component({
    selector: 'jigsaw-navigation-menu, j-navigation-menu',
    templateUrl: 'navigation-menu.html',
    host: {
        '[class.jigsaw-nav-menu]': 'true',
        '[style.height]': 'height',
        '[style.width]': 'showToggleButton && collapsed ? null : width'
    },
    animations: [collapseMotion],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawNavigationMenu extends AbstractJigsawComponent {
    protected _width: string = '200px';

    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    private _data: SimpleTreeData;

    @ViewChildren(JigsawFloat)
    private _floatMenus: QueryList<JigsawFloat>;

    /**
     * @internal
     */
    public _$popupMenuItem = PopupMenuItem;

    /**
     * @internal
     */
    public _$popupMenuOptions: PopupOptions = {
        posReviser: (pos: PopupPositionValue, popupElement: HTMLElement) => {
            pos.top -= 40;
            return pos;
        },
        useCustomizedBackground: true,
        showShadow: false,
        showBorder: false
    };

    @Input()
    @RequireMarkForCheck()
    public get data(): SimpleTreeData {
        return this._data;
    }

    public set data(value: SimpleTreeData) {
        if (CommonUtils.isUndefined(value) || CommonUtils.isUndefined(value.nodes)) {
            return;
        }
        this._data = value;
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
     * @internal
     */
    public _$openPopupMenu(index: number): void {
        if (!this.showToggleButton || !this.collapsed || !this._floatMenus || this._floatMenus.length == 0) {
            return;
        }
        this._floatMenus.toArray()[index].openFloat();
    }

    /**
     * @internal
     */
    public _$popupAnswerHandler(event: PopupAnswer): void {
        if (!event) {
            return;
        }
        if (event.level == MenuLevel.top) {
            this._$menuSelect(event.menu);
        }
        if (event.level == MenuLevel.sub) {
            this._$subMenuSelect(event.menu);
        }
    }
}

/**
 * @internal
 */
@Component({
    templateUrl: 'popup-menu-item.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupMenuItem implements IPopupable {
    initData: any;

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    /**
     * @internal
     */
    public _$menuSelect(): void {
        this.answer.emit({level: MenuLevel.top, menu: this.initData});
    }

    /**
     * @internal
     */
    public _$subMenuSelect(subMenu: any): void {
        this.answer.emit({level: MenuLevel.sub, menu: subMenu});
    }
}
