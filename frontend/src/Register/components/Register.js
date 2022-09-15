import React, { useState, useEffect, useCallback, useDispatch } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Icon } from "@material-ui/core";
import { registerUser } from "../actions";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom'

function Register({
  registerUser,
  registrationResponse,
  registrationError,
  registration
}) {

  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const history = useHistory();

  function handleChangeNick(e) {
    setNick(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onButtonClicked() {
    registerUser({
      "email": email,
      "nick": nick
    }, () => {
      history.push("/");
    })
  }

  return(
    <div className="register">
      <div className="errorMessage">
        {registrationError != null ? 
          <Alert severity="error" variant="outlined" spacing={3}>Błąd podczas rejestracji</Alert>
          : ""
        }
      </div>
      <form>
      <Grid container spacing={1}>
          <Grid item>
            <TextField id="email" 
              label="email" 
              name="email" 
              variant="outlined" 
              onChange={handleChangeEmail} />
            </Grid>
          <Grid item>
            <TextField id="nick" 
              label="nick" 
              name="nick" 
              variant="outlined" 
              onChange={handleChangeNick} />
          </Grid>
          <Grid item>
            <Button id="registerUser" 
              variant="contained" 
              color="secondary" 
              size="large" 
              onClick={onButtonClicked}>
              Zarejestruj się
            </Button>
          </Grid>
      </Grid>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.registerReducer, ...state.appReducer };
}
  
function mapDispatchToProps(dispatch) {
  return {
    registerUser: (register, callback) => {
      dispatch(registerUser(register, callback));
    },
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);