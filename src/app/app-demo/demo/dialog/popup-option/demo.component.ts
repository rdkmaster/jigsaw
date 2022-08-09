import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
    PopupInfo, PopupOptions, PopupPoint, PopupPositionOffset,
    PopupPositionType, PopupService
} from "jigsaw/public_api";
import {DialogTextService} from "../doc.service";

@Component({
    selector: 'dialog-popup-option',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogPopupOptionDemoComponent implements OnInit, AfterViewInit {

    dialogInfo: PopupInfo;

    option: PopupOptions;

    popPositionTypes: any[];

    selectedPositionType: any;

    poses: object[];

    selectedPos: any;

    detailPos: PopupPoint;

    offset: PopupPositionOffset;

    @ViewChild("left") left: ElementRef;
    @ViewChild("middle") middle: ElementRef;
    @ViewChild("right") right: ElementRef;

    constructor(private popupService: PopupService, private _cdr: ChangeDetectorRef, public text: DialogTextService) {
    }

    ngOnInit() {
        // this.generatePopPosition();
        this.detailPos = {x: null, y: null};
        this.offset = {top: 10, left: 10, right: null, bottom: null};
        this.option = {
            modal: false,
            posType: PopupPositionType.absolute
        };
    }

    ngAfterViewInit(): void {
        this.generatePopPos();
    }

    close() {
        this.dialogInfo.dispose();
    }

    generatePopPos() {
        this.poses = [];
        this.poses.push({label: "red box", ele: this.left});
        this.poses.push({label: "blue box", ele: this.middle});
        this.poses.push({label: "green box", ele: this.right});
        this.poses.push({label: "no reference"});
        this.poses.push({label: "point"});
        this.selectedPos = this.poses[0];
        this._cdr.detectChanges();
    }
    popupDialog1(ele: TemplateRef<any>) {
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
    popupDialog2(ele: TemplateRef<any>) {
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
    popupDialog3(ele: TemplateRef<any>) {
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
}
