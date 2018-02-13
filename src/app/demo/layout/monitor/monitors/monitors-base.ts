
import {Type} from "@angular/core";
import {ToolbarComp} from "../comp/toolbar.comp";

export abstract class AbstractMonitorsBase {
    public abstract getComponent(): Type<AbstractMonitorsBase>;

    public data: any;
    public chartId = 0;

    // protected frozen: boolean;
    protected toolbar: ToolbarComp;
}
