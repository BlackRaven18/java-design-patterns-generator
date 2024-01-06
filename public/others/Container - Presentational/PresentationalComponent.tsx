import React from 'react';

type PresentationalComponentProps = {
    data: string
}

const $PRESENTATION_COMPONENT_NAME$ = (props: PresentationalComponentProps) => {
  return (
    <div>
      <h3>Presenting Data</h3>
      <h5>{props.data}</h5>
    </div>
  );
};

export default $PRESENTATION_COMPONENT_NAME$;