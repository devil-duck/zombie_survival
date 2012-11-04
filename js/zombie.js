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

	var ZombieView = Backbone.View.extend({

		className : "zombie",

		initialize : function(options){
			_.bindAll(this, "render", "zombieLoop");
			window.setInterval(_.bind(this.zombieLoop, this), 1000);
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
		zombieLoop :function(){
			this.attackSurvivor();

		},
		attackSurvivor : function(){
			var closestSurvivor;
			var closestDistance = 10000;
			_(this.options.survivors.collection.models).each(function(survivor){
      			var survivor_x_pos = survivor.get('x_pos');
				var survivor_y_pos = survivor.get('y_pos');
				var distance = Math.sqrt(survivor_x_pos) + Math.sqrt(survivor_y_pos);
				if(distance < closestDistance){
					closestSurvivor = survivor;
				}
				if(distance <= 10){
					closestSurvivor.reduceHealth();
				}
    		}, this);
    		if(closestSurvivor){
    			this.model.set({x_pos : closestSurvivor.get('x_pos'), y_pos : closestSurvivor.get('y_pos') });
				this.render();
    		}

		}
	});

	var Horde = Backbone.Collection.extend({
		model : Zombie
	});

	var HordeView = Backbone.View.extend({
		el : $('body'),
		events :{
			'click button#zombie' : 'addZombie'
		},
		initialize: function(options){
			_.bindAll(this, 'render', 'addToMap');
			this.collection = new Horde();
			this.collection.bind("add", this.addToMap);
			this.render();
		},
		render: function(){
			$(this.el).append('<button id="zombie">Add Zombie to map</button>');
			_(this.collection.models).each( function(zombie){
				this.addToMap(zombie);
			}, this);
		},
		addZombie : function (){
			this.zombie = new Zombie();
			this.collection.add(this.zombie);
		},
		addToMap : function(zombie){
			var survivorCollection = this.options.survivors;
			var zombieView = new ZombieView({
				model : zombie,
				survivors : survivorCollection
			});
			$('#map', this.el).append(zombieView.render().el);
		}
	});
