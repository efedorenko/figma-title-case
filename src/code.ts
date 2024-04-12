import '@gouch/to-title-case';

declare global {
  interface String {
    toTitleCase() : string;
  }
}

let summary = {
  success: 0,
  fontProblem: 0,
  noText: 0,
};
let { selection } = figma.currentPage;

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
      summary.success++;
    });
  } else {
    // Can’t modify text layer with multiple fonts.
    summary.fontProblem++;
  }
}

function finish() {
  const total = selection.length;
  const { success, fontProblem, noText } = summary;

  const layer = (num) => num === 1 ? 'layer' : 'layers';
  const has = (num) => num === 1 ? 'has' : 'have';

  if (total === 1) {
    if (success) {
      figma.notify('Proper Title Case applied.');
    }
    if (fontProblem) {
      figma.notify('Can’t modify the text layer with mixed or missing fonts.')
    }
    if (noText) {
      figma.notify('Selected layer has no text.');
    }
  } else if (total === success) {
    figma.notify(`Proper Title Case applied to ${total} text layers.`);
  } else {
      let msg = [];
      msg.push(`Proper Title Case applied to ${total} ${layer(total)}.`);
      if (success) {
        msg.push(`✅ ${success} converted.`);
      } else {
        msg.push(`❌ None converted.`);
      }
      if (fontProblem) {
        msg.push(`😵‍💫 ${fontProblem} ${has(fontProblem)} mixed/missing fonts.`);
      }
      if (noText) {
        msg.push(`⏩ ${noText} ${has(noText)} no text.`);
      }
      figma.notify(msg.join(' '));
  }
}

if (selection.length) {
  for (const [index, node] of selection.entries()) {
    if (node.type === 'TEXT') {
      if (!node.hasMissingFont) {
        await convertTextToTitleCase(node);
      } else {
        // The font used in selected layer is missing.
        summary.fontProblem++;
      }
    } else {
      // Selected layer has no text.
      summary.noText++;
    }

    if (index === selection.length - 1) {
      finish();
      figma.closePlugin();
    }
  }
} else {
  figma.notify('Select a text layer before running Proper Title Case.');
  figma.closePlugin();
}