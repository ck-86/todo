(function () {

	window.App = {
		Models : {},
		Views : {},
		Collections : {}
	};

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	}

	//--- Model ---//
	App.Models.Task = Backbone.Model.extend({
		validate: function(attrs) {
			if( ! $.trim(attrs.title) ) {
				return 'Task required valid title.'; //BUG Accepting Blank Spaces
			}
		}
	});

	//--- Collection ---//
	App.Collections.Tasks = Backbone.Collection.extend({
		model : App.Models.Task
	});

	//--- Tasks View - display all task ---//
	App.Views.Tasks = Backbone.View.extend({
		tagName : 'ul',

		initialize: function() {
			this.collection.on('add', this.addOne, this)
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(task) {
			var taskView = new App.Views.Task({ model : task });
			this.$el.append(taskView.render().el);
		}
	});

	//--- Task View ---//
	App.Views.Task = Backbone.View.extend({
		tagName : 'li',

		template : template('taskTemplate'),

		initialize: function() {
			// When Model Changes the View will re-render
			this.model.on('change', this.render, this);
			// When Model is Destroy update the view
			this.model.on('destroy', this.remove, this);
		},

		events : {
			'click .edit' : 'editTask',
			'click .delete' : 'destroy'
		},

		editTask: function() {
			var newTaskTitle = prompt("Editing mode...", this.model.get('title'));
			
			if( !newTaskTitle ) return;

			this.model.set('title', newTaskTitle);
		},

		destroy: function() {
			this.model.destroy();
			console.log(tasksCollection);
		},

		remove: function() {
			this.$el.remove();
		},

		render: function() {
			var template = this.template( this.model.toJSON() );
			this.$el.html( template );
			return this;
		}
	});


	App.Views.AddTask = Backbone.View.extend({
		el: '#addTask',

		events: {
			'submit' : 'submit'
		},

		submit: function(e) {
			e.preventDefault();
			var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

			var task = new App.Models.Task({ title: newTaskTitle });
			//console.log(this.collection);
			this.collection.add(task);
		},

		initialize: function() {
			//console.log(this.el.innerHTML);
		}
	});

//---  ---//

//var task = new App.Models.Task({title:'Do something', priotity:4});

window.tasksCollection = new App.Collections.Tasks([
]);

var addTaskView = new App.Views.AddTask({collection: tasksCollection });
var taskView = new App.Views.Tasks( { collection : tasksCollection } );
$('.tasks').html( taskView.render().el );
}) ();