import { Component, TemplateRef } from "@angular/core";
import { PopupInfo, PopupService } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TooltipScenesDemoComponent {
    constructor(private popupService:PopupService){

    }
    public dialogInfo: PopupInfo;
    public popupDialog(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele, {modal:true});
    }

    public closeDialog(){
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
            this.dialogInfo = null;
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo展示了tooltip内置的明、暗样式';
    description: string = '';
}
