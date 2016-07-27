import * as React from "react";
import ITranslationsManager from "./ITranslationsManager";
import {Dictionary} from "ninjagoat";
import {IntlProvider} from "react-intl";

class LocalizedComponent extends React.Component<{ translationsManager:ITranslationsManager }, { language:string; translations:Dictionary<string> }> {

    constructor(props:{ translationsManager:ITranslationsManager, template:React.ReactElement<any>}) {
        super(props);
        this.state = {
            translations: null,
            language: ""
        };
    }

    componentWillMount() {
        this.props.translationsManager.load().then(translations => this.setState(translations));
    }

    render() {
        if (this.state.translations) {
            let child = React.Children.toArray(this.props.children)[1];
            return (
                <IntlProvider locale="en" messages={this.state.translations}>
                    { child }
                </IntlProvider>
            );
        }
        return <div></div>;
    }
}

export default LocalizedComponent