function resetValidations() {
	document.getElementById("contactUsValidationErrorMsgDiv").style.display = "none";
	document.getElementById("contactUsEmail").style.border = "";
	document.getElementById("contactUsName").style.border = "";
	document.getElementById("contactUsMobile").style.border = "";
	document.getElementById("contactUsSubject").style.border = "";
	document.getElementById("contactUsText").style.border = "";
}

function validateChatInput() {
	resetValidations();
	var name = trim(document.getElementById("contactUsName").value);
	var email = trim(document.getElementById("contactUsEmail").value);
	var mobile = trim(document.getElementById("contactUsMobile").value);
	var category = trim(document.getElementById("contactUsCategory").value);
	var subject = trim(document.getElementById("contactUsSubject").value);
	var text = trim(document.getElementById("contactUsText").value);

	if (email == "")
		document.getElementById("contactUsEmail").style.border = "1px solid red";
	else if (!validateEmail(email)) {
		document.getElementById("contactUsEmail").style.border = "1px solid red";
		email = "";
	}
	if (name == "")
		document.getElementById("contactUsName").style.border = "1px solid red";
	else if (!/^[a-z0-9_-\s]+$/i.test(name)) {
		document.getElementById("contactUsName").style.border = "1px solid red";
		name = "";
	}
	if (mobile == "")
		document.getElementById("contactUsMobile").style.border = "1px solid red";
	else if (!/^\d{10}$/.test(mobile)) {
		document.getElementById("contactUsMobile").style.border = "1px solid red";
		mobile = "";
	}

	if (text == "")
		document.getElementById("contactUsText").style.border = "1px solid red";

	if (category == "")
		document.getElementById("contactUsCategory").style.border = "1px solid red";

	if (subject == "")
		document.getElementById("contactUsSubject").style.border = "1px solid red";

	if (email == "" || name == "" || mobile == "" || subject == ""
			|| category == "" || text == "") {
		document.getElementById("contactUsValidationErrorMsgDiv").innerHTML = "<img src='/images/error.gif'><span style='color:red;padding-left:5px;'>Validation Error</span>";
		document.getElementById("contactUsValidationErrorMsgDiv").style.display = "";
	} else {
		// all valid
		userid = name + "||" + mobile + "||" + email;

		$.post("/contact", {
			name : name,
			mobile : mobile,
			email : email,
			category : category,
			subject : subject,
			message : text
		}, function(data) {
			alert("Message Sent");
			this.parent.$.colorbox.close();
		}).fail(function() {
			document.getElementById("contactUsValidationErrorMsgDiv").innerHTML = "<img src='/images/error.gif'><span style='color:red;padding-left:5px;'>Oops!! Failed to contact server. Please re-try after sometime.</span>";
			document.getElementById("contactUsValidationErrorMsgDiv").style.display = "";
		});
	}
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
