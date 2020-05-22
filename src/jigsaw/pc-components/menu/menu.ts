import {Component, Output, EventEmitter, Input, ViewChild, ElementRef, Renderer2, AfterViewInit} from "@angular/core";
import {IPopupable, PopupOptions, PopupService, PopupInfo, PopupPositionType} from "../../common/service/popup.service";
import {SimpleNode, SimpleTreeData} from "../../common/core/data/tree-data";
import {AbstractJigsawComponent} from "../../common/common";
import { CommonUtils } from '../../common/core/utils/common-utils';
// import { JigsawCascadingMenu } from 'jigsaw/common/directive/menu/cascading-menu';

export type MenuTheme = 'light' | 'dark' | 'black' | 'navigation';

export class MenuOptions {
    data?: SimpleTreeData;
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
    theme?: MenuTheme;
    options?: PopupOptions;
    showBorder?: boolean;
    select?: EventEmitter<SimpleNode>;
};

/**
 * @internal
 */
export const contextMenuFlag = class ContextMenuFlag {};
/**
 * @internal
 */
export function closeAllContextMenu(popups: PopupInfo[]): void {
    popups.filter(popup => popup.extra === contextMenuFlag)
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
             [jigsawCascadingMenuMaxHeight]="initData?.maxHeight"
             [jigsawCascadingMenuShowBorder]="initData?.showBorder"
             [jigsawCascadingMenuData]="initData?.data"
             [jigsawCascadingMenuTheme]="initData?.theme"
             [jigsawCascadingMenuPosition]="'bottomLeft'"
             [jigsawCascadingMenuOpen]="true"
             [jigsawCascadingMenuOpenTrigger]="'none'"
             [jigsawCascadingMenuCloseTrigger]="'click'"
             (jigsawCascadingMenuSelect)="onSelect($event)"
             (jigsawCascadingMenuOpenChange)="openChange($event)">
        </div>
    `
})
export class JigsawMenuHelper implements IPopupable {
    public answer: EventEmitter<any> = new EventEmitter<any>();
    public initData: MenuOptions;

    public onSelect(node: SimpleNode): void {
        if (this.initData && this.initData.select) {
            this.initData.select.emit(node);
        }
    }

    public openChange(open: boolean) {
        if (!open) {
            this.answer.emit();
        }
    }
}

@Component({
    selector: 'jigsaw-menu, j-menu',
    template: `
        <j-list #menuList [width]="_$realWidth" [height]="_$realHeight" [maxHeight]="_$realMaxHeight"
                [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}">
            <j-list-option *ngFor="let node of _$realData?.nodes;index as index" [value]="node"
                           jigsawCascadingMenu
                           [jigsawCascadingMenuOptions]="_$realOptions"
                           [jigsawCascadingMenuWidth]="_$realWidth"
                           [jigsawCascadingMenuHeight]="_$realHeight"
                           [jigsawCascadingMenuMaxHeight]="_$realMaxHeight"
                           [jigsawCascadingMenuShowBorder]="_$realShowBorder"
                           [jigsawCascadingMenuData]="node"
                           [jigsawCascadingMenuTheme]="_$realTheme"
                           [jigsawCascadingMenuPosition]="'rightTop'"
                           [jigsawCascadingMenuOpenTrigger]="'mouseenter'"
                           [jigsawCascadingMenuInitData]="{select:_$realSelect}"
                           [disabled]="node.disabled"
                           (click)="
                                !node.disabled && !!node.label && select.emit(node);
                                !node.disabled && !!node.label && initData?.select?.emit(node)"
                           (mouseleave)="_$mouseleave(index,node.disabled)">
                <span j-title *ngIf="!!node.label && _$realTheme != 'navigation'">
                    <i class="{{node.icon}}"></i>
                    {{node.label}}
                </span>
                <hr *ngIf="!node.label && _$realTheme != 'navigation'">
                <div j-sub-title *ngIf="_$realTheme != 'navigation'">{{node.subTitle}}
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
    public get _$realMaxHeight(): number | string {
        return this.initData && this.initData.maxHeight ? this.initData.maxHeight : this.maxHeight;
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
    private _menuList: ElementRef;

    constructor(private _renderer: Renderer2) {
        super();
    }

    ngAfterViewInit() {
        this._setBorder();
    }

    private _setBorder() {
        if (!this._$realShowBorder) {
            this._menuList.nativeElement.style.border = 'none';
        }
    }

    /**
     * @internal
     */
    public _$mouseleave(index: number, disabled: boolean) {
        const optionsElement = this._menuList.nativeElement.children[index];
        const classList = optionsElement.classList;
        if (!disabled && classList.contains('jigsaw-list-option-active')) {
            classList.remove('jigsaw-list-option-active');
        }
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
        info.extra = contextMenuFlag;
        const answerSubscription = info.answer.subscribe(() => {
            selectSubscription.unsubscribe();
            answerSubscription.unsubscribe();
        });
        return info;
    }
}
