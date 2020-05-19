import React from 'react';
import { connect } from 'react-redux';
import { fetchTrips, addTrip, fetchUser, updateTrip, deleteTrip } from '../actions';

import './MainApp.css';

import Trip from './Trip';
// import Axios from 'axios';

class MainApp extends React.Component {
  state = {
    tripForm: false,
    riders: [],
    trip: {
      ride_fare: '',
      name: ''
    },
    rider: {
      name: '',
      phone_number: ''
    },
    updateRider: {
      name: '',
      phone_number: ''
    },
    logoutMenu: false
  }

  asyncLocalStorage = {
    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};

  componentDidMount() {
    this.asyncLocalStorage.getItem('user')
      .then(res => {
        this.props.fetchTrips(res);
        this.props.fetchUser(res)
      })
      .catch(err => console.log(err))
  }

  addTripHandler = e => {
    e.preventDefault();
    const id = localStorage.getItem('user');

    const trip = {
      name: this.state.trip.name,
      primary_member_id: Number(id),
      ride_fare: Number(this.state.trip.ride_fare),
      riders: JSON.stringify(this.state.riders.map(rider => ({
        name: rider.name,
        phone_number: rider.phone_number,
        paid: false
      })))
    }

    console.log(trip)

    this.props.addTrip(trip);
    this.setState({ 
      tripForm: false,
      riders: [],
      trip: {
        ride_fare: '',
        name: ''
      },
      rider: {
        name: '',
        phone_number: ''
      },
      updateRider: {
        name: '',
        phone_number: ''
      } 
    })
    this.props.fetchTrips(id);

    // this.state.riders.map(rider => {
    //   Axios
    //     .post('http://localhost:5000/send-text', {
    //       number: parseInt(rider.phone_number),
    //       text: `${this.props.user.name} is requesting \$${Math.floor(this.state.trip.ride_fare / (this.state.riders.length + 1))} from your recent trip.\n\nPay via: ${this.props.user.money_app_link}`
    //     })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // })
  }

  changeHandler = (e, type) => {
    type === 'ride_fare' || type === 'name' ?
      this.setState({
        trip: {
          ...this.state.trip,
          [e.target.name]: e.target.value
        }
      })
    : 
      this.setState({
        rider: {
          ...this.state.rider,
          [e.target.name]: e.target.value
        }
      })
  }

  updateChangeHandler = e => {
    this.setState({
      updateRider: {
        ...this.state.updateRider,
        [e.target.name]: e.target.value
      }
    })
  }

  formAnimation = open => ({
    marginTop: open ? '0' : '1000px',
    transition: open ? 'margin-top 1000ms ease-out' : 'margin-top 500ms ease-out, z-index 0s ease 1s',
    zIndex: open ? 1000 : 2
  })

  update = trip => {
    const id = localStorage.getItem('user');
    this.props.updateTrip(trip)
    return this.props.fetchTrips(id);
  }

  addRider = e => {
    e.preventDefault();
    this.setState({
      riders: [
        ...this.state.riders,
        {
          name: this.state.rider.name,
          phone_number: this.state.rider.phone_number,
          update: false
        }
      ],
      rider: {
        name: '',
        phone_number: ''
      }
    })
  }

  editRider = name => {
    this.setState({
      riders: this.state.riders.map(rider => {
        if(rider.name === name) {
          rider.update = true
        }
        return rider
      })
    })
  }

  confirmUpdate = (e, index) => {
    e.preventDefault();
    const newRiders = this.state.riders.map((rider, i) => {
      if(index === i) {
        rider = {
          name: this.state.updateRider.name === '' ? rider.name : this.state.updateRider.name,
          phone_number: this.state.updateRider.phone_number === '' ? rider.phone_number : this.state.updateRider.phone_number
        }
      }
      return rider
    })

    this.setState({
      riders: newRiders,
      updateRider: {
        name: '',
        phone_number: ''
      }
    })
  }

  openForm = e => {
    if(e) {
      e.preventDefault()
    }
    
    this.setState({
      tripForm: true
    })
  }

  closeForm = () => {
    this.setState({ 
      tripForm: false,
      riders: [],
      trip: {
        ride_fare: '',
        name: ''
      },
      rider: {
        name: '',
        phone_number: ''
      },
      updateRider: {
        name: '',
        phone_number: ''
      } 
    })
  }

  logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="main-app">
      <header className="mainHeader" onMouseLeave = { !this.state.logoutMenu ? null : () => this.setState({ logoutMenu: false }) }>
        <h1 style={{ width: '35%' }}>TripSplit</h1>
        <div style = {{ border: '2px solid black', borderRadius: '50%', fontSize: '1.5rem', padding: '5px', background: 'white', color: 'black' }}>
          { this.state.tripForm ? 
            <div 
              onClick = { () => this.closeForm() }
              style = {{ color: 'red', padding: '0 4px' }}
            >X</div>
          :
            <i 
              onClick = { () => this.openForm() }
            className="fas fa-car"></i>
          }
        </div>
        <h1 
          style = {{ 
            fontSize: '1rem', 
            cursor: 'pointer',
            width: '35%',
            textAlign: 'right',
            textDecoration: this.state.logoutMenu ? 'underline' : 'none'
          }}
          onMouseEnter = { this.state.logoutMenu ? null : () => this.setState({ logoutMenu: true }) }

