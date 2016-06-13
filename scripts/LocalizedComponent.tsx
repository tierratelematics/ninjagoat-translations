import * as React from "react";
import ITranslationsManager from "./ITranslationsManager";
import {Dictionary} from "ninjagoat";
import {IntlProvider} from "react-intl";
import * as _ from "lodash";

class LocalizedComponent extends React.Component<{ translationsManager:ITranslationsManager }, { translations:Dictionary<string> }> {

    constructor(props:{ translationsManager:ITranslationsManager, template:React.ReactElement<any>}) {
        super(props);
        this.state = {
            translations: null,
        };
    }

    componentWillMount() {
        this.props.translationsManager.load().then(translations => this.setState({translations: translations}));
    }

    render() {
        if (this.state.translations) {
            console.log(this.props.children[1] instanceof React.ReactNode);
            return (
                <IntlProvider locale="en" messages={this.state.translations}>
                    { React.Children.only(this.props.children)}
                </IntlProvider>
            );
        }
        return <div></div>;
    }
}

export default LocalizedComponent