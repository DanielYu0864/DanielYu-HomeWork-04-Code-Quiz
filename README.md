# 04 Web APIs: Code Quiz

## Game explain

This is a sample code quiz with 5 questions.
When you click the start `button`, then the `timer` start counts
When you click the correct `answer button`, then the `score` + 1 and background color turn blue
When you click the wrong `answer button`, then the `seconds` - 15 and background color turn red
When the `seconds` = 0 or answer all the question, then game end and display the `score` and `player` input

### What I did

1. Creat HTML, CSS, JS file and make sure connected
2. HTML:
    * `div.header` to display score and submit, restart button
    * `div.user` to display past player score
    * `div.container` to contain all questions and answer element
3. Javascript:
    * `var` Give element variables
    * `array` to contain all the questions and answers
    * `function` to run the questions and make questions random and save the player `name` and `score` to `localStorage`
    * `event listener` to call all the function