import {Component, Output, EventEmitter, Type, Input, ViewChild, ElementRef, Renderer2, AfterViewInit} from "@angular/core";
import {IPopupable, PopupOptions} from "../../service/popup.service";
import {SimpleNode, SimpleTreeData} from "../../core/data/tree-data";
import {AbstractJigsawComponent} from "../../common";
import * as convert from "color-convert";

@Component({
    selector: 'jigsaw-menu, j-menu',
    template: `
        <j-list #menuList [width]="_$realWidth" [height]="_$realHeight" [maxHeight]="_$realMaxHeight"
                [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}" [ngStyle]="{'background':_$realBackgroundColor}">
            <j-list-option *ngFor="let node of _$realData?.nodes;index as index" [value]="node" jigsawFloat
                           [jigsawFloatTarget]="_$getTarget(node)"
                           [jigsawFloatPosition]="'rightTop'"
                           [jigsawFloatOptions]="_$realOptions"
                           [jigsawFloatInitData]="_$subMenuData(node)"
                           [disabled]="node.disabled"
                           (click)="select.emit(node); initData.select?.emit(node)"
                           (mouseenter)="_$hover(index)">
                <span j-title>
                    <i class="{{node.titleIcon}}"></i>
                    {{node.label}}
                </span>
                <div j-sub-title>{{node.subTitle}}
                    <i class="{{node.subTitleIcon}}"></i>
                </div>
            </j-list-option>
        </j-list>`
})
export class JigsawMenuComponent extends AbstractJigsawComponent implements IPopupable, AfterViewInit {
    /**
     * @internal
     */
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
    public get _$realBackgroundColor(): string {
        return this.initData && this.initData.backgroundColor ? this.initData.backgroundColor : this.backgroundColor;
    }

    /**
     * @internal
     */
    public get _$realSelectColor(): string {
        return this.initData && this.initData.selectedColor ? this.initData.selectedColor : this.selectedColor;
    }

    /**
     * @internal
     */
    public _$subMenuData(node: any): any {
        const subMenuInitData: any = {};
        subMenuInitData.data = node;
        subMenuInitData.width = this._$realWidth;
        subMenuInitData.height = this._$realHeight;
        subMenuInitData.maxHeight = this._$realMaxHeight;
        subMenuInitData.options = this._$realOptions;
        subMenuInitData.backgroundColor = this._$realBackgroundColor;
        subMenuInitData.selectedColor = this._$realSelectColor;
        if (this.initData.select) {
            subMenuInitData.select = this.initData.select;
        }
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
        this._setFontColor(this._$realBackgroundColor);
    }

    /**
     * @internal
     */
    public _$getTarget(item): Type<JigsawMenuComponent> {
        if (item.nodes && item.nodes.length > 0 && !item.disabled) {
            return JigsawMenuComponent;
        } else {
            return null;
        }
    }

    private _setFontColor(backgroundColor: string): void {
        if (!backgroundColor) {
            return;
        }
        let rgb = [];
        const rgbMatch = backgroundColor.match(/^rgb\((\d+,\d+,\d+)\)$/i);
        const hexMatch = backgroundColor.match(/^#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/);
        const rgbaMatch = backgroundColor.match(/^rgba\((\d+,\d+,\d+),0?\.?[0-9]\d*\)$/i);
        if (rgbMatch) {
            rgb = rgbMatch[1].split(',');
        } else if (hexMatch) {
            rgb = convert.hex.rgb(backgroundColor);
        } else if (rgbaMatch) {
            rgb = rgbaMatch[1].split(',');
        } else {
            rgb = convert.keyword.rgb(backgroundColor);
        }

        if (rgb && rgb.length == 3) {
            // 根据rgb值计算阈值，大于等于192就是浅色
            const level = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
            const titleElements = this._menuList.nativeElement.getElementsByClassName('jigsaw-list-option-title');
            const subTitleElements = this._menuList.nativeElement.getElementsByClassName('jigsaw-list-option-sub-title');
            const titleElementsLength = titleElements.length;
            const subTitleElementsLength = subTitleElements.length;
            if (level < 192) {
                for (let i = 0; i < titleElementsLength; i++) {
                    this._renderer.setStyle(titleElements[i], 'color', "#fff");
                }
                for (let i = 0; i < subTitleElementsLength; i++) {
                    this._renderer.setStyle(subTitleElements[i], 'color', "#fff");
                }
            } else {
                for (let i = 0; i < titleElementsLength; i++) {
                    this._renderer.setStyle(titleElements[i], 'color', '#333');
                }
                for (let i = 0; i < subTitleElementsLength; i++) {
                    this._renderer.setStyle(subTitleElements[i], 'color', '#999');
                }
            }
        }
    }

    /**
     * @internal
     */
    public _$hover(index) {
        const length = this._menuList.nativeElement.children.length;
        for (let i = 0; i < length; i++) {
            if (i != index) {
                this._renderer.setStyle(this._menuList.nativeElement.children[i], "background", this._$realBackgroundColor)
            }
        }
        if (!!this._$realSelectColor) {
            this._renderer.setStyle(this._menuList.nativeElement.children[index], "background", this._$realSelectColor);
        }
    }
}
