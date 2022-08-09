import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ZTreeSettings, SimpleTreeData, ArrayCollection} from "jigsaw/public_api";
import {TreeTextService} from "../doc.service";

@Component({
    selector: 'data-from-ajax-tree',
    templateUrl: './demo.component.html'
})
export class ZtreeDemoDataFromAjaxComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);

    data: SimpleTreeData;

    setting: ZTreeSettings = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        }
    };

    constructor(public http: HttpClient, public text: TreeTextService) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
    }

}
