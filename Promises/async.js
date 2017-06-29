window.onload = function() {
	var http = new XMLHttpRequest();

	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status ==200){
			//console.log(JSON.parse(http.response));
		}
	};
	http.open("GET","data/jx.json",true); //true异步 false同步
	http.send();

	//jquery method
	$.get("data/jx.json", function(data) {
		console.log(data);
	});
	console.log('test');

	
};