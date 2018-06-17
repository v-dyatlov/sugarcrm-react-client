import React from 'react';
import {connect} from 'react-redux';
import './map.css';

import {mapActions} from "../_actions";

class MapPage extends React.Component {

    componentDidMount() {
        const {user} = this.props;
        this.props.dispatch(mapActions.getAccounts(user))
    }

    render() {
        const {user, map} = this.props;
        return (
            <div className="col-md-12">
                <h1>Welcome to accounts map!</h1>
                <p>Below you can find list if accounts and map</p>
                {map.loading && <em>Loading accounts...</em>}
                {map.accounts &&
                <ul>
                    {map.accounts.map((account, index) =>
                        <li key={account.id}>
                            {account.name + ' ' + account.address}
                        </li>
                    )}
                </ul>
                }
                <div id="map"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {authentication, map} = state;
    const {user} = authentication;
    const {accounts} = map;
    return {
        user,
        map,
        accounts
    };
}

const connectedMapPage = connect(mapStateToProps)(MapPage);
export {connectedMapPage as MapPage};