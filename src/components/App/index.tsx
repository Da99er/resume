import React from 'react';

import Table from 'src/components/Table';

import personalInfo from 'src/siteData/personalInfo';
import foreignLanguages from 'src/siteData/foreignLanguages';
import education from 'src/siteData/education';
import courses from 'src/siteData/courses';
import employments from 'src/siteData/employments';

import S from './style.scss';

function App() {
    return (
        <div className={S.root}>
            <Table title={`Frontend Developer (React.js) Hulevich Vadim`} rows={personalInfo} />
            <Table title={`Foreign Languages`} rows={foreignLanguages} />
            <Table title={`Education`} rows={education} />
            <Table title={`Courses and Certificates`} rows={courses} />
            <Table title={`Employment History`} rows={employments} />

            <p className={S.footer}>Information for employers. Frontend Developer (React.js) Hulevich Vadim.</p>
        </div>
    );
}

export default App;
