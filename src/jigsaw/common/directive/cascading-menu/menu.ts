import {Component, Output, EventEmitter} from "@angular/core";
import {IPopupable} from "../../service/popup.service";

@Component({
    template: `
        <j-list [width]="initData.menuListSettings?.width"
                (selectedItemsChange)="initData.menuListSettings?.selectedItemsChange && initData.menuListSettings?.selectedItemsChange($event)"
                [disabled]="initData.menuListSettings?.disabled"
                [valid]="initData.menuListSettings && initData.menuListSettings.hasOwnProperty('valid')?initData.menuListSettings.valid:true"
                [maxHeight]="initData.menuListSettings?.maxHeight" [height]="initData.menuListSettings?.height"
                [basicClass]="initData.menuListSettings?.basicClass"
                [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}">
            <j-list-option *ngFor="let item of initData.menuData.nodes" [value]="item" jigsawFloat
                           [jigsawFloatTarget]="getTarget(item)"
                           jigsawFloatPosition="rightTop"
                           [jigsawFloatInitData]="{menuData:item,menuListSettings:initData.menuListSettings,options:initData.options}"
                           [jigsawFloatOptions]="initData.options"
                           (click)="item.click && item.click($event)"
                           [disabled]="item.disabled">
                <span j-title>
                    <i class="{{item.titleIcon}}"></i>
                    {{item.label}}
                </span>
                <div j-sub-title>{{item.subTitle}}
                    <i class="{{item.subTitleIcon}}"></i>
                </div>
            </j-list-option>
        </j-list>`
})
export class MenuComponent implements IPopupable {

    initData: any;
    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    getTarget(item) {
        if (item.nodes && item.nodes.length > 0 && !item.disabled) {
            return MenuComponent;
        } else {
            return null;
        }
    }
}
