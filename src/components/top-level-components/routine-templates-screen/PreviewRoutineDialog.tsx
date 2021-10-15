import React from 'react';
import {
  List,
  Card,
  Dialog,
  Button,
  AppBar,
  Avatar,
  Toolbar,
  ListItem,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  DialogContent,
  DialogActions,
  ListSubheader,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  Phase,
  Segment,
  getPhaseName,
  sortPhaseSegments,
  RoutineTemplateVO,
  determineTrainingSetType,
} from 'workout-app-common-core';
import { deepOrange } from '@material-ui/core/colors';
import { routerActions } from 'connected-react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ROUTINE_BUILDER_SCREEN_PATH } from '../../../configs/constants/app';
import { viewSelectedRoutine } from '../../../creators/routine-builder/builder';
import CompletedExercises from '../routine-builder-screen/routine-info/components/exercise-segment/completed-segment/components/CompletedExercises';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editButton: {
      padding: '12px 40px',
      marginRight: 20,
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    content: {
      minHeight: '20vh',
      marginTop: 4,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    listWrapper: {
      // border: 'none',
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: '6vh',
      borderRadius: 6,
      backgroundColor: '#ECECEC',
    },
    // subHeader: {
    //   zIndex: 2,
    // },
    listItemDivider: {
      padding: 4,
      width: '100%',
      backgroundColor: '#2c2c2c',
    },
    paperRoot: {
      height: '87vh',
      overflow: 'scroll',
    },
    setsContainer: {
      height: '100%',
    },
  })
);

const PreviewRoutineDialog = (
  props: PreviewRoutineDialogProps & PassedInProps
) => {
  const { open, routineTemplate } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={props.closeHandler} maxWidth={'sm'} fullWidth>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`${routineTemplate && routineTemplate.name} Template`}
          </Typography>
          <IconButton
            edge={'start'}
            color={'inherit'}
            onClick={props.closeHandler}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid
          container
          className={classes.content}
          alignItems={'center'}
          justify={'center'}
          spacing={2}
        >
          {routineTemplate &&
            routineTemplate.phases.map((phase: Phase, index: number) => {
              return (
                <Grid item xs={12} key={index}>
                  <List
                    component={'nav'}
                    className={classes.listWrapper}
                    subheader={
                      <ListSubheader component={'div'} disableSticky>
                        {`Phase #${phase.order} ${getPhaseName(phase.phaseId)}`}
                      </ListSubheader>
                    }
                  >
                    <Grid container spacing={2}>
                      {sortPhaseSegments(phase.segments).map(
                        (segment: Segment, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              key={index}
                              style={{ minHeight: '9vh' }}
                            >
                              <Card style={{ height: '100%' }}>
                                <ListItem
                                  key={index}
                                  style={{ height: '100%' }}
                                >
                                  <ListItemIcon>
                                    <Avatar>{segment.order}</Avatar>
                                    {/*<Avatar className={classes.purple}>OP</Avatar>*/}
                                  </ListItemIcon>
                                  <ListItemText
                                    disableTypography
                                    primary={
                                      <Grid container>
                                        <Grid
                                          item
                                          xs={9}
                                          container
                                          alignItems={'center'}
                                        >
                                          <CompletedExercises
                                            hideNumbers
                                            segment={segment}
                                            linkIconSize={'small'}
                                            setType={determineTrainingSetType(
                                              segment.trainingSetTypeId
                                            )}
                                          />
                                        </Grid>
                                        <Grid item xs={3}>
                                          <Grid
                                            container
                                            justify={'center'}
                                            alignItems={'center'}
                                            className={classes.setsContainer}
                                          >
                                            <Grid item>
                                              <Typography variant={'h6'}>
                                                {`x ${segment.exercises[0].sets.length}`}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    }
                                  />
                                </ListItem>
                              </Card>
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </List>
                </Grid>
              );
            })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'contained'}
          onClick={() => {
            props.editHandler();
            props.closeHandler();
          }}
          className={classes.editButton}
        >
          {'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface PassedInProps {
  open: boolean;
  routineTemplate: RoutineTemplateVO | undefined;
  closeHandler: () => void;
}

interface PreviewRoutineDialogProps {
  editHandler: () => void;
}

const mapStateToProps = (): PreviewRoutineDialogProps => {
  return {} as unknown as PreviewRoutineDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): PreviewRoutineDialogProps =>
  ({
    editHandler: () => {
      if (ownProps.routineTemplate !== undefined) {
        dispatch(viewSelectedRoutine(ownProps.routineTemplate));
        dispatch(routerActions.push(ROUTINE_BUILDER_SCREEN_PATH));
      }
    },
  } as unknown as PreviewRoutineDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewRoutineDialog);
