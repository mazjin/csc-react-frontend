import { AppBar, Container, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { useContext } from 'react';
import { CharacterFormBasics } from './components/CharacterFormBasics';
import { CharacterFormStats } from './components/CharacterFormStats';
import { CharacterMiscOptions } from './components/CharacterMiscOptions';
import { Frontpage } from './components/Frontpage';
import { CharacterContext } from './context/CharacterState';

function App() {
  const {stage, reset}= useContext(CharacterContext)

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
  return (
    <MuiThemeProvider>
      <React.Fragment>
        <div className="min-h-screen w-full">
          <AppBar 
            className="top-0 "
            color="primary"
            position="sticky"
          >
            <Toolbar className="flex place-content-between">
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
          </Container>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
