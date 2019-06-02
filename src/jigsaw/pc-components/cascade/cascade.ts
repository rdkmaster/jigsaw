import {
    AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnInit, Optional, Output, ViewChild, OnDestroy
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {JigsawTabsModule} from "../tabs/index";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawTab} from "../tabs/tab";
import {AbstractJigsawComponent, IDynamicInstantiatable} from "../../common/common";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../common/core/data/array-collection";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {TreeData} from "../../common/core/data/tree-data";
import {JigsawInputModule} from "../input/input";
import {JigsawPaginationModule} from "../pagination/pagination";

export class CascadeData {
    /**
     * 用于级联组件在未选中任何条目时的标题文本，一般使用当前列表所有条目所归属的类作为标题。
     */
    title: string;
    /**
     * 级联选项的数据集,支持静态和异步数据
     */
    list: any[] | Observable<any[]>;
    /**
     * 是否级联结束，不设置默认为不结束
     */
    noMore?: boolean;
    /**
     * 是否显示“全部”按钮，不设置默认为不显示，“全部”按钮单击后的效果等于选择了其父级tab页上对应的条目。
     */
    showAll?: boolean;
    /**
     * 标签字段名，用于设置`list`中条目显示在界面上的字段。
     * 省略此值的话，级联组件会使用`JigsawCascade.labelField`属性值。
     */
    labelField?: string;
    /**
     * 用于指明可唯一确定一个条目的字段（或者字段列表），备选的条目往往有id/key等字段，
     * 用于标识一个条目的唯一性，提供这字段可帮助级联组件更好的区分同名条目。
     *
     * 省略此值的话，级联组件会使用`JigsawCascade.trackItemBy`属性值。
     */
    trackItemBy?: string | string[];
}

/**
 * 生成级联数据的函数类型
 * @params selectedItem: 上一级选中的item，可作为查询这一级数据的条件
 *         selectedItems: 已有的所有级items
 *         data: 已有的所有级的数据集合
 *         level: 当前tab的下标索引值，从0开始
 * @returns {CascadeData}
 */
export type CascadeDateGenerator = (selectedItem: any, selectedItems: any[], data: any[], level: number) => CascadeData;

export class CascadeTabContentInitData {
    level: number;
    list: any[] | Observable<Object>;
    noMore: boolean;
    multipleSelect: boolean;
    showAll: boolean;
}

/**
 * 一种通用的级联选择组件，
 * - 支持静态数据和异步数据
 * - 支持单选和多选
 * - 支持选择全部
 */
