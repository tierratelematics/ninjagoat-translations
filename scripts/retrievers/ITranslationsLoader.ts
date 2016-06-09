import {IPromise} from "rx";
import {Dictionary} from "ninjagoat";

interface ITranslationsLoader {
    load():IPromise<Dictionary<string>>;
}

export default ITranslationsLoader