# jquery-select-ajax-autocomplete
jQuery plugin to autocomplete html select tag when changing other field

#TODO documentation

Example:

    <script>
      $(function () {
        var options = {
            url: function (phrase) {
                return "http://my.api.com/searchBar?nom=" + phrase;
            },
            targetSelect: $("#bar"),
            requestDelay: 750,
            idVar: "barId",
            textVar: "barNom",
            loadingImage: true,
            finishCallback: function () {
                console.log("finish");
            }

        };
        $("#foo").selectAjaxAutocomplete(options);
      });
    </script>