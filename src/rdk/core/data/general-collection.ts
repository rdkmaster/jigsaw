import {
  IComponentData, DataReviser, DataRefreshCallback, ComponentDataHelper, OnRefreshToken
} from "./component-data";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs";

export class GeneralCollection extends Object implements IComponentData {
  public http:Http;
  public dataReviser: DataReviser;

  private _propList: Array<string> = [];

  public fromAjax(url: string, options?: RequestOptionsArgs): void {
    if (!this.http) {
      console.error('set a valid Http instance to ArrayCollection.http before invoking ArrayCollection.fromAjax()!');
      return;
    }

    const method: string = options && options.method ? options.method.toString() : 'get';
    const observable: Observable<Response> = this.http[method](url, options);

    observable
      .map(res => this.dataReviser ? this.dataReviser(res.json()) : res.json())
      .subscribe(data => this.fromObject(data));
  }

  public fromObject(data: any): GeneralCollection {
    if (data instanceof GeneralCollection) {
      console.error("unable to make data from another GeneralCollection instance!");
      return;
    }

    let needRefresh = false;

    this._propList.forEach( (prop:string) => {
        needRefresh = true;
        delete this[prop];
    });
    this._propList.splice(0, this._propList.length);

    if (data) {
      for (let key in data) {
        if (data[key] instanceof Function) {
          continue;
        }
        needRefresh = true;
        this[key] = data[key];
        this._propList.push(key);
      }
    }

    if (needRefresh) {
      this.refresh();
    }

    return this;
  }

  private _componentDataHelper:ComponentDataHelper = new ComponentDataHelper(this);

  public refresh(): void {
    this._componentDataHelper.invokeCallback();
  }

  public onRefresh(callback: DataRefreshCallback): OnRefreshToken {
    return this._componentDataHelper.getRemoval(callback);
  }

  public destroy(): void {
    console.log('destroying GeneralCollection....');

    this._componentDataHelper.clearCallbacks();
    this._componentDataHelper = null;

    this.dataReviser = null;

    this._propList.forEach( (prop:string) => {
      delete this[prop];
    });
    this._propList.splice(0, this._propList.length);
  }

}
