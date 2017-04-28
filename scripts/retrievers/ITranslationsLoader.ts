import {Dictionary} from "ninjagoat";

interface ITranslationsLoader {
    load(language: string): Promise<Dictionary<string>>;
}

export default ITranslationsLoader;
