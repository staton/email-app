import React from 'react';
import PropTypes from 'prop-types';
import NavBarButton from '../NavBarButton/NavBarButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MenuIcon from 'react-icons/lib/md/menu';
import * as navigationActions from '../../redux/actions/navigation-actions';

export class NavBar extends React.Component {

    render() {
        return (
            <div className="NavBar">
                <NavBarButton 
                    icon={<MenuIcon />}
                    onNavBarButtonClick={this.props.toggleDrawer} />
            </div>
        );
    }

}

function mapStateToProps(store, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            toggleDrawer: navigationActions.toggleDrawer
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);