(function (init) {
    'use strict';
    // The global jQuery object is passed as a parameter
    init(window.jQuery, window, document);

}(function ($, window, document) {
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

    // Get Nav links
    AppBar.prototype.getNav = function ($element, $gdelem) {
        // console.log($element.parent())
        if ($gdelem.length > 0) {
            var $parent = $element.parent();
            $element.detach();
            for (var a = 0; a < $gdelem.length; a++) {
                var attributes = $element[0].attributes,
                    i = attributes.length;
                while (i--) {
                    $element[0].removeAttributeNode(attributes[i]);
                }
                self.getAttrs($element, $gdelem.eq(a))
                var className = $element[0].className;
                if (className !== ''){
                    $element[0].className = ('tab ' + className);
                }else {
                    $element[0].className = 'tab';
                }
                var href = $element.attr('href'),
                    $anchor = $element.find('>a');
                $element.removeAttr('href');
                $anchor.attr('href', href);
                self.getHtml($anchor, $gdelem.eq(a));
                $element.clone().appendTo($parent);
            }
        }
        //console.log($element.closest('nav').find('> ul > li').not('.app-logo'));
    }

    // Get html
    AppBar.prototype.getHtml = function ($element, $gdelem) {
            if ($gdelem.length > 0) {
                $element.html($gdelem.html());
            }
        }
        // Get attributes
    AppBar.prototype.getAttrs = function ($element, $gdelem) {
        if ($gdelem.length > 0) {
            var attributes = $gdelem[0].attributes,
                aLength = attributes.length;
            for (var a = 0; a < aLength; a++) {
                var key = attributes[a].name.toLowerCase(),
                    value = attributes[a].value;
                $element.attr(key, value);
            }
        }
    }

    // Construct
    AppBar.prototype.construct = function ($element, $gdelem) {
        var $elAppBar = $element.find('#appbar'),
            $elAppTitle = $element.find('h1.app-title'),
            $gdAppTitle = $gdelem.find('app-title'),
            $elAppViewTitle = $element.find('h2.app-view-title'),
            $gdAppViewTitle = $gdelem.find('app-view-title'),
            $elAppNav = $element.find('nav'),
            $gdAppNav = $gdelem.find('app-nav'),
            $elNavLink = $element.find('nav > ul > li').not('.app-logo'),
            $gdNavLink = $gdelem.find('app-link');

        // app bar
        self.getAttrs($elAppBar, $gdelem);
        // app title
        self.getHtml($elAppTitle, $gdAppTitle);
        self.getAttrs($elAppTitle, $gdAppTitle);
        // app view title
        self.getHtml($elAppViewTitle, $gdAppViewTitle);
        self.getAttrs($elAppViewTitle, $gdAppViewTitle);
        // app nav
        self.getAttrs($elAppNav, $gdAppNav);
        self.getNav($elNavLink, $gdNavLink);
    }

    // Template
    AppBar.prototype.template = function ($element, $gdelem) {
        $element.html(
            '<div id="appbar">' +
                '<h1 class="app-title off-screen"></h1>' +
                '<div id="appbar-nav">' +
                    '<nav>' +
                        '<h2 class="off-screen">Main Navigation</h2>' +
                        '<ul class="tabs-list">' +
                            '<li class="app-logo"><a href="/"></a></li>' +
                            '<span flex></span>' +
                            '<li class="tab"><a href=""></a></li>' +
                        '</ul>' +
                    '</nav>' +
                    '<div class="app-menu"></div>' +
                '</div>' +
                '<div id="appbar-extension">' +
                    '<h2 class="app-view-title"></h2>' +
                '</div>' +
            '</div>'
        )
        self.construct($element, $gdelem);
    }

    // Init
    AppBar.prototype.init = function ($element, $gdelem) {
        var $gdelem = $element.clone();
        self.template($element, $gdelem);
    };

    //create the AppBar instance
    var gdAppbarProto = Object.create(HTMLElement.prototype);
    gdAppbarProto.attachedCallback = function () {
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