        >
          Welcome, { this.props.user.name || 'user' }!
        </h1>
      </header>
      <div 
      style = {{
          position: 'absolute',
          zIndex: 10,
          right: 0,
          top: this.state.logoutMenu ? '60px' : 0,
          color: 'black',
          background: 'white',
          opacity: this.state.logoutMenu ? 1 : 0,
          border: '2px solid black',
          padding: '5px',
          width: '100px',
          textAlign: 'center'
        }}
        onMouseEnter = { () => this.setState({ logoutMenu: true }) }
        onMouseLeave = { !this.state.logoutMenu ? null : () => this.setState({ logoutMenu: false }) }
      >
        <span 
          className="logout"
          onClick = { () => this.logout() }
        >logout</span>
      </div>
        <div className="trips">
          {this.props.trips.length > 0 ?
            this.props.trips.map(trip => (
              <Trip 
                trip={trip} 
                id = { trip.id }
                update = { this.update }
                delete = { this.props.deleteTrip }
              />
            ))
          :
            <p style={{ color: 'black', marginTop: '50px' }}>Looks like you don't have any open trips! Go ahead and start one now!</p>
          }
        </div>
        <div
          style = { this.formAnimation(this.state.tripForm) }
          className="fullLayout"
        >
          <form 
            onSubmit = { this.state.tripForm ? e => this.addTripHandler(e) : e => this.openForm(e) }
            style = {{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}
          >
            <span className="tripNameForm">
              <input
                className="input"
                type="text"
                value={this.state.trip.name}
                name="name"
                placeholder="Trip Name"
                onChange={e => this.changeHandler(e, 'name')}
              />
            </span>
            <span className="currency">
              <input 
                className="input"
                type="number"
                value = { this.state.trip.ride_fare }
                name="ride_fare"
                placeholder="Total Fare"
                onChange = { e => this.changeHandler(e, 'ride_fare') }
              />
          </span>
            <button 
              className="addTripBtn"
            >
              { this.state.tripForm ? "CONFIRM" : "ADD TRIP" }
            </button>
          </form>
          <div className="riders">
            <h1 className="heading">Riders:</h1>
            { this.state.riders.length > 0 ?
              this.state.riders.map((rider, i) => (
                rider.update ?
                  <form 
                    className="riderLayout"
                    onSubmit = { e => this.confirmUpdate(e, i) }
                  >
                    <input 
                      className="riderInput"
                      type="text"
                      placeholder = { `${rider.name}` }
                      name="name"
                      value = { this.state.updateRider.name }
                      onChange = { this.updateChangeHandler }
                    />
                    <input 
                      className="riderInput"
                      type="text"
                      placeholder = { `${rider.phone_number}` }
                      name="phone_number"
                      value = { this.state.updateRider.phone_number }
                      onChange = { this.updateChangeHandler }
                    />
                    <input 
                      type="submit"
                      className="hiddenSubmit"
                      value="Confirm"
                    />
                  </form>
                :
                  <div className="riderLayoutInfo">
                    <div style={{display:'flex', alignItems: 'center', height: '50px'}}>
                      <span className="heading">{i + 1}.&nbsp;&nbsp;</span>
                      <p className="heading">{ rider.name }</p>
                    </div>
                    <p className="heading">{ rider.phone_number }</p>
                    <button 
                      onClick = { () => this.editRider(rider.name)}
                      className="editBtn"
                    >
                      edit
                    </button>
                  </div>
                ))
              :
                <h1 style={{color: 'black' }}>No riders listed, add some</h1>
            }
          </div>
          <form 
            className="riderLayout"
            onSubmit = { this.addRider }
            style = {{
              position: 'absolute',
              left: 20,
              width: 'calc(100% - 40px)',
              bottom: '75px',
              opacity: this.state.tripForm ? 1 : 0,
              transition: this.state.tripForm ? 'opacity 1s ease-in 750ms' : 'none'
            }}
          >
            <input 
              className="riderInput"
              type="text"
              placeholder="Name"
              name="name"
              value = { this.state.rider.name }
              onChange = { e => this.changeHandler(e, 'rider') }
            />
            <input 
              className="riderInput"
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value = { this.state.rider.phone_number }
              onChange = { e => this.changeHandler(e, 'rider') }
            />
            <button className="input">
              Add Rider
            </button>
          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  id: state.loginReducer.id,
  trips: state.tripReducer.trips,
  user: state.userReducer.user
})

export default connect(
  mapStateToProps,
  { fetchTrips, addTrip, fetchUser, updateTrip, deleteTrip }
)(MainApp);