import {Component} from "@angular/core";
import {IDynamicInstantiatable} from "../../../../../../component/core";

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['tabContent.scss']
})
export class TabContentComponent{

}

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['tabContent.scss']
})
export class TabContentDefine implements IDynamicInstantiatable {
    initData: Object = 'zte'
}
