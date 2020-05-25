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
import {JigsawMenu, MenuTheme, cascadingMenuFlag, closeAllContextMenu} from "../../../pc-components/menu/menu";

@Directive({
    selector: '[jigsaw-cascading-menu],[j-cascading-menu],[jigsawCascadingMenu]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)': "_$onHostClick()"
    }
})
export class JigsawCascadingMenu extends JigsawFloatBase implements OnInit, AfterViewInit, OnDestroy {
    protected _floatOpenDelay = 300;
    protected _floatCloseDelay = 200;

    private _jigsawCascadingMenuData: SimpleTreeData;
    private _jigsawCascadingMenuWidth: string | number;
    private _jigsawCascadingMenuHeight: string | number;
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

    @Input('jigsawCascadingMenuCloseTrigger')
    public jigsawFloatCloseTrigger: 'click' | 'mouseleave' | 'none' | DropDownTrigger = "mouseleave";

    @Input('jigsawCascadingMenuInitData')
    public jigsawFloatInitData: any;

    @Input()
    public get jigsawCascadingMenuOpen(): boolean {
        return this.jigsawFloatOpen;
    }

    public set jigsawCascadingMenuOpen(value: boolean) {
        this.jigsawFloatOpen = value;
    }

    @Output()
    public jigsawCascadingMenuSelect = new EventEmitter<SimpleNode>();

    @Output()
    public jigsawCascadingMenuClose = new EventEmitter<void>();

    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService) {
        super(_renderer, _elementRef, _popupService);
    }

    ngOnInit() {
        super.ngOnInit();
        const data = this.jigsawCascadingMenuData;
        this.jigsawFloatTarget = data && data.nodes && data.nodes.length > 0 ? JigsawMenu as any : null;
        this.jigsawFloatInitData.data = data;
        this.jigsawFloatInitData.width = this.jigsawCascadingMenuWidth;
        this.jigsawFloatInitData.height = this.jigsawCascadingMenuHeight;
        this.jigsawFloatInitData.options = this.jigsawFloatOptions;
        if (!this.jigsawFloatInitData.select) {
            this.jigsawFloatInitData.select = this.jigsawCascadingMenuSelect;
        } else {
            this.jigsawCascadingMenuSelect = this.jigsawFloatInitData.select;
        }
        this.jigsawFloatInitData.theme = this.jigsawCascadingMenuTheme;
    }

    private _menuSelectSubscriber: any;

    ngAfterViewInit() {
        if (!this._menuSelectSubscriber) {
            this._menuSelectSubscriber = this.jigsawCascadingMenuSelect.subscribe((node: SimpleNode) => {
                if (!node.nodes || node.nodes.length == 0) {
                    // 叶子节点，点击了要关闭整个菜单
                    closeAllContextMenu(this._popupService.popups);
                }
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._menuSelectSubscriber) {
            this._menuSelectSubscriber.unsubscribe();
            this._menuSelectSubscriber = null;
        }
        if (this._removeParentClickHandler) {
            this._removeParentClickHandler();
            this._removeParentClickHandler = null;
        }
        if (this._removeBodyNodeRemovedHandler) {
            this._removeBodyNodeRemovedHandler();
            this._removeBodyNodeRemovedHandler = null;
        }
    }

    public _$openByHover($event) {
        // 跟当前宿主平级或者以下的其他弹出需要先关闭
        if (/^j(igsaw)?-list-option$/.test(this._elementRef.nativeElement.localName)) {
            const target = this._elementRef.nativeElement.parentElement.parentElement;
            const index = this._popupService.popups.findIndex(popup => popup.element == target);
            this._popupService.popups
                .filter((popup, idx) => idx > index && popup.extra === cascadingMenuFlag)
                .forEach(popup => popup.dispose());
        }
        super._$openByHover($event);
    }

    private _removeParentClickHandler: any;
    private _removeBodyNodeRemovedHandler: any;

    private _onParentEvents(): void {
        const parent = this._popupService.popups.reverse().find(p => p.extra != cascadingMenuFlag);
        if (!parent) {
            return;
        }

        // 多级弹出时，单击上一级弹出视图时，要关闭上下文菜单
        if (this._removeParentClickHandler) {
            this._removeParentClickHandler();
        }
        this._removeParentClickHandler = this._renderer.listen(parent.element, 'click', () => {
            this._removeParentClickHandler();
            this._removeParentClickHandler = null;
            closeAllContextMenu(this._popupService.popups);
        });

        // 多级弹出时，上一级弹出视图关闭时，要关闭上下文菜单
        this._removeBodyNodeRemovedHandler = this._renderer.listen(document.body, 'DOMNodeRemoved', element => {
            if (element.target !== parent.element) {
                return;
            }
            this._removeBodyNodeRemovedHandler();
            this._removeBodyNodeRemovedHandler = null;
            closeAllContextMenu(this._popupService.popups);
        });
    }

    protected _openFloat(): PopupInfo {
        this._onParentEvents();
        const popupInfo = super._openFloat();
        if (!!popupInfo) {
            // 将当前类作为此类弹出的一个标志，关闭所有弹出时，只关闭具有此标志的弹出
            popupInfo.extra = cascadingMenuFlag;
        }
        return popupInfo;
    }

    protected _closeFloat(event?: any) {
        if (event && event.type == 'click') {
            // 全局click
            closeAllContextMenu(this._popupService.popups);
        } else if (event && event.type == 'mouseleave' && event.target == this.popupElement
            && PopupService.allPopups.some(popup => popup.extra === cascadingMenuFlag && PopupService.mouseInPopupElement(event, popup.element))) {
            super._closeFloat(event);
        } else if (!event) {
            super._closeFloat(event);
        }
    }

    protected _disposePopup() {
        super._disposePopup();
        this.jigsawCascadingMenuClose.emit();
    }
}
