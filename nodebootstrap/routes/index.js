
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'index' });
};

exports.election = function(req, res){
  res.render('election', { title: 'election' });
};

exports.leaflet = function(req, res){
  res.render('leaflet', { title: 'leaflet' });
};

exports.purchase = function(req, res){
  res.render('purchase', { title: 'purchase' });
};

exports.ureport = function(req, res){
  res.render('ureport', { title: 'ureport' });
};

exports.mail = function(req, res) {
  res.render('mail', { title: 'mail' });
};