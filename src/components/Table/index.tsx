import React from 'react';

import S from './style.scss';

import TableRow, { ITableRow } from 'src/components/TableRow';

export interface ITable {
    title: string;
    rows: ITableRow[];
}

function mapRenderData({ field, content, link }: ITableRow, index: number): JSX.Element {
    const key = field + content + index;
    return <TableRow key={key} field={field} content={content} link={link} />;
}

function Table({ title, rows }: ITable): JSX.Element {
    return (
        <table className={S.root} cellSpacing={2}>
            <thead>
                <tr>
                    <td colSpan={2} className={S.title}>
                        {title}
                    </td>
                </tr>
            </thead>
            <tbody>{rows.map(mapRenderData)}</tbody>
        </table>
    );
}

export default Table;
