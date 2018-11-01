var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var qs = require('querystring');

var app = express();

var lat, long;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/Front_End"));

app.get('/bigNodefe.html',function(req,res){
	res.sendFile(path.join(__dirname+'/Front_End'+'/bigNodefe.html'));
});

app.get('/search',function(req,res){
	console.log("Hello");
	var key = "AIzaSyBgENc9jML_6mqoNcE3bNYm1RzNUet5EvQ";
	//console.log(req.query.name);
	var keyword = req.query.keyword;
	var category = req.query.category;
	var distance = req.query.distance;
	var loc = req.query.loc;
	if(loc == undefined){
		loc = "current";
	}
	lat_lng = req.query.lat_lng;
	lat = lat_lng.split(" ")[0];
	long = lat_lng.split(" ")[1];
	var location = "";
	var query_nearbyplaces = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
	var query_geocode = "https://maps.googleapis.com/maps/api/geocode/json?address=";

	function lat_long_callback(glat,glong){
		var query_places_geocode = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
		query_places_geocode += "location="+glat+","+glong+"&";
		query_places_geocode += "radius="+ (distance * 1609.34) + "&";
		query_places_geocode += "keyword="+ encodeURI(keyword)+ "&";
		query_places_geocode += "type=" + category + "&";
		query_places_geocode += "key="+ key;
		//console.log(query_places_geocode);

		request(query_places_geocode,function(error,response,body){
			if(!error && response.statusCode == 200){
			//res.send(body);
			//console.log(query_places_geocode);
			res.send(body);	
			}
			else{
			console.log("Errored out:"+error);
			}
		});
	}

	if(loc == "other"){
		location = req.query.location;
		query_geocode += encodeURI(location) + "&key=" + key;
		//console.log(query_geocode);
		request(query_geocode,function(error,response,body){
			if(!error && response.statusCode == 200){
				body = JSON.parse(body)
				var tempval = body['results'][0].geometry.location;
				lat1 = tempval.lat;
				long1 = tempval.lng;
				//res.send(""+lat1+long1);	
				lat_long_callback(lat1,long1);
			}
			else{
				console.log("Errored out:"+error);
				//lat = 	req.body.lat;
				//long = req.body.long;
				
			}
		});
		
	}

	if(loc == "current"){
	
		query_nearbyplaces += "location="+lat+","+long+"&";
		query_nearbyplaces += "radius="+ (distance * 1609.34) + "&";
		query_nearbyplaces += "keyword="+ encodeURI(keyword)+ "&";
		query_nearbyplaces += "type=" + category + "&";
		query_nearbyplaces += "key="+ key;
		//console.log(query_nearbyplaces);
		
		request(query_nearbyplaces,function(error,response,body){
			var resp_data;
			if(!error && response.statusCode == 200){
				//console.log(JSON.parse(body).next_page_token);
				res.send(body);

				//console.log(body);	
			}
			else{
				console.log("Errored out:"+error);
			}
		});
		
	}
});


