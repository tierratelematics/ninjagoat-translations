# Ninjagoat-translations

Ninjagoat bindings for [react-intl](https://github.com/yahoo/react-intl).
Exposes some components to translate messages inside views and a service to do that for the viewmodel side.


## Installation

`
$ npm install ninjagoat-translations
`

Add this code to the bootstrapper.ts file:

```typescript
import {TranslationsModule, LocalizedApplication} from "ninjagoat-translations"

let application = new LocalizedApplication();
application.register(new TranslationsModule());
```

Point to the translations endpoint in one of your modules.

```typescript
import {ITranslationsConfig} from "ninjagoat-translations"

container.bind<ITranslationsConfig>("ITranslationsConfig").toConstantValue({
    "endpoint": "your_translations_endpoint" 
});
```

## Usage

To translate a message inside a view use a FormattedMessage.

```typescript
class MyView extends View<MyViewModel> {
 
    render() {
        return <div>
            <FormattedMessage id="label_id" />
         </div>
    }
}
```

To translate a message inside a viewmodel use the TranslationsManager.

```typescript
class MyViewModel extends ObservableViewModel<MyModel> {
    
    constructor(@inject("ITranslationsManager") translationsManager:ITranslationsManager) {
        let labelTranslated = translationsManager.translate("label_id");
    }   
}
```

### Custom language

By default the language is taken from the one in the browser settings. If you need a different mechanism you can implement your own LanguageRetriever and register it.

```typescript
class MyLanguageRetriever implements ILanguageRetriever {
    
     retrieve():Promise<string> {
          //Return a promise with the desired language
    }
}

container.unbind("ILanguageRetriever");
container.bind<ILanguageRetriever>("ILanguageRetriever").to(MyLanguageRetriever);
```

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
