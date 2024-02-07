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
import { JigsawTrustedHtmlModule } from "../../../common/directive/trusted-html/trusted-html";
import { JigsawTableModule } from "../../table/table";
import { JigsawGraphModule } from "../../graph/index";
import { AbstractGraphData, GraphData } from "../../../common/core/data/graph-data";
import { AbstractModeledGraphData, ModeledPieGraphData } from "../../../common/core/data/modeled-graph-data";
import { TableData } from "../../../common/core/data/table-data";
import { CommonUtils } from "../../../common/core/utils/common-utils";

@Directive()
export abstract class DisplayRendererBase implements OnInit, OnDestroy {
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

@Directive()
export abstract class AutoDisplayRendererBase extends DisplayRendererBase implements OnInit, OnDestroy {
}

/**
 * @internal
 * */
@Component({
    templateUrl: './auto-display-table.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDisplayTableRenderer extends AutoDisplayRendererBase {
    public data: TableData;

    ngOnInit() {
        super.ngOnInit();
        this.data = new TableData();
        this.data.fromObject(this.initData);
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
    public data: AbstractGraphData;

    ngOnInit() {
        super.ngOnInit();
        if (CommonUtils.isUndefined(this.initData?.tooltip)) {
            return;
        }
        if (!this.initData.tooltip.hasOwnProperty('showDelay')) {
            this.initData.tooltip.showDelay = 0;
        }
        if (!this.initData.tooltip.hasOwnProperty('hideDelay')) {
            this.initData.tooltip.hideDelay = 0;
        }
        if (!this.initData.tooltip.hasOwnProperty('transitionDuration')) {
            this.initData.tooltip.transitionDuration = 0;
        }
        this.data = new GraphData(this.initData);
    }
}

/**
 * @internal
 * */
@Component({
    templateUrl: './auto-display-graph.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDisplayModeledGraphRenderer extends AutoDisplayRendererBase {
    public data: AbstractModeledGraphData;

    ngOnInit() {
        super.ngOnInit();
        this.data = new ModeledPieGraphData() as ModeledPieGraphData;
        this.data.data = this.initData.data;
        this.data.header = this.initData.header;
        this.data.field = this.initData.field;
        this.data['series'] = this.initData.series;
        this.data.template.option = this.initData.templateOption;
        console.log(this.data);
        this.data.refresh();
    }
}

@NgModule({
    declarations: [AutoDisplayTableRenderer, AutoDisplayGraphRenderer, AutoDisplayModeledGraphRenderer],
    imports: [CommonModule, JigsawTrustedHtmlModule, JigsawTableModule, JigsawGraphModule]
})
export class JigsawAutoDisplayRendererModule {
}
