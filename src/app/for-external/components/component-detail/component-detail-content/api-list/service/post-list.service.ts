import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Api} from "../../../../model/api-model";

@Injectable()
export class ApiListService {

  constructor(public http: Http) {
  }

  apiMap = new Map<string, any[]>();

  // classes directives injectables interfaces modules
  private _reqAllApi(): Observable<Api[]> {
    return this.http.get(`jigsaw-doc/fragments/list`)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'get jigsaw api list error'));
  }

  public getApiList(searchStr?: string) {
    //this.apiMap.clear();
    let result;
    if (this.apiMap.size) {
      //result= Observable.from(this._strMapToArr(this.apiMap));
      result = Observable.create(subscriber => {
        subscriber.next(this._strMapToArr(this.apiMap));
        subscriber.complete()
      })
    } else {
      result = this._reqAllApi()
        .map(apiItem => {
          apiItem.map(this._dataByAlphabet.bind(this));
          //return [...this.apiMap];  Type 'Map<string, any[]>' is not an array type???
          return this._strMapToArr(this.apiMap)
        });
    }

    if (searchStr == null || searchStr == "") {
      return result
    }
    return result
      .map(apiArr => {
        return apiArr.filter(item => {
          item[1] = item[1].filter(api => {
            return api["name"].toString().match(new RegExp(searchStr, 'i'))
          });
          return item[1].length
        })
      })
  }

  private _dataByAlphabet(api) {
    let firstChart = api.type.charAt(0).toUpperCase();
    if (!this.apiMap.has(firstChart)) {
      this.apiMap.set(firstChart, [])
    }
    this.apiMap.get(firstChart).push(api);
  }

  //Todo [...map] 直接转数组报类型错误,自己实现map->arr.....
  private _strMapToArr(strMap) {
    let arr = [];
    strMap.forEach(function (value, key, map) {
      const tem = [];
      tem.push(key);
      tem.push(value);
      arr.push(tem)
    });
    return arr.sort();
  }
}
