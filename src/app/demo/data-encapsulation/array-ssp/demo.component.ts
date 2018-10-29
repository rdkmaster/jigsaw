import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableArray} from "jigsaw/core/data/array-collection";


@Component({
    templateUrl: './demo.component.html', styles: ['.alert {color: red;}']
})
export class ArrayServerSidePaginationDemoComponent {
    pageable: PageableArray;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(http: HttpClient) {
        this.pageable = new PageableArray(http,
            {
                url: 'mock-data/countries',
                params: {aa: 11, bb: 22}
            });
        this.pageable.onAjaxSuccess(this.onAjaxSuccess, this);
        this.pageable.onAjaxError(this.onAjaxError, this);
        this.pageable.pagingInfo.pageSize = 20;
    }

    keyword: string;
    regExp: string;

    regExpFilter() {
        // 这里需要特别注意，filter函数的执行是在服务端，而非在浏览器！
        // this.pageable.filter的第二个参数context是这个filter的执行上下文，它将会一起传输给服务端，
        // 因此这里需要注意控制context的值里只包含有用的数据，以加快前后端通信速度
        const filter = function(item) {
            return item[0].match(new RegExp(this.reg, 'g'));
        };
        const context = {reg: this.regExp};
        this.pageable.filter(filter, context);
    }

    onAjaxSuccess(data): void {
        this.ready = true;
    }

    onAjaxError(err): void {
        this.ready = false;
        this.errorInfo = err;
    }

    start() {
        this.errorInfo = '';
        this.pageable.fromAjax();
    }

    previousPage() {
        this.pageable.previousPage();
    }

    nextPage() {
        this.pageable.nextPage();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'PageableArray', 'IAjaxComponentData.busy', 'AbstractGeneralCollection.busy',
        'ArrayCollection.busy', 'BigTableData.busy'
    ];
}
