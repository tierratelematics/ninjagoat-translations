import ITranslationsLoader from "./ITranslationsLoader";
import {IPromise} from "rx";
import {Dictionary} from "ninjagoat";
import {injectable, inject} from "inversify";
import {IHttpClient} from "ninjagoat";
import ITranslationsConfig from "../ITranslationsConfig";
import ILanguageRetriever from "./ILanguageRetriever";

@injectable()
class TranslationsLoader implements ITranslationsLoader {

    constructor(@inject("IHttpClient") private httpClient:IHttpClient,
                @inject("ITranslationsConfig") private config:ITranslationsConfig,
                @inject("ILanguageRetriever") private languageRetriever:ILanguageRetriever) {

    }

    load():IPromise<Dictionary<string>> {
        return this.languageRetriever.retrieve()
            .then(language => this.httpClient
                .get(`${this.config.endpoint}/${language}`)
                .map(response => response.response)
                .toPromise());
    }

}

export default TranslationsLoader