import {
    AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, NgModule, QueryList, ViewChild,
    ViewChildren
} from "@angular/core";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../common/core/data/array-collection";
import {CommonModule} from "@angular/common";
import {JigsawMobileListModule, JigsawMobileListOption} from "./list";
import {JigsawMobileInputModule} from "../input/input";
import {GroupOptionValue} from "./group-common";
import {PerfectScrollbarDirective, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawMobileGroupLiteComponent} from "./group-lite-common";

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
@Component({
    selector: 'jigsaw-mobile-list-lite, jm-list-lite',
    template: `
        <jm-input *ngIf="searchable" class="jigsaw-list-lite-search" width="100%" (valueChange)="_$handleSearching($event)">
            <span jigsaw-prefix-icon class="fa fa-search"></span>
        </jm-input>
        <div class="jigsaw-list-lite-wrapper" [perfectScrollbar]="{suppressScrollX: true, wheelSpeed: 0.5, minScrollbarLength: 20}"
             [style.max-height]="height">
            <jm-list width="100%" [trackItemBy]="trackItemBy" [multipleSelect]="multipleSelect" [valid]="valid"
                    [(selectedItems)]="selectedItems" (selectedItemsChange)="_$handleSelectChange($event)">
                <jm-list-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item" [disabled]="item?.disabled">
                    <p class="jigsaw-list-lite-text" title="{{item && item[labelField] ? item[labelField] : item}}">
                        {{item && item[labelField] ? item[labelField] : item}}</p>
                </jm-list-option>
            </jm-list>
        </div>
    `,
    host: {
        '[class.jigsaw-list-lite]': 'true',
        '[class.jigsaw-list-lite-error]': '!valid',
        '[style.width]': 'width'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileListLite), multi: true},
    ]
})
export class JigsawMobileListLite extends AbstractJigsawMobileGroupLiteComponent implements AfterViewInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef) {
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

    /**
     * 供选择的数据集合
     */
    @Input()
    public data: ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | GroupOptionValue[];

    /**
     * 设置是否可以检索数据
     *
     * $demo = list-lite/searchable
     */
    @Input()
    public searchable: boolean;

    /**
     * 显示的option个数，超出的会显示滚动条；
     * 不设置optionCount，则显示全部
     *
     * $demo = list-lite/option-count
     */
    @Input() public optionCount: number;

    @ViewChildren(JigsawMobileListOption) private _listOptions: QueryList<JigsawMobileListOption>;

    @ViewChild(PerfectScrollbarDirective, {static: false}) private _listScrollbar: PerfectScrollbarDirective;

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if (!(this.data instanceof LocalPageableArray) && !(this.data instanceof PageableArray)) {
            const data = new LocalPageableArray();
            data.pagingInfo.pageSize = Infinity;
            data.fromArray(this.data);
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
}

@NgModule({
    imports: [CommonModule, JigsawMobileListModule, JigsawMobileInputModule, PerfectScrollbarModule],
    declarations: [JigsawMobileListLite],
    exports: [JigsawMobileListLite]
})
export class JigsawMobileListLiteModule {

}

