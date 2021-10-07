import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { scroller, animateScroll as scroll } from 'react-scroll';
import BaseListItem from './BaseListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    hide: {
      display: 'none',
    },
    animate: {
      transition: 'transform .35s ease-in-out',
    },
    grow: {
      // transform: 'scale(1.5)',
      height: '100%',
    },
    animateListItem: {
      height: '75vh',
    },
  })
);

const BuilderCard = ({ blah }: BuilderCardProps): JSX.Element => {
  const classes = useStyles();
  const [animate, setAnimate] = React.useState(false);
  const [openCard, setOpenCard] = React.useState('');

  const scrollToSection = (id: string) => {
    // const divToScrollTo = document.getElementById(id);
    // if (divToScrollTo) {
    //   divToScrollTo.scrollIntoView();
    // }
    if (openCard === id) {
      setOpenCard('');
    } else {
      setOpenCard(id);
    }

    console.log('scrolling-to-id: ' + JSON.stringify(id));
    scroller.scrollTo(id, {
      // containerId: 'card-list',
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Grid container>
      <Grid item xs={7} container spacing={2}>
        <Grid item xs={12}>
          <Card raised={false} square className={classes.root}>
            <CardHeader
              title={'Routine Title'}
              subheader={'workout category'}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <List subheader={<ListSubheader>{'Phase'}</ListSubheader>}>
                <BaseListItem
                  selectedCardId={openCard}
                  listId={'list-item-1'}
                  scrollToHandler={() => {
                    scrollToSection('list-item-1');
                  }}
                  title={'Exercise 1'}
                />
                <BaseListItem
                  selectedCardId={openCard}
                  listId={'list-item-2'}
                  scrollToHandler={() => {
                    scrollToSection('list-item-2');
                  }}
                  title={'Exercise 2'}
                />
                <BaseListItem
                  selectedCardId={openCard}
                  listId={'list-item-3'}
                  scrollToHandler={() => {
                    scrollToSection('list-item-3');
                  }}
                  title={'Exercise 3'}
                />

                <BaseListItem
                  selectedCardId={openCard}
                  listId={'list-item-4'}
                  scrollToHandler={() => {
                    scrollToSection('list-item-4');
                  }}
                  title={'Exercise 4'}
                />

                <BaseListItem
                  selectedCardId={openCard}
                  listId={'list-item-5'}
                  scrollToHandler={() => {
                    scrollToSection('list-item-5');
                  }}
                  title={'Exercise 5'}
                />
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface BuilderCardProps {
  blah?: undefined;
}

const mapStateToProps = (state: State): BuilderCardProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as BuilderCardProps;
};

const mapDispatchToProps = (): BuilderCardProps =>
  ({} as unknown as BuilderCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(BuilderCard);
