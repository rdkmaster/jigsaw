import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {HttpClient} from "@angular/common/http";
import {DragDropInfo} from "jigsaw/directive/dragdrop/types";
import {JigsawEditableBox} from "jigsaw/component/box/editable-box";
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
        console.log('drop', dragInfo.dragDropData);
        this.subscriberCipher = dragInfo.dragDropData;
    }
}

