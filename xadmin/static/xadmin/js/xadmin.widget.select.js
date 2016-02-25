;(function ($) {
    // add select2 render
    $.fn.exform.renders.push(function (f) {
        if (!window.__admin_ismobile__ && $.fn.selectize) {
            f.find('select:not(.select-search):not([multiple=multiple])').selectize();
        }
        if ($.fn.select2) {
            f.find('.select-search').each(function () {
                var $el = $(this);
                $el.select2({
                    minimumInputLength: 1,
                    ajax: {
                        url: $el.data('search-url') + $el.data('choices'),
                        dataType: 'json',
                        data: function (params) {
                            return {
                                '_q_': params.term,
                                '_cols': 'id.__str__',
                                'p': params.page - 1
                            };
                        },
                        processResults: function (data, params) {
                            // parse the results into the format expected by Select2
                            // since we are using custom formatting functions we do not need to
                            // alter the remote JSON data, except to indicate that infinite
                            // scrolling can be used
                            params.page = params.page || 1;

                            var res = $.map(data.objects, function (obj) {
                                obj.text = obj.text || obj.__str__;
                                return obj;
                            });

                            return {
                                results: res,
                                pagination: {
                                    more: data.has_more
                                }
                            };
                        },
                    },
                });
            })
        }
    });
})(jQuery);
