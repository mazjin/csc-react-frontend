import React, { useContext } from "react";
import { Button, Tooltip } from "@material-ui/core";
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { CharacterContext } from "../context/CharacterState";


export const CharacterFormNavigation = ({onNext = () => {}, disabledForward=false, disabledReasonForward='Disabled'}) =>  {
    const {prevStage, nextStage} = useContext(CharacterContext);

    const goToNextStage = () => {
        onNext();
        nextStage();
    }

    return <div className="bottom-0 fixed w-full justify-between items-center flex lg:h-20 md:h-24 h-32">
                    <Button className="h-full w-1/3" variant="outlined" color="secondary" size="large" startIcon={<ArrowBackRoundedIcon />} onClick={prevStage}> Back </Button>
                    <Tooltip placement="top" title={disabledReasonForward} disableFocusListener={!disabledForward} disableHoverListener={!disabledForward} disableTouchListener={!disabledForward}>
                        <div className="h-full w-1/3">
                            <Button className="h-full w-full" variant="contained" color="primary" size="large" disabled={disabledForward} endIcon={<ForwardRoundedIcon />} onClick={goToNextStage} >Next</Button>
                        </div>
                    </Tooltip>
            </div>;
}
  