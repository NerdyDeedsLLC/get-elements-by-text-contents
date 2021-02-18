# get-elements-by-text-contents
 
[![NPM](https://img.shields.io/badge/npm-v.6.14.9-blue)](https://www.npmjs.org/package/get-elements-by-text-contents)
[![js-standard-style](https://img.shields.io/badge/JS-Vanilla-white)](http://vanilla-js.com/)
[![dark-side](https://img.shields.io/badge/Force-Strong%20with%20this%20one-black)](https://youtu.be/lFEoT7M3SbI?t=42)

NPM Package - Extremely-lightweight, flexible method which allows the user to search the 
[DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) for all [nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node) containing a 
specific, provided search string. Supports [DOM tree-scoping](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode), 
case-(in)sensitivity as well as an exclusionary [selector](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)
 to omit matching nodes. 

No dependencies.

# So what does it ACTUALLY do?
If you wanna search a page for every instance of a string, and get back the elements that CONTAIN those instances - 
almost instantly, and without mutating or having to iterate the entire DOM - this is your method.

In goes search text...

...out comes DOM nodes.

## Examples
``` javascript
// Import the method
const getElementsByTextContents = require('get-elements-by-text-contents');
//         ==OR==  (and this is personal preference; you do you):
document.getElementsByTextContents = require('get-elements-by-text-contents');

// Find your targets
console.log(getElementsByTextContents('myText'))
// RESULT => [p, div, a, h2]

console.log(getElementsByTextContents('MyTeXt', true))
// RESULT => [p, h2]

console.log(getElementsByTextContents('myText', false, ''))
// RESULT => [p, div, a, h2, script, script]

console.log(getElementsByTextContents('myText', false, 'script,p,h2'))
// RESULT => [div, a]
```

# getElementsByTextContents(searchText, [caseSensitive, [exclusionarySelector, [scope]]])

## Returns
This method will return an [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), 
regardless of the number of results it manages to locate. 

### If results are found...
Results will be returned in an array, in the form of the [parentNode](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode)
 of the located object (this is due to the text itself being present in a [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) node, 
 which are virtually impossible to interact with (especially without mutating the DOM). In short, you get back the node CONTAINING the text, not the
text itself).

### If no results are found...
In the case of zero results, the returned array will simply be blank (`[]`).

### If no parameters are passed to the method at all...
If you omit ALL the parameters to the method, its default behavior is to return an array containing the `node` of every 
**NON-`<script>`** [element](https://developer.mozilla.org/en-US/docs/Web/API/Element) within the DOM, with `document.body` as 
their collective [root](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker/root).


## Usage/Parameters
_Note: Below examples are assuming an html page that looks like the following._

``` html
<a href="#findtext">Method: Find This Text</a>
<h4>Find This Text</h4>
<p class="desc">
    I wanted a method that would let me find this text and return all the 
    nodes on the page containing it. So I wrote one.
</p>
<script>
    // Looking for a quick method to "find this text"?
    npm install get-elements-by-text-contents
</script>
```


### searchText (string/regex)
A [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
or a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
that will result in a match for the text the user wishes to find within the page.

``` javascript
getElementsByTextContents('find this text');
// => [a, h4, p]

getElementsByTextContents(/.+find this/im);
// => [a, p]
// Note that the <h4> is omitted, due to the regular expression requiring text to preface the 
// matched string.
```

### caseSensitive (boolean; optional) [default: false]
Whether or not the search should be [case sensitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase)

``` javascript
getElementsByTextContents('find this text', true);
// => [p]
// Note that the <a> and <h4> tags are omitted, due to their being written In Title Case.
```

### exclusionarySelector (string) [default: 'script']
CSS selector used to EXCLUDE nodes containing the search string. Any nodes with characteristics matching the selector will NOT be returned within the result set.
By default `<script>` tags are excluded, as they are [non-interactive within the DOM](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#scripting). 
This can be overridden by simply passing a blank string (`""`) or a `null` into this parameter.
_Note that if you override this parameter to pass in a new set of exclusions, `<script>` tags will NOT be omitted unless you expressly include them in your selector._

``` javascript
getElementsByTextContents('find this text', false, '');
// => [a, h4, p, script]
// Note the inclusion of the script tag in the search results: passing the blank string 
// as the third parameter overrides the default selector of "script".

getElementsByTextContents('find this text', false, '[href],.desc,script');
// => [h4]
// In this case, the exclusionary selector omits all the results other than the <h4> (those that match
// the selector: any tag with an href property, a class of 'desc' or that itself is a <script> tag.
```

### scope (string) [default: `document.body`]
Dictates the [root DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker/root) from which to begin the search. 
If none is specified, `document.body` is assumed.

``` javascript
getElementsByTextContents('find this text', false, '', document.querySelector('h4'));
// => [h4]
// Since it is the only node within the document fragment our examples have been based within, 
// naturally it's the only one returned.
```

## LICENSE [MIT](LICENSE)