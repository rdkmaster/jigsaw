import { Component, NgModule, Input, ChangeDetectionStrategy, Injector } from "@angular/core";
import { AbstractJigsawComponent } from '../../common/common';
import { CommonModule } from '@angular/common';
import { RequireMarkForCheck } from '../../common/decorator/mark-for-check';

@Component({
    selector: 'jigsaw-status, j-status',
    templateUrl: 'status.html',
    host: {
        '[class.jigsaw-status-host]': 'true',
        '[class.jigsaw-status-custom]': 'status === "custom"',
        '[class.jigsaw-status-success]': 'status === "success"',
        '[class.jigsaw-status-warning]': 'status === "warning"',
        '[class.jigsaw-status-error]': 'status === "error"',
        '[class.jigsaw-status-finish]': 'status === "finish"',
        '[class.jigsaw-status-disabled]': 'status === "disabled"',
        '[class.jigsaw-status-process]': 'status === "process"',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawStatus extends AbstractJigsawComponent {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }
    /**
     * 预设状态 'success' , 'warning' , 'error' , 'complete' , 'disabled' , 'custom' , 'running'
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public status: 'success' | 'warning' | 'error' | 'finish' | 'disabled' | 'custom' | 'process' = 'custom';

    /**
     * 图标类型 iconfont iconfont-xxx
     */
    @RequireMarkForCheck()
    @Input()
    public icon: string = 'iconfont iconfont-e9f1';

    /**
    * 图标颜色
    */
    @RequireMarkForCheck()
    @Input()
    public iconColor: string = 'inherit';
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawStatus],
    exports: [JigsawStatus]
})
export class JigsawStatusModule {

}