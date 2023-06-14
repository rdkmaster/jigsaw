import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    ArrayCollection, LocalPageableArray, PageableArray, ComboSelectValue,
    TableData
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', "./../../assets/demo.common.css"],
})
export class ComboSelectAutoCompleteDemo {
    public disabled: boolean;
    public searching: boolean;
    public searchKeyword: string = "";

    lpaCountries: LocalPageableArray<ComboSelectValue>;
    spaCountries: PageableArray;
    selectedCountries: any;
    selectedCountries2: ArrayCollection<ComboSelectValue> = new ArrayCollection();
    selectedCountries3: any;

    constructor(public http: HttpClient) {
        this.lpaCountries = new LocalPageableArray<ComboSelectValue>();
        this.lpaCountries.http = http;
        this.lpaCountries.pagingInfo.pageSize=1000;
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
    }

    public onLocalSearchOpen(open) {
        console.log("openChange=>", open);
        if (!open) {
            return;
        }
        // 重置数据集
        this.lpaCountries.filter('', ['enName', 'zhName']);
    }

    public onServerSearchOpen(open: boolean) {
        console.log("openChange=>", open);
        if (!open || this.spaCountries.busy) {
            return;
        }
        //正在查询或者已经查询了，就不再去查询数据了
        this.spaCountries.filter('', ['enName', 'zhName']);
    }

    toCountriesString(countries: any): string {
        if (!countries) {
            return '';
        }

        // 要注意，我们为了简单，把this.countries的类型定为了any，
        // 并在ajax请求完成之后，直接给设置了一个单值，而非创建一个ArrayCollection实例
        // jigsaw-combo-select组件能够兼容这样的情况，并且会自动将this.countries的值转为ArrayCollection
        // 但是在jigsaw-combo-select组件完成调整类型之前，angular还是会调用这个方法，因此必须做兼容判断
        // 实际使用时，建议尽量像 selectedCountries2 一样严格使用类型
        if (countries instanceof ArrayCollection) {
            let result = '';
            countries.forEach(c => result += c.zhName + ', ');
            return result;
        } else {
            return countries.zhName;
        }
    }

    public handleSearching(filterKey, data) {
        console.log('handleSearching=>', filterKey)
        filterKey = filterKey ? filterKey.trim() : '';
        data.filter(filterKey, ['enName', 'zhName']);
    }

    public openTriggers = ["click", "mouseenter", "none"];
    public openTrigger = ["mouseenter"];

    public closeTriggers = ["click", "mouseleave", "none"];
    public closeTrigger = ["mouseleave"];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何使用关键字过滤的功能，包括浏览器内部数据过滤，和服务端数据过滤';
    description: string = require('!!raw-loader!./readme.md').default;
}
