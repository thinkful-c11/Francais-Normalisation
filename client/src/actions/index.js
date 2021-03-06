import request from "superagent";
import * as Cookies from 'js-cookie';

export const REQUEST_LESSON = 'REQUEST_LESSON';
export const requestLesson = () => ({
    type:REQUEST_LESSON,
});

export const REQUEST_LESSON_SUCCESS = 'REQUEST_LESSON_SUCCESS';
export const requestLessonSuccess = questions => ({
    type: REQUEST_LESSON_SUCCESS,
    questions
});

export const REQUEST_LESSON_ERROR = 'REQUEST_LESSON_ERROR';
export const requestLessonError = error => ({
    type: REQUEST_LESSON_ERROR,
    error
});

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = () => ({
    type: NEXT_QUESTION
})

export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const getCurrentUserSuccess = user => ({
    type: GET_CURRENT_USER_SUCCESS,
    user
})

export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';
export const getCurrentUserError = error => ({
    type: GET_CURRENT_USER_ERROR,
    error
});

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const getCurrentUserRequest = () => ({
    type: GET_CURRENT_USER_REQUEST,
});

export const SET_USER_ANSWER = 'SET_USER_ANSWER';
export const setUserAnswer = answer => ({
  type: SET_USER_ANSWER,
  answer
});

export const CORRECT = 'CORRECT';
export const correct = question => ({
  type: CORRECT,
  question
});

export const getLessons = () => dispatch => {
     const accessToken = Cookies.get('accessToken');
    dispatch(requestLesson())
    request
        .get('/api/questions')
        .set({'Authorization':`Bearer ${accessToken}`})
        .then(res =>{
          console.log("res: ", res);
          dispatch(requestLessonSuccess(res.body))
        })
        .catch(err => dispatch(requestLessonError(err)))
}

export const getCurrentUser = () => dispatch => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      dispatch(getCurrentUserRequest());
      request
          .get('/api/me')
          .set({'Authorization':`Bearer ${accessToken}`})
          .then(res => {
            if (!res.ok) {
              if (res.status === 401) {
                Cookies.remove('accessToken');
                return;
              }
              throw new Error(res.statusText)
            }
            dispatch(getCurrentUserSuccess(res.body))
          })
          .catch(err => dispatch(getCurrentUserError(err)))
    }
}

export const updateScore = (score,id) => dispatch => {
     const accessToken = Cookies.get('accessToken');
    console.log('this is ===>',score)
    console.log('this is the id:', id);
    let body = {score:score, id:id}
        return fetch('/api/score', {
            method: 'PUT',
            headers: {Authorization: `Bearer ${accessToken}`},
            body:JSON.stringify(body)
        })
        .then(res => console.log("This is what i want to look at: ", res));
}
