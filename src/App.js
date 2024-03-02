import { useState } from 'react';
import './App.css';
import { PetProfile, Pets } from './ui-components';
import { NavBarHeader } from './ui-components';
import { PetDetails } from './ui-components';
import { AddPet } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';

//<NavBarHeader />
function App({ user, signOut }) {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet, setPet] = useState();
  const [updatePet, setUpdatePet] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const formOverride = {
    TextField29766922: {
      placeholder: name
    },
    TextField29766923: {
      placeholder: age
    },
    TextField29766924: {
      placeholder: breed
    },
    TextField38624563: {
      placeholder: about
    },
    TextField38624570: {
      placeholder: color
    },
    TextField38624577: {
      placeholder: image
    },
    image: {
      src: updatePet == null ? "https://img.icons8.com/color/50/000000/dog" : updatePet.image,
    },
    Button38624585: {
      isDisabled: !updatePet ? true : false
    },
    Button29766926: {
      isDisabled: updatePet ? true : false
    },
    MyIcon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false);
      },
    },
  };
  const NavBarHeaderOverrides = {
    Button: {
      onClick: signOut,
    },
    image: {
      src: user?.attribute?.profile,
      //src: "https://img.icons8.com/color/50/000000/cat",
    },
    "Add Pet": {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(!showForm)
      },
    },
  };
  return (
    <div className="App">
      <NavBarHeader width={"100%"} overrides={NavBarHeaderOverrides} />
      <header className='App-header'>
        {showDetails && <PetDetails
          pet={pet}
          style={{
            textAlign: "left",
            margin: "1rem",
          }}
          overrides={{
            Close: {
              onClick: () => {
                setShowDetails(false);
              },
              style: {
                cursor: "pointer",
              },
            }
          }}
        />}
        {showForm && (
          <AddPet
            pet={updatePet}
            overrides={formOverride}
            style={{
              textAlign: "left",
              margin: "1rem",
            }}
          />
        )
        }
        <Pets
          overrideItems={({ item, index }) => ({
            overrides: {
              Breed: { color: "blue" },
              Button29766907: {
                onClick: () => {
                  setShowDetails(!showDetails);
                  setPet(item)
                },
              },
              Button38593980: {
                onClick: () => {
                  if (!showForm) setShowForm(true)
                  setUpdatePet(item);
                  setName(item.name);
                  setColor(item.color);
                  setAge(item.age);
                  setBreed(item.breed);
                  setAbout(item.about);
                  setImage(item.image);
                },
              }
            },
          })}
        />
      </header>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default withAuthenticator(App);
