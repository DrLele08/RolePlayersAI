"use strict";

function convertiData(data) {
    var partiData = data.split('-'); // Divide la data in [anno, mese, giorno]
    return partiData[2] + '-' + partiData[1] + '-' + partiData[0]; // Riordina e unisce
}

// Class definition
var KTSignupGeneral = function () {
    // Elements
    var form;
    var submitButton;
    var validator;
    var passwordMeter;

    // Handle form
    var handleForm = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'Nome richiesto'
                            }
                        }
                    },
                    'surname': {
                        validators: {
                            notEmpty: {
                                message: 'Cognome richiesto'
                            }
                        }
                    },
                    'username': {
                        validators: {
                            notEmpty: {
                                message: 'Username richiesto'
                            }
                        }
                    },
                    'birthday': {
                        validators: {
                            notEmpty: {
                                message: 'Data di nascita richiesta'
                            }
                        }
                    },
                    'phone': {
                    },
                    'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'E-mail non valida',
                            },
                            notEmpty: {
                                message: 'E-mail richiesta'
                            }
                        }
                    },
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'Password richiesta'
                            },
                            callback: {
                                message: 'Password non valida',
                                callback: function (input) {
                                    if (input.value.length > 0) {
                                        return validatePassword();
                                    }
                                }
                            }
                        }
                    },
                    'confirm-password': {
                        validators: {
                            notEmpty: {
                                message: 'È richiesta la conferma della password'
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'Le due password non coincidono'
                            }
                        }
                    },
                    'toc': {
                        validators: {
                            notEmpty: {
                                message: 'Devi accettare i Termini e le Condizioni.'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }
                    }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
                }
            }
        );

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    const urlLogin = "http://localhost:3000/api/registrazione"

                    let dataNascita=document.getElementById("upBday").value
                    let dataConvertita=convertiData(dataNascita)

                    axios.post(urlLogin, {
                        nome: document.getElementById("upName").value.trim(),
                        cognome: document.getElementById("upSur").value.trim(),
                        username: document.getElementById("upUser").value.trim(),
                        dataNascita: dataConvertita,
                        telefono: "+39"+document.getElementById("upPhone").value.trim(),
                        email: document.getElementById("upEmail").value.trim(),
                        password: document.getElementById("upPass").value.trim(),
                    }).then((result) => {
                        const ris = result.data.Ris;
                        if (ris === 1) {
                            Swal.fire({
                                text: "Registrazione effettuata!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(()=>{
                                window.location="http://localhost:3000/dashboard"
                            })
                        }
                        else {
                            const mess = result.data.Mess;
                            Swal.fire({
                                text: mess,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            })
                            submitButton.setAttribute('data-kt-indicator', 'off');
                            submitButton.disabled = false;
                        }
                    }).catch((error)=> {
                        Swal.fire({
                            text: error.message,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                        submitButton.setAttribute('data-kt-indicator', 'off');
                        submitButton.disabled = false;
                    })
                }
            })
        })

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function () {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    }


    // Handle form ajax
    var handleFormAjax = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'Nome richiesto'
                            }
                        }
                    },
                    'surname': {
                        validators: {
                            notEmpty: {
                                message: 'Cognome richiesto'
                            }
                        }
                    },
                    'username': {
                        validators: {
                            notEmpty: {
                                message: 'Username richiesto'
                            }
                        }
                    },
                    'birthday': {
                        validators: {
                            regexp: {
                                regexp: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                                message: 'Data di nascita non valida',
                            },
                            notEmpty: {
                                message: 'Data di nascita richiesta'
                            }
                        }
                    },
                    'phone': {
                        validators: {
                            regexp: {
                                regexp: /^+?[0-9]{1,3}?[-. ]?(([0-9]{1,4})|[0-9]{1,4})?[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,4}$/,
                                message: 'Cellulare non valido',
                            },
                            notEmpty: {
                                message: 'Cellulare non valido'
                            }
                        }
                    },
                    'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'E-mail non valida',
                            },
                            notEmpty: {
                                message: 'E-mail richiesta'
                            }
                        }
                    },
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'Password richiesta'
                            },
                            callback: {
                                message: 'Password non valida',
                                callback: function (input) {
                                    if (input.value.length > 0) {
                                        return validatePassword();
                                    }
                                }
                            }
                        }
                    },
                    'password_confirmation': {
                        validators: {
                            notEmpty: {
                                message: 'Conferma della password richiesta'
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'Le due password non sono uguali'
                            }
                        }
                    },
                    'toc': {
                        validators: {
                            notEmpty: {
                                message: 'Devi accettare i termini e le condizioni'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }
                    }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
                }
            }
        );

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;


                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios.post(submitButton.closest('form').getAttribute('action'), new FormData(form)).then(function (response) {
                        if (response) {
                            form.reset();

                            const redirectUrl = form.getAttribute('data-kt-redirect-url');

                            if (redirectUrl) {
                                location.href = redirectUrl;
                            }
                        } else {
                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "Sono stati rilevati degli errori, riprova.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                        }
                    }).catch(function (error) {
                        Swal.fire({
                            text: "Sono stati rilevati degli errori, riprova.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }).then(() => {
                        // Hide loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;
                    });

                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Sono stati rilevati degli errori, riprova.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            });
        });

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function () {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    }


    // Password input validation
    var validatePassword = function () {
        return (passwordMeter.getScore() > 50);
    }

    var isValidUrl = function(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Public functions
    return {
        // Initialization
        init: function () {
            // Elements
            form = document.querySelector('#kt_sign_up_form');
            submitButton = document.querySelector('#kt_sign_up_submit');
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

            if (isValidUrl(submitButton.closest('form').getAttribute('action'))) {
                handleFormAjax();
            } else {
                handleForm();
            }
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSignupGeneral.init();
});
