// RoutesGraph.js
import React from 'react';

function RoutesGraph({ routes, onSelect }) {
  // TODO: Display the routes in a graphical format

  return (
    <div>
      {routes.map((route, index) => (
        <div key={index} onClick={() => onSelect(route)}>
          {route.name}  // Assumes your route objects have a name property
        </div>
      ))}
    </div>
  );
}

export default RoutesGraph;
