import { Component, EventEmitter, Output } from "@angular/core";
import { IPopupable } from "jigsaw/public_api";

@Component({
    templateUrl: 'user-component.html',
    styles: [`
        .componentArea {
            line-height: 40px;
            height: 60px;
            padding: 10px;
            background: #999;
            color: #fff;
        }
    `]
})
export class UserComponent implements IPopupable {
    public initData: any;

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();
}
