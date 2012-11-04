	var Zombie = Backbone.Model.extend({
		defaults : {
		  width:30,
	      height:30,
	      health: 100,
	      x_pos: 150,
	      y_pos: 150,
	      speed:5
		}
	});

	var Horde = Backbone.Collection.extend({
		model : Zombie
	});

	var ZombieView = Backbone.View.extend({

		className : "zombie",

		initialize : function(options){
			_.bindAll(this, "render", "aiZombieMovement");
			window.setInterval(_.bind(this.aiZombieMovement, this), 1000);
			$('#map').append(this.render().el);

		},
		render : function(){
			$(this.el).animate({
				left : this.model.get('x_pos'),
				top : this.model.get('y_pos')

	    	}, 800);
			//$(this.el).css({"left": this.model.get('x_pos'), "top": this.model.get('y_pos')});
			return this;

		},
		aiZombieMovement :function(){
			console.log(this.options);
			_(this.options.survivors.collection.models).each(function(survivor){
      			var survivor_x_pos = survivor.get('x_pos');
				var survivor_y_pos = survivor.get('y_pos');
				this.model.set({x_pos : survivor_x_pos, y_pos : survivor_y_pos });
				this.render();
    		}, this);

		}
	});