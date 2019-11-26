import '@gouch/to-title-case';

declare global {
  interface String {
    toTitleCase() : string;
  }
}

let alertOnce = false;

function isMixedFont(fontName: symbol | FontName): fontName is symbol {
  return (fontName as symbol) === figma.mixed;
}

function convertTextToTitleCase(node: TextNode) {
  const textInTitleCase: string = node.characters.toTitleCase();
  const { fontName } = node;

  if (!isMixedFont(fontName)) {
    figma.loadFontAsync(fontName).then(() => {
      node.textCase = 'ORIGINAL';
      node.characters = textInTitleCase;
    });
  } else if (!alertOnce) {
    alertOnce = true;
    alert('Can’t modify text layer with multiple fonts.');
  }
}

for (const node of figma.currentPage.selection) {
  if (node.type === 'TEXT') {
    if (!node.hasMissingFont) {
      convertTextToTitleCase(node);
    } else {
      alert('The font used in selected layer is missing.');
    }
  } else {
    alert('Selected layer has no text.');
  }
}

figma.closePlugin();
