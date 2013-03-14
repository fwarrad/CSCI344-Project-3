/*jslint indent:4*/
/*global $, document */

var main = function () {
    //count variable
    var itemNum = 0;
    var totalTasks = 0;

    var buildCategorized = function () {
        //clear previous content
        $("#Categorized").children().remove();
        //generate new content
        var x, y;
        for (x = 0; x < totalTasks; x++) {
            var description = $(".description:eq(" + x + ")").html();
            var categoriesStr = $(".categories:eq(" + x + ")").html();
            var categories = categoriesStr.split(" ");
            for (y = 0; y < categories.length; y++) {
                if (categories[y] === undefined || categories[y] === '') {
                    //do nothing
                } else {
                    if ($("#Categorized > .item").is("." + categories[y])) {
                        $("." + categories[y]).append("<p class='description'>"
                            + description
                            + "</p>");
                    } else {
                        $("#Categorized").append("<div class='item "
                            + categories[y]
                            + "'><h4 class='categoryTitle'>"
                            + categories[y]
                            + "</h4><p class='description'>"
                            + description
                            + "</p></div>");
                    }
                }
            }
        }

    };

    var buildUpTabHandler = function (anchor) {
        anchor.click(function () {
            var target = $(this).attr("href");

            $(".active").removeClass("active");
            $(this).addClass("active");
            $("#" + target).addClass("active");

            if (target === "Categorized") {
                buildCategorized();
            }

            return false;
        });
    };

    var addTask = function (desc, categories) {
        $("#All").append("<div class='item " + itemNum + "''>"
            + "<p class='description'>" + desc + "</p>"
            + "<p class='categories'>" + categories + "</p>"
            + "<button type='button' class='remove' id='"
            + itemNum
            + "'>Remove</button>"
            + "</div>");
        $("#" + itemNum).click(function () {
            var toBeRemoved = $(this).attr("id");
            $("." + toBeRemoved).remove();
            totalTasks--;
        });
        itemNum++;
        totalTasks++;
    };

    var buildUpaddTaskHandler = function () {
        $("#addTask").click(function () {
            var desc = $("#desc").val();
            var categories = $("#categ").val();

            addTask(desc, categories);

            $("#desc").val("");
            $("#categ").val("");
        });
    };

    var jsonInitializer = function () {
        $.getJSON("javascripts/lib/all.json", function (todos) {
            todos.forEach(function (todo) {
                var categoriesString = "";
                todo.categories.forEach(function (category) {
                    categoriesString = categoriesString + " " + category;
                });
                addTask(todo.description, categoriesString);
            });
        });
    };

    var initialize = function () {
        jsonInitializer();
        buildUpTabHandler($(".tabs .tab"));
        buildUpaddTaskHandler();
    };

    initialize();

};

$(document).ready(main);