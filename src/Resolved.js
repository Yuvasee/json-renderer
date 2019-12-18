import React from 'react';

export default function Resolved(props) {
    const resolvedPackages = resolvePackages(props.data);

    return (
        <ul className="resolved">
            {Object.keys(resolvedPackages).sort().map((key, i) => (
                <li key={key + i}>
                    {key} @{resolvedPackages[key]}
                </li>
            ))}
        </ul>
    );
}

function resolvePackages(data, keyName = '') {
    let resolved = {};

    if (typeof data === 'string') {
        resolved[keyName] = { ...data };
    } else {
        const { name, version, dependencies } = data;

        if (keyName) resolved[name] = version;

        if (dependencies && Object.keys(dependencies).length) {
            Object.keys(dependencies).forEach(key => {
                if (!resolved[key]) {
                    resolved[key] =
                        typeof dependencies[key] === 'string' ? dependencies[key] : dependencies[key].version;
                }
            });

            Object.keys(dependencies).forEach(key => {
                const resolvedDependencies = resolvePackages(dependencies[key], key);

                resolved = { ...resolvedDependencies, ...resolved };
            });
        }
    }

    return resolved;
}
