import ITranslationsLoader from "./ITranslationsLoader";
import {Dictionary} from "ninjagoat";
import {injectable, inject} from "inversify";
import {IHttpClient} from "ninjagoat";
import ITranslationsUrlBuilder from "../ITranslationsUrlBuilder";

@injectable()
class TranslationsLoader implements ITranslationsLoader {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("ITranslationsUrlBuilder") private urlBuilder: ITranslationsUrlBuilder) {

    }

    load(language:string):Promise<Dictionary<string>> {
        return <Promise<Dictionary<string>>>this.httpClient
            .get(this.urlBuilder.getUrl(language))
            .map(response => response.response)
            .toPromise();
    }
}

export default TranslationsLoader;
