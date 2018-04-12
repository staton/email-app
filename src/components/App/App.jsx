import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import Drawer from '../Drawer/Drawer';
import NavBar from '../NavBar/NavBar';
import EmailTable from '../EmailTable/EmailTable';
import ComposeEmailForm from '../ComposeEmailForm/ComposeEmailForm';
import Footer from '../Footer/Footer';
import Email from '../../models/email';
import {USER_EMAIL, INBOX, DRAFTS, SENT, SPAM, TRASH} from '../../constants/strings';
import {addEmails} from '../../redux/actions/email-actions';

export class App extends React.Component {

    /**
     * Initially loads the emails. This should be done via API, but for now 
     * we can just load them like so.
     */
    loadInitialEmails() {

        let initialEmails = [
            new Email(
                1,
                USER_EMAIL, 
                'from@xyz.com', 
                null, 
                null, 
                'hello', 
                'how are you', 
                1522567890882,
                false),
            new Email(
                2,
                'bob@gmail.com', 
                USER_EMAIL, 
                null, 
                null, 
                'hi', 
                'look at this', 
                1531567890558,
                false,
                false,
                true),
            new Email(
                3,
                USER_EMAIL, 
                'from@xyz.com', 
                null, 
                null, 
                'big news', 
                'big news....', 
                1534567890414,
                false)
        ];

        this.props.addEmails(initialEmails);
    }

    componentDidMount() {
        this.loadInitialEmails();
    }

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

function mapStateToProps(store, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            addEmails: addEmails
        },
        dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));