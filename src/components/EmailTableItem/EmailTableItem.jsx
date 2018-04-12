import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Email from '../../models/email';
import Checkbox from '../Checkbox/Checkbox';
import * as EmailActions from '../../redux/actions/email-actions';

const propTypes = {
    email: PropTypes.instanceOf(Email)
};

const defaultProps = {
};

class EmailTableItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheckboxChecked = this.handleCheckboxChecked.bind(this);
    }

    /**
     * Selects/deselects the email for this table item.
     */
    handleCheckboxChecked(e) {
        this.props.selectEmail([ this.props.email ], e.target.checked);
    }

    /**
     * Determines whether or not the checkbox should be checked or not.
     */
    getCheckboxCheckedState() {
        return this.props.selectedEmails.indexOf(this.props.email) >= 0;
    }

    render() {
        return (
            <div className="EmailTableItem basic-ease-out-fast">
                <div className="left-side-items">
                    <div className="checkbox-container">
                        <Checkbox 
                            isChecked={this.getCheckboxCheckedState()}
                            onCheck={this.handleCheckboxChecked} />
                    </div>
                    <div className="email-info">
                        <div className="email-from">
                            {this.props.email.getFrom()}
                        </div>
                        <div className="email-subject">
                            {this.props.email.getSubject()}
                        </div>
                    </div>
                </div>
                <div className="right-side-items">
                    <div className="email-date">
                        {this.props.email.getPrettyDate()}
                    </div>
                </div>
            </div>
        );
    }

}

EmailTableItem.propTypes = propTypes;
EmailTableItem.defaultProps = defaultProps;

function mapStateToProps(store, ownProps) {
    return {
        selectedEmails: store.email.selectedEmails,
        email: ownProps.email
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            selectEmail: EmailActions.selectEmails
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTableItem);