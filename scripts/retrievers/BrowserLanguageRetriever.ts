import ILanguageRetriever from "./ILanguageRetriever";
import { injectable } from "inversify";
import {Observable, of} from "rxjs";

@injectable()
class BrowserLanguageRetriever implements ILanguageRetriever {

    retrieve(): Observable<string> {
        let anyWindow = <any>window;
        let preferredLanguage = anyWindow.navigator.languages ? anyWindow.navigator.languages[0] : null;
        return of((preferredLanguage || anyWindow.navigator.userLanguage || anyWindow.navigator.language).slice(0, 2));
    }
}

export default BrowserLanguageRetriever;
