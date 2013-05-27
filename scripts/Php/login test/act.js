function home(){
	location.href ="/";
}


function vaild(form){
	var nam=document.form.first.value;
	var id=document.form.psid.value;
	var email=document.form.email.value;
	
	if ((nam || id || email) === ("" || null))
		home();
	else
		alert("Name: " + nam + "\nid: " + id +"\nemail: " + email);
		
	
}

function validEmail() {
	var x=document.form.email.value;
	var validEmail=x.indexOf("@mail.fresnostate.edu");
	var vaildEmail2= x.indexOf("@csufresno.edu");
	
	if (validEmail == -1 && vaildEmail2 == -1){
  		alert("Not a valid e-mail address");
  		return false;
  	}
}

function isNum() {
	var id=document.form.psid.value;
	var num = /^[0-9]*$/;
 	if(!num.test(id)){
  		alert("Not a valid ID");
  		return false;
  	}
}


function isName(name){
	var x=document.form.name.value;
	if (x==null || x==""){
  		alert(" Name must be filled out");
  		return false;
  }
}



function vaildForm(){
    if(document.form.first.value == "" ||
    	document.form.last.value == "" ||
    	document.form.email.value == ""||
    	document.form.psid.value == "")
    {
        alert("Please fill out all fields before clicking submit!");
        return false;
    }
}
