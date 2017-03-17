import {
  IAjaxComponentData, DataReviser, DataRefreshCallback, ComponentDataHelper, CallbackRemoval, AjaxSuccessCallback,
  AjaxErrorCallback, AjaxCompleteCallback
} from "./component-data";
import {Http, RequestOptionsArgs, Response} from "@angular/http";

export abstract class AbstractGeneralCollection extends Object implements IAjaxComponentData {
  public http: Http;
  public busy: boolean;

  public abstract fromObject(data: any): AbstractGeneralCollection;
  protected abstract ajaxSuccessHandler(data): void;

  protected reviseData(response:Response):any {
    return this.wrappedDataReviser ? this.wrappedDataReviser(response.json()) : response.json();
  }

  public fromAjax(url: string, options?: RequestOptionsArgs): void {
    if (!this.http) {
      console.error('set a valid Http instance to the http attribute before invoking fromAjax()!');
      return;
    }

    this.http.request(url, options)
      .map(res => this.reviseData(res))
      .subscribe(
        data => this.ajaxSuccessHandler(data),
        error => this.ajaxErrorHandler(error),
        () => this.ajaxCompleteHandler()
      );
  }

  protected wrappedDataReviser: DataReviser;
  private _originDataReviser: DataReviser;

  public get dataReviser(): DataReviser {
    return this._originDataReviser;
  }

  public set dataReviser(value: DataReviser) {
    this._originDataReviser = value;
    this.wrappedDataReviser = (data) => {
      try {
        return this._originDataReviser(data);
      } catch (e) {
        console.error('revise data error: ' + e);
        console.error(e.stack);
        return data;
      }
    }
  }

  protected componentDataHelper: ComponentDataHelper = new ComponentDataHelper(this);

  public refresh(): void {
    this.componentDataHelper.invokeRefreshCallback();
  }

  public onRefresh(callback: DataRefreshCallback): CallbackRemoval {
    return this.componentDataHelper.getRefreshRemoval(callback);
  }

  public onAjaxSuccess(callback: AjaxSuccessCallback): CallbackRemoval {
    return this.componentDataHelper.getAjaxSuccessRemoval(callback);
  }

  public onAjaxError(callback: AjaxErrorCallback): CallbackRemoval {
    return this.componentDataHelper.getAjaxErrorRemoval(callback);
  }

  public onAjaxComplete(callback: AjaxCompleteCallback): CallbackRemoval {
    return this.componentDataHelper.getAjaxCompleteRemoval(callback);
  }

  protected ajaxErrorHandler(error): void {
    console.error('get data from paging server error!! detail: ' + error);
    this.componentDataHelper.invokeAjaxErrorCallback(error);
    this.busy = false;
  }

  protected ajaxCompleteHandler(): void {
    console.log('get data from paging server complete!!');
    this.componentDataHelper.invokeAjaxCompleteCallback();
    this.busy = false;
  }

  public destroy(): void {
    this.componentDataHelper.clearCallbacks();
    this.componentDataHelper = null;

    this.wrappedDataReviser = null;
    this._originDataReviser = null;
  }
}

export class GeneralCollection extends AbstractGeneralCollection {

  protected ajaxSuccessHandler(data): void {
    this.fromObject(data);
    this.componentDataHelper.invokeAjaxSuccessCallback(data);
  }

  private _propList: Array<string> = [];

  public fromObject(data: any): GeneralCollection {
    if (data instanceof GeneralCollection) {
      console.error("unable to make data from another GeneralCollection instance!");
      return;
    }

    let needRefresh = false;

    this._propList.forEach(prop => {
      needRefresh = true;
      delete this[prop];
    });
    this._propList.splice(0, this._propList.length);

    if (data) {
      for (let key in data) {
        if (!data.hasOwnProperty(key) || data[key] instanceof Function) {
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

  public destroy(): void {
    super.destroy();
    console.log('destroying GeneralCollection....');

    this._propList.forEach((prop: string) => {
      delete this[prop];
    });
    this._propList.splice(0, this._propList.length);
  }
}
