import { Observable } from "rxjs";
import { Dictionary } from "ninjagoat";

interface ITranslationsRunner {
    run(): Observable<{ language: string; translations: Dictionary<string> }>;
}

export default ITranslationsRunner;
