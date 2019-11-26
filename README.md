# Proper Title Case Plugin for Figma

Format headlines and titles into a proper title case. The rules are based on style guides from APA, The Chicago Manual of Style, and modern conventions.

## But What About Built-In Title Case Option?

Figma’s built-in Title Case option capitalizes the first letter of every word, which is incorrect as articles, conjunctions, short prepositions, and some other small words should not be capitalized.

Incorrect capital case:
> From The Highest Heights To The Lowest Depths, In Photographs
>
> ‘Ford V Ferrari’ Finishes First At The Box Office

Proper title case:
> From the Highest Heights to the Lowest Depths, in Photographs
>
> ‘Ford v Ferrari’ Finishes First at the Box Office

## The Capitalization Rules

1. By default, capitalize all words
2. Always capitalize the first and last word in titles and subtitles
3. Capitalize both parts of hyphenated words
4. Lowercase articles: `a`, `an`, `the`
5. Lowercase conjunctions: `and`, `but`, `or`, `nor`
6. Lowercase short prepositions: `as`, `at`, `by`, `for`, `in`, `of`, `on`, `per`, `to`, `via`
7. Lowercase versus: `vs.`, `vs`, `v.`, `v`
8. Lowercase NYT words: `en`, `if`
9. Let intentional capitalization stand

## Acknowledgment

This plugin uses [David Gouch’s implementation](https://github.com/gouch/to-title-case) of [John Gruber’s explanation](https://daringfireball.net/2008/05/title_case) of title case.

## Implementation Details

* ✅ Update text in one or multiple layers
* ✅ Text Case preference in Figma is reset to Original
* 🚫 Doesn’t support text selection within a layer
* 🚫 Can’t work with text originally in uppercase
