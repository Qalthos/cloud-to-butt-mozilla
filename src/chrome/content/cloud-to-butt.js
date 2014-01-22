(function() {

    function walk(node) 
    {
        // I stole this function from here:
        // http://is.gd/mwZp7E
    
        var child, next;
    
        switch ( node.nodeType )  
        {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while ( child ) 
                {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;
    
            case 3: // Text node
                handleText(node);
                break;
        }
    }
    
    function handleText(textNode)
    {
        var v = textNode.nodeValue;
    
        v = v.replace(/\b(T)he(\s+)(C)loud/gi, function(str, p1, p2, p3) {
            m = (p1 == "T") ? "M" : "m";
            b = (p3 == "C") ? "B" : "b";
            return m+"y" + p2 + b+"utt";
        });
        v = v.replace(/(C)loud/gi, function(str, p1) {
            b = (p1 == "C") ? "B" : "b";
            return b+"utt";
        });
        v = v.replace(/bitcoin/gi, 'Pokédollar');
        // http://xkcd.com/1288/
        v = v.replace(/(s)pace/gi, '$1paaaaace');
        v = v.replace(/Google Glass/gi, 'Virtual Boy');
        v = v.replace(/(s)martphone/gi, function(str, p1) {
            p = (p1 == 'S') ? 'P' : 'p';
            return p+'okédex';
        });
        v = v.replace(/(e)lectric/gi, function(str, p1) {
            a = (p1 == 'E') ? 'A' : 'a';
            return a+'tomic';
        });
        v = v.replace(/senator/gi, 'Elf-Lord');
        v = v.replace(/\belection\b/gi, 'eating contest');
        v = v.replace(/homeland(\s+)security/gi, 'Homestar$1Runner');
    
        textNode.nodeValue = v;
    }

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
