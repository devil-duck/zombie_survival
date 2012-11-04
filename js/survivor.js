 var Survivor = Backbone.Model.extend({
  //The atomic part of our Model. A model is basically a Javascript object, i.e. key-value pairs, with some helper functions
    defaults: {
      name: 'Chris',
      width:30,
      height:30,
      health: 100,
      x_pos: 100,
      y_pos: 100,
      speed:5
    }
 });

//A collection of survivors. Basically an array of Model objects with some helper functions.
 var Team = Backbone.Collection.extend({
  model: Survivor
 });

var SurvivorView = Backbone.View.extend({
  className: 'survivor',

  initialize: function(){
    //initialize() - Automatically called upon instantiation. Where you make all types of bindings, excluding UI events, such as clicks, etc.
    _.bindAll(this, 'render', 'move');
    $(document).bind('keydown', this.move);
    this.render();
  },
  render: function(){
    //render() - Function in charge of rendering the entire view in this.el. Needs to be manually called.
    $(this.el).css({"left": this.model.get('x_pos'), "top": this.model.get('y_pos')});

    return this;
  },

  move: function(e){
    var code = e.keyCode;
    var mapWidth = parseInt($("#map").width());
    var mapHeight = parseInt($("#map").height());
    var x = this.model.get('x_pos');
    var y = this.model.get('y_pos');
    var width = this.model.get('width');
    var height = this.model.get('height');
    var speed = this.model.get('speed');
    if(code == 37 && x > 0){
      this.model.set({x_pos: x-speed})
    }
    if(code == 38 && y > 0){
      this.model.set({y_pos: y-speed})
    }
    if(code == 39 && x < mapWidth - width){
      this.model.set({x_pos: x+speed})
    }
    if(code == 40 && y < mapHeight - height){
      this.model.set({y_pos: y+speed})
    }
    $(this.el).css({"left": this.model.get('x_pos'), "top": this.model.get('y_pos')});
  }
});

var TeamView = Backbone.View.extend({
  //Responsible for rendering each individual Survivor.
  el: $('body'),
  events: {
    //Events - Where DOM events are bound to View methods. Backbone doesn't have a separate controller to handle such bindings; it all happens in a View.
    'click button#add' : 'addSurvivor'
  },
  initialize: function(){
    _.bindAll(this, 'render');

// instantiates a Collection, and binds its add event to own method addToGame.
    this.collection = new Team();
    this.collection.bind('add', this.addToGame);

    this.counter = 0;
    this.render();
  },
  render: function () {
    $(this.el).append("<button id='add'>Add Survivor to game</button>");
    _(this.collection.models).each(function(survivor){
      addToGame(survivor);
    }, this);
  },
  addSurvivor: function(){
    this.counter++;
    var survivor = new Survivor();
    this.collection.add(survivor);
  },
  addToGame: function(survivor){
    var survivorView = new SurvivorView({
      model: survivor
    });
    $('#map', this.el).append(survivorView.render().el);
  }
});