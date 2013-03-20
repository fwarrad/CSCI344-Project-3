Build the client-side part of a ToDo list application.

Your application should be a single-page app (no links to other pages). It should have a tabbed user interface with 3 tabs. First build the tab interface using the techniques that we learned in class.

The tabs should be organized as follows:

"All" -- it lists all ToDo descriptions, along with a list of categories next to it. There is a 'remove' button next to each one, and clicking that will remove the ToDo from the DOM and all interfaces.

"Categorized" -- it includes a list of categories, and each category entry has a list of descriptions associated with it. Note that some ToDo descriptions may appear in multiple category lists. You can also remove ToDos from this view.

"Edit" -- this allows you add ToDos. One text field will accept a 'description' and the other will accept a comma-delimited set of categories. There will be a button that adds the ToDo to the the list, and it will appear in all views. (Note that it is impossible to add the ToDo to the file, so as soon as you reload the page it will start over)

Try doing things in this order:

(1) Build the tab interface for the three tabs. This should be easy and follow our previous examples closely.

(2) Build the first tab content without the 'remove' button for each entry. This should be easy and follow our previous examples closely.

(3) Build the second tab content which categorizes the tabs. Make sure you keep this in a completely separate div from the first tab. The easiest thing to do is to recalculate this tab content every time you click on the tab. Do not include the 'remove' button here either.

(4) Style your interface. Make it look nice.

(5) Add the 'remove' button to the first and second tabs. This will most likely require you to give each todo entry an id. I'd make it an integer.

(6) Create the third tab and make it work.

(7) Add to the user experience. For example, make things fade out when they are removed. Make it interesting.

Your project should bootstrap itself by pulling a list of existing ToDos from a file called "all.json."

You will be graded on (1) following the spec, (2) getting everything to work, (3) interface style, (4) user experience style, (5) code style -- don't forget to lint your html and javascript, (6) consistency in code, (7) consistency in github commits, (8) intangible creative aspects.

Post a link to your github repo.