@Component({
    selector: 'jigsaw-cascade, j-cascade',
    template: '<j-tabs width="100%"></j-tabs>',
    host: {
        '[class.jigsaw-cascade]': 'true',
        '[style.width]': 'width',
    }
})
export class JigsawCascade extends AbstractJigsawComponent implements AfterViewInit, OnInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    /**
     * @internal
     */
    @ViewChild(JigsawTab) public _tabs: JigsawTab;

    /**
     * @internal
     */
    public _cascadeDataList: CascadeData[] = [];

    /**
     * 生成级联数据的函数，一般用于需要异步加载的数据的生产
     *
     * $demo = cascade/lazy-load
     * $demo = cascade/selected-items
     */
    @Input()
    public dataGenerator: CascadeDateGenerator;

    /**
     * 一般配合`dataGenerator`使用，用于指明`dataGenerator`函数执行的上下文对象，
     * 忽略此值时，`dataGenerator`函数中的`this`将指向一个空对象。
     *
     * 注意，如果`data`属性的值是一个函数，则该函数的执行上下文也是此属性指定的对象。
     *
     * $demo = cascade/lazy-load
     * $demo = cascade/selected-items
     */
    @Input()
    public generatorContext: any;

    private _data: CascadeDateGenerator | TreeData;

    /**
     * 级联数据
     * - 可以是一个生产数据的函数，参考`dataGenerator`
     * - 也可以是一个有层级关系的静态数据，参考`TreeData`
     *
     * $demo = cascade/basic
     * $demo = cascade/lazy-load
     */
    @Input()
    public get data(): CascadeDateGenerator | TreeData {
        return this._data;
    }

    public set data(value: CascadeDateGenerator | TreeData) {
        this._data = value;
        if (value instanceof Function) {
            this.dataGenerator = value;
        } else if (!!value) {
            this.dataGenerator = this._treeDataGenerator;
        } else {
            // dummy generator
            this.dataGenerator = () => null;
        }
        if (this.initialized) {
            this._cascading(0);
        }
    }

    private _treeDataGenerator(selectedItem: any): CascadeData {
        const cd = new CascadeData();
        const td = <TreeData>this.data;
        const si = selectedItem ? selectedItem : td;
        cd.list = si.nodes;
        cd.title = si.title;
        // 子级必须全部包含nodes属性，才认为这个子级有下一级
        cd.noMore = si.hasOwnProperty('noMore') ? si.noMore :
            si.nodes.reduce((noMore, item) => noMore && !item.hasOwnProperty('nodes'), true);
        cd.showAll = si.showAll;
        cd.labelField = si.labelField;
        cd.trackItemBy = si.trackItemBy;
        return cd;
    }

    private _selectedItems: any[] = [];

    /**
     * 级联选择的数据
     * @type {Array}
     *
     * $demo = cascade/selected-items
     */
    @Input()
    public get selectedItems(): any[] {
        return this._selectedItems;
    }

    public set selectedItems(value: any[]) {
        this._selectedItems = value || [];
        if (value && this.initialized) {
            this._fillBack();
        }
    }

    /**
     * 级联选择数据发生变化时发送的事件
     * @type {EventEmitter<any[]>}
     *
     * $demo = cascade/basic
     * $demo = cascade/lazy-load
     * $demo = cascade/multiple-select
     * $demo = cascade/show-all
     */
    @Output()
    public selectedItemsChange = new EventEmitter<any[]>();

    /**
     * 数据要显示的文本key
     * @type {string}
     *
     * $demo = cascade/lazy-load
     * $demo = cascade/selected-items
     */
    @Input()
    public labelField: string = 'label';

    private _trackItemBy: string[];

    /**
     * 数据的标识，用于判断是否为同一个数据，默认是`labelField`的值
     *
     * $demo = cascade/track-item-by
     */
    @Input()
    public get trackItemBy(): string | string[] {
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        if (!value) {
            return;
        }
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    /**
     * 配置叶子节点是否可多选
     *
     * $demo = cascade/multiple-select
     */
    @Input()
    public multipleSelect: boolean;

    /**
     * 是否可以跨分支多选
     *
     * @internal
     *
     * $demo = cascade/cross-select
     * $demo = cascade/preset-multi-dimensional-data
     */
        // @Input()
    public allowCrossSelect: boolean = false;

    /**
     * 是否可搜索
     */
    @Input()
    public searchable: boolean;

    /**
     * 设置数据分页存储数，默认不分页
     * @type {number}
     */
    @Input()
    public pageSize: number = Infinity;

    /**
     * @internal
     */
    public _handleMultipleSelect(selectedItems: any[], level: number) {
        if (this.allowCrossSelect && this._selectedItems[level]) {
            // 支持多维
            // 过滤掉已有的但是现在不选的
            const compare = CommonUtils.compareWithKeyProperty;
            const tail = this._selectedItems.length - 1;
            this._selectedItems[tail] = this._selectedItems[tail].filter(item => {
                const list = <any[]>this._cascadeDataList[tail].list;
                const inThisTab = list.find(it => compare(item, it, this._trackItemBy));
                // 不是此维度的保留
                if (!inThisTab) {
                    return true;
                }
                // 在选中项里的保留，不在选中项里的去掉
                return selectedItems.find(it => compare(item, it, this._trackItemBy));
            });
            // 添加原来没选的但是现在选中的
            selectedItems.forEach(item => {
                if (!this._selectedItems[tail].find(it => compare(item, it, this._trackItemBy))) {
                    this._selectedItems[tail].push(item);
                }
            })
        } else {
            this._selectedItems.splice(level, this.selectedItems.length - level, [...selectedItems]);
        }

        // 多选的tab是级联结束的地方，在这更新选中的数据
        this.selectedItemsChange.emit(this._selectedItems);
    }

    /**
     * @internal
     */
    public _handleSelect(selectedItem: any, level: number) {
        this._updateTabTitle(selectedItem, level);
        this._selectedItems.splice(level, this.selectedItems.length - level, selectedItem);
        if (this._cascadeDataList[level].noMore) {
            this.selectedItemsChange.emit(this._selectedItems);
        } else {
            this._cascading(level + 1, selectedItem);
        }
    }

    /**
     * @internal
     */
    public _selectAll(level: number) {
        if (this.multipleSelect && this.allowCrossSelect) {
            console.warn('multidimensional select can not select all');
            return;
        }
        this._removeCascadingTabs(level);
        this._tabs.selectedIndex = this._tabs.length - 1;
        this._selectedItems = this._selectedItems.slice(0, level);
        this.selectedItemsChange.emit(this._selectedItems);
    }

    private _addCascadingTab(level: number, lazy: boolean) {
        this._removeCascadingTabs(level);
        this._tabs.addTab(this._cascadeDataList[level].title, InternalTabContent, {
            level: level,
            list: this._cascadeDataList[level].list,
            noMore: this._cascadeDataList[level].noMore,
            multipleSelect: this._cascadeDataList[level].noMore && this.multipleSelect,
            showAll: this._cascadeDataList[level].showAll,
        }, !lazy);
    }

    private _removeCascadingTabs(level: number) {
        if (this._tabs.length > level) {
            for (let i = this._tabs.length - 1; i >= level; i--) {
                this._tabs.removeTab(i)
            }
        }
    }

    private _updateTabTitle(selectedItem: any, level: number) {
        if (!this._tabs._$tabPanes || !this._tabs._$tabPanes.toArray()[level]) return;
        const title = selectedItem[this.labelField];
        if (title) {
            this._tabs._$tabPanes.toArray()[level].title = title;
        }
        this._changeDetectorRef.detectChanges();
    }

    private _cascading(level: number, selectedItem?: any, lazy?: boolean) {
        const context = this.dataGenerator === this._treeDataGenerator ? this : this.generatorContext;
        const levelData = CommonUtils.safeInvokeCallback(context, this.dataGenerator,
            [selectedItem, this._selectedItems, this._cascadeDataList, level]);
        if (!levelData || !levelData.list) {
            // 取不到下一级的数据，级联到此结束，更新选中的数据
            this.selectedItemsChange.emit(this._selectedItems);
            return;
        }
        this._cascadeDataList.splice(level, this._cascadeDataList.length - level, levelData);
        this._addCascadingTab(level, lazy);
    }

    private _fillBack() {
        this._selectedItems.forEach((item, index) => {
            this._cascading(index, this._selectedItems[index - 1], index != this._selectedItems.length - 1);
            // 多选时的最后一个tab采用默认title
            const cd = this._cascadeDataList[index];
            if (cd && cd.noMore && this.multipleSelect) return;
            this._updateTabTitle(item, index);
        })
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.trackItemBy) this.trackItemBy = this.labelField;
    }

    ngAfterViewInit() {
        // 等待tabs渲染
        if (!this._selectedItems || this._selectedItems.length == 0) {
            // 没有初始数据
            this._cascading(0);
        } else {
            this._fillBack();
        }
    }
}

