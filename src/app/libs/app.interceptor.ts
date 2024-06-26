import {Injectable} from "@angular/core";
import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {
    CommonUtils,
    DataFilterInfo,
    getStaticDistinctColumnData,
    InternalUtils,
    PagingInfo,
    RawTableData,
    TableData,
    TableDataMatrix
} from "jigsaw/public_api"
import {filterWithKeyword} from "../../jigsaw/common/core/data/unified-paging/extra";

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
    // 用于控制文件上传失败率，从而模拟出更逼真的上传效果，取值[0,100]越大失败的概率越高
    public static uploadFailureRate = 30;
    private static _processors: any[] = [];

    public static registerProcessor(urlPattern: RegExp | string, processor: (req: HttpRequest<any>) => any, context?: any) {
        this._processors.push({urlPattern, processor, context});
    }

    constructor() {
        AjaxInterceptor.registerProcessor('/rdk/service/app/common/paging', this.dealServerSidePagingRequest, this);
        AjaxInterceptor.registerProcessor('/direct/pageable/table-data/simulation', this.dealDirectServerPagingRequest, this);
        AjaxInterceptor.registerProcessor(/\bmock-data\/.+$/, req => MockData.get(req.url));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/app/for-external/demo/')) {
            console.log('forwarding the request to the server:', req.url);
            return next.handle(req);
        }

        console.log('the ajax request is intercepted, here is the original request:');
        console.log(req);

        const processor = AjaxInterceptor._processors.find(p => {
                const url = p.urlPattern;
                return url instanceof RegExp ? url.test(req.url) : url === req.url;
            });
        if (processor) {
            const body = CommonUtils.safeInvokeCallback(processor.context, processor.processor, [req]);
            return this.createResult(body, req.url);
        } else if (req.url == '/rdk/service/common/upload') {
            return this.dealServerSideUploadRequest(req);
        } else if (req.url.includes('app/for-external/')) {
            return next.handle(req);
        } else {
            console.error('no mock data processor found, forwarding the request to the server...');
            return next.handle(req);
        }
    }

    /**
     * Simulate XHR behavior which would provide this information in a ProgressEvent
     * @param req
     */
    dealServerSideUploadRequest(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        console.group('All additional fields within the current upload request:');
        const entries = req.body.entries();
        let entry = entries.next();
        while (!entry.done) {
            console.log(entry.value[0], ':', entry.value[1]);
            entry = entries.next();
        }
        console.groupEnd();

        const filename = decodeURIComponent(req.body.get('filename'));
        const url = `upload_files/${uuidv4()}/${filename}`;
        const file = req.body.get('file');
        if (!file) {
            return new Observable<HttpEvent<any>>(subscriber => {
                // simulate network latency
                setTimeout(() => {
                    const resp = new HttpResponse({body: url, url: url, status: 200});
                    subscriber.next(resp);
                    subscriber.complete();
                }, InternalUtils.randomNumber(300, 2000));
            });
        }

        const total = file.size;
        const chunkSize = Math.ceil(total / 5);

        return new Observable<HttpEvent<any>>(observer => {
            // notify the event stream that the request was sent.
            observer.next({type: HttpEventType.Sent});

            const random = InternalUtils.randomNumber(1, 99);
            if (random <= AjaxInterceptor.uploadFailureRate) {
                // 模拟失败
                const statusTexts = [
                    "Bad Request", "Unauthorized", "Payment Required", "Forbidden",
                    "Not Found", "Method Not Allowed", "Not Acceptable"
                ];
                const r = InternalUtils.randomNumber(0, statusTexts.length - 1);
                observer.error({
                    error: 'Failed to upload, random = ' + random,
                    headers: new HttpHeaders(), name: "HttpErrorResponse",
                    message: 'Failed to upload, random = ' + random,
                    ok: false, status: 500, statusText: statusTexts[r], url: ''
                });
                return;
            }

            // 模拟成功
            const uploadLoop = (loaded: number) => {
                // N.B.: Cannot use setInterval or rxjs delay (which uses setInterval)
                // because e2e test won't complete. A zone thing?
                // Use setTimeout and tail recursion instead.
                setTimeout(() => {
                    // 模拟成功
                    loaded += InternalUtils.randomNumber(chunkSize * 0.5, chunkSize * 1.5);
                    loaded = Math.min(loaded, total);

                    const progressEvent: HttpProgressEvent = {
                        type: HttpEventType.UploadProgress, loaded, total
                    };
                    observer.next(progressEvent);

                    if (loaded >= total) {
                        const doneResponse = new HttpResponse({status: 200, body: url});
                        observer.next(doneResponse);
                        observer.complete();
                        return;
                    }
                    uploadLoop(loaded);
                }, InternalUtils.randomNumber(300, 2000));
            }
            uploadLoop(0);
        });
    }

    dealServerSidePagingRequest(req: HttpRequest<any>): any {
        if (req.body?.requestFor == 'distinct-column-data') {
            return this._queryDistinctColumnData(req);
        } else {
            return this._queryPagingData(req);
        }
    }

    private _queryDistinctColumnData(req: HttpRequest<any>): string[] {
        // 在这里模拟统一分页的获取列数据的代码
        const field = req.body.field;
        const peerParam = req.body.key.peerParam;
        const service = req.body.key.service;
        const filterInfo = req.body.filterInfo;
        return PageableData.getDistinctColumnData({ service, field, peerParam, filterInfo })
    }

    private _queryPagingData(req: HttpRequest<any>): any {
        const params = req.method.toLowerCase() == 'post' ? 'body' : 'params';
        const service = this.getParamValue(req, params, 'service');
        let paging = this.getParamValue(req, params, 'paging') ? this.getParamValue(req, params, 'paging') : null;
        paging = typeof paging === 'string' ? JSON.parse(paging) : paging;
        let filter = this.getParamValue(req, params, 'filter') ? this.getParamValue(req, params, 'filter') : null;
        filter = typeof filter === 'string' ? JSON.parse(filter) : filter;
        let sort = this.getParamValue(req, params, 'sort') ? this.getParamValue(req, params, 'sort') : null;
        sort = typeof sort === 'string' ? JSON.parse(sort) : sort;
        return PageableData.get({service, paging, filter, sort});
    }

    dealDirectServerPagingRequest(req: HttpRequest<any>): any {
        // 这里根据req里的参数，做出过滤
        if (req.params.get('requestFor') == 'distinct-column-data') {
            console.log('request for distinct column data, field:', req.params.get('field'),
                'filterInfo:', req.params.get('filterInfo'));
            const field = req.params.get('field');
            const filterInfo: DataFilterInfo = JSON.parse(req.params.get('filterInfo'));
            const dataTable = MockData.get('mock-data/hr-list');
            return getStaticDistinctColumnData(field, dataTable.field, filterInfo, dataTable.data);
        }

        let paging = req.body?.paging ? req.body.paging : null;
        paging = typeof paging === 'string' ? JSON.parse(paging) : paging;
        let filter = req.body?.filter ? req.body.filter : null;
        filter = typeof filter === 'string' ? JSON.parse(filter) : filter;
        const dataTable = MockData.get('mock-data/hr-list');
        let data: TableDataMatrix;
        if (CommonUtils.isDefined(filter)) {
            data = filterWithKeyword(dataTable.data, filter.key, filter.field, dataTable.field, filter.headerFilters);
        } else {
            data = dataTable.data.concat();
        }

        const pagingInfo: PagingInfo = new PagingInfo();
        pagingInfo.totalRecord = data.length;

        if (CommonUtils.isDefined(paging)) {
            pagingInfo.pageSize = PageableData.fixPageSize(paging.pageSize);
            pagingInfo.currentPage = PageableData.fixCurrentPage(paging.currentPage, pagingInfo);
            data = PageableData.paging(data, pagingInfo);
        } else {
            console.error('need a "paging" property!');
        }

        const result: RawTableData = {data: [], field: [], header: []};
        result.data = data;
        result.paging = pagingInfo.valueOf();
        result.field = dataTable.field;
        result.header = dataTable.header;
        return result;
    }

    getParamValue(req: HttpRequest<any>, params: string, key: string): any {
        const p = req[params];
        return req.method.toLowerCase() == 'post' ? p[key] : p.get(key);
    }

    createResult(body: any, url: string): Observable<HttpEvent<any>> {
        console.log('and here is the simulated response data:');
        console.log(body);
        return new Observable<HttpEvent<any>>(subscriber => {
            // simulate network latency
            setTimeout(() => {
                if (CommonUtils.isDefined(body)) {
                    const resp = new HttpResponse({body: body, url: url, status: 200});
                    subscriber.next(resp);
                    subscriber.complete();
                } else {
                    subscriber.error({
                        error: '<!DOCTYPE html>\n' +
                            '<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
                            '<title>Error</title>\n</head>\n<body>\n' +
                            '<pre>Cannot GET ' + url + '</pre>\n</body>\n</html>\n',
                        headers: new HttpHeaders(), name: "HttpErrorResponse",
                        message: "ajax interceptor can not find data for " + url,
                        ok: false, status: 404, statusText: "Not Found", url: url
                    });
                }
            }, InternalUtils.randomNumber(300, 2000));
        });
    }
}

