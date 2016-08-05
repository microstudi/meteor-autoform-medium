// Markdown render
marked.setOptions({
  breaks: true
});


AutoForm.addInputType('medium-markdown', {
    template: 'afMedium',
    // template: 'afMedium_materialize',
    valueIn: function (val, atts) {
      return marked(val || ' ');
    },
    valueOut: function() {
        // return this[0].innerHTML;
        return this.data('markdown');
    },
    contextAdjust: function(context) {
        return context;
    }
});

function initializeMediumEditor(options){
    var input = this.find('div');
    var opts = _.defaults((this.data.atts.mediumOptions || {}), options, {
        staticToolbar: true,
        stickyToolbar: true,
        extensions: {
          markdown: new MeMarkdown(function (md) {
              $(input).attr('data-markdown', md);
          })
        }
    });

    var editor = new MediumEditor(input, opts);

    var template = this;

    // Notify changes to MediumEditor if data changes
    template.autorun(function () {
      var data = Template.currentData();
      editor.checkContentChanged(template.find('div'));
    });
}

var helpers = {
    atts: function() {
        var atts = _.clone(this.atts) ||  {};
        delete atts.mediumOptions;

        return _.defaults(atts, {
            class: 'medium-editor'
        });
    }
};

Template.afMedium.onRendered(function() {
  // Add the correct placeholder
  var ops = {};
  if(this.data.atts.placeholder) {
    ops.placeholder = {text: this.data.atts.placeholder};
  }
  initializeMediumEditor.call(this, ops);
});

Template.afMedium_materialize.onRendered(function() {
    if(!this.data.atts.mediumOptions || (this.data.atts.mediumOptions && !this.data.atts.mediumOptions.keepLabel)){
        $('label[for=' + this.data.atts.id + ']:not([data-medium-label])').remove();

        return initializeMediumEditor.call(this, {
            placeholder: {
                text: 'Type your text for: ' + AutoForm.getLabelForField(this.data.atts.name)
            }
        });
    }

    initializeMediumEditor.call(this);
});

Template.afMedium.helpers(helpers);
Template.afMedium_materialize.helpers(helpers);

