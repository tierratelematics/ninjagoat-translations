import {IPromise} from "rx";
import {Dictionary} from "ninjagoat";

interface ITranslationsLoader {
    load(language:string):IPromise<Dictionary<string>>;
}

export default ITranslationsLoader