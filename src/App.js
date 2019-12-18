import React, { useCallback, useState } from 'react';

import Tree from './Tree';
import Resolved from './Resolved';
import './App.css';

function App() {
    const [data, setData] = useState();
    const [showTree, setShowTree] = useState(true);

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
            {data && (
                <>
                    <div className="switchView" onClick={() => setShowTree(!showTree)}>
                        {showTree ? 'Show resolved' : 'Show tree'}
                    </div>

                    {showTree && <Tree data={data} />}

                    {!showTree && <Resolved data={data} />}
                </>
            )}
        </div>
    );
}

export default App;
