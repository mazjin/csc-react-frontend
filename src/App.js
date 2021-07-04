import { AppBar, Container, Drawer, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { useContext, useState } from 'react';
import { CharacterFormBasics } from './components/CharacterFormBasics';
import { CharacterFormStats } from './components/CharacterFormStats';
import { CharacterMiscOptions } from './components/CharacterMiscOptions';
import { CharacterSummary } from './components/CharacterSummary';
import { Frontpage } from './components/Frontpage';
import { CharacterContext } from './context/CharacterState';

function App() {
  const {stage, reset}= useContext(CharacterContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const parseStep = (stage) => {
    switch(stage) {
      case 0:
        return <Frontpage />
      case 1:
        return <CharacterFormBasics />
      case 2:
        return <CharacterFormStats />
      case 3: 
        return <CharacterMiscOptions />
      default:
        return <Frontpage />
    }
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 101,
      top: 0
    },
    toolbar: {
      display: "flex",
      placeContent: "space-between"
    }
  }))

  const classes = useStyles();


  return (
    <MuiThemeProvider>
      <React.Fragment>
        <div className="min-h-screen w-full">
          <AppBar 
            className={classes.appBar}
            color="primary"
            position="sticky"
          >
            <Toolbar className={classes.toolbar}>
              <IconButton color="inherit" aria-label="character-summary" onClick={() => setDrawerOpen(!drawerOpen)}>
                <AccountCircleIcon />
              </IconButton>
              <Typography variant="h6">Character Sheet Generator 5e</Typography>
              <Tooltip title="Reset" placement="bottom">
                <IconButton className="rounded-full" onClick={reset} color="inherit" aria-label="reset">
                  <ReplayRoundedIcon/>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Container className="my-10 mx-8 flex" >
            {parseStep(stage)}
              {/* <ClickAwayListener onClickAway={() => drawerOpen && setDrawerOpen(false)}> */}
              <Drawer anchor="left" variant="temporary" open={drawerOpen} className="lg:w-1/2 w-full" classes={{paper: "lg:w-1/2 w-full"}}>
                <Toolbar/>
                <CharacterSummary />
              </Drawer>
            {/* </ClickAwayListener> */}
          </Container>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
