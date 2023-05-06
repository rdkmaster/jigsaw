import { Component } from "@angular/core";
import { ArrayCollection, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferListDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;
    public data: any; // ArrayCollection<any> | any[]
    public selectedItems: any; // ArrayCollection<any> | any[]
    public labelField = 'name';
    public subLabelField = 'remark'
    public trackItemBy = 'id';
    public isArray = false;
    public dataType = [{ label: 'ArrayCollection', id: 1 }, { label: 'Array', id: 2 }];
    public selectedDataType = [{ label: 'ArrayCollection', id: 1 }];

    public allData = [
        {
            "id": 1,
            "name": "北京市",
            "remark": "直辖市"
        },
        {
            "id": 2,
            "name": "天津市",
            "remark": "直辖市"
        },
        {
            "id": 3,
            "name": "河北省",
            "remark": "省份"
        },
        {
            "id": 4,
            "name": "山西省",
            "remark": "省份"
        },
        {
            "id": 5,
            "name": "内蒙古",
            "remark": ""
        },
        {
            "id": 6,
            "name": "辽宁省",
            "remark": "省份"
        },
        {
            "id": 7,
            "name": "吉林省",
            "remark": "省份"
        },
        {
            "id": 8,
            "name": "黑龙江省",
            "remark": "省份"
        },
        {
            "id": 9,
            "name": "上海市",
            "remark": "直辖市"
        },
        {
            "id": 10,
            "name": "江苏省",
            "remark": "省份"
        },
        {
            "id": 11,
            "name": "浙江省",
            "remark": "省份"
        },
        {
            "id": 12,
            "name": "安徽省",
            "remark": "省份"
        },
        {
            "id": 13,
            "name": "福建省",
            "remark": "省份"
        },
        {
            "id": 14,
            "name": "江西省",
            "remark": "省份"
        },
        {
            "id": 15,
            "name": "山东省",
            "remark": "省份"
        },
        {
            "id": 16,
            "name": "河南省",
            "remark": "省份"
        },
        {
            "id": 17,
            "name": "湖北省",
            "remark": "省份"
        },
        {
            "id": 18,
            "name": "湖南省",
            "remark": "省份"
        },
        {
            "id": 19,
            "name": "广东省",
            "remark": "省份"
        },
        {
            "id": 20,
            "name": "海南省",
            "remark": "省份"
        }
    ]

    constructor(public http: HttpClient) {
        this.data = new ArrayCollection(this.allData);
        this.selectedItems = new ArrayCollection([this.allData[0], this.allData[1], this.allData[2]]);
    }

    addItem() {
        let id = Date.now();
        this.data.push({
            id: id,
            name: "添加元素", remark: "副属信息"
        });
        if (this.isArray) {
            this.data = JSON.parse(JSON.stringify(this.data));
            return;
        }
        this.data.refresh();
    }

    removeItem() {
        this.data.pop();
        this.selectedItems.length = 0;
        if (this.isArray) {
            this.data = JSON.parse(JSON.stringify(this.data));
            return;
        }
        this.data.refresh();
    }

    changeDataFromArray() {
        this.data.fromArray(new ArrayCollection(this.allData.filter((item, i) => {
            return i < 9
        })))
    }

    changeDataFromAjax() {
        this.data.http = this.http;
        this.data.fromAjax('mock-data/provinces.json');
    }

    resetInputData() {
        if (this.isArray) {
            this.data = JSON.parse(JSON.stringify(this.allData));
            return;
        }
        this.data = new ArrayCollection(this.allData);
    }

    selectedItemsChange($event) {
        console.log($event)
    }

    resetSelectedData() {
        const selectedData = this.allData.filter((item, i) => {
            return i < 3
        })
        if (this.isArray) {
            this.selectedItems = selectedData;
            return;
        }
        this.selectedItems = new ArrayCollection(selectedData);
    }

    public switchData() {
        this.isArray = !this.isArray;
        this.resetInputData();
        this.resetSelectedData();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo模拟的是采用服务端分页的情形';
    description: string = '';
}