class PageableData {
    static get(req) {
        const result: any = new TableData([], [], []);
        if (!req.service) {
            console.error('bad argument, need a "service" property!');
            return result;
        }

        const dataTable = MockData.get(req.service);
        if (!dataTable) {
            return null;
        }

        let data;
        if (CommonUtils.isDefined(req.filter)) {
            data = this.filter(dataTable, req.filter);
        } else {
            //浅拷贝一份
            data = dataTable.data.concat();
        }

        if (CommonUtils.isDefined(req.sort)) {
            if (data.length > 0) {
                //sort会改变原数据
                this.sort(data, dataTable.field.indexOf(req.sort.field),
                    req.sort.as, req.sort.order === 'desc' ? -1 : 1);
            } else {
                console.warn('empty data array, unnecessary to sort');
            }
        }

        const pagingInfo: PagingInfo = new PagingInfo();
        pagingInfo.pageSize = this.fixPageSize(req.paging.pageSize);
        pagingInfo.totalRecord = data.length;
        pagingInfo.currentPage = this.fixCurrentPage(req.paging.currentPage, pagingInfo);

        if (CommonUtils.isDefined(req.paging)) {
            data = this.paging(data, pagingInfo);
        } else {
            console.error('need a "paging" property!');
            data = [];
        }

        result.data = data;
        result.paging = pagingInfo.valueOf();
        result.field = dataTable.field;
        result.header = dataTable.header;
        return result;
    }

    static getDistinctColumnData(req: { service: string, field: string, peerParam: any, filterInfo: DataFilterInfo }): string[] {
        const result = [];
        if (!req.service) {
            console.error('bad argument, need a "service" property!');
            return result;
        }

        const dataTable = MockData.get(req.service);
        return getStaticDistinctColumnData(req.field, dataTable.field, req.filterInfo, dataTable.data);
    }

    static sort(data, index, sortAs, order) {
        if (index == -1) {
            console.warn('unknown which field to sort!');
            return;
        }
        console.log('sort param: index = [', index, '] sortAs = [', sortAs, '] order = [', order, ']');

        let sortBy;
        if (sortAs == 'number' || sortAs == 'int' || sortAs == 'float') {
            sortBy = sortAsNumber;
        } else if (sortAs == 'string') {
            sortBy = sortAsString;
        } else if (sortAs == 'date') {
            sortBy = sortAsString;
        } else if (!sortAs) {
            //自动检测
            sortBy = isNaN(Number(data[0][index])) ? sortAsString : sortAsNumber;
        } else {
            try {
                //应用自定义排序算法
                sortBy = eval(sortAs);
            } catch (e) {
            }
            if (!(sortBy instanceof Function)) {
                console.warn('invalid sort function, sorting as string...');
                sortBy = sortAsString;
            }
        }
        data.sort(sortBy);

        function sortAsNumber(a, b) {
            return order * (a[index] - b[index]);
        }

        function sortAsString(a, b) {
            return order * (a[index].localeCompare(b[index]));
        }
    }

    static filter(dataTable, filter) {
        return filter.hasOwnProperty('rawFunction') && !!filter.rawFunction ?
            this.filterWithFunction(dataTable.data, filter.rawFunction, filter.context) :
            filterWithKeyword(dataTable.data, filter.key, filter.field, dataTable.field, filter.headerFilters);
    }

    static filterWithFunction(data: TableDataMatrix, rawFunction: Function, context: any): TableDataMatrix {
        let func;
        try {
            func = eval('(' + rawFunction + ')');
        } catch (e) {
            console.error('eval raw filter function error, detail: ' + e.message);
            return data;
        }
        if (!(func instanceof Function)) {
            console.warn('invalid filter function, it is not a function.');
            return data;
        }
        try {
            return data.filter(func.bind(context));
        } catch (e) {
            console.error('filter width function error, detail: ' + e.message);
            return data;
        }
    }

    static paging(data, pagingInfo) {
        const currentPage = pagingInfo.currentPage;
        const pageSize = pagingInfo.pageSize;
        console.log('paging param: currentPage = [', currentPage, '] pageSize = [', pageSize, ']');

        const page = [];
        for (let i = (currentPage - 1) * pageSize, size = currentPage * pageSize; i < size && i < data.length; i++) {
            page.push(data[i]);
        }
        return page;
    }

    static fixCurrentPage(currentPage, pagingInfo) {
        currentPage = typeof currentPage !== 'number' || currentPage < 1 ? 1 : currentPage;
        const pageSize = pagingInfo.pageSize;
        if (currentPage * pageSize - pageSize > pagingInfo.totalRecord) {
            //应用给的当前页过大，调整为最后一页
            console.warn('adjust currentPage[' + currentPage + '] to lastPage[' + pagingInfo.totalPage + ']');
            currentPage = pagingInfo.totalPage;
        }
        return currentPage;
    }

    static fixPageSize(pageSize) {
        return typeof pageSize !== 'number' || pageSize < 1 ? 100 : pageSize;
    }
}

export class MockData {
    static dataSet: any;

    static get(url): any {
        this.initDataSet();
        const match = url.match(/\bmock-data\/(.*)$/);
        return match ? this.dataSet[match[1]] : null;
    }

    static initDataSet() {
        if (CommonUtils.isDefined(this.dataSet)) {
            return;
        }
        this.dataSet = {};
        // 模拟rest服务的数据
        this.dataSet['big-table-data'] = this.createBigTableData();
        this.dataSet['cities'] = require('../mock-data/cities.json');
        this.dataSet['core-members'] = require('../mock-data/core-members.json');
        this.dataSet['countries'] = require('../mock-data/countries.json');
        this.dataSet['marketing'] = require('../mock-data/marketing.json');
        this.dataSet['hr-list-full'] = require('../mock-data/hr-list-full.json');
        this.dataSet['hr-list'] = require('../mock-data/hr-list.json');
        this.dataSet['hr-list-short'] = require('../mock-data/hr-list-short.json');
        this.dataSet['hr-list-complex'] = require('../mock-data/hr-list-complex.json');
        this.dataSet['fish-bone-1'] = require('../mock-data/fish-bone-1.json');
        this.dataSet['fish-bone-2'] = require('../mock-data/fish-bone-2.json');
        this.dataSet['tree-data'] = require('../mock-data/tree-data.json');
        this.dataSet['soduku-puzzles'] = require('../mock-data/soduku-puzzles.json');
        this.dataSet['map/shanghai'] = require('echarts/map/json/province/shanghai.json');
        this.dataSet['map/china'] = require('echarts/map/json/china.json');
        this.dataSet['big-data-for-paging'] = this.createBigTableData(50000, 4);

        // 静态文件引用数据
        this.dataSet['provinces.json'] = require('app/mock-data/provinces.json');
        this.dataSet['cities.json'] = require('app/mock-data/cities.json');
        this.dataSet['districts.json'] = require('app/mock-data/districts.json');
    }

    static createBigTableData(rowLength = 5000, colLength = 200): RawTableData {
        const rtd: RawTableData = {field: [], header: [], data: []};
        for (let i = 0; i < colLength; i++) {
            rtd.field.push('field-' + i);
            rtd.header.push('header-' + i);
        }
        for (let i = 0; i < rowLength; i++) {
            const row = [];
            rtd.data.push(row);
            for (let j = 0; j < 200; j++) {
                row.push(`data-${i}-${j}`);
            }
        }
        return rtd;
    }
}
