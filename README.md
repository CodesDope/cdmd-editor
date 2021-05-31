# cdmd-editor

> A custom lightweight markdown editor for CodesDope

<!-- [![NPM](https://img.shields.io/npm/v/cdmd-editor.svg)](https://www.npmjs.com/package/cdmd-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) -->

## Install

```bash
npm install --save cdmd-editor
```

## Usage

```jsx
import React, { Component } from 'react';

import MyComponent from 'cdmd-editor';
import 'cdmd-editor/dist/index.css';

class Example extends Component {
    render() {
        return <MyComponent />;
    }
}
```

## Thanks

This project is inspired from [react-markdown-editor-lite](https://github.com/HarryChen0506/react-markdown-editor-lite/)

## API

| prop                   | Description                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| cdmdContainerClassName | Parent wrapper className                                                                                                 |
| toolbarClassName       | Toolbar wrapper className                                                                                                |
| textareaId             | Textarea Id (default is cdmd-editor-area)                                                                                |
| name                   | Textarea name                                                                                                            |
| placeholder            | Textarea placeholder                                                                                                     |
| readOnly               | If textarea is read-only                                                                                                 |
| editorClassName        | Textarea className                                                                                                       |
| rows                   | Number of rows (default is 5)                                                                                            |
| value                  | Value of textarea                                                                                                        |
| defaultValue           | Default value of textarea                                                                                                |
| onChange               | A funcation to receive content of the textarea -> {text: textareaContent}. E.g. - handleChange(obj) {setState(obj.text)} |
| spellCheck             | Boolean (default is `false`)                                                                                             |

## License

MIT © [CodesDope](https://github.com/codesdope)
