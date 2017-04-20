import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"

@Component({
    template: `
        <input id="blockButton" type="button" value="blockButton"/>
        <input id="unblockButton" type="button" value="unblockButton"/>
        <div id="blockedID" class="blockMe" style="width: 50%;height: auto;
             line-height:20px;font-weight:bold;position: relative; zoom: 1;">
            <ng-template #insert></ng-template>
            <p>
                loading测试，loading传入的参数位空时，默认是
                全局loading，传入某个模块ViewContainerRef时，
                可以在单个模块进行loading；
            </p>
        </div>
    `
})
export class LoadingDemoComponent implements  AfterViewInit {
    @ViewChild('insert', {read: ViewContainerRef}) insert: ViewContainerRef;

    public _loadingservice: LoadingService;

    constructor(loadingservice: LoadingService) {
        this._loadingservice = loadingservice;
    }

    ngAfterViewInit() {
        $('#blockButton').click(() => {this._loadingservice.showLoading(this.insert);});
        $('#unblockButton').click(() => {this._loadingservice.hideLoading();});
    }
}