app.post('/search',function(req,res){
	var key = "AIzaSyBgENc9jML_6mqoNcE3bNYm1RzNUet5EvQ";
	var keyword = req.body.keyword;
	var category = req.body.category;
	var distance = req.body.distance;
	var loc = req.body.loc;
	if(loc == undefined){
		loc = "current";
	}
	//console.log(loc);
	lat_lng = 	req.body.lat_lng;
	lat = lat_lng.split(" ")[0];
	long = lat_lng.split(" ")[1];
	var location = "";
	var query_nearbyplaces = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
	var query_geocode = "https://maps.googleapis.com/maps/api/geocode/json?address=";

	function lat_long_callback(glat,glong){
		var query_places_geocode = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
		query_places_geocode += "location="+glat+","+glong+"&";
		query_places_geocode += "radius="+ (distance * 1609.34) + "&";
		query_places_geocode += "keyword="+ encodeURI(keyword)+ "&";
		query_places_geocode += "type=" + category + "&";
		query_places_geocode += "key="+ key;
		//console.log(query_places_geocode);

		request(query_places_geocode,function(error,response,body){
			if(!error && response.statusCode == 200){
			//res.send(body);
			//console.log(query_places_geocode);
			res.send(body);	
			}
			else{
			console.log("Errored out:"+error);
			}
		});
	}

	if(loc == "other"){
		location = req.body.location;
		query_geocode += encodeURI(location) + "&key=" + key;
		console.log(query_geocode);
		request(query_geocode,function(error,response,body){
			if(!error && response.statusCode == 200){
				body = JSON.parse(body)
				var tempval = body['results'][0].geometry.location;
				lat1 = tempval.lat;
				long1 = tempval.lng;
				//res.send(""+lat1+long1);	
				lat_long_callback(lat1,long1);
			}
			else{
				console.log("Errored out:"+error);
				//lat = 	req.body.lat;
				//long = req.body.long;
				
			}
		});
		
	}

	if(loc == "current"){
	
		query_nearbyplaces += "location="+lat+","+long+"&";
		query_nearbyplaces += "radius="+ (distance * 1609.34) + "&";
		query_nearbyplaces += "keyword="+ encodeURI(keyword)+ "&";
		query_nearbyplaces += "type=" + category + "&";
		query_nearbyplaces += "key="+ key;
		console.log(query_nearbyplaces);
		
		request(query_nearbyplaces,function(error,response,body){
			var resp_data;
			if(!error && response.statusCode == 200){
				console.log(JSON.parse(body).next_page_token);
				res.send(body);

				//console.log(body);	
			}
			else{
				console.log("Errored out:"+error);
			}
		});
		
	}
});

app.get('/search1',function(req,res){
	var key = "AIzaSyBgENc9jML_6mqoNcE3bNYm1RzNUet5EvQ";
	console.log("Yes");
	var next_pg_tkn = req.query.next;
	var query = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+"pagetoken="+next_pg_tkn+"&key="+key;
	request(query,function(error,response,body){
			if(!error && response.statusCode == 200){
			//res.send(body);
			//console.log(query_places_geocode);
				res.send(body);	
			}
			else{
				console.log("Errored out:"+error);
			}
		});
	//res.send(req.body.next);
});

app.get('/yelpreviews',function(req,res){
	var key = "Bearer 3fH69-VRsApdfijqmwFux0gJVdfFSPvj0n-X1XAhWZXe-biO93n8QWwMhXusSKWnp4TLzh6kW0KwR93Cajp5nNguJJcnZBT3Ou6tj5BUHV_EQ2DDEGXc765WoRPEWnYx";
	var data = {name: req.query.name,
	city:req.query.city,state: req.query.state, country: req.query.country,postal_code: req.query.postal_code, address1: req.query.address1};
	var yelp_query = "https://api.yelp.com/v3/businesses/matches/best?"+ qs.stringify(data);
	//console.log(yelp_query);

	function get_reviews(b_obj){
		//console.log(b_obj.id);
		if(b_obj == undefined){
			res.send({"message":"No records"});
		}
		else{
			var reviews_query = "https://api.yelp.com/v3/businesses/"+b_obj.id+"/reviews";
			request({headers:{'Authorization': key},uri: reviews_query},function(error,response,body){
			if(!error && response.statusCode == 200){
			//res.send(body);
			//console.log(query_places_geocode);
				res.send(body);	
			}
			else{
				console.log("Errored out:"+error);
			}
		});

		}
	}

	request({headers:{'Authorization': key},uri: yelp_query},function(error,response,body){
			if(!error && response.statusCode == 200){
			//res.send(body);
			//console.log(query_places_geocode);
				//res.send(body);
				get_reviews(JSON.parse(body).businesses[0]);	
			}
			else{
				console.log("Errored out:"+error);
			}
		}); 

});

app.get("/details",function(req,res){
	var key_value = "AIzaSyBgENc9jML_6mqoNcE3bNYm1RzNUet5EvQ";
	var placeid_value = req.query.placeid;
	console.log("placeid "+placeid_value);
	
	//var data = {placeid:req.query.placeid,key: key_value};

	var query = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeid_value+"&key="+key_value;
	console.log(query);
	request(query,function(error,response,body){
			if(!error && response.statusCode == 200){
				res.send(body);	
			}
			else{
				console.log("Errored out:"+error);
				
			}
		});
});

app.listen(8081,function(){console.log("Server started")});