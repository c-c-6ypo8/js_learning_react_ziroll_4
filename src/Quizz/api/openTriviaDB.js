/* This API client works in this way:
  1. It requests a token from TriviaDB API.
  2. It requests all availiable question categories.
  2. Then it recieves queries to DB through getQuestions function from the app.
  3. For every query it checks whether there is enough questions of the selected
     difficulty in DB by requesting this data through the API.
  4. If everithing is ok, it gives this data to the app.
  5. Then, if questions were passed, what is provided by function passQuestions,
     this hooks writes that passed questions data (category, difficulty and 
     amount) to the settings, which are stored in the LocalStorage. So the hooks
     will know how many questions of the chosen category and difficulty remains 
     in DB.
  6. All this data are bound to the token. If questions of one of the category 
     are exhausted, additional token is requested, so the hook can request the 
     data again. */
import { useEffect, useState, useCallback } from 'react'
import { useFetch } from '../../libs/useFetch'
import { useLocalStorage } from '../../libs/useLocalStorage'

export const useOpenTriviaDB = () => {
  /* Settings are stored in this format:
    { tokens: 
      {
        TOKEN_VALUE: {        
          CATEGORY_ID: { 
            easy: EASY_QUESTIONS_PASSED, 
            medium: MEDIUM_QUESTIONS_PASSED,
            hard: HARD_QUESTIONS_PASSED,
          },
        },
      },    
    } 
  Every token has it's own information about passed questions. If this number 
  equals to the number of all availiable questions, then additional token is 
  created. */
  const [settings, setSettings] = useLocalStorage('open-triviadb-settings', {
    tokens: { tokens: {} },
  })

  const [categories, setCategories] = useState([])

  const changeCategorySetting = useCallback(
    (token, categoryId, difficulty, value) => {
      setSettings((prev) => ({
        ...prev,
        tokens: {
          ...prev.tokens,
          [token]: {
            ...prev.tokens[token],
            [categoryId]: {
              ...prev.tokens[token]?.[categoryId],
              [difficulty]: value,
            },
          },
        },
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const removeToken = useCallback((token) => {
    setSettings((prev) => {
      let next = { ...prev }
      if (next?.tokens?.[token]) {
        delete next.tokens[token]
      }
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   // changeCategorySetting('gamba', 0, 'easy', 15)
  //   // removeToken('gamba')
  // }, [changeCategorySetting])

  // console.log('current settings', settings)

  const categoryApiUrl = 'https://opentdb.com/api_category.php'
  const categoryApiParams = {}

  /* Requesting availiable categories data */
  let {
    data: categoriesData,
    isLoading: areCategoriesLoading,
    hasLoadingError: hasCategoriesLoadingError,
    loadingErrorMessage: categoriesLoadingErrorMessage,
  } = useFetch(categoryApiUrl, categoryApiParams)

  useEffect(() => {
    if (hasCategoriesLoadingError) {
      console.error(categoriesLoadingErrorMessage)
    } else if (!areCategoriesLoading && categoriesData?.trivia_categories) {
      setCategories(() => {
        /* Rebuilding categories to be an object of format { id: name } */
        return Object.fromEntries(
          [...categoriesData.trivia_categories].map((value) => {
            return [value.id, value.name]
          }),
        )
      })
    }
  }, [
    categoriesData,
    areCategoriesLoading,
    categoriesLoadingErrorMessage,
    hasCategoriesLoadingError,
  ])

  /* Function for the app */
  const getQuestions = (category, difficulty, amount) => {}

  return {
    settings,
    categories,
    areCategoriesLoading,
    getQuestions
  }
}

/* const [token, setToken] = useState()
  const [refetchIndex, setRefetchIndex] = useState(0)
  const tokenApiURL = 'https://opentdb.com/api_token.php'
  const resetToken = useCallback(() => {
    const resetParams = { command: 'reset', token: token }
  })

  const refetchToken = () => {
    setRefetchIndex((prev) => prev + 1)
  }

  const requestParams = { command: 'request' }

  let { data, isLoading, hasError, errorMessage, refetch } = useFetch(
    tokenApiURL,
    requestParams,
  )

  useEffect(() => {
    if (hasError) {
      console.log('Error loading token:', errorMessage)
    } else if (!isLoading && data?.response_code === 0) {
      setToken(data?.token)
      console.log('Token set to', data?.token)
    }
  }, [data, hasError, errorMessage, isLoading])

  useEffect(() => {
    if (refetchIndex) {
      console.log('Refetching token...')
      refetch()
    }
  }, [refetchIndex, refetch]) */

// {"response_code":0,"response_message":"Token Generated Successfully!","token":"dc6580ea73399e7d451c08fbc30515ec0b931975f1fe360b50b397d0d2aa884f"}
// Use token https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE

// const resetTokenString =
//   'https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE'

// const requestCategories = 'https://opentdb.com/api_category.php'

/* {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]} */

// Amount: https://opentdb.com/api.php?amount=10
// Difficulty: https://opentdb.com/api.php?difficulty=medium
// Category: https://opentdb.com/api.php?category=18

// const requestToken = () => {
//   const token = 'TODO'
//   return token
// }

// const generateURL = (category, difficulty, amount) => {}
