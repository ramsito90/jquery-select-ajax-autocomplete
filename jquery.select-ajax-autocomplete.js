/**
 * jQuery SAA (Select Ajax Autocomplete)
 *
 * @author Ramsés Corporales
 * @version 1.0
 * @copyright 2017 - GNU General Public License v3.0
 * @link https://github.com/ramsito90/jquery-select-ajax-autocomplete
 */
class SelectAjaxAutocomplete {
    constructor(options, $element) {
        this.options = options;
        this.$element = $element;
        this.timeout = null;

        this.init();
    }

    init() {
        let that = this;
        this.$element.on("change", function () {
            clearTimeout(that.timeout);
            that.timeout = setTimeout(function () {
                that.updateSelect();
            }, that.options.requestDelay);
        });
    }

    updateSelect() {
        let that = this;

        if (this.options.cleanSelect === true) {
            $(this.options.targetSelect).find('option').each(function (index) {
                if (!(that.options.keepFirstOption === true && index === 0)) {
                    $(this).remove();
                }
            });
        }

        if (that.options.loadingImage === true) {
            if (that.options.loadingImageInParent === true) {
                $(that.options.targetSelect).parent().append('<div class="saa-loading"> </div>');
            } else {
                $(that.options.targetSelect).append('<div class="saa-loading"> </div>');
            }
        }
        let ajaxUrl = this.options.url(this.$element.val());
        $.get(ajaxUrl, function (data) {
            $.each(data, function (i, d) {
                $(that.options.targetSelect).append('<option value="' + d[that.options.idVar] + '">' + d[that.options.textVar] + '</option>')
            });
            if (that.options.niceSelect === true) {
                $(that.options.targetSelect).niceSelect('update');
            }
            if (that.options.loadingImage === true) {
                if (that.options.loadingImageInParent === true) {
                    $(that.options.targetSelect).parent().find('.saa-loading').remove();
                } else {
                    $(that.options.targetSelect).find('.saa-loading').remove();
                }
            }
            if (that.options.finishCallback !== null) {
                that.options.finishCallback();
            }
        });
    }
}

(function ($) {

    $.fn.selectAjaxAutocomplete = function (options) {
        let settings = $.extend({
            requestDelay: 500,
            url: null,
            targetSelect: null,
            cleanSelect: true,
            keepFirstOption: true,
            idVar: null,
            textVar: null,
            niceSelect: false,
            loadingImage: false,
            loadingImageInParent: false,
            finishCallback: null
        }, options);

        let errors = false;
        if (settings.url === null) {
            errors = true;
            console.error("options.url is required");
        }
        if (settings.targetSelect === null) {
            errors = true;
            console.error("options.targetSelect is required");
        }
        if (settings.idVar === null) {
            errors = true;
            console.error("options.idVar is required");
        }
        if (settings.textVar === null) {
            errors = true;
            console.error("options.textVar is required");
        }
        if (errors) {
            return;
        }

        return this.each(function () {
            let $element = $(this);
            new SelectAjaxAutocomplete(settings, $element);
        });
    }

})(jQuery);