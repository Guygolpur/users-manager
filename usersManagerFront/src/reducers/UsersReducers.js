const initialState = {
  users: [],
  detailView: false,
  userSelected: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  company: '',
  _id: '',
  toUpdate: false,
  jwt: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_FETCH':
      return {
        ...state,
        users: action.payload,
      };

    case 'SELECTED_USER':
      return {
        ...state,
        detailView: true,
        userSelected: action.selectId,
      };

    case 'NONE_SELECTED':
      return {
        ...state,
        detailView: false,
        userSelected: null,
        toUpdate: false,
      };

    case 'FORM_UPDATE':
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };

    case 'NEW_CONTACT':
      return {
        ...state,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
      };

    case 'ADD_USER':
      return {
        ...state,
        ...action.newUser,
      };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        toUpdate: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        email: action.payload.email,
        company: action.payload.company,
        _id: action.payload._id,
      };

    case 'SAVE_JWT':
      return {
        ...state,
        jwt: action.jwt,
      };

    case 'SAVE_CONTACT':
      return {
        ...state,
        toUpdate: true,
        detailView: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
        _id: '',
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        detailView: false,
        userSelected: null,
      };

    case 'SIGN_IN_OR_UP':
      return {
        ...state,
        isAccountExists: action.isAccountExists,
      };

    default:
      return state;
  }
};
