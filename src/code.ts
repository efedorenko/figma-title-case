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

async function convertTextToTitleCase(node: TextNode) {
  const textInTitleCase: string = node.characters.toTitleCase();
  const { fontName } = node;

  if (!isMixedFont(fontName)) {
    await figma.loadFontAsync(fontName).then(() => {
      node.textCase = 'ORIGINAL';
      node.characters = textInTitleCase;
    });
  } else if (!alertOnce) {
    alertOnce = true;
    figma.notify('Can’t modify text layer with multiple fonts.')
  }
}

let { selection } = figma.currentPage;

if (selection.length) {
  for (const [index, node] of selection.entries()) {
    if (node.type === 'TEXT') {
      if (!node.hasMissingFont) {
        await convertTextToTitleCase(node);
      } else {
        figma.notify('The font used in selected layer is missing.');
      }
    } else {
      figma.notify('Selected layer has no text.');
    }

    if (index === selection.length - 1) {
      figma.closePlugin();
    }
  }
} else {
  figma.notify('Select a text layer before running Proper Title Case.');
  figma.closePlugin();
}