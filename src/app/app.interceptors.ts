import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (req.url != '/rdk/service/app/common/paging') {
        //     return next.handle(req);
        // }

        return new Promise<HttpEvent<any>>(resolve => {

        });

        setTimeout(() => {
            return next.handle(req);
        }, 1000);
    }
}
