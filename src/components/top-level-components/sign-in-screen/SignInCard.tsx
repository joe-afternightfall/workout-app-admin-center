import React from 'react';
import {
  Card,
  Grid,
  Button,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      height: 48,
    },
    iconWrapper: {
      textAlign: 'center',
    },
  })
);

export default function SignInCard(props: SignInFormProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={
          <Grid container justify={'center'}>
            <Grid item>
              <Typography>{'Sign In'}</Typography>
            </Grid>
          </Grid>
        }
      />

      <CardContent>
        <Grid container direction={'column'} spacing={3} alignItems={'center'}>
          <Grid item>
            <TextField
              value={props.email}
              label={'Email'}
              onChange={props.changeHandler}
              name={'email'}
            />
          </Grid>

          <Grid item>
            <TextField
              value={props.password}
              label={'Password'}
              type={'password'}
              onChange={props.changeHandler}
              name={'password'}
            />
          </Grid>

          <Grid item style={{ margin: 16 }}>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={props.clickHandler}
              disabled={props.password === '' || props.email === ''}
            >
              {'Sign In'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export interface SignInFormProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  password: string;
  email: string;
}
