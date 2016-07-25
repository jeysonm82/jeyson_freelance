import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectListComp extends React.Component {

    constructor() {
        super();
        this.state = {projects: [], mode: 'list', project_detail: null};
    }

    render(){
        let current_mode = this.state.mode;
        if (current_mode == 'list') {
            let projects = this.state.projects.map( (entry, index) => <ProjectItemComp key={index} idx={index} entry={entry} change_class={this.change_class.bind(this)} show_project_cback={this.show_project.bind(this)} />);
            return (
                    <div>
                    {projects}
                    </div>
                    );
        }
        else {
            let current_project = this.state.project_detail;
            return (<div><ProjectDetailComp  entry={current_project} close={this.close.bind(this)}/></div>);
        }

    }

    change_class(idx, cls) {
        let projects = this.state.projects;
        projects[idx].className = cls;
        this.setState(projects);
    }
    
    show_project(idx) {
        let project = this.state.projects[idx];
        let state = this.state;
        state.mode = 'detail';
        state.project_detail = project;
        this.setState(state);
    }

    close() {
        let state = this.state;
        state.mode = 'list';
        state.project_detail = null;
        for(let p of state.projects){
            p.className = null;
        }
        this.setState(state);
    }

}

class ProjectItemComp extends React.Component {

    animate(event) {
        console.log(event);
        let anim = event.type=='mouseenter'? "zoomIn":"fadeOut";
        this.props.change_class(this.props.idx, "animated " + anim);
    }

    show_project(event) {
        event.preventDefault();
        this.props.show_project_cback(this.props.idx);

    }
    


    render() {
        let entry = this.props.entry;
        return(
            <div className={'project-entry col-md-4 '}>
                 <a href='#'
                     onMouseEnter={this.animate.bind(this)}
                     onMouseLeave={this.animate.bind(this)}
                     onClick={this.show_project.bind(this)}>
                 
                     <div><img src={entry.image} /></div>
                     <div className={entry.className?entry.className: 'hidden'}>
                         <h3>{entry.title}</h3>
                         <p>{entry.short_desc}</p>
                     </div>
                 </a>

            </div>
                );
    }
}



class ProjectDetailComp extends React.Component {

    componentDidMount() {

        //Scroll to top when mounted
        let top_header_height = $(".top-header").height();
        $('html, body').animate({
            scrollTop: $("#sample-projects").offset().top - top_header_height
            }, 500);

    }

    render() {
        let entry = this.props.entry;
        let skills = entry.skills.map((entry, index) => <li key={index}>{entry.name}</li> );
        let images = entry.images.map((entry, index) => <img src={entry.url} />);
        return(
                <div className='project-detail animated fadeIn'>
                    <a href='#sample-projects' onClick={this.props.close}><i className="fa fa-times-circle-o fa-3x"></i></a> 
                    <div className='project-detail__cont'>
                        <h3>{entry.title}</h3>
                        <h4>Description:</h4>
                        {entry.description}

                        <h4>Skills used:</h4>
                        <ul className='project-detail__skills'>
                            {skills}
                        </ul>

                        <div className='project-detail__imgs'>
                            {images}
                        </div>


                    </div>

                </div>
                );

    }

}
