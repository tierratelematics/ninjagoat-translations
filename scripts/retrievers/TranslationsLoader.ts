import ITranslationsLoader from "./ITranslationsLoader";
import {Dictionary} from "ninjagoat";
import {injectable, inject} from "inversify";
import {IHttpClient} from "ninjagoat";
import ITranslationsConfig from "../ITranslationsConfig";
import {map} from "rxjs/operators";

@injectable()
class TranslationsLoader implements ITranslationsLoader {

    constructor(@inject("IHttpClient") private httpClient:IHttpClient,
                @inject("ITranslationsConfig") private config:ITranslationsConfig) {

    }

    load(language: string): Promise<Dictionary<string>> {
        return <Promise<Dictionary<string>>>this.httpClient
            .get(`${this.config.endpoint}/${language}.json`)
            .pipe(
                map(response => response.response)
            )
            .toPromise();
    }

}

export default TranslationsLoader;