/**
 * @internal
 */
@Component({
    template: `
        <div class="jigsaw-cascade-tile-wrapper">
            <div *ngIf="_$showLoading; else tile" class="jigsaw-cascade-loading">
                <span class="iconfont iconfont-e8dd jigsaw-am-rotation"></span>
            </div>
            <ng-template #tile>
                <div class="jigsaw-cascade-search-wrapper" *ngIf="_$cascade?.searchable">
                    <j-input class="jigsaw-cascade-tile-search" width="100%" [(value)]="_$searchKey"
                             (valueChange)="_$handleSearching($event)">
                        <span jigsaw-prefix-icon class="fa fa-search"></span>
                    </j-input>
                </div>
                <j-tile [(selectedItems)]="_$currentPageSelectedItems" (selectedItemsChange)="_$handleSelect()"
                        [trackItemBy]="_$cascade?.trackItemBy" [multipleSelect]="initData.multipleSelect">
                    <div *ngIf="initData?.showAll" class="jigsaw-cascade-show-all"
                         (click)="_$cascade?._selectAll(initData.level)">
                        {{'cascade.all' | translate}}
                    </div>
                    <j-tile-option *ngFor="let item of _$list; trackBy: _$trackByFn" [value]="item" (click)="_$handleOptionClick()">
                        <span [title]="item && item[_$cascade?.labelField] ? item[_$cascade?.labelField] : item">
                            {{item && item[_$cascade?.labelField] ? item[_$cascade?.labelField] : item}}</span>
                    </j-tile-option>
                </j-tile>
                <div class="jigsaw-cascade-pagination-wrapper" *ngIf="_$list?.pagingInfo?.totalPage > 1">
                    <j-pagination [data]="_$list" mode="simple"></j-pagination>
                </div>
            </ng-template>
        </div>
    `
})
export class InternalTabContent extends AbstractJigsawComponent implements IDynamicInstantiatable, OnInit, OnDestroy {
    constructor(@Optional() public _$cascade: JigsawCascade) {
        super();
    }

