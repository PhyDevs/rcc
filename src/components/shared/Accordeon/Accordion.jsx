import React from "react";

import './Accordion.scss'


function Accordion({children: items, defaultActive}) {

    const [active, setActive] = React.useState(defaultActive || 0)

    const handleClickTitle = index => {
        setActive(prevActive => ( 
            prevActive === index ? null : index
        ));
    };

    const renderItem = (item, i) => (
        <div
            key={i}
            className={`box ${i === active ? "active" : ""}`}
            onClick={() => handleClickTitle(i)}
        >
            {item}
        </div>
    )

    return <div className="accordion">
        {
            !!items ?
                Array.isArray(items) ?
                    items.map((item, i) => renderItem(item, i))
                    : renderItem(items)
                : null
        }
    </div>
}


function Item({ title, children, callback = () => {}}) {
    return (
      <div>
        <div className="title" onClick={callback}>{title}</div>
        <div className="body">{children}</div>
      </div>
    );
}

Accordion.Item = Item

export default Accordion
