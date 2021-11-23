import Loader from "react-loader-spinner";
import React from "react";

export default function Loading({color}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 200,
      width: '100%',
      height: '100%'
    }}>
      <Loader
        type="Oval"
        color={color}
        height={60}
        width={60}
      />
    </div>
  )
}