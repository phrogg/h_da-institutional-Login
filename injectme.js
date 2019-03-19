//go to the correct site
if(window.location.href.includes("www.statista.com/login/campus/")){
	window.location.href = "https://de.statista.com/login/campus/";
}
//login
if(window.location.href.includes("link.springer.com/athens-shibboleth-login")){
	document.getElementById("shibboleth-institutions").value="https://sso.h-da.de/idp/shibboleth";
	document.getElementById("shibboleth_institutions_chosen").getElementsByTagName("span")[0].innerHTML = "Hochschule Darmstadt";
	document.getElementById("shibboleth-login-submit").click();
} else if(window.location.href.includes("de.statista.com/login/campus/")){
	document.getElementById("loginShibboleth_shibbolethLink").value="https://sso.h-da.de/idp/shibboleth";
	document.getElementById("loginShibboleth_submitLoginCampus").click();
} else if(window.location.href.includes("id.elsevier.com/as/authorization.oauth2")){
	//get Code
	var signinform = document.getElementsByClassName("els-signin-form")[0];
	var res = signinform.getAttribute("action").replace("/as/","");
	res = res.replace("https://id.elsevier.com","");
	res = res.replace("/resume/as/authorization.ping","");
	
	//we need to create a form here
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
	
} else if(window.location.href.includes("dl.acm.org/signin.cfm")){
	goHere("https://dl.acm.org/Shibboleth.sso/Login?entityID=https://sso.h-da.de/idp/shibboleth");
} else if(window.location.href.includes("ieeexplore.ieee.org/servlet/wayf.jsp")){
	window.location.href = '/servlet/wayf.jsp?entityId=https://sso.h-da.de/idp/shibboleth&url=https%3A%2F%2Fieeexplore.ieee.org%2FXplore%2Fhome.jsp';
} else if(window.location.href.includes("http://search.ebscohost.com/webauth/Presentation/Views/Web/ShibWAYFForm.aspx?entityID=http%3A%2F%2Fshibboleth.ebscohost.com&return=https%3A%2F%2Fshibboleth.ebscohost.com%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Fshibboleth.ebscohost.com%252FShibAgent.aspx%253Fshib_returl%253Dhttps%25253a%25252f%25252fsearch.ebscohost.com%25252flogin.aspx%25253fauthtype%25253dshib%2526IdpId%253D")){
	alert("This site is not compatible yet");
	//__doPostBack('_ctl0$MainContent$lnkViewAllLink','');
	//__doPostBack('_ctl0$MainContent$rptFederations$_ctl56$rptProviders$_ctl32$lnkIDP','');
} else if(window.location.href.includes("sso.h-da.de")){
	//get username if any
	var user = document.getElementById("username");
	chrome.storage.sync.get(null, function (items) {
		user.value = items.username;
		if(items.donotcache == true){
			document.getElementById("donotcache").checked = true;
		}
		if(items._shib_idp_revokeConsent == true){
			document.getElementById("_shib_idp_revokeConsent").checked = true;
		}
		document.getElementById("password").select();
	});
}