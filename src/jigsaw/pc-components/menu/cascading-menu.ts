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
import {SimpleNode, SimpleTreeData} from "../../common/core/data/tree-data";
import {IPopupable, PopupOptions, PopupService} from "../../common/service/popup.service";
import {DropDownTrigger, JigsawFloatBase} from "../../common/directive/float/float";
import {JigsawMenuComponent} from "./menu";

@Directive({
    selector: '[jigsaw-cascading-menu],[j-cascading-menu],[jigsawCascadingMenu]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)"
    }
})
export class JigsawCascadingMenu extends JigsawFloatBase implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    public jigsawCascadingMenuData: SimpleTreeData;

    @Input()
    public jigsawCascadingMenuWidth: string | number = 200;

    @Input()
    public jigsawCascadingMenuHeight: string | number;

    @Input()
    public jigsawCascadingMenuMaxHeight: string | number;

    @Input('jigsawCascadingMenuOptions')
    public jigsawFloatOptions: PopupOptions;

    @Input()
    public jigsawCascadingMenuBackgroundColor: string;

    @Input()
    public jigsawCascadingMenuSelectedColor: string;

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
    public jigsawFloatOpenTrigger: 'click' | 'mouseenter' | 'none' | DropDownTrigger = 'mouseenter';
    /**
     * @internal
     */
    public jigsawFloatOpen: boolean;
    /**
     * @internal
     */
    public jigsawFloatInitData: any = {};
    /**
     * @internal
     */
    public jigsawFloatTarget: Type<IPopupable> | TemplateRef<any>;

    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService) {
        super(_renderer, _elementRef, _popupService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.jigsawFloatTarget = JigsawMenuComponent as any;
        this.jigsawFloatInitData.data = this.jigsawCascadingMenuData;
        this.jigsawFloatInitData.width = this.jigsawCascadingMenuWidth;
        this.jigsawFloatInitData.height = this.jigsawCascadingMenuHeight;
        this.jigsawFloatInitData.maxHeight = this.jigsawCascadingMenuMaxHeight;
        this.jigsawFloatInitData.options = this.jigsawFloatOptions;
        this.jigsawFloatInitData.backgroundColor = this.jigsawCascadingMenuBackgroundColor;
        this.jigsawFloatInitData.selectedColor = this.jigsawCascadingMenuSelectedColor;
        this.jigsawFloatInitData.initDataSelect = this.jigsawCascadingMenuSelect;
    }

    private _removeClickHandler: any;

    ngAfterViewInit() {
        if (!this._removeClickHandler) {
            this._removeClickHandler = this.jigsawCascadingMenuSelect.subscribe(node => {
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
