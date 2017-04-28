import * as React from "react";
import ITranslationsRunner from "./ITranslationsRunner";
import { Dictionary } from "ninjagoat";
import { IntlProvider } from "react-intl";

class LocalizedComponent extends React.Component<{ translationsRunner: ITranslationsRunner }, { language: string; translations: Dictionary<string> }> {

    constructor(props: { translationsRunner: ITranslationsRunner }) {
        super(props);
        this.state = {
            translations: null,
            language: ""
        };
    }

    componentWillMount() {
        this.props.translationsRunner.run().subscribe(translations => this.setState(translations));
    }

    render() {
        if (this.state.translations) {
            let child = React.Children.toArray(this.props.children)[1];
            return (
                <IntlProvider locale="en" messages={this.state.translations}>
                    {child}
                </IntlProvider>
            );
        }
        return <div></div>;
    }
}

export default LocalizedComponent;
