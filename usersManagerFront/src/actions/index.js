export const selectUser = (userID) => {
  return {
    type: 'SELECTED_USER',
    selectId: userID,
  };
};

export const noneSelected = () => {
  return {
    type: 'NONE_SELECTED',
  };
};

export const formUpdate = ({prop, value}) => {
  return {
    type: 'FORM_UPDATE',
    payload: {prop, value},
  };
};

export const createNewContact = ({
  firstName,
  lastName,
  phone,
  email,
  company,
  jwt,
}) => {
  return (dispatch) => {
    var details = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      company: company,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://users-manager-server.herokuapp.com/api/users/users-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        token: jwt,
      },
      body: formBody,
    })
      .then((response) => console.log(response))
      .then(() => {
        dispatch({type: 'NEW_CONTACT'});
      })
      .catch((error) => console.log(error));
  };
};

export const loadInitialContacts = (jwt) => {
  return (dispatch) => {
    fetch('https://users-manager-server.herokuapp.com/api/users/users-list', {
      method: 'GET',
      headers: {
        token: jwt,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'INITIAL_FETCH', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const deleteContact = (id, jwt) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      token: jwt,
    },
  };
  return (dispatch) => {
    fetch(
      `https://users-manager-server.herokuapp.com/api/users/users-list/${id}`,
      requestOptions,
    )
      .then(() => {
        dispatch({type: 'DELETE_CONTACT'});
      })
      .catch((error) => console.log(error));
  };
};

export const updateContact = (user) => {
  return {
    type: 'UPDATE_CONTACT',
    payload: user,
  };
};

export const saveContact = ({
  firstName,
  lastName,
  phone,
  email,
  company,
  _id,
  jwt,
}) => {
  return (dispatch) => {
    var details = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      company: company,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(
      `https://users-manager-server.herokuapp.com/api/users/users-list/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          token: jwt,
        },
        body: formBody,
      },
    )
      .then((response) => console.log(response))
      .then(() => {
        dispatch({type: 'SAVE_CONTACT'});
      })
      .catch((error) => console.log(error));
  };
};

export const jwtHandler = (jwt) => {
  return (dispatch) => {
    dispatch({type: 'SAVE_JWT', jwt: jwt});
  };
};

export const signInOrUp = (isAccountExists) => {
  return (dispatch) => {
    dispatch({type: 'SIGN_IN_OR_UP', isAccountExists: isAccountExists});
  };
};
