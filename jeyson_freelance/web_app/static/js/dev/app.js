import ProjectListComp from './project_list';
import menu_ui from './menu'
import React from 'react';
import ReactDOM from 'react-dom';


window.project_list_comp = ReactDOM.render(<ProjectListComp />, document.getElementById("project-list"));

menu_ui();
