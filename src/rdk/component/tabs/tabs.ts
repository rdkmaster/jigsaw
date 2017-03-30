/**
 * Created by 10177553 on 2017/3/29.
 */
import {
    Component, OnInit, ContentChildren, QueryList, Directive, Input, ElementRef, ViewChildren,
    AfterViewInit
} from '@angular/core';
import {TabPane} from "./tab-pane";
import {RdkLabel} from "./tab-label";
import {addExportToModule} from "@angular/cli/lib/ast-tools";

@Component({
    selector: 'rdk-tabs',
    templateUrl: 'tabs.html',
    styleUrls: ['./tabs.scss']
})
export class RdkTabs implements AfterViewInit {
    @ContentChildren(TabPane) _tabPanes: QueryList<TabPane>;

    @ViewChildren(RdkLabel) _tabLabel: QueryList<RdkLabel>;

    public selectedIndex: number = 0;

    private _setSelectIndex(index):void {
        this.selectedIndex = index;

        this._setInkBarStyle(index);
    }

    _inkBarStyle: {}

    private _setInkBarStyle(index: number) {
        let labelPos = this._getLabelOffsetByKey(index);
        this._inkBarStyle = {
            'display': 'block',
            'transform': 'translate3d('+ labelPos.offSet +'px, 0px, 0px)',
            'width': labelPos.width + 'px'
        }
    }

    private _getLabelOffsetByKey(key: number): any {
        // todo 非法key的校验
        let currentLabel = this._tabLabel.find(item => {
            if (item.key == key) return true
            else
                return false;
        });

        // 非法的 key// 有可能getTop 等扩展Tab页时再重构.
        return {
            offSet: currentLabel.getOffsetLeft(),
            width: currentLabel.getOffsetWidth()
        }
    }

    ngAfterViewInit() {

    }

}
