

BASEURL = "https://uaa-mgr.cfapps.io";
//UAAURL = "http://localhost:8080";

var CheckUAATokenEndpoint = "check_id";
var CheckUAATokenEndpoint = "check_token";
var OauthAuthorizeEndpoint = "oauth/authorize";
var OauthTokenEndpoint = "oauth/token";
var UserInfoEndpoint = "userinfo";
var UAAServersEndpoint = "/api/v1/uaa_servers";

var GlobalUAAServers = {};

function GetScopes(){
	OauthAuthorizeGrant();
}

function GetUAAServers(){
    console.log(UAAServersEndpoint);

	$.get( UAAServersEndpoint, function( data ) {
	  $( ".result" ).html( data );
	  console.log(data);
	   var selectHtml = "";
	   for (var key in data) {
	     if (data.hasOwnProperty(key)) {
	        GlobalUAAServers[data[key][1]] = data[key][0];
	       selectHtml += "<option>"+ data[key][1] + "</option>";
	     }
	   }
	   $('#UAAServers').html(selectHtml);
	});
}

function OauthPasswordGrant(user, pass) {
    var uaaurl = GlobalUAAServers[ $('#UAAServers').val() ] + OauthTokenEndpoint + "";
    console.log("UAA URL: " + uaaurl);
    $.post({
    		url: uaaurl ,
    		data: {grant_type: "password", username: user, password: pass},
    		username: "cf", // use `opsman` for Ops Manager
    		password: "",
    		dataType: "json"}
    	).always(function(data, status) {
    	    console.log(data);
    		//CheckToken(data.access_token);
    	    GetUserInformation(data.access_token);
    	});
}

function OauthClientCredsGrant(client, secret, scopes, whenDone) {
	var uaaurl = GlobalUAAServers[ $('#UAAServers').val() ] + OauthTokenEndpoint + "";
	var data = {
		grant_type: "client_credentials"
	}
	if (scopes) {
		data.scopes = scopes.join(' ');
	}
	$.post({
		url: uaaurl,
		data: data,
		username: client,
		password: secret,
		dataType: "json"
	}).done(whenDone).fail(function(data) {
		console.error("Failed: " + data);  // TODO: better error handling
	});
}

function CheckToken(client, secret, token) { // needs to be have uaa.resource scope
     $.post({
       		url: GlobalUAAServers[ $('#UAAServers').val() ] + CheckUAATokenEndpoint ,
       		data: { token: token},
       		username: client,
       		password: secret,
       		dataType: "json"}
       	).always(function(data, status) {
       	    console.log(data);
       	    //  $('#ScopeInfo').html(  JSON.stringify(data.scope));
       		GetTokenHTML('ScopeInfo', data);
       	});
}


function GetUserInformation(token) {
     $.get({
	   		url: $('#UAAServers').val() + UserInfoEndpoint,
	   		headers: {
	   			'Authorization': 'bearer ' + token
	   		},
	   		dataType: "json"}
	   	).always(function(data, status) {
	   	       console.log(data);
	   	      // $('#ScopeInfo').html(  JSON.stringify(data.scope));
	        GetTokenHTML('UserInfo', data);
	   	});
}

/*
{
    "jti":"4657c1a8-b2d0-4304-b1fe-7bdc203d944f",
    "aud":["openid","cloud_controller"],
    "scope":["read"],
    "email":"marissa@test.org",
    "exp":138943173,
    "user_id":"41750ae1-b2d0-4304-b1fe-7bdc24256387",
    "user_name":"marissa",
    "client_id":"cf"
}
*/
function GetTokenHTML(id, data) {

    var tableHTML = "<table class='table uaainfotable'>";
    for (var key in data) {
        if ( data.hasOwnProperty(key) ) {
            tableHTML += "<tr><td>" + key + "</td><td>" + data[key] + "</td></tr>";
        }
    }
    tableHTML += "</table>";
    $('#' + id).html(tableHTML);
	//$.jsontotable(data, { id: "#"+ id, header: false });

}
