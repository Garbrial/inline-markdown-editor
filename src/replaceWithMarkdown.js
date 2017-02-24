// Runs megamark with default whitelist
module.exports = function replaceWithMarkdown(element) {
  var html = require('megamark')(
    element,
    { 
      sanitizer: {  
        allowedTags: [
          "a", "article", "b", "blockquote", "br", "caption", "code", "del", "details", "div", "em",
          "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "main", "ol",
          "p", "pre", "section", "span", "strike", "strong", "sub", "summary", "sup", "table",
          "tbody", "td", "th", "thead", "tr", "u", "ul", 
          "form", "input", "textarea", "div", "script", "iframe", "button"
        ],
        allowedAttributes: {
          a: ['class', 'id', 'href'],
          button: ['class', 'id'],
          div: ['class', 'id', 'style'],
          p: ['class', 'id', 'style'],
          form: ['class', 'id'],
          input: ['class', 'id', 'name', 'placeholder'],
          textarea: ['class', 'id', 'name', 'placeholder'],
          iframe: ['class', 'id', 'src']
        }
        //"allowedClasses": "class"
      }
    }
  );
  html = addCallouts(html);
  html = addHashtags(html);
  return html;
}

function addCallouts(html) {
  var pattern = /(^|\s)@([A-z\_]+)\b/g;
  return html.replace(pattern, function replaceCallouts(m, p1, p2) {
    return p1 + '<a href="/profile/' + p2 + '">@' + p2 + '</a>';
  });
}

function addHashtags(html) {
  var pattern = /(^|\s)#([A-z\-]+)\b/g;
  return html.replace(pattern, function replaceHashtags(m, p1, p2) {
    return p1 + '<a href="/tag/' + p2 + '">#' + p2 + '</a>';
  });
}
