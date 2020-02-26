// loadup stuff
// vars
var url = window.location.href;
// functions
/* Find an element on the webpage */ 
function FindByAttributeValue(attribute, value, element_type) { 
	element_type = element_type || "*"; 
	var All = document.getElementsByTagName(element_type); 
	for (var i = 0; i < All.length; i++) { 
		if (attribute == "innerHTML" && All[i].innerHTML == value) {
			return All[i];
		}
		if (All[i].getAttribute(attribute) == value) {
			return All[i];
		}
	} 
	} 

// actual logic
// go to the correct site
if(url.includes("www.statista.com/login/campus/")){
	url = "https://de.statista.com/login/campus/";
}
// login
if(url.includes("link.springer.com/athens-shibboleth-login")){
	document.getElementById("shibboleth-institutions").value="https://sso.h-da.de/idp/shibboleth";
	document.getElementById("shibboleth_institutions_chosen").getElementsByTagName("span")[0].innerHTML = "Hochschule Darmstadt";
	document.getElementById("shibboleth-login-submit").click();
} else if(url.includes("de.statista.com/login/campus/")){
	document.getElementById("loginShibboleth_shibbolethLink").value="https://sso.h-da.de/idp/shibboleth";
	document.getElementById("loginShibboleth_submitLoginCampus").click();
} else if(url.includes("id.elsevier.com/as/authorization.oauth2")){
	// get the code
	var signinform = document.getElementsByClassName("els-signin-form")[0];
	var res = signinform.getAttribute("action").replace("/as/","");
	res = res.replace("https://id.elsevier.com","");
	res = res.replace("/resume/as/authorization.ping","");
	
	// we need to create a form here
	var f = document.createElement("form");
	f.setAttribute('method',"post");
	f.setAttribute('id',"selecterForm");
	f.setAttribute('name',"resultForm");
	f.setAttribute('action',"https://id.elsevier.com/as/"+res+"/resume/as/authorization.ping");
	
	var i = document.createElement("input");
	i.setAttribute('name',"entityID");
	i.setAttribute('value',"https://sso.h-da.de/idp/shibboleth");
	f.appendChild(i);
	var j = document.createElement("input");
	j.setAttribute('name',"baseDomain");
	j.setAttribute('value',"https://id.elsevier.com");
	f.appendChild(j);
	
	document.getElementsByTagName('body')[0].appendChild(f);
	document.getElementById("selecterForm").submit();
	
} else if(url.includes("dl.acm.org/signin.cfm")){
	//setTimeout(function(){goHere("https://dl.acm.org/Shibboleth.sso/Login?entityID=https://sso.h-da.de/idp/shibboleth");}, 1000);
	window.location.href = "https://dl.acm.org/Shibboleth.sso/Login?entityID=https://sso.h-da.de/idp/shibboleth";
} else if(url.includes("dl.acm.org/action/showLogin")){
	// keep the redirect
	var redirect = url.split("?");
	window.location.href = "http://iam.atypon.com/action/ssostart?idp=https%3A%2F%2Fsso.h-da.de%2Fidp%2Fshibboleth&"+redirect;
} else if(url.includes("ieeexplore.ieee.org/servlet/wayf.jsp")){
	window.location.href = '/servlet/wayf.jsp?entityId=https://sso.h-da.de/idp/shibboleth&url=https%3A%2F%2Fieeexplore.ieee.org%2FXplore%2Fhome.jsp';
} else if(url.includes("search.ebscohost.com/webauth/Presentation/Views/Web/ShibWAYFForm.aspx")){
	// I don't like this website TODO: later... 
	//document.getElementById("_ctl0_MainContent_ddlFederations").value = "23";
	//window.location.href = "javascript:__doPostBack('_ctl0$MainContent$rptFederations$_ctl0$rptProviders$_ctl32$lnkIDP','')";
} else if(url.includes("connect.liblynx.com/wayf")){
	//window.location.href = url+"?iam=2100125_7f4fbba4ae4b9d6474b16ef0c196a08f";
	document.getElementById("findinstitution").value = "darmstadt";
	document.getElementsByTagName("form")[0].submit();
	FindByAttributeValue('innerHTML','HOCHSCHULE DARMSTADT UNIVERSITY OF APPLIED SCIENCES','a').click();
	FindByAttributeValue('innerHTML','Login','a').click();
} else if(url.includes("sso.h-da.de")){
	//get username if any
	var user = document.getElementById("username");

	chrome.storage.sync.get(null, function (items) {
		if(items.donotcache == true){
			document.getElementById("donotcache").checked = true;
		}
		if(items._shib_idp_revokeConsent == true){
			document.getElementById("_shib_idp_revokeConsent").checked = true;
		}
		if(items.username != undefined){
			user.value = items.username;
			document.getElementById("password").select();
		} else {
			document.getElementById("username").select();
		}
	});
}
