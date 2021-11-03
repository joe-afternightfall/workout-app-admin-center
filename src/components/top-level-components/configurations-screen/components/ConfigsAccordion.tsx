import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function ConfigsAccordion(
  props: ConfigsAccordionProps
): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) =>
    (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.root}>
      {props.accordionElements.map((entry, index) => {
        index += 1;
        const panelId = `panel-${index}`;
        return (
          <Accordion
            key={index}
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}
          >
            <AccordionSummary
              id={`${panelId}-header`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{entry.title}</Typography>
              <Typography className={classes.secondaryHeading}>
                {entry.secondary}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{entry.element}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

interface ConfigsAccordionProps {
  accordionElements: {
    title: string;
    secondary: string;
    element: JSX.Element;
  }[];
}
