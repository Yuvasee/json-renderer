import React, { useCallback, useState } from 'react';
import './App.css';

function Node(props) {
    const { data, name = '' } = props;

    const isSimpleNode = typeof data === 'string';

    const [isExpanded, setExpanded] = useState(true);

    if (!data || (!isSimpleNode && !data.name)) return;

    const { dependencies } = data;

    if (isSimpleNode) {
        return (
            <div className="endNode">
                {name} @{data}
            </div>
        );
    }

    return (
        <div className="nodeWrapper">
            <div className="parentNode" onClick={() => setExpanded(!isExpanded)}>
                {data.name} @{data.version} <span className="arrow">{isExpanded ? <>&#9650;</> : <>&#9660;</>}</span>
            </div>

            {isExpanded && (
                <div className="children">
                    {Object.keys(dependencies).map((key, i) => (
                        <Node data={dependencies[key]} name={key} key={key + i} />
                    ))}
                </div>
            )}
        </div>
    );
}

function App() {
    const [data, setData] = useState();

    const handleFile = useCallback(fileChangeEvent => {
        if (fileChangeEvent.target.files[0]) {
            const reader = new FileReader();

            reader.onload = fileReadEvent => {
                const jsonData = JSON.parse(fileReadEvent.target.result);
                setData(jsonData);
            };

            reader.readAsText(fileChangeEvent.target.files[0]);
        }
    }, []);

    return (
        <div className="app">
            <input type="file" onChange={handleFile} />

            {data && <Node data={data} />}
        </div>
    );
}

export default App;

// Donw &#9660; Up 	&#9650;
