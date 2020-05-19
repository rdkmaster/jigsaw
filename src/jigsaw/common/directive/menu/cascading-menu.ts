import {
    Directive,
    EventEmitter,
    Input,
    OnInit,
    Output,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    ElementRef,
    Type,
    TemplateRef
} from "@angular/core";
import {SimpleNode, SimpleTreeData} from "../../core/data/tree-data";
import {IPopupable, PopupOptions, PopupService} from "../../service/popup.service";
import {DropDownTrigger, JigsawFloatBase} from "../float/float";
import {JigsawMenu} from "../../../pc-components/menu/menu";

@Directive({
    selector: '[jigsaw-cascading-menu],[j-cascading-menu],[jigsawCascadingMenu]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)':"_$onHostClick()"
    }
})
export class JigsawCascadingMenu extends JigsawFloatBase implements OnInit, AfterViewInit, OnDestroy {

    private _jigsawCascadingMenuData: SimpleTreeData;
    private _jigsawCascadingMenuWidth: string | number;
    private _jigsawCascadingMenuHeight: string | number;
    private _jigsawCascadingMenuMaxHeight: string | number;
    private _jigsawFloatOptions: PopupOptions;
    private _jigsawCascadingMenuBackgroundColor: string;
    private _jigsawCascadingMenuSelectedColor: string;
    private _jigsawCascadingMenuShowBorder: boolean;

    @Input('jigsawCascadingMenuOptions')
    get jigsawFloatOptions(): PopupOptions {
        return this._jigsawFloatOptions;
    }

    set jigsawFloatOptions(value: PopupOptions) {
        if (this._jigsawFloatOptions != value) {
            this._jigsawFloatOptions = value;
            this.jigsawFloatInitData.options = value;
        }
    }

    @Input()
    get jigsawCascadingMenuData(): SimpleTreeData {
        return this._jigsawCascadingMenuData;
    }

    set jigsawCascadingMenuData(value: SimpleTreeData) {
        if (this._jigsawCascadingMenuData != value) {
            this._jigsawCascadingMenuData = value;
            this.jigsawFloatInitData.data = value;
        }
    }


    @Input()
    get jigsawCascadingMenuWidth(): string | number {
        return this._jigsawCascadingMenuWidth;
    }

    set jigsawCascadingMenuWidth(value: string | number) {
        if (this._jigsawCascadingMenuWidth != value) {
            this._jigsawCascadingMenuWidth = value;
            this.jigsawFloatInitData.width = value;
        }
    }

    @Input()
    get jigsawCascadingMenuHeight(): string | number {
        return this._jigsawCascadingMenuHeight;
    }

    set jigsawCascadingMenuHeight(value: string | number) {
        if (this._jigsawCascadingMenuHeight != value) {
            this._jigsawCascadingMenuHeight = value;
            this.jigsawFloatInitData.height = value;
        }
    }

    @Input()
    get jigsawCascadingMenuMaxHeight(): string | number {
        return this._jigsawCascadingMenuMaxHeight;
    }

    set jigsawCascadingMenuMaxHeight(value: string | number) {
        if (this._jigsawCascadingMenuMaxHeight != value) {
            this._jigsawCascadingMenuMaxHeight = value;
            this.jigsawFloatInitData.maxHeight = value;
        }
    }

    @Input()
    get jigsawCascadingMenuBackgroundColor(): string {
        return this._jigsawCascadingMenuBackgroundColor;
    }

    set jigsawCascadingMenuBackgroundColor(value: string) {
        if (this._jigsawCascadingMenuBackgroundColor != value) {
            this._jigsawCascadingMenuBackgroundColor = value;
            this.jigsawFloatInitData.backgroundColor = value;
        }
    }

    @Input()
    get jigsawCascadingMenuSelectedColor(): string {
        return this._jigsawCascadingMenuSelectedColor;
    }

    set jigsawCascadingMenuSelectedColor(value: string) {
        if (this._jigsawCascadingMenuSelectedColor != value) {
            this._jigsawCascadingMenuSelectedColor = value;
            this.jigsawFloatInitData.selectedColor = value;
        }
    }
    @Input()
    get jigsawCascadingMenuShowBorder(): boolean {
        return this._jigsawCascadingMenuShowBorder;
    }

    set jigsawCascadingMenuShowBorder(value: boolean) {
        if (this._jigsawCascadingMenuShowBorder != value) {
            this._jigsawCascadingMenuShowBorder = value;
            this.jigsawFloatInitData.showBorder = value;
        }
    }

    @Output()
    public jigsawCascadingMenuSelect = new EventEmitter<SimpleNode>();

    @Output('jigsawCascadingMenuOpenChange')
    public jigsawFloatOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * @internal
     */
    public jigsawFloatCloseTrigger: 'click' | 'mouseleave' | 'none' | DropDownTrigger = "mouseleave";
    /**
     * @internal
     */
    public jigsawFloatOpenTrigger: 'click' | 'mouseenter' | 'none' | DropDownTrigger = 'click';
    /**
     * @internal
     */
    public jigsawFloatInitData: any = {};

    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService) {
        super(_renderer, _elementRef, _popupService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.jigsawFloatTarget = JigsawMenu as any;
        this.jigsawFloatInitData.initDataSelect = this.jigsawCascadingMenuSelect;
    }

    private _removeClickHandler: any;

    ngAfterViewInit() {
        if (!this._removeClickHandler) {
            this._removeClickHandler = this.jigsawCascadingMenuSelect.subscribe((node:SimpleNode) => {
                if (!node.nodes || node.nodes.length == 0) {
                    const popups = this._popupService.popups;
                    this._closeAll(popups);
                }
            })
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeClickHandler) {
            this._removeClickHandler.unsubscribe();
            this._removeClickHandler = null;
        }
    }
}
