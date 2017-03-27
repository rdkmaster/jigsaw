import {Component, ViewChild, ViewContainerRef, ElementRef, ApplicationRef} from "@angular/core";

import {InsertComponent} from './insert1/insert';
import {RdkToolTip} from './tooltip/tooltip';

import {PopupService} from '../../../../core/service/popup.service';

import {PositionOption} from '../../../../core/service/popup.service';

@Component({
    templateUrl: 'popup.html'
})
export class PopupDemoComponent {
    @ViewChild("insertPlace1", {read: ElementRef}) insertPlaceEl1: ElementRef;
    @ViewChild("insertPlace2", {read: ElementRef}) insertPlaceEl2: ElementRef;

    viewRef: ViewContainerRef;

    constructor(private _popupService: PopupService) {
    }

    option1: PositionOption = {
        position: "absolute",
        top: "50%",
        left: "50%",
        right: "",
        bottom: ""
    };

    popup1() {
        console.log(this.viewRef);
        this._popupService.popup(InsertComponent, null);
    }

    popup2() {
        this._popupService.popup(RdkToolTip, this._getOption(this.insertPlaceEl2));
    }

    popup3() {
        this._popupService.close();
    }

    private _getOption(insertPlaceEl: ElementRef): PositionOption {
        return {
            position: 'absolute',
            top: (insertPlaceEl.nativeElement.offsetTop - insertPlaceEl.nativeElement.offsetHeight - 14) + 'px',
            left: insertPlaceEl.nativeElement.offsetLeft + 'px',
            right: '0px',
            bottom: '0px',
        };
    }
}

