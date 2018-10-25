import {
    NgModule, Component, Input, Output, EventEmitter, OnInit,
    QueryList, ViewChildren, Optional, forwardRef, AfterViewInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {JigsawSelectModule} from '../select/select';
import {JigsawInput, JigsawInputModule} from '../input/input';
import {AbstractJigsawComponent} from "../common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {InternalUtils} from "../../core/utils/internal-utils";
import {TranslateHelper} from "../../core/utils/translate-helper";

export class PageSizeData {
    value: number;
    label: string;
}

@Component({
    selector: 'jigsaw-pagination, j-pagination',
    templateUrl: 'pagination.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-paging]': 'true',
        '[class.jigsaw-paging-small]': 'mode == "simple"'
    }
})
export class JigsawPagination extends AbstractJigsawComponent implements OnInit, AfterViewInit {
    constructor(private _translateService: TranslateService) {
        super()
    }

    private _totalPage: number;
    private _current: number;
    private _showPages: number[] = [];
    private _firstPage: JigsawPagingItem;
    private _lastPage: JigsawPagingItem;
    private _pageSizeOptions: any[];
    private _pageNumberInit: boolean = false;

    /**
     * @internal
     */
    public _$pageSize: PageSizeData = {
        value: null, label: 'null/' + this._translateService.instant('pagination.page')
    };
    /**
     * @internal
     */
    public _$pageNumbers: number[] = [];

    /**
     * @internal
     */
    public _$prevDisabled: boolean = false;

    /**
     * @internal
     */
    public _$nextDisabled: boolean = false;

    // 当前页(双绑)
    @Input()
    public get current(): number {
        return this._current
    };

    public set current(newValue: number) {
        newValue = newValue ? newValue : 1; //双绑初始值为undefined或null时，设默认值为1
        if (this.current != newValue) {
            this._current = newValue;
            this.currentChange.emit(newValue);
            if (this.initialized && this._pageNumberInit) {
                this._setCurrentShow();
            }
        }
    }

    @Output() public currentChange: EventEmitter<any> = new EventEmitter<any>(); //页码改变的事件

    private _total: number; // 数据总数

    @Input()
    get total(): number {
        return this._total;
    }

    set total(value: number) {
        if (this._total != value) {
            this._total = value;
            if (this.initialized) {
                this._renderPages();
            }
        }
    }

    @Output()
    public pageSizeChange: EventEmitter<number> = new EventEmitter<number>(); // pageSize 变化的事件

    // 每页条数
    @Input()
    public get pageSize(): number {
        return this._$pageSize ? this._$pageSize.value : null;
    }

    public set pageSize(newValue: number) {
        newValue = newValue ? newValue : 10;
        if (this.pageSize != newValue) {
            this._$pageSize.value = newValue;
            this._$pageSize.label = newValue + '/' + this._translateService.instant('pagination.page');
            this.pageSizeChange.emit(newValue);
            if (this.initialized) {
                this._renderPages();
            }
        }
    }

    // 指定每页可以显示多少条
    @Input()
    public get pageSizeOptions() {
        return this._pageSizeOptions
    }

    public set pageSizeOptions(newValue: number[]) {
        this._pageSizeOptions = [];
        newValue.forEach(num => {
            let option = {value: num, label: num + '/' + this._translateService.instant('pagination.page')};
            this._pageSizeOptions.push(option);
        });
    };

    @Input() public searchable: boolean = false; // 搜索功能开关
    @Output() public search = new EventEmitter<string>();

    @Input() public showQuickJumper: boolean = false; // 是否可以快速跳转至某页

    @Input() public mode: 'complex' | 'simple' = 'complex'; // 当为「small」时，是小尺寸分页

    @Input() public size: string; // 当为「small」时，是小尺寸分页

    @ViewChildren(forwardRef(() => JigsawPagingItem))
    private _pages: QueryList<JigsawPagingItem> = null;

    @ViewChildren(JigsawInput) inputs: QueryList<JigsawInput>;

    /*
     * 根据current设置page按钮的显示，上一页，下一页，上五页，下五页的显示
     * */
    private _setCurrentShow() {
        //page显示形式
        this._pageShow();

        //prevPages nextPages 显示
        this._showPrevAndNextBtn();

        //prevPage nextPage 不可点
        this._updatePrevAndNextStatus();

        //设置当前页
        this._setCurrentPage();
    }

