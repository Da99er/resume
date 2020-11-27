import React from 'react';

import S from './style.scss';

export interface ITableRow {
    field: string;
    content: string;
    link?: string;
}

function TableRow({ field, content, link }: ITableRow): JSX.Element {
    if (field.length === 0) {
        return (
            <tr className={S.root}>
                <td colSpan={2}> </td>
            </tr>
        );
    }

    return (
        <tr className={S.root}>
            <td className={S.colLeft}>{field}</td>
            <td className={S.colRight}>
                {content}
                {link ? (
                    <a href={link} className={S.link} target="_blank" rel="noreferrer">
                        🔗
                    </a>
                ) : null}
            </td>
        </tr>
    );
}

export default TableRow;
