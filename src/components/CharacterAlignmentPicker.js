import { Button, InputLabel } from "@material-ui/core";
import React from "react";
export function CharacterAlignmentPicker({
  handleAlignmentChange,
  alignment
}) {
    
    const cols=['Lawful','Neutral','Chaotic'];
    const rows=['Good','Neutral', 'Evil'];

    return <div className="my-6 col-start-5 col-end-9 row-start-1 row-end-4">
                <InputLabel color="primary">Alignment</InputLabel>
                <div className="grid grid-cols-4 grid-rows-4">
                    <p></p>
                    {cols.map(col => <p>{col}</p>)}
                    {rows.map(row => <>
                            <p>{row}</p>
                            <>
                                {cols.map(col => {
                                    const value = col === row ? `True ${col}` : `${col} ${row}`;
                                    return <Button color="primary" onClick={() => handleAlignmentChange(value)} variant={alignment === value ? 'contained' : 'outlined'}>{value}</Button>;
                                })}
                            </>
                        </>)}  
                </div>
            </div>;
}
  