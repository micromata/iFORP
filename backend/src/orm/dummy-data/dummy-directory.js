import { Directory } from '../entity/directory';
import { Page } from '../entity/page';
import { Asset } from '../entity/asset';

export function getDummyDirectory(fakeUploadedDirName) {
  const directory = new Directory();
  directory.name = fakeUploadedDirName;
  directory.pages = [];

  const page = new Page();
  page.name = `login.html`;
  page.body =
    '<main class="container"><header><nav class="navbar navbar-expand-md navbar-dark bg-dark"><a class="navbar-brand" href="#" data-interaction-id="1" data-interaction-target-view="1">Carousel</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarCollapse"><ul class="navbar-nav mr-auto"><li class="nav-item active"><a class="nav-link" href="#" data-interaction-id="2" data-interaction-target-view="2">Home <span class="sr-only">(current)</span></a></li><li class="nav-item"><a class="nav-link" href="#" data-interaction-id="3" data-interaction-target-view="3">Link</a></li><li class="nav-item"><a class="nav-link disabled" href="#" data-interaction-id="4">Disabled <span class="badge badge-primary">1</span></a></li></ul><form class="form-inline mt-2 mt-md-0"><input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"><button class="btn btn-outline-success my-2 my-sm-0" type="submit" data-interaction-id="5" data-interaction-target-view="5">Search</button></form></div></nav></header><div><div id="myCarousel" class="carousel slide mb-4" data-ride="carousel"><ol class="carousel-indicators"><li data-target="#myCarousel" data-slide-to="0" class="active"></li><li data-target="#myCarousel" data-slide-to="1" class=""></li><li data-target="#myCarousel" data-slide-to="2" class=""></li></ol><div class="carousel-inner"><div class="carousel-item active"><img class="first-slide" src="http://via.placeholder.com/800x400" style="width: 100%" alt="First slide"></div><div class="carousel-item"><img class="second-slide" src="http://via.placeholder.com/800x400" style="width: 100%"  alt="Second slide"></div><div class="carousel-item"><img class="third-slide" src="http://via.placeholder.com/800x400" style="width: 100%"  alt="Third slide"></div></div><a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div><div class="container marketing text-center"><!-- Three columns of text below the carousel --><div class="row"><div class="col-lg-4"><img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"><h2>Heading</h2><p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div><!-- /.col-lg-4 --><div class="col-lg-4"><img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"><h2>Heading</h2><span class="badge badge-primary">2</span><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p></div><!-- /.col-lg-4 --><div class="col-lg-4"><img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"><h2>Heading</h2><p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo.</p></div><!-- /.col-lg-4 --></div><!-- /.row --></div><!-- /.container --></div></div>';
  page.head =
    '<meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content=""><meta name="author" content="Micromata GmbH"><title>Baumeister</title>';
  page.htmlElementAttributes = {
    lang: 'en',
    class: 'no-js'
  };
  page.assets = [];

  const cssAsset = new Asset();
  cssAsset.type = 'css';
  cssAsset.location = `../library/${fakeUploadedDirName}/assets/css/app.73419fc85edeca40c47c.bundle.css`;

  page.assets.push(cssAsset);
  directory.pages.push(page);

  return directory;
}
