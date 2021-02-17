    /**
    * getElementsByTextContents
    * @description                                     Extremely-lightweight, flexible method which allows the user to search the DOM for all nodes containing a specific, 
    *                                                  provided search string. Supports DOM tree scoping, case-(in)sensitivity as well as an exclusionary selector to omit 
    *                                                  nodes matching said selector. No dependencies.
    * @param   {string/regex}  searchText              A string or a regular expression that will result in a match for the text the user wishes to find within the page
    * @param   {boolean}       caseSensitive           Whether or not the search should be case sensitive [default: false]
    * @param   {string}        exclusionarySelector    A valid CSS selector that will exclude any nodes that match it (use "" or null to disable) [default: 'script']
    * @param   {node}          scope                   A valid DOM node within which to begin the search (the "topmost" DOM object in the tree) [default: document.body]
    * @return  {array}                                 Returns either an array of nodes (the parentNodes of any node containing the search text) or an empty collection
    * 
    * @author                                          @JJ - Nerdy Deeds, LLC.
    * @license {none}                                  Feel free. There IS a npm package built around this (getElementsByTextContents), however. 
    *                                                  Its license terms are contained therein.
    *  
    **/
    module.exports = (searchText=/.*/, caseSensitive=false, exclusionarySelector='script', scope=document.body) => {
        let flags      = caseSensitive                                                                          // If we're doing a case-sensitive search...
                       ? 'm'                                                                                    // ... set only mutli-line flags...
                       : 'im'                                                                                   // ... otherwise, set multi-line AND insensitive flags.
          , testRegEx  = typeof(searchText.exec === 'undefined')                                                // If our search IS NOT already a regex statement...
                       ? new RegExp(searchText, flags)                                                          // ... make it one with our flags
                       : searchText                                                                             // ... otherwise, assume the user knows what they're doing.
          , excluding  = (typeof(exclusionarySelector) !== string || exclusionarySelector == '')                // If the user has passed a blank or null into exclusions
                       ? ':not(*)'                                                                              // ... assume they want to disable and make a valid selector
                       : exclusionarySelector                                                                   // ... otherwise, use it as it stands.
          , foundNodes = [];                                                                                    // Temp variable to hold the results of the search
        
        treeWalkerNodes = document.createTreeWalker(                                                            // Return all DOM Nodes...
            scope,                                                                                              // ... contained in specified DOM scope...
            4,                                                                                                  // ... that are textNodes...
            { 
                acceptNode: function(node) {                                                                    // ... and meet the criteria:
                                            return  node.parentNode != nu                                       // ... they have a valid parentNode...
                                                    && node.nodeValue != nu                                     // ... they have parseable contents...
                                                    && !node.parentNode.matches(exclusionarySelector)           // ... they DON'T match our exclusions...
                                                    && testRegEx.test(node.nodeValue.trim())                    // ... and they DO contain the searchText.
                                                ?   NodeFilter.FILTER_ACCEPT                                    // Inbuilt constant to accept/approve a node
                                                :   NodeFilter.FILTER_REJECT;                                   // Inbuilt constant to reject/deny a node
                                         } 
            }
        );
    
        while ((node = treeWalkerNodes.nextNode())) {                                                           // Iterate the resultant nodes...
          foundNodes.push(node.parentNode);                                                                     // ... and plunk down each's parent into a collection.
        }                                                                                                       // (Remember, we SEARCHED TEXT nodes. We WANT DOM nodes)
        return  foundNodes.length > 0                                                                           // IF there're any results...
            ?   foundNodes                                                                                      // ... return them in an array.
            :   [];                                                                                             // OTHERWISE return an empty collection.
    }