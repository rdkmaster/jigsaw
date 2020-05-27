import {
    Component,
    Output,
    EventEmitter,
    Input,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit,
    ChangeDetectorRef
} from "@angular/core";
import {IPopupable, PopupOptions, PopupService, PopupInfo, PopupPositionType} from "../../common/service/popup.service";
import {SimpleNode, SimpleTreeData} from "../../common/core/data/tree-data";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonUtils} from '../../common/core/utils/common-utils';
import {JigsawList, JigsawListOption} from "../list-and-tile/list";

export type MenuTheme = 'light' | 'dark' | 'black' | 'navigation';

export class MenuOptions {
    data?: SimpleTreeData;
    width?: string | number;
    height?: string | number;
    theme?: MenuTheme;
    options?: PopupOptions;
    showBorder?: boolean;
    select?: EventEmitter<SimpleNode>;
}

/**
 * @internal
 */
export const cascadingMenuFlag = class CascadingMenuFlag {
};

/**
 * @internal
 */
export function closeAllContextMenu(popups: PopupInfo[]): void {
    popups.filter(popup => popup.extra === cascadingMenuFlag)
        .forEach(popup => popup.dispose());
}

/**
 * @internal
 */
@Component({
    template: `
        <div style="width:0px; height:0px;" jigsawCascadingMenu
             [jigsawCascadingMenuOptions]="initData?.options"
             [jigsawCascadingMenuWidth]="initData?.width"
             [jigsawCascadingMenuHeight]="initData?.height"
             [jigsawCascadingMenuShowBorder]="initData?.showBorder"
             [jigsawCascadingMenuData]="initData?.data"
             [jigsawCascadingMenuTheme]="initData?.theme"
             [jigsawCascadingMenuPosition]="'bottomLeft'"
             [jigsawCascadingMenuOpen]="true"
             [jigsawCascadingMenuOpenTrigger]="'none'"
             [jigsawCascadingMenuCloseTrigger]="'click'"
             (jigsawCascadingMenuSelect)="onSelect($event)"
             (jigsawCascadingMenuClose)="close.emit()">
        </div>
    `
})
export class JigsawMenuHelper implements IPopupable {
    public answer: EventEmitter<any> = new EventEmitter<any>();
    public initData: MenuOptions;
    public close = new EventEmitter<void>();

    public onSelect(node: SimpleNode): void {
        if (this.initData && this.initData.select) {
            this.initData.select.emit(node);
        }
    }
}

@Component({
    selector: 'jigsaw-menu, j-menu',
    template: `
        <j-list #menuList [width]="_$realWidth" [height]="_$realHeight"
                [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20,suppressScrollX: true}">
            <j-list-option *ngFor="let node of _$realData?.nodes; index as index" [value]="node"
                           jigsawCascadingMenu
                           [jigsawCascadingMenuOptions]="_$realOptions"
                           [jigsawCascadingMenuWidth]="_$realWidth"
                           [jigsawCascadingMenuHeight]="_$realHeight"
                           [jigsawCascadingMenuShowBorder]="_$realShowBorder"
                           [jigsawCascadingMenuData]="node"
                           [jigsawCascadingMenuTheme]="_$realTheme"
                           [jigsawCascadingMenuPosition]="'rightTop'"
                           [jigsawCascadingMenuOpenTrigger]="'mouseenter'"
                           [jigsawCascadingMenuInitData]="{select:_$realSelect}"
                           [disabled]="node.disabled"
                           (click)="
                                !node.disabled && !!node.label && select.emit(node);
                                !node.disabled && !!node.label && initData?.select?.emit(node);
                            "
                           (mouseenter)="_$mouseenter(index, node)"
                           (mouseleave)="_$mouseleave(index)"
                           [style.minHeight]="_$getMinHeight(node.label)">
                <div class="menu-list-title" *ngIf="!!node.label && _$realTheme != 'navigation'"
                     [title]="_$getTitle(node.label,index,'menu-list-title')"
                     [ngStyle]="_$getTitleWidth(node)">
                    <i class="{{node.icon}}"></i>
                    {{node.label}}
                </div>
                <hr *ngIf="!node.label && _$realTheme != 'navigation'">
                <div class="menu-list-sub-title" *ngIf="_$realTheme != 'navigation'"
                     [title]="_$getTitle(node.subTitle,index,'menu-list-sub-title')"
                     [ngStyle]="_$getSubTitleWidth(node, index)">
                    {{node.subTitle}}
                    <i class="{{node.subIcon}}"></i>
                    <i *ngIf="node.nodes && node.nodes.length>0" class="fa fa-angle-right"></i>
                </div>
                <div class="navigation-title" *ngIf="_$realTheme == 'navigation'">
                    {{node.label}}
                    <i *ngIf="node.nodes && node.nodes.length>0 && !!node.label " class="fa fa-angle-right"
                       style="position: absolute;right: 10px;line-height: 40px"></i>
                    <hr *ngIf="!node.label">
                </div>
            </j-list-option>
        </j-list>`,
    host: {
        '(click)': "_$onClick($event)",
        '[class.jigsaw-menu-dark]': "_$realTheme == 'dark'",
        '[class.jigsaw-menu-light]': "_$realTheme == 'light'",
        '[class.jigsaw-menu-black]': "_$realTheme == 'black'",
        '[class.jigsaw-menu-navigation]': "_$realTheme == 'navigation'",
    },
})
export class JigsawMenu extends AbstractJigsawComponent implements IPopupable, AfterViewInit {

    public initData: MenuOptions;

    /**
     * @internal
     */
    public get _$realData(): SimpleTreeData {
        return this.initData && this.initData.data ? this.initData.data : this.data;
    }

    /**
     * @internal
     */
    public get _$realOptions(): PopupOptions {
        return this.initData && this.initData.options ? this.initData.options : this.options;
    }

    /**
     * @internal
     */
    public get _$realWidth(): number | string {
        return this.initData && this.initData.width ? this.initData.width : this.width;
    }

    /**
     * @internal
     */
    public get _$realHeight(): number | string {
        return this.initData && this.initData.height ? this.initData.height : this.height;
    }

    /**
     * @internal
     */
    public get _$realShowBorder(): boolean {
        return this.initData && this.initData.hasOwnProperty('showBorder') ? this.initData.showBorder : this.showBorder;
    }

    /**
     * @internal
     */
    public get _$realTheme(): MenuTheme {
        return this.initData && this.initData.theme ? this.initData.theme : this.theme;
    }

    /**
     * @internal
     */
    public get _$realSelect(): any {
        if (this.initData && this.initData.select) {
            return this.initData.select;
        } else {
            return this.select;
        }
    }

    @Input()
    public data: SimpleTreeData;

    @Input()
    public options: PopupOptions;

    @Input()
    public backgroundColor: string;

    @Input()
    public selectedColor: string;

    @Input()
    public showBorder: boolean = true;

    @Input()
    public theme: MenuTheme = 'light';

    /**
     * @internal
     */
    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public select: EventEmitter<SimpleNode> = new EventEmitter<SimpleNode>();

    @ViewChild('menuList', {read: ElementRef, static: false})
    private _menuListElement: ElementRef;

    @ViewChild('menuList', {static: false})
    private _menuListInstance: JigsawList;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public _$onClick(event: any) {
        event.stopPropagation();
        event.preventDefault();
    }

    ngAfterViewInit() {
        this._setBorder();
        this._changeDetectorRef.detectChanges();
    }

    private _setBorder() {
        if (!this._$realShowBorder) {
            this._menuListElement.nativeElement.style.border = 'none';
        }
    }

    private _resetListItems(): JigsawListOption[] {
        const listItems = this._menuListInstance._items.toArray();
        listItems.forEach(listItem => {
            listItem.selected = false;
        });
        return listItems;
    }

    /**
     * @internal
     */
    public _$mouseenter(index: number, node: SimpleNode) {
        const listItems = this._resetListItems();
        if (!node.label || node.disabled) {
            return;
        }
        listItems[index].selected = true;
    }

    /**
     * @internal
     */
    public _$mouseleave(index: number) {
        const popups = PopupService.instance.popups;
        const realIndex = popups.findIndex(pop => pop.element == this._elementRef.nativeElement);
        const popupInfo = popups[realIndex + 1];
        if (!popupInfo || popupInfo.extra !== cascadingMenuFlag) {
            const listItems = this._menuListInstance._items.toArray();
            listItems[index].selected = false;
        }
    }

    /**
     * @internal
     */
    public _$getMinHeight(label: string): string {
        if (!label) {
            return "1px";
        } else {
            return "32px";
        }
    }

    /**
     * @internal
     */
    public _$getTitleWidth(node: SimpleNode): any {
        if (!node.nodes || node.nodes.length == 0) {
            return {maxWidth: '100%'};
        } else {
            // 5是给有子节点时，留下的箭头；2是给标题和箭头之间留点距离；一共为7px
            return {maxWidth: 'calc(100% - 7px)'};
        }
    }

    /**
     * @internal
     */
    public _$getSubTitleWidth(node: SimpleNode, index: number): any {
        if (!this._menuListElement || node.disabled || !node.label) {
            return {maxWidth: 'auto'};
        }
        const listOptionElements = this._menuListElement.nativeElement.children;
        const titleElement = listOptionElements[index].getElementsByClassName("menu-list-title")[0];
        const wrapElement = titleElement.parentElement;
        // 5是给有子节点时，留下的箭头；
        const minWidth = node.nodes && node.nodes.length > 0 ? 5 : 0;
        if (titleElement.offsetWidth < wrapElement.offsetWidth - minWidth - 2) {
            return {maxWidth: `${wrapElement.offsetWidth - titleElement.offsetWidth - 2}px`};
        } else {
            return {width: `${minWidth}px`};
        }
    }

    /**
     * @internal
     */
    public _$getTitle(label: string, index: number, titleClass: string): string {
        if (!this._menuListElement || !label) {
            return '';
        }
        const listOptionElements = this._menuListElement.nativeElement.children;
        const titleElement = listOptionElements[index].getElementsByClassName(titleClass)[0];
        return titleElement.scrollWidth > titleElement.offsetWidth ? label : '';
    }

    public static show(event: MouseEvent, options: MenuOptions | SimpleTreeData,
                       callback?: (node: SimpleNode) => void, context?: any): PopupInfo {
        if (!event) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        if (!options) {
            return;
        }

        closeAllContextMenu(PopupService.allPopups);

        const ctx = options instanceof SimpleTreeData ? {data: options} : options;
        if (!ctx.select) {
            ctx.select = new EventEmitter<SimpleNode>();
        }
        const selectSubscription = ctx.select.subscribe((node: SimpleNode) => {
            CommonUtils.safeInvokeCallback(context, callback, [node]);
        });
        const popOpt = {
            pos: {x: event.clientX, y: event.clientY}, posType: PopupPositionType.fixed
        };
        const info = PopupService.instance.popup(JigsawMenuHelper, popOpt, ctx);
        info.extra = cascadingMenuFlag;
        const closeSubscription = info.instance.close.subscribe(() => {
            selectSubscription.unsubscribe();
            closeSubscription.unsubscribe();
        });
        return info;
    }
}
