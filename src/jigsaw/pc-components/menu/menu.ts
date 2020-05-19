import {Component, Output, EventEmitter, Type, Input, ViewChild, ElementRef, Renderer2, AfterViewInit} from "@angular/core";
import {IPopupable, PopupOptions} from "../../common/service/popup.service";
import {SimpleNode, SimpleTreeData} from "../../common/core/data/tree-data";
import {AbstractJigsawComponent} from "../../common/common";

@Component({
    selector: 'jigsaw-menu, j-menu',
    template: `
        <j-list #menuList [width]="_$realWidth" [height]="_$realHeight" [maxHeight]="_$realMaxHeight"
                [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}">
            <j-list-option *ngFor="let node of _$realData?.nodes;index as index" [value]="node" jigsawFloat
                           [jigsawFloatTarget]="_$getTarget(node)"
                           [jigsawFloatPosition]="'rightTop'"
                           [jigsawFloatOptions]="_$realOptions"
                           [jigsawFloatInitData]="_$getSubMenuData(node)"
                           [disabled]="node.disabled"
                           (click)="
                                !node.disabled && select.emit(node);
                                !node.disabled && initData?.initDataSelect?.emit(node);
                                !node.disabled && initData?.select?.emit(node);"
                           (mouseleave)="_$mouseleave(index,node.disabled)">
                <span j-title *ngIf="!!node.label && _$realTheme != 'navigation'">
                    <i class="{{node.icon}}"></i>
                    {{node.label}}
                </span>
                <span *ngIf="!node.label && _$realTheme != 'navigation'"> —— </span>
                <div j-sub-title *ngIf="_$realTheme != 'navigation'">{{node.subTitle}}
                    <i class="{{node.subIcon}}"></i>
                    <i *ngIf="node.nodes && node.nodes.length>0" class="fa fa-angle-right"></i>
                </div>
                <div class="navigation-title" *ngIf="_$realTheme == 'navigation'">
                    {{node.label}}
                    <span *ngIf="!node.label"> —— </span>
                    <i *ngIf="node.nodes && node.nodes.length>0" class="fa fa-angle-right"
                       style="position: absolute;right: 10px;line-height: 40px"></i>
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

    public initData: any;

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
    public get _$realTheme(): 'light' | 'dark' | 'black' | 'navigation' {
        return this.initData && this.initData.theme ? this.initData.theme : this.theme;
    }

    /**
     * @internal
     */
    public _$getSubMenuData(node: any): any {
        const subMenuInitData: any = {};
        subMenuInitData.data = node;
        subMenuInitData.width = this._$realWidth;
        subMenuInitData.height = this._$realHeight;
        subMenuInitData.maxHeight = this._$realMaxHeight;
        subMenuInitData.options = this._$realOptions;
        subMenuInitData.showBorder = this._$realShowBorder;
        subMenuInitData.theme = this._$realTheme;
        if (this.initData) {
            if (this.initData.initDataSelect) {
                subMenuInitData.initDataSelect = this.initData.initDataSelect;
            } else {
                subMenuInitData.initDataSelect = this.initData.select;
            }
        }
        subMenuInitData.select = this.select;
        return subMenuInitData;
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
    public theme: 'light' | 'dark' | 'black' | 'navigation' = 'light';

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

    /**
     * @internal
     */
    public _$getTarget(item: SimpleNode): Type<JigsawMenu> {
        return item.nodes && item.nodes.length > 0 && !item.disabled ? JigsawMenu : null;
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
}
