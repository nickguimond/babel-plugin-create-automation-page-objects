const fs = require('fs');

const createPageObjects = function() {
    const pageObjects = {};
    return {
      visitor: {
        JSXElement: {
          enter(path, state) {
            path.node.openingElement.attributes.forEach(att => {
              if(att.name && att.name.name === 'automation') {
                  pageObjects[att.value.value] = att.value.value;
                  let fileData = state.opts.filePrefix;

                  Object.keys(pageObjects).forEach(elem => {
                      fileData += state.opts.elementTemplate.replace(/ELEMENT/g, elem);
                  });

                  fileData += state.opts.fileSuffix;
                  fs.writeFileSync(state.opts.saveFilePath, fileData, function (err) {
                    if (err) return;
                  });
              }
            })
          }
        }
      }
    };
  }

module.exports = createPageObjects;