    private _removeListRefreshListener: CallbackRemoval;

    public initData: CascadeTabContentInitData;

    /**
     * @internal
     * 当前tab总选择
     */
    public _$selectedItems: any[];

    /**
     * @internal
     * 当前page选择
     */
    public _$currentPageSelectedItems: any[];

    /**
     * @internal
     */
    public _$searchKey: string;

    /**
     * @internal
     */
    public _$showLoading: boolean;

    private _list: LocalPageableArray<any> = new LocalPageableArray();

    /**
     * @internal
     */
    public get _$list() {
        return this._list;
    }

    public set _$list(value: any[] | ArrayCollection<any> | LocalPageableArray<any>) {
        if(!value || this._list == value) return;
        if (value instanceof LocalPageableArray && value.pagingInfo) {
            this._list = value;
            if(this._removeListRefreshListener) {
                this._removeListRefreshListener();
                this._removeListRefreshListener = null;
            }
            // 用于刷新分页
            this._removeListRefreshListener = this._list.onRefresh(this._$updateCurrentPageSelectedItems, this);
        } else if(value instanceof Array || value instanceof ArrayCollection) {
            const data = new LocalPageableArray();
            data.pagingInfo.pageSize = this._$cascade.pageSize;
            data.fromArray(value);
            const removeDataOnRefresh = data.onRefresh(() => {
                removeDataOnRefresh();
                this._list = data;
                if(this._removeListRefreshListener) {
                    this._removeListRefreshListener();
                    this._removeListRefreshListener = null;
                }
                // 用于刷新分页
                this._removeListRefreshListener = this._list.onRefresh(this._$updateCurrentPageSelectedItems, this);
                this._list.refresh();
            });
        } else {
            console.error('value type error, jigsaw-list supports Array and ArrayCollection');
        }
    }

