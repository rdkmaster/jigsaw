import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (req.url != '/rdk/service/app/common/paging') {
        //     return next.handle(req);
        // }

        const resp = new HttpResponse({
            body: {aa: 214, bb: 3433}, url: req.url, status: 200
        });
        return Observable.of(resp);

        // return new Promise<HttpEvent<any>>(resolve => {
        //
        // });

        // setTimeout(() => {
        //     return next.handle(req);
        // }, 1000);
    }
}
