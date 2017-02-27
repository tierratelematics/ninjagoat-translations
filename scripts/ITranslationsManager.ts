import {Dictionary} from "ninjagoat";

interface ITranslationsManager {
    translate(key:string, fallback?:string):string;
    load():Promise<{ language:string; translations:Dictionary<string> }>;
}

export default ITranslationsManager