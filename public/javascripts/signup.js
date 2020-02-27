/**
 * Require dependencies 
*/
import {validateName , validateEmail , validatePassword , verifyPassword} from "./validate.js" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
//let createElement = e => document.createElement(e) 

/**
 * Once a field is focused , the user should receive a message 
 *
*/
const firstName  = selector("#first_name")
const lastName  = selector("#last_name")
const userEmail = selector("#email")
const userPass  = selector("#password")
const checkPass = selector("#cPassword")

/**
  *Focus and blur event on first name input field  
*/

firstName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".firstname-feedback")
	try {
		const nameValue = validateName(firstName.value.trim())
		if ( nameValue.value != null ) {
			if (nameFeedBack.classList.contains("feedback-error")) {
				nameFeedBack.classList.remove("feedback-error")
				nameFeedBack.textContent = "Okay!"
	        	nameFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "Name should only contain alphabets."
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("feedback-error")
	}
})

/**
  *Focus and blur event on lastname input field  
*/

lastName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".lastname-feedback")
	try {
		const nameValue = validateName(lastName.value.trim())
		if ( nameValue.value != null ) {
			if (nameFeedBack.classList.contains("feedback-error")) {
				nameFeedBack.classList.remove("feedback-error")
				nameFeedBack.textContent = "Okay!"
	        	nameFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "Name should only contain alphabets."
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("feedback-error")
	}
})
/**
 * Validate the email field 
 * Send get request to the server to see if the names are already taken 
  *
*/

userEmail.addEventListener("blur" , event => {
	const emailFeedBack = selector(".email-feedback")
	try {
		const emailValue = validateEmail(userEmail.value.trim())
		if ( emailValue.value != null ) {
			if (emailFeedBack.classList.contains("feedback-error")) {
				emailFeedBack.classList.remove("feedback-error")
				emailFeedBack.textContent = "Okay!"
	        	emailFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "EmailError " , 
				message : "The email you provide is not valid"
			}
		}
	}catch(error) {
		emailFeedBack.textContent = error.message
		emailFeedBack.classList.add("feedback-error")
	}
})
/**
 * Validate the Password field 
 * Refactor this code by using Object Design so as to reduce all the dupliate codes  
  *
*/

userPass.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".password-feedback")
	const passwordValue = validatePassword(userPass.value.trim())
	try {
		if ( passwordValue.value) {
			if (passwordFeedBack.classList.contains("feedback-error")) {
				passwordFeedBack.classList.remove("feedback-error")
				passwordFeedBack.textContent = "Okay!"
	        	passwordFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "PasswordError " , 
				message : "Provide must be at least 5 characters long."
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = error.message
		passwordFeedBack.classList.add("feedback-error")
	}
})

checkPass.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".cpassword-feedback")
	const checkpasswordValue = verifyPassword(userPass , checkPass)
	try {
		if ( checkpasswordValue.value) {
			if (passwordFeedBack.classList.contains("feedback-error")) {
				passwordFeedBack.classList.remove("feedback-error")
				passwordFeedBack.textContent = "Okay!"
	        	passwordFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "PasswordError " , 
				message : "Password doesn't match"
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = error.message
		passwordFeedBack.classList.add("feedback-error")
	}
})

/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const firstnameValue     = validateName(firstName.value.trim()).value
	const lastnameValue     = validateName(lastName.value.trim()).value
	const emailValue    = validateEmail(userEmail.value.trim()).value 
	const passValue     = validatePassword(userPass.value.trim()).value
	const checkpassValue = validatePassword(checkPass.value.trim()).value
	const accept        = selector("#check")
	try {
		if ( firstnameValue != null && lastnameValue != null && emailValue != null && passValue != null && checkpassValue != null) {
		    if ( accept.checked) {
				const errorArea = selector(".on-submit")
				errorArea.textContent = "Welcome. You will be directed to the Login Page."
				errorArea.classList.add("feedback-success") 
				
				let sendData = async () => {
					let userData = await fetch('http://localhost:3000' , {
		                        method : 'POST' , 
		                        headers : {
			                        'Content-Type' : 'application/x-www-form-urlencoded'
		                        } , 
		                        body : new FormData(selector('form'))
					})
					if ( userData ) {
						console.log(userData) 
					}else {
						console.log("Nothing go")
					}
				}
            }else {
			    throw {
				    name : "T&CError" , 
					message : "Kindly accept our terms and condition"
				}
				event.preventDefault()
			}
		}else {
			throw {
				    name : "WrongFormValue" , 
					message : "Please, fill all fields correctly."
				}
			event.preventDefault()
		}
	}catch(error) {
	    const errorArea = selector(".on-submit")
		errorArea.textContent = error.message 
		errorArea.classList.add("feedback-error")
		event.preventDefault()
	}
})