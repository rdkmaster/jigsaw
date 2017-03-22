import {Input} from "@angular/core";
import {AbstractRDKComponent} from "./component-api";

export abstract class CompareJsonObjComponent extends AbstractRDKComponent {

    //设置对象的标识
    @Input() public trackItemBy: any;

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    //比较两个json object是否相等
    protected _compareJsonObj(item1, item2): boolean {
        for (let i = 0; i < this.trackItemBy.length; i++) {
            if (item1[this.trackItemBy[i]] == item2[this.trackItemBy[i]]) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    /*
     * 初始化对象标识，转化为数组
     * */
    protected _initTrackItemBy(): void {
        if (!this.trackItemBy) { //标识没有输入值，采用显示属性名
            this.trackItemBy = this.labelField;
        }
        if (this.trackItemBy.indexOf(",") != -1) { //标识是多个
            this.trackItemBy = this.trackItemBy.replace(" ", "").split(",");
        } else { //标识是单个
            let arr = [];
            arr.push(this.trackItemBy);
            this.trackItemBy = arr;
        }
    }
}

