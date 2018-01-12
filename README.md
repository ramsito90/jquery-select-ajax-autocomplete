# jquery-select-ajax-autocomplete
jQuery plugin to autocomplete html select tag when changing other field

#TODO documentation

Example:
<head>
    <link rel="stylesheet" href="/jquery.select-ajax-autocomplete.css"/>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/jquery.select-ajax-autocomplete.js"></script>
</head>

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