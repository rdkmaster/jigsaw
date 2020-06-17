import {
    AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, NgModule, QueryList, ViewChild,
    ViewChildren, OnDestroy, Output, EventEmitter, NgZone
} from "@angular/core";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../common/core/data/array-collection";
import {CommonModule} from "@angular/common";
import {JigsawList, JigsawListModule, JigsawListOption} from "./list";
import {JigsawInputModule} from "../input/input";
import {GroupOptionValue} from "./group-common";
import {PerfectScrollbarDirective, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";
import {CallbackRemoval} from "../../common/core/utils/common-utils";

/**
 * 一个轻量的list控件，是在list控件基础上做的封装，做了一些功能的拓展
 * - 支持单选和多选
 * - 支持同步异步数据，和预设数据
 * - 支持设置option显示个数，自动产生滚动条
 * - 支持搜索功能
 * - 支持文本溢出显示省略号，鼠标移入会有提示信息
 * - 可以和combo结合起来使用
 *
 */
// @dynamic
@Component({
    selector: 'jigsaw-list-lite, j-list-lite',
    template: `
        <j-input *ngIf="searchable" class="jigsaw-list-lite-search" width="100%" (valueChange)="_$handleSearching($event)">
            <span jigsaw-prefix-icon class="fa fa-search"></span>
        </j-input>
        <div class="jigsaw-list-lite-wrapper" [perfectScrollbar]="{suppressScrollX: true, wheelSpeed: 0.5, minScrollbarLength: 20}"
             [style.max-height]="height">
            <j-list width="100%" [trackItemBy]="trackItemBy" [multipleSelect]="multipleSelect" [valid]="valid"
                    [(selectedItems)]="selectedItems" (selectedItemsChange)="_$handleSelectChange($event)">
                <j-list-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item" [disabled]="item?.disabled">
                    <p class="jigsaw-list-lite-text" title="{{item && item[labelField] ? item[labelField] : item}}">
                        {{item && item[labelField] ? item[labelField] : item}}</p>
                </j-list-option>
            </j-list>
        </div>
    `,
    host: {
        '[class.jigsaw-list-lite]': 'true',
        '[class.jigsaw-list-lite-error]': '!valid',
        '[style.width]': 'width'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawListLite), multi: true},
    ]
})
export class JigsawListLite extends AbstractJigsawGroupLiteComponent implements AfterViewInit, OnDestroy {
    constructor(private _changeDetectorRef: ChangeDetectorRef, protected _zone: NgZone) {
        super();
    }

    /**
     * 用于在数据集合中设置分割线
     *
     * $demo = list-lite/basic
     */
    public static get SEPARATOR() {
        return null
    }

    private _removeOnChange: CallbackRemoval;

    /**
     * 供选择的数据集合
     */
    private _data: ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | PageableArray | GroupOptionValue[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | PageableArray | GroupOptionValue[] {
        return this._data;
    }

    public set data(data: ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | PageableArray | GroupOptionValue[]) {
        if(!data || this.data == data) return;
        this._data = data;
        this.dataChange.emit(this.data);
        if(this._data instanceof ArrayCollection || this._data instanceof LocalPageableArray || this._data instanceof PageableArray) {
            if(this._removeOnChange) {
                this._removeOnChange();
            }
            this._removeOnChange = this._data.onChange(() => {
                this.removeInvalidSelectedItems();
            });
        }
        if(this._needCheckSelectedItems) {
            this.removeInvalidSelectedItems();
        } else {
            this._needCheckSelectedItems = true;
        }
    }

    @Output()
    public dataChange = new EventEmitter();

    /**
     * 设置是否可以检索数据
     *
     * @NoMarkForCheckRequired
     *
     * $demo = list-lite/searchable
     */
    @Input()
    public searchable: boolean;

    /**
     * 显示的option个数，超出的会显示滚动条；
     * 不设置optionCount，则显示全部
     *
     * @NoMarkForCheckRequired
     *
     * $demo = list-lite/option-count
     */
    @Input()
    public optionCount: number;

    @ViewChild(JigsawList)
    private _listInst: JigsawList;

    @ViewChildren(JigsawListOption)
    private _listOptions: QueryList<JigsawListOption>;

    @ViewChild(PerfectScrollbarDirective)
    private _listScrollbar: PerfectScrollbarDirective;

    /**
     * 搜索的时候，如果重新创建data为LocalPageableArray，这个时候检查selectItems，会误删选中值
     */
    private _needCheckSelectedItems: boolean = true;

    public removeInvalidSelectedItems() {
        if(this._listInst) {
            // 等待ngFor渲染
            this.runAfterMicrotasks(() => {
                this._zone.run(() => {
                    this._listInst._removeInvalidSelectedItems();
                })
            })
        }
    }

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if (!(this.data instanceof LocalPageableArray) && !(this.data instanceof PageableArray)) {
            const data = new LocalPageableArray();
            data.pagingInfo.pageSize = Infinity;
            data.fromArray(this.data);
            this._needCheckSelectedItems = false;
            this.data = data;
        }
        filterKey = filterKey ? filterKey.trim() : '';
        (<LocalPageableArray<any> | PageableArray>this.data).filter(filterKey, [this.labelField]);
        this._listScrollbar && this._listScrollbar.scrollToTop();
    }

    private _setListWrapperHeight() {
        if (!this.optionCount || !this._listOptions.length) return;
        this.height = this._listOptions.first.elementRef.nativeElement.offsetHeight * this.optionCount + 'px';
        this._changeDetectorRef.detectChanges();
    }

    ngAfterViewInit() {
        this._setListWrapperHeight();
        this._listOptions.changes.subscribe(() => {
            this._setListWrapperHeight();
        })
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if(this._removeOnChange) {
            this._removeOnChange();
            this._removeOnChange = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawListModule, JigsawInputModule, PerfectScrollbarModule],
    declarations: [JigsawListLite],
    exports: [JigsawListLite]
})
export class JigsawListLiteModule {

}

