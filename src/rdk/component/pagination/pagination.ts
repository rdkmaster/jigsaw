import {
    NgModule, Component, Input, Output, EventEmitter, OnInit, ElementRef, Renderer,
    QueryList, ViewChildren, Optional, forwardRef, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SelectModule} from '../select/select';
import {InputModule} from '../input/input';

@Component({
    selector: 'rdk-paging',
    templateUrl: 'pagination.html',
    styleUrls: ['pagination.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {
    totalPage: number; // 总页数
    pageArr: number[] = [];
    prevDisabled: boolean = false;
    nextDisabled: boolean = false;
    _current: number;
    _defaultCurrent: number;
    showPages: number[] = [];
    firstPage: PageComponent;
    lastPage: PageComponent;
    _pageSizeOptions: any[];
    _pageSize: number;
    initing: boolean = false;

    @Input() get current() {
        return this._current
    }; // 当前页
    set current(newValue) {
        if (this._current != newValue || this.initing) {
            this._current = newValue;
            //page显示形式
            this.pageShow(newValue);

            //prevPages nextPages 显示
            this.showPrevAndNextBtn();

            //prevPage nextPage 不可点
            this.canablePrevAndNext();

            this.initing ? this.initing = false : null;

            this.change.emit(newValue);
        }
    }

    @Input() get defaultCurrent() {
        return this._defaultCurrent;
    }

    set defaultCurrent(newValue) {
        if (this._defaultCurrent != newValue) {
            this._defaultCurrent = newValue;
        }
    }; // 默认当前页
    @Input() total: number; // 数据总数
    @Input() get pageSize() {
        return this._pageSize
    }

    set pageSize(newValue) {
        if (this._pageSize != newValue) {
            this._pageSize = newValue;
            this.init();
        }
    }; // 每页条数
    @Input() showSizeChanger: boolean; // 是否可以改变pageSize
    @Input() get pageSizeOptions() {
        return this._pageSizeOptions
    };

    set pageSizeOptions(newValue: number[]) {
        this._pageSizeOptions = [];
        newValue.forEach(num => {
            let option = {value: num, viewValue: num + '/Page'};
            this._pageSizeOptions.push(option);
        });
    }; // 指定每页可以显示多少条

    @Input() searchable: boolean; // 搜索功能开关
    @Input() showQuickJumper: boolean; // 是否可以快速跳转至某页

    @Input() size: string; // 当为「small」时，是小尺寸分页
    @Input() simple: boolean; // 当添加该属性时，显示为简单分页

    @Output() change: EventEmitter<any> = new EventEmitter<any>(); //页码改变的事件
    @Output() onShowSizeChange: EventEmitter<any> = new EventEmitter<any>(); // pageSize 变化的事件

    @ViewChildren(forwardRef(() => PageComponent)) pages: QueryList<PageComponent>;

    constructor(private _cdRef: ChangeDetectorRef) {

    }

    /*
     * 根据page组件的当前选择改变current值
     * */
    changeCurrent(pageTrigger) {
        this.pages.forEach((page) => {
            if (page !== pageTrigger) {
                page.current = false;
            }
        });
        this.current = pageTrigger.page;
    }

    /*
     * 根据defaultCurrent改变current和page组件的当前选择
     * */
    changePage() {
        this.pages.find(page => page.page == this.defaultCurrent).setCurrent();
        this.initing = true;
        this.current = this.defaultCurrent;
    }

    /*
     * 根据current控制page显示
     * */
    pageShow(pageNum) {
        if (this.totalPage > 10) {
            if (pageNum <= 3) {
                this.showPages = [1, 2, 3, 4, 5, this.totalPage];
            } else if (pageNum >= this.totalPage - 2) {
                this.showPages = [1, this.totalPage - 4, this.totalPage - 3, this.totalPage - 2, this.totalPage - 1, this.totalPage];
            } else {
                this.showPages = [1, pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2, this.totalPage];
            }
            this.pages.forEach(page => {
                this.showPages.indexOf(page.page) != -1 ? page.show() : page.hide();
            });
        }
    }

    /*
     * 上一页
     * */
    pagePrev() {
        let pageCur = this.pages.find(page => page.current == true);
        if (!pageCur) return;
        let pageNum = pageCur.page;
        if (pageNum == 1) return;
        pageCur.cancleCurrent();
        pageNum -= 1;
        this.pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 下一页
     * */
    pageNext() {
        let pageCur = this.pages.find(page => page.current == true);
        if (!pageCur) return;
        let pageNum = pageCur.page;
        if (pageNum == this.totalPage) return;
        pageCur.cancleCurrent();
        pageNum += 1;
        this.pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 下五页
     * */
    pagesNext() {
        let pageCur = this.pages.find(page => page.current == true);
        if (!pageCur) return;
        pageCur.cancleCurrent();
        let pageNum = pageCur.page;
        pageNum = pageNum + 5;
        if (pageNum > this.totalPage) pageNum = this.totalPage;
        this.pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 上五页
     * */
    pagesPrev() {
        let pageCur = this.pages.find(page => page.current == true);
        if (!pageCur) return;
        pageCur.cancleCurrent();
        let pageNum = pageCur.page;
        pageNum = pageNum - 5;
        if (pageNum < 1) pageNum = 1;
        this.pages.find(page => page.page == pageNum).setCurrent();
        this.current = pageNum;
    }

    /*
     * 显示上五页、下五页按钮
     * */
    showPrevAndNextBtn() {
        if (this.totalPage <= 10) {
            this.firstPage.showPrev = false;
            this.lastPage.showNext = false;
        }
        else if (this.current <= 4) {
            this.firstPage.showPrev = false;
            this.lastPage.showNext = true;
        }
        else if (this.current >= this.totalPage - 3) {
            this.firstPage.showPrev = true;
            this.lastPage.showNext = false;
        }
        else {
            this.firstPage.showPrev = true;
            this.lastPage.showNext = true;
        }

    }

    /*
     * 获取第一个和最后一个page组件实例
     * */
    getFirstAndLastPage() {
        this.firstPage = this.pages.find(page => page.page == 1);
        this.lastPage = this.pages.find(page => page.page == this.totalPage);
    }

    canablePrevAndNext() {
        if (this._current == 1) {
            this.prevDisabled = true;
            this.nextDisabled = false;
        } else if (this._current == this.totalPage) {
            this.nextDisabled = true;
            this.prevDisabled = false;
        } else {
            this.prevDisabled = false;
            this.nextDisabled = false;
        }
    }

    init() {
        //计算总页数
        let pageArr = [];
        this.totalPage = Math.ceil(this.total / this.pageSize);
        for (let i = 0; i < this.totalPage; i++) {
            pageArr.push(i + 1);
        }
        this.pageArr = pageArr;
        //判断上一页、下一页按钮可用性
        if (this.totalPage == 1) {
            this.prevDisabled = true;
            this.nextDisabled = true;
        }
        //没有输入defaultCurrent时，设置defaultCurrent默认值
        !this.defaultCurrent ? this.defaultCurrent = 1 : null;
    }

    goto(pageNum) {
        pageNum = parseInt(pageNum);
        if(pageNum <= this.totalPage && pageNum >= 1){
            this.pages.find(page => page.current == true).cancleCurrent();
            this.pages.find(page => page.page == pageNum).setCurrent();
            this.current = pageNum;
        }
    }

    ngOnInit() {
        if (!this.pageSize) {
            this.pageSize = 10;
            this.init();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            //获取第一个和最后一个page组件实例
            this.getFirstAndLastPage();
            //根据defaultCurrent设置page组件的选中状态
            this.changePage();
        }, 1);
        this.pages.changes.subscribe(() => {
            setTimeout(() => {
                //之前的上五页和下五页按钮居然有残留
                this.pages.forEach(page => {
                    page.showPrev = false;
                    page.showNext = false;
                });

                //获取第一个和最后一个page组件实例
                this.getFirstAndLastPage();
                //根据defaultCurrent设置page组件的选中状态
                this.changePage();
            }, 1);
        });
    }

}

@Component({
    selector: 'rdk-paging-item',
    templateUrl: 'page.html',
    styleUrls: ['page.scss'],
    host: {
        '(click)': 'onClick()',
        '[class.page-current]': 'current',
        '[class.page-hidden]': '!isShow',
    }
})
export class PageComponent {
    current: boolean = false;
    isShow: boolean = false;
    showPrev: boolean = false;
    showNext: boolean = false;

    @Input() page: number;

    pagination: PaginationComponent;

    constructor(@Optional() pagination: PaginationComponent, public cdRef: ChangeDetectorRef) {
        this.pagination = pagination;
    }

    onClick() {
        if (!this.current) {
            this.setCurrent();
            this.pagination.changeCurrent(this);
        }
    }

    setCurrent() {
        this.current = true;
    }

    cancleCurrent() {
        this.current = false;
    }

    show() {
        this.isShow = true;
    }

    hide() {
        this.isShow = false;
    }

    prevPages() {
        event.stopPropagation();
        this.pagination.pagesPrev();
    }

    nextPages() {
        event.stopPropagation();
        this.pagination.pagesNext();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, SelectModule, InputModule],
    declarations: [PaginationComponent, PageComponent],
    exports: [PaginationComponent]
})
export class PaginationModule {

}



