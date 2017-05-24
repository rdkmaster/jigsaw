import {Component} from "@angular/core";
import {ITabDefine} from "../../../../../../component/tabs/tab-item";

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['tabContent.scss']
})
export class TabContentDefine implements ITabDefine{
    initData: Object
}
