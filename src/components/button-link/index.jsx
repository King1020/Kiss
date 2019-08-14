import React from 'react';
import './index.less'

export default function ButtonLink(props) {
  //  props 包含所有标签属性的对象
    return (
        <button className="link-button" {...props}></button>
    )
}

