import {Component, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"

@Component({
    template: `
        <button (click)="block1()">block</button>
        <button (click)="unblock1()">unblock</button>
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

        <button (click)="block2()">block</button>
        <button (click)="unblock2()">unblock</button>
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

        <button (click)="globalBlock()">global block</button>
    `,
    //给rdk的组件设置样式的时候，最好设置encapsulation为None
    //当然添加在根目录下的styles.scss中也可以，当然不推荐
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['style.scss']
})
export class LoadingSetclassDemoComponent {
    @ViewChild('insert', {read: ViewContainerRef}) insert: ViewContainerRef;
    @ViewChild('insert2', {read: ViewContainerRef}) insert2: ViewContainerRef;

    constructor(public loadingService: LoadingService) {
    }

    disposeBlock1: Function;

    block1() {
        this.disposeBlock1 = this.loadingService.show(this.insert, "rdk-loading-content-test", "rdk-loading-background-test");
    }

    unblock1() {
        if (this.disposeBlock1) this.disposeBlock1();
    }

    disposeBlock2: Function;

    block2() {
        this.disposeBlock2 = this.loadingService.show(this.insert2);
    }

    unblock2() {
        if (this.disposeBlock2) this.disposeBlock2();
    }

    globalBlock() {
        const dispose = this.loadingService.show();
        setTimeout(() => dispose(), 2000);
    }
}
