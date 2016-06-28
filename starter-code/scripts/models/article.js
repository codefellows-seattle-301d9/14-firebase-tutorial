(function(module) {
  function Article (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }

  Article.allArticles = [];

  Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    if(this.daysAgo < 1) {
      this.publishStatus = '(published today)';
    } else {
      this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    }
    this.body = marked(this.body);
    return template(this);
  };

  Article.loadAll = function(dataWePassIn) {
    Article.allArticles = dataWePassIn.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Article(ele);
    });
  };

  Article.fetchAll = function(nextFunction) {
    if (localStorage.hackerIpsum) {
      $.ajax({
        type: 'HEAD',
        url: '/data/hackerIpsum.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Article.getAll(nextFunction);
          } else {
            Article.loadAll(JSON.parse(localStorage.hackerIpsum));
            nextFunction();
          }
        }
      });
    } else {
      Article.getAll(nextFunction);
    }
  };

  Article.getAll = function(nextFunction) {
    $.getJSON('/data/hackerIpsum.json', function(responseData) {
      Article.loadAll(responseData);
      localStorage.hackerIpsum = JSON.stringify(responseData);
      nextFunction();
    });
  };

  Article.numWordsAll = function() {
    return Article.allArticles.map(function(article) {
      return article.body.match(/\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.allAuthors = function() {
    return Article.allArticles.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.allArticles.filter(function(article) {
          return article.author === author;
        })
        .map(function(authorArticles) {
          return authorArticles.body.match(/\w+/g).length;
        })
        .reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };
  module.Article = Article;
})(window);
