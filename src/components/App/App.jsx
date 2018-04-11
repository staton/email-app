import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import NavBar from '../NavBar/NavBar';
import EmailTable from '../EmailTable/EmailTable';
import ComposeEmailForm from '../ComposeEmailForm/ComposeEmailForm';
import Footer from '../Footer/Footer';
import {INBOX, DRAFTS, SENT, SPAM, TRASH} from '../../constants/strings';

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <NavBar />
                <div className="app-content">
                    <Drawer />
                    <Switch>
                        <Route exact path="/" render={(props) => <EmailTable {...props} page={INBOX} />} /> 
                        <Route path="/inbox" render={(props) => <EmailTable {...props} page={INBOX} />} />
                        <Route path="/drafts" render={(props) => <EmailTable {...props} page={DRAFTS} />} />
                        <Route path="/sent" render={(props) => <EmailTable {...props} page={SENT} />} />
                        <Route path="/spam" render={(props) => <EmailTable {...props} page={SPAM} />} />
                        <Route path="/trash" render={(props) => <EmailTable {...props} page={TRASH} />} />
                        <Route path="/compose" render={(props) => <ComposeEmailForm {...props} />} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
    
}

export default App;