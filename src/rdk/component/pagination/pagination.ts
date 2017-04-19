import {
    NgModule, Component, Input, Output, EventEmitter, OnInit,
    QueryList, ViewChildren, Optional, forwardRef, AfterViewInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {RdkSelectModule} from '../select/select';
import {RdkInputModule} from '../input/input';
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-pagination',
    templateUrl: 'pagination.html',
    styleUrls: ['pagination.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class RdkPagination extends AbstractRDKComponent implements OnInit, AfterViewInit {
    private _totalPage: number;
    private _pageNumbers: number[] = [];
    private _prevDisabled: boolean = false;
    private _nextDisabled: boolean = false;
    private _current: number;
    private _showPages: number[] = [];
    private _firstPage: RdkPagingItem;
    private _lastPage: RdkPagingItem;
    private _pageSizeOptions: any[];
    private _hostInit: boolean = false;

    // 当前页
    @Input()
    public get current(): number {
        return this._current
    };

    public set current(newValue: number) {
        if (this._current != newValue || this._hostInit) {
            this._current = newValue;
            //page显示形式
            this._pageShow(newValue);

            //prevPages nextPages 显示
            this._showPrevAndNextBtn();

            //prevPage nextPage 不可点
            this._canablePrevAndNext();

            this._hostInit ? this._hostInit = false : null;

            this.currentPageChange.emit(newValue);
        }
    }

    // private _defaultCurrent: number = 1;
    // // 默认当前页
    // @Input()
    // public get defaultCurrent(): number {
    //     return this._defaultCurrent;
    // }
    //
    // public set defaultCurrent(newValue: number) {
    //     if (this._defaultCurrent != newValue) {
    //         this._defaultCurrent = newValue;
    //     }
    // };

    @Input()
    public total: number; // 数据总数

    @Output()
    public pageSizeChange: EventEmitter<number> = new EventEmitter<number>(); // pageSize 变化的事件

    // TODO 国际化
    private _pageSize = {value: 10, label: '10/Page'};
    // 每页条数
    @Input()
    public get pageSize():number {
        return this._pageSize.value;
    }

    public set pageSize(newValue:number) {
        if (this._pageSize.value == newValue) {
            return;
        }
        this._pageSize.value = newValue;
        this._pageSize.label = newValue + '10/Page';
        this.pageSizeChange.emit(newValue);

        this._init();
    }

    private _init(): void {
        //计算总页数
        let _pageArr = [];
        this._totalPage = Math.ceil(this.total / this.pageSize);
        for (let i = 0; i < this._totalPage; i++) {
            _pageArr.push(i + 1);
        }
        console.log(this._pageNumbers);
        this._pageNumbers = _pageArr;
        console.log(this._pageNumbers);

        //判断上一页、下一页按钮可用性
        if (this._totalPage == 1) {
            this._prevDisabled = true;
            this._nextDisabled = true;
        }
    }

    @Input()
    public showPageSizeBox: boolean; // 是否可以改变pageSize

    // 指定每页可以显示多少条
    @Input()
    public get pageSizeOptions() {
        return this._pageSizeOptions
    }

    public set pageSizeOptions(newValue: number[]) {
        this._pageSizeOptions = [];
        newValue.forEach(num => {
            let option = {value: num, label: num + '/Page'};
            this._pageSizeOptions.push(option);
        });
    };

    @Input() public searchable: boolean = false; // 搜索功能开关

    @Input() public showQuickJumper: boolean = false; // 是否可以快速跳转至某页

    @Input() public size: string; // 当为「small」时，是小尺寸分页

    @Output() public currentPageChange: EventEmitter<any> = new EventEmitter<any>(); //页码改变的事件

    @ViewChildren(forwardRef(() => RdkPagingItem))
    private _pages: QueryList<RdkPagingItem> = null;

    /*
     * 根据page组件的当前选择改变current值
     * */
    public changeCurrent(pageTrigger): void {
        this._pages.forEach((page) => {
            if (page !== pageTrigger) {
                page.current = false;
            }
        });
        this.current = pageTrigger.page;
    }

    /*
     * 根据defaultCurrent改变current和page组件的当前选择
     * */
    private _changePage(): void {
        const page = this._pages.find(page => page.page == this.current);
        if (page) {
            page.setCurrent();
        }
        this._hostInit = true;
    }

    /*
     * 根据current控制page显示
     * */
    private _pageShow(pageNum): void {
        if (this._totalPage > 10) {
            if (pageNum <= 3) {
                this._showPages = [1, 2, 3, 4, 5, this._totalPage];
            } else if (pageNum >= this._totalPage - 2) {
                this._showPages = [1, this._totalPage - 4, this._totalPage - 3, this._totalPage - 2, this._totalPage - 1, this._totalPage];
            } else {
                this._showPages = [1, pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2, this._totalPage];
            }
            this._pages.forEach(page => {
                this._showPages.indexOf(page.page) != -1 ? page.show() : page.hide();
            });
        }else{
            this._pages.forEach(page => {
                page.show();
            });
        }
    }

    /*
     * 上一页
     * */
    private _pagePrev(): void {
        let pageCur = this._pages.find(page => page.current == true);
        if (!pageCur) return;
        let pageNum = pageCur.page;
        if (pageNum == 1) return;
        pageCur.cancleCurrent();
        pageNum -= 1;
        this._pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 下一页
     * */
    private _pageNext(): void {
        let pageCur = this._pages.find(page => page.current == true);
        if (!pageCur) return;
        let pageNum = pageCur.page;
        if (pageNum == this._totalPage) return;
        pageCur.cancleCurrent();
        pageNum += 1;
        this._pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 下五页
     * */
    public pagesNext(): void {
        let pageCur = this._pages.find(page => page.current == true);
        if (!pageCur) return;
        pageCur.cancleCurrent();
        let pageNum = pageCur.page;
        pageNum = pageNum + 5;
        if (pageNum > this._totalPage) pageNum = this._totalPage;
        this._pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 上五页
     * */
    public pagesPrev(): void {
        let pageCur = this._pages.find(page => page.current == true);
        if (!pageCur) return;
        pageCur.cancleCurrent();
        let pageNum = pageCur.page;
        pageNum = pageNum - 5;
        if (pageNum < 1) pageNum = 1;
        this._pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 显示上五页、下五页按钮
     * */
    private _showPrevAndNextBtn(): void {
        if (this._totalPage <= 10) {
            this._firstPage.showPrev = false;
            this._lastPage.showNext = false;
        }
        else if (this.current <= 4) {
            this._firstPage.showPrev = false;
            this._lastPage.showNext = true;
        }
        else if (this.current >= this._totalPage - 3) {
            this._firstPage.showPrev = true;
            this._lastPage.showNext = false;
        }
        else {
            this._firstPage.showPrev = true;
            this._lastPage.showNext = true;
        }
    }

    /*
     * 获取第一个和最后一个page组件实例
     * */
    private _getFirstAndLastPage(): void {
        this._firstPage = this._pages.find(page => page.page == 1);
        this._lastPage = this._pages.find(page => page.page == this._totalPage);
    }

    private _canablePrevAndNext(): void {
        if (this._current == 1) {
            this._prevDisabled = true;
            this._nextDisabled = false;
        } else if (this._current == this._totalPage) {
            this._nextDisabled = true;
            this._prevDisabled = false;
        } else {
            this._prevDisabled = false;
            this._nextDisabled = false;
        }
    }

    private _goto(pageNum): void {
        pageNum = parseInt(pageNum);
        if (pageNum <= this._totalPage && pageNum >= 1) {
            this._pages.find(page => page.current == true).cancleCurrent();
            this._pages.find(page => page.page == pageNum).setCurrent();
            this.current = pageNum;
        }
    }

    ngOnInit() {
        this._init();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            //获取第一个和最后一个page组件实例
            this._getFirstAndLastPage();
            //根据defaultCurrent设置page组件的选中状态
            this._changePage();
        }, 1);
        this._pages.changes.subscribe(() => {
            setTimeout(() => {
                //之前的上五页和下五页按钮居然有残留
                this._pages.forEach(page => {
                    page.showPrev = false;
                    page.showNext = false;
                    page.current = false;
                });

                //获取第一个和最后一个page组件实例
                this._getFirstAndLastPage();
                //根据defaultCurrent设置page组件的选中状态
                this._changePage();
            }, 1);
        });
    }

}

@Component({
    selector: 'rdk-paging-item',
    templateUrl: 'page.html',
    styleUrls: ['page.scss'],
    host: {
        '(click)': '_onClick()',
        '[class.rdk-page-current]': 'current',
        '[class.rdk-page-hidden]': '!_isShow',
    }
})
export class RdkPagingItem {
    public current: boolean = false;
    public showPrev: boolean = false;
    public showNext: boolean = false;

    private _isShow: boolean = false;
    private _pagination: RdkPagination;

    @Input() public page: number;

    constructor(@Optional() pagination: RdkPagination) {
        this._pagination = pagination;
    }

    private _onClick(): void {
        if (!this.current) {
            this.setCurrent();
            this._pagination.changeCurrent(this);
        }
    }

    public setCurrent(): void {
        this.current = true;
    }

    public cancleCurrent(): void {
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
    imports: [CommonModule, FormsModule, RdkSelectModule, RdkInputModule],
    declarations: [RdkPagination, RdkPagingItem],
    exports: [RdkPagination]
})
export class RdkPaginationModule {

}



