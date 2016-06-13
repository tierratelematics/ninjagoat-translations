import ITranslationsLoader from "./ITranslationsLoader";
import {IPromise} from "rx";
import {Dictionary} from "ninjagoat";
import {injectable, inject} from "inversify";
import {IHttpClient} from "ninjagoat";
import ITranslationsConfig from "../ITranslationsConfig";

@injectable()
class TranslationsLoader implements ITranslationsLoader {

    constructor(@inject("IHttpClient") private httpClient:IHttpClient,
                @inject("ITranslationsConfig") private config:ITranslationsConfig) {

    }

    load(language:string):IPromise<Dictionary<string>> {
        return this.httpClient
            .get(`${this.config.endpoint}/${language}`)
            .map(response => response.response)
            .toPromise();
    }

}

export default TranslationsLoader