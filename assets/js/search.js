---
---
function initSearch() {
  var input = document.getElementById('search-input');
  var button = document.getElementById('search-button');
  var results = document.getElementById('search-results');
  if (!input || !button || !results) return;

  var indexData = [];
  fetch('{{ "/search.json" | relative_url }}')
    .then(function(res) { return res.json(); })
    .then(function(data) { indexData = data; });

  function search() {
    var query = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!query) return;
    var matches = indexData.filter(function(item) {
      return item.content.toLowerCase().indexOf(query) !== -1 ||
             item.title.toLowerCase().indexOf(query) !== -1;
    });
    matches.forEach(function(item) {
      var div = document.createElement('div');
      var a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      div.appendChild(a);
      results.appendChild(div);
    });
  }

  button.addEventListener('click', search);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      search();
    }
  });
}

document.addEventListener('DOMContentLoaded', initSearch);
