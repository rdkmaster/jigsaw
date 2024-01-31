import {
    Directive,
    Injector,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    Component,
    Input,
    NgModule,
} from "@angular/core"
import {CommonModule} from "@angular/common";
import {RequireMarkForCheck} from "../../../common/decorator/mark-for-check";
import {JigsawTrustedHtmlModule} from "../../../common/directive/trusted-html/trusted-html";
import {JigsawTagModule} from "../../tag/tag";

@Directive()
export class DisplayRendererBase implements OnInit, OnDestroy {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: any;

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}


@NgModule({
    declarations: [],
    imports: [CommonModule, JigsawTrustedHtmlModule]
})
export class JigsawDisplayRendererModule {
}
