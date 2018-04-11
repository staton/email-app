import React from 'react';
import PropTypes from 'prop-types';
import DrawerMenuItem from '../DrawerMenuItem/DrawerMenuItem';

const propTypes = {
};

class DrawerMenu extends React.Component {

    render() {
        return (
            <ul className="DrawerMenu">
                <DrawerMenuItem
                    linkTo="/inbox"
                    text="Inbox"
                />
                <DrawerMenuItem
                    linkTo="/drafts"
                    text="Drafts"
                />
                <DrawerMenuItem
                    linkTo="/sent"
                    text="Sent"
                />
                <DrawerMenuItem
                    linkTo="/spam"
                    text="Spam"
                />
                <DrawerMenuItem
                    linkTo="/trash"
                    text="Trash"
                />
            </ul>
        );
    }

}

DrawerMenu.propTypes = propTypes;

export default DrawerMenu;