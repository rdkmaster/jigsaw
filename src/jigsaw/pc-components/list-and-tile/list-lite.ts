import {
    AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, NgModule, QueryList, ViewChild,
    ViewChildren, OnDestroy, Output, EventEmitter, NgZone, ChangeDetectionStrategy, Injector
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";
import {PerfectScrollbarDirective, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../common/core/data/array-collection";
import {JigsawList, JigsawListModule, JigsawListOption} from "./list";
import {JigsawInputModule} from "../input/input";
import {GroupOptionValue} from "./group-common";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";
import {CallbackRemoval} from "../../common/core/utils/common-utils";
import {WingsTheme} from "../../common/common";

type SupportedDataType = ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | PageableArray | GroupOptionValue[];

/**
 * 一个轻量的list控件，是在list控件基础上做的封装，做了一些功能的拓展
 * - 支持单选和多选
 * - 支持同步异步数据，和预设数据
 * - 支持设置option显示个数，自动产生滚动条
 * - 支持搜索功能
 * - 支持文本溢出显示省略号，鼠标移入会有提示信息
 * - 可以和combo结合起来使用
 */
// @dynamic
@WingsTheme('list-lite.scss')
@Component({
    selector: 'jigsaw-list-lite, j-list-lite',
    templateUrl: 'list-lite.html',
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-list-lite-host]': 'true',
        '[class.jigsaw-list-lite-error]': '!valid'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawListLite), multi: true },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawListLite extends AbstractJigsawGroupLiteComponent implements AfterViewInit, OnDestroy {
    constructor(protected _changeDetectorRef: ChangeDetectorRef, protected _zone: NgZone,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_changeDetectorRef, _injector);
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
    private _removeOnRefresh: CallbackRemoval;

    /**
     * 供选择的数据集合
     */
    private _data: SupportedDataType;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): SupportedDataType {
        return this._data;
    }

    public set data(data: SupportedDataType) {
        this._updateData(data, false);
    }

    private _updateData(data: SupportedDataType, suppressEvent: boolean): void {
        if (!data || this.data == data) {
            return;
        }
        this._data = data;
        if (!suppressEvent) {
            this.dataChange.emit(this.data);
        }
        if (this._data instanceof ArrayCollection || this._data instanceof LocalPageableArray || this._data instanceof PageableArray) {
            if (this._removeOnChange) {
                this._removeOnChange();
            }
            this._removeOnChange = this._data.onChange(() => {
                this.removeInvalidSelectedItems();
            });
            if (this._removeOnRefresh) {
                this._removeOnRefresh();
            }
            this._removeOnRefresh = this._data.onRefresh(() => {
                this._changeDetectorRef.markForCheck();
            })
        }
        if (this._needCheckSelectedItems) {
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
     * 搜索框的提示语
     *
     * @NoMarkForCheckRequired
     *
     * $demo = list-lite/searchable
     */
    @Input()
    public placeholder: string = '';

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

    /**
     * true显示边框
     * false不显示边框
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public showBorder: boolean = true;

    /**
     * 多选最大个数限制
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public maxSelectionLimit: number = 0;

    /**
     * @internal
     */
    public _$maxSelectionReached: boolean = false;

    @ViewChild(PerfectScrollbarDirective)
    private _listScrollbar: PerfectScrollbarDirective;

    /**
     * 搜索的时候，如果重新创建data为LocalPageableArray，这个时候检查selectItems，会误删选中值
     */
    private _needCheckSelectedItems: boolean = true;

    public removeInvalidSelectedItems() {
        if (this._listInst) {
            // 等待ngFor渲染
            this.runAfterMicrotasks(() => {
                this._zone.run(() => {
                    this._listInst._removeInvalidSelectedItems();
                })
            })
        }
    }

    private _removeFilterSubscribe: Subscription;

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if(this.data instanceof LocalPageableArray || this.data instanceof PageableArray) {
            this._filterData(filterKey);
        } else {
            const data = new LocalPageableArray();
            data.pagingInfo.pageSize = Infinity;
            const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                // 在新建data准备好再赋值给组件data，防止出现闪动的情况
                removeUpdateSubscriber.unsubscribe();
                this._needCheckSelectedItems = false;
                this._updateData(data, false);
                this._filterData(filterKey);
            });
            data.fromArray(this.data);
        }
    }

    private _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        (<LocalPageableArray<any> | PageableArray>this.data).filter(filterKey, [this.labelField]);
        this._listScrollbar && this._listScrollbar.scrollToTop();
    }

    private _setListWrapperHeight() {
        if (!this.optionCount || !this._listOptions.length) return;
        this.height = this._listOptions.first.elementRef.nativeElement.offsetHeight * this.optionCount + 2 + 'px';
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
        if (this._removeOnChange) {
            this._removeOnChange();
            this._removeOnChange = null;
        }
        if (this._removeOnRefresh) {
            this._removeOnRefresh();
            this._removeOnRefresh = null;
        }
        if (this._removeFilterSubscribe) {
            this._removeFilterSubscribe.unsubscribe();
            this._removeFilterSubscribe = null;
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

