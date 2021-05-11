import ITranslationsUrlBuilder from "./ITranslationsUrlBuilder";
import {inject, injectable} from "inversify";

import ITranslationsConfig from "./ITranslationsConfig";


@injectable()
export default class TranslationsUrlBuilder implements ITranslationsUrlBuilder {

    constructor(@inject("ITranslationsConfig") private config: ITranslationsConfig) {}

    getUrl(language: string): string {
        return `${this.config.endpoint}/${language}.json`;
    }
}
