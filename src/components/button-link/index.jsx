import React from 'react';

import './index.less'
//  props 包含所有标签属性的对象
export default function ButtonLink(props) {
    return (
        <button className="link-button" {...props}></button>
    )
}
