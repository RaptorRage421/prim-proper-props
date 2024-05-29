import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GuestList from '../GuestList/GuestList';
import DinnerSupplies from '../DinnerSupplies/DinnerSupplies';
import GuestForm from '../GuestForm/GuestForm';

function App() {
  let [guestList, setGuestList] = useState([]);


  //On load, get guests
  useEffect(() => {
    getGuests()
  }, [])

  const getGuests = () => {
    axios.get('/api/guests')
      .then(response => {
        setGuestList(response.data)
      })
      .catch(err => {
        alert('error getting guests');
        console.log(err);
      })
  }


  const addGuest = (guest) => {
    axios.post('/api/guests',  guest )
      .then(response => {
        // clear inputs
       

        getGuests();
      })
      .catch(err => {
        alert('Error Adding Guest');
        console.log(err);
      })
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (newGuestName) {
  //     addGuest();
  //   }
  //   else {
  //     alert('The new guest needs a name!');
  //   }
  // }


  return (
    <div className="App">
      <Header />
      <h2>Party Leader</h2>
      {guestList[0] && <h3>{guestList[0].name}</h3>}
      <h2>Add a new guest</h2>
      <GuestForm addGuest={addGuest} />
      <GuestList guestList={guestList}/>
      <DinnerSupplies guestList={guestList} />
      <Footer />
    </div>
  );
}

export default App;
