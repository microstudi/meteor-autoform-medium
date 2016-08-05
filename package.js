Package.describe({
  name: 'microstudi:autoform-medium-markdown',
  version: '0.0.6',
  summary: "Medium editor for AutoForm",
  description: "Medium editor for AutoForm",
  git: "http://github.com/microstudi/meteor-autoform-medium.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'templating',
    'perak:markdown@1.0.5',
    'aldeed:autoform@5.3.0',
    'microstudi:medium-editor@5.21.0',
  ], 'client');

  // TODO: restore when medium editor fixe deactivate
  //api.use('tap:18n', {weak: true});

  api.addFiles([
    'lib/medium-editor-markdown/dist/me-markdown.standalone.js',
    'template.html',
    'template.js',
  ], 'client');
});
