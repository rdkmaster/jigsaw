
import {Type} from "@angular/core";
import {ToolbarComp} from "../comp/toolbar.comp";

export abstract class AbstractMonitorsBase {
    protected abstract getComponent(): Type<AbstractMonitorsBase>;

    public data: any;

    // protected frozen: boolean;
    protected toolbar: ToolbarComp;
    protected chartId = 0;
}
