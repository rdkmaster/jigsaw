import { Component, ChangeDetectionStrategy, Injector, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


@Component({
    // templateUrl: './transfer-list.html',
    template: '<span>_$currentPageSelectedItems</span>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferListRenderer {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 宿主表格实例
     */
    public hostInstance: any;
}
@NgModule({
    declarations: [TransferListRenderer],
    imports: [CommonModule]
})
export class JigsawTransferRendererModule {

}
