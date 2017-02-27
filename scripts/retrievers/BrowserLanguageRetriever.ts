import ILanguageRetriever from "./ILanguageRetriever";
import {injectable} from "inversify";

@injectable()
class BrowserLanguageRetriever implements ILanguageRetriever {

    retrieve():Promise<string> {
        let anyWindow = <any>window;
        let preferredLanguage = anyWindow.navigator.languages ? anyWindow.navigator.languages[0] : null;
        return Promise.resolve((preferredLanguage || anyWindow.navigator.userLanguage || anyWindow.navigator.language).slice(0, 2));
    }

}

export default BrowserLanguageRetriever