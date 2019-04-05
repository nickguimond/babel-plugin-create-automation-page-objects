const fs = require('fs');

const createPageObjects = function() {
    const pageObjectsUnordered = {};
    return {
      visitor: {
        JSXElement: {
          enter(path, state) {
            path.node.openingElement.attributes.forEach(att => {

              if(att.name && att.name.name === 'data-automation') {
                pageObjectsUnordered[att.value.value] = att.value.value;
                  const pageObjectsOrdered = {};
                  Object.keys(pageObjectsUnordered).sort().forEach(function(key) {
                    pageObjectsOrdered[key] = pageObjectsUnordered[key];
                  });
                  fs.writeFileSync(state.opts.saveFilePath, JSON.stringify(pageObjectsOrdered), 'utf8' , function (err) {
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