import { Component } from "@angular/core";
import { ArrayCollection, LocalPageableArray } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class SelectManualSearchDemoComponent {
    public value: any;
    public cityList = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);
    public manualSearch: boolean = true;
    public debounceTime: number = 0;

    public valueChange($event) {
        console.log('valueChange=>', $event);
    }

    public searchKeywordChange($event) {
        console.log($event);
        const data = new LocalPageableArray<any>();
        data.pagingInfo.pageSize = Infinity;
        const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
            // 在新建data准备好再赋值给组件data，防止出现闪动的情况
            removeUpdateSubscriber.unsubscribe();
            $event.instance.data = data;
            $event.instance.data.filter($event.searchKey, ['label']);
        });
        data.fromArray($event.data);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
