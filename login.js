"use strict";

(function () {

    const AUTH_KEY = "anaFashionAdminAuth";

    /*
     * DEVELOPMENT LOGIN
     *
     * পরে Backend Authentication বসালে
     * এই অংশ replace করা হবে।
     */

    const ADMIN_USERNAME = "admin";
    const ADMIN_EMAIL = "admin@anafashionhouse.com";
    /* ==========================================
   ADMIN PASSWORD
	========================================== */

	const PASSWORD_KEY = "anaFashionAdminPassword";

	const DEFAULT_ADMIN_PASSWORD = "admin123";


	function getAdminPassword() {

		try {

			const savedPassword =
				localStorage.getItem(PASSWORD_KEY);

			if (savedPassword) {
				return savedPassword;
			}

			localStorage.setItem(
				PASSWORD_KEY,
				DEFAULT_ADMIN_PASSWORD
			);

			return DEFAULT_ADMIN_PASSWORD;

		} catch (error) {

			console.error(
				"Unable to access password storage:",
				error
			);

			return DEFAULT_ADMIN_PASSWORD;
		}
	}

    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const rememberMe = document.getElementById("rememberMe");
    const loginBtn = document.getElementById("loginBtn");
    const loginMessage = document.getElementById("loginMessage");
    const togglePassword = document.getElementById("togglePassword");


    /* ==========================================
       CHECK EXISTING LOGIN
    ========================================== */

    function isLoggedIn() {

        try {

            const sessionAuth =
                sessionStorage.getItem(AUTH_KEY);

            const persistentAuth =
                localStorage.getItem(AUTH_KEY);

            return sessionAuth === "true" ||
                   persistentAuth === "true";

        } catch (error) {

            return false;
        }
    }


    /* ==========================================
       REDIRECT IF ALREADY LOGGED IN
    ========================================== */

    if (isLoggedIn()) {

        window.location.replace("admin.html");

        return;
    }


    /* ==========================================
       PASSWORD SHOW / HIDE
    ========================================== */

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            const isPassword =
                loginPassword.type === "password";

            loginPassword.type =
                isPassword ? "text" : "password";

            togglePassword.innerHTML = isPassword
                ? '<i class="fa-solid fa-eye-slash"></i>'
                : '<i class="fa-solid fa-eye"></i>';

            togglePassword.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

        });

    }


    /* ==========================================
       LOGIN MESSAGE
    ========================================== */

    function showMessage(message, type) {

        loginMessage.textContent = message;

        loginMessage.className =
            "login-message " + type;

    }


    /* ==========================================
       LOGIN
    ========================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const username =
                loginEmail.value.trim();

            const password =
                loginPassword.value;

            if (!username || !password) {

                showMessage(
                    "Please enter username and password.",
                    "error"
                );

                return;
            }


            loginBtn.disabled = true;

            loginBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';


            setTimeout(function () {

                const validUsername =
                    username.toLowerCase() ===
                        ADMIN_USERNAME.toLowerCase()
                    ||
                    username.toLowerCase() ===
                        ADMIN_EMAIL.toLowerCase();


                const validPassword =
					password === getAdminPassword();


                if (validUsername && validPassword) {

                    try {

                        if (rememberMe.checked) {

                            localStorage.setItem(
                                AUTH_KEY,
                                "true"
                            );

                            sessionStorage.removeItem(
                                AUTH_KEY
                            );

                        } else {

                            sessionStorage.setItem(
                                AUTH_KEY,
                                "true"
                            );

                            localStorage.removeItem(
                                AUTH_KEY
                            );

                        }

                    } catch (error) {

                        console.error(
                            "Authentication storage error:",
                            error
                        );

                    }


                    showMessage(
                        "Login successful. Redirecting...",
                        "success"
                    );


                    loginBtn.innerHTML =
                        '<i class="fa-solid fa-check"></i> Success';


                    setTimeout(function () {

                        window.location.replace(
                            "admin.html"
                        );

                    }, 500);

                } else {

                    showMessage(
                        "Invalid username/email or password.",
                        "error"
                    );


                    loginBtn.disabled = false;

                    loginBtn.innerHTML =
                        '<i class="fa-solid fa-right-to-bracket"></i> Login';


                    loginPassword.value = "";

                    loginPassword.focus();

                }

            }, 500);

        });

    }


    /* ==========================================
       ENTER KEY SUPPORT
    ========================================== */

    loginPassword.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                loginForm.requestSubmit();

            }

        }
    );


    /* ==========================================
       EXPOSE AUTH FUNCTIONS
    ========================================== */

    window.ANAAuth = {

        isLoggedIn: isLoggedIn,

        logout: function () {

            localStorage.removeItem(AUTH_KEY);
            sessionStorage.removeItem(AUTH_KEY);

            window.location.replace("login.html");

        }

    };

})();