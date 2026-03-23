declare module 'swagger-ui-react' {
  import React from 'react';
  interface SwaggerUIProps {
    spec?: object;
    url?: string;
    [key: string]: any;
  }
  const SwaggerUI: React.FC<SwaggerUIProps>;
  export default SwaggerUI;
}
