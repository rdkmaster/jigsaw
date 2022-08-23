import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
    PopupInfo, PopupOptions, PopupPoint, PopupPositionOffset,
    PopupPositionType, PopupService
} from "jigsaw/public_api";
import { DialogTextService } from "../doc.service";

@Component({
    selector: 'dialog-popup-option',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogPopupOptionDemoComponent implements OnInit, AfterViewInit {
    @ViewChild("left") left: ElementRef;
    @ViewChild("middle") middle: ElementRef;
    @ViewChild("right") right: ElementRef;

    public dialogInfo: PopupInfo;
    public option: PopupOptions;
    public popPositionTypes: any[];
    public selectedPositionType: any;
    public poses: object[];
    public selectedPos: any;
    public detailPos: PopupPoint;
    public offset: PopupPositionOffset;

    public close() {
        this.dialogInfo.dispose();
    }

    public generatePopPos() {
        this.poses = [];
        this.poses.push({ label: "red box", ele: this.left });
        this.poses.push({ label: "blue box", ele: this.middle });
        this.poses.push({ label: "green box", ele: this.right });
        this.poses.push({ label: "no reference" });
        this.poses.push({ label: "point" });
        this.selectedPos = this.poses[0];
        this._cdr.detectChanges();
    }
    public popupDialog1(ele: TemplateRef<any>) {
        this.option.posOffset = {
            top: 10,
            left: 10,
            right: 0,
            bottom: 0,
        };

        this.option.pos = this.left

        this.option.posType = 0

        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
        console.log(this.option);
        this.dialogInfo = this.popupService.popup(ele, this.option);
    }
    public popupDialog2(ele: TemplateRef<any>) {
        this.option.posOffset = {
            top: 20,
            left: 0,
            right: 10,
            bottom: 0,
        };

        this.option.pos = this.middle

        this.option.posType = 0

        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
        console.log(this.option);
        this.dialogInfo = this.popupService.popup(ele, this.option);
    }
    public popupDialog3(ele: TemplateRef<any>) {
        this.option.posOffset = {
            top: 30,
            left: 0,
            right: 0,
            bottom: 0,
        };

        this.option.pos = this.right

        this.option.posType = 0

        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
        console.log(this.option);
        this.dialogInfo = this.popupService.popup(ele, this.option);
    }

    ngOnInit() {
        this.detailPos = { x: null, y: null };
        this.offset = { top: 10, left: 10, right: null, bottom: null };
        this.option = {
            modal: false,
            posType: PopupPositionType.absolute
        };
    }

    ngAfterViewInit(): void {
        this.generatePopPos();
    }

    constructor(private popupService: PopupService, private _cdr: ChangeDetectorRef, public doc: DialogTextService) {
    }
}
