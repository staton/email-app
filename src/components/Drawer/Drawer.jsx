import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionButton from '../ActionButton/ActionButton';
import DrawerMenu from '../DrawerMenu/DrawerMenu';
import * as navigationActions from '../../redux/actions/navigation-actions';

export class Drawer extends React.Component {

    /**
     * Gets the inline side bar style, which will set the width to '0' if
     * the side bar should be hidden.
     * @returns {object} The style object.
     */
    getInlineSideBarStyle() {
        return (this.props.navigation.isDrawerVisible)
            ? {}
            : { width: '0' };
    }

    /**
     * Gets the inline overlay style, which will set the opacity to '0' if
     * the overlay should be hidden.
     * @returns {object} The style object.
     */
    getInlineOverlayStyle() {
        return (this.props.navigation.isDrawerVisible)
            ? {}
            : { opacity: '0', pointerEvents: 'none' }
    }

    render() {
        return (
            <div className="Drawer">
                <div 
                    className="side-bar basic-ease-out"
                    style={this.getInlineSideBarStyle()}
                >
                    <div className="side-bar-container">
                        <div className="new-email-button-container">
                            <ActionButton
                                text="New Email"
                                onActionButtonClick={() => {}} 
                            />
                        </div>
                        <DrawerMenu />
                    </div>
                </div>
                <div 
                    className="overlay basic-ease-out"
                    style={this.getInlineOverlayStyle()}
                    onClick={this.props.toggleDrawer}
                >
                </div>
            </div>
        );
    }

}

function mapStateToProps(store, ownProps) {
    return {
        navigation: store.navigation
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            toggleDrawer: navigationActions.toggleDrawer
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);