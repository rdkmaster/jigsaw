import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {LoadingData, LoadingService} from "../../../../../service/loading.service"

@Component({
    template: `
        <input id="blockButton" type="button" value="blockButton"/>
        <input id="unblockButton" type="button" value="unblockButton"/>
        <div id="blockedID" class="blockMe" style="width: 50%;height: auto;
             line-height:20px;font-weight:bold;position: relative; zoom: 1;">
            <ng-template #insert></ng-template>
            <p>
                loading测试，loading传入的参数为空时，默认是
                全局loading，传入某个模块ViewContainerRef时，
                可以在单个模块进行loading；如要覆盖默认样式，
                可以传入新的backgroundCss和contentCss类名，
                可以在根目录src/style.scss样式里定义。
            </p>
        </div>
        <br/>
        <input id="blockButton2" type="button" value="blockButton2"/>
        <input id="unblockButton2" type="button" value="unblockButton2"/>
        <div id="blockedID2" class="blockMe" style="width: 50%;height: auto;
             line-height:20px;font-weight:bold;position: relative; zoom: 1;">
            <ng-template #insert2></ng-template>
            <p>
                loading测试，loading传入的参数为空时，默认是
                全局loading，传入某个模块ViewContainerRef时，
                可以在单个模块进行loading；如要覆盖默认样式，
                可以传入新的backgroundCss和contentCss类名，
                可以在根目录src/style.scss样式里定义。
            </p>
        </div>

        <input id="blockButton3" type="button" value="全局loading"/>
    `
})
export class LoadingSetclassDemoComponent implements  AfterViewInit {
    @ViewChild('insert', {read: ViewContainerRef}) insert: ViewContainerRef;
    @ViewChild('insert2', {read: ViewContainerRef}) insert2: ViewContainerRef;

    public _loadingservice: LoadingService;

    constructor(loadingservice: LoadingService) {
        this._loadingservice = loadingservice;
    }

    ngAfterViewInit() {

        $('#blockButton').click(() => {
            let loadingdata=new LoadingData();
            loadingdata.backgroundCss="rdk-loading-background-test";
            loadingdata.contentCss="rdk-loading-content-test";
            this._loadingservice.showLoading(this.insert,loadingdata);});
        $('#unblockButton').click(() => {this._loadingservice.hideLoading(this.insert);});

        $('#blockButton2').click(() => {
            this._loadingservice.showLoading(this.insert2);});
        $('#unblockButton2').click(() => {this._loadingservice.hideLoading(this.insert2);});
        $('#blockButton3').click(() => {
            this._loadingservice.showLoading();
        setTimeout(()=>{ this._loadingservice.hideLoading();},2000)});
    }
}
