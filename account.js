function showUsername() {
  document.getElementById('UsernameButton').style.backgroundColor = "#0086b3";
  document.getElementById('PasswordButton').style.backgroundColor = "#007399";
  document.getElementById('pageHolder').innerHTML = "<div class='accountWelcome'><img src='images/logo_white_ma8l4a.png' id='accountPicture'/><h1>Account Name</h1></div><br><div class='changeUsername'><h3>Username Change</h3><form action='/account_page.js'>New Username:<br><input type='text' name='Username' placeholder='Username'><br>Confirm Username:<br><input type='text' name='confirmedUsername' placeholder='Username'><br><br><button type='submit'>Change Username</button></form></div>"
}

function showPassword() {
  document.getElementById('PasswordButton').style.backgroundColor = "#0086b3";
  document.getElementById('UsernameButton').style.backgroundColor = "#007399";
  document.getElementById('pageHolder').innerHTML = "<div class='accountWelcome'><img src='images/logo_white_ma8l4a.png' id='accountPicture'/><h1>Account Name</h1></div><br><div class='changeUsername'><h3>Password Change</h3><form action='/account_page.js'>New Password:<br><input type='text' name='password' placeholder='Password'><br>Confirm Password:<br><input type='text' name='confirmedPassword' placeholder='Password'><br><br><button type='submit'>Change Password</button></form></div>"
}
