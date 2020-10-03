import { Typography } from '@material-ui/core'
import React from 'react'

export const SummaryProperty = ({innerText, variant, captionText, width = 1, height = 1}) => {
    return (
        <div className={`flex flex-col mx-2 col-span-${width} row-span-${height}`}>
            <Typography display="inline" variant={variant}><span className="border-b">{innerText || 'Not selected'}</span></Typography>
            <Typography variant="caption">{captionText}</Typography>
        </div>
    )
}
