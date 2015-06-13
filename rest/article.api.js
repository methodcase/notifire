var getArticle = function(response){
	
	var http = require('http');
	// var weather  = require('weather-js');
	
	var callBack = function(d){
		var list = [];
	    d.data.children.map(function(a){
	        list.push({title:a.data.title});
	    });	    	       
	    response.send(list);
	}
	
	var httpGetApi = function(options, caller){
		http.get(options, function(res){
			var body = '';
			res.on('data', function(chunk){
				body += chunk
			})

			res.on('end', function(){
				var info = JSON.parse(body)
				caller(info)
			})
		})
	};
	
	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
	
	var list = [];
	var displayChatMessage = function(message){		
		for (x in message){				
			list.push({'location':message[x].location,'id':x})
		}
		response.send(list)
	}
	
	myQuery = myRootRef.endAt().limitToLast(500);	
	myQuery.once('value', function(snapshot){		
		var message = snapshot.val();
		// console.log(message)
		displayChatMessage(message)
	});		

}

var addArticle = function(response, post, fbgraph){
  var Firebase = require('firebase');
  var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
  myRootRef.push(post)
}

var viewArticle = function(response, id){
	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
	myRootRef.orderByKey().equalTo(id).on("value", function(snapshot) {
		var result = snapshot.val()

		for (x in result){
			response.send(result[x])
		}
	});
	
}

exports.show = function(response){
	getArticle(response)
}
	
exports.add = function(response, post, fbgraph){
	addArticle(response, post, fbgraph)
}

exports.view = function(response, title){
	viewArticle(response, title)
}