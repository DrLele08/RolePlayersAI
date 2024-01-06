"use strict";
var KTPosSystem = function () {
    var t, e = wNumb({mark: ".", thousand: ",", decimals: 2, prefix: "$"}), n = function () {
        [].slice.call(t.querySelectorAll('[data-kt-pos-element="item"] [data-kt-dialer="true"]')).map(function (n) {
            var a = KTDialer.getInstance(n);
            a.on("kt.dialer.changed", function () {
                var n = parseInt(a.getValue()), o = a.getElement().closest('[data-kt-pos-element="item"]'), r = n * parseInt(o.getAttribute("data-kt-pos-item-price"));
                o.querySelector('[data-kt-pos-element="item-total"]').innerHTML = e.to(r), function () {
                    var n = [].slice.call(t.querySelectorAll('[data-kt-pos-element="item-total"]')), a = 0, o = 0;
                    n.map(function (t) {
                        a += e.from(t.innerHTML);
                    }), o = a, o -= 8, o += 0.96, t.querySelector('[data-kt-pos-element="total"]').innerHTML = e.to(a), t.querySelector('[data-kt-pos-element="grant-total"]').innerHTML = e.to(o);
                }();
            });
        });
    };
    return {init: function () {
            t = document.querySelector("#kt_pos_form"), n();
        }};
}();
KTUtil.onDOMContentLoaded(function () {
    KTPosSystem.init();
});
