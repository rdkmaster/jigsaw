import {
    Directive,
    EventEmitter,
    Input,
    OnInit,
    Output,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    ElementRef
} from "@angular/core";
import {SimpleNode, SimpleTreeData} from "../../core/data/tree-data";
import {PopupOptions, PopupService} from "../../service/popup.service";
import {DropDownTrigger, JigsawFloatBase} from "../float/float";
import {JigsawMenu} from "../../../pc-components/menu/menu";

@Directive({
    selector: '[jigsaw-cascading-menu],[j-cascading-menu],[jigsawCascadingMenu]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)': "_$onHostClick()"
    }
})
export class JigsawCascadingMenu extends JigsawFloatBase implements OnInit, AfterViewInit, OnDestroy {

    private _jigsawCascadingMenuData: SimpleTreeData;
    private _jigsawCascadingMenuWidth: string | number;
    private _jigsawCascadingMenuHeight: string | number;
    private _jigsawCascadingMenuMaxHeight: string | number;
    private _jigsawFloatOptions: PopupOptions;
    private _jigsawCascadingMenuShowBorder: boolean;
    private _jigsawCascadingMenuTheme: 'light' | 'dark' | 'black' | 'navigation' = 'dark';

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
    get jigsawCascadingMenuShowBorder(): boolean {
        return this._jigsawCascadingMenuShowBorder;
    }

    set jigsawCascadingMenuShowBorder(value: boolean) {
        if (this._jigsawCascadingMenuShowBorder != value) {
            this._jigsawCascadingMenuShowBorder = value;
            this.jigsawFloatInitData.showBorder = value;
        }
    }

    @Input()
    get jigsawCascadingMenuTheme(): 'light' | 'dark' | 'black' | 'navigation' {
        return this._jigsawCascadingMenuTheme;
    }

    set jigsawCascadingMenuTheme(value: 'light' | 'dark' | 'black' | 'navigation') {
        if (this._jigsawCascadingMenuTheme != value) {
            this._jigsawCascadingMenuTheme = value;
            this.jigsawFloatInitData.theme = value;
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
        this.jigsawFloatInitData.theme = this.jigsawCascadingMenuTheme;
    }

    private _removeClickHandler: any;

    ngAfterViewInit() {
        if (!this._removeClickHandler) {
            this._removeClickHandler = this.jigsawCascadingMenuSelect.subscribe((node: SimpleNode) => {
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
