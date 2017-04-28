import { Observable } from "rx";

interface ILanguageRetriever {
    retrieve(): Observable<string>;
}

export default ILanguageRetriever;
