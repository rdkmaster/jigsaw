import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"

@Component({
    template: `
        <input id="blockButton" type="button" value="blockButton"/>
        <input id="unblockButton" type="button" value="unblockButton"/>
        <div id="blockedID" class="blockMe" style="width: 50%;height: auto;
             line-height:20px;font-weight:bold;position: relative; zoom: 1;">
            <ng-template #insert></ng-template>
            <p>
                loading测试，loading传入的参数为空时，
                默认是 全局loading，传入某个模块ViewContainerRef时，
                可以在单个模块进行loading；如要覆盖默认样式，
                可以传入新的backgroundCss和contentCss类名，
                可以在根目录src/style.scss样式里定义。
            </p>
        </div>
    `
})
export class LoadingDemoComponent {
    @ViewChild('insert', {read: ViewContainerRef}) insert: ViewContainerRef;

    constructor(public loadingService: LoadingService) {
    }

    disposeBlock: Function;

    block() {
        this.disposeBlock = this.loadingService.show(this.insert);
    }

    unblock() {
        if (this.disposeBlock) this.disposeBlock();
    }
}
