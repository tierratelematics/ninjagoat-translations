import {Dictionary} from "ninjagoat";
import {IHttpClient} from "ninjagoat";
import {Application} from "ninjagoat";
import * as React from "react";
import {IViewModelRegistry} from "ninjagoat";
import {interfaces} from "inversify";
import {IServiceLocator} from "ninjagoat";
import {IModule} from "ninjagoat";
import {Observable} from "rx";

export class TranslationsModule implements IModule {

    modules: (container: interfaces.Container) => void;

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void;
}

export interface ILanguageRetriever {
    retrieve(): Observable<string>;
}

export interface ITranslationsLoader {
    load(language: string): Promise<Dictionary<string>>;
}

export interface ITranslationsConfig {
    endpoint: string;
}

export interface ITranslationsManager {
    translate(key: string, fallback?: string): string;
}

export interface ITranslationsRunner {
    run(): Observable<{ language: string; translations: Dictionary<string> }>;
}

export class TranslationsLoader implements ITranslationsLoader {

    constructor(httpClient: IHttpClient, config: ITranslationsConfig);

    load(language: string): Promise<Dictionary<string>>;
}

export class TranslationsManager implements ITranslationsManager {

    constructor(translationsRunner: ITranslationsRunner);

    translate(key: string, fallback?: string): string;
}

export class TranslationsRunner implements ITranslationsRunner {
    constructor(languageRetriever: ILanguageRetriever, translationsLoader: ITranslationsLoader);

    run(): Observable<{ language: string; translations: Dictionary<string> }>;
}

export class LocalizedApplication extends Application {

}

export {
    FormattedDate,
    FormattedHTMLMessage,
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
    FormattedRelative,
    FormattedTime
} from "react-intl";
