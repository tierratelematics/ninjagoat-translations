import ILanguageRetriever from "./ILanguageRetriever";
import * as Promise from "bluebird";
import {IPromise} from "rx";
import {injectable} from "inversify";

@injectable()
class BrowserLanguageRetriever implements ILanguageRetriever {

    retrieve():IPromise<string> {
        let preferredLanguage = (<any>window).navigator.languages ? (<any>window).navigator.languages[0] : null;
        return Promise.resolve((preferredLanguage || window.navigator.userLanguage || window.navigator.language).slice(0, 2));
    }

}

export default BrowserLanguageRetriever