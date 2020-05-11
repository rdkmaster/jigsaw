import {Component, Output, EventEmitter, Input, Type} from "@angular/core";
import {IPopupable, PopupOptions} from "../../service/popup.service";
import {SimpleNode, SimpleTreeData} from "../../core/data/tree-data";
import {AbstractJigsawComponent} from "../../common";

@Component({
    selector: 'jigsaw-menu, j-menu',
    template: `
        <j-list [width]="width" [height]="height" [maxHeight]="maxHeight"
                [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}">
            <j-list-option *ngFor="let node of _$realData?.nodes" [value]="node" jigsawFloat
                           [jigsawFloatTarget]="getTarget(node)"
                           [jigsawFloatPosition]="'rightTop'"
                           [disabled]="node.disabled"
                           (click)="select.emit(node); initData.select?.emit($event)">
                <span j-title>
                    <i class="{{node.titleIcon}}"></i>
                    {{node.label}}
                </span>
                <div j-sub-title>{{node.subTitle}}
                    <i class="{{node.subTitleIcon}}"></i>
                </div>
            </j-list-option>
        </j-list>`,
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.maxHeight]': 'maxHeight'
    }
})
export class JigsawMenuComponent extends AbstractJigsawComponent implements IPopupable {
    public initData: any;

    public _$realData(): SimpleTreeData {
        return this.initData && this.initData.data ? this.initData.data : this.data;
    }

    @Input()
    public data: SimpleTreeData;

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public select: EventEmitter<SimpleNode> = new EventEmitter<SimpleNode>();

    public getTarget(item): Type<JigsawMenuComponent> {
        if (item.nodes && item.nodes.length > 0 && !item.disabled) {
            return JigsawMenuComponent;
        } else {
            return null;
        }
    }
}
