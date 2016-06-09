import {IPromise} from "rx";

interface ILanguageRetriever {
    retrieve():IPromise<string>;
}

export default ILanguageRetriever