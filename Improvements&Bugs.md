# BaileyDB To Do List:

## Improvements:

### High Priority -

1. The expanded header card for people needs to be completely reworked this is due to the interactions between bootstrap and the height properties and the excess overflowing
   text on the biographies. Current issue causes the icons to be pushed out of the container when the screen is adjusting.

2. Current the site address needs to entered in perfectly with https://... Therefore a re-direct needs to be put in if the simply http://... or other is put in to improve
   accessability to the site.

### Medium Priority -

1. Implement a sorting system for any persons credits e.g. sort all the credits by popularity or voting score.

2. Add the ability for the user to manipulate the watchlist further, for example to be able to turn the watch list into a table and to sort it by score. Further down the line
   this can include the ability to show the users scoring (see below) and create multiple watchlists.

3. Render any errors received from the server to the user as currently they are not being rendered.

### Low Priority -

1. Implement a scoring system that will store user scores in a table within the database which can be compared to the TMDB scores. Furthermore the TMDB API has the ability
   to score on their site via the API, this would be an additionally feature that can be added.

## Bugs:

### High Priority -

1. Movies / TV shows with special characters e.g. a ', cannot be added to the database as the insert views this as the end of the statement as therefore cannot insert the
   value into the database. These characters need to be escaped on the insert for the addToWatchList functionality.

### Medium Priority -

1. Duplicated keys on certain peoples credits, this is due to a person being for example a writer and a director on a film / show. The TMDB API sends both of these through
   as individual credits however they both have the same ID. The best solution for this is to filter the array before render to remove these duplicates and to combine the
   roles together so it would render as for example director and writer. This will also solve the problem of a show turning up twice on the known for just with two different
   roles like above.

2. the initial sort for the accordian in the person expanded card we retrieve a combined list of credit both acting and crew work. I am currently putting these two list together
   and sorting them which will work in some cases. However if the person has an upcoming film / crew work which has not yet got a release date the sort doesn't know what to do with this
   and its causes the sort to stop as it cant compare the two dates it is being asked to. This means these cases need to be accounted for in the sort and should actually be put to the
   top of the list with a to be comfirmed being rendered next to them.
