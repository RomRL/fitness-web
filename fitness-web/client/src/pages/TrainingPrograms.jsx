import React from 'react'
import MainLayout from '../layout/MainLayout.jsx';
import YoutubeTrainingsPrograms from '../hooks/TrainingProgramsHook/YoutubeTrainingsPrograms.jsx';
import TrainingInformation from '../componenets/TrainingProgramsComp/TrainingInformation.jsx';


const TrainingProgramas = () => {
    


    
    return (
        <MainLayout>
        
            <body className="vsc-initialized">
                <main role="main">
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-3">Hello, world!</h1>
                            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h2>Heading</h2>
                                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                            </div>
                            <div className="col-md-4">
                                <h2>Heading</h2>
                                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                            </div>
                            <div className="col-md-4">
                                <h2>Heading</h2>
                                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                            </div>
                        </div>

                        <hr />
                    </div>
                </main>

                <footer className="container">
                    <p>© Company 2017-2018</p>
                </footer>
            </body>
            <YoutubeTrainingsPrograms />
            {<TrainingInformation />}
        </MainLayout>
    )
};
export default TrainingProgramas 