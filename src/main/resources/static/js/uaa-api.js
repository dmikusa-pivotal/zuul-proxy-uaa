

BASEURL = "https://uaa-mgr.cfapps.io";

UAAURL = "http://localhost:8080/om";

var CheckUAATokenURL = UAAURL+"/check_id";
var CheckUAATokenURL = UAAURL+"/check_token";
var OauthAuthorizeURL = UAAURL+"/oauth/authorize";
var OauthTokenURL = UAAURL+"/oauth/token";


function GetScopes(){
	OauthAuthorizeGrant();
}


function OauthPasswordGrant(user, pass) {

	//var url = OauthTokenURL + "?grant_type=password&response_type=token&username=" + user + "&password=" + pass;


    console.log(user);
    console.log(pass);
	 $.post({
        		url: OauthTokenURL ,
        		data: {grant_type: "password", username: user, password: pass},
        		username: "opsman",
        		password: "",
        		dataType: "json"}
        	).always(function(data, status) {
        	       console.log(data);
        		//var output = "Status: " + status + "\n";
        		//output += "Data:\n";
        		//output += JSON.stringify(data);
        		//$("#test1Output").val(output);
        		CheckToken(data.access_token);
        	});


}

function OauthClientCredsGrant(client, secret, scopes, whenDone) {
	var data = {
		grant_type: "client_credentials"
	}
	if (scopes) {
		data.scopes = scopes.join(' ');
	}
	$.post({
		url: OauthTokenURL,
		data: data,
		username: client,
		password: secret,
		dataType: "json"
	}).done(whenDone).fail(function(data) {
		console.error("Failed: " + data);  // TODO: better error handling
	});
}

function CheckToken(token) {
	var url = CheckUAATokenURL + "?token=" + token;



     $.post({
           		url: CheckUAATokenURL ,
           		data: { token: token},
           		username: "opsman",
           		password: "",
           		dataType: "json"}
           	).always(function(data, status) {
           	       console.log(data);
           	       $('#ScopeInfo').html(  JSON.stringify(data.scope));

           	});
}



