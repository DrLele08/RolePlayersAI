"use strict";
var KTSignupGeneral = function () {
    var e, t, r, a;
    return {init: function () {
            e = document.querySelector("#kt_sign_up_form"), t = document.querySelector("#kt_sign_up_submit"), a = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]')), !function (e) {
                try {
                    return new URL(e), true;
                } catch (e) {
                    return false;
                }
            }(t.closest("form").getAttribute("action")) ? (r = FormValidation.formValidation(e, {fields: {"name": {validators: {notEmpty: {message: "Nome richiesto"}}}, "surname": {validators: {notEmpty: {message: "Cognome richiesto"}}}, username: {validators: {notEmpty: {message: "Username richiesto"}}}, birthday: {validators: {notEmpty: {message: "Data di nascita richiesta"}}}, email: {validators: {regexp: {regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail non valida"}, notEmpty: {message: "E-mail richiesta"}}}, password: {validators: {notEmpty: {message: "Password richiesta"}, callback: {message: "Password non valida", callback: function (e) {
                                    if (e.value.length > 0) return a.getScore() > 50;
                                }}}}, "confirm-password": {validators: {notEmpty: {message: "Conferma della password richiesta"}, identical: {compare: function () {
                                    return e.querySelector('[name="password"]').value;
                                }, message: "Le due password sono diverse"}}}, toc: {validators: {notEmpty: {message: "Devi accettare i termini e le condizioni d'uso"}}}}, plugins: {trigger: new FormValidation.plugins.Trigger({event: {password: false}}), bootstrap: new FormValidation.plugins.Bootstrap5({rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: ""})}}), t.addEventListener("click", function (s) {
                s.preventDefault(), r.revalidateField("password"), r.validate().then(function (r) {
                    "Valid" == r ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = true, setTimeout(function () {
                        t.removeAttribute("data-kt-indicator"), t.disabled = false, Swal.fire({text: "You have successfully reset your password!", icon: "success", buttonsStyling: false, confirmButtonText: "Ok, got it!", customClass: {confirmButton: "btn btn-primary"}}).then(function (t) {
                            if (t.isConfirmed) {
                                e.reset(), a.reset();
                                var r = e.getAttribute("data-kt-redirect-url");
                                r && (location.href = r);
                            }
                        });
                    }, 1500)) : Swal.fire({text: "Sono stati rilevati degli errori, riprovare", icon: "error", buttonsStyling: false, confirmButtonText: "Ok", customClass: {confirmButton: "btn btn-primary"}});
                });
            }), e.querySelector('input[name="password"]').addEventListener("input", function () {
                this.value.length > 0 && r.updateFieldStatus("password", "NotValidated");
            })) : (r = FormValidation.formValidation(e, {fields: {name: {validators: {notEmpty: {message: "Nome richiesto"}}}, surname: {validators: {notEmpty: {message: "Cognome richiesto"}}}, username: {validators: {notEmpty: {message: "Username richiesto"}}}, birthday: {validators: {notEmpty: {message: "Data di nascita richiesta"}}}, email: {validators: {regexp: {regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail non valida"}, notEmpty: {message: "E-mail richiesta"}}}, password: {validators: {notEmpty: {message: "Password richiesta"}, callback: {message: "Password non valida", callback: function (e) {
                                    if (e.value.length > 0) return a.getScore() > 50;
                                }}}}, password_confirmation: {validators: {notEmpty: {message: "Conferma della password richiesta"}, identical: {compare: function () {
                                    return e.querySelector('[name="password"]').value;
                                }, message: "Le due password non coincidono"}}}, toc: {validators: {notEmpty: {message: "Devi accettare i termini e le condizioni d'uso"}}}}, plugins: {trigger: new FormValidation.plugins.Trigger({event: {password: false}}), bootstrap: new FormValidation.plugins.Bootstrap5({rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: ""})}}), t.addEventListener("click", function (a) {
                a.preventDefault(), r.revalidateField("password"), r.validate().then(function (r) {
                    "Valid" == r ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = true, axios.post(t.closest("form").getAttribute("action"), new FormData(e)).then(function (t) {
                        if (t) {
                            e.reset();
                            const t = e.getAttribute("data-kt-redirect-url");
                            t && (location.href = t);
                        } else Swal.fire({text: "Sono stati rilevati degli errori, riprova.", icon: "error", buttonsStyling: false, confirmButtonText: "Ok!", customClass: {confirmButton: "btn btn-primary"}});
                    }).catch(function (e) {
                        Swal.fire({text: "Sono stati tilevati degli errori, riprova.", icon: "error", buttonsStyling: false, confirmButtonText: "Ok!", customClass: {confirmButton: "btn btn-primary"}});
                    }).then(() => {
                        t.removeAttribute("data-kt-indicator"), t.disabled = false;
                    })) : Swal.fire({text: "Sono stati rilevati degli errori, riprova.", icon: "error", buttonsStyling: false, confirmButtonText: "Ok!", customClass: {confirmButton: "btn btn-primary"}});
                });
            }), e.querySelector('input[name="password"]').addEventListener("input", function () {
                this.value.length > 0 && r.updateFieldStatus("password", "NotValidated");
            }));
        }};
}();
KTUtil.onDOMContentLoaded(function () {
    KTSignupGeneral.init();
});