    /**
     * @internal
     */
    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this._$cascade.trackItemBy);
    };

    /**
     * @internal
     */
    public _$handleSelect() {
        this._updateSelectedItemsByCurrent();
        if (this.initData.multipleSelect) {
            // 多选，级联结束的tab
            this._$cascade._handleMultipleSelect(this._$selectedItems, this.initData.level);
        } else {
            // 单选
            this._$cascade._handleSelect(this._$selectedItems[0], this.initData.level);
        }
    }

    /**
     * @internal
     */
    public _$handleOptionClick() {
        // 补充已选中的option不触发selectedItemsChange
        if (this.initData.noMore || this._$cascade._tabs.selectedIndex != this.initData.level) return;
        if (this._$cascade._tabs.selectedIndex < this._$cascade._tabs.length - 1) {
            this._$cascade._tabs.selectedIndex += 1;
        } else {
            this._$handleSelect();
        }
    }

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if (!(this._$list instanceof LocalPageableArray) && !(this._$list instanceof PageableArray)) {
            const data = new LocalPageableArray();
            data.pagingInfo.pageSize = Infinity;
            data.fromArray(this._$list);
            this._$list = data;
        }
        filterKey = filterKey ? filterKey.trim() : '';
        (<LocalPageableArray<any> | PageableArray>this._$list).filter(filterKey, [this._$cascade.labelField]);
    }

    private _updateSelectedItemsByCurrent() {
        this._$currentPageSelectedItems = this._$currentPageSelectedItems ? this._$currentPageSelectedItems : [];
        this._$selectedItems = this._$selectedItems ? this._$selectedItems : [];
        if(this.initData.multipleSelect) {
            this._$selectedItems.push(...this._$currentPageSelectedItems.filter(item =>
                !this._$selectedItems.some(it => CommonUtils.compareWithKeyProperty(item, it, <string[]>this._$cascade.trackItemBy))));
            const currentUnselectedItems = this._$list.concat().filter(item =>
                !this._$currentPageSelectedItems.some(it => CommonUtils.compareWithKeyProperty(item, it, <string[]>this._$cascade.trackItemBy)));
            this._$selectedItems = this._$selectedItems.filter(item =>
                !currentUnselectedItems.some(it => CommonUtils.compareWithKeyProperty(item, it, <string[]>this._$cascade.trackItemBy)));
        } else {
            this._$selectedItems = this._$currentPageSelectedItems;
        }
    }

    /**
     * @internal
     */
    public _$updateCurrentPageSelectedItems() {
        this.callLater(() => {
            // 初始化时触发变更检查
            this._$selectedItems = this._$selectedItems ? this._$selectedItems : [];
            if(this._$list instanceof LocalPageableArray && this._$list.pagingInfo.pageSize != Infinity) {
                this._$currentPageSelectedItems = this._$selectedItems.filter(item => (<any[]>this._$list).some(it =>
                    CommonUtils.compareWithKeyProperty(it, item, <string[]>this._$cascade.trackItemBy)));
            } else {
                this._$currentPageSelectedItems = this._$selectedItems;
            }
        });
    }

    private _init(data: any[], allSelectedData: any[]) {
        this._$list = data;
        if (allSelectedData instanceof Array || allSelectedData instanceof ArrayCollection) {
            // 等待根据list数据渲染option后回填数据
            this.callLater(() => {
                this._$currentPageSelectedItems = allSelectedData.filter(item => {
                    return this._$list.find(it =>
                        CommonUtils.compareWithKeyProperty(item, it, <string[]>this._$cascade.trackItemBy))
                });

                this._$selectedItems = allSelectedData.filter(item => {
                    return data.find(it =>
                        CommonUtils.compareWithKeyProperty(item, it, <string[]>this._$cascade.trackItemBy))
                });
            })
        }
    }

    ngOnInit() {
        super.ngOnInit();

        if (!this.initData) {
            return;
        }

        let allSelectedData = this._$cascade.selectedItems[this.initData.level];
        if (CommonUtils.isDefined(allSelectedData)) {
            const isArray = allSelectedData instanceof ArrayCollection || allSelectedData instanceof Array;
            allSelectedData = isArray ? allSelectedData : [allSelectedData];
        }
        const list = this.initData.list;
        if (list instanceof Observable) {
            this._$showLoading = true;
            const subscriber = list.subscribe((data: any[]) => {
                this._$cascade._cascadeDataList[this.initData.level].list = data; // 更新list变成实体数据
                this._init(data, allSelectedData);

                subscriber.unsubscribe();
                this.callLater(() => {
                    this._$showLoading = false;
                }, 300);
            }, () => subscriber.unsubscribe());
        } else if (list instanceof Array) {
            this._init(list, allSelectedData);
        }
    }

    ngOnDestroy() {
        if(this._removeListRefreshListener) {
            this._removeListRefreshListener();
            this._removeListRefreshListener = null;
        }
    }
}

@NgModule({
    imports: [JigsawTabsModule, JigsawTileSelectModule, TranslateModule, CommonModule, JigsawInputModule, JigsawPaginationModule],
    declarations: [JigsawCascade, InternalTabContent],
    exports: [JigsawCascade],
    providers: [TranslateService],
    entryComponents: [InternalTabContent]
})
export class JigsawCascadeModule {
    constructor(ts: TranslateService) {
        InternalUtils.initI18n(ts, 'cascade', {
            zh: {
                all: "全部"
            },
            en: {
                all: "All"
            }
        });
        ts.setDefaultLang(ts.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => ts.use(langInfo.curLang));
    }
}
