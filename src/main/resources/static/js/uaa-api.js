

BASEURL = "https://uaa-mgr.cfapps.io";
UAAURL = "";
var CheckUAATokenURL = UAAURL+"/check_id";
var CheckUAATokenURL = UAAURL+"/check_token";
var OauthAuthorizeURL = UAAURL+"/oauth/authorize";
var OauthTokenURL = UAAURL+"/oauth/token";


function GetScopes(){
	OauthAuthorizeGrant();
}


function OauthPasswordGrant(user, pass) {
	var url = OauthTokenURL + "?grant_type=password&response_type=token&username=" + user + "&password=" + pass;

	$.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    success: function (data) {

    /*
    {
  		"access_token":"2YotnFZFEjr1zCsicMWpAA",
  		"token_type":"bearer",
		"expires_in":3600
	}
	*/
	CheckToken(data.access_token);
    },
    error: function(data) {
    	//TODO parse URL param error=
      alert('Error during Oauth2 Authorization ' + JSON.stringify(data));
    }
   });
}

function CheckToken(token) {
	var url = CheckUAATokenURL + "?token=" + token;
	$.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    success: function (data) {

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
	$('#ScopeInfo').html(  JSON.stringify(data.scope));

    },
    error: function(data) {
    	//TODO parse URL param error=
      alert('Error during Oauth2 Authorization');
    }
   });
}



