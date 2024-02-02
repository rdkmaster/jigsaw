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
import { CommonModule } from "@angular/common";
import { RequireMarkForCheck } from "../../../common/decorator/mark-for-check";
import { JigsawTrustedHtmlModule } from "../../../common/directive/trusted-html/trusted-html";
import { JigsawTagModule } from "../../tag/tag";
import { JigsawTableModule } from "../../table/table";
import { JigsawGraphModule } from "../../graph/index";
import { AbstractGraphData, GraphData } from "../../../common/core/data/graph-data";
import { TableData } from "../../../common/core/data/table-data";

@Directive()
export class AutoDisplayRendererBase implements OnInit, OnDestroy {
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

/**
 * @internal
 * */
@Component({
    templateUrl: './auto-display-table.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDisplayTableRenderer extends AutoDisplayRendererBase {
    public _$data: TableData;

    ngOnInit() {
        super.ngOnInit();
        this._$data = new TableData();
        this._$data.fromObject(this.initData);
    }
}

/**
 * @internal
 * */
@Component({
    templateUrl: './auto-display-graph.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDisplayGraphRenderer extends AutoDisplayRendererBase {
    public _$data: AbstractGraphData;

    ngOnInit() {
        super.ngOnInit();
        this._$data = new GraphData(this.initData);
    }
}

/**
 * @internal
 * 默认使用html渲染组件
 */
@Component({
    templateUrl: './auto-display-html.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDisplayHtmlRenderer extends AutoDisplayRendererBase {
    public trustedHtml: string;

    ngOnInit() {
        super.ngOnInit();
    }
}


@NgModule({
    declarations: [AutoDisplayTableRenderer, AutoDisplayGraphRenderer],
    imports: [CommonModule, JigsawTrustedHtmlModule, JigsawTableModule, JigsawGraphModule]
})
export class JigsawAutoDisplayRendererModule {
}