    /*
     * 根据current设置当前页
     * */
    private _setCurrentPage(): void {
        this._pages.forEach(page => {
            page.current = page.pageNumber == this.current;
        });
    }

    /*
     * 根据current控制page显示
     * */
    private _pageShow(): void {
        if (this._totalPage > 10) {
            if (this.current <= 3) {
                this._showPages = [1, 2, 3, 4, 5, this._totalPage];
            } else if (this.current >= this._totalPage - 2) {
                this._showPages = [1, this._totalPage - 4, this._totalPage - 3, this._totalPage - 2, this._totalPage - 1, this._totalPage];
            } else {
                this._showPages = [1, this.current - 2, this.current - 1, this.current, this.current + 1, this.current + 2, this._totalPage];
            }
            this._pages.forEach(page => {
                this._showPages.indexOf(page.pageNumber) != -1 ? page.show() : page.hide();
            });
        } else {
            this._pages.forEach(page => {
                page.show();
            });
        }
    }

    /**
     * 上一页
     * @internal
     */
    public _$pagePrev(): void {
        if(this.mode == 'simple') {
            this.current--;
        } else {
            let pageCur = this._pages.find(page => page.current == true);
            if (!pageCur) return;
            let pageNum = pageCur.pageNumber;
            if (pageNum == 1) return;
            pageCur.cancelCurrent();
            pageNum -= 1;
            this._pages.find(page => page.pageNumber == pageNum).setCurrent();
            this.current = pageNum;
        }
    }

    /**
     * 下一页
     * @internal
     */
    public _$pageNext(): void {
        if(this.mode == 'simple') {
            this.current++;
        } else {
            let pageCur = this._pages.find(page => page.current == true);
            if (!pageCur) return;
            let pageNum = pageCur.pageNumber;
            if (pageNum == this._totalPage) return;
            pageCur.cancelCurrent();
            pageNum += 1;
            this._pages.find(page => page.pageNumber == pageNum).setCurrent();
            this.current = pageNum;
        }
    }

    /*
     * 下五页
     * */
    public pagesNext(): void {
        let pageCur = this._pages.find(page => page.current == true);
        if (!pageCur) return;
        pageCur.cancelCurrent();
        let pageNum = pageCur.pageNumber;
        pageNum = pageNum + 5;
        if (pageNum > this._totalPage) pageNum = this._totalPage;
        this._pages.find(page => page.pageNumber == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 上五页
     * */
    public pagesPrev(): void {
        let pageCur = this._pages.find(page => page.current == true);
        if (!pageCur) return;
        pageCur.cancelCurrent();
        let pageNum = pageCur.pageNumber;
        pageNum = pageNum - 5;
        if (pageNum < 1) pageNum = 1;
        this._pages.find(page => page.pageNumber == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 显示上五页、下五页按钮
     * */
    private _showPrevAndNextBtn(): void {
        if (this._totalPage <= 10) {
            if (this._firstPage) this._firstPage.showPrev = false;
            if (this._lastPage) this._lastPage.showNext = false;
        }
        else if (this.current <= 4) {
            if (this._firstPage) this._firstPage.showPrev = false;
            if (this._lastPage) this._lastPage.showNext = true;
        }
        else if (this.current >= this._totalPage - 3) {
            if (this._firstPage) this._firstPage.showPrev = true;
            if (this._lastPage) this._lastPage.showNext = false;
        }
        else {
            if (this._firstPage) this._firstPage.showPrev = true;
            if (this._lastPage) this._lastPage.showNext = true;
        }
    }

    /*
     * 获取第一个和最后一个page组件实例
     * */
    private _getFirstAndLastPage(): void {
        this._firstPage = this._pages.find(page => page.pageNumber == 1);
        this._lastPage = this._pages.find(page => page.pageNumber == this._totalPage);
    }

    /*
     * 上一页、下一页按钮设置
     * */
    private _updatePrevAndNextStatus(): void {
        if (this._totalPage <= 1) {
            this._$prevDisabled = true;
            this._$nextDisabled = true;
        } else if (this.current == 1) {
            this._$prevDisabled = true;
            this._$nextDisabled = false;
        } else if (this.current == this._totalPage) {
            this._$nextDisabled = true;
            this._$prevDisabled = false;
        } else {
            this._$prevDisabled = false;
            this._$nextDisabled = false;
        }
    }

    /*
     * goto功能
     * */
    private _goto(pageNum): void {
        pageNum = parseInt(pageNum);
        if (pageNum <= this._totalPage && pageNum >= 1) {
            if(this.mode != 'simple') {
                this._pages.find(page => page.current == true).cancelCurrent();
                this._pages.find(page => page.pageNumber == pageNum).setCurrent();
            }
            this.current = pageNum;
        }
    }

    /*
     * select组件改变pageSize
     * */
    private _changePageSize(pageSize) {
        if (this.pageSize != pageSize.value) {
            this._pageNumberInit = false;
            this.pageSize = pageSize.value;
            this.current = 1;
        }
    }

    /*
     * 渲染page按钮
     * */
    private _renderPages(): void {
        //计算总页数
        this._totalPage = Math.ceil(this.total / this.pageSize);
        if (isNaN(this._totalPage) || this._totalPage < 0) {
            this._totalPage = 0;
        }

        let pageNumbers = [];
        for (let i = 0; i < this._totalPage; i++) {
            pageNumbers.push(i + 1);
        }
        this._$pageNumbers = pageNumbers;

        //验证current合法性
        if (this.current <= 0 || this.current > this._totalPage) {
            this.current = 1;
        }

        this.callLater(() => {
            this._getFirstAndLastPage();
            this._setCurrentShow();
        });

        this._pageNumberInit = true;
    }

    public reset() {
        if(!this.inputs) return;
        this.inputs.forEach(input => input.value='');
    }

    ngOnInit() {
        super.ngOnInit();
        this._renderPages();
        // 国际化
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            this._translateService.use(langInfo.curLang);
            if (this._pageSizeOptions instanceof Array && this._pageSizeOptions.length) {
                this.pageSizeOptions = this._pageSizeOptions.reduce((arr, option) => {
                    arr.push(option.value);
                    return arr;
                }, []);
            }
            if (this._$pageSize) {
                this._$pageSize = {
                    value: this._$pageSize.value,
                    label: this._$pageSize.value + '/' + this._translateService.instant('pagination.page')
                }
            }
        });
    }

    ngAfterViewInit() {
        this._pages.changes.subscribe(() => {
            this.callLater(() => {
                //之前的上五页和下五页按钮居然有残留
                this._pages.forEach(page => {
                    page.showPrev = false;
                    page.showNext = false;
                    page.current = false;
                });

                this._getFirstAndLastPage();
                this._setCurrentShow();
            });
        });
    }
}

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-paging-item, j-paging-item',
    templateUrl: 'page.html',
    host: {
        '(click)': '_onClick()',
        '[class.jigsaw-page-current]': 'current',
        '[class.jigsaw-page-hidden]': '!_isShow',
        '[class.jigsaw-page-item]': 'true'
    }
})
export class JigsawPagingItem {
    public current: boolean = false;
    public showPrev: boolean = false;
    public showNext: boolean = false;

    private _isShow: boolean = false;
    private _pagination: JigsawPagination;

    @Input() public pageNumber: number;

    constructor(@Optional() pagination: JigsawPagination) {
        this._pagination = pagination;
    }

    private _onClick(): void {
        if (!this.current) {
            this._pagination.current = this.pageNumber;
        }
    }

    public setCurrent(): void {
        this.current = true;
    }

    public cancelCurrent(): void {
        this.current = false;
    }

    public show(): void {
        this._isShow = true;
    }

    public hide(): void {
        this._isShow = false;
    }

    private _prevPages(): void {
        event.stopPropagation();
        this._pagination.pagesPrev();
    }

    private _nextPages(): void {
        event.stopPropagation();
        this._pagination.pagesNext();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawSelectModule, JigsawInputModule, TranslateModule.forRoot()],
    declarations: [JigsawPagination, JigsawPagingItem],
    exports: [JigsawPagination],
    providers: [TranslateService],
})
export class JigsawPaginationModule {

    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'pagination', {
            zh: {
                page: "页",
                goto: '跳转'
            },
            en: {
                page: 'Page',
                goto: 'Goto'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }

}



