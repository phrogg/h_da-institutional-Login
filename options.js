//save the options
function save_options() {
    let username = document.querySelector('#username').value;
    let donotcache = document.querySelector('#donotcache').checked;
    let _shib_idp_revokeConsent = document.querySelector('#_shib_idp_revokeConsent').checked;
    chrome.storage.sync.set({
        username: username,
		donotcache: donotcache,
		_shib_idp_revokeConsent: _shib_idp_revokeConsent
    }, function () {
		var username = document.getElementById("username");
        username.className = "unsaved";
		setTimeout(function () {
            username.className = "saved";//maybe rebuild this function
        }, 250);
    });
}
function restore_options() {
    chrome.storage.sync.get({username: "st", donotcache: false, _shib_idp_revokeConsent: false}, function (items) {
        document.querySelector('#username').value = items.username;
        document.querySelector('#donotcache').checked = items.donotcache;
        document.querySelector('#_shib_idp_revokeConsent').checked = items._shib_idp_revokeConsent;
    });
}

//load the options
document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector("#username").addEventListener("change", function () {
    save_options();
}, false);

document.querySelector("#donotcache").addEventListener("click", function () {
    save_options();
}, false);

document.querySelector("#_shib_idp_revokeConsent").addEventListener("click", function () {
    save_options();
}, false);
