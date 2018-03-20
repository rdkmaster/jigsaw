import {Component} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/service/popup.service";
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawWarningAlert} from "jigsaw/component/alert/alert";

@Component({
    templateUrl: './demo.component.html'
})
export class PopupZIndexDemoComponent {
    constructor(private _popupService: PopupService, private _loadingService: LoadingService) {
    }

    date = TimeService.getFormatDate('now', TimeGr.date);
    singleTimeComboValue = new ArrayCollection([{
        label: this.date,
        closable: false
    }]);

    beginDate = TimeService.getFormatDate('now-7d', TimeGr.date);
    endDate = TimeService.getFormatDate('now', TimeGr.date);
    rangeTimeComboValue = new ArrayCollection([
        {label: this.beginDate, closable: false},
        {label: this.endDate, closable: false}
    ]);

    handleDateChange(value) {
        this.singleTimeComboValue[0].label = this.date;
        this.singleTimeComboValue.refresh();
        if (!this.globalLoading) {
            this.globalLoading = this._loadingService.show();
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    globalLoading: PopupInfo;
    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
        if (!this.globalLoading) {
            this.globalLoading = this._loadingService.show();
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    closeGlobalLoading() {
        if (this.globalLoading) {
            this.globalLoading.dispose();
            this.globalLoading = null;
        }
    }

    dialogInfo1: PopupInfo;
    popupTemplateDialog(tp) {
        this.dialogInfo1 = this._popupService.popup(tp, this.getModalOptions());
    }

    onAnswer(message: string) {
        if (this.dialogInfo1) {
            this.dialogInfo1.dispose();
        }
    }

    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }

    popupAlert(){
        JigsawWarningAlert.show('this is a great warning alert!');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

