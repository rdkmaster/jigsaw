import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    ArrayCollection, LocalPageableArray, PageableArray, GroupOptionValue,
    TableData, CommonUtils
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class SelectSearchableDemoComponent {
    public searchPlaceholder: string;

    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    cityDataTemp = this.cityListForSelect.concat();

    selectedCityName: string;

    public selectChange(selectedItem: any) {
        selectedItem = selectedItem ? selectedItem : {label: ''};
        console.log("select city is:" + selectedItem.label);
        this.selectedCityName = selectedItem.label;
    }

    lpaCountries: LocalPageableArray<GroupOptionValue>;
    spaCountries: PageableArray;
    selectedCountries: string;
    selectedCountries2: string;

    selectChange2($event) {
        this.selectedCountries = $event.map(s => s.enName).toString();
    }

    selectChange3($event) {
        this.selectedCountries2 = $event.map(s => s.enName).toString();
    }

    changeData() {
        this.cityListForSelect.fromArray(this.cityDataTemp.map((city, idx) => {
            if(city && city.label) {
                city = Object.assign({}, city);
                city.label = idx % 2 == 0 ? city.label + '-1' : city.label;
            }
            return city
        }));
    }

    changeData2() {
        this.lpaCountries.fromAjax('mock-data/countries');
        this.lpaCountries.dataReviser = (td: TableData) => {
            return TableData.toArray(CommonUtils.deepCopy(td)).map((item, idx) => {
                item = Object.assign({}, item);
                item['enName'] = idx % 2 == 0 ? item['enName'] + '-1' : item['enName'];
                return item;
            });
        }
    }

    changeData3() {
        this.spaCountries.fromAjax();
        this.spaCountries.dataReviser = (td: TableData) => {
            td = <TableData>CommonUtils.deepCopy(td);
            td.data.forEach((row, idx) => {
                row[0] = idx % 2 == 0 ? row[0] + '-1' : row[0];
            });
            return td;
        }
    }

    constructor(public http: HttpClient) {
        this.lpaCountries = new LocalPageableArray<GroupOptionValue>();
        this.lpaCountries.http = http;
        this.lpaCountries.fromAjax('mock-data/countries');
        // 这里模拟实际的场景：服务端返回的数据结构不能直接用的场景，需要对数据做一些简单的转换
        // RDK的服务端返回的数据多数是TableData格式，直接调用对应api做转换就行了
        // 如果服务端返回的就是一个数组，则就无需写这些代码了
        this.lpaCountries.dataReviser = (td: TableData) => TableData.toArray(td);
        // 我们这里不演示本地分页功能，因此只给一页数据就好
        this.lpaCountries.pagingInfo.pageSize = Infinity;
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
        this.spaCountries.pagingInfo.pageSize = Infinity;
        this.spaCountries.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
