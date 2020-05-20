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
import {PopupInfo, PopupOptions, PopupService} from "../../service/popup.service";
import {DropDownTrigger, JigsawFloatBase, FloatPosition} from "../float/float";
import {JigsawMenu, MenuTheme} from "../../../pc-components/menu/menu";

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
    private _jigsawCascadingMenuTheme: MenuTheme = 'dark';
    private _jigsawCascadingMenuPosition: FloatPosition = 'bottomLeft';

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
    get jigsawCascadingMenuTheme(): MenuTheme {
        return this._jigsawCascadingMenuTheme;
    }

    set jigsawCascadingMenuTheme(value: MenuTheme) {
        if (this._jigsawCascadingMenuTheme != value) {
            this._jigsawCascadingMenuTheme = value;
            this.jigsawFloatInitData.theme = value;
        }
    }

    @Input('jigsawCascadingMenuPosition')
    public get jigsawFloatPosition(): FloatPosition {
        return this._jigsawCascadingMenuPosition;
    };

    public set jigsawFloatPosition(value: FloatPosition) {
        if (this._jigsawCascadingMenuPosition != value) {
            this._jigsawCascadingMenuPosition = value;
            if (!this.jigsawFloatInitData) {
                this.jigsawFloatInitData = {};
            }
            this.jigsawFloatInitData.position = value;
        }
    };

    @Input('jigsawCascadingMenuOpenTrigger')
    public jigsawFloatOpenTrigger: 'click' | 'mouseenter' | 'none' | DropDownTrigger = 'click';

    @Input('jigsawCascadingMenuInitData')
    public jigsawFloatInitData: any;

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

    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService) {
        super(_renderer, _elementRef, _popupService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.jigsawFloatTarget = this.jigsawCascadingMenuData.nodes && this.jigsawCascadingMenuData.nodes.length > 0 ? JigsawMenu as any : null;
        this.jigsawFloatInitData.data = this.jigsawCascadingMenuData;
        this.jigsawFloatInitData.width = this.jigsawCascadingMenuWidth;
        this.jigsawFloatInitData.height = this.jigsawCascadingMenuHeight;
        this.jigsawFloatInitData.maxHeight = this.jigsawCascadingMenuMaxHeight;
        this.jigsawFloatInitData.options = this.jigsawFloatOptions;
        if (!this.jigsawFloatInitData.select) {
            this.jigsawFloatInitData.select = this.jigsawCascadingMenuSelect;
        } else {
            this.jigsawCascadingMenuSelect = this.jigsawFloatInitData.select;
        }
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
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeClickHandler) {
            this._removeClickHandler.unsubscribe();
            this._removeClickHandler = null;
        }
    }

    protected _closeJigsawFloat(event: MouseEvent, popups: PopupInfo[]) {
        // in-dom 状态下，第一级需要关闭
        if ((popups.length == 1 && this._elementRef.nativeElement.localName == 'j-list-option') || popups.some(popup => this._mouseInPopup(event, popup.element))) {
            this.jigsawFloatOpen = false;
        }
    }
}
