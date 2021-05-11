import ITranslationsLoader from "./ITranslationsLoader";
import {Dictionary, HttpResponse, IHttpClient} from "ninjagoat";
import {inject, injectable} from "inversify";
import {map} from "rxjs/operators";
import ITranslationsUrlBuilder from "../ITranslationsUrlBuilder";

@injectable()
class TranslationsLoader implements ITranslationsLoader {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("ITranslationsUrlBuilder") private urlBuilder: ITranslationsUrlBuilder) {

    }

    load(language: string): Promise<Dictionary<string>> {
        return <Promise<Dictionary<string>>>this.httpClient
            .get(this.urlBuilder.getUrl(language))
            .pipe(
                map((response: HttpResponse) => response.response)
            )
            .toPromise();
    }
}

export default TranslationsLoader;
