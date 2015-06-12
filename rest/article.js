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
		console.log(message.length)
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


exports.show = function(response){
	getArticle(response)
}
	