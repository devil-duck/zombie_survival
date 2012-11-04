jQuery(document).ready(function($) {
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

	var ZombieView = Backbone.Model.extend({

		className : "zombie",

		initialize : function(){
			_bindAll(this, "render");
			setInterval("this.aiZombieMovement()", 1000);
			this.render();

		},
		render : function(){
			$(this.el).css({"left": this.model.get('x_pos'), "top": this.model.get('y_pos')});
			return this;
		},
		aiZombieMovement = function(){
			var survivor_x_pos = survivor.get('x_pos');
			var survivor_y_pos = survivor.get('y_pos');
			this.model.set({x_pos : survivor_x_pos, y_pos : survivor_y_pos });
		}
	});

	var HordeView = Backbone.Model.extend({

	});

	var zombieView = new ZombieView();
});
