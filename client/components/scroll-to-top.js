import React from 'react'
import {useScrollTrigger, Zoom} from '@material-ui/core'

//Contains the logic for the 'zoom' transition for the button.
export default function ScrollTop(props) {
  const {children} = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 750,
  })

  return (
    <Zoom in={trigger}>
      <div role="presentation" className="toTop">
        {children}
      </div>
    </Zoom>
  )
}
