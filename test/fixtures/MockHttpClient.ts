import {IHttpClient, Dictionary, HttpResponse} from "ninjagoat";
import {Observable, of} from "rxjs";

class MockHttpClient implements IHttpClient {

    get(url: string, headers?: Dictionary<string>): Observable<HttpResponse> {
        return of(new HttpResponse(null, null));
    }

    post(url: string, body: any, headers?: Dictionary<string>): Observable<HttpResponse> {
        return undefined;
    }

    put(url: string, body: any, headers?: Dictionary<string>): Observable<HttpResponse> {
        return undefined;
    }

    delete(url: string, headers?: Dictionary<string>): Observable<HttpResponse> {
        return undefined;
    }

}

export default MockHttpClient;
