
jQuery(document).ready(function(){
	jQuery('.chat-btn').click(function(){
		jQuery('.chat-block').toggle('slow');
	});
});

jQuery(document).ready(function(){

	fetch('http://localhost:3000/usersendstatus').then(function(data){
		
		return data.json();

	}).then(function(value){

			
		value.forEach(function(val){
			jQuery('.status-list').append('<div class="status-div"><h3 class="status">' + val.status +'</h3><p class="author"><b>Written by</b> : ' + val.username + '</p><p class="date"><b>Posted on</b> : ' + val.date.substring(0,21) + '</p></div>');
			// console.log(val);
		});
		console.log(value);
		
	}).catch(function(err){	
		console.log(err);
	});

});


jQuery(document).ready(function(){

	fetch('http://localhost:3000/test').then(function(data){
		
		return data.json();

	}).then(function(value){

		if(value){
			jQuery('table').append('<tr class="table-head"><th> Name </th><th> Username </th><th> Email</th></tr>');
		}
		
		value.forEach(function(val){
			jQuery('table').append('<tr><td>' + val.name + '</td><td>' + val.username +'</td><td>' + val.email +'</td></tr>');
			// console.log(val);
		});
		
	}).catch(function(err){	
		console.log(err);
	});

});

// function printDiv(divName) {
//      var printContents = document.getElementById(divName).innerHTML;
//      var originalContents = document.body.innerHTML;

//      document.body.innerHTML = printContents;

//      window.print();

//      document.body.innerHTML = originalContents;
// }

function csvDownload(){
	fetch('http://localhost:3000/csv').then(function(data){
		
		return data.json();
	}).then(function(value){
		
		window.location.href = value;
	}).catch(function(err){	
		
		console.log(err);
});
}

jQuery(document).ready(function(){
	jQuery('.tabs li a').click(function(){
		var val = jQuery(this).attr('class').toString();	
		jQuery('.tab-data').removeClass('active');
		jQuery('.tab-data.' + val).addClass('active');
	});
});
