import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewChildren,
    NgZone,
    ChangeDetectionStrategy,
    Injector
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../../common/common";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {JigsawInput} from "../input/input";
import {AffixUtils} from "../../common/core/utils/internal-utils";
import {JigsawTag} from "../tag/tag";
import {DropDownTrigger, JigsawFloat} from "../../common/directive/float/index";
import {PopupOptions, PopupService} from "../../common/service/popup.service";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

export class ComboSelectValue {
    [index: string]: any;

    closable?: boolean;
}

@Component({
    selector: 'jigsaw-combo-select, j-combo-select',
    templateUrl: 'combo-select.html',
    host: {
        '[style.min-width]': 'width',
        '[class.jigsaw-combo-select-host]': 'true',
        '[class.jigsaw-combo-select-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawComboSelect), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawComboSelect extends AbstractJigsawComponent implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit {
    private _removeRefreshCallback: CallbackRemoval;

    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService,
                protected _zone: NgZone,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super(_zone);
    }

    private _value: ArrayCollection<ComboSelectValue> = new ArrayCollection();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): ArrayCollection<ComboSelectValue> | ComboSelectValue[] {
        return this._value;
    }

    public set value(value: ArrayCollection<ComboSelectValue> | ComboSelectValue[]) {
        if (!value || this._value === value) {
            return;
        }
        this._value = value instanceof ArrayCollection ? value : new ArrayCollection(value);
        this._propagateChange(this._value);
        if (this.initialized) {
            this.writeValue(value);
        }
    }

    @Output() public valueChange = new EventEmitter<any[]>();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = 'label';

    @Output()
    public select = new EventEmitter<any>();

    @Output()
    public remove = new EventEmitter<any>();

    @Input()
    @RequireMarkForCheck()
    public placeholder: string = '';

    private _disabled: boolean;

    @Input()
    @RequireMarkForCheck()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        if (value) {
            this.open = false;
        }
    }

    private _openTrigger: DropDownTrigger = DropDownTrigger.mouseenter;

    @Input()
    @RequireMarkForCheck()
    public get openTrigger(): 'mouseenter' | 'click' | 'none' | DropDownTrigger {
        return this._openTrigger;
    }

    public set openTrigger(value: 'mouseenter' | 'click' | 'none' | DropDownTrigger) {
        //从模板过来的值，不会受到类型的约束
        this._openTrigger = typeof value === 'string' ? DropDownTrigger[value] : value;
    }

    private _closeTrigger: DropDownTrigger = DropDownTrigger.mouseleave;

    @Input()
    @RequireMarkForCheck()
    public get closeTrigger(): 'mouseleave' | 'click' | 'none' | DropDownTrigger {
        return this._closeTrigger;
    }

    public set closeTrigger(value: 'mouseleave' | 'click' | 'none' | DropDownTrigger) {
        //从模板过来的值，不会受到类型的约束
        this._closeTrigger = typeof value === 'string' ? DropDownTrigger[value] : value;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public maxWidth: string;

    /**
     * @internal
     */
    @ContentChild(TemplateRef)
    public _$contentTemplateRef: any;

    @ViewChild(JigsawFloat)
    private _jigsawFloat: JigsawFloat;
    /**
     * @internal
     */
    public _$opened: boolean = false;

    @Input()
    @RequireMarkForCheck()
    public get open(): boolean {
        return this._$opened;
    }

    public set open(value: boolean) {
        if (value === this._$opened || (this.disabled && value && this.openTrigger != DropDownTrigger.none)) {
            // 设置值等于当前值
            // 控件disabled，并且想打开下拉
            return;
        }
        this.runMicrotask(() => {
            // toggle open 外部控制时，用异步触发变更检查
            // 初始化open，等待组件初始化后执行
            if (value) {
                if (this._editor) {
                    this._editor.focus();
                }
            } else {
                this.searchKeyword = '';
            }
        });
        this._$opened = value;
    }

    /**
     * @internal
     */
    public _$comboOpenChange(value) {
        if (value) {
            // 同步dropdown宽度
            this._autoWidth();
            if (this._editor) {
                this._editor.select();
            }
        }

        this.openChange.emit(value);
    }

    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * @internal
     */
    public _$options: PopupOptions = {};

    private _showBorder: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public set showBorder(value: boolean) {
        this._showBorder = value;
        this._$options.showBorder = this.showBorder;
    }

    public get showBorder(): boolean {
        return this._showBorder;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public autoClose: boolean; //自动关闭dropdown

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public autoWidth: boolean; //自动同步dropdown宽度，与combo-select宽度相同

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearable: boolean = false;

    @ViewChild('editor')
    private _editor: JigsawInput;

    @ViewChild('editor', { read: ElementRef })
    private _editorElementRef: ElementRef;

    @ViewChildren(JigsawTag)
    private _tags: QueryList<JigsawTag>;

    @Input()
    @RequireMarkForCheck()
    public searchable: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public searching: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchKeyword: string = '';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchBoxMinWidth: number = 40;

    @Output()
    public searchKeywordChange = new EventEmitter<any>();

    /**
     * 是否显示tag的边框和删除按钮，默认显示
     */
    @Input()
    @RequireMarkForCheck()
    public showValueBorder: boolean = true;

    /**
     * 当用户输入非法时，组件给予样式上的提示，以提升易用性，常常和表单配合使用。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = form/template-driven
     */
    @Input()
    public valid: boolean = true;

    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this.labelField);
    };

    /**
     * @internal
     */
    public _$clearValue() {
        this._value.splice(0, this._value.length);
        this._value.refresh();
        this._autoWidth();
    }

    /**
     * @internal
     */
    public _$removeTag(tag) {
        const index = this._value.indexOf(tag);
        if (index != -1) {
            this._value.splice(index, 1);
            this._value.refresh();
            this.remove.emit(tag);
        }
        this._autoWidth();
    }

    private _autoWidth() {
        if (!this.autoWidth || !this._jigsawFloat || !this._jigsawFloat.popupElement) {
            return;
        }
        this.runAfterMicrotasks(() => {
            if (!this._jigsawFloat || !this._jigsawFloat.popupElement) {
                return;
            }
            this._renderer.setStyle(this._jigsawFloat.popupElement, 'width', this._elementRef.nativeElement.offsetWidth + 'px');
        });
    }

    private _autoClose() {
        if (this.autoClose) {
            this.open = false;
        }
    }

    private _autoEditorWidth() {
        if (!this.searchable || !this._editorElementRef) {
            return;
        }

        // 组件的空白长度 + 图标宽度
        const hostPaddingGap = 36;

        if (this._tags.last) {
            const host = this._elementRef.nativeElement;
            const lastTag = this._tags.last._elementRef.nativeElement;
            let editorWidth: any = host.offsetWidth - (AffixUtils.offset(lastTag).left - AffixUtils.offset(host).left +
                lastTag.offsetWidth + hostPaddingGap);
            editorWidth = editorWidth > this.searchBoxMinWidth ? editorWidth + 'px' : '100%';
            this._renderer.setStyle(this._editorElementRef.nativeElement, 'width', editorWidth);
        } else {
            this._renderer.setStyle(this._editorElementRef.nativeElement, 'width', '100%');
        }
    }

    private _autoPopupPos() {
        if (!this.autoClose && this._jigsawFloat) {
            this._popupService.setPosition(this._jigsawFloat._getPopupOption(), this._jigsawFloat.popupElement)
        }
    }

    /**
     * @internal
     */
    public _$tagClick(tagItem) {
        // 返回选中的tag
        this.select.emit(tagItem);

        // 控制下拉状态;(如果没有打开下拉内容，下拉，如果已经下拉保持不变;)
        if (this._openTrigger === DropDownTrigger.mouseenter || this.open || this.disabled) {
            return;
        }

        this.open = true;
    }


    /**
     * @internal
     */
    public _$handleSearchBoxChange() {
        if (this.searchKeyword) {
            this.open = true;
        }
        this.searchKeywordChange.emit(this.searchKeyword);
    }

    public ngOnInit() {
        super.ngOnInit();
        // 设置初始值
        if (CommonUtils.isDefined(this.value)) {
            this.writeValue(this.value, false);
        }
        let maxWidth: string | number = CommonUtils.getCssValue(this.maxWidth);
        if (maxWidth && !maxWidth.match(/%/)) {
            maxWidth = parseInt(maxWidth.replace('px', ''));
            this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-combo-select-selection-rendered'),
                'max-width', (maxWidth - 39) + 'px')
        }
    }

    public ngAfterViewInit() {
        this._tags.changes.subscribe(() => {
            this._autoEditorWidth();
        })
    }

    public ngOnDestroy() {
        super.ngOnDestroy();

        this.open = false;

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
            this._removeRefreshCallback = null;
        }
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any, emit = true): void {
        if (emit) {
            this.runMicrotask(() => this.valueChange.emit(this._value));
        }
        this._autoWidth();
        this._autoClose();

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._removeRefreshCallback = this._value.onRefresh(() => {
            this.valueChange.emit(this._value);
            this._propagateChange(this._value);
            this._autoWidth();
            this._autoClose();
            this._autoPopupPos();
        });
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}
