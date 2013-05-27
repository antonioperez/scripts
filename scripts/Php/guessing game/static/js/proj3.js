function submit_form(button) {
	var choice = confirm('Are you sure?');
	if (choice) {
		button.form.submit();
	} else {
		location.reload(true);
	}
}

function toggle_radio(bool, name) {
	document.getElementById(name).checked = bool;
}