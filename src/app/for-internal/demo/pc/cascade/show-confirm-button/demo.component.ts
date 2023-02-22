import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CascadeData, ArrayCollection } from "jigsaw/public_api";
import { AjaxInterceptor } from "../../../../../libs/app.interceptor";
import { dealAreaRequest } from "../search-and-paging/demo.component";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeShowConfirmButtonDemoComponent implements OnInit {
    constructor(public http: HttpClient) {
    }

    lazyLoadSelectedItems: any[];

    levelInfos = [
        { title: '省/直辖市', field: 'provinceId' },
        { title: '市', field: 'cityId' },
        { title: '区', field: 'districtId' },
    ];

    ngOnInit() {
        // 设置懒加载数据默认选中条目
        const item1 = { id: 10, name: "江苏省", remark: "省份" };
        const item2 = { id: 63, name: "南京市", provinceId: 10 };
        const item3 = { id: 677, name: "雨花台区", cityId: 63 };
        this.lazyLoadSelectedItems = [item1, item2, item3];
    }

    generator(selectedItem: any, selectedItems: any[], data: any[], level: number): CascadeData {
        const params = {};
        for (let i = 0; i < level; i++) {
            const si = selectedItems[i];
            const field = this.levelInfos[i].field;
            params[field] = si.id;
        }
        const levelInfo = this.levelInfos[level];
        return {
            title: levelInfo.title, noMore: level >= 2, showAll: true,
            list: this.http.get<any[]>('/mock-data/cascade/selected-items/area', { params: params }),
        }
    }

    message: string = '';

    parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            const districts = [];
            if (item instanceof ArrayCollection || item instanceof Array) {
                item.forEach(district => districts.push(district.name));
            } else {
                districts.push(item.name);
            }
            result.push(districts.join(' & '));
            return result;
        }, []).join(' | ');
    }

    public showConfirmButton: boolean = localStorage.getItem('demoShowConfirmButton') == null ? true : localStorage.getItem('demoShowConfirmButton') == 'true';

    public confirm($event) {
        console.log("selectedItemsChange=>", $event);
        this.parseMessage($event);
    }

    public update() {
        // 提示：现在的版本无法很好支持showConfirmButton属性的动态化。
        localStorage.setItem('demoShowConfirmButton', String(this.showConfirmButton));
        setTimeout(() => location.reload(), 300);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo说明如何配置showConfirmButton以显示确定按钮';
    description: string = '';
}

AjaxInterceptor.registerProcessor('/mock-data/cascade/selected-items/area', dealAreaRequest);
