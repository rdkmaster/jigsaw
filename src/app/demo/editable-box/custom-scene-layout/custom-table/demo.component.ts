import {Component, ComponentRef} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {HttpClient} from "@angular/common/http";
import {DragDropInfo} from "jigsaw/directive/dragdrop/types";
import {SubscribableComponent} from "../linkage.common";

@Component({
    selector: 'custom-table',
    template: `
        <div class="custom-table" jigsaw-droppable (jigsawDrop)="dropHandle($event)">
            {{message}}<br>
            <jigsaw-table [data]="tableData"></jigsaw-table>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            width: 100%;
        }
    `]
})
export class CustomTableComponent extends SubscribableComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        super();
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    dropHandle(dragInfo: DragDropInfo) {
        if(!this.box.editable) return;
        console.log('drop', dragInfo.dragDropData);
        this.subscriberCipher = dragInfo.dragDropData;
        // 寻找口号相同的组件进行联动
        this.box.getRootBox().data.getAllInnerComponents().forEach(item => {
            if (!(item.component instanceof ComponentRef)) return;
            const component = item.component.instance;
            if(component.emitterCipher != this.subscriberCipher) return;
            component.subscribe(message => {
                this.message = message;
            })
        })
    }
}

