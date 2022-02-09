const requestTokenString = 'https://opentdb.com/api_token.php?command=request'

// {"response_code":0,"response_message":"Token Generated Successfully!","token":"dc6580ea73399e7d451c08fbc30515ec0b931975f1fe360b50b397d0d2aa884f"}
// Use token https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE

const resetTokenString = 'https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE'

const requestCategories = 'https://opentdb.com/api_category.php'

/* {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]} */

// Amount: https://opentdb.com/api.php?amount=10
// Difficulty: https://opentdb.com/api.php?difficulty=medium
// Category: https://opentdb.com/api.php?category=18

// const requestToken = () => {
//   const token = 'TODO'
//   return token
// }

const generateURL = (category, difficulty, amount) => {
    
}