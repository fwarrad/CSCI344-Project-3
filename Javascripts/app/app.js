var $ = window.$;
var ctwitter = window.ctwitter; 
var console = window.console; 
var main = function () {
    "use strict";
    //variable count
    var totalTasks = 0,
        categTasks = 0;

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
  //Function that generates a unique ID. 
    var PseudoGuid = new (function() {
            this.empty = "00000000-0000-0000-0000-000000000000";
            this.GetNew = function() {
                var fourChars = function() {
                        return (((1 + Math.random()) * 0x10000) | 1).toString(16).substring(1).toUpperCase();
                    }
                return (fourChars() + fourChars() + "-" + fourChars() + "-" + fourChars() + "-" + fourChars() + "-" + fourChars() + fourChars() + fourChars());
    };
  })();

  //Variable calls for the unique ID.
  itemNum = PseudoGuid.GetNew();
  numTasks = 0;
  allTasks = 0; 
    
    var addTask = function (desc, categories) {
        $("#All").append("<div id='" + itemNum + "'' class='item " + allTasks + "'' >"
            + "<p class='description'>" + desc + "</p>"
            + "<p class='categories'>" + categories + "</p>"
            + "<button type='button' class='remove' id='" + itemNum + "'>Remove</button>"
            + "</div>");
            
        $("#" + itemNum).click(function () {
            console.log("removed task from All Tab");
            var taskRemoved = $(this).attr("id");
            $("#" + taskRemoved).remove();
            totalTasks--;
        });
        itemNum+= 1;
        allTasks+= 1; 
        totalTasks++;
        
    };
    
    var buildCategorized = function () {
        //Remove old content
        $("#Categorized").children().remove();
        //build new content
        var x, y; 
        var numTasks = 0;
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
                            + "</p><p class='remove'>"
                            + "<button type='button' class='remove' id='" + numTasks + "'>Remove</button>"
                            + "</p></div>");

                            $("#" + numTasks).click(function () {
                              console.log("Removed task from Category tab.");
                              var categTaskRemoved = $(this).attr("id");
                              $("." + categTaskRemoved).remove(); 
                              totalTasks--;
                              totalTasks++; 
                            });
                            numTasks+= 1;
                           
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