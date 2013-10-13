'use strict';

module.exports = function(app) {

// Get Index homepage
	app.get('/', function(req, res){
		res.render('index', { title: 'Beranda' });
	});

/* Static pages */
  app.get('/visi', function(req, res){
    res.render('visi', {
      title: 'Visi Misi'
    });
  });

  app.get('/galeri', function(req, res){
    res.render('galeri', {
      title: 'Galeri'
    });
  });

  app.get('/tentang', function(req, res){
    res.render('tentang', {
      title: 'Tentang Kami'
    });
  });

  /* Admin page */
  app.get('/admin', function(req, res){
    res.render('admin', {
      title: 'Admin'
    });
  });

  app.use(function(req, res){
    res.render('404.jade', {
      "title": "Not Found"
    });   
  });

};

