import {Component} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ArrayCollection, LocalPageableArray, PageableArray} from "jigsaw/core/data/array-collection";
import {ComboSelectValue} from "jigsaw/component/combo-select/combo-select";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class ComboSelectAutoCompleteDemo {
    lpaCountries: LocalPageableArray<ComboSelectValue>;
    spaCountries: PageableArray;
    selectedCountries: any;
    selectedCountries2: ArrayCollection<ComboSelectValue> = new ArrayCollection();

    constructor(public http: HttpClient) {
        this.lpaCountries = new LocalPageableArray<ComboSelectValue>();
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
            url: 'http://localhost:4200/mock-data/countries',
            // 在这个例子中不需要带参数，但是为了演示如何带参数给服务端，
            // 这里还是随便给了一些参数，可以在浏览器的network页中看效果
            params: {someData: 'this param is not necessary in this example.'},
        });
        // 我们这里不演示服务端分页功能，因此只给一页数据就好
        this.spaCountries.pagingInfo.pageSize = 1000;
    }

    onLocalSearchOpen(open) {
        if (!open) {
            return;
        }
        // 重置数据集
        this.lpaCountries.filter('', ['enName', 'zhName']);
    }

    onServerSearchOpen(open: boolean) {
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

    handleSearching(filterKey, data) {
        filterKey = filterKey ? filterKey.trim() : '';
        if (!filterKey) {
            // 初始化完成之后，angular会发出这个事件。无效的过滤请求跳过
            return;
        }
        data.filter(filterKey, ['enName', 'zhName']);
    }
}
