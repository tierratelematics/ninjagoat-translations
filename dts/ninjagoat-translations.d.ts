/// <reference path="../typings/index.d.ts" />

import {IPromise} from "rx";
import {Dictionary} from "ninjagoat";
import {IHttpClient} from "ninjagoat";
import {Application} from "ninjagoat";
import * as React from "react";

declare module NinjagoatTranslations {

    export interface ILanguageRetriever {
        retrieve():IPromise<string>;
    }

    export interface ITranslationsLoader {
        load(language:string):IPromise<Dictionary<string>>;
    }

    export interface ITranslationsConfig {
        endpoint:string;
    }

    export interface ITranslationsManager {
        translate(key:string, fallback:string):string;
        load():IPromise<Dictionary<string>>;
    }

    export class TranslationsLoader implements ITranslationsLoader {

        constructor(httpClient:IHttpClient, config:ITranslationsConfig);

        load(language:string):IPromise<Dictionary<string>>;
    }

    export class TranslationsManager implements ITranslationsManager {

        constructor(languageRetriever:ILanguageRetriever, translationsLoader:ITranslationsLoader);

        load():IPromise<Dictionary<string>>;

        translate(key:string, fallback:string):string;
    }

    export class LocalizedApplication extends Application {

    }

    namespace IntlComponent {
        interface DateTimeFormatProps {
            /*
             * one of "best fit" (default) | "lookup"
             */
            localeMatcher?:string;
            /*
             * one of "basic" (default) | "best fit"
             */
            formatMatcher?:string;
            timeZone?:string,
            hour12?:boolean;
            /*
             * one of "narrow" (default) | "short" | "long"
             */
            weekday?:string;
            /*
             * one of "narrow" (default) | "short" | "long"
             */
            era?:string;
            /*
             * one of "numeric" (default) | "2-digit"
             */
            year?:string;
            /*
             * one of "numeric" (default) | "2-digit" | "narrow" | "short" | "long"
             */
            month?:string;
            /*
             * one of "numeric" (default) | "2-digit"
             */
            day?:string;
            /*
             * one of "numeric" (default) | "2-digit"
             */
            hour?:string;
            /*
             * one of "numeric" (default) | "2-digit"
             */
            minute?:string;
            /*
             * one of "numeric" (default) | "2-digit"
             */
            second?:string;
            /*
             * one of "short" (default) | "long"
             */
            timeZoneName?:string;
        }
    }

    namespace FormattedDate {
        export interface PropsBase extends IntlComponent.DateTimeFormatProps {
            format?:string;
        }

        export interface Props extends PropsBase {
            value:Date;
        }
    }
    export class FormattedDate extends React.Component<FormattedDate.Props, any> {
    }


    namespace FormattedTime {
        export interface PropsBase extends IntlComponent.DateTimeFormatProps {
            format?:string;
        }

        export interface Props extends PropsBase {
            value:Date;
        }
    }
    export class FormattedTime extends React.Component<FormattedTime.Props, any> {
    }


    namespace FormattedRelative {
        export interface PropsBase {
            /*
             * one of "second", "minute", "hour", "day", "month" or "year"
             */
            units?:string;
            /*
             * one of "best fit" (default) | "numeric"
             */
            style?:string;
            format?:string;
            updateInterval?:number;
            initialNow?:any;
        }

        export interface Props extends PropsBase {
            value:number;
        }
    }
    export class FormattedRelative extends React.Component<FormattedRelative.Props, any> {
    }


    namespace FormattedMessage {
        export interface MessageDescriptor {
            id:string;
            description?:string;
            defaultMessage?:string;
        }

        export interface Props extends MessageDescriptor {
            values?:Object;
            tagName?:string;
        }
    }
    export class FormattedMessage extends React.Component<FormattedMessage.Props, any> {
    }


    export class FormattedHTMLMessage extends React.Component<FormattedMessage.Props, any> {
    }


    namespace FormattedNumber {
        export interface PropsBase {
            format?:string;
            /*
             * one of "best fit" (default) | "lookup"
             */
            localeMatcher?:string;
            /*
             * one of "decimal" (default) | "currency" | "percent"
             */
            style?:string;
            currency?:string,
            /*
             * one of "symbol" (default) | "code" | "name"
             */
            currencyDisplay?:string;
            useGrouping?:boolean;
            minimumIntegerDigits?:number;
            minimumFractionDigits?:number;
            maximumFractionDigits?:number;
            minimumSignificantDigits?:number;
            maximumSignificantDigits?:number;
        }

        export interface Props extends PropsBase {
            value:number;
        }
    }
    export class FormattedNumber extends React.Component<FormattedNumber.Props, any> {
    }


    namespace FormattedPlural {
        export interface PropsBase {
            /*
             * one of "cardinal" (default) | "ordinal"
             */
            style?:string;
            other?:any;
            zero?:any;
            one?:any;
            two?:any;
            few?:any;
            many?:any;
        }

        export interface Props extends PropsBase {
            value:number;
        }
    }
    export class FormattedPlural extends React.Component<FormattedPlural.Props, any> {
    }


}

export = NinjagoatTranslations;