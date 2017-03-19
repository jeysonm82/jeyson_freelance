import ProjectListComp from './project_list';
import menu_ui from './menu'
import general_ui from './general'
import cases_ui from './cases'
import React from 'react';
import ReactDOM from 'react-dom';


window.project_list_comp = ReactDOM.render(<ProjectListComp />, document.getElementById("project-list"));

general_ui();
menu_ui();
cases_ui();
