import ILanguageRetriever from "./ILanguageRetriever";
import * as Promise from "bluebird";
import {IPromise} from "rx";
import {injectable} from "inversify";

@injectable()
class BrowserLanguageRetriever implements ILanguageRetriever {

    retrieve():IPromise<string> {
        return Promise.resolve((window.navigator.userLanguage || window.navigator.language).slice(0, 2));
    }

}

export default BrowserLanguageRetriever