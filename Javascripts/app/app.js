var $ = window.$;
var ctwitter = window.ctwitter; 
var console = window.console; 
var main = function () {
    //variable count
    var itemNum = 0;
    var totalTasks = 0;
    var numTasks = 0;
    var categTasks = 0;
    //Show & Hide
    $(".tabs").hide();
    $(".edit_tab_content").hide();
    $(".resetButton").hide();
    $("#startButton").click(function () {
      $(".startButton").hide();
      $(".resetButton").show();
      $(".tabs").delay(80000000).fadeIn(80000000).show();
      $(".edit_tab_content").delay(80000000).fadeIn(80000000).show();
    }); // end of .click function  
    
    var buildCategorized = function () {
        //Remove old content
        $("#Categorized").children().remove();
        //build new content
        var x, y; 
        for (x = 0; x < totalTasks; x++) {
            var description = $(".description:eq(" + x + ")").html();
            var categoriesStr = $(".categories:eq(" + x + ")").html();
            var categories = categoriesStr.split(" ");
            for (y = 0; y < categories.length; y++) {
                if (categories[y] === undefined || categories[y] === '') {
                    //this does/adds nothing
                } else {
                  if ($("#Categorized > .item").is("." + categories[y])) {
                        $("." + categories[y]).append("<p class='item'>"
                            + categories[y]
                            + "</p>");
                    } else {
                        $("#Categorized").append("<div class='item "
                            + numTasks
                            + "'><h4 class='categoryTitle'>"
                            + categories[y]
                            + "</h4><p class='description'>"
                            + description
                            + "<button type='button' class='remove' id='" + numTasks + "'>Remove</button>"
                            + "</p></div>");

                            $("#"+ numTasks).click(function () {
                              console.log("removed task from Category Tab");
                              var taskRemoved = $(this).attr("id");
                              $("." + taskRemoved).remove();
                              categTasks--;  
                            });
                           numTasks++;
                           categTasks++;
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


    var buildUpaddTaskHandler = function () {
        $("#addTask").click(function () {
            console.log("Added Task to All & Category Tab");
            var desc = $("#desc").val();
            var categories = $("#categ").val();

        addTask(desc, categories);

            $("#desc").val("");
            $("#categ").val("");
        });
        
    };
    
    var addTask = function (desc, categories) {
        $("#All").append("<div class='item " + itemNum + "''>"
            + "<p class='description'>" + desc + "</p>"
            + "<p class='categories'>" + categories + "</p>"
            + "<button type='button' class='remove' id='" + itemNum + "'>Remove</button>"
            + "</div>");
        $("#" + itemNum).click(function () {
            console.log("removed task from All Tab");
            var taskRemoved = $(this).attr("id");
            $("." + taskRemoved).fadeOut('slow').remove();
            totalTasks--;
        });
        itemNum++;
        numTasks++
        totalTasks++;
    };
    
    var jsonInitializer = function () {
        $(".welcome").show();
        $.getJSON("javascripts/lib/all.json", function (todos) {
            todos.forEach(function (todo) {
                var categoriesString = "";
                todo.categories.forEach(function (category) {
                    categoriesString = categoriesString + " " + category;
                });
                addTask(todo.description, categoriesString);
                buildCategorized (todos.description, categoriesString);
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