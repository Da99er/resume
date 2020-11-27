import { ITableRow } from 'src/components/TableRow';

const personalInfo: ITableRow[] = [
    {
        field: `Date and place of birth`,
        content: `Oct 29,1987; Belarus`,
    },
    {
        field: `Marital status`,
        content: `Single`,
    },
    {
        field: `Skype`,
        content: `Js_vadim`,
        link: 'skype:Js_vadim?call',
    },
    {
        field: `Github`,
        content: `https://github.com/Da99er`,
        link: 'https://github.com/Da99er',
    },
    {
        field: `Bitbucket`,
        content: `https://bitbucket.org/da99er`,
        link: 'https://bitbucket.org/da99er',
    },
    {
        field: `Email`,
        content: `Da99er87@ya.ru`,
        link: 'mailto:Da99er87@ya.ru',
    },
    {
        field: `stackoverflow`,
        content: `https://stackoverflow.com/users/10761855/vadim-hulevich`,
        link: 'https://stackoverflow.com/users/10761855/vadim-hulevich',
    },
];

export default personalInfo;
