import * as React from "react";

export interface Props {
    name: string;
}

export const Main: React.FC<Props> = ({name}) => {

    return (<div>{name} - henk - karel</div>);
}