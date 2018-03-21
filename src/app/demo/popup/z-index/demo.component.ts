import {Component, OnInit} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/service/popup.service";
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawWarningAlert} from "jigsaw/component/alert/alert";
import {JigsawNotification} from "../../../../jigsaw/component/notification/notification";

@Component({
    templateUrl: './demo.component.html'
})
export class PopupZIndexDemoComponent implements OnInit {
    constructor(private _popupService: PopupService, private _loadingService: LoadingService) {
    }

    selectedCityForSelect1: any;
    selectedCityForSelect2: any;
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

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

    popupAlert() {
        JigsawWarningAlert.show('this is a great warning alert!');
    }

    tooltipMessage: string = '这是一个内联tooltip  <span class="fa fa-thumbs-up"></span>';

    ngOnInit() {
        setInterval(() => {
            JigsawNotification.show('最简洁方便的使用方式：<code>JigsawNotification.show("message")</code>');
        }, 3000);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

