import React, { useState } from 'react';

export default function Tree(props) {
    const { data, name = '' } = props;

    const isSimpleNode = typeof data === 'string';

    const [isExpanded, setExpanded] = useState(true);

    if (!data || (!isSimpleNode && !data.name)) {
        return null;
    }

    if (isSimpleNode) {
        return (
            <div className="endNode">
                {name} @{data}
            </div>
        );
    }

    const { dependencies } = data;

    return (
        <div className="nodeWrapper">
            <div className="parentNode" onClick={() => setExpanded(!isExpanded)}>
                <span>
                    {data.name} @{data.version}
                </span>

                <span className="arrow">{isExpanded ? <>&#9650;</> : <>&#9660;</>}</span>
            </div>

            {isExpanded && (
                <div className="children">
                    {Object.keys(dependencies).map((key, i) => (
                        <Tree data={dependencies[key]} name={key} key={key + i} />
                    ))}
                </div>
            )}
        </div>
    );
}