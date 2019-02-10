# babel-plugin-create-automation-page-objects
Scans react JSX elements for automation attribute to create automation page objects

This plugin aims to cut down the amount of QE time needed creating automated test regression specs/suites for JSX based apps.

```
npm install babel-plugin-create-automation-page-objects -D
```

## Prerequisite:
- React 16+ (it allows custom html attributes to be passed to the DOM)
- other JSX frameworks currently untested

## Typical scenario:
Opening your page objects file, seeing if an element already exists , then opening the browser / inspecting an element finding it's class or id and going back to you IDE to record it in a page objects file. Then whenever someone makes changes or updates an identifier it's not caught until later on when tests are failing causing a lot of wasted time troubleshooting.

## Solution:
This babel plugin scans each JSX element for an attribute called automation with a string value being the identifier.
Example from a JSX component:

 ```<button automation="submitButton"> Submit </button>```

Then it creates a file given some template information you provided in package.json or babelrc file.

Template example package.json: (the string ELEMENT in elementTemplate gets replaced with the identifier)
```
"plugins": [
      "transform-class-properties",
      "transform-object-rest-spread",
      "transform-react-remove-prop-types",
      ["create-automation-page-objects",{
        "filePrefix": "const {Element} = require('somePageObjectWrapperExample'); \n const elements = { \n",
        "elementTemplate": "ELEMENT: new Element('[automation=\"ELEMENT\"]'), \n",
        "fileSuffix": "\n }; \n module.exports = elements;",
        "saveFilePath": "automation/pages/index.js"
      }]
```

Finished file example:
You can then use your new page objects in automation specs
```
const {Element} = require('somePageObjectWrapperExample'); 
const elements = { 
username: new Element('[automation="username"]'), 
password: new Element('[automation="password"]'), 
submitButton: new Element('[automation="submitButton"]'),
loading: new Element('[automation="loading"]'), 

 }; 
 module.exports = elements;
```

## Notes
- This is an initial prototype and code contributions/issues/ideas are very much welcomed in the github repo.
- It will automatically not add duplicate page objects but will add modified ones currently so manual removal is still needed.
- Don't forget ELEMENT is the keyword required in elementTemplate configuration that gets replaced with the actual value


