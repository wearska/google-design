(function(init) {
    'use strict';
    // The global jQuery object is passed as a parameter
    init(window.jQuery, window, document);

}(function($, window, document) {
    'use strict';

    //plugin name
    var appbar = "appbar",
        //get instance
        self = null,
        //defaults
        defaults = {
            "gd-is-extended": "",
            "gd-is-special": ""
        };

    //main function
    function AppBar($element, options) {
        self = this;
        this.element = $element;
        this._defaults = defaults;
        this.options = $.extend({}, defaults, options);

        //init
        self.init($element);
    }

    // Update Attributes
    AppBar.prototype.updateAttrs = function($object, opt) {
        $.each(opt, function(key, value) {
            if (!(key.indexOf("gd-") > -1)) {
                $object.attr(key, value);
            }
        });
    }

    //Init
    AppBar.prototype.init = function($element) {
        //initial setup
        //clear the element
        //$element.empty();
        //get the template and store it in a jquery object
        // $.get("./modules/components/appbar/appbar.template.html", function(data) {
        //     $element.html(data);
        // 
        //     var $appBar = $element.find("#appbar"),
        //         $appTitle = $element.find(".app-title"),
        //         $appNav = $element.find("nav"),
        //         navLinks = '<li class="tab"><a></a></li>'
        // 
        //     self.updateAttrs($appBar, self.options);
        // });
        console.log(self.options);
    };

    //create the AppBar instance
    var gdAppbarProto = Object.create(HTMLElement.prototype);
    gdAppbarProto.attachedCallback = function() {
        var $element = $(this),
            options = {},
            attributes = this.attributes,
            aLength = attributes.length;
        for (var a = 0; a < aLength; a++) {
            options[attributes[a].name.toLowerCase()] = attributes[a].value;
        }
        new AppBar($element, options);
        console.log("appbar attached");
    };
    document.registerElement("gd-appbar", {
        prototype: gdAppbarProto
    });
}));