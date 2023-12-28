"use strict";

// Class definition
var KTLayoutAside = function () {
    // Private variables
    var toggle;
    var aside;
    var asideMenu;

    // Private functions
    var handleToggle = function () {
       var toggleObj = KTToggle.getInstance(toggle);

       // Add a class to prevent aside hover effect after toggle click
       toggleObj.on('kt.toggle.change', function() {
           aside.classList.add('animating');

           setTimeout(function() {
                aside.classList.remove('animating');
           }, 300);
       });

       // Store sidebar minimize state in cookie
		toggleObj.on('kt.toggle.changed', function() {
			// In server side check sidebar_minimize_state cookie 
			// value and add data-kt-app-sidebar-minimize="on" 
			// attribute to Body tag and "active" class to the toggle button
			var date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

			KTCookie.set("aside_minimize_state", toggleObj.isEnabled() ? "on" : "off", {expires: date}); 
		});
    }

    var handleMenuScroll = function() {
		var menuActiveItem = asideMenu.querySelector(".menu-link.active");

		if ( !menuActiveItem ) {
			return;
		} 

		if ( KTUtil.isVisibleInContainer(menuActiveItem, asideMenu) === true) {
			return;
		}

		asideMenu.scroll({
			top: KTUtil.getRelativeTopPosition(menuActiveItem, asideMenu),
			behavior: 'smooth'
		});
	}

    // Public methods
    return {
        init: function () {
            // Elements
            aside = document.querySelector('#kt_aside');
            toggle = document.querySelector('#kt_aside_toggle');
            asideMenu = document.querySelector('#kt_aside_menu_wrapper');

            if ( asideMenu ) {
				handleMenuScroll();
			}

            if (!aside || !toggle) {
                return;
            }

            handleToggle();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTLayoutAside.init();
});