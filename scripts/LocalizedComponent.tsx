import * as React from "react";
import ITranslationsRunner from "./ITranslationsRunner";
import { Dictionary } from "ninjagoat";
import { IntlProvider } from "react-intl";
import { lazyInject } from "ninjagoat";

class LocalizedComponent extends React.Component<{}, { language: string; translations: Dictionary<string> }> {

    @lazyInject("ITranslationsRunner")
    private translationsRunner: ITranslationsRunner;

    constructor(props: {}) {
        super(props);
        this.state = {
            translations: null,
            language: ""
        };
    }

    componentWillMount() {
        this.translationsRunner.run().subscribe(translations => this.setState(translations));
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
