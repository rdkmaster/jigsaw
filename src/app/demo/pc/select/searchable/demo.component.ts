import {Component} from "@angular/core";
import {ArrayCollection, LocalPageableArray, PageableArray} from "jigsaw/common/core/data/array-collection";
import {GroupOptionValue} from "jigsaw/pc-components/list-and-tile/group-common";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectSearchableDemoComponent {
    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    selectedCityName: string;

    public selectChange(selectedItem: any) {
        console.log("select city is:" + selectedItem.label);
        this.selectedCityName = selectedItem.label;
    }

    lpaCountries: LocalPageableArray<GroupOptionValue>;
    spaCountries: PageableArray;
    selectedCountries: string;
    selectedCountries2: string;

    constructor(public http: HttpClient) {
        this.lpaCountries = new LocalPageableArray<GroupOptionValue>();
        this.lpaCountries.http = http;
        this.lpaCountries.fromAjax('mock-data/countries');
        // 这里模拟实际的场景：服务端返回的数据结构不能直接用的场景，需要对数据做一些简单的转换
        // RDK的服务端返回的数据多数是TableData格式，直接调用对应api做转换就行了
        // 如果服务端返回的就是一个数组，则就无需写这些代码了
        this.lpaCountries.dataReviser = (td: TableData) => TableData.toArray(td);
        // 如果需要设置默认值，则可以放开下面这几行代码
        // this.lpaCountries.onAjaxComplete(() => {
        //     this.selectedCountries = this.lpaCountries.get(17);
        // });

        this.spaCountries = new PageableArray(http, {
            url: 'mock-data/countries',
            // 在这个例子中不需要带参数，但是为了演示如何带参数给服务端，
            // 这里还是随便给了一些参数，可以在浏览器的network页中看效果
            params: {someData: 'this param is not necessary in this example.'},
        });
        // 我们这里不演示服务端分页功能，因此只给一页数据就好
        this.spaCountries.pagingInfo.pageSize = 1000;
        this.spaCountries.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

