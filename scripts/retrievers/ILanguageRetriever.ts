import { Observable } from "rxjs";

interface ILanguageRetriever {
    retrieve(): Observable<string>;
}

export default ILanguageRetriever